class ProfileHandler {
    constructor(app) {
        this.app = app;
        this.initElements();
        this.isExpanded = false;
        this.startY = 0;
        this.currentY = 0;
        this.scrollThreshold = 50; // Порог в пикселях для свайпа
    }

    initElements() {
        this.elements = {
            profileCard: document.getElementById('myProfileCard'),
            profileCardBg: document.getElementById('myProfileCardBg'),
            profileNameAge: document.getElementById('myProfileNameAge'),
            profileDescriptionShort: document.getElementById('myProfileDescriptionShort'),
            profileScrollableContent: document.getElementById('myProfileScrollableContent'),
            profileDescriptionFull: document.getElementById('myProfileDescriptionFull'),
            profileLookingFor: document.getElementById('myProfileLookingFor'),
            profileInterests: document.getElementById('myProfileInterests'),
            profilePhotosGrid: document.getElementById('myProfilePhotosGrid'),
            editBtn: document.getElementById('editBtn'),
            newProfileBtn: document.getElementById('newProfileBtn'),
            scrollIndicator: document.querySelector('#myProfileScrollableContent .scroll-indicator'),
            profileFixedInfo: document.getElementById('myProfileFixedInfo') // Новый элемент
        };
    }

    showProfile() {
        const { userData } = this.app.state;
        const profileColor = userData.profileColor || '#FF6B6B';
        
        this.applyProfileColor(profileColor);
        this.updateProfileCardBackground(userData.avatar);
        this.updateProfileInfo(userData);
        this.updateLookingFor(userData.lookingFor, this.app.config.lookingForOptions);
        this.updateInterests(userData.interests, this.app.config.interests);
        this.updatePhotos(userData.photos);
        this.bindEvents();
        this.resetScrollState(); // Сбрасываем состояние свайпа при открытии профиля
    }

    applyProfileColor(color) {
        document.documentElement.style.setProperty('--primary', color);
        const rgb = this.hexToRgb(color);
        if (rgb) {
            document.documentElement.style.setProperty('--primary-rgb', `${rgb.r},${rgb.g},${rgb.b}`);
        }
        document.documentElement.style.setProperty('--primary-dark', this.darkenColor(color, 20));
        document.documentElement.style.setProperty('--primary-light', this.lightenColor(color, 40));
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    }

    hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    updateProfileCardBackground(avatar) {
        if (avatar) {
            this.elements.profileCardBg.style.backgroundImage = `url(${avatar})`;
        } else {
            this.elements.profileCardBg.style.backgroundImage = 'none';
            this.elements.profileCardBg.style.backgroundColor = 'var(--primary-dark)'; // Фоновый цвет, если нет аватара
        }
    }

    updateProfileInfo(userData) {
        let nameAgeText = userData.name || 'Аноним';
        if (userData.age) {
            nameAgeText += `, ${userData.age}`;
        }
        this.elements.profileNameAge.textContent = nameAgeText;
        
        // Краткое описание (первая строка или часть)
        const fullDescription = userData.description || 'Пользователь пока ничего о себе не рассказал.';
        this.elements.profileDescriptionShort.textContent = fullDescription.split('.')[0] + (fullDescription.includes('.') ? '.' : ''); // Берем до первой точки
        if (this.elements.profileDescriptionShort.textContent.length > 100) { // Если слишком длинное, обрезаем
            this.elements.profileDescriptionShort.textContent = this.elements.profileDescriptionShort.textContent.substring(0, 97) + '...';
        }
        
        // Полное описание
        this.elements.profileDescriptionFull.textContent = fullDescription;
    }

    updateLookingFor(lookingFor, options) {
        const container = this.elements.profileLookingFor;
        if (!container) return;

        container.innerHTML = '';
        
        if (lookingFor && lookingFor.length > 0) {
            const lookingForContainer = document.createElement('div');
            lookingForContainer.className = 'looking-for-container'; // Используем класс из components.css
            
            lookingFor.forEach(optionId => {
                const option = options.find(o => o.id === optionId);
                if (option) {
                    const el = document.createElement('div');
                    el.className = 'looking-for-item';
                    el.innerHTML = `
                        <div class="looking-for-emoji">${option.emoji}</div>
                        <div class="looking-for-text">${option.name}</div>
                    `;
                    lookingForContainer.appendChild(el);
                }
            });
            
            container.appendChild(lookingForContainer);
        } else {
            container.innerHTML = '<div class="no-data">Не указано, что ищет</div>';
        }
    }

    updateInterests(userInterests, configInterests) {
        const container = this.elements.profileInterests;
        if (!container) return;

        container.innerHTML = '';
        
        if (userInterests && userInterests.length > 0) {
            const interestsContainer = document.createElement('div');
            interestsContainer.className = 'interests-container'; // Используем класс из components.css
            
            userInterests.forEach(interestId => {
                const interest = configInterests.find(i => i.id === interestId);
                if (interest) {
                    const el = document.createElement('div');
                    el.className = 'interest-item';
                    el.innerHTML = `
                        <div class="interest-emoji">${interest.emoji}</div>
                        <div class="interest-text">${interest.name}</div>
                    `;
                    interestsContainer.appendChild(el);
                }
            });
            
            container.appendChild(interestsContainer);
        } else {
            container.innerHTML = '<div class="no-data">Интересы не выбраны</div>';
        }
    }

    updatePhotos(photos) {
        const photosContainer = this.elements.profilePhotosGrid;
        if (!photosContainer) return;

        if (photos && photos.length > 0) {
            photosContainer.innerHTML = photos.map(photo => `
                <div class="profile-photo-item" style="background-image: url(${photo})"></div>
            `).join('');
        } else {
            photosContainer.innerHTML = '<div class="no-data">Фотографии не добавлены</div>';
        }
    }

    bindEvents() {
        // Удаляем старые обработчики, чтобы избежать дублирования
        this.elements.editBtn.removeEventListener('click', this.editProfileHandler);
        this.elements.newProfileBtn.removeEventListener('click', this.newProfileHandler);
        this.elements.profileScrollableContent.removeEventListener('touchstart', this.handleTouchStart);
        this.elements.profileScrollableContent.removeEventListener('touchmove', this.handleTouchMove);
        this.elements.profileScrollableContent.removeEventListener('touchend', this.handleTouchEnd);
        this.elements.scrollIndicator.removeEventListener('click', this.toggleExpand);

        // Привязываем новые обработчики
        this.editProfileHandler = () => this.app.switchScreen('registration');
        this.elements.editBtn.addEventListener('click', this.editProfileHandler);

        this.newProfileHandler = () => {
            if (confirm('Вы уверены, что хотите создать новый профиль? Текущие данные будут удалены.')) {
                this.resetProfile();
            }
        };
        this.elements.newProfileBtn.addEventListener('click', this.newProfileHandler);

        // Обработчики для свайпа
        this.elements.profileCard.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.elements.profileCard.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.elements.profileCard.addEventListener('touchend', this.handleTouchEnd.bind(this));
        this.elements.scrollIndicator.addEventListener('click', this.toggleExpand.bind(this));
    }

    resetProfile() {
        this.app.state.userData = {
            name: '',
            gender: '',
            age: '',
            zodiacSign: '',
            city: '',
            description: '',
            interests: [],
            lookingFor: [],
            preference: 'both',
            profileColor: '#FF6B6B',
            avatar: null,
            photos: [],
            location: { lat: null, lng: null }
        };
        
        localStorage.removeItem('datingProfile');
        this.app.switchScreen('registration');
    }

    resetScrollState() {
        this.isExpanded = false;
        this.elements.profileScrollableContent.classList.remove('expanded');
        // Устанавливаем transform на начальное значение из CSS
        this.elements.profileScrollableContent.style.transform = 'translateY(calc(100% - 150px))'; 
        this.elements.profileScrollableContent.scrollTop = 0; // Сброс прокрутки
    }

    handleTouchStart(e) {
        // Проверяем, если касание началось внутри прокручиваемой области и она уже прокручена до конца
        if (this.isExpanded && this.elements.profileScrollableContent.scrollTop > 0 && e.target !== this.elements.scrollIndicator) {
            // Если пользователь пытается прокрутить вверх, когда уже вверху, или вниз, когда уже внизу,
            // то не перехватываем событие для свайпа карточки, а позволяем прокрутке контента
            if (this.elements.profileScrollableContent.scrollHeight > this.elements.profileScrollableContent.clientHeight) {
                // Если контент внутри прокручивается, позволяем ему прокручиваться
                return;
            }
        }

        this.startY = e.touches[0].clientY;
        // Получаем текущее смещение translateY
        const style = window.getComputedStyle(this.elements.profileScrollableContent);
        const matrix = new DOMMatrixReadOnly(style.transform);
        this.currentTranslateY = matrix.m42; // m42 - это значение translateY

        this.elements.profileScrollableContent.style.transition = 'none'; // Отключаем переход для плавного свайпа
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].clientY - this.startY;
        
        // Вычисляем максимальное смещение вверх (когда карточка полностью раскрыта)
        // и начальное смещение (когда карточка скрыта, видна только часть)
        const cardHeight = this.elements.profileCard.offsetHeight;
        const fixedInfoHeight = this.elements.profileFixedInfo.offsetHeight;
        const initialVisibleHeight = 150; // Высота видимой части в скрытом состоянии
        
        // Максимальное смещение вверх (когда transform: translateY(0))
        const maxScrollUp = cardHeight - initialVisibleHeight; 

        let newTranslateY = this.currentTranslateY + deltaY;

        // Ограничиваем newTranslateY в пределах от 0 (полностью раскрыта) до maxScrollUp (скрыта)
        newTranslateY = Math.max(0, Math.min(maxScrollUp, newTranslateY));

        this.elements.profileScrollableContent.style.transform = `translateY(${newTranslateY}px)`;

        // Предотвращаем прокрутку страницы, если мы управляем свайпом карточки
        e.preventDefault();
    }

    handleTouchEnd(e) {
        this.elements.profileScrollableContent.style.transition = 'transform 0.4s ease-out'; // Включаем переход обратно

        const currentTransformY = parseFloat(this.elements.profileScrollableContent.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
        
        const cardHeight = this.elements.profileCard.offsetHeight;
        const initialVisibleHeight = 150;
        const maxScrollUp = cardHeight - initialVisibleHeight;

        // Определяем, должна ли карточка быть раскрыта или скрыта
        if (currentTransformY < maxScrollUp / 2) {
            // Если сдвинули вверх достаточно, раскрываем
            this.elements.profileScrollableContent.classList.add('expanded');
            this.isExpanded = true;
        } else {
            // Иначе скрываем
            this.elements.profileScrollableContent.classList.remove('expanded');
            this.isExpanded = false;
        }
        // Сброс inline стиля, чтобы класс управлял окончательным положением
        this.elements.profileScrollableContent.style.transform = ''; 
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        this.elements.profileScrollableContent.classList.toggle('expanded', this.isExpanded);
        this.elements.profileScrollableContent.scrollTop = 0; // Сбрасываем прокрутку при переключении
    }
}

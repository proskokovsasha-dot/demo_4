class ProfileHandler {
    constructor(app) {
        this.app = app;
        this.initElements();
        this.isExpanded = false;
        this.startY = 0;
        this.currentY = 0;
    }

    initElements() {
        this.elements = {
            profileCard: document.getElementById('myProfileCard'), // Изменено ID
            profileCardBg: document.getElementById('myProfileCardBg'), // Новый элемент
            profileNameAge: document.getElementById('myProfileNameAge'), // Новый элемент
            profileDescriptionShort: document.getElementById('myProfileDescriptionShort'), // Новый элемент
            profileScrollableContent: document.getElementById('myProfileScrollableContent'), // Новый элемент
            profileDescriptionFull: document.getElementById('myProfileDescriptionFull'), // Новый элемент
            profileLookingFor: document.getElementById('myProfileLookingFor'), // Изменено ID
            profileInterests: document.getElementById('myProfileInterests'), // Изменено ID
            profilePhotosGrid: document.getElementById('myProfilePhotosGrid'), // Новый элемент
            editBtn: document.getElementById('editBtn'),
            newProfileBtn: document.getElementById('newProfileBtn'),
            scrollIndicator: document.querySelector('#myProfileScrollableContent .scroll-indicator')
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
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.toggleExpand = this.toggleExpand.bind(this);

        this.elements.profileScrollableContent.addEventListener('touchstart', this.handleTouchStart);
        this.elements.profileScrollableContent.addEventListener('touchmove', this.handleTouchMove);
        this.elements.profileScrollableContent.addEventListener('touchend', this.handleTouchEnd);
        this.elements.scrollIndicator.addEventListener('click', this.toggleExpand);
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
        this.elements.profileScrollableContent.style.transform = ''; // Сброс inline стиля
        this.elements.profileScrollableContent.scrollTop = 0; // Сброс прокрутки
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].clientY;
        this.currentY = this.elements.profileScrollableContent.getBoundingClientRect().top;
        this.elements.profileScrollableContent.style.transition = 'none'; // Отключаем переход для плавного свайпа
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].clientY - this.startY;
        const scrollableHeight = this.elements.profileScrollableContent.offsetHeight;
        const fixedHeight = this.elements.profileFixedInfo.offsetHeight + 30; // 30px - padding-bottom profile-card-content
        const minTranslateY = 0;
        const maxTranslateY = scrollableHeight - fixedHeight; // Максимальное смещение вверх

        let newTranslateY;

        if (this.isExpanded) {
            // Если уже раскрыто, свайп вниз должен закрывать
            newTranslateY = Math.max(minTranslateY, deltaY);
            if (newTranslateY > maxTranslateY / 2) { // Если сдвинули достаточно вниз, закрываем
                this.elements.profileScrollableContent.classList.remove('expanded');
                this.isExpanded = false;
            }
        } else {
            // Если не раскрыто, свайп вверх должен раскрывать
            newTranslateY = Math.min(maxTranslateY, maxTranslateY + deltaY);
            if (newTranslateY < maxTranslateY / 2) { // Если сдвинули достаточно вверх, раскрываем
                this.elements.profileScrollableContent.classList.add('expanded');
                this.isExpanded = true;
            }
        }
        
        // Применяем transform только если не полностью раскрыто/закрыто
        if (!this.isExpanded && newTranslateY > 0) {
             this.elements.profileScrollableContent.style.transform = `translateY(${newTranslateY}px)`;
        } else if (this.isExpanded && newTranslateY < maxTranslateY) {
             this.elements.profileScrollableContent.style.transform = `translateY(${newTranslateY}px)`;
        }
    }

    handleTouchEnd(e) {
        this.elements.profileScrollableContent.style.transition = 'transform 0.4s ease-out'; // Включаем переход обратно

        const currentTransformY = parseFloat(this.elements.profileScrollableContent.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
        const scrollableHeight = this.elements.profileScrollableContent.offsetHeight;
        const fixedHeight = this.elements.profileFixedInfo.offsetHeight + 30;
        const threshold = (scrollableHeight - fixedHeight) / 2; // Порог для определения раскрытия/закрытия

        if (this.isExpanded) {
            // Если было раскрыто, и сдвинули вниз больше порога, закрываем
            if (currentTransformY > threshold) {
                this.elements.profileScrollableContent.classList.remove('expanded');
                this.isExpanded = false;
            } else { // Иначе возвращаем в раскрытое состояние
                this.elements.profileScrollableContent.classList.add('expanded');
                this.isExpanded = true;
            }
        } else {
            // Если было закрыто, и сдвинули вверх больше порога, раскрываем
            if (currentTransformY < threshold) {
                this.elements.profileScrollableContent.classList.add('expanded');
                this.isExpanded = true;
            } else { // Иначе возвращаем в закрытое состояние
                this.elements.profileScrollableContent.classList.remove('expanded');
                this.isExpanded = false;
            }
        }
        this.elements.profileScrollableContent.style.transform = ''; // Сброс inline стиля, чтобы класс управлял
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        this.elements.profileScrollableContent.classList.toggle('expanded', this.isExpanded);
        this.elements.profileScrollableContent.scrollTop = 0; // Сбрасываем прокрутку при переключении
    }
}

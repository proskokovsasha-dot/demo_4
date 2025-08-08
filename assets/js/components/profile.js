class ProfileHandler {
    constructor(app) {
        this.app = app;
        this.initElements();
        this.isExpanded = false;
        this.startY = 0;
        this.currentTranslateY = 0;
        this.isScrollingContent = false; // Флаг, указывающий, что пользователь прокручивает контент внутри
        this.fixedInfoHeight = 0; // Добавляем свойство для хранения высоты фиксированной информации
        this.scrollThreshold = 50; // Порог для определения свайпа вверх/вниз
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
            profileFixedInfo: document.getElementById('myProfileFixedInfo')
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
        this.measureFixedInfoHeight(); // Измеряем высоту после рендеринга
        this.resetScrollState(); // Сбрасываем состояние после измерения
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
            this.elements.profileCardBg.style.backgroundColor = 'var(--primary-dark)';
        }
    }

    updateProfileInfo(userData) {
        let nameAgeText = userData.name || 'Аноним';
        if (userData.age) {
            nameAgeText += `, ${userData.age}`;
        }
        this.elements.profileNameAge.textContent = nameAgeText;
        
        const fullDescription = userData.description || 'Пользователь пока ничего о себе не рассказал.';
        this.elements.profileDescriptionShort.textContent = fullDescription.split('.')[0] + (fullDescription.includes('.') ? '.' : '');
        if (this.elements.profileDescriptionShort.textContent.length > 100) {
            this.elements.profileDescriptionShort.textContent = this.elements.profileDescriptionShort.textContent.substring(0, 97) + '...';
        }
        
        this.elements.profileDescriptionFull.textContent = fullDescription;
    }

    updateLookingFor(lookingFor, options) {
        const container = this.elements.profileLookingFor;
        if (!container) return;

        container.innerHTML = '';
        
        if (lookingFor && lookingFor.length > 0) {
            const lookingForContainer = document.createElement('div');
            lookingForContainer.className = 'profile-looking-for-container';
            
            lookingFor.forEach(optionId => {
                const option = options.find(o => o.id === optionId);
                if (option) {
                    const el = document.createElement('div');
                    el.className = 'profile-looking-for-item';
                    el.innerHTML = `
                        <span class="emoji">${option.emoji}</span>
                        <span class="text">${option.name}</span>
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
            interestsContainer.className = 'profile-interests-container';
            
            userInterests.forEach(interestId => {
                const interest = configInterests.find(i => i.id === interestId);
                if (interest) {
                    const el = document.createElement('div');
                    el.className = 'profile-interest-item';
                    el.innerHTML = `
                        <span class="emoji">${interest.emoji}</span>
                        <span class="text">${interest.name}</span>
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
        this.elements.profileCard.removeEventListener('touchstart', this.handleTouchStartBound);
        this.elements.profileCard.removeEventListener('touchmove', this.handleTouchMoveBound);
        this.elements.profileCard.removeEventListener('touchend', this.handleTouchEndBound);
        this.elements.scrollIndicator.removeEventListener('click', this.toggleExpandBound);

        // Привязываем новые обработчики
        this.editProfileHandler = () => this.app.switchScreen('registration');
        this.elements.editBtn.addEventListener('click', this.editProfileHandler);

        this.newProfileHandler = () => {
            if (confirm('Вы уверены, что хотите создать новый профиль? Текущие данные будут удалены.')) {
                this.resetProfile();
            }
        };
        this.elements.newProfileBtn.addEventListener('click', this.newProfileHandler);

        // Привязываем методы свайпа к this
        this.handleTouchStartBound = this.handleTouchStart.bind(this);
        this.handleTouchMoveBound = this.handleTouchMove.bind(this);
        this.handleTouchEndBound = this.handleTouchEnd.bind(this);
        this.toggleExpandBound = this.toggleExpand.bind(this);

        this.elements.profileCard.addEventListener('touchstart', this.handleTouchStartBound, { passive: false });
        this.elements.profileCard.addEventListener('touchmove', this.handleTouchMoveBound, { passive: false });
        this.elements.profileCard.addEventListener('touchend', this.handleTouchEndBound);
        this.elements.scrollIndicator.addEventListener('click', this.toggleExpandBound);
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

    measureFixedInfoHeight() {
        // Убедимся, что элемент виден для корректного измерения
        this.elements.profileFixedInfo.style.position = 'relative';
        this.elements.profileFixedInfo.style.visibility = 'hidden';
        this.elements.profileFixedInfo.style.display = 'block';

        this.fixedInfoHeight = this.elements.profileFixedInfo.offsetHeight;
        
        // Возвращаем исходные стили
        this.elements.profileFixedInfo.style.position = 'absolute';
        this.elements.profileFixedInfo.style.visibility = 'visible';
        this.elements.profileFixedInfo.style.display = '';

        // Устанавливаем CSS-переменные для использования в стилях
        document.documentElement.style.setProperty('--profile-fixed-info-height', `${this.fixedInfoHeight + 30}px`);
        document.documentElement.style.setProperty('--profile-fixed-info-height-mobile', `${this.fixedInfoHeight + 20}px`);
        document.documentElement.style.setProperty('--profile-fixed-info-height-mobile-sm', `${this.fixedInfoHeight + 15}px`);
    }

    resetScrollState() {
        this.isExpanded = false;
        this.elements.profileScrollableContent.classList.remove('expanded');
        // Используем вычисленную высоту для начального положения
        this.elements.profileScrollableContent.style.transform = `translateY(calc(100% - ${this.fixedInfoHeight + 30}px))`; 
        this.elements.profileScrollableContent.scrollTop = 0;
        // Убедимся, что фиксированная информация видна при свернутом состоянии
        this.elements.profileFixedInfo.style.opacity = '1';
        this.elements.profileFixedInfo.style.pointerEvents = 'none';
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].clientY;
        const style = window.getComputedStyle(this.elements.profileScrollableContent);
        this.currentTranslateY = new DOMMatrixReadOnly(style.transform).m42;

        const target = e.target;
        const scrollable = this.elements.profileScrollableContent;
        const isInsideScrollableContent = scrollable.contains(target) && target !== this.elements.scrollIndicator;

        if (isInsideScrollableContent && this.isExpanded) {
            // Если пользователь уже прокручивает контент, позволяем ему это делать
            this.isScrollingContent = true;
        } else {
            this.isScrollingContent = false;
        }
        
        this.elements.profileScrollableContent.style.transition = 'none';
        this.elements.profileFixedInfo.style.transition = 'opacity 0.3s ease-out';
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].clientY - this.startY;
        
        if (this.isScrollingContent) {
            // Если пользователь прокручивает контент внутри, и он достиг края прокрутки,
            // то мы можем начать перехватывать событие для свайпа карточки.
            const scrollable = this.elements.profileScrollableContent;
            const atTop = scrollable.scrollTop === 0;
            const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight;

            if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
                // Если свайп вниз на самом верху или свайп вверх на самом низу,
                // то переключаемся на управление карточкой.
                this.isScrollingContent = false;
            } else {
                // Иначе, продолжаем прокручивать контент
                return;
            }
        }

        // Если мы дошли до этой точки, значит, мы управляем карточкой
        e.preventDefault(); // Предотвращаем прокрутку страницы

        const cardHeight = this.elements.profileCard.offsetHeight;
        const initialVisibleHeight = this.fixedInfoHeight + 30; 
        // const maxScrollUp = cardHeight - initialVisibleHeight; // Это не совсем корректно для expanded state

        let newTranslateY = this.currentTranslateY + deltaY;

        // Ограничиваем движение:
        // - Нельзя свайпнуть ниже начального свернутого положения
        // - Нельзя свайпнуть выше, чем полностью раскрытое положение (с небольшим отступом сверху)
        const expandedPosition = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--profile-fixed-info-height-mobile').replace('px', ''));
        newTranslateY = Math.max(expandedPosition, Math.min(cardHeight - this.scrollThreshold, newTranslateY)); 

        this.elements.profileScrollableContent.style.transform = `translateY(${newTranslateY}px)`;

        // Рассчитываем прозрачность фиксированной информации
        // Определение диапазона для изменения прозрачности
        const opacityRangeStart = expandedPosition;
        const opacityRangeEnd = initialVisibleHeight; // Когда фиксированная инфо полностью видна

        let opacity = 1; // По умолчанию полностью видна
        if (newTranslateY < opacityRangeEnd) {
            opacity = (newTranslateY - opacityRangeStart) / (opacityRangeEnd - opacityRangeStart);
            opacity = Math.max(0, Math.min(1, opacity)); // Ограничиваем от 0 до 1
        }
        this.elements.profileFixedInfo.style.opacity = opacity;
    }

    handleTouchEnd(e) {
        if (this.isScrollingContent) {
            this.isScrollingContent = false;
            return;
        }

        this.elements.profileScrollableContent.style.transition = 'transform 0.4s ease-out';
        this.elements.profileFixedInfo.style.transition = 'opacity 0.4s ease-out';

        const currentTransformY = new DOMMatrixReadOnly(window.getComputedStyle(this.elements.profileScrollableContent).transform).m42;
        
        const cardHeight = this.elements.profileCard.offsetHeight;
        const initialVisibleHeight = this.fixedInfoHeight + 30;
        const expandedPosition = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--profile-fixed-info-height-mobile').replace('px', ''));

        const thresholdForExpand = expandedPosition + (initialVisibleHeight - expandedPosition) / 2;

        // Определяем, должна ли карточка быть полностью раскрыта или свернута
        if (currentTransformY < thresholdForExpand) {
            this.elements.profileScrollableContent.classList.add('expanded');
            this.isExpanded = true;
            this.elements.profileFixedInfo.style.opacity = '0';
        } else {
            this.elements.profileScrollableContent.classList.remove('expanded');
            this.isExpanded = false;
            this.elements.profileFixedInfo.style.opacity = '1';
        }
        // Сброс трансформации, чтобы класс expanded мог управлять
        this.elements.profileScrollableContent.style.transform = ''; 
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        this.elements.profileScrollableContent.classList.toggle('expanded', this.isExpanded);
        this.elements.profileScrollableContent.scrollTop = 0;
        this.elements.profileFixedInfo.style.opacity = this.isExpanded ? '0' : '1';
        this.elements.profileFixedInfo.style.transition = 'opacity 0.4s ease-out';
    }
}

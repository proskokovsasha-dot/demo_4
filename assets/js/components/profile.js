class ProfileHandler {
    constructor(app) {
        this.app = app;
        this.initElements();
        this.isExpanded = false;
        this.startY = 0;
        this.currentTranslateY = 0; // Изменено на currentTranslateY для более точного отслеживания
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
        this.resetScrollState();
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
            lookingForContainer.className = 'looking-for-container';
            
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
            interestsContainer.className = 'interests-container';
            
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

        this.elements.profileCard.addEventListener('touchstart', this.handleTouchStartBound);
        this.elements.profileCard.addEventListener('touchmove', this.handleTouchMoveBound);
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

    resetScrollState() {
        this.isExpanded = false;
        this.elements.profileScrollableContent.classList.remove('expanded');
        this.elements.profileScrollableContent.style.transform = 'translateY(calc(100% - 150px))'; 
        this.elements.profileScrollableContent.scrollTop = 0;
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].clientY;
        const style = window.getComputedStyle(this.elements.profileScrollableContent);
        this.currentTranslateY = new DOMMatrixReadOnly(style.transform).m42;

        // Проверяем, если касание началось внутри прокручиваемой области
        const target = e.target;
        const isInsideScrollableContent = this.elements.profileScrollableContent.contains(target) && target !== this.elements.scrollIndicator;

        if (isInsideScrollableContent && this.isExpanded) {
            // Если контент прокручивается и пользователь пытается прокрутить его
            const scrollable = this.elements.profileScrollableContent;
            const atTop = scrollable.scrollTop === 0;
            const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight;

            // Если пользователь пытается прокрутить вниз, когда уже внизу, или вверх, когда уже вверху,
            // то мы можем перехватить событие для свайпа карточки.
            // В противном случае, позволяем прокрутке контента.
            if ((atTop && e.touches[0].clientY > this.startY) || (atBottom && e.touches[0].clientY < this.startY)) {
                // Продолжаем обработку свайпа карточки
            } else {
                // Позволяем прокрутке контента
                this.isScrollingContent = true;
                return;
            }
        }
        this.isScrollingContent = false;
        this.elements.profileScrollableContent.style.transition = 'none';
    }

    handleTouchMove(e) {
        if (this.isScrollingContent) {
            // Если мы прокручиваем контент, не перехватываем событие
            return;
        }

        const deltaY = e.touches[0].clientY - this.startY;
        
        const cardHeight = this.elements.profileCard.offsetHeight;
        const initialVisibleHeight = 150;
        const maxScrollUp = cardHeight - initialVisibleHeight; 

        let newTranslateY = this.currentTranslateY + deltaY;

        newTranslateY = Math.max(0, Math.min(maxScrollUp, newTranslateY));

        this.elements.profileScrollableContent.style.transform = `translateY(${newTranslateY}px)`;

        e.preventDefault(); // Предотвращаем прокрутку страницы
    }

    handleTouchEnd(e) {
        if (this.isScrollingContent) {
            this.isScrollingContent = false;
            return;
        }

        this.elements.profileScrollableContent.style.transition = 'transform 0.4s ease-out';

        const currentTransformY = parseFloat(this.elements.profileScrollableContent.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
        
        const cardHeight = this.elements.profileCard.offsetHeight;
        const initialVisibleHeight = 150;
        const maxScrollUp = cardHeight - initialVisibleHeight;

        if (currentTransformY < maxScrollUp / 2) {
            this.elements.profileScrollableContent.classList.add('expanded');
            this.isExpanded = true;
        } else {
            this.elements.profileScrollableContent.classList.remove('expanded');
            this.isExpanded = false;
        }
        this.elements.profileScrollableContent.style.transform = ''; 
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        this.elements.profileScrollableContent.classList.toggle('expanded', this.isExpanded);
        this.elements.profileScrollableContent.scrollTop = 0;
    }
}

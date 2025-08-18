class ProfileHandler {
    constructor(app) {
        this.app = app;
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.elements = {
            profileCard: document.getElementById('myProfileCard'),
            profileCardBg: document.getElementById('myProfileCardBg'),
            profileNameAge: document.getElementById('myProfileNameAge'),
            profileDescriptionShort: document.getElementById('myProfileDescriptionShort'),
            profileFixedInfo: document.getElementById('myProfileFixedInfo'),
        };
    }

    bindEvents() {
        if (this.profileCardClickHandler) {
            this.elements.profileCard.removeEventListener('click', this.profileCardClickHandler);
        }

        // Обработчик для открытия модального окна при клике на карточку профиля
        this.profileCardClickHandler = () => {
            this.app.showProfileFullModal(this.app.state.userData);
        };
        this.elements.profileCard.addEventListener('click', this.profileCardClickHandler);
    }

    showProfile() {
        const { userData } = this.app.state;

        // Обновляем фон карточки профиля (для предпросмотра)
        this.updateProfileCardBackground(userData.avatar);
        // Обновляем краткую информацию на карточке профиля
        this.updateProfileInfo(userData);
        // Обновляем тексты (если есть)
        this.updateProfileTexts();
    }

    updateProfileCardBackground(avatar) {
        // Используем userData.name для генерации уникального seed для аватара текущего пользователя
        this.elements.profileCardBg.style.backgroundImage = `url(https://picsum.photos/seed/${this.app.state.userData.name}/400/600)`;
        this.elements.profileCardBg.style.backgroundColor = 'var(--primary-dark)'; // Use primary-dark from theme
    }

    updateProfileInfo(userData) {
        let nameAgeText = userData.name || this.app.translate('anonymous');
        if (userData.age) {
            nameAgeText += `, ${userData.age}`;
        }
        this.elements.profileNameAge.textContent = nameAgeText;

        const fullDescription = userData.description || this.app.translate('noDescription');
        this.elements.profileDescriptionShort.textContent = fullDescription.split('.')[0] + (fullDescription.includes('.') ? '.' : '');
        if (this.elements.profileDescriptionShort.textContent.length > 100) {
            this.elements.profileDescriptionShort.textContent = this.elements.profileDescriptionShort.textContent.substring(0, 97) + '...';
        }
    }

    // Эти функции теперь используются только для модального окна, но оставлены здесь, если потребуется их переиспользовать
    updateZodiacSign(zodiacSign) {
        // Логика перемещена в showProfileFullModal в app.js
    }

    updateLookingFor(lookingFor, options) {
        // Логика перемещена в showProfileFullModal в app.js
    }

    updateInterests(userInterests, configInterests) {
        // Логика перемещена в showProfileFullModal в app.js
    }

    resetProfile() {
        // Эта функция теперь вызывается через clearAllData в app.js
        this.app.clearAllData();
    }

    updateProfileTexts() {
        // Тексты кнопок теперь обновляются в app.js при инициализации элементов модального окна
        // и при переключении языка.
    }
}

class DatingApp {
    constructor() {
        this.config = {
            colors: ['#FF6B6B', '#4ECDC4', '#4A64BF', '#FDCB6E', '#A05195', '#2ECC71', '#E74C3C', '#3498DB', '#9B59B6', '#1ABC9C', '#F1C40F', '#E67E22'],
            maxInterests: 5,
            minAge: 18,
            maxAge: 100,
            interests: [
                { id: 'music', name: 'Музыка', emoji: '🎵' },
                { id: 'sports', name: 'Спорт', emoji: '⚽' },
                { id: 'books', name: 'Книги', emoji: '📚' },
                { id: 'travel', name: 'Путешествия', emoji: '✈️' },
                { id: 'art', name: 'Искусство', emoji: '🎨' },
                { id: 'games', name: 'Игры', emoji: '🎮' },
                { id: 'cooking', name: 'Кулинария', emoji: '🍳' },
                { id: 'photography', name: 'Фотография', emoji: '📷' },
                { id: 'movies', name: 'Кино', emoji: '🎬' },
                { id: 'nature', name: 'Природа', emoji: '🌳' },
                { id: 'technology', name: 'Технологии', emoji: '💻' },
                { id: 'fashion', name: 'Мода', emoji: '👗' }
            ],
            lookingForOptions: [
                { id: 'friendship', name: 'Дружба', emoji: '🤝' },
                { id: 'dating', name: 'Романтические отношения', emoji: '💑' },
                { id: 'serious', name: 'Серьёзные отношения', emoji: '💍' },
                { id: 'networking', name: 'Нетворкинг', emoji: '👔' },
                { id: 'travel', name: 'Спутник для путешествий', emoji: '✈️' }
            ],
            preferenceOptions: [
                { id: 'male', name: 'Мужчин', emoji: '👨' },
                { id: 'female', name: 'Женщин', emoji: '👩' },
                { id: 'both', name: 'Всех', emoji: '🚻' }
            ],
            zodiacSigns: [
                { id: 'aquarius', name: 'Водолей', emoji: '♒', start: '01-20', end: '02-18' },
                { id: 'pisces', name: 'Рыбы', emoji: '♓', start: '02-19', end: '03-20' },
                { id: 'aries', name: 'Овен', emoji: '♈', start: '03-21', end: '04-19' },
                { id: 'taurus', name: 'Телец', emoji: '♉', start: '04-20', end: '05-20' },
                { id: 'gemini', name: 'Близнецы', emoji: '♊', start: '05-21', end: '06-20' },
                { id: 'cancer', name: 'Рак', emoji: '♋', start: '06-21', end: '07-22' },
                { id: 'leo', name: 'Лев', emoji: '♌', start: '07-23', end: '08-22' },
                { id: 'virgo', name: 'Дева', emoji: '♍', start: '08-23', end: '09-22' },
                { id: 'libra', name: 'Весы', emoji: '♎', start: '09-23', end: '10-22' },
                { id: 'scorpio', name: 'Скорпион', emoji: '♏', start: '10-23', end: '11-21' },
                { id: 'sagittarius', name: 'Стрелец', emoji: '♐', start: '11-22', end: '12-21' },
                { id: 'capricorn', name: 'Козерог', emoji: '♑', start: '12-22', end: '01-19' }
            ]
        };

        this.state = {
            currentScreen: 'main',
            userData: {
                name: '',
                gender: '',
                age: '',
                dob: { day: '', month: '', year: '' },
                zodiacSign: null,
                city: '',
                description: '',
                interests: [],
                lookingFor: [],
                preference: 'both',
                profileColor: '#FF6B6B',
            },
            suggestedProfiles: [],
            currentLanguage: 'ru', // Default language
        };

        this.translations = {
            ru: {
                appName: 'ТочкаСхода',
                appSubtitle: 'Место, где сливаются ваши пути',
                profile: 'Профиль',
                matches: 'Анкеты',
                chat: 'Чат',
                settings: 'Настройки',
                loadingTitle: 'ТочкаСхода',
                loadingSubtitle: 'Место, где сливаются ваши пути',
                registrationTitle: 'Расскажите о себе',
                registrationDescription: 'Заполните информацию, чтобы создать свой профиль.',
                yourName: 'Ваше имя',
                male: 'Мужчина',
                female: 'Женщина',
                yourAge: 'Ваш возраст',
                yourDob: 'Ваша дата рождения',
                day: 'День',
                month: 'Месяц',
                year: 'Год',
                yourZodiacSign: 'Ваш знак зодиака',
                yourCity: 'Где вы живете?',
                whatAreYouLookingFor: 'Что вы ищете?',
                yourInterests: 'Ваши интересы',
                whoAreYouLookingFor: 'Кого вы ищете?',
                profileColor: 'Цвет профиля',
                orChooseYourColor: 'Или выберите свой цвет',
                yourPhotos: 'Ваши фото', // Удалено из функционала, но оставлено для перевода
                addPhoto: '📸 Добавить фото', // Удалено из функционала, но оставлено для перевода
                addPhotoDescription: 'Добавьте фото для профиля.', // Удалено из функционала, но оставлено для перевода
                aboutYou: 'О себе',
                aboutYouPlaceholder: 'Я люблю путешествия, книги и...',
                saveProfile: 'Сохранить профиль',
                edit: 'Редактировать',
                newProfile: 'Новый профиль',
                noData: 'Нет данных',
                noDescription: 'Пользователь пока ничего о себе не рассказал.',
                noLookingFor: 'Не указано, что ищет',
                noInterests: 'Интересы не выбраны',
                noPhotos: 'Фотографии не добавлены', // Удалено из функционала, но оставлено для перевода
                noNewProfiles: 'Пока нет новых анкет. Попробуйте позже!',
                backToProfile: 'Вернуться в профиль',
                yourChats: 'Ваши чаты',
                yourChatsDescription: 'Здесь будут отображаться ваши диалоги.',
                noActiveChats: 'У вас пока нет активных чатов. Начните знакомиться в разделе "Анкеты"!',
                typeMessage: 'Напишите сообщение...',
                clearProfileData: 'Очистить данные профиля',
                confirmClearData: 'Вы уверены, что хотите полностью очистить все данные профиля? Это действие необратимо.',
                swipeTutorialTitle: 'Добро пожаловать в Анкеты!',
                swipeTutorialText1: 'Здесь вы можете просматривать профили других пользователей.',
                swipeTutorialText2: '👉 Смахните вправо, чтобы поставить **ЛАЙК**.<br>👈 Смахните влево, чтобы **ПРОПУСТИТЬ** анкету.<br>👆 Смахните вверх, чтобы поставить **СУПЕРЛАЙК**!',
                gotIt: 'Понятно!',
                match: 'Это Мэтч!',
                likeSent: 'Лайк отправлен!',
                superlikeSent: 'Суперлайк отправлен!',
                youLiked: 'Вы понравились {name}!',
                youLikedName: 'Вы лайкнули {name}. Ждем ответа!',
                youSuperlikedName: 'Вы отправили суперлайк {name}. Надеемся на взаимность!',
                writeMessage: 'Написать сообщение',
                continueSwiping: 'Продолжить свайпать',
                lastActiveToday: 'Была сегодня',
                lastActiveYesterday: 'Была вчера',
                lastActiveThisWeek: 'Была на этой неделе',
                lastActiveRecently: 'Была недавно',
                km: 'км',
                maxInterestsAlert: 'Вы можете выбрать не более {maxInterests} интересов.',
                fillAllFieldsAlert: 'Пожалуйста, заполните все обязательные поля.',
                invalidDate: 'Пожалуйста, введите корректную дату.',
                friendship: 'Дружба',
                dating: 'Романтические отношения',
                serious: 'Серьёзные отношения',
                networking: 'Нетворкинг',
                travelCompanion: 'Спутник для путешествий',
                men: 'Мужчин',
                women: 'Женщин',
                all: 'Всех',
                music: 'Музыка',
                sports: 'Спорт',
                books: 'Книги',
                travel: 'Путешествия',
                art: 'Искусство',
                games: 'Игры',
                cooking: 'Кулинария',
                photography: 'Фотография',
                movies: 'Кино',
                nature: 'Природа',
                technology: 'Технологии',
                fashion: 'Мода',
                languageSelection: 'Выбор языка',
                selectLanguage: 'Выберите язык',
                next: 'Далее',
                back: 'Назад',
                profileColorSettings: 'Цвет профиля',
                aquarius: 'Водолей',
                pisces: 'Рыбы',
                aries: 'Овен',
                taurus: 'Телец',
                gemini: 'Близнецы',
                cancer: 'Рак',
                leo: 'Лев',
                virgo: 'Дева',
                libra: 'Весы',
                scorpio: 'Скорпион',
                sagittarius: 'Стрелец',
                capricorn: 'Козерог',
            },
            en: {
                appName: 'Meeting Point',
                appSubtitle: 'Where your paths converge',
                profile: 'Profile',
                matches: 'Matches',
                chat: 'Chat',
                settings: 'Settings',
                loadingTitle: 'Meeting Point',
                loadingSubtitle: 'Where your paths converge',
                registrationTitle: 'Tell Us About Yourself',
                registrationDescription: 'Fill in your information to create your profile.',
                yourName: 'Your Name',
                male: 'Male',
                female: 'Female',
                yourAge: 'Your Age',
                yourDob: 'Your Date of Birth',
                day: 'Day',
                month: 'Month',
                year: 'Year',
                yourZodiacSign: 'Your Zodiac Sign',
                yourCity: 'Where do you live?',
                whatAreYouLookingFor: 'What are you looking for?',
                yourInterests: 'Your Interests',
                whoAreYouLookingFor: 'Who are you looking for?',
                profileColor: 'Profile Color',
                orChooseYourColor: 'Or choose your own color',
                yourPhotos: 'Your Photos', // Removed from functionality, but kept for translation
                addPhoto: '📸 Add Photo', // Removed from functionality, but kept for translation
                addPhotoDescription: 'Add photos for your profile.', // Removed from functionality, but kept for translation
                aboutYou: 'About You',
                aboutYouPlaceholder: 'I love traveling, books, and...',
                saveProfile: 'Save Profile',
                edit: 'Edit',
                newProfile: 'New Profile',
                noData: 'No data',
                noDescription: 'User has not provided a description yet.',
                noLookingFor: 'Not specified what they are looking for',
                noInterests: 'No interests selected',
                noPhotos: 'No photos added', // Removed from functionality, but kept for translation
                noNewProfiles: 'No new profiles for now. Try again later!',
                backToProfile: 'Back to Profile',
                yourChats: 'Your Chats',
                yourChatsDescription: 'Your conversations will appear here.',
                noActiveChats: 'You don\'t have active chats yet. Start meeting people in the "Matches" section!',
                typeMessage: 'Type a message...',
                clearProfileData: 'Clear Profile Data',
                confirmClearData: 'Are you sure you want to completely clear all profile data? This action is irreversible.',
                swipeTutorialTitle: 'Welcome to Matches!',
                swipeTutorialText1: 'Here you can view other users\' profiles.',
                swipeTutorialText2: '👉 Swipe right to **LIKE**.<br>👈 Swipe left to **SKIP**.<br>👆 Swipe up to **SUPERLIKE**!',
                gotIt: 'Got it!',
                match: 'It\'s a Match!',
                likeSent: 'Like Sent!',
                superlikeSent: 'Superlike Sent!',
                youLiked: 'You liked {name}!',
                youLikedName: 'You liked {name}. Waiting for a response!',
                youSuperlikedName: 'You sent a superlike to {name}. Hoping for a match!',
                writeMessage: 'Write a message',
                continueSwiping: 'Continue Swiping',
                lastActiveToday: 'Online today',
                lastActiveYesterday: 'Online yesterday',
                lastActiveThisWeek: 'Online this week',
                lastActiveRecently: 'Online recently',
                km: 'km',
                maxInterestsAlert: 'You can select no more than {maxInterests} interests.',
                fillAllFieldsAlert: 'Please fill in all required fields.',
                invalidDate: 'Please enter a valid date.',
                friendship: 'Friendship',
                dating: 'Dating',
                serious: 'Serious relationship',
                networking: 'Networking',
                travelCompanion: 'Travel companion',
                men: 'Men',
                women: 'Women',
                all: 'All',
                music: 'Music',
                sports: 'Sports',
                books: 'Books',
                travel: 'Travel',
                art: 'Art',
                games: 'Games',
                cooking: 'Cooking',
                photography: 'Photography',
                movies: 'Movies',
                nature: 'Nature',
                technology: 'Technology',
                fashion: 'Fashion',
                languageSelection: 'Language Selection',
                selectLanguage: 'Select Language',
                next: 'Next',
                back: 'Back',
                profileColorSettings: 'Profile Color',
                aquarius: 'Aquarius',
                pisces: 'Pisces',
                aries: 'Aries',
                taurus: 'Taurus',
                gemini: 'Gemini',
                cancer: 'Cancer',
                leo: 'Leo',
                virgo: 'Virgo',
                libra: 'Libra',
                scorpio: 'Scorpio',
                sagittarius: 'Sagittarius',
                capricorn: 'Capricorn',
            }
        };

        this.initElements();
        this.formHandler = new FormHandler(this);
        this.profileHandler = new ProfileHandler(this);
        this.uiHandler = new UIHandler(this);
        this.matchHandler = new MatchHandler(this);
        this.chatHandler = new ChatHandler(this);
        this.settingsHandler = new SettingsHandler(this);

        this.bindEvents();
        this.checkSavedProfile();
        this.setLanguage(this.state.currentLanguage);
        this.showLoadingScreen();
    }

    showLoadingScreen() {
        this.uiHandler.initLogoAnimation();

        const loadingTextElements = document.querySelectorAll('.loading-text');
        loadingTextElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px) scale(0.95)';
        });

        setTimeout(() => {
            loadingTextElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }, 1500);

        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            const appContainer = document.getElementById('appContainer');

            loadingScreen.style.opacity = '0';

            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.style.display = 'none';
                appContainer.style.display = 'flex';
                this.switchScreen(this.state.currentScreen);
            }, { once: true });
        }, 3500);
    }

    initElements() {
        this.elements = {
            registrationForm: document.getElementById('registrationForm'),
            profileView: document.getElementById('profileView'),
            matchScreen: document.getElementById('matchScreen'),
            chatScreen: document.getElementById('chatScreen'),
            settingsScreen: document.getElementById('settingsScreen'),
            topNavigation: document.getElementById('topNavigation'),
            navButtons: document.querySelectorAll('.nav-btn'),
            swipeTutorialModal: document.getElementById('swipeTutorialModal'),
            modalGotItBtn: document.getElementById('modalGotItBtn'),
            matchSuccessModal: document.getElementById('matchSuccessModal'),
            matchModalIcon: document.getElementById('matchModalIcon'),
            matchModalTitle: document.getElementById('matchModalTitle'),
            matchModalMessage: document.getElementById('matchModalMessage'),
            matchModalAvatar: document.getElementById('matchModalAvatar'),
            matchModalChatBtn: document.getElementById('matchModalChatBtn'),
            matchModalContinueBtn: document.getElementById('matchModalContinueBtn'),
            loadingTitle: document.getElementById('loadingTitle'),
            loadingSubtitle: document.getElementById('loadingSubtitle'),
            navProfileText: document.getElementById('navProfileText'),
            navMatchesText: document.getElementById('navMatchesText'),
            navChatText: document.getElementById('navChatText'),
            navSettingsText: document.getElementById('navSettingsText'),
        };
    }

    bindEvents() {
        this.elements.navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const screenName = e.currentTarget.dataset.screen;
                this.switchScreen(screenName);
            });
        });

        const backToProfileFromMatchBtn = document.getElementById('backToProfileFromMatchBtn');
        if (backToProfileFromMatchBtn) {
            backToProfileFromMatchBtn.addEventListener('click', () => this.switchScreen('profile'));
        }

        // Clear data button is now handled within SettingsHandler
        // No need to bind it here directly, as SettingsHandler will re-render and re-bind

        if (this.elements.modalGotItBtn) {
            this.elements.modalGotItBtn.addEventListener('click', () => this.hideSwipeTutorialModal());
        }

        if (this.elements.matchModalChatBtn) {
            this.elements.matchModalChatBtn.addEventListener('click', () => {
                this.hideMatchSuccessModal();
                if (this.matchHandler.lastMatchedProfile) {
                    this.chatHandler.openChat(this.matchHandler.lastMatchedProfile.id);
                    this.switchScreen('chat');
                }
            });
        }
        if (this.elements.matchModalContinueBtn) {
            this.elements.matchModalContinueBtn.addEventListener('click', () => {
                this.hideMatchSuccessModal();
                this.matchHandler.showNextProfile();
            });
        }
    }

    checkSavedProfile() {
        const savedProfile = localStorage.getItem('datingProfile');
        const savedLanguage = localStorage.getItem('appLanguage');

        if (savedLanguage) {
            this.state.currentLanguage = savedLanguage;
        }

        if (savedProfile) {
            try {
                this.state.userData = JSON.parse(savedProfile);
                if (!Array.isArray(this.state.userData.interests)) {
                    this.state.userData.interests = [];
                }
                if (!Array.isArray(this.state.userData.lookingFor)) {
                    this.state.userData.lookingFor = [];
                }
                if (!this.state.userData.preference) {
                    this.state.userData.preference = 'both';
                }
                if (!this.state.userData.dob) {
                    this.state.userData.dob = { day: '', month: '', year: '' };
                }
                if (!this.state.userData.zodiacSign) {
                    this.state.userData.zodiacSign = null;
                }
                if (!this.state.userData.profileColor) {
                    this.state.userData.profileColor = '#FF6B6B';
                }
                this.state.currentScreen = 'profile';
            } catch (e) {
                console.error('Ошибка при загрузке профиля:', e);
                localStorage.removeItem('datingProfile');
                this.state.currentScreen = 'registration';
            }
        } else {
            this.state.currentScreen = 'registration';
        }
    }

    showProfile() {
        this.profileHandler.showProfile();
    }

    startMatch() {
        this.matchHandler.startMatch();
        if (!localStorage.getItem('swipeTutorialShown')) {
            this.showSwipeTutorialModal();
            localStorage.setItem('swipeTutorialShown', 'true');
        }
    }

    clearAllData() {
        localStorage.removeItem('datingProfile');
        localStorage.removeItem('swipeTutorialShown');
        localStorage.removeItem('appLanguage');
        this.state.userData = {
            name: '',
            gender: '',
            age: '',
            dob: { day: '', month: '', year: '' },
            zodiacSign: null,
            city: '',
            description: '',
            interests: [],
            lookingFor: [],
            preference: 'both',
            profileColor: '#FF6B6B',
        };
        this.chatHandler.chats = {};
        alert(this.translate('confirmClearData'));
        this.setLanguage('ru');
        this.switchScreen('registration');
    }

    switchScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });

        this.elements.navButtons.forEach(button => button.classList.remove('active'));

        let targetScreenElement;
        if (screenName === 'registration') {
            targetScreenElement = this.elements.registrationForm;
            this.elements.topNavigation.style.display = 'none';
            this.formHandler.renderForm();
        } else if (screenName === 'profile') {
            targetScreenElement = this.elements.profileView;
            document.querySelector('.nav-btn[data-screen="profile"]').classList.add('active');
            this.elements.topNavigation.style.display = 'flex';
            this.profileHandler.showProfile();
        } else if (screenName === 'match') {
            targetScreenElement = this.elements.matchScreen;
            document.querySelector('.nav-btn[data-screen="match"]').classList.add('active');
            this.elements.topNavigation.style.display = 'flex';
            this.matchHandler.startMatch();
        } else if (screenName === 'chat') {
            targetScreenElement = this.elements.chatScreen;
            document.querySelector('.nav-btn[data-screen="chat"]').classList.add('active');
            this.elements.topNavigation.style.display = 'flex';
            this.chatHandler.showChatListScreen();
        } else if (screenName === 'settings') {
            targetScreenElement = this.elements.settingsScreen;
            document.querySelector('.nav-btn[data-screen="settings"]').classList.add('active');
            this.elements.topNavigation.style.display = 'flex';
            this.settingsHandler.renderSettings();
        }

        if (targetScreenElement) {
            targetScreenElement.style.display = 'flex';
            setTimeout(() => {
                targetScreenElement.classList.add('active');
            }, 10);
        }

        this.state.currentScreen = screenName;
        this.updateTextContent();
    }

    showSwipeTutorialModal() {
        this.elements.swipeTutorialModal.classList.add('active');
        this.updateTextContent();
    }

    hideSwipeTutorialModal() {
        this.elements.swipeTutorialModal.classList.remove('active');
    }

    showMatchSuccessModal(profile, type = 'match') {
        this.elements.matchModalAvatar.style.backgroundImage = `url(https://picsum.photos/seed/${profile.id}/100/100)`;
        if (type === 'match') {
            this.elements.matchModalIcon.textContent = '❤️';
            this.elements.matchModalTitle.textContent = this.translate('match');
            this.elements.matchModalMessage.textContent = this.translate('youLiked', { name: profile.name });
        } else if (type === 'like') {
            this.elements.matchModalIcon.textContent = '👍';
            this.elements.matchModalTitle.textContent = this.translate('likeSent');
            this.elements.matchModalMessage.textContent = this.translate('youLikedName', { name: profile.name });
        } else if (type === 'superlike') {
            this.elements.matchModalIcon.textContent = '✨';
            this.elements.matchModalTitle.textContent = this.translate('superlikeSent');
            this.elements.matchModalMessage.textContent = this.translate('youSuperlikedName', { name: profile.name });
        }
        this.elements.matchSuccessModal.classList.add('active');
    }

    hideMatchSuccessModal() {
        this.elements.matchSuccessModal.classList.remove('active');
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return null;

        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    getZodiacSign(day, month) {
        if (!day || !month) return null;

        const date = new Date(2000, month - 1, day);
        const monthDay = (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

        for (const sign of this.config.zodiacSigns) {
            const start = sign.start;
            const end = sign.end;

            if (start.substring(0, 2) === '12' && end.substring(0, 2) === '01') {
                if (monthDay >= start || monthDay <= end) {
                    return sign;
                }
            } else {
                if (monthDay >= start && monthDay <= end) {
                    return sign;
                }
            }
        }
        return null;
    }

    translate(key, replacements = {}) {
        let text = this.translations[this.state.currentLanguage][key] || this.translations['en'][key] || key;
        for (const placeholder in replacements) {
            text = text.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        return text;
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.state.currentLanguage = lang;
            localStorage.setItem('appLanguage', lang);
            this.updateTextContent();
            if (this.state.currentScreen === 'registration') {
                this.formHandler.renderForm();
            } else if (this.state.currentScreen === 'profile') {
                this.profileHandler.showProfile();
            } else if (this.state.currentScreen === 'match') {
                this.matchHandler.showNextProfile();
            } else if (this.state.currentScreen === 'chat') {
                this.chatHandler.showChatListScreen();
            } else if (this.state.currentScreen === 'settings') {
                this.settingsHandler.renderSettings();
            }
        } else {
            console.warn(`Language "${lang}" not supported.`);
        }
    }

    updateTextContent() {
        document.getElementById('loadingTitle').textContent = this.translate('loadingTitle');
        document.getElementById('loadingSubtitle').textContent = this.translate('loadingSubtitle');
        document.getElementById('navProfileText').textContent = this.translate('profile');
        document.getElementById('navMatchesText').textContent = this.translate('matches');
        document.getElementById('navChatText').textContent = this.translate('chat');
        document.getElementById('navSettingsText').textContent = this.translate('settings');

        const swipeTutorialModal = document.getElementById('swipeTutorialModal');
        if (swipeTutorialModal.classList.contains('active')) {
            document.querySelector('#swipeTutorialModal h3').textContent = this.translate('swipeTutorialTitle');
            const paragraphs = document.querySelectorAll('#swipeTutorialModal p');
            if (paragraphs.length > 0) paragraphs[0].innerHTML = this.translate('swipeTutorialText1');
            if (paragraphs.length > 1) paragraphs[1].innerHTML = this.translate('swipeTutorialText2');
            document.getElementById('modalGotItBtn').textContent = this.translate('gotIt');
        }

        const matchSuccessModal = document.getElementById('matchSuccessModal');
        if (matchSuccessModal.classList.contains('active')) {
            document.getElementById('matchModalChatBtn').textContent = this.translate('writeMessage');
            document.getElementById('matchModalContinueBtn').textContent = this.translate('continueSwiping');
        }

        const settingsScreen = document.getElementById('settingsScreen');
        if (settingsScreen.classList.contains('active')) {
            this.settingsHandler.renderSettings();
        }

        const chatScreen = document.getElementById('chatScreen');
        if (chatScreen.classList.contains('active')) {
            this.chatHandler.updateChatTexts();
        }

        const matchScreen = document.getElementById('matchScreen');
        if (matchScreen.classList.contains('active')) {
            document.getElementById('noProfilesMessage').innerHTML = `<p>${this.translate('noNewProfiles')}</p><button class="btn btn-secondary" style="margin-top: 20px;" id="backToProfileFromMatchBtn">${this.translate('backToProfile')}</button>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DatingApp();
});

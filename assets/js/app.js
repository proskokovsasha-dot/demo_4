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
                profileColor: '#FF6B6B', // Default color
            },
            suggestedProfiles: [],
            currentLanguage: 'ru', // Default language
            unreadMessagesCount: 0, // НОВОЕ: Счетчик непрочитанных сообщений
            blockedUsers: [], // НОВОЕ: Список заблокированных пользователей
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
                lastActiveThisWeek: 'Была недавно',
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
                noActiveChats: 'У вас пока нет активных чатов. Начните знакомиться в разделе "Анкеты"!', // НОВОЕ
                messageDelivered: 'Доставлено', // НОВОЕ
                messageRead: 'Прочитано', // НОВОЕ
                blockUser: 'Заблокировать', // НОВОЕ
                confirmBlockUser: 'Вы уверены, что хотите заблокировать {name}? Вы больше не будете получать от него сообщения.', // НОВОЕ
                userBlocked: '{name} заблокирован.', // НОВОЕ
                sendPhoto: 'Отправить фото', // НОВОЕ
                sendEmoji: 'Отправить эмодзи', // НОВОЕ
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
                noActiveChats: 'You don\'t have any active chats yet. Start meeting people in the "Matches" section!', // НОВОЕ
                messageDelivered: 'Delivered', // НОВОЕ
                messageRead: 'Read', // НОВОЕ
                blockUser: 'Block', // НОВОЕ
                confirmBlockUser: 'Are you sure you want to block {name}? You will no longer receive messages from them.', // НОВОЕ
                userBlocked: '{name} blocked.', // НОВОЕ
                sendPhoto: 'Send Photo', // НОВОЕ
                sendEmoji: 'Send Emoji', // НОВОЕ
            }
        };

        this.initElements();
        this.formHandler = new FormHandler(this);
        this.profileHandler = new ProfileHandler(this);
        this.uiHandler = new UIHandler(this);
        this.matchHandler = new MatchHandler(this);
        // ChatHandler and SettingsHandler will be lazy loaded
        this.chatHandler = null;
        this.settingsHandler = null;

        this.bindEvents();
        this.checkSavedProfile();
        this.setLanguage(this.state.currentLanguage);
        this.setAppThemeColor(this.state.userData.profileColor); // Apply saved color on load
        this.showLoadingScreen();

        // Инициализация Telegram Web Apps API
        if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
            Telegram.WebApp.ready();
            Telegram.WebApp.expand(); // Развернуть приложение на весь экран
            // Опционально: установить цвет фона Telegram Mini App
            Telegram.WebApp.setBackgroundColor(getComputedStyle(document.documentElement).getPropertyValue('--background'));
            Telegram.WebApp.setHeaderColor(getComputedStyle(document.documentElement).getPropertyValue('--surface'));
        }
    }

    showLoadingScreen() {
        this.uiHandler.initLogoAnimation();

        const loadingScreen = document.getElementById('loadingScreen');
        const appContainer = document.getElementById('appContainer');

        // Ensure loading screen is visible and covers the whole screen
        loadingScreen.style.display = 'flex';
        loadingScreen.style.position = 'fixed';
        loadingScreen.style.top = '0';
        loadingScreen.style.left = '0';
        loadingScreen.style.width = '100%';
        loadingScreen.style.height = '100%';
        loadingScreen.style.opacity = '1'; // Ensure opacity is 1 when showing

        // Make sure loading text elements are visible for animation
        const loadingTitle = document.getElementById('loadingTitle');
        const loadingSubtitle = document.getElementById('loadingSubtitle');

        // Set initial state for animation
        loadingTitle.style.opacity = '0';
        loadingTitle.style.transform = 'translateY(20px) scale(0.95)';
        loadingSubtitle.style.opacity = '0';
        loadingSubtitle.style.transform = 'translateY(20px) scale(0.95)';

        // Start logo animation first
        setTimeout(() => {
            // Then fade in title and subtitle with staggered delays
            loadingTitle.style.animation = 'fadeInScale 1s ease-out forwards';
        }, 1500); // Delay for title after logo animation starts

        setTimeout(() => {
            loadingSubtitle.style.animation = 'fadeInScale 1s ease-out forwards';
        }, 1800); // Delay for subtitle after title starts

        setTimeout(() => {
            loadingScreen.style.opacity = '0';

            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.style.display = 'none';
                // Reset fixed positioning when hidden
                loadingScreen.style.position = '';
                loadingScreen.style.top = '';
                loadingScreen.style.left = '';
                loadingScreen.style.width = '';
                loadingScreen.style.height = '';

                appContainer.style.display = 'flex';
                this.switchScreen(this.state.currentScreen);
            }, { once: true });
        }, 3500); // Total duration before hiding loading screen
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
            matchSuccessModal: document.getElementById('matchSuccessModal'),
            matchModalIcon: document.getElementById('matchModalIcon'),
            matchModalTitle: document.getElementById('matchModalTitle'),
            matchModalMessage: document.getElementById('matchModalMessage'),
            matchModalMyAvatar: document.getElementById('matchModalMyAvatar'),
            matchModalPartnerAvatar: document.getElementById('matchModalPartnerAvatar'),
            matchModalChatBtn: document.getElementById('matchModalChatBtn'),
            matchModalContinueBtn: document.getElementById('matchModalContinueBtn'),
            loadingTitle: document.getElementById('loadingTitle'),
            loadingSubtitle: document.getElementById('loadingSubtitle'),
            navProfileText: document.getElementById('navProfileText'),
            navMatchesText: document.getElementById('navMatchesText'),
            navChatText: document.getElementById('navChatText'),
            navSettingsText: document.getElementById('navSettingsText'),
            dynamicStyles: document.getElementById('dynamic-styles'),

            profileFullModalOverlay: document.getElementById('profileFullModalOverlay'),
            profileFullModalContent: document.getElementById('profileFullModalContent'),
            profileFullModalCloseBtn: document.getElementById('profileFullModalCloseBtn'),
            profileFullModalNameAge: document.getElementById('profileFullModalNameAge'),
            profileFullModalDescriptionShort: document.getElementById('profileFullModalDescriptionShort'),
            profileFullModalDescriptionFull: document.getElementById('profileFullModalDescriptionFull'),
            profileFullModalZodiacSign: document.getElementById('profileFullModalZodiacSign'),
            profileFullModalLookingFor: document.getElementById('profileFullModalLookingFor'),
            profileFullModalInterests: document.getElementById('profileFullModalInterests'),
            profileFullModalScrollableContent: document.getElementById('profileFullModalScrollableContent'),
            profileFullModalEditBtn: document.getElementById('profileFullModalEditBtn'),
            profileFullModalNewProfileBtn: document.getElementById('profileFullModalNewProfileBtn'),

            // Добавленные элементы для модального окна анкеты
            matchFullModalOverlay: document.getElementById('matchModalOverlay'),
            matchFullModalContent: document.getElementById('matchFullModalContent'),
            matchFullModalCloseBtn: document.getElementById('matchFullModalCloseBtn'),
            matchFullModalNameAge: document.getElementById('matchFullModalNameAge'),
            matchFullModalDescriptionShort: document.getElementById('matchFullModalDescriptionShort'),
            matchFullModalDescriptionFull: document.getElementById('matchFullModalDescriptionFull'),
            matchFullModalZodiacSign: document.getElementById('matchFullModalZodiacSign'),
            matchFullModalLookingFor: document.getElementById('matchFullModalLookingFor'),
            matchFullModalInterests: document.getElementById('matchFullModalInterests'),
            matchFullModalLastActive: document.getElementById('matchFullModalLastActive'),
            matchFullModalDistance: document.getElementById('matchFullModalDistance'),
            matchFullModalActiveDot: document.getElementById('matchFullModalActiveDot'),
            matchFullModalScrollableContent: document.getElementById('matchFullModalScrollableContent'),

            // НОВОЕ: Элементы для уведомлений чата
            chatNavBtn: document.querySelector('.nav-btn[data-screen="chat"]'),
            chatNotificationBadge: document.getElementById('chatNotificationBadge'),
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

        if (this.elements.matchModalChatBtn) {
            this.elements.matchModalChatBtn.addEventListener('click', () => {
                this.hideMatchSuccessModal();
                this.switchScreen('chat');
                if (this.matchHandler.lastMatchedProfile) {
                    // Ensure chatHandler is loaded before calling openChat
                    this.lazyLoadScript('chat').then(() => {
                        this.chatHandler.openChat(this.matchHandler.lastMatchedProfile.id);
                    });
                }
            });
        }
        if (this.elements.matchModalContinueBtn) {
            this.elements.matchModalContinueBtn.addEventListener('click', () => {
                this.hideMatchSuccessModal();
                this.matchHandler.currentIndex++; // Переходим к следующему профилю
                this.matchHandler.showNextProfile();
            });
        }

        // Обработчики для нового модального окна профиля
        if (this.elements.profileFullModalCloseBtn) {
            this.elements.profileFullModalCloseBtn.addEventListener('click', () => this.hideProfileFullModal());
        }
        if (this.elements.profileFullModalOverlay) {
            this.elements.profileFullModalOverlay.addEventListener('click', (e) => {
                if (e.target === this.elements.profileFullModalOverlay) {
                    this.hideProfileFullModal();
                }
            });
        }
        // Кнопки внутри модального окна профиля
        if (this.elements.profileFullModalEditBtn) {
            this.elements.profileFullModalEditBtn.addEventListener('click', () => {
                this.hideProfileFullModal();
                this.switchScreen('registration');
            });
        }
        if (this.elements.profileFullModalNewProfileBtn) {
            this.elements.profileFullModalNewProfileBtn.addEventListener('click', () => {
                if (confirm(this.translate('confirmClearData'))) {
                    this.hideProfileFullModal();
                    this.clearAllData();
                }
            });
        }

        // Обработчики для модального окна анкеты
        if (this.elements.matchFullModalCloseBtn) {
            this.elements.matchFullModalCloseBtn.addEventListener('click', () => this.hideMatchFullModal());
        }
        if (this.elements.matchFullModalOverlay) {
            this.elements.matchFullModalOverlay.addEventListener('click', (e) => {
                if (e.target === this.elements.matchFullModalOverlay) {
                    this.hideMatchFullModal();
                }
            });
        }

        // Закрытие модальных окон по Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.elements.matchSuccessModal.classList.contains('active')) {
                    this.hideMatchSuccessModal();
                }
                if (this.elements.profileFullModalOverlay.classList.contains('active')) {
                    this.hideProfileFullModal();
                }
                if (this.elements.matchFullModalOverlay.classList.contains('active')) {
                    this.hideMatchFullModal();
                }
            }
        });
    }

    checkSavedProfile() {
        const savedProfile = localStorage.getItem('datingProfile');
        const savedLanguage = localStorage.getItem('appLanguage');
        const savedBlockedUsers = localStorage.getItem('blockedUsers'); // НОВОЕ: Загрузка заблокированных пользователей

        if (savedLanguage) {
            this.state.currentLanguage = savedLanguage;
        }
        if (savedBlockedUsers) { // НОВОЕ: Парсинг заблокированных пользователей
            try {
                this.state.blockedUsers = JSON.parse(savedBlockedUsers);
            } catch (e) {
                console.error('Error loading blocked users:', e);
                localStorage.removeItem('blockedUsers');
            }
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
    }

    clearAllData() {
        localStorage.removeItem('datingProfile');
        localStorage.removeItem('swipeTutorialShown');
        localStorage.removeItem('appLanguage');
        localStorage.removeItem('blockedUsers'); // НОВОЕ: Очистка заблокированных пользователей
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
        this.state.blockedUsers = []; // НОВОЕ: Сброс заблокированных пользователей
        this.state.unreadMessagesCount = 0; // НОВОЕ: Сброс счетчика
        this.updateChatNotificationBadge(); // НОВОЕ: Обновление бейджа
        // Reset chatHandler if it's loaded
        if (this.chatHandler) {
            this.chatHandler.chats = {};
        }
        alert(this.translate('confirmClearData')); // This alert should be replaced with a custom modal
        this.setLanguage('ru');
        this.setAppThemeColor(this.state.userData.profileColor); // Reset theme color
        this.switchScreen('registration');
    }

    async switchScreen(screenName) {
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
            await this.lazyLoadScript('chat');
            this.chatHandler.showChatListScreen();
            this.state.unreadMessagesCount = 0; // НОВОЕ: Сброс счетчика при открытии чата
            this.updateChatNotificationBadge(); // НОВОЕ: Обновление бейджа
        } else if (screenName === 'settings') {
            targetScreenElement = this.elements.settingsScreen;
            document.querySelector('.nav-btn[data-screen="settings"]').classList.add('active');
            this.elements.topNavigation.style.display = 'flex';
            await this.lazyLoadScript('settings');
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

    async lazyLoadScript(componentName) {
        if (componentName === 'chat' && !this.chatHandler) {
            const scriptElement = document.getElementById('chat-script');
            if (!scriptElement.src) { // Load only if not already loaded
                scriptElement.src = 'assets/js/components/chat.js';
                await new Promise(resolve => {
                    scriptElement.onload = () => {
                        this.chatHandler = new ChatHandler(this);
                        resolve();
                    };
                });
            } else if (!this.chatHandler) { // If src is set but handler not initialized (e.g., after clearAllData)
                this.chatHandler = new ChatHandler(this);
            }
        } else if (componentName === 'settings' && !this.settingsHandler) {
            const scriptElement = document.getElementById('settings-script');
            if (!scriptElement.src) { // Load only if not already loaded
                scriptElement.src = 'assets/js/components/settings.js';
                await new Promise(resolve => {
                    scriptElement.onload = () => {
                        this.settingsHandler = new SettingsHandler(this);
                        resolve();
                    };
                });
            } else if (!this.settingsHandler) { // If src is set but handler not initialized
                this.settingsHandler = new SettingsHandler(this);
            }
        }
    }

    showMatchSuccessModal(profile, type) {
        if (!this.elements.matchSuccessModal) return;

        let title = '';
        let message = '';
        let iconHtml = '';

        if (type === 'match') {
            title = this.translate('match');
            message = this.translate('youLiked', { name: profile.name });
            iconHtml = '❤️';
        } else if (type === 'like') {
            title = this.translate('likeSent');
            message = this.translate('youLikedName', { name: profile.name });
            iconHtml = '👍';
        } else if (type === 'superlike') {
            title = this.translate('superlikeSent');
            message = this.translate('youSuperlikedName', { name: profile.name });
            iconHtml = '✨';
        }

        this.elements.matchModalIcon.textContent = iconHtml;
        this.elements.matchModalTitle.textContent = title;
        this.elements.matchModalMessage.textContent = message;

        this.elements.matchModalMyAvatar.style.backgroundImage = `url(https://picsum.photos/seed/${this.state.userData.name}/100/100)`;
        this.elements.matchModalPartnerAvatar.style.backgroundImage = `url(https://picsum.photos/seed/${profile.id}/100/100)`;

        this.elements.matchModalChatBtn.textContent = this.translate('writeMessage');
        this.elements.matchModalContinueBtn.textContent = this.translate('continueSwiping');

        this.elements.matchSuccessModal.classList.add('active');
        this.elements.matchSuccessModal.focus(); // Set focus to modal for accessibility
    }

    hideMatchSuccessModal() {
        if (this.elements.matchSuccessModal) {
            this.elements.matchSuccessModal.classList.remove('active');
        }
    }

    showProfileFullModal(profileData) {
        if (!this.elements.profileFullModalOverlay || !this.elements.profileFullModalContent) return;

        let nameAgeText = profileData.name || this.translate('anonymous');
        if (profileData.age) {
            nameAgeText += `, ${profileData.age}`;
        }
        this.elements.profileFullModalNameAge.textContent = nameAgeText;

        const fullDescription = profileData.description || this.translate('noDescription');
        this.elements.profileFullModalDescriptionShort.textContent = fullDescription.split('.')[0] + (fullDescription.includes('.') ? '.' : '');
        if (this.elements.profileFullModalDescriptionShort.textContent.length > 100) {
            this.elements.profileFullModalDescriptionShort.textContent = this.elements.profileFullModalDescriptionShort.textContent.substring(0, 97) + '...';
        }

        this.elements.profileFullModalDescriptionFull.textContent = fullDescription;

        const zodiacContainer = this.elements.profileFullModalZodiacSign;
        const zodiacSign = profileData.zodiacSign;
        if (zodiacSign) {
            zodiacContainer.innerHTML = `
                <div class="zodiac-display">
                    <span class="emoji">${zodiacSign.emoji}</span>
                    ${this.translate(zodiacSign.id)}
                </div>
            `;
        } else {
            zodiacContainer.innerHTML = `<div class="no-data">${this.translate('noData')}</div>`;
        }

        const lookingForContainer = this.elements.profileFullModalLookingFor;
        lookingForContainer.innerHTML = '';
        if (profileData.lookingFor && profileData.lookingFor.length > 0) {
            profileData.lookingFor.forEach(optionId => {
                const option = this.config.lookingForOptions.find(o => o.id === optionId);
                if (option) {
                    const el = document.createElement('div');
                    el.className = 'looking-for-item';
                    el.innerHTML = `
                        <span class="looking-for-emoji">${option.emoji}</span>
                        <span class="looking-for-text">${this.translate(option.id)}</span>
                    `;
                    lookingForContainer.appendChild(el);
                }
            });
        } else {
            lookingForContainer.innerHTML = `<div class="no-data">${this.translate('noLookingFor')}</div>`;
        }

        const interestsContainer = this.elements.profileFullModalInterests;
        interestsContainer.innerHTML = '';
        if (profileData.interests && profileData.interests.length > 0) {
            profileData.interests.forEach(interestId => {
                const interest = this.config.interests.find(i => i.id === interestId);
                if (interest) {
                    const el = document.createElement('div');
                    el.className = 'interest-item';
                    el.innerHTML = `
                        <span class="interest-emoji">${interest.emoji}</span>
                        <span class="interest-text">${this.translate(interest.id)}</span>
                    `;
                    interestsContainer.appendChild(el);
                }
            });
        } else {
            interestsContainer.innerHTML = `<div class="no-data">${this.translate('noInterests')}</div>`;
        }

        this.elements.profileFullModalScrollableContent.scrollTop = 0;

        this.elements.profileFullModalOverlay.classList.add('active');
        this.elements.profileFullModalContent.classList.add('active'); // Добавлено
        document.body.style.overflow = 'hidden';
        this.elements.profileFullModalContent.focus(); // Set focus to modal for accessibility
    }

    hideProfileFullModal() {
        if (this.elements.profileFullModalOverlay && this.elements.profileFullModalContent) {
            this.elements.profileFullModalOverlay.classList.remove('active');
            this.elements.profileFullModalContent.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    showMatchFullModal(profileData) {
        if (!this.elements.matchFullModalOverlay || !this.elements.matchFullModalContent) return;

        let nameAgeText = profileData.name || this.translate('anonymous');
        if (profileData.age) {
            nameAgeText += `, ${profileData.age}`;
        }
        this.elements.matchFullModalNameAge.textContent = nameAgeText;

        const fullDescription = profileData.description || this.translate('noDescription');
        this.elements.matchFullModalDescriptionShort.textContent = fullDescription.split('.')[0] + (fullDescription.includes('.') ? '.' : '');
        if (this.elements.matchFullModalDescriptionShort.textContent.length > 100) {
            this.elements.matchFullModalDescriptionShort.textContent = this.elements.matchFullModalDescriptionShort.textContent.substring(0, 97) + '...';
        }

        this.elements.matchFullModalDescriptionFull.textContent = fullDescription;

        this.elements.matchFullModalLastActive.textContent = profileData.lastActive;
        if (profileData.lastActive === this.translate('lastActiveToday')) {
            this.elements.matchFullModalActiveDot.classList.remove('offline');
            this.elements.matchFullModalActiveDot.style.backgroundColor = 'var(--match-active-dot)';
        } else {
            this.elements.matchFullModalActiveDot.classList.add('offline');
            this.elements.matchFullModalActiveDot.style.backgroundColor = 'var(--text-secondary)';
        }

        if (this.state.userData.location?.lat && profileData.location?.lat) {
            const distance = this.calculateDistance(
                this.state.userData.location.lat,
                this.state.userData.location.lng,
                profileData.location.lat,
                profileData.location.lng
            );
            this.elements.matchFullModalDistance.textContent = distance ? `${distance} ${this.translate('km')}` : '';
        } else {
            this.elements.matchFullModalDistance.textContent = '';
        }

        const zodiacContainer = this.elements.matchFullModalZodiacSign;
        const zodiacSign = profileData.zodiacSign;
        if (zodiacSign) {
            zodiacContainer.innerHTML = `
                <div class="zodiac-display">
                    <span class="emoji">${zodiacSign.emoji}</span>
                    ${this.translate(zodiacSign.id)}
                </div>
            `;
        } else {
            zodiacContainer.innerHTML = `<div class="no-data">${this.translate('noData')}</div>`;
        }

        const lookingForContainer = this.elements.matchFullModalLookingFor;
        lookingForContainer.innerHTML = '';
        if (profileData.lookingFor && profileData.lookingFor.length > 0) {
            profileData.lookingFor.forEach(optionId => {
                const option = this.config.lookingForOptions.find(o => o.id === optionId);
                if (option) {
                    const el = document.createElement('div');
                    el.className = 'looking-for-item';
                    el.innerHTML = `
                        <span class="looking-for-emoji">${option.emoji}</span>
                        <span class="looking-for-text">${this.translate(option.id)}</span>
                    `;
                    lookingForContainer.appendChild(el);
                }
            });
        } else {
            lookingForContainer.innerHTML = `<div class="no-data">${this.translate('noLookingFor')}</div>`;
        }

        const interestsContainer = this.elements.matchFullModalInterests;
        interestsContainer.innerHTML = '';
        if (profileData.interests && profileData.interests.length > 0) {
            profileData.interests.forEach(interestId => {
                const interest = this.config.interests.find(i => i.id === interestId);
                if (interest) {
                    const el = document.createElement('div');
                    el.className = 'interest-item';
                    el.innerHTML = `
                        <span class="interest-emoji">${interest.emoji}</span>
                        <span class="interest-text">${this.translate(interest.id)}</span>
                    `;
                    interestsContainer.appendChild(el);
                }
            });
        } else {
            interestsContainer.innerHTML = `<div class="no-data">${this.translate('noInterests')}</div>`;
        }

        this.elements.matchFullModalScrollableContent.scrollTop = 0;

        this.elements.matchFullModalOverlay.classList.add('active');
        this.elements.matchFullModalContent.classList.add('active'); // Добавлено
        document.body.style.overflow = 'hidden';
        this.elements.matchFullModalContent.focus(); // Set focus to modal for accessibility
    }

    hideMatchFullModal() {
        if (this.elements.matchFullModalOverlay && this.elements.matchFullModalContent) {
            this.elements.matchFullModalOverlay.classList.remove('active');
            this.elements.matchFullModalContent.classList.remove('active');
            document.body.style.overflow = '';
        }
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
            // Re-render current screen to apply language changes
            if (this.state.currentScreen === 'registration') {
                this.formHandler.renderForm();
            } else if (this.state.currentScreen === 'profile') {
                this.profileHandler.showProfile();
            } else if (this.state.currentScreen === 'match') {
                this.matchHandler.showNextProfile();
            } else if (this.state.currentScreen === 'chat' && this.chatHandler) { // Check if loaded
                this.chatHandler.showChatListScreen();
            } else if (this.state.currentScreen === 'settings' && this.settingsHandler) { // Check if loaded
                this.settingsHandler.renderSettings();
            }
        } else {
            console.warn(`Language "${lang}" not supported.`);
        }
    }

    hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }

    shadeColor(color, percent) {
        let f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=(f>>8)&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+Math.round((t-B)*p)+B).toString(16).slice(1);
    }

    setAppThemeColor(color) {
        if (!this.elements.dynamicStyles) {
            console.error('Dynamic styles element not found!');
            return;
        }

        const primaryRgb = this.hexToRgb(color);
        const primaryDark = this.shadeColor(color, -0.2);
        const primaryLight = this.shadeColor(color, 0.8);

        this.elements.dynamicStyles.textContent = `
            :root {
                --primary: ${color};
                --primary-dark: ${primaryDark};
                --primary-light: ${primaryLight};
                --primary-rgb: ${primaryRgb};
            }
        `;

        const logoPath = document.querySelector('.logo-path');
        if (logoPath) {
            logoPath.setAttribute('stroke', 'var(--primary)');
        }
    }

    updateTextContent() {
        document.getElementById('loadingTitle').textContent = this.translate('loadingTitle');
        document.getElementById('loadingSubtitle').textContent = this.translate('loadingSubtitle');
        document.getElementById('navProfileText').textContent = this.translate('profile');
        document.getElementById('navMatchesText').textContent = this.translate('matches');
        document.getElementById('navChatText').textContent = this.translate('chat');
        document.getElementById('navSettingsText').textContent = this.translate('settings');

        if (this.elements.matchSuccessModal && this.elements.matchSuccessModal.classList.contains('active')) {
            // Re-render match success modal content if it's active
            // This is a simplified approach; a more robust solution would involve re-calling showMatchSuccessModal
            // with the current profile and type, which would re-translate all its content.
        }

        const settingsScreen = document.getElementById('settingsScreen');
        if (settingsScreen.classList.contains('active') && this.settingsHandler) {
            this.settingsHandler.renderSettings();
        }

        const chatScreen = document.getElementById('chatScreen');
        if (chatScreen.classList.contains('active') && this.chatHandler) {
            this.chatHandler.updateChatTexts();
        }

        const matchScreen = document.getElementById('matchScreen');
        if (matchScreen.classList.contains('active')) {
            document.getElementById('noProfilesMessage').innerHTML = `<p>${this.translate('noNewProfiles')}</p><button class="btn btn-secondary" style="margin-top: 20px;" id="backToProfileFromMatchBtn">${this.translate('backToProfile')}</button>`;
        }
    }

    // НОВОЕ: Функции для управления блокировкой пользователей
    blockUser(userId) {
        if (!this.state.blockedUsers.includes(userId)) {
            this.state.blockedUsers.push(userId);
            localStorage.setItem('blockedUsers', JSON.stringify(this.state.blockedUsers));
            console.log(`User ${userId} blocked.`);
            // Если чат открыт, обновить его
            if (this.chatHandler && this.chatHandler.activeChatPartner && this.chatHandler.activeChatPartner.id === userId) {
                this.chatHandler.showChatList(); // Вернуться к списку чатов
            }
            // Удалить чат из списка, если он существует
            if (this.chatHandler && this.chatHandler.chats[userId]) {
                delete this.chatHandler.chats[userId];
                this.chatHandler.renderChatList();
            }
        }
    }

    isUserBlocked(userId) {
        return this.state.blockedUsers.includes(userId);
    }

    // НОВОЕ: Функция для обновления счетчика непрочитанных сообщений
    incrementUnreadMessages() {
        this.state.unreadMessagesCount++;
        this.updateChatNotificationBadge();
    }

    updateChatNotificationBadge() {
        if (this.elements.chatNotificationBadge) {
            if (this.state.unreadMessagesCount > 0) {
                this.elements.chatNotificationBadge.textContent = this.state.unreadMessagesCount;
                this.elements.chatNotificationBadge.classList.add('active');
                if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
                    Telegram.WebApp.setHeaderColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')); // Обновить цвет хедера, чтобы бейдж был виден
                    // Telegram.WebApp.setBadges({ unread_count: this.state.unreadMessagesCount }); // Для реального бейджа в Telegram
                }
            } else {
                this.elements.chatNotificationBadge.classList.remove('active');
                if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
                    // Telegram.WebApp.setBadges({ unread_count: 0 });
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DatingApp();
});


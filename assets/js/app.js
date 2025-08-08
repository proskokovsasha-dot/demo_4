class DatingApp {
    constructor() {
        this.config = {
            colors: ['#FF6B6B', '#4ECDC4', '#4A64BF', '#FDCB6E', '#A05195', '#2ECC71', '#E74C3C', '#3498DB', '#9B59B6', '#1ABC9C', '#F1C40F', '#E67E22'],
            maxInterests: 5,
            minAge: 18,
            maxAge: 100,
            maxPhotos: 6,
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
            zodiacSigns: [
                { id: 'aries', name: 'Овен ♈', dates: '21.03 - 19.04' },
                { id: 'taurus', name: 'Телец ♉', dates: '20.04 - 20.05' },
                { id: 'gemini', name: 'Близнецы ♊', dates: '21.05 - 20.06' },
                { id: 'cancer', name: 'Рак ♋', dates: '21.06 - 22.07' },
                { id: 'leo', name: 'Лев ♌', dates: '23.07 - 22.08' },
                { id: 'virgo', name: 'Дева ♍', dates: '23.08 - 22.09' },
                { id: 'libra', name: 'Весы ♎', dates: '23.09 - 22.10' },
                { id: 'scorpio', name: 'Скорпион ♏', dates: '23.10 - 21.11' },
                { id: 'sagittarius', name: 'Стрелец ♐', dates: '22.11 - 21.12' },
                { id: 'capricorn', name: 'Козерог ♑', dates: '22.12 - 19.01' },
                { id: 'aquarius', name: 'Водолей ♒', dates: '20.01 - 18.02' },
                { id: 'pisces', name: 'Рыбы ♓', dates: '19.02 - 20.03' }
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
            ]
        };

        this.state = {
            currentScreen: 'main', // Это будет изменено на 'registration' или 'profile' после проверки localStorage
            currentStep: 1,
            totalSteps: 10, // ИЗМЕНЕНО: Уменьшено количество шагов на 1 (было 11, теперь 10)
            userData: {
                name: '',
                gender: '',
                dateOfBirth: '', // НОВОЕ: для хранения даты рождения
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
            },
            suggestedProfiles: [],
            likedProfiles: [],
            passedProfiles: []
        };

        this.initElements();
        this.formHandler = new FormHandler(this);
        this.profileHandler = new ProfileHandler(this);
        this.uiHandler = new UIHandler(this);
        this.matchHandler = new MatchHandler(this); 

        this.bindEvents();
        this.checkSavedProfile(); // Определяет начальный экран
        this.showLoadingScreen();
    }

    showLoadingScreen() {
        this.uiHandler.initLogoAnimation();

        // Анимация текста после логотипа
        const loadingTextElements = document.querySelectorAll('.loading-text');
        loadingTextElements.forEach(el => {
            el.style.opacity = '0'; // Убедимся, что они скрыты перед анимацией
            el.style.transform = 'translateY(20px) scale(0.95)'; // Начальное состояние для fadeInScale
        });

        setTimeout(() => {
            loadingTextElements.forEach(el => {
                el.style.animationPlayState = 'running'; // Запускаем анимацию текста
            });
        }, 1500); // Задержка перед появлением текста (после завершения анимации логотипа)

        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            const appContainer = document.getElementById('appContainer');

            loadingScreen.style.opacity = '0';

            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.style.display = 'none';
                appContainer.style.display = 'flex';
                this.switchScreen(this.state.currentScreen); // Переключаемся на определенный экран
            }, { once: true });
        }, 3500); // Общая задержка перед скрытием экрана загрузки (лого + текст)
    }

    initElements() {
        this.elements = {
            registrationForm: document.getElementById('registrationForm'),
            profileView: document.getElementById('profileView'),
            matchScreen: document.getElementById('matchScreen'), 
            settingsScreen: document.getElementById('settingsScreen'),
            topNavigation: document.getElementById('topNavigation'),
            navButtons: document.querySelectorAll('.nav-btn'),
            locationModal: document.getElementById('locationModal'), 
            modalAllowLocationBtn: document.getElementById('modalAllowLocationBtn'),
            modalSkipLocationBtn: document.getElementById('modalSkipLocationBtn'),
            swipeTutorialModal: document.getElementById('swipeTutorialModal'), // Новый элемент
            modalGotItBtn: document.getElementById('modalGotItBtn'), // Новый элемент
            likeSound: document.getElementById('likeSound'), // Новый элемент
            nopeSound: document.getElementById('nopeSound') // Новый элемент
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

        const clearDataBtn = document.getElementById('clearDataBtn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => {
                if (confirm('Вы уверены, что хотите полностью очистить все данные профиля? Это действие необратимо.')) {
                    this.clearAllData();
                }
            });
        }

        // Обработчики для кнопок модального окна геолокации
        if (this.elements.modalAllowLocationBtn) {
            this.elements.modalAllowLocationBtn.addEventListener('click', () => this.handleLocationPermission(true));
        }
        if (this.elements.modalSkipLocationBtn) {
            this.elements.modalSkipLocationBtn.addEventListener('click', () => this.handleLocationPermission(false));
        }

        // Обработчик для кнопки "Понятно!" в модальном окне подсказок
        if (this.elements.modalGotItBtn) {
            this.elements.modalGotItBtn.addEventListener('click', () => this.hideSwipeTutorialModal());
        }
    }

    checkSavedProfile() {
        const savedProfile = localStorage.getItem('datingProfile');
        if (savedProfile) {
            try {
                this.state.userData = JSON.parse(savedProfile);
                // Убедимся, что массивы и предпочтения инициализированы, если они отсутствуют в старых данных
                if (!Array.isArray(this.state.userData.interests)) {
                    this.state.userData.interests = [];
                }
                if (!Array.isArray(this.state.userData.lookingFor)) {
                    this.state.userData.lookingFor = [];
                }
                if (!this.state.userData.preference) {
                    this.state.userData.preference = 'both';
                }
                // НОВОЕ: Инициализация dateOfBirth, если его нет
                if (!this.state.userData.dateOfBirth) {
                    this.state.userData.dateOfBirth = '';
                }
                this.state.currentScreen = 'profile'; // Если профиль есть, показываем профиль
            } catch (e) {
                console.error('Ошибка при загрузке профиля:', e);
                localStorage.removeItem('datingProfile'); // Очищаем некорректные данные
                this.state.currentScreen = 'registration'; // Перенаправляем на регистрацию
            }
        } else {
            this.state.currentScreen = 'registration'; // Если профиля нет, начинаем регистрацию
        }
    }

    showProfile() {
        this.profileHandler.showProfile();
    }

    startMatch() { 
        this.matchHandler.startMatch(); 
        // Показываем подсказку по свайпу, если пользователь видит экран анкет впервые
        if (!localStorage.getItem('swipeTutorialShown')) {
            this.showSwipeTutorialModal();
            localStorage.setItem('swipeTutorialShown', 'true');
        }
    }

    clearAllData() {
        localStorage.removeItem('datingProfile');
        localStorage.removeItem('swipeTutorialShown'); // Очищаем флаг подсказки
        this.state.userData = {
            name: '',
            gender: '',
            dateOfBirth: '', // НОВОЕ: сброс даты рождения
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
        alert('Все данные профиля очищены. Вы будете перенаправлены на экран регистрации.');
        this.switchScreen('registration');
    }

    switchScreen(screenName) {
        // Скрываем все экраны и удаляем класс 'active'
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none'; // Убедимся, что они скрыты
        });

        // Деактивируем все кнопки навигации
        this.elements.navButtons.forEach(button => button.classList.remove('active'));

        // Показываем нужный экран
        let targetScreenElement;
        if (screenName === 'registration') {
            targetScreenElement = this.elements.registrationForm;
            this.elements.topNavigation.style.display = 'none';
            this.formHandler.renderForm(); // Рендерим форму при переходе на экран регистрации
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
        } else if (screenName === 'settings') {
            targetScreenElement = this.elements.settingsScreen;
            document.querySelector('.nav-btn[data-screen="settings"]').classList.add('active');
            this.elements.topNavigation.style.display = 'flex';
        }

        if (targetScreenElement) {
            targetScreenElement.style.display = 'flex'; // Устанавливаем display: flex перед добавлением active
            // Небольшая задержка для применения display: flex перед анимацией opacity/height
            setTimeout(() => {
                targetScreenElement.classList.add('active');
            }, 10); 
        }
        
        this.state.currentScreen = screenName;
    }

    // Методы для работы с модальным окном геолокации
    showLocationModal() {
        this.elements.locationModal.classList.add('active');
    }

    hideLocationModal() {
        this.elements.locationModal.classList.remove('active');
    }

    handleLocationPermission(allow) {
        this.hideLocationModal();
        if (allow) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.state.userData.location = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        alert('Местоположение определено!');
                        // После определения местоположения, можно перейти к следующему шагу формы
                        this.formHandler.nextStep(); 
                    },
                    (error) => {
                        alert('Не удалось определить местоположение. Вы можете указать его позже.');
                        console.error(error);
                        this.state.userData.location = { lat: null, lng: null }; // Сбрасываем, если ошибка
                        this.formHandler.nextStep(); // Все равно переходим к следующему шагу
                    }
                );
            } else {
                alert('Геолокация не поддерживается вашим браузером. Вы можете указать местоположение позже.');
                this.state.userData.location = { lat: null, lng: null }; // Сбрасываем
                alert('Доступ к геолокации пропущен.'); // Добавлено для ясности
                this.formHandler.nextStep(); // Все равно переходим к следующему шагу
            }
        } else {
            this.state.userData.location = { lat: null, lng: null }; // Пропускаем
            alert('Доступ к геолокации пропущен.');
            this.formHandler.nextStep(); // Переходим к следующему шагу
        }
    }

    // Методы для работы с модальным окном подсказок по свайпу
    showSwipeTutorialModal() {
        this.elements.swipeTutorialModal.classList.add('active');
    }

    hideSwipeTutorialModal() {
        this.elements.swipeTutorialModal.classList.remove('active');
    }

    // Методы для звуковых эффектов и виброотклика
    playSound(type) {
        if (type === 'like' && this.elements.likeSound) {
            this.elements.likeSound.currentTime = 0;
            this.elements.likeSound.play();
        } else if (type === 'nope' && this.elements.nopeSound) {
            this.elements.nopeSound.currentTime = 0;
            this.elements.nopeSound.play();
        }
    }

    vibrate(pattern) {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return null;
        
        const R = 6371; // Радиус Земли в км
        const dLat = this.deg2rad(lat2-lat1);
        const dLon = this.deg2rad(lon2-lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return Math.round(R * c);
    }

    deg2rad(deg) {
        return deg * (Math.PI/180);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DatingApp();
});

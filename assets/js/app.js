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
            ]
        };

        this.state = {
            currentScreen: 'main',
            userData: {
                name: '',
                gender: '',
                age: '',
                city: '',
                description: '',
                interests: [],
                lookingFor: [],
                preference: 'both',
                profileColor: '#FF6B6B',
                avatar: null,
                photos: [],
            },
            suggestedProfiles: [],
        };

        this.initElements();
        this.formHandler = new FormHandler(this);
        this.profileHandler = new ProfileHandler(this);
        this.uiHandler = new UIHandler(this);
        this.matchHandler = new MatchHandler(this); 
        this.chatHandler = new ChatHandler(this);

        this.bindEvents();
        this.checkSavedProfile();
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

        if (this.elements.modalGotItBtn) {
            this.elements.modalGotItBtn.addEventListener('click', () => this.hideSwipeTutorialModal());
        }
    }

    checkSavedProfile() {
        const savedProfile = localStorage.getItem('datingProfile');

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
        this.state.userData = {
            name: '',
            gender: '',
            age: '',
            city: '',
            description: '',
            interests: [],
            lookingFor: [],
            preference: 'both',
            profileColor: '#FF6B6B',
            avatar: null,
            photos: [],
        };
        this.chatHandler.chats = {}; 
        alert('Все данные профиля очищены. Вы будете перенаправлены на экран регистрации.');
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
        }

        if (targetScreenElement) {
            targetScreenElement.style.display = 'flex';
            setTimeout(() => {
                targetScreenElement.classList.add('active');
            }, 10); 
        }
        
        this.state.currentScreen = screenName;
    }

    showSwipeTutorialModal() {
        this.elements.swipeTutorialModal.classList.add('active');
    }

    hideSwipeTutorialModal() {
        this.elements.swipeTutorialModal.classList.remove('active');
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return null;
        
        const R = 6371;
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

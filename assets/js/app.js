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
                { id: 'photography', name: 'Фотография', 'emoji': '📷' },
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
            ],
            // НОВЫЕ КОНФИГУРАЦИИ ДЛЯ РАСШИРЕННЫХ ПОЛЕЙ
            badHabitsOptions: [
                { id: 'none', name: 'Нет', emoji: '😇' },
                { id: 'alcohol', name: 'Алкоголь', emoji: '🍺' },
                { id: 'smoking', name: 'Курение', emoji: '🚬' },
                { id: 'both', name: 'И то, и другое', emoji: '😈' }
            ],
            childrenOptions: [
                { id: 'no_children', name: 'Нет детей', emoji: '🚫👶' },
                { id: 'has_children', name: 'Есть дети', emoji: '👨‍👩‍👧‍👦' },
                { id: 'wants_children', name: 'Хочу детей', emoji: '🤰' },
                { id: 'does_not_want_children', name: 'Не хочу детей', emoji: '🙅‍♀️👶' }
            ],
            petsOptions: [
                { id: 'no_pets', name: 'Нет животных', emoji: '🐾🚫' },
                { id: 'cat', name: 'Кошка', emoji: '🐱' },
                { id: 'dog', name: 'Собака', emoji: '🐶' },
                { id: 'other_pets', name: 'Другие', emoji: '🐠' }
            ],
            languagesOptions: [ // Пример популярных языков
                { id: 'russian', name: 'Русский', emoji: '🇷🇺' },
                { id: 'english', name: 'Английский', emoji: '🇬🇧' },
                { id: 'spanish', name: 'Испанский', emoji: '🇪🇸' },
                { id: 'german', name: 'Немецкий', emoji: '🇩🇪' },
                { id: 'french', name: 'Французский', emoji: '🇫🇷' },
                { id: 'chinese', name: 'Китайский', emoji: '🇨🇳' }
            ],
            datingGoalsOptions: [ // Более детальные цели знакомства
                { id: 'long_term_relationship', name: 'Серьезные отношения', emoji: '❤️‍🔥' },
                { id: 'short_term_dating', name: 'Недолгие свидания', emoji: '🥂' },
                { id: 'new_friends', name: 'Новые друзья', emoji: '🫂' },
                { id: 'casual_fun', name: 'Легкое общение', emoji: '🥳' },
                { id: 'marriage', name: 'Брак', emoji: '👰‍♀️' },
                { id: 'travel_buddy', name: 'Спутник для путешествий', emoji: '✈️' },
                { id: 'hobby_partner', name: 'Партнер по хобби', emoji: '🎨' }
            ],
            // НОВЫЕ КОНФИГУРАЦИИ ДЛЯ ЛЕДОКОЛОВ И ВОПРОСОВ
            icebreakers: [
                { id: 'fact_about_me', type: 'game', text: 'Отправь {partnerName} случайный факт о себе.' },
                { id: 'two_truths_one_lie', type: 'game', text: 'Сыграйте в "Две правды и одна ложь".' },
                { id: 'ideal_weekend', type: 'question', text: 'Твой идеальный выходной?' },
                { id: 'never_again', type: 'question', text: 'Что ты никогда не сделаешь снова?' },
                { id: 'favorite_movie', type: 'question', text: 'Какой твой любимый фильм и почему?' },
                { id: 'dream_travel', type: 'question', text: 'Куда бы ты отправился(лась) в путешествие прямо сейчас, если бы мог(ла)?' },
                { id: 'hidden_talent', type: 'question', text: 'Есть ли у тебя какой-нибудь скрытый талант?' },
                { id: 'best_advice', type: 'question', text: 'Какой самый лучший совет ты когда-либо получал(а)?' },
                { id: 'morning_routine', type: 'question', text: 'Опиши свое идеальное утро.' },
                { id: 'superpower', type: 'question', text: 'Если бы у тебя была суперспособность, какая бы это была?' },
                { id: 'desert_island_book', type: 'question', text: 'Какую одну книгу ты бы взял(а) на необитаемый остров?' },
                { id: 'first_thing_after_win', type: 'question', text: 'Что первое ты сделаешь, если выиграешь в лотерею?' },
                { id: 'childhood_dream', type: 'question', text: 'Кем ты мечтал(а) стать в детстве?' },
                { id: 'favorite_food', type: 'question', text: 'Какое твое любимое блюдо и почему?' },
                { id: 'learn_new_skill', type: 'question', text: 'Какой новый навык ты хотел(а) бы освоить?' },
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
                // НОВЫЕ ПОЛЯ ПРОФИЛЯ
                education: '',
                profession: '',
                badHabits: [], // Может быть несколько
                children: '', // Выбор из опций
                pets: [], // Может быть несколько
                languages: [], // Может быть несколько
                datingGoals: [], // Множественный выбор
            },
            suggestedProfiles: [],
            currentLanguage: 'ru', // Default language
            unreadMessagesCount: 0, // НОВОЕ: Счетчик непрочитанных сообщений
            blockedUsers: [], // НОВОЕ: Список заблокированных пользователей
            // likedByUsers: [], // УДАЛЕНО: Список пользователей, которые лайкнули текущего
        };

        this.translations = {
            ru: {
                loadingTitle: 'ТочкаСхода',
                loadingSubtitle: 'Место, где сливаются ваши пути',
                profile: 'Профиль',
                matches: 'Анкеты',
                chat: 'Чат',
                settings: 'Настройки',
                // likedBy: 'Лайкнули', // УДАЛЕНО
                registrationTitle: 'Создайте свой профиль',
                registrationDescription: 'Расскажите немного о себе, чтобы мы могли найти идеальные совпадения.',
                yourName: 'Ваше имя',
                next: 'Далее',
                back: 'Назад',
                male: 'Мужчина',
                female: 'Женщина',
                yourCity: 'Ваш город',
                yourDob: 'Ваша дата рождения',
                day: 'День',
                month: 'Месяц',
                year: 'Год',
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
                whatAreYouLookingFor: 'Что вы ищете?',
                friendship: 'Дружба',
                dating: 'Романтические отношения',
                serious: 'Серьёзные отношения',
                networking: 'Нетворкинг',
                travel: 'Спутник для путешествий',
                yourInterests: 'Ваши интересы',
                music: 'Музыка',
                sports: 'Спорт',
                books: 'Книги',
                art: 'Искусство',
                games: 'Игры',
                cooking: 'Кулинария',
                photography: 'Фотография',
                movies: 'Кино',
                nature: 'Природа',
                technology: 'Технологии',
                fashion: 'Мода',
                whoAreYouLookingFor: 'Кого вы ищете?',
                both: 'Всех',
                profileColor: 'Цвет профиля',
                orChooseYourColor: 'Или выберите свой цвет',
                aboutYou: 'О себе',
                aboutYouPlaceholder: 'Расскажите о себе, своих увлечениях, мечтах...',
                saveProfile: 'Сохранить профиль',
                noDescription: 'Описание отсутствует.',
                noData: 'Нет данных',
                noLookingFor: 'Не указано, что ищет',
                noInterests: 'Интересы не указаны',
                noPhotos: 'Фотографии отсутствуют',
                lastActiveToday: 'Была сегодня',
                lastActiveYesterday: 'Была вчера',
                lastActiveThisWeek: 'Была на этой неделе',
                lastActiveRecently: 'Была недавно',
                km: 'км',
                noNewProfiles: 'Пока нет новых анкет. Попробуйте позже!',
                backToProfile: 'Вернуться в профиль',
                match: 'Мэтч!',
                youLiked: 'Вам понравился(лась) {name}!',
                likeSent: 'Лайк отправлен!',
                youLikedName: 'Вы лайкнули {name}!',
                superlikeSent: 'Суперлайк отправлен!',
                youSuperlikedName: 'Вы суперлайкнули {name}!',
                writeMessage: 'Написать сообщение',
                continueSwiping: 'Продолжить свайпать',
                yourChats: 'Ваши чаты',
                yourChatsDescription: 'Здесь будут отображаться ваши диалоги.',
                noActiveChats: 'У вас пока нет активных чатов. Начните знакомиться в разделе "Анкеты"!',
                typeMessage: 'Напишите сообщение...',
                messageRead: 'Прочитано',
                messageDelivered: 'Доставлено',
                confirmClearData: 'Вы уверены, что хотите удалить все данные профиля? Это действие необратимо.',
                clearProfileData: 'Удалить данные профиля',
                invalidDate: 'Некорректная дата рождения. Пожалуйста, проверьте день, месяц и год.',
                fillAllFieldsAlert: 'Пожалуйста, заполните это поле.',
                maxInterestsAlert: 'Вы можете выбрать не более {maxInterests} интересов.',
                education: 'Образование',
                profession: 'Профессия',
                yourEducation: 'Ваше образование',
                yourProfession: 'Ваша профессия',
                yourBadHabits: 'Вредные привычки',
                none: 'Нет',
                alcohol: 'Алкоголь',
                smoking: 'Курение',
                both: 'И то, и другое',
                yourChildrenStatus: 'Дети',
                no_children: 'Нет детей',
                has_children: 'Есть дети',
                wants_children: 'Хочу детей',
                does_not_want_children: 'Не хочу детей',
                yourPets: 'Домашние животные',
                no_pets: 'Нет животных',
                cat: 'Кошка',
                dog: 'Собака',
                other_pets: 'Другие',
                yourLanguages: 'Языки',
                russian: 'Русский',
                english: 'Английский',
                spanish: 'Испанский',
                german: 'Немецкий',
                french: 'Французский',
                chinese: 'Китайский',
                yourDatingGoals: 'Цели знакомства',
                long_term_relationship: 'Серьезные отношения',
                short_term_dating: 'Недолгие свидания',
                new_friends: 'Новые друзья',
                casual_fun: 'Легкое общение',
                marriage: 'Брак',
                travel_buddy: 'Спутник для путешествий',
                hobby_partner: 'Партнер по хобби',
                sendPhoto: 'Отправить фото',
                sendEmoji: 'Отправить эмодзи',
                blockUser: 'Заблокировать пользователя',
                confirmBlockUser: 'Вы уверены, что хотите заблокировать {name}? Вы больше не будете видеть его/ее анкету и сообщения.',
                userBlocked: '{name} заблокирован(а).',
                // likedByTitle: 'Кто меня лайкнул', // УДАЛЕНО
                // likedByDescription: 'Здесь вы можете увидеть, кто поставил вам лайк.', // УДАЛЕНО
                // noLikedByMessage: 'Пока никто не поставил вам лайк. Продолжайте свайпать!', // УДАЛЕНО
                // likeBack: 'Лайкнуть в ответ', // УДАЛЕНО
                // skip: 'Пропустить', // УДАЛЕНО
                icebreakersTitle: 'Ледоколы',
                icebreakersDescription: 'Выберите вопрос или игру, чтобы начать разговор.',
                cancel: 'Отмена',
                fact_about_me: 'Отправь {partnerName} случайный факт о себе.',
                two_truths_one_lie: 'Сыграйте в "Две правды и одна ложь".',
                ideal_weekend: 'Твой идеальный выходной?',
                never_again: 'Что ты никогда не сделаешь снова?',
                favorite_movie: 'Какой твой любимый фильм и почему?',
                dream_travel: 'Куда бы ты отправился(лась) в путешествие прямо сейчас, если бы мог(ла)?',
                hidden_talent: 'Есть ли у тебя какой-нибудь скрытый талант?',
                best_advice: 'Какой самый лучший совет ты когда-либо получал(а)?',
                morning_routine: 'Опиши свое идеальное утро.',
                superpower: 'Если бы у тебя была суперспособность, какая бы это была?',
                desert_island_book: 'Какую одну книгу ты бы взял(а) на необитаемый остров?',
                first_thing_after_win: 'Что первое ты сделаешь, если выиграешь в лотерею?',
                childhood_dream: 'Кем ты мечтал(а) стать в детстве?',
                favorite_food: 'Какое твое любимое блюдо и почему?' ,
                learn_new_skill: 'Какой новый навык ты хотел(а) бы освоить?',
                sendIcebreaker: 'Отправить ледокол',
                settings: 'Настройки', // Добавлено
                languageSelection: 'Выбор языка', // Добавлено
                selectLanguage: 'Выберите язык', // Добавлено
                profileColorSettings: 'Настройки цвета профиля', // Добавлено
            },
            en: {
                loadingTitle: 'Meeting Point',
                loadingSubtitle: 'Where your paths converge',
                profile: 'Profile',
                matches: 'Matches',
                chat: 'Chat',
                settings: 'Settings',
                // likedBy: 'Liked By', // УДАЛЕНО
                registrationTitle: 'Create Your Profile',
                registrationDescription: 'Tell us a little about yourself so we can find your perfect matches.',
                yourName: 'Your Name',
                next: 'Next',
                back: 'Back',
                male: 'Male',
                female: 'Female',
                yourCity: 'Your City',
                yourDob: 'Your Date of Birth',
                day: 'Day',
                month: 'Month',
                year: 'Year',
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
                whatAreYouLookingFor: 'What are you looking for?',
                friendship: 'Friendship',
                dating: 'Dating',
                serious: 'Serious Relationship',
                networking: 'Networking',
                travel: 'Travel Buddy',
                yourInterests: 'Your Interests',
                music: 'Music',
                sports: 'Sports',
                books: 'Books',
                art: 'Art',
                games: 'Games',
                cooking: 'Cooking',
                photography: 'Photography',
                movies: 'Movies',
                nature: 'Nature',
                technology: 'Technology',
                fashion: 'Fashion',
                whoAreYouLookingFor: 'Who are you looking for?',
                both: 'Everyone',
                profileColor: 'Profile Color',
                orChooseYourColor: 'Or choose your own color',
                aboutYou: 'About You',
                aboutYouPlaceholder: 'Tell us about yourself, your hobbies, dreams...',
                saveProfile: 'Save Profile',
                noDescription: 'No description provided.',
                noData: 'No data',
                noLookingFor: 'Not specified what they are looking for',
                noInterests: 'No interests specified',
                noPhotos: 'No photos available',
                lastActiveToday: 'Online today',
                lastActiveYesterday: 'Online yesterday',
                lastActiveThisWeek: 'Online this week',
                lastActiveRecently: 'Online recently',
                km: 'km',
                noNewProfiles: 'No new profiles for now. Try again later!',
                backToProfile: 'Back to Profile',
                match: 'Match!',
                youLiked: 'You matched with {name}!',
                likeSent: 'Like Sent!',
                youLikedName: 'You liked {name}!',
                superlikeSent: 'Superlike Sent!',
                youSuperlikedName: 'You superliked {name}!',
                writeMessage: 'Write a message',
                continueSwiping: 'Continue Swiping',
                yourChats: 'Your Chats',
                yourChatsDescription: 'Here you will see your conversations.',
                noActiveChats: 'You have no active chats yet. Start swiping in the "Matches" section!',
                typeMessage: 'Type a message...',
                messageRead: 'Read',
                messageDelivered: 'Delivered',
                confirmClearData: 'Are you sure you want to delete all profile data? This action is irreversible.',
                clearProfileData: 'Clear Profile Data',
                invalidDate: 'Invalid date of birth. Please check day, month, and year.',
                fillAllFieldsAlert: 'Please fill in this field.',
                maxInterestsAlert: 'You can select no more than {maxInterests} interests.',
                education: 'Education',
                profession: 'Profession',
                yourEducation: 'Your Education',
                yourProfession: 'Your Profession',
                yourBadHabits: 'Bad Habits',
                none: 'None',
                alcohol: 'Alcohol',
                smoking: 'Smoking',
                both: 'Both',
                yourChildrenStatus: 'Children',
                no_children: 'No children',
                has_children: 'Has children',
                wants_children: 'Wants children',
                does_not_want_children: 'Doesn\'t want children',
                yourPets: 'Pets',
                no_pets: 'No pets',
                cat: 'Cat',
                dog: 'Dog',
                other_pets: 'Other',
                yourLanguages: 'Languages',
                russian: 'Russian',
                english: 'English',
                spanish: 'Spanish',
                german: 'German',
                french: 'French',
                chinese: 'Chinese',
                yourDatingGoals: 'Dating Goals',
                long_term_relationship: 'Long-term relationship',
                short_term_dating: 'Short-term dating',
                new_friends: 'New friends',
                casual_fun: 'Casual fun',
                marriage: 'Marriage',
                travel_buddy: 'Travel buddy',
                hobby_partner: 'Hobby partner',
                sendPhoto: 'Send Photo',
                sendEmoji: 'Send Emoji',
                blockUser: 'Block User',
                confirmBlockUser: 'Are you sure you want to block {name}? You will no longer see their profile or messages.',
                userBlocked: '{name} has been blocked.',
                // likedByTitle: 'Liked By', // УДАЛЕНО
                // likedByDescription: 'Here you can see who liked you.', // УДАЛЕНО
                // noLikedByMessage: 'No one has liked you yet. Keep swiping!', // УДАЛЕНО
                // likeBack: 'Like Back', // УДАЛЕНО
                // skip: 'Skip', // УДАЛЕНО
                icebreakersTitle: 'Icebreakers',
                icebreakersDescription: 'Choose a question or game to start the conversation.',
                cancel: 'Cancel',
                fact_about_me: 'Send {partnerName} a random fact about yourself.',
                two_truths_one_lie: 'Play "Two truths and a lie".',
                ideal_weekend: 'What\'s your ideal weekend?',
                never_again: 'What would you never do again?',
                favorite_movie: 'What\'s your favorite movie and why?',
                dream_travel: 'Where would you travel right now if you could?',
                hidden_talent: 'Do you have any hidden talents?',
                best_advice: 'What\'s the best advice you\'ve ever received?',
                morning_routine: 'Describe your ideal morning.',
                superpower: 'If you had a superpower, what would it be?',
                desert_island_book: 'What one book would you take to a desert island?',
                first_thing_after_win: 'What\'s the first thing you\'d do if you won the lottery?',
                childhood_dream: 'What did you dream of becoming as a child?',
                favorite_food: 'What\'s your favorite food and why?',
                learn_new_skill: 'What new skill would you like to learn?',
                sendIcebreaker: 'Send Icebreaker',
                settings: 'Settings', // Добавлено
                languageSelection: 'Language Selection', // Добавлено
                selectLanguage: 'Select Language', // Добавлено
                profileColorSettings: 'Profile Color Settings', // Добавлено
            }
        };

        this.initElements();
        this.formHandler = new FormHandler(this);
        this.profileHandler = new ProfileHandler(this);
        this.uiHandler = new UIHandler(this);
        this.matchHandler = new MatchHandler(this); // Инициализируем MatchHandler здесь
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
        }, 300); // Delay for title after logo animation starts (reduced from 1500)

        setTimeout(() => {
            loadingSubtitle.style.animation = 'fadeInScale 1s ease-out forwards';
        }, 600); // Delay for subtitle after title starts (reduced from 1800)

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
        }, 2000); // Total duration before hiding loading screen (reduced from 3500)
    }

    initElements() {
        this.elements = {
            registrationForm: document.getElementById('registrationForm'),
            profileView: document.getElementById('profileView'),
            matchScreen: document.getElementById('matchScreen'),
            chatScreen: document.getElementById('chatScreen'),
            settingsScreen: document.getElementById('settingsScreen'),
            // likedByScreen: document.getElementById('likedByScreen'), // УДАЛЕНО
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
            // navLikedByText: document.getElementById('navLikedByText'), // УДАЛЕНО
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
            // НОВЫЕ ЭЛЕМЕНТЫ ДЛЯ МОДАЛЬНОГО ОКНА ПРОФИЛЯ
            profileFullModalEducation: document.getElementById('profileFullModalEducation'),
            profileFullModalProfession: document.getElementById('profileFullModalProfession'),
            profileFullModalBadHabits: document.getElementById('profileFullModalBadHabits'),
            profileFullModalChildren: document.getElementById('profileFullModalChildren'),
            profileFullModalPets: document.getElementById('profileFullModalPets'),
            profileFullModalLanguages: document.getElementById('profileFullModalLanguages'),
            profileFullModalDatingGoals: document.getElementById('profileFullModalDatingGoals'),


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
            // НОВЫЕ ЭЛЕМЕНТЫ ДЛЯ МОДАЛЬНОГО ОКНА АНКЕТЫ
            matchFullModalEducation: document.getElementById('matchFullModalEducation'),
            matchFullModalProfession: document.getElementById('matchFullModalProfession'),
            matchFullModalBadHabits: document.getElementById('matchFullModalBadHabits'),
            matchFullModalChildren: document.getElementById('matchFullModalChildren'),
            matchFullModalPets: document.getElementById('matchFullModalPets'),
            matchFullModalLanguages: document.getElementById('matchFullModalLanguages'),
            matchFullModalDatingGoals: document.getElementById('matchFullModalDatingGoals'),

            // НОВОЕ: Элементы для уведомлений чата
            chatNavBtn: document.querySelector('.nav-btn[data-screen="chat"]'),
            chatNotificationBadge: document.getElementById('chatNotificationBadge'),

            // НОВЫЕ ЭЛЕМЕНТЫ ДЛЯ ЛЕДОКОЛОВ
            icebreakerModalOverlay: document.getElementById('icebreakerModalOverlay'),
            icebreakerModalCloseBtn: document.getElementById('icebreakerModalCloseBtn'),
            icebreakerModalTitle: document.getElementById('icebreakerModalTitle'),
            icebreakerModalDescription: document.getElementById('icebreakerModalDescription'),
            icebreakerOptionsContainer: document.getElementById('icebreakerOptionsContainer'),
            icebreakerModalCancelBtn: document.getElementById('icebreakerModalCancelBtn'),
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
                        this.chatHandler.addChat(this.matchHandler.lastMatchedProfile);
                        // If we want to immediately open the chat after match
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

        // НОВЫЕ ОБРАБОТЧИКИ ДЛЯ ЛЕДОКОЛОВ
        if (this.elements.icebreakerModalCloseBtn) {
            this.elements.icebreakerModalCloseBtn.addEventListener('click', () => this.hideIcebreakerModal());
        }
        if (this.elements.icebreakerModalOverlay) {
            this.elements.icebreakerModalOverlay.addEventListener('click', (e) => {
                if (e.target === this.elements.icebreakerModalOverlay) {
                    this.hideIcebreakerModal();
                }
            });
        }
        if (this.elements.icebreakerModalCancelBtn) {
            this.elements.icebreakerModalCancelBtn.addEventListener('click', () => this.hideIcebreakerModal());
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
                if (this.elements.icebreakerModalOverlay.classList.contains('active')) {
                    this.hideIcebreakerModal();
                }
            }
        });
    }

    checkSavedProfile() {
        const savedProfile = localStorage.getItem('datingProfile');
        const savedLanguage = localStorage.getItem('appLanguage');
        const savedBlockedUsers = localStorage.getItem('blockedUsers'); // НОВОЕ: Загрузка заблокированных пользователей
        // const savedLikedByUsers = localStorage.getItem('datingAppLikedByUsers'); // УДАЛЕНО

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
        // if (savedLikedByUsers) { // УДАЛЕНО
        //     try {
        //         this.state.likedByUsers = JSON.parse(savedLikedByUsers);
        //     } catch (e) {
        //         console.error('Error loading liked by users:', e);
        //         localStorage.removeItem('datingAppLikedByUsers');
        //     }
        // }

        if (savedProfile) {
            try {
                const parsedProfile = JSON.parse(savedProfile);
                // Обновляем userData, чтобы включить новые поля, если они отсутствуют
                this.state.userData = {
                    ...this.state.userData, // Сохраняем дефолтные значения для новых полей
                    ...parsedProfile, // Перезаписываем сохраненными значениями
                };

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
                // Инициализация новых полей, если они отсутствуют в старых сохранениях
                if (!this.state.userData.education) this.state.userData.education = '';
                if (!this.state.userData.profession) this.state.userData.profession = '';
                if (!Array.isArray(this.state.userData.badHabits)) this.state.userData.badHabits = [];
                if (!this.state.userData.children) this.state.userData.children = '';
                if (!Array.isArray(this.state.userData.pets)) this.state.userData.pets = [];
                if (!Array.isArray(this.state.userData.languages)) this.state.userData.languages = [];
                if (!Array.isArray(this.state.userData.datingGoals)) this.state.userData.datingGoals = [];

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

    // saveLikedByUsers() { // УДАЛЕНО: Функция для сохранения списка лайкнувших
    //     localStorage.setItem('datingAppLikedByUsers', JSON.stringify(this.state.likedByUsers));
    // }

    clearAllData() {
        localStorage.removeItem('datingProfile');
        localStorage.removeItem('swipeTutorialShown');
        localStorage.removeItem('appLanguage');
        localStorage.removeItem('blockedUsers'); // НОВОЕ: Очистка заблокированных пользователей
        // localStorage.removeItem('datingAppLikedByUsers'); // УДАЛЕНО
        localStorage.removeItem('datingAppChats'); // Очистка чатов
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
            // Сброс новых полей
            education: '',
            profession: '',
            badHabits: [],
            children: '',
            pets: [],
            languages: [],
            datingGoals: [],
        };
        this.state.blockedUsers = []; // НОВОЕ: Сброс заблокированных пользователей
        // this.state.likedByUsers = []; // УДАЛЕНО
        this.state.unreadMessagesCount = 0; // НОВОЕ: Сброс счетчика
        this.updateChatNotificationBadge(); // НОВОЕ: Обновление бейджа
        // Reset chatHandler if it's loaded
        if (this.chatHandler) {
            this.chatHandler.chats = {};
            this.chatHandler.showChatListScreen(); // Re-render empty chat list
        }
        alert(this.translate('confirmClearData')); // This alert should be replaced with a custom modal
        this.setLanguage('ru');
        this.setAppThemeColor(this.state.userData.profileColor); // Reset theme color
        this.switchScreen('registration');
    }

    async switchScreen(screenName) {
        // Hide all screens first
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });

        // Deactivate all nav buttons
        this.elements.navButtons.forEach(button => {
            button.classList.remove('active');
            button.removeAttribute('tabindex'); // Ensure all nav buttons are focusable
        });

        let targetScreenElement;
        let navButtonToActivate = null;

        // Determine target screen and nav button
        if (screenName === 'registration') {
            targetScreenElement = this.elements.registrationForm;
            this.elements.topNavigation.style.display = 'none';
            this.formHandler.renderForm();
        } else if (screenName === 'profile') {
            targetScreenElement = this.elements.profileView;
            navButtonToActivate = document.querySelector('.nav-btn[data-screen="profile"]');
            this.elements.topNavigation.style.display = 'flex';
            this.profileHandler.showProfile();
        } else if (screenName === 'match') {
            targetScreenElement = this.elements.matchScreen;
            navButtonToActivate = document.querySelector('.nav-btn[data-screen="match"]');
            this.elements.topNavigation.style.display = 'flex';
            this.matchHandler.startMatch();
            this.matchHandler.setupEventListeners();
        } else if (screenName === 'chat') {
            targetScreenElement = this.elements.chatScreen;
            navButtonToActivate = document.querySelector('.nav-btn[data-screen="chat"]');
            this.elements.topNavigation.style.display = 'flex';
            await this.lazyLoadScript('chat');
            this.chatHandler.showChatListScreen();
            this.state.unreadMessagesCount = 0; // Reset unread count when chat is opened
            this.updateChatNotificationBadge();
        } else if (screenName === 'settings') {
            targetScreenElement = this.elements.settingsScreen;
            navButtonToActivate = document.querySelector('.nav-btn[data-screen="settings"]');
            this.elements.topNavigation.style.display = 'flex';
            await this.lazyLoadScript('settings');
            this.settingsHandler.renderSettings();
        }

        // Activate the target screen and nav button
        if (targetScreenElement) {
            targetScreenElement.style.display = 'flex'; // Make it visible for transition
            // Use a small timeout to ensure display:flex is applied before adding 'active'
            setTimeout(() => {
                targetScreenElement.classList.add('active');
            }, 10);
        }
        if (navButtonToActivate) {
            navButtonToActivate.classList.add('active');
        }

        this.state.currentScreen = screenName;
        this.updateTextContent();
    }


    // renderLikedByList() { // УДАЛЕНО: Функция для рендеринга списка лайкнувших
    //     const likedByListContainer = document.getElementById('likedByList');
    //     const noLikedByMessage = document.getElementById('noLikedByMessage');
    //     likedByListContainer.innerHTML = ''; // Очищаем список

    //     if (this.state.likedByUsers.length === 0) {
    //         noLikedByMessage.style.display = 'block';
    //     } else {
    //         noLikedByMessage.style.display = 'none';
    //         this.state.likedByUsers.forEach(profile => {
    //             const likedByItem = document.createElement('div');
    //             likedByItem.className = 'liked-by-item';
    //             likedByItem.dataset.profileId = profile.id; // Добавлено для идентификации
    //             likedByItem.innerHTML = `
    //                 <div class="liked-by-avatar" style="background-image: url('https://picsum.photos/seed/${profile.id}/80/80');"></div>
    //                 <div class="liked-by-info">
    //                     <div class="liked-by-name">${profile.name}, ${profile.age}</div>
    //                 </div>
    //                 <div class="liked-by-actions">
    //                     <button class="btn btn-like" data-action="like" data-profile-id="${profile.id}">${this.translate('likeBack')}</button>
    //                     <button class="btn btn-secondary" data-action="skip" data-profile-id="${profile.id}">${this.translate('skip')}</button>
    //                 </div>
    //             `;
    //             likedByListContainer.appendChild(likedByItem);

    //             // Добавляем обработчики событий для кнопок
    //             likedByItem.querySelector('[data-action="like"]').addEventListener('click', (e) => {
    //                 this.handleLikedByAction(e.target.dataset.profileId, 'like');
    //             });
    //             likedByItem.querySelector('[data-action="skip"]').addEventListener('click', (e) => {
    //                 this.handleLikedByAction(e.target.dataset.profileId, 'skip');
    //             });
    //         });
    //     }
    // }

    // handleLikedByAction(profileId, action) { // УДАЛЕНО: Обработка действий в разделе "Кто меня лайкнул"
    //     const profileIndex = this.state.likedByUsers.findIndex(p => p.id === profileId);
    //     if (profileIndex === -1) return;

    //     const profile = this.state.likedByUsers[profileIndex];

    //     if (action === 'like') {
    //         console.log(`Лайкнули в ответ: ${profile.name}`);
    //         this.lazyLoadScript('chat').then(() => {
    //             this.chatHandler.addChat(profile); // Добавляем чат
    //             this.showMatchSuccessModal(profile, 'match'); // Показываем модальное окно мэтча
    //         });
    //     } else if (action === 'skip') {
    //         console.log(`Пропустили: ${profile.name}`);
    //     }

    //     // Удаляем пользователя из списка "Кто меня лайкнул"
    //     this.state.likedByUsers.splice(profileIndex, 1);
    //     this.saveLikedByUsers();
    //     this.renderLikedByList(); // Перерисовываем список
    // }

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

        // Убедимся, что this.app.state.userData.name существует для seed
        const myAvatarSeed = this.state.userData.name || 'my_default_avatar';
        this.elements.matchModalMyAvatar.style.backgroundImage = `url(https://picsum.photos/seed/${myAvatarSeed}/100/100)`;
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

        // НОВЫЕ ПОЛЯ
        // Обновлено: теперь отображаем текст, даже если поле пустое, используя "Нет данных"
        this.elements.profileFullModalEducation.textContent = profileData.education || this.translate('noData');
        this.elements.profileFullModalProfession.textContent = profileData.profession || this.translate('noData');

        this.renderTags(this.elements.profileFullModalBadHabits, profileData.badHabits, this.config.badHabitsOptions, 'bad-habit');
        this.renderSingleTag(this.elements.profileFullModalChildren, profileData.children, this.config.childrenOptions, 'children');
        this.renderTags(this.elements.profileFullModalPets, profileData.pets, this.config.petsOptions, 'pets');
        this.renderTags(this.elements.profileFullModalLanguages, profileData.languages, this.config.languagesOptions, 'language');
        this.renderTags(this.elements.profileFullModalDatingGoals, profileData.datingGoals, this.config.datingGoalsOptions, 'dating-goal');
        // КОНЕЦ НОВЫХ ПОЛЕЙ

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

        this.renderTags(this.elements.profileFullModalLookingFor, profileData.lookingFor, this.config.lookingForOptions, 'looking-for');
        this.renderTags(this.elements.profileFullModalInterests, profileData.interests, this.config.interests, 'interest');

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

        if (this.calculateDistance(
            this.state.userData.location?.lat,
            this.state.userData.location?.lng,
            profileData.location?.lat,
            profileData.location?.lng
        ) !== null) {
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

        // НОВЫЕ ПОЛЯ
        // Обновлено: теперь отображаем текст, даже если поле пустое, используя "Нет данных"
        this.elements.matchFullModalEducation.textContent = profileData.education || this.translate('noData');
        this.elements.matchFullModalProfession.textContent = profileData.profession || this.translate('noData');

        this.renderTags(this.elements.matchFullModalBadHabits, profileData.badHabits, this.config.badHabitsOptions, 'bad-habit');
        this.renderSingleTag(this.elements.matchFullModalChildren, profileData.children, this.config.childrenOptions, 'children');
        this.renderTags(this.elements.matchFullModalPets, profileData.pets, this.config.petsOptions, 'pets');
        this.renderTags(this.elements.matchFullModalLanguages, profileData.languages, this.config.languagesOptions, 'language');
        this.renderTags(this.elements.matchFullModalDatingGoals, profileData.datingGoals, this.config.datingGoalsOptions, 'dating-goal');
        // КОНЕЦ НОВЫХ ПОЛЕЙ

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

        this.renderTags(this.elements.matchFullModalLookingFor, profileData.lookingFor, this.config.lookingForOptions, 'looking-for');
        this.renderTags(this.elements.matchFullModalInterests, profileData.interests, this.config.interests, 'interest');

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

    // НОВАЯ ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ РЕНДЕРИНГА ТЕГОВ (МНОЖЕСТВЕННЫЙ ВЫБОР)
    renderTags(container, selectedIds, optionsConfig, classNamePrefix) {
        container.innerHTML = '';
        if (selectedIds && selectedIds.length > 0) {
            selectedIds.forEach(optionId => {
                const option = optionsConfig.find(o => o.id === optionId);
                if (option) {
                    const el = document.createElement('div');
                    el.className = `${classNamePrefix}-item`;
                    el.innerHTML = `
                        <span class="${classNamePrefix}-emoji">${option.emoji}</span>
                        <span class="${classNamePrefix}-text">${this.translate(option.id)}</span>
                    `;
                    container.appendChild(el);
                }
            });
        } else {
            container.innerHTML = `<div class="no-data">${this.translate('noData')}</div>`;
        }
    }

    // НОВАЯ ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ РЕНДЕРИНГА ОДИНОЧНОГО ТЕГА (ЕДИНИЧНЫЙ ВЫБОР)
    renderSingleTag(container, selectedId, optionsConfig, classNamePrefix) {
        container.innerHTML = '';
        if (selectedId) {
            const option = optionsConfig.find(o => o.id === selectedId);
            if (option) {
                const el = document.createElement('div');
                el.className = `${classNamePrefix}-item`;
                el.innerHTML = `
                    <span class="${classNamePrefix}-emoji">${option.emoji}</span>
                    <span class="${classNamePrefix}-text">${this.translate(option.id)}</span>
                `;
                container.appendChild(el);
            }
        } else {
            container.innerHTML = `<div class="no-data">${this.translate('noData')}</div>`;
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
                this.matchHandler.setupEventListeners();
            } else if (this.state.currentScreen === 'chat' && this.chatHandler) { // Check if loaded
                this.chatHandler.showChatListScreen();
            } else if (this.state.currentScreen === 'settings' && this.settingsHandler) { // Check if loaded
                this.settingsHandler.renderSettings();
            }
            // else if (this.state.currentScreen === 'likedBy') { // УДАЛЕНО
            //     this.renderLikedByList();
            // }
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
        // document.getElementById('navLikedByText').textContent = this.translate('likedBy'); // УДАЛЕНО

        if (this.elements.matchSuccessModal && this.elements.matchSuccessModal.classList.contains('active')) {
            // Re-render match success modal content if it's active
            // This is a simplified approach; a more robust solution would involve re-calling showMatchSuccessModal
            // with the current profile and type, which would re-translate all its content.
            // For now, we just update the buttons.
            this.elements.matchModalChatBtn.textContent = this.translate('writeMessage');
            this.elements.matchModalContinueBtn.textContent = this.translate('continueSwiping');
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
            const noProfilesMessageElement = document.getElementById('noProfilesMessage');
            if (noProfilesMessageElement) {
                noProfilesMessageElement.innerHTML = `<p>${this.translate('noNewProfiles')}</p><button class="btn btn-secondary" style="margin-top: 20px;" id="backToProfileFromMatchBtn">${this.translate('backToProfile')}</button>`;
                // Re-bind event listener for this button if it's dynamically re-rendered
                const backToProfileFromMatchBtn = document.getElementById('backToProfileFromMatchBtn');
                if (backToProfileFromMatchBtn) {
                    backToProfileFromMatchBtn.removeEventListener('click', () => this.switchScreen('profile')); // Remove old
                    backToProfileFromMatchBtn.addEventListener('click', () => this.switchScreen('profile')); // Add new
                }
            }
        }

        // const likedByScreen = document.getElementById('likedByScreen'); // УДАЛЕНО
        // if (likedByScreen) {
        //     likedByScreen.querySelector('.section-title').textContent = this.translate('likedByTitle');
        //     likedByScreen.querySelector('.section-description').textContent = this.translate('likedByDescription');
        //     const noLikedByMessageElement = likedByScreen.querySelector('#noLikedByMessage p');
        //     if (noLikedByMessageElement) {
        //         noLikedByMessageElement.textContent = this.translate('noLikedByMessage');
        //     }
        //     // Re-render the list to update button texts
        //     this.renderLikedByList();
        // }

        // НОВОЕ: Обновление текстов для модального окна ледоколов
        if (this.elements.icebreakerModalOverlay && this.elements.icebreakerModalOverlay.classList.contains('active')) {
            // Only re-render if chatHandler and activeChatPartner exist
            if (this.chatHandler && this.chatHandler.activeChatPartner) {
                this.showIcebreakerModal(this.chatHandler.activeChatPartner); // Перерисовать модальное окно
            }
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
                this.chatHandler.showChatListScreen(); // Вернуться к списку чатов
            }
            // Удалить чат из списка, если он существует
            if (this.chatHandler && this.chatHandler.chats[userId]) {
                delete this.chatHandler.chats[userId];
                this.chatHandler.renderChatList();
                this.chatHandler.updateTotalUnreadCount(); // Обновить счетчик после удаления чата
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
                    // Telegram.WebApp.setHeaderColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')); // Обновить цвет хедера, чтобы бейдж был виден
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

    // НОВЫЕ МЕТОДЫ ДЛЯ ЛЕДОКОЛОВ
    showIcebreakerModal(partner) {
        if (!this.elements.icebreakerModalOverlay) return;

        this.elements.icebreakerModalTitle.textContent = this.translate('icebreakersTitle');
        this.elements.icebreakerModalDescription.textContent = this.translate('icebreakersDescription');
        this.elements.icebreakerModalCancelBtn.textContent = this.translate('cancel');

        this.elements.icebreakerOptionsContainer.innerHTML = ''; // Очищаем предыдущие опции

        // Добавляем вопросы
        const questions = this.config.icebreakers.filter(item => item.type === 'question');
        questions.forEach(q => {
            const item = document.createElement('div');
            item.className = 'icebreaker-option-item';
            item.dataset.icebreakerId = q.id;
            item.dataset.icebreakerType = q.type;
            item.innerHTML = `<span class="emoji">❓</span> <span class="text">${this.translate(q.id)}</span>`;
            item.addEventListener('click', () => this.selectIcebreaker(q.id, q.type, partner));
            this.elements.icebreakerOptionsContainer.appendChild(item);
        });

        // Добавляем игры
        const games = this.config.icebreakers.filter(item => item.type === 'game');
        games.forEach(g => {
            const item = document.createElement('div');
            item.className = 'icebreaker-option-item';
            item.dataset.icebreakerId = g.id;
            item.dataset.icebreakerType = g.type;
            item.innerHTML = `<span class="emoji">🎲</span> <span class="text">${this.translate(g.id, { partnerName: partner.name })}</span>`;
            item.addEventListener('click', () => this.selectIcebreaker(g.id, g.type, partner));
            this.elements.icebreakerOptionsContainer.appendChild(item);
        });

        this.elements.icebreakerModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.elements.icebreakerModalOverlay.focus();
    }

    hideIcebreakerModal() {
        if (this.elements.icebreakerModalOverlay) {
            this.elements.icebreakerModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    selectIcebreaker(icebreakerId, type, partner) {
        const icebreaker = this.config.icebreakers.find(item => item.id === icebreakerId);
        if (icebreaker && this.chatHandler) {
            let messageText = this.translate(icebreaker.id, { partnerName: partner.name });
            this.chatHandler.sendMessage(messageText); // Отправляем как обычное сообщение
            this.hideIcebreakerModal();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DatingApp();
});

class MatchHandler {
    constructor(app) {
        this.app = app;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
    }

    cacheElements() {
        this.elements = {
            matchCard: document.getElementById('matchCard'),
            matchCardBg: document.getElementById('matchCardBg'),
            matchNameAge: document.getElementById('matchNameAge'),
            matchDescription: document.getElementById('matchDescription'),
            matchLastActive: document.getElementById('matchLastActive'),
            matchDistance: document.getElementById('matchDistance'),
            likeBtn: document.getElementById('matchLikeBtn'),
            passBtn: document.getElementById('matchPassBtn'),
            noProfilesMessage: document.getElementById('noProfilesMessage')
        };
    }

    setupEventListeners() {
        this.elements.likeBtn.addEventListener('click', () => this.handleLike());
        this.elements.passBtn.addEventListener('click', () => this.handlePass());
    }

    generateRandomProfiles(count = 30) {
        const profiles = [];
        const namesMale = ['Александр', 'Дмитрий', 'Иван', 'Максим', 'Сергей', 'Андрей', 'Артем', 'Егор', 'Кирилл', 'Павел', 'Роман', 'Денис', 'Владимир', 'Михаил', 'Никита'];
        const namesFemale = ['Анастасия', 'Екатерина', 'Мария', 'Анна', 'Ольга', 'Елена', 'Наталья', 'София', 'Виктория', 'Дарья', 'Алина', 'Юлия', 'Ксения', 'Полина', 'Валерия'];
        const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Сочи', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Краснодар', 'Самара', 'Уфа', 'Ростов-на-Дону', 'Волгоград', 'Пермь', 'Воронеж', 'Челябинск'];
        const descriptions = [
            'Люблю путешествовать и открывать новые места. Ищу спутника для приключений.',
            'Увлекаюсь чтением фантастики, настольными играми и долгими прогулками по городу.',
            'Ищу единомышленников для активного отдыха: походы, велосипед, спортзал.',
            'Ценю искренность, чувство юмора и глубокие беседы. Готов к новым знакомствам.',
            'Программист по профессии, художник в душе. Ищу вдохновение и интересные проекты.',
            'Обожаю готовить и экспериментировать на кухне. Приглашаю на ужин!',
            'Мечтаю о кругосветном путешествии и новых культурных открытиях. Кто со мной?',
            'Занимаюсь спортом, веду здоровый образ жизни. Ищу партнера для тренировок или просто активного времяпровождения.',
            'Ищу вдохновение в повседневных мелочах, люблю фотографировать и создавать что-то новое.',
            'Люблю долгие прогулки, интересные беседы и уютные вечера с хорошей книгой.',
            'Всегда открыт для новых знакомств и приключений. Жизнь слишком коротка, чтобы скучать!',
            'Ищу человека, с которым можно разделить радости и печали, строить планы и просто быть собой.',
            'Моя жизнь - это постоянное движение и развитие. Не стою на месте, всегда учусь чему-то новому.',
            'Люблю животных и природу. Часто выбираюсь за город, чтобы насладиться тишиной и красотой.',
            'Увлекаюсь фотографией, созданием контента и всем, что связано с визуальным искусством.',
            'Ищу серьезные отношения, основанные на доверии и взаимопонимании. Готов к созданию семьи.',
            'Просто ищу новых друзей для общения и совместных занятий. Открыт для всех!',
            'Люблю ходить в кино, на концерты и выставки. Ищу компанию для культурного досуга.',
            'Фанатка кофе и уютных кафе. Ищу того, кто разделит мою страсть к ароматным напиткам.',
            'Предпочитаю активный отдых: горные лыжи зимой, походы летом. Ищу партнера для приключений.',
            'Интроверт, но открыт для общения с интересными людьми. Ценю глубокие разговоры.',
            'Экстраверт, люблю шумные компании и новые знакомства. Всегда за любой кипиш, кроме голодовки.',
            'Люблю готовить экзотические блюда и пробовать что-то новое. Ищу того, кто оценит мои кулинарные таланты.',
            'Занимаюсь йогой и медитацией. Ищу гармонию и спокойствие в жизни.',
            'Обожаю животных, особенно собак. Если у вас есть питомец, мы точно найдем общий язык!',
            'Мечтаю о собственном бизнесе и финансовой независимости. Ищу партнера для жизни и, возможно, для дела.',
            'Люблю читать исторические романы и смотреть документальные фильмы. Интересуюсь историей и культурой.',
            'Предпочитаю проводить вечера дома за просмотром сериалов или чтением. Ищу уютного человека.',
            'Люблю спорт, но не фанатично. Просто поддерживаю форму и наслаждаюсь движением.',
            'Ищу человека, который будет меня вдохновлять и поддерживать в моих начинаниях.'
        ];
        const interestingFacts = [
            'Люблю готовить пасту с морепродуктами.',
            'Могу собрать кубик Рубика за минуту.',
            'Обожаю слушать джаз по вечерам.',
            'Мечтаю научиться играть на гитаре.',
            'Мой кот умеет давать лапу.',
            'Не представляю жизнь без кофе.',
            'Каждое утро начинаю с пробежки.',
            'Коллекционирую старые виниловые пластинки.',
            'Могу часами говорить о космосе.',
            'Мой любимый цвет - синий.',
            'Недавно прочитал "Мастер и Маргарита".',
            'Обожаю запах свежескошенной травы.',
            'Могу починить почти любую технику.',
            'Моя мечта - посетить Японию.',
            'Люблю рисовать акварелью.',
            'Всегда ношу с собой блокнот для идей.',
            'Могу проснуться в 5 утра без будильника.',
            'Мой любимый фильм - "Начало".',
            'Недавно начал изучать испанский.',
            'Обожаю пешие прогулки по лесу.'
        ];

        for (let i = 0; i < count; i++) {
            const randomGender = Math.random() > 0.5 ? 'male' : 'female';
            const randomName = randomGender === 'male' 
                ? namesMale[Math.floor(Math.random() * namesMale.length)]
                : namesFemale[Math.floor(Math.random() * namesFemale.length)];
            
            const randomAge = Math.floor(Math.random() * (40 - 20 + 1)) + 20; // Возраст от 20 до 40
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
            const randomFact = interestingFacts[Math.floor(Math.random() * interestingFacts.length)];
            const randomColor = this.app.config.colors[Math.floor(Math.random() * this.app.config.colors.length)];

            const randomLookingFor = [];
            const numLookingFor = Math.floor(Math.random() * 3) + 1; // От 1 до 3 целей
            const shuffledLookingFor = [...this.app.config.lookingForOptions].sort(() => 0.5 - Math.random());
            for (let j = 0; j < numLookingFor; j++) {
                randomLookingFor.push(shuffledLookingFor[j].id);
            }

            const randomInterests = [];
            const numInterests = Math.floor(Math.random() * this.app.config.maxInterests) + 1; // От 1 до maxInterests
            const shuffledInterests = [...this.app.config.interests].sort(() => 0.5 - Math.random());
            for (let j = 0; j < numInterests; j++) {
                randomInterests.push(shuffledInterests[j].id);
            }

            // Генерация от 1 до 6 фотографий
            const numPhotos = Math.floor(Math.random() * this.app.config.maxPhotos) + 1;
            const photos = Array.from({ length: numPhotos }, (_, k) => `https://picsum.photos/seed/${randomName}${randomAge}${randomGender}${k}/400/600`);

            profiles.push({
                id: `profile_${i}`,
                name: randomName,
                age: randomAge,
                gender: randomGender,
                city: randomCity,
                description: randomDescription,
                interestingFact: randomFact,
                profileColor: randomColor,
                avatar: photos[0],
                photos: photos,
                lookingFor: randomLookingFor,
                interests: randomInterests,
                location: { lat: 55.7558 + (Math.random() - 0.5) * 0.1, lng: 37.6173 + (Math.random() - 0.5) * 0.1 },
                lastActive: this.getRandomLastActiveStatus()
            });
        }
        return profiles;
    }

    getRandomLastActiveStatus() {
        const statuses = ['Была сегодня', 'Была вчера', 'Была на этой неделе', 'Была недавно'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    startMatch() {
        const allGeneratedProfiles = this.generateRandomProfiles(30);
        const userPreference = this.app.state.userData.preference;
        const userGender = this.app.state.userData.gender;

        this.app.state.suggestedProfiles = allGeneratedProfiles.filter(profile => {
            if (userPreference === 'male' && profile.gender !== 'male') return false;
            if (userPreference === 'female' && profile.gender !== 'female') return false;
            return true;
        });

        this.app.state.suggestedProfiles = this.app.state.suggestedProfiles.filter(profile => profile.id !== this.app.state.userData.id);

        this.app.state.suggestedProfiles.sort(() => Math.random() - 0.5);

        this.app.state.likedProfiles = [];
        this.app.state.passedProfiles = [];
        this.currentIndex = 0;
        this.showNextProfile();
    }

    showNextProfile() {
        if (this.currentIndex >= this.app.state.suggestedProfiles.length) {
            this.elements.matchCard.style.display = 'none';
            this.elements.noProfilesMessage.style.display = 'block';
            return;
        }

        this.elements.matchCard.style.display = 'flex';
        this.elements.noProfilesMessage.style.display = 'none';

        const profile = this.app.state.suggestedProfiles[this.currentIndex];
        this.renderProfile(profile);
    }

    renderProfile(profile) {
        this.elements.matchCardBg.style.backgroundImage = `url(${profile.avatar})`;
        this.elements.matchNameAge.textContent = `${profile.name}, ${profile.age}`;
        this.elements.matchDescription.textContent = profile.interestingFact || profile.description || 'Пользователь пока ничего о себе не рассказал.';
        this.elements.matchLastActive.textContent = profile.lastActive;

        if (this.app.state.userData.location?.lat && profile.location?.lat) {
            const distance = this.app.calculateDistance(
                this.app.state.userData.location.lat,
                this.app.state.userData.location.lng,
                profile.location.lat,
                profile.location.lng
            );
            this.elements.matchDistance.textContent = distance ? `${distance} км` : '';
        } else {
            this.elements.matchDistance.textContent = '';
        }
        
        this.elements.matchCard.style.transition = 'none';
        this.elements.matchCard.style.transform = 'translateX(0) rotate(0)';
        this.elements.matchCard.style.opacity = '1';
        void this.elements.matchCard.offsetWidth;
        this.elements.matchCard.style.transition = 'all var(--transition-normal) ease';
    }

    handleLike() {
        const profile = this.app.state.suggestedProfiles[this.currentIndex];
        this.app.state.likedProfiles.push(profile);
        console.log('Liked:', profile.name);
        this.animateCard('like');
        this.currentIndex++;
        setTimeout(() => this.showNextProfile(), 500);
    }

    handlePass() {
        const profile = this.app.state.suggestedProfiles[this.currentIndex];
        this.app.state.passedProfiles.push(profile);
        console.log('Passed:', profile.name);
        this.animateCard('pass');
        this.currentIndex++;
        setTimeout(() => this.showNextProfile(), 500);
    }

    animateCard(action) {
        const card = this.elements.matchCard;
        card.style.transition = 'all 0.5s ease-out';
        card.style.transform = action === 'like' 
            ? 'translateX(100%) rotate(15deg)' 
            : 'translateX(-100%) rotate(-15deg)';
        card.style.opacity = '0';
    }
}

class MatchHandler {
    constructor(app) {
        this.app = app;
        this.currentIndex = 0;
        this.isExpanded = false;
        this.startY = 0;
        this.startX = 0;
        this.currentTranslateY = 0;
        this.currentTranslateX = 0;
        this.isScrollingContent = false; // Флаг, указывающий, что пользователь прокручивает контент внутри
        this.fixedInfoHeight = 0; // Добавляем свойство для хранения высоты фиксированной информации
        this.scrollThreshold = 50; // Порог для определения свайпа вверх/вниз
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
            matchDescriptionShort: document.getElementById('matchDescriptionShort'),
            matchScrollableContent: document.getElementById('matchScrollableContent'),
            matchDescriptionFull: document.getElementById('matchDescriptionFull'),
            matchLookingFor: document.getElementById('matchLookingFor'),
            matchInterests: document.getElementById('matchInterests'),
            matchPhotosGrid: document.getElementById('matchPhotosGrid'),
            matchLastActive: document.getElementById('matchLastActive'),
            matchDistance: document.getElementById('matchDistance'),
            noProfilesMessage: document.getElementById('noProfilesMessage'),
            matchScrollIndicator: document.querySelector('#matchScrollableContent .match-scroll-indicator'),
            matchFixedInfo: document.getElementById('matchFixedInfo'),
            matchLikeIcon: document.getElementById('matchLikeIcon'), // Новый элемент
            matchNopeIcon: document.getElementById('matchNopeIcon')  // Новый элемент
        };
    }

    setupEventListeners() {
        // Удаляем старые обработчики, чтобы избежать дублирования
        this.elements.matchCard.removeEventListener('touchstart', this.handleTouchStartBound);
        this.elements.matchCard.removeEventListener('touchmove', this.handleTouchMoveBound);
        this.elements.matchCard.removeEventListener('touchend', this.handleTouchEndBound);
        this.elements.matchScrollIndicator.removeEventListener('click', this.toggleExpandBound);

        // Привязываем методы свайпа к this
        this.handleTouchStartBound = this.handleTouchStart.bind(this);
        this.handleTouchMoveBound = this.handleTouchMove.bind(this);
        this.handleTouchEndBound = this.handleTouchEnd.bind(this);
        this.toggleExpandBound = this.toggleExpand.bind(this);

        this.elements.matchCard.addEventListener('touchstart', this.handleTouchStartBound, { passive: false });
        this.elements.matchCard.addEventListener('touchmove', this.handleTouchMoveBound, { passive: false });
        this.elements.matchCard.addEventListener('touchend', this.handleTouchEndBound);
        this.elements.matchScrollIndicator.addEventListener('click', this.toggleExpandBound);
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
            'Ценю искренность, чувство юмора и глубокие беседы. Готов к новым знакомства.',
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
            
            const randomAge = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
            const randomFact = interestingFacts[Math.floor(Math.random() * interestingFacts.length)];
            const randomColor = this.app.config.colors[Math.floor(Math.random() * this.app.config.colors.length)];

            const randomLookingFor = [];
            const numLookingFor = Math.floor(Math.random() * 3) + 1;
            const shuffledLookingFor = [...this.app.config.lookingForOptions].sort(() => 0.5 - Math.random());
            for (let j = 0; j < numLookingFor; j++) {
                randomLookingFor.push(shuffledLookingFor[j].id);
            }

            const randomInterests = [];
            const numInterests = Math.floor(Math.random() * this.app.config.maxInterests) + 1;
            const shuffledInterests = [...this.app.config.interests].sort(() => 0.5 - Math.random());
            for (let j = 0; j < numInterests; j++) {
                randomInterests.push(shuffledInterests[j].id);
            }

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
        this.measureFixedInfoHeight(); // Измеряем высоту после рендеринга
        this.resetScrollState(); // Сбрасываем состояние после измерения
    }

    renderProfile(profile) {
        // Устанавливаем цвет сердечка для лайка
        this.elements.matchLikeIcon.style.stroke = profile.profileColor;
        this.elements.matchLikeIcon.style.fill = profile.profileColor;

        this.elements.matchCardBg.style.backgroundImage = `url(${profile.avatar})`;
        
        let nameAgeText = profile.name || 'Аноним';
        if (profile.age) {
            nameAgeText += `, ${profile.age}`;
        }
        this.elements.matchNameAge.textContent = nameAgeText;
        
        const fullDescription = profile.description || 'Пользователь пока ничего о себе не рассказал.';
        this.elements.matchDescriptionShort.textContent = fullDescription.split('.')[0] + (fullDescription.includes('.') ? '.' : '');
        if (this.elements.matchDescriptionShort.textContent.length > 100) {
            this.elements.matchDescriptionShort.textContent = this.elements.matchDescriptionShort.textContent.substring(0, 97) + '...';
        }
        
        this.elements.matchDescriptionFull.textContent = fullDescription;

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
        
        this.updateLookingFor(profile.lookingFor, this.app.config.lookingForOptions, this.elements.matchLookingFor);
        this.updateInterests(profile.interests, this.app.config.interests, this.elements.matchInterests);
        this.updatePhotos(profile.photos, this.elements.matchPhotosGrid);

        // Сброс трансформаций и прозрачности для новой карточки
        this.elements.matchCard.style.transition = 'none';
        this.elements.matchCard.style.transform = 'translateX(0) rotate(0)';
        this.elements.matchCard.style.opacity = '1';
        this.elements.matchLikeIcon.classList.remove('visible'); // Скрываем иконки
        this.elements.matchNopeIcon.classList.remove('visible');
        void this.elements.matchCard.offsetWidth; // Принудительный рефлоу для сброса трансформации
        this.elements.matchCard.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out'; // Возвращаем плавный переход
    }

    updateLookingFor(lookingFor, options, container) {
        if (!container) return;
        container.innerHTML = '';
        if (lookingFor && lookingFor.length > 0) {
            const lookingForContainer = document.createElement('div');
            lookingForContainer.className = 'match-looking-for-container';
            lookingFor.forEach(optionId => {
                const option = options.find(o => o.id === optionId);
                if (option) {
                    const el = document.createElement('div');
                    el.className = 'match-looking-for-item';
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

    updateInterests(userInterests, configInterests, container) {
        if (!container) return;
        container.innerHTML = '';
        if (userInterests && userInterests.length > 0) {
            const interestsContainer = document.createElement('div');
            interestsContainer.className = 'match-interests-container';
            userInterests.forEach(interestId => {
                const interest = configInterests.find(i => i.id === interestId);
                if (interest) {
                    const el = document.createElement('div');
                    el.className = 'match-interest-item';
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

    updatePhotos(photos, container) {
        if (!container) return;
        container.innerHTML = '';
        if (photos && photos.length > 0) {
            photos.forEach(photo => {
                const el = document.createElement('div');
                el.className = 'match-photo-item';
                el.style.backgroundImage = `url(${photo})`;
                container.appendChild(el);
            });
        } else {
            container.innerHTML = '<div class="no-data">Фотографии не добавлены</div>';
        }
    }

    handleLike() {
        const profile = this.app.state.suggestedProfiles[this.currentIndex];
        this.app.state.likedProfiles.push(profile);
        console.log('Liked:', profile.name);
        this.app.playSound('like');
        this.app.vibrate(100);
        this.animateCard('like');
        this.currentIndex++;
        setTimeout(() => this.showNextProfile(), 300);
    }

    handlePass() {
        const profile = this.app.state.suggestedProfiles[this.currentIndex];
        this.app.state.passedProfiles.push(profile);
        console.log('Passed:', profile.name);
        this.app.playSound('nope');
        this.app.vibrate(50);
        this.animateCard('pass');
        this.currentIndex++;
        setTimeout(() => this.showNextProfile(), 300);
    }

    animateCard(action) {
        const card = this.elements.matchCard;
        card.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        card.style.transform = action === 'like' 
            ? 'translateX(150%) rotate(30deg)'
            : 'translateX(-150%) rotate(-30deg)';
        card.style.opacity = '0';
    }

    measureFixedInfoHeight() {
        this.elements.matchFixedInfo.style.position = 'relative';
        this.elements.matchFixedInfo.style.visibility = 'hidden';
        this.elements.matchFixedInfo.style.display = 'block';

        this.fixedInfoHeight = this.elements.matchFixedInfo.offsetHeight;
        
        this.elements.matchFixedInfo.style.position = 'absolute';
        this.elements.matchFixedInfo.style.visibility = 'visible';
        this.elements.matchFixedInfo.style.display = '';

        document.documentElement.style.setProperty('--match-fixed-info-height', `${this.fixedInfoHeight + 30}px`);
        document.documentElement.style.setProperty('--match-fixed-info-height-mobile', `${this.fixedInfoHeight + 20}px`);
        document.documentElement.style.setProperty('--match-fixed-info-height-mobile-sm', `${this.fixedInfoHeight + 15}px`);
    }

    resetScrollState() {
        this.isExpanded = false;
        this.elements.matchScrollableContent.classList.remove('expanded');
        this.elements.matchScrollableContent.style.transform = `translateY(calc(100% - ${this.fixedInfoHeight + 30}px))`; 
        this.elements.matchScrollableContent.scrollTop = 0;
        this.elements.matchFixedInfo.style.opacity = '1';
        this.elements.matchFixedInfo.style.pointerEvents = 'none';
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].clientY;
        this.startX = e.touches[0].clientX;
        const styleY = window.getComputedStyle(this.elements.matchScrollableContent);
        this.currentTranslateY = new DOMMatrixReadOnly(styleY.transform).m42;
        const styleX = window.getComputedStyle(this.elements.matchCard);
        this.currentTranslateX = new DOMMatrixReadOnly(styleX.transform).m41;

        const target = e.target;
        const scrollable = this.elements.matchScrollableContent;
        const isInsideScrollableContent = scrollable.contains(target) && target !== this.elements.matchScrollIndicator;

        if (isInsideScrollableContent && this.isExpanded) {
            this.isScrollingContent = true;
        } else {
            this.isScrollingContent = false;
        }
        
        this.elements.matchScrollableContent.style.transition = 'none';
        this.elements.matchCard.style.transition = 'none';
        this.elements.matchFixedInfo.style.transition = 'opacity 0.3s ease-out';
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].clientY - this.startY;
        const deltaX = e.touches[0].clientX - this.startX;

        const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX);

        if (this.isScrollingContent) {
            const scrollable = this.elements.matchScrollableContent;
            const atTop = scrollable.scrollTop === 0;
            const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight;

            if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
                this.isScrollingContent = false;
            } else {
                return;
            }
        }

        // Если анкета раскрыта, отключаем горизонтальные свайпы
        if (this.isExpanded && !isVerticalSwipe) {
            e.preventDefault(); // Предотвращаем горизонтальный свайп
            return;
        }

        if (!this.isScrollingContent && !isVerticalSwipe) {
            e.preventDefault();
            
            const cardWidth = this.elements.matchCard.offsetWidth;
            const rotation = deltaX * 0.1;

            this.elements.matchCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;

            if (deltaX > 0) {
                this.elements.matchLikeIcon.classList.add('visible');
                this.elements.matchNopeIcon.classList.remove('visible');
                this.elements.matchLikeIcon.style.transform = `translate(-50%, -50%) scale(${0.5 + Math.min(1, deltaX / (cardWidth / 4)) * 0.5})`;
            } else if (deltaX < 0) {
                this.elements.matchNopeIcon.classList.add('visible');
                this.elements.matchLikeIcon.classList.remove('visible');
                this.elements.matchNopeIcon.style.transform = `translate(-50%, -50%) scale(${0.5 + Math.min(1, Math.abs(deltaX) / (cardWidth / 4)) * 0.5})`;
            } else {
                this.elements.matchLikeIcon.classList.remove('visible');
                this.elements.matchNopeIcon.classList.remove('visible');
            }

        } else if (!this.isScrollingContent && isVerticalSwipe) {
            e.preventDefault();
            
            const cardHeight = this.elements.matchCard.offsetHeight;
            const initialVisibleHeight = this.fixedInfoHeight + 30; 
            const maxScrollUp = cardHeight - initialVisibleHeight; 

            let newTranslateY = this.currentTranslateY + deltaY;

            newTranslateY = Math.max(initialVisibleHeight, Math.min(cardHeight - this.scrollThreshold, newTranslateY)); 

            this.elements.matchScrollableContent.style.transform = `translateY(${newTranslateY}px)`;

            const opacity = Math.min(1, Math.max(0, (newTranslateY - initialVisibleHeight) / (maxScrollUp - initialVisibleHeight)));
            this.elements.matchFixedInfo.style.opacity = 1 - opacity;
        }
    }

    handleTouchEnd(e) {
        if (this.isScrollingContent) {
            this.isScrollingContent = false;
            return;
        }

        this.elements.matchCard.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        this.elements.matchScrollableContent.style.transition = 'transform 0.4s ease-out';
        this.elements.matchFixedInfo.style.transition = 'opacity 0.4s ease-out';

        const currentTransformX = new DOMMatrixReadOnly(window.getComputedStyle(this.elements.matchCard).transform).m41;
        const cardWidth = this.elements.matchCard.offsetWidth;
        const swipeThresholdX = cardWidth / 3;

        // Если анкета раскрыта, свайпы не обрабатываются
        if (this.isExpanded) {
            this.elements.matchCard.style.transform = 'translateX(0) rotate(0)';
            this.elements.matchCard.style.opacity = '1';
            this.elements.matchLikeIcon.classList.remove('visible');
            this.elements.matchNopeIcon.classList.remove('visible');
            return;
        }

        if (Math.abs(currentTransformX) > swipeThresholdX) {
            if (currentTransformX > 0) {
                this.handleLike();
            } else {
                this.handlePass();
            }
        } else {
            this.elements.matchCard.style.transform = 'translateX(0) rotate(0)';
            this.elements.matchCard.style.opacity = '1';
            this.elements.matchLikeIcon.classList.remove('visible');
            this.elements.matchNopeIcon.classList.remove('visible');

            const currentTransformY = new DOMMatrixReadOnly(window.getComputedStyle(this.elements.matchScrollableContent).transform).m42;
            const cardHeight = this.elements.matchCard.offsetHeight;
            const initialVisibleHeight = this.fixedInfoHeight + 30;
            const thresholdForExpand = initialVisibleHeight + (cardHeight - initialVisibleHeight - this.scrollThreshold) / 2;

            if (currentTransformY < thresholdForExpand) {
                this.elements.matchScrollableContent.classList.add('expanded');
                this.isExpanded = true;
                this.elements.matchFixedInfo.style.opacity = '0';
            } else {
                this.elements.matchScrollableContent.classList.remove('expanded');
                this.isExpanded = false;
                this.elements.matchFixedInfo.style.opacity = '1';
            }
            this.elements.matchScrollableContent.style.transform = '';
        }
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        this.elements.matchScrollableContent.classList.toggle('expanded', this.isExpanded);
        this.elements.matchScrollableContent.scrollTop = 0;
        this.elements.matchFixedInfo.style.opacity = this.isExpanded ? '0' : '1';
        this.elements.matchFixedInfo.style.transition = 'opacity 0.4s ease-out';
    }
}

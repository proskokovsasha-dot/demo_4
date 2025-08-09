class MatchHandler {
    constructor(app) {
        this.app = app;
        this.currentIndex = 0;
        this.isExpanded = false;
        this.fixedInfoHeight = 0;
        this.startY = 0; // Для свайпа
        this.currentTranslateY = 0; // Для свайпа
        this.isScrollingContent = false; // Для свайпа
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
            matchFixedInfo: document.getElementById('matchFixedInfo'),
            nopeBtn: document.getElementById('nopeBtn'),
            likeBtn: document.getElementById('likeBtn'),
            matchCardActions: document.querySelector('.match-card-actions'),
            matchActiveDot: document.querySelector('.match-active-dot'),
            toggleMatchInfoBtn: document.getElementById('viewProfileBtn'), // Кнопка "Подробнее"
            closeMatchInfoBtn: document.getElementById('closeMatchInfoBtn') // НОВЫЙ ЭЛЕМЕНТ: Кнопка закрытия
        };
    }

    setupEventListeners() {
        // Удаляем старые обработчики, чтобы избежать дублирования
        if (this.nopeBtnHandler) {
            this.elements.nopeBtn.removeEventListener('click', this.nopeBtnHandler);
            this.elements.likeBtn.removeEventListener('click', this.likeBtnHandler);
            this.elements.toggleMatchInfoBtn.removeEventListener('click', this.toggleMatchInfoBtnHandler);
            if (this.closeMatchInfoBtnHandler) {
                this.elements.closeMatchInfoBtn.removeEventListener('click', this.closeMatchInfoBtnHandler);
            }
            // Удаляем обработчики свайпа, если они были привязаны ранее
            this.elements.matchCard.removeEventListener('touchstart', this.handleTouchStartBound);
            this.elements.matchCard.removeEventListener('touchmove', this.handleTouchMoveBound);
            this.elements.matchCard.removeEventListener('touchend', this.handleTouchEndBound);
        }

        // Привязываем новые обработчики
        this.nopeBtnHandler = () => this.handlePass();
        this.elements.nopeBtn.addEventListener('click', this.nopeBtnHandler);
        
        this.likeBtnHandler = () => this.handleLike();
        this.elements.likeBtn.addEventListener('click', this.likeBtnHandler);

        this.toggleMatchInfoBtnHandler = this.toggleExpand.bind(this);
        this.elements.toggleMatchInfoBtn.addEventListener('click', this.toggleMatchInfoBtnHandler);

        // НОВЫЙ ОБРАБОТЧИК ДЛЯ КНОПКИ ЗАКРЫТИЯ
        this.closeMatchInfoBtnHandler = () => this.toggleExpand(); // Используем тот же метод toggleExpand
        this.elements.closeMatchInfoBtn.addEventListener('click', this.closeMatchInfoBtnHandler);

        // Привязываем методы свайпа к this
        this.handleTouchStartBound = this.handleTouchStart.bind(this);
        this.handleTouchMoveBound = this.handleTouchMove.bind(this);
        this.handleTouchEndBound = this.handleTouchEnd.bind(this);

        // Добавляем обработчики свайпа для match-card для открытия/закрытия
        this.elements.matchCard.addEventListener('touchstart', this.handleTouchStartBound, { passive: false });
        this.elements.matchCard.addEventListener('touchmove', this.handleTouchMoveBound, { passive: false });
        this.elements.matchCard.addEventListener('touchend', this.handleTouchEndBound);
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
            this.elements.matchCardActions.style.display = 'none'; 
            return;
        }

        this.elements.matchCard.style.display = 'flex';
        this.elements.noProfilesMessage.style.display = 'none';
        this.elements.matchCardActions.style.display = 'flex';

        const profile = this.app.state.suggestedProfiles[this.currentIndex];
        this.renderProfile(profile);
        this.measureFixedInfoHeight(); // Измеряем высоту после рендеринга
        this.resetScrollState(); // Сбрасываем состояние после измерения

        this.app.state.profileStats.views++;
        this.app.saveProfileStats();
    }

    renderProfile(profile) {
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
        if (profile.lastActive === 'Была сегодня') {
            this.elements.matchActiveDot.classList.remove('offline');
            this.elements.matchActiveDot.style.backgroundColor = 'var(--match-active-dot)';
        } else {
            this.elements.matchActiveDot.classList.add('offline');
            this.elements.matchActiveDot.style.backgroundColor = 'var(--text-secondary)';
        }

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

        this.elements.matchCard.style.transition = 'none';
        this.elements.matchCard.style.transform = 'translateX(0) rotate(0)';
        this.elements.matchCard.style.opacity = '1';
        void this.elements.matchCard.offsetWidth;
        this.elements.matchCard.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
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
        
        this.app.state.profileStats.likesReceived++;
        this.app.saveProfileStats();

        // Имитация совпадения или нового лайка
        const randomChance = Math.random();
        if (randomChance < 0.3) { // 30% шанс на совпадение
            this.app.state.profileStats.matches++;
            this.app.saveProfileStats();
            this.app.addChatAfterLike(profile);
            // Показываем уведомление о совпадении
            this.app.showNotificationModal('match', profile);
        } else if (randomChance < 0.6) { // 30% шанс на новый лайк (если не совпадение)
            // Имитируем, что кто-то другой лайкнул вас
            const dummyProfile = {
                name: 'Незнакомец',
                age: Math.floor(Math.random() * (35 - 20 + 1)) + 20,
                avatar: 'https://picsum.photos/seed/newlike/100/100'
            };
            this.app.showNotificationModal('newLike', dummyProfile);
        } else {
            // Если нет ни совпадения, ни нового лайка, просто переходим к следующему профилю
            setTimeout(() => this.showNextProfile(), 300);
        }

        this.currentIndex++;
        // Если уведомление было показано, переход к следующему профилю будет осуществлен из колбэков кнопок уведомления.
        // Если уведомление не показано, то переход уже сделан выше.
        if (randomChance >= 0.6) { // Только если не было уведомления
            setTimeout(() => this.showNextProfile(), 300);
        }
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
        card.style.animation = '';
        if (action === 'like') {
            card.style.animation = 'swipeRight 0.3s forwards';
        } else if (action === 'pass') {
            card.style.animation = 'swipeLeft 0.3s forwards';
        }
        card.addEventListener('animationend', () => {
            card.style.animation = '';
        }, { once: true });
    }

    measureFixedInfoHeight() {
        // Убедимся, что элемент виден для корректного измерения
        this.elements.matchFixedInfo.style.position = 'relative';
        this.elements.matchFixedInfo.style.visibility = 'hidden';
        this.elements.matchFixedInfo.style.display = 'block';

        this.fixedInfoHeight = this.elements.matchFixedInfo.offsetHeight;
        
        // Возвращаем исходные стили
        this.elements.matchFixedInfo.style.position = 'absolute';
        this.elements.matchFixedInfo.style.visibility = 'visible';
        this.elements.matchFixedInfo.style.display = '';

        // Устанавливаем CSS-переменные для использования в стилях
        const matchHeaderHeight = document.querySelector('.match-header').offsetHeight;

        // Рассчитываем верхнюю позицию для полностью раскрытого состояния
        const expandedTopPosition = matchHeaderHeight + this.fixedInfoHeight + 20; // 20px - дополнительный отступ

        document.documentElement.style.setProperty('--match-expanded-top-position', `${expandedTopPosition}px`);

        // Адаптация для мобильных
        const expandedTopPositionMobile = matchHeaderHeight + this.fixedInfoHeight + 15;
        document.documentElement.style.setProperty('--match-expanded-top-position-mobile', `${expandedTopPositionMobile}px`);
        
        const expandedTopPositionMobileSm = matchHeaderHeight + this.fixedInfoHeight + 10;
        document.documentElement.style.setProperty('--match-expanded-top-position-mobile-sm', `${expandedTopPositionMobileSm}px`);
    }

    resetScrollState() {
        this.isExpanded = false;
        this.elements.matchScrollableContent.classList.remove('expanded');
        this.elements.matchScrollableContent.scrollTop = 0;
        this.elements.matchFixedInfo.style.opacity = '1';
        this.elements.matchFixedInfo.style.pointerEvents = 'auto'; // Разрешаем клики на фиксированной инфо
        this.elements.matchCardActions.style.opacity = '1';
        this.elements.matchCardActions.style.pointerEvents = 'auto';
        this.elements.closeMatchInfoBtn.style.opacity = '0'; // Скрываем кнопку закрытия
        this.elements.closeMatchInfoBtn.style.visibility = 'hidden';

        // Обновляем текст и иконку кнопки "Подробнее"
        if (this.elements.toggleMatchInfoBtn) {
            this.elements.toggleMatchInfoBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            `;
            // Применяем анимацию после обновления innerHTML
            this.elements.toggleMatchInfoBtn.querySelector('svg').style.animation = 'rotateArrowUp 0.3s forwards';
        }
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        this.elements.matchScrollableContent.classList.toggle('expanded', this.isExpanded);
        this.elements.matchScrollableContent.scrollTop = 0;
        this.elements.matchFixedInfo.style.opacity = this.isExpanded ? '0' : '1';
        this.elements.matchFixedInfo.style.transition = 'opacity 0.4s ease-out';
        this.elements.matchCardActions.style.opacity = this.isExpanded ? '0' : '1';
        this.elements.matchCardActions.style.pointerEvents = this.isExpanded ? 'none' : 'auto';

        // Управление видимостью кнопки закрытия
        this.elements.closeMatchInfoBtn.style.opacity = this.isExpanded ? '1' : '0';
        this.elements.closeMatchInfoBtn.style.visibility = this.isExpanded ? 'visible' : 'hidden';

        // Обновляем текст и иконку кнопки "Подробнее"
        if (this.elements.toggleMatchInfoBtn) {
            const svgElement = this.elements.toggleMatchInfoBtn.querySelector('svg');
            if (this.isExpanded) {
                this.elements.toggleMatchInfoBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 15 12 9 18 15"></polyline>
                    </svg>
                `;
                // Применяем анимацию после обновления innerHTML
                this.elements.toggleMatchInfoBtn.querySelector('svg').style.animation = 'rotateArrowDown 0.3s forwards';
            } else {
                this.elements.toggleMatchInfoBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                `;
                // Применяем анимацию после обновления innerHTML
                this.elements.toggleMatchInfoBtn.querySelector('svg').style.animation = 'rotateArrowUp 0.3s forwards';
            }
        }
    }

    // НОВЫЕ МЕТОДЫ ДЛЯ СВАЙПА ВВЕРХ/ВНИЗ
    handleTouchStart(e) {
        // Игнорируем свайп, если касание началось на кнопках действий или кнопке закрытия
        if (e.target.closest('.match-card-actions') || e.target.closest('#closeMatchInfoBtn')) {
            return;
        }

        this.startY = e.touches[0].clientY;
        const style = window.getComputedStyle(this.elements.matchScrollableContent);
        this.currentTranslateY = new DOMMatrixReadOnly(style.transform).m42;
        this.elements.matchScrollableContent.style.transition = 'none';
        this.elements.matchFixedInfo.style.transition = 'opacity 0.3s ease-out';
        this.elements.matchCardActions.style.transition = 'opacity 0.3s ease-out';
        this.elements.closeMatchInfoBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';

        const target = e.target;
        const scrollable = this.elements.matchScrollableContent;
        this.isScrollingContent = scrollable.contains(target) && this.isExpanded;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].clientY - this.startY;

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

        e.preventDefault(); // Предотвращаем прокрутку страницы

        const cardHeight = this.elements.matchCard.offsetHeight;
        const matchHeaderHeight = document.querySelector('.match-header').offsetHeight;

        // Получаем текущие значения CSS-переменных для адаптации
        const expandedPositionPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--match-expanded-top-position').replace('px', ''));
        const expandedPositionMobilePx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--match-expanded-top-position-mobile').replace('px', ''));
        const expandedPositionMobileSmPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--match-expanded-top-position-mobile-sm').replace('px', ''));

        let currentExpandedPosition = expandedPositionPx;
        if (window.innerWidth <= 480) {
            currentExpandedPosition = expandedPositionMobilePx;
        }
        if (window.innerWidth <= 360) {
            currentExpandedPosition = expandedPositionMobileSmPx;
        }

        let newTranslateY = this.currentTranslateY + deltaY;

        // Ограничиваем движение:
        // - Нельзя свайпнуть ниже начального свернутого положения (cardHeight - 10% от высоты карточки, так как 90% скрыто)
        // - Нельзя свайпнуть выше, чем полностью раскрытое положение (currentExpandedPosition)
        newTranslateY = Math.max(currentExpandedPosition, Math.min(cardHeight * 0.9, newTranslateY)); 

        this.elements.matchScrollableContent.style.transform = `translateY(${newTranslateY}px)`;

        // Рассчитываем прозрачность фиксированной информации и кнопок действий
        const opacityRangeStart = currentExpandedPosition;
        const opacityRangeEnd = cardHeight * 0.9; // Когда фиксированная инфо и кнопки действий полностью видны

        let opacity = 1; // По умолчанию полностью видна
        if (newTranslateY < opacityRangeEnd) {
            opacity = (newTranslateY - opacityRangeStart) / (opacityRangeEnd - opacityRangeStart);
            opacity = Math.max(0, Math.min(1, opacity)); // Ограничиваем от 0 до 1
        }
        this.elements.matchFixedInfo.style.opacity = opacity;
        this.elements.matchCardActions.style.opacity = opacity;
        this.elements.closeMatchInfoBtn.style.opacity = 1 - opacity; // Кнопка закрытия появляется при скрытии фиксированной инфо
        this.elements.closeMatchInfoBtn.style.visibility = (1 - opacity) > 0.1 ? 'visible' : 'hidden'; // Показываем, если достаточно прозрачна
    }

    handleTouchEnd(e) {
        if (this.isScrollingContent) {
            this.isScrollingContent = false;
            return;
        }

        this.elements.matchScrollableContent.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.elements.matchFixedInfo.style.transition = 'opacity 0.4s ease-out';
        this.elements.matchCardActions.style.transition = 'opacity 0.4s ease-out';
        this.elements.closeMatchInfoBtn.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';

        const currentTransformY = new DOMMatrixReadOnly(window.getComputedStyle(this.elements.matchScrollableContent).transform).m42;
        
        const cardHeight = this.elements.matchCard.offsetHeight;
        const matchHeaderHeight = document.querySelector('.match-header').offsetHeight;

        const expandedPositionPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--match-expanded-top-position').replace('px', ''));
        const expandedPositionMobilePx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--match-expanded-top-position-mobile').replace('px', ''));
        const expandedPositionMobileSmPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--match-expanded-top-position-mobile-sm').replace('px', ''));

        let currentExpandedPosition = expandedPositionPx;
        if (window.innerWidth <= 480) {
            currentExpandedPosition = expandedPositionMobilePx;
        }
        if (window.innerWidth <= 360) {
            currentExpandedPosition = expandedPositionMobileSmPx;
        }

        // Порог для определения, должно ли быть раскрыто или свернуто
        const threshold = currentExpandedPosition + (cardHeight * 0.9 - currentExpandedPosition) / 2;

        if (currentTransformY < threshold) {
            this.elements.matchScrollableContent.classList.add('expanded');
            this.isExpanded = true;
            this.elements.matchFixedInfo.style.opacity = '0';
            this.elements.matchCardActions.style.opacity = '0';
            this.elements.matchCardActions.style.pointerEvents = 'none';
            this.elements.closeMatchInfoBtn.style.opacity = '1';
            this.elements.closeMatchInfoBtn.style.visibility = 'visible';
            // Обновляем иконку кнопки "Подробнее"
            if (this.elements.toggleMatchInfoBtn) {
                this.elements.toggleMatchInfoBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 15 12 9 18 15"></polyline>
                    </svg>
                `;
                this.elements.toggleMatchInfoBtn.querySelector('svg').style.animation = 'rotateArrowDown 0.3s forwards';
            }
        } else {
            this.elements.matchScrollableContent.classList.remove('expanded');
            this.isExpanded = false;
            this.elements.matchFixedInfo.style.opacity = '1';
            this.elements.matchCardActions.style.opacity = '1';
            this.elements.matchCardActions.style.pointerEvents = 'auto';
            this.elements.closeMatchInfoBtn.style.opacity = '0';
            this.elements.closeMatchInfoBtn.style.visibility = 'hidden';
            // Обновляем иконку кнопки "Подробнее"
            if (this.elements.toggleMatchInfoBtn) {
                this.elements.toggleMatchInfoBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                `;
                this.elements.toggleMatchInfoBtn.querySelector('svg').style.animation = 'rotateArrowUp 0.3s forwards';
            }
        }
        // Сброс трансформации, чтобы класс expanded мог управлять
        this.elements.matchScrollableContent.style.transform = ''; 
    }
}

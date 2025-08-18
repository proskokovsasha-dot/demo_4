class MatchHandler {
    constructor(app) {
        this.app = app;
        this.currentIndex = 0;
        this.lastMatchedProfile = null;
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
            matchZodiacSign: document.getElementById('matchZodiacSign'), // Добавлено
            matchLookingFor: document.getElementById('matchLookingFor'),
            matchInterests: document.getElementById('matchInterests'),
            // matchPhotosGrid: document.getElementById('matchPhotosGrid'), // Удалено
            matchLastActive: document.getElementById('matchLastActive'),
            matchDistance: document.getElementById('matchDistance'),
            noProfilesMessage: document.getElementById('noProfilesMessage'),
            matchFixedInfo: document.getElementById('matchFixedInfo'),
            nopeBtn: document.getElementById('nopeBtn'),
            likeBtn: document.getElementById('likeBtn'),
            superLikeBtn: document.getElementById('superLikeBtn'),
            matchCardActions: document.querySelector('.match-card-actions'),
            matchActiveDot: document.querySelector('.match-active-dot'),
        };
    }

    setupEventListeners() {
        if (this.nopeBtnHandler) {
            this.elements.nopeBtn.removeEventListener('click', this.nopeBtnHandler);
            this.elements.likeBtn.removeEventListener('click', this.likeBtnHandler);
            if (this.elements.superLikeBtn) {
                this.elements.superLikeBtn.removeEventListener('click', this.superLikeBtnHandler);
            }
        }

        this.nopeBtnHandler = () => this.handleSwipe('nope');
        this.elements.nopeBtn.addEventListener('click', this.nopeBtnHandler);
        
        this.likeBtnHandler = () => this.handleSwipe('like');
        this.elements.likeBtn.addEventListener('click', this.likeBtnHandler);

        if (this.elements.superLikeBtn) {
            this.superLikeBtnHandler = () => this.handleSwipe('superlike');
            this.elements.superLikeBtn.addEventListener('click', this.superLikeBtnHandler);
        }

        this.addSwipeGestureRecognition();

        // НОВЫЙ ОБРАБОТЧИК: Открытие модального окна при клике на карточку анкеты
        if (this.matchCardClickHandler) {
            this.elements.matchCard.removeEventListener('click', this.matchCardClickHandler);
        }
        this.matchCardClickHandler = (e) => {
            // Проверяем, что клик не был по кнопкам действий
            if (!e.target.closest('.action-btn')) {
                const currentProfile = this.app.state.suggestedProfiles[this.currentIndex];
                if (currentProfile) {
                    this.app.showMatchFullModal(currentProfile);
                }
            }
        };
        this.elements.matchCard.addEventListener('click', this.matchCardClickHandler);
    }

    addSwipeGestureRecognition() {
        let startX, startY, endX, endY;
        const card = this.elements.matchCard;

        card.addEventListener('touchstart', (e) => {
            // Игнорируем свайп, если начат на кнопках действий
            if (e.target.closest('.action-btn')) {
                return;
            }
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            card.style.transition = 'none';
        });

        card.addEventListener('touchmove', (e) => {
            // Игнорируем свайп, если начат на кнопках действий
            if (e.target.closest('.action-btn')) {
                return;
            }
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;

            card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX / 20}deg)`;
            card.style.opacity = 1 - Math.abs(deltaX / card.offsetWidth * 1.5) - Math.abs(deltaY / card.offsetHeight * 1.5);
        });

        card.addEventListener('touchend', (e) => {
            // Игнорируем свайп, если начат на кнопках действий
            if (e.target.closest('.action-btn')) {
                return;
            }
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const thresholdX = card.offsetWidth / 4;
            const thresholdY = card.offsetHeight / 4;

            card.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';

            if (Math.abs(deltaX) > thresholdX && Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    this.handleSwipe('like');
                } else {
                    this.handleSwipe('nope');
                }
            } else if (Math.abs(deltaY) > thresholdY && Math.abs(deltaY) > Math.abs(deltaX)) {
                if (deltaY < 0) {
                    this.handleSwipe('superlike');
                } else {
                    card.style.transform = 'translate(0, 0) rotate(0deg)';
                    card.style.opacity = '1';
                }
            } else {
                card.style.transform = 'translate(0, 0) rotate(0deg)';
                card.style.opacity = '1';
            }
        });
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

        for (let i = 0; i < count; i++) {
            const randomGender = Math.random() > 0.5 ? 'male' : 'female';
            const randomName = randomGender === 'male' 
                ? namesMale[Math.floor(Math.random() * namesMale.length)]
                : namesFemale[Math.floor(Math.random() * namesFemale.length)];
            
            const randomAge = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
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

            // const photos = [`https://picsum.photos/seed/${randomName}${randomAge}${randomGender}/400/600`]; // Удалено

            // Generate random DOB for zodiac sign
            const randomMonth = Math.floor(Math.random() * 12) + 1;
            const randomDay = Math.floor(Math.random() * 28) + 1; // Simplified for random generation
            const randomZodiacSign = this.app.getZodiacSign(randomDay, randomMonth);

            profiles.push({
                id: `profile_${i}`,
                name: randomName,
                age: randomAge,
                gender: randomGender,
                city: randomCity,
                description: randomDescription,
                profileColor: randomColor,
                // avatar: photos[0], // Удалено
                // photos: photos, // Удалено
                lookingFor: randomLookingFor,
                interests: randomInterests,
                zodiacSign: randomZodiacSign, // Добавлено
                location: { lat: 55.7558 + (Math.random() - 0.5) * 0.1, lng: 37.6173 + (Math.random() - 0.5) * 0.1 },
                lastActive: this.getRandomLastActiveStatus()
            });
        }
        return profiles;
    }

    getRandomLastActiveStatus() {
        const statuses = [
            this.app.translate('lastActiveToday'),
            this.app.translate('lastActiveYesterday'),
            this.app.translate('lastActiveThisWeek'),
            this.app.translate('lastActiveRecently')
        ];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    startMatch() {
        const allGeneratedProfiles = this.generateRandomProfiles(30);
        const userPreference = this.app.state.userData.preference;

        this.app.state.suggestedProfiles = allGeneratedProfiles.filter(profile => {
            if (userPreference === 'male' && profile.gender !== 'male') return false;
            if (userPreference === 'female' && profile.gender !== 'female') return false;
            return true;
        });

        this.app.state.suggestedProfiles = this.app.state.suggestedProfiles.filter(profile => profile.id !== this.app.state.userData.id);

        this.app.state.suggestedProfiles.sort(() => Math.random() - 0.5);

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
        this.elements.matchCard.classList.add('appear');
        this.elements.matchCard.addEventListener('animationend', () => {
            this.elements.matchCard.classList.remove('appear');
        }, { once: true });
    }

    renderProfile(profile) {
        // Так как фото удалены, используем заглушку или дефолтный фон
        this.elements.matchCardBg.style.backgroundImage = `url(https://picsum.photos/seed/${profile.id}/400/600)`;
        
        let nameAgeText = profile.name || this.app.translate('anonymous');
        if (profile.age) {
            nameAgeText += `, ${profile.age}`;
        }
        this.elements.matchNameAge.textContent = nameAgeText;
        
        const fullDescription = profile.description || this.app.translate('noDescription');
        this.elements.matchDescriptionShort.textContent = fullDescription.split('.')[0] + (fullDescription.includes('.') ? '.' : '');
        if (this.elements.matchDescriptionShort.textContent.length > 100) {
            this.elements.matchDescriptionShort.textContent = this.elements.matchDescriptionShort.textContent.substring(0, 97) + '...';
        }
        
        this.elements.matchDescriptionFull.textContent = fullDescription;

        this.elements.matchLastActive.textContent = profile.lastActive;
        if (profile.lastActive === this.app.translate('lastActiveToday')) {
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
            this.elements.matchDistance.textContent = distance ? `${distance} ${this.app.translate('km')}` : '';
        } else {
            this.elements.matchDistance.textContent = '';
        }
        
        this.updateZodiacSign(profile.zodiacSign); // Добавлено
        this.updateLookingFor(profile.lookingFor, this.app.config.lookingForOptions, this.elements.matchLookingFor);
        this.updateInterests(profile.interests, this.app.config.interests, this.elements.matchInterests);
        // this.updatePhotos(profile.photos, this.elements.matchPhotosGrid); // Удалено

        this.elements.matchCard.style.transform = 'translateX(0) rotate(0)';
        this.elements.matchCard.style.opacity = '1';
    }

    updateZodiacSign(zodiacSign) {
        const container = this.elements.matchZodiacSign;
        if (!container) return;

        if (zodiacSign) {
            container.innerHTML = `
                <div class="zodiac-display">
                    <span class="emoji">${zodiacSign.emoji}</span>
                    ${this.app.translate(zodiacSign.id)}
                </div>
            `;
        } else {
            container.innerHTML = `<div class="no-data">${this.app.translate('noData')}</div>`;
        }
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
                        <span class="text">${this.app.translate(option.id)}</span>
                    `;
                    lookingForContainer.appendChild(el);
                }
            });
            container.appendChild(lookingForContainer);
        } else {
            container.innerHTML = `<div class="no-data">${this.app.translate('noLookingFor')}</div>`;
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
                        <span class="text">${this.app.translate(interest.id)}</span>
                    `;
                    interestsContainer.appendChild(el);
                }
            });
            container.appendChild(interestsContainer);
        } else {
            container.innerHTML = `<div class="no-data">${this.app.translate('noInterests')}</div>`;
        }
    }

    // updatePhotos(photos, container) { // Удалено
    //     if (!container) return;
    //     container.innerHTML = '';
    //     if (photos && photos.length > 0) {
    //         photos.forEach(photo => {
    //             const el = document.createElement('div');
    //             el.className = 'match-photo-item';
    //             el.style.backgroundImage = `url(${photo})`;
    //             container.appendChild(el);
    //         });
    //     } else {
    //         container.innerHTML = `<div class="no-data">${this.app.translate('noPhotos')}</div>`;
    //     }
    // }

    handleSwipe(action) {
        const profile = this.app.state.suggestedProfiles[this.currentIndex];
        const card = this.elements.matchCard;

        card.classList.remove('animate-like', 'animate-nope', 'animate-superlike');
        void card.offsetWidth;
        
        if (action === 'like') {
            console.log('Liked:', profile.name);
            this.app.chatHandler.addChat(profile);
            this.lastMatchedProfile = profile;
            if (Math.random() > 0.5) {
                this.app.showMatchSuccessModal(profile, 'match');
            } else {
                this.app.showMatchSuccessModal(profile, 'like');
            }
            card.classList.add('animate-like');
        } else if (action === 'nope') {
            console.log('Passed:', profile.name);
            card.classList.add('animate-nope');
            card.addEventListener('animationend', () => {
                card.classList.remove('animate-like', 'animate-nope', 'animate-superlike');
                this.currentIndex++;
                this.showNextProfile();
            }, { once: true });
            return;
        } else if (action === 'superlike') {
            console.log('Superliked:', profile.name);
            this.app.chatHandler.addChat(profile);
            this.lastMatchedProfile = profile;
            this.app.showMatchSuccessModal(profile, 'superlike');
            card.classList.add('animate-superlike');
        }

        card.addEventListener('animationend', () => {
            card.classList.remove('animate-like', 'animate-nope', 'animate-superlike');
            if (!this.app.elements.matchSuccessModal.classList.contains('active')) {
                this.currentIndex++;
                this.showNextProfile();
            }
        }, { once: true });
    }
}

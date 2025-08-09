class ProfileHandler {
    constructor(app) {
        this.app = app;
        this.initElements();
    }

    initElements() {
        this.elements = {
            profileCard: document.getElementById('myProfileCard'),
            profileCardBg: document.getElementById('myProfileCardBg'),
            profileNameAge: document.getElementById('myProfileNameAge'),
            profileDescriptionShort: document.getElementById('myProfileDescriptionShort'),
            profileScrollableContent: document.getElementById('myProfileScrollableContent'),
            profileDescriptionFull: document.getElementById('myProfileDescriptionFull'),
            profileLookingFor: document.getElementById('myProfileLookingFor'),
            profileInterests: document.getElementById('myProfileInterests'),
            profilePhotosGrid: document.getElementById('myProfilePhotosGrid'),
            editBtn: document.getElementById('editBtn'),
            newProfileBtn: document.getElementById('newProfileBtn'),
            profileFixedInfo: document.getElementById('myProfileFixedInfo'),
        };
    }

    showProfile() {
        const { userData } = this.app.state;
        
        this.updateProfileCardBackground(userData.avatar);
        this.updateProfileInfo(userData);
        this.updateLookingFor(userData.lookingFor, this.app.config.lookingForOptions);
        this.updateInterests(userData.interests, this.app.config.interests);
        this.updatePhotos(userData.photos);
        this.bindEvents();
        this.updateProfileTexts(); // Update texts after rendering
    }

    updateProfileCardBackground(avatar) {
        if (avatar) {
            this.elements.profileCardBg.style.backgroundImage = `url(${avatar})`;
        } else {
            this.elements.profileCardBg.style.backgroundImage = 'none';
            this.elements.profileCardBg.style.backgroundColor = 'var(--primary-dark)';
        }
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
        
        this.elements.profileDescriptionFull.textContent = fullDescription;
    }

    updateLookingFor(lookingFor, options) {
        const container = this.elements.profileLookingFor;
        if (!container) return;

        container.innerHTML = '';
        
        if (lookingFor && lookingFor.length > 0) {
            const lookingForContainer = document.createElement('div');
            lookingForContainer.className = 'profile-looking-for-container';
            
            lookingFor.forEach(optionId => {
                const option = options.find(o => o.id === optionId);
                if (option) {
                    const el = document.createElement('div');
                    el.className = 'looking-for-item';
                    el.innerHTML = `
                        <span class="looking-for-emoji">${option.emoji}</span>
                        <span class="looking-for-text">${this.app.translate(option.id)}</span>
                    `;
                    lookingForContainer.appendChild(el);
                }
            });
            
            container.appendChild(lookingForContainer);
        } else {
            container.innerHTML = `<div class="no-data">${this.app.translate('noLookingFor')}</div>`;
        }
    }

    updateInterests(userInterests, configInterests) {
        const container = this.elements.profileInterests;
        if (!container) return;

        container.innerHTML = '';
        
        if (userInterests && userInterests.length > 0) {
            const interestsContainer = document.createElement('div');
            interestsContainer.className = 'profile-interests-container';
            
            userInterests.forEach(interestId => {
                const interest = configInterests.find(i => i.id === interestId);
                if (interest) {
                    const el = document.createElement('div');
                    el.className = 'interest-item';
                    el.innerHTML = `
                        <span class="interest-emoji">${interest.emoji}</span>
                        <span class="interest-text">${this.app.translate(interest.id)}</span>
                    `;
                    interestsContainer.appendChild(el);
                }
            });
            
            container.appendChild(interestsContainer);
        } else {
            container.innerHTML = `<div class="no-data">${this.app.translate('noInterests')}</div>`;
        }
    }

    updatePhotos(photos) {
        const photosContainer = this.elements.profilePhotosGrid;
        if (!photosContainer) return;

        if (photos && photos.length > 0) {
            photosContainer.innerHTML = photos.map(photo => `
                <div class="profile-photo-item" style="background-image: url(${photo})"></div>
            `).join('');
        } else {
            photosContainer.innerHTML = `<div class="no-data">${this.app.translate('noPhotos')}</div>`;
        }
    }

    bindEvents() {
        this.elements.editBtn.removeEventListener('click', this.editProfileHandler);
        this.elements.newProfileBtn.removeEventListener('click', this.newProfileHandler);

        this.editProfileHandler = () => this.app.switchScreen('registration');
        this.elements.editBtn.addEventListener('click', this.editProfileHandler);

        this.newProfileHandler = () => {
            if (confirm(this.app.translate('confirmClearData'))) {
                this.resetProfile();
            }
        };
        this.elements.newProfileBtn.addEventListener('click', this.newProfileHandler);
    }

    resetProfile() {
        this.app.state.userData = {
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
        
        localStorage.removeItem('datingProfile');
        this.app.switchScreen('registration');
    }

    updateProfileTexts() {
        document.querySelector('#myProfileScrollableContent .profile-section:nth-child(1) .section-title').textContent = this.app.translate('aboutYou');
        document.querySelector('#myProfileScrollableContent .profile-section:nth-child(2) .section-title').textContent = this.app.translate('whatAreYouLookingFor');
        document.querySelector('#myProfileScrollableContent .profile-section:nth-child(3) .section-title').textContent = this.app.translate('yourInterests');
        document.querySelector('#myProfileScrollableContent .profile-section:nth-child(4) .section-title').textContent = this.app.translate('yourPhotos');
        document.getElementById('editBtn').innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h 14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>${this.app.translate('edit')}`;
        document.getElementById('newProfileBtn').innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>${this.app.translate('newProfile')}`;
    }
}

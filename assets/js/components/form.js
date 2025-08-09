class FormHandler {
    constructor(app) {
        this.app = app;
    }
    
    renderForm() {
        this.app.elements.registrationForm.innerHTML = `
            <div class="form-container">
                ${this.getAllFieldsContent()}
                <div class="navigation">
                    <button class="btn" id="saveProfileBtn">${this.app.translate('saveProfile')}</button>
                </div>
            </div>
        `;
        this.setupFormHandlers();
        this.updateFormTexts(); // Update texts after rendering
    }

    getAllFieldsContent() {
        const t = (key, replacements) => this.app.translate(key, replacements);

        return `
            <h2 class="section-title">${t('registrationTitle')}</h2>
            <p class="section-description">${t('registrationDescription')}</p>
            
            <input type="text" class="input-field" id="userName" 
                   placeholder="${t('yourName')}" 
                   value="${this.app.state.userData.name || ''}" required>

            <div class="tags-container">
                <div class="tag ${this.app.state.userData.gender === 'male' ? 'selected' : ''}" 
                     data-gender="male">
                    👨 ${t('male')}
                </div>
                <div class="tag ${this.app.state.userData.gender === 'female' ? 'selected' : ''}" 
                     data-gender="female">
                    👩 ${t('female')}
                </div>
            </div>

            <input type="number" class="input-field" id="userAge" 
                   placeholder="${t('yourAge')}" 
                   value="${this.app.state.userData.age || ''}" 
                   min="${this.app.config.minAge}" max="${this.app.config.maxAge}" required>

            <input type="text" class="input-field" id="userCity" 
                   placeholder="${t('yourCity')}" 
                   value="${this.app.state.userData.city || ''}" required>

            <h3 class="section-title">${t('whatAreYouLookingFor')}</h3>
            <div class="tags-container">
                ${this.app.config.lookingForOptions.map(option => `
                    <div class="tag ${(this.app.state.userData.lookingFor || []).includes(option.id) ? 'selected' : ''}" 
                         data-looking-for="${option.id}">
                        ${option.emoji} ${t(option.id)}
                    </div>
                `).join('')}
            </div>

            <h3 class="section-title">${t('yourInterests')}</h3>
            <div class="tags-container" id="interestsContainer">
                ${this.app.config.interests.map(interest => `
                    <div class="tag ${this.app.state.userData.interests.includes(interest.id) ? 'selected' : ''}" 
                         data-interest="${interest.id}">
                        ${interest.emoji} ${t(interest.id)}
                    </div>
                `).join('')}
            </div>

            <h3 class="section-title">${t('whoAreYouLookingFor')}</h3>
            <div class="tags-container">
                ${this.app.config.preferenceOptions.map(option => `
                    <div class="tag ${this.app.state.userData.preference === option.id ? 'selected' : ''}" 
                         data-preference="${option.id}">
                        ${option.emoji} ${t(option.id)}
                    </div>
                `).join('')}
            </div>

            <h3 class="section-title">${t('profileColor')}</h3>
            <div class="color-palette">
                ${this.app.config.colors.map(color => `
                    <div class="color-option ${this.app.state.userData.profileColor === color ? 'selected' : ''}" 
                         style="background-color: ${color}" 
                         data-color="${color}"></div>
                `).join('')}
            </div>
            <div class="color-custom">
                <input type="color" id="customColor" value="${this.app.state.userData.profileColor}">
                <label>${t('orChooseYourColor')}</label>
            </div>

            <h3 class="section-title">${t('yourPhotos')}</h3>
            <p class="section-description">${t('addPhotoDescription')}</p>
            <div class="avatar-upload">
                <label class="btn btn-secondary">
                    ${t('addPhoto')}
                    <input type="file" id="photoUpload" accept="image/*" hidden>
                </label>
            </div>
            <div class="photos-grid" id="photosContainer">
                ${this.app.state.userData.photos.map((photo, index) => `
                    <div class="photo-preview ${this.app.state.userData.avatar === photo ? 'main-avatar' : ''}" 
                         style="background-image: url(${photo})">
                        <button class="delete-photo" data-index="${index}">×</button>
                    </div>
                `).join('')}
            </div>

            <h3 class="section-title">${t('aboutYou')}</h3>
            <textarea class="input-field" id="userDescription" 
                      placeholder="${t('aboutYouPlaceholder')}" rows="4">${this.app.state.userData.description || ''}</textarea>
        `;
    }

    setupFormHandlers() {
        document.getElementById('saveProfileBtn').addEventListener('click', () => this.saveProfile());
        this.setupGenderHandlers();
        this.setupLookingForHandlers();
        this.setupInterestsHandlers();
        this.setupPreferenceHandlers();
        this.setupColorHandlers();
        this.setupPhotoHandlers();
    }

    setupGenderHandlers() {
        document.querySelectorAll('[data-gender]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                document.querySelectorAll('[data-gender]').forEach(t => t.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                this.app.state.userData.gender = e.currentTarget.dataset.gender;
            });
        });
    }

    setupLookingForHandlers() {
        document.querySelectorAll('[data-looking-for]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const option = e.currentTarget.dataset.lookingFor;
                const isSelected = e.currentTarget.classList.contains('selected');
                
                if (isSelected) {
                    e.currentTarget.classList.remove('selected');
                    this.app.state.userData.lookingFor = this.app.state.userData.lookingFor.filter(i => i !== option);
                } else {
                    e.currentTarget.classList.add('selected');
                    this.app.state.userData.lookingFor.push(option);
                }
            });
        });
    }

    setupInterestsHandlers() {
        document.querySelectorAll('[data-interest]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const interestId = e.currentTarget.dataset.interest;
                const isSelected = e.currentTarget.classList.contains('selected');
                
                if (isSelected) {
                    e.currentTarget.classList.remove('selected');
                    this.app.state.userData.interests = this.app.state.userData.interests.filter(i => i !== interestId);
                } else {
                    if (this.app.state.userData.interests.length < this.app.config.maxInterests) {
                        e.currentTarget.classList.add('selected');
                        this.app.state.userData.interests.push(interestId);
                    } else {
                        alert(this.app.translate('maxInterestsAlert', { maxInterests: this.app.config.maxInterests }));
                    }
                }
            });
        });
    }

    setupPreferenceHandlers() {
        document.querySelectorAll('[data-preference]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                document.querySelectorAll('[data-preference]').forEach(t => t.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                this.app.state.userData.preference = e.currentTarget.dataset.preference;
            });
        });
    }

    setupColorHandlers() {
        document.querySelectorAll('[data-color]').forEach(color => {
            color.addEventListener('click', (e) => {
                const selectedColor = e.currentTarget.dataset.color;
                this.app.state.userData.profileColor = selectedColor;
                this.updateColorPalette(selectedColor);
                document.getElementById('customColor').value = selectedColor;
            });
        });

        const customColor = document.getElementById('customColor');
        if (customColor) {
            customColor.addEventListener('input', (e) => {
                const selectedColor = e.target.value;
                this.app.state.userData.profileColor = selectedColor;
                this.updateColorPalette(selectedColor);
            });
        }
        this.updateColorPalette(this.app.state.userData.profileColor);
    }

    updateColorPalette(color) {
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.color === color) {
                option.classList.add('selected');
            }
        });
    }

    setupPhotoHandlers() {
        const upload = document.getElementById('photoUpload');
        if (upload) {
            upload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && file.type.match('image.*')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.app.state.userData.photos = [e.target.result]; // Только одно фото
                        this.app.state.userData.avatar = e.target.result;
                        this.renderPhotos();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        const photosContainer = document.getElementById('photosContainer');
        if (photosContainer) {
            photosContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-photo')) {
                    this.app.state.userData.photos = [];
                    this.app.state.userData.avatar = null;
                    this.renderPhotos();
                }
            });
        }
        this.renderPhotos();
    }

    renderPhotos() {
        const container = document.getElementById('photosContainer');
        if (container) {
            container.innerHTML = this.app.state.userData.photos.map((photo, index) => `
                <div class="photo-preview ${this.app.state.userData.avatar === photo ? 'main-avatar' : ''}" 
                     style="background-image: url(${photo})">
                    <button class="delete-photo" data-index="${index}">×</button>
                </div>
            `).join('');
        }
    }

    saveProfile() {
        this.app.state.userData.name = document.getElementById('userName').value.trim();
        this.app.state.userData.age = document.getElementById('userAge').value.trim();
        this.app.state.userData.city = document.getElementById('userCity').value.trim();
        this.app.state.userData.description = document.getElementById('userDescription').value.trim();
        
        if (!this.app.state.userData.name || !this.app.state.userData.gender || !this.app.state.userData.age ||
            !this.app.state.userData.city || this.app.state.userData.lookingFor.length === 0 ||
            this.app.state.userData.interests.length === 0 || !this.app.state.userData.preference ||
            !this.app.state.userData.avatar || !this.app.state.userData.description) {
            alert(this.app.translate('fillAllFieldsAlert'));
            return;
        }

        localStorage.setItem('datingProfile', JSON.stringify(this.app.state.userData));
        this.app.switchScreen('profile');
    }

    updateFormTexts() {
        const t = (key, replacements) => this.app.translate(key, replacements);

        document.querySelector('#registrationForm .section-title').textContent = t('registrationTitle');
        document.querySelector('#registrationForm .section-description').textContent = t('registrationDescription');
        document.getElementById('userName').placeholder = t('yourName');
        document.querySelector('[data-gender="male"]').innerHTML = `👨 ${t('male')}`;
        document.querySelector('[data-gender="female"]').innerHTML = `👩 ${t('female')}`;
        document.getElementById('userAge').placeholder = t('yourAge');
        document.getElementById('userCity').placeholder = t('yourCity');
        document.querySelector('h3:nth-of-type(1)').textContent = t('whatAreYouLookingFor'); // "Что вы ищете?"
        document.querySelector('h3:nth-of-type(2)').textContent = t('yourInterests'); // "Ваши интересы"
        document.querySelector('h3:nth-of-type(3)').textContent = t('whoAreYouLookingFor'); // "Кого вы ищете?"
        document.querySelector('h3:nth-of-type(4)').textContent = t('profileColor'); // "Цвет профиля"
        document.querySelector('.color-custom label').textContent = t('orChooseYourColor');
        document.querySelector('h3:nth-of-type(5)').textContent = t('yourPhotos'); // "Ваши фото"
        document.querySelector('.avatar-upload .section-description').textContent = t('addPhotoDescription');
        document.querySelector('.avatar-upload .btn-secondary').innerHTML = `📸 ${t('addPhoto')}`;
        document.querySelector('h3:nth-of-type(6)').textContent = t('aboutYou'); // "О себе"
        document.getElementById('userDescription').placeholder = t('aboutYouPlaceholder');
        document.getElementById('saveProfileBtn').textContent = t('saveProfile');

        // Update dynamic tags
        document.querySelectorAll('[data-looking-for]').forEach(tag => {
            const optionId = tag.dataset.lookingFor;
            const option = this.app.config.lookingForOptions.find(o => o.id === optionId);
            if (option) {
                tag.innerHTML = `${option.emoji} ${t(option.id)}`;
            }
        });

        document.querySelectorAll('[data-interest]').forEach(tag => {
            const interestId = tag.dataset.interest;
            const interest = this.app.config.interests.find(i => i.id === interestId);
            if (interest) {
                tag.innerHTML = `${interest.emoji} ${t(interest.id)}`;
            }
        });

        document.querySelectorAll('[data-preference]').forEach(tag => {
            const preferenceId = tag.dataset.preference;
            const preference = this.app.config.preferenceOptions.find(p => p.id === preferenceId);
            if (preference) {
                tag.innerHTML = `${preference.emoji} ${t(preference.id)}`;
            }
        });
    }
}

class FormHandler {
    constructor(app) {
        this.app = app;
    }
    
    renderForm() {
        this.app.elements.registrationForm.innerHTML = `
            <div class="form-container">
                ${this.getAllFieldsContent()}
                <div class="navigation">
                    <button class="btn" id="saveProfileBtn">Сохранить профиль</button>
                </div>
            </div>
        `;
        this.setupFormHandlers();
    }

    getAllFieldsContent() {
        return `
            <h2 class="section-title">Расскажите о себе</h2>
            <p class="section-description">Заполните информацию, чтобы создать свой профиль.</p>
            
            <input type="text" class="input-field" id="userName" 
                   placeholder="Ваше имя" 
                   value="${this.app.state.userData.name || ''}" required>

            <div class="tags-container">
                <div class="tag ${this.app.state.userData.gender === 'male' ? 'selected' : ''}" 
                     data-gender="male">
                    👨 Мужчина
                </div>
                <div class="tag ${this.app.state.userData.gender === 'female' ? 'selected' : ''}" 
                     data-gender="female">
                    👩 Женщина
                </div>
            </div>

            <input type="number" class="input-field" id="userAge" 
                   placeholder="Ваш возраст" 
                   value="${this.app.state.userData.age || ''}" 
                   min="${this.app.config.minAge}" max="${this.app.config.maxAge}" required>

            <input type="text" class="input-field" id="userCity" 
                   placeholder="Где вы живете?" 
                   value="${this.app.state.userData.city || ''}" required>

            <h3 class="section-title">Что вы ищете?</h3>
            <div class="tags-container">
                ${this.app.config.lookingForOptions.map(option => `
                    <div class="tag ${(this.app.state.userData.lookingFor || []).includes(option.id) ? 'selected' : ''}" 
                         data-looking-for="${option.id}">
                        ${option.emoji} ${option.name}
                    </div>
                `).join('')}
            </div>

            <h3 class="section-title">Ваши интересы</h3>
            <div class="tags-container" id="interestsContainer">
                ${this.app.config.interests.map(interest => `
                    <div class="tag ${this.app.state.userData.interests.includes(interest.id) ? 'selected' : ''}" 
                         data-interest="${interest.id}">
                        ${interest.emoji} ${interest.name}
                    </div>
                `).join('')}
            </div>

            <h3 class="section-title">Кого вы ищете?</h3>
            <div class="tags-container">
                ${this.app.config.preferenceOptions.map(option => `
                    <div class="tag ${this.app.state.userData.preference === option.id ? 'selected' : ''}" 
                         data-preference="${option.id}">
                        ${option.emoji} ${option.name}
                    </div>
                `).join('')}
            </div>

            <h3 class="section-title">Цвет профиля</h3>
            <div class="color-palette">
                ${this.app.config.colors.map(color => `
                    <div class="color-option ${this.app.state.userData.profileColor === color ? 'selected' : ''}" 
                         style="background-color: ${color}" 
                         data-color="${color}"></div>
                `).join('')}
            </div>
            <div class="color-custom">
                <input type="color" id="customColor" value="${this.app.state.userData.profileColor}">
                <label>Или выберите свой цвет</label>
            </div>

            <h3 class="section-title">Ваши фото</h3>
            <p class="section-description">Добавьте фото для профиля.</p>
            <div class="avatar-upload">
                <label class="btn btn-secondary">
                    📸 Добавить фото
                    <input type="file" id="photoUpload" accept="image/*" hidden>
                </label>
            </div>
            <div class="photos-grid" id="photosContainer">
                ${this.app.state.userData.photos.map((photo, index) => `
                    <div class="photo-preview ${this.app.state.userData.avatar === photo ? 'main-avatar' : ''}" 
                         style="background-image: url(${photo})">
                        <button class="set-avatar-btn" data-index="${index}">Аватар</button>
                        <button class="delete-photo" data-index="${index}">×</button>
                    </div>
                `).join('')}
            </div>

            <h3 class="section-title">О себе</h3>
            <textarea class="input-field" id="userDescription" 
                      placeholder="Я люблю путешествия, книги и..." rows="4">${this.app.state.userData.description || ''}</textarea>
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
                        alert(`Вы можете выбрать не более ${this.app.config.maxInterests} интересов.`);
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
            alert('Пожалуйста, заполните все обязательные поля и добавьте фото.');
            return;
        }

        localStorage.setItem('datingProfile', JSON.stringify(this.app.state.userData));
        this.app.switchScreen('profile');
    }
}

    // assets/js/components/form.js

    class FormHandler {
        constructor(app) {
            this.app = app;
            this.currentStep = 0;
            this.formSteps = [
                'step1_name', // Шаг для имени
                'step2_gender', // Шаг для пола
                'step3_city', // Шаг для города
                'step4_dob', // Шаг для даты рождения
                'step5_lookingFor',
                'step6_interests',
                'step7_preference',
                'step8_profileColor',
                'step9_photos',
                'step10_aboutYou',
                'step11_save'
            ];
        }

        renderForm() {
            const t = (key, replacements) => this.app.translate(key, replacements);

            this.app.elements.registrationForm.innerHTML = `
                <div class="form-step-container">
                    <!-- Step 1: Name -->
                    <div class="form-step" id="step1_name">
                        <h2 class="section-title">${t('registrationTitle')}</h2>
                        <p class="section-description">${t('registrationDescription')}</p>
                        <input type="text" class="input-field" id="userName"
                               placeholder="${t('yourName')}"
                               value="${this.app.state.userData.name || ''}" required>
                        <div class="form-navigation">
                            <button class="btn" id="nextStep1">${t('next')}</button>
                        </div>
                    </div>

                    <!-- Step 2: Gender -->
                    <div class="form-step" id="step2_gender">
                        <h2 class="section-title">${t('registrationTitle')}</h2>
                        <p class="section-description">${t('registrationDescription')}</p>
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
                        <div class="form-navigation">
                            <button class="btn" id="nextStep2">${t('next')}</button>
                            <button class="btn btn-secondary btn-prev" id="prevStep2">${t('back')}</button>
                        </div>
                    </div>

                    <!-- Step 3: City -->
                    <div class="form-step" id="step3_city">
                        <h2 class="section-title">${t('registrationTitle')}</h2>
                        <p class="section-description">${t('registrationDescription')}</p>
                        <input type="text" class="input-field" id="userCity"
                               placeholder="${t('yourCity')}"
                               value="${this.app.state.userData.city || ''}" required>
                        <div class="form-navigation">
                            <button class="btn" id="nextStep3">${t('next')}</button>
                            <button class="btn btn-secondary btn-prev" id="prevStep3">${t('back')}</button>
                        </div>
                    </div>

                    <!-- Step 4: Date of Birth -->
                    <div class="form-step" id="step4_dob">
                        <h2 class="section-title">${t('yourDob')}</h2>
                        <p class="section-description">${t('registrationDescription')}</p>
                        <div class="date-input-group">
                            <input type="number" class="input-field" id="dobDay" placeholder="${t('day')}"
                                   value="${this.app.state.userData.dob.day || ''}" min="1" max="31" required>
                            <input type="number" class="input-field" id="dobMonth" placeholder="${t('month')}"
                                   value="${this.app.state.userData.dob.month || ''}" min="1" max="12" required>
                            <input type="number" class="input-field" id="dobYear" placeholder="${t('year')}"
                                   value="${this.app.state.userData.dob.year || ''}" min="1900" max="${new Date().getFullYear()}" required>
                        </div>
                        <div class="zodiac-display" id="zodiacDisplay" style="display:none;"></div>
                        <div class="form-navigation">
                            <button class="btn" id="nextStep4">${t('next')}</button>
                            <button class="btn btn-secondary btn-prev" id="prevStep4">${t('back')}</button>
                        </div>
                    </div>

                    <!-- Step 5: Looking For -->
                    <div class="form-step" id="step5_lookingFor">
                        <h2 class="section-title">${t('whatAreYouLookingFor')}</h2>
                        <p class="section-description">${t('registrationDescription')}</p>
                        <div class="tags-container">
                            ${this.app.config.lookingForOptions.map(option => `
                                <div class="tag ${(this.app.state.userData.lookingFor || []).includes(option.id) ? 'selected' : ''}"
                                     data-looking-for="${option.id}">
                                    ${option.emoji} ${t(option.id)}
                                </div>
                            `).join('')}
                        </div>
                        <div class="form-navigation">
                            <button class="btn" id="nextStep5">${t('next')}</button>
                            <button class="btn btn-secondary btn-prev" id="prevStep5">${t('back')}</button>
                        </div>
                    </div>

                    <!-- Step 6: Interests -->
                    <div class="form-step" id="step6_interests">
                        <h2 class="section-title">${t('yourInterests')}</h2>
                        <p class="section-description">${t('registrationDescription')}</p>
                        <div class="tags-container" id="interestsContainer">
                            ${this.app.config.interests.map(interest => `
                                <div class="tag ${this.app.state.userData.interests.includes(interest.id) ? 'selected' : ''}"
                                     data-interest="${interest.id}">
                                    ${interest.emoji} ${t(interest.id)}
                                </div>
                            `).join('')}
                        </div>
                        <div class="form-navigation">
                            <button class="btn" id="nextStep6">${t('next')}</button>
                            <button class="btn btn-secondary btn-prev" id="prevStep6">${t('back')}</button>
                        </div>
                    </div>

                    <!-- Step 7: Preference -->
                    <div class="form-step" id="step7_preference">
                        <h2 class="section-title">${t('whoAreYouLookingFor')}</h2>
                        <p class="section-description">${t('registrationDescription')}</p>
                        <div class="tags-container">
                            ${this.app.config.preferenceOptions.map(option => `
                                <div class="tag ${this.app.state.userData.preference === option.id ? 'selected' : ''}"
                                     data-preference="${option.id}">
                                    ${option.emoji} ${t(option.id)}
                                </div>
                            `).join('')}
                        </div>
                        <div class="form-navigation">
                            <button class="btn" id="nextStep7">${t('next')}</button>
                            <button class="btn btn-secondary btn-prev" id="prevStep7">${t('back')}</button>
                        </div>
                    </div>

                    <!-- Step 8: Profile Color -->
                    <div class="form-step" id="step8_profileColor">
                        <h2 class="section-title">${t('profileColor')}</h2>
                        <p class="section-description">${t('registrationDescription')}</p>
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
                        <div class="form-navigation">
                            <button class="btn" id="nextStep8">${t('next')}</button>
                            <button class="btn btn-secondary btn-prev" id="prevStep8">${t('back')}</button>
                        </div>
                    </div>

                    <!-- Step 9: Photos -->
                    <div class="form-step" id="step9_photos">
                        <h2 class="section-title">${t('yourPhotos')}</h2>
                        <p class="section-description">${t('addPhotoDescription')}</p>
                        <div class="avatar-upload">
                            <label class="btn btn-secondary">
                                ${t('addPhoto')}
                                <input type="file" id="photoUpload" accept="image/*" multiple hidden>
                            </label>
                        </div>
                        <div class="photos-grid" id="photosContainer">
                            <!-- Photos will be rendered here by renderPhotos() -->
                        </div>
                        <div class="form-navigation">
                            <button class="btn" id="nextStep9">${t('next')}</button>
                            <button class="btn btn-secondary btn-prev" id="prevStep9">${t('back')}</button>
                        </div>
                    </div>

                    <!-- Step 10: About You -->
                    <div class="form-step" id="step10_aboutYou">
                        <h2 class="section-title">${t('aboutYou')}</h2>
                        <p class="section-description">${t('registrationDescription')}</p>
                        <textarea class="input-field" id="userDescription"
                                  placeholder="${t('aboutYouPlaceholder')}" rows="4">${this.app.state.userData.description || ''}</textarea>
                        <div class="form-navigation">
                            <button class="btn" id="nextStep10">${t('next')}</button>
                            <button class="btn btn-secondary btn-prev" id="prevStep10">${t('back')}</button>
                        </div>
                    </div>

                    <!-- Step 11: Save -->
                    <div class="form-step" id="step11_save">
                        <h2 class="section-title">${t('saveProfile')}</h2>
                        <p class="section-description">${t('registrationDescription')}</p>
                        <button class="btn" id="saveProfileBtn">${t('saveProfile')}</button>
                        <div class="form-navigation">
                            <button class="btn btn-secondary btn-prev" id="prevStep11">${t('back')}</button>
                        </div>
                    </div>
                </div>
            `;
            this.setupFormHandlers();
            this.showStep(this.currentStep);
            this.updateFormTexts(); // Update texts after rendering
        }

        showStep(stepIndex) {
            document.querySelectorAll('.form-step').forEach((step, index) => {
                if (index === stepIndex) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            this.currentStep = stepIndex;
        }

        nextStep() {
            if (this.validateStep(this.currentStep)) {
                if (this.currentStep < this.formSteps.length - 1) {
                    this.currentStep++;
                    this.showStep(this.currentStep);
                    this.updateFormTexts(); // Update texts for new step
                } else {
                    this.saveProfile();
                }
            }
        }

        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep--;
                this.showStep(this.currentStep);
                this.updateFormTexts(); // Update texts for new step
            }
        }

        validateStep(stepIndex) {
            const t = (key, replacements) => this.app.translate(key, replacements);
            let isValid = true;

            switch (this.formSteps[stepIndex]) {
                case 'step1_name':
                    const userName = document.getElementById('userName').value.trim();
                    if (!userName) {
                        alert(t('fillAllFieldsAlert'));
                        isValid = false;
                    } else {
                        this.app.state.userData.name = userName;
                    }
                    break;
                case 'step2_gender':
                    const genderSelected = this.app.state.userData.gender;
                    if (!genderSelected) {
                        alert(t('fillAllFieldsAlert'));
                        isValid = false;
                    }
                    break;
                case 'step3_city':
                    const userCity = document.getElementById('userCity').value.trim();
                    if (!userCity) {
                        alert(t('fillAllFieldsAlert'));
                        isValid = false;
                    } else {
                        this.app.state.userData.city = userCity;
                    }
                    break;
                case 'step4_dob':
                    const dobDay = document.getElementById('dobDay').value.trim();
                    const dobMonth = document.getElementById('dobMonth').value.trim();
                    const dobYear = document.getElementById('dobYear').value.trim();

                    if (!dobDay || !dobMonth || !dobYear) {
                        alert(t('fillAllFieldsAlert'));
                        isValid = false;
                    } else {
                        const day = parseInt(dobDay);
                        const month = parseInt(dobMonth);
                        const year = parseInt(dobYear);

                        if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
                            alert(t('invalidDate')); // Добавьте этот перевод в app.js
                            isValid = false;
                        } else {
                            this.app.state.userData.dob = { day, month, year };
                            this.app.state.userData.zodiacSign = this.app.getZodiacSign(day, month);
                            // Calculate age from DOB
                            const today = new Date();
                            const birthDate = new Date(year, month - 1, day);
                            let age = today.getFullYear() - birthDate.getFullYear();
                            const m = today.getMonth() - birthDate.getMonth();
                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                            }
                            this.app.state.userData.age = age;
                        }
                    }
                    break;
                case 'step5_lookingFor':
                    if (this.app.state.userData.lookingFor.length === 0) {
                        alert(t('fillAllFieldsAlert'));
                        isValid = false;
                    }
                    break;
                case 'step6_interests':
                    if (this.app.state.userData.interests.length === 0) {
                        alert(t('fillAllFieldsAlert'));
                        isValid = false;
                    }
                    break;
                case 'step7_preference':
                    if (!this.app.state.userData.preference) {
                        alert(t('fillAllFieldsAlert'));
                        isValid = false;
                    }
                    break;
                case 'step9_photos':
                    if (!this.app.state.userData.avatar) {
                        alert(t('fillAllFieldsAlert'));
                        isValid = false;
                    }
                    break;
                case 'step10_aboutYou':
                    const userDescription = document.getElementById('userDescription').value.trim();
                    if (!userDescription) {
                        alert(t('fillAllFieldsAlert'));
                        isValid = false;
                    } else {
                        this.app.state.userData.description = userDescription;
                    }
                    break;
            }
            return isValid;
        }

        setupFormHandlers() {
            // Step 1: Name
            document.getElementById('nextStep1').onclick = () => this.nextStep();

            // Step 2: Gender
            document.getElementById('nextStep2').onclick = () => this.nextStep();
            document.getElementById('prevStep2').onclick = () => this.prevStep();
            document.querySelectorAll('[data-gender]').forEach(tag => {
                tag.addEventListener('click', (e) => {
                    document.querySelectorAll('[data-gender]').forEach(t => t.classList.remove('selected'));
                    e.currentTarget.classList.add('selected');
                    this.app.state.userData.gender = e.currentTarget.dataset.gender;
                });
            });

            // Step 3: City
            document.getElementById('nextStep3').onclick = () => this.nextStep();
            document.getElementById('prevStep3').onclick = () => this.prevStep();

            // Step 4: Date of Birth
            document.getElementById('nextStep4').onclick = () => this.nextStep();
            document.getElementById('prevStep4').onclick = () => this.prevStep();
            const dobDay = document.getElementById('dobDay');
            const dobMonth = document.getElementById('dobMonth');
            const dobYear = document.getElementById('dobYear');
            const zodiacDisplay = document.getElementById('zodiacDisplay');

            const updateZodiac = () => {
                const day = parseInt(dobDay.value);
                const month = parseInt(dobMonth.value);
                if (day && month) {
                    const zodiac = this.app.getZodiacSign(day, month);
                    if (zodiac) {
                        zodiacDisplay.innerHTML = `<span class="emoji">${zodiac.emoji}</span> ${this.app.translate(zodiac.id)}`;
                        zodiacDisplay.style.display = 'flex';
                    } else {
                        zodiacDisplay.style.display = 'none';
                    }
                } else {
                    zodiacDisplay.style.display = 'none';
                }
            };
            dobDay.addEventListener('input', updateZodiac);
            dobMonth.addEventListener('input', updateZodiac);
            dobYear.addEventListener('input', updateZodiac);
            updateZodiac(); // Initial update if data already exists

            // Step 5: Looking For
            document.getElementById('nextStep5').onclick = () => this.nextStep();
            document.getElementById('prevStep5').onclick = () => this.prevStep();
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

            // Step 6: Interests
            document.getElementById('nextStep6').onclick = () => this.nextStep();
            document.getElementById('prevStep6').onclick = () => this.prevStep();
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

            // Step 7: Preference
            document.getElementById('nextStep7').onclick = () => this.nextStep();
            document.getElementById('prevStep7').onclick = () => this.prevStep();
            document.querySelectorAll('[data-preference]').forEach(tag => {
                tag.addEventListener('click', (e) => {
                    document.querySelectorAll('[data-preference]').forEach(t => t.classList.remove('selected'));
                    e.currentTarget.classList.add('selected');
                    this.app.state.userData.preference = e.currentTarget.dataset.preference;
                });
            });

            // Step 8: Profile Color
            document.getElementById('nextStep8').onclick = () => this.nextStep();
            document.getElementById('prevStep8').onclick = () => this.prevStep();
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

            // Step 9: Photos
            document.getElementById('nextStep9').onclick = () => this.nextStep();
            document.getElementById('prevStep9').onclick = () => this.prevStep();
            const photoUpload = document.getElementById('photoUpload');
            if (photoUpload) {
                photoUpload.addEventListener('change', (e) => {
                    const files = e.target.files;
                    if (files.length > 0) {
                        Array.from(files).forEach(file => {
                            if (file && file.type.match('image.*')) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    this.app.state.userData.photos.push(e.target.result);
                                    // If no avatar is set, set the first uploaded photo as avatar
                                    if (!this.app.state.userData.avatar) {
                                        this.app.state.userData.avatar = e.target.result;
                                    }
                                    this.renderPhotos();
                                };
                                reader.readAsDataURL(file);
                            }
                        });
                    }
                });
            }
            const photosContainer = document.getElementById('photosContainer');
            if (photosContainer) {
                photosContainer.addEventListener('click', (e) => {
                    if (e.target.classList.contains('delete-photo')) {
                        const index = parseInt(e.target.dataset.index);
                        const photoToDelete = this.app.state.userData.photos[index];
                        this.app.state.userData.photos.splice(index, 1);
                        // If the deleted photo was the avatar, set a new one or null
                        if (this.app.state.userData.avatar === photoToDelete) {
                            this.app.state.userData.avatar = this.app.state.userData.photos[0] || null;
                        }
                        this.renderPhotos();
                    } else if (e.target.classList.contains('set-avatar-btn')) {
                        const index = parseInt(e.target.dataset.index);
                        this.app.state.userData.avatar = this.app.state.userData.photos[index];
                        this.renderPhotos();
                    }
                });
            }
            this.renderPhotos(); // Initial render of photos

            // Step 10: About You
            document.getElementById('nextStep10').onclick = () => this.nextStep();
            document.getElementById('prevStep10').onclick = () => this.prevStep();

            // Step 11: Save
            document.getElementById('saveProfileBtn').onclick = () => this.saveProfile();
            document.getElementById('prevStep11').onclick = () => this.prevStep();
        }

        updateColorPalette(color) {
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('selected');
                if (option.dataset.color === color) {
                    option.classList.add('selected');
                }
            });
        }

        renderPhotos() {
            const container = document.getElementById('photosContainer');
            if (container) {
                container.innerHTML = this.app.state.userData.photos.map((photo, index) => `
                    <div class="photo-preview ${this.app.state.userData.avatar === photo ? 'main-avatar' : ''}"
                         style="background-image: url(${photo})">
                        <button class="delete-photo" data-index="${index}">×</button>
                        ${this.app.state.userData.avatar !== photo ? `<button class="set-avatar-btn" data-index="${index}">Сделать аватаром</button>` : ''}
                    </div>
                `).join('');
            }
        }

        saveProfile() {
            if (!this.validateStep(this.currentStep)) {
                return;
            }

            localStorage.setItem('datingProfile', JSON.stringify(this.app.state.userData));
            this.app.switchScreen('profile');
        }

        updateFormTexts() {
            const t = (key, replacements) => this.app.translate(key, replacements);

            // Step 1: Name
            document.querySelector('#step1_name .section-title').textContent = t('registrationTitle');
            document.querySelector('#step1_name .section-description').textContent = t('registrationDescription');
            document.getElementById('userName').placeholder = t('yourName');
            document.getElementById('nextStep1').textContent = t('next');

            // Step 2: Gender
            document.querySelector('#step2_gender .section-title').textContent = t('registrationTitle');
            document.querySelector('#step2_gender .section-description').textContent = t('registrationDescription');
            document.querySelector('#step2_gender [data-gender="male"]').innerHTML = `👨 ${t('male')}`;
            document.querySelector('#step2_gender [data-gender="female"]').innerHTML = `👩 ${t('female')}`;
            document.getElementById('nextStep2').textContent = t('next');
            document.getElementById('prevStep2').textContent = t('back');

            // Step 3: City
            document.querySelector('#step3_city .section-title').textContent = t('registrationTitle');
            document.querySelector('#step3_city .section-description').textContent = t('registrationDescription');
            document.getElementById('userCity').placeholder = t('yourCity');
            document.getElementById('nextStep3').textContent = t('next');
            document.getElementById('prevStep3').textContent = t('back');

            // Step 4: Date of Birth
            document.querySelector('#step4_dob .section-title').textContent = t('yourDob');
            document.querySelector('#step4_dob .section-description').textContent = t('registrationDescription');
            document.getElementById('dobDay').placeholder = t('day');
            document.getElementById('dobMonth').placeholder = t('month');
            document.getElementById('dobYear').placeholder = t('year');
            document.getElementById('nextStep4').textContent = t('next');
            document.getElementById('prevStep4').textContent = t('back');
            const zodiacDisplay = document.getElementById('zodiacDisplay');
            if (zodiacDisplay && zodiacDisplay.style.display !== 'none' && this.app.state.userData.zodiacSign) {
                zodiacDisplay.innerHTML = `<span class="emoji">${this.app.state.userData.zodiacSign.emoji}</span> ${t(this.app.state.userData.zodiacSign.id)}`;
            }

            // Step 5: Looking For
            document.querySelector('#step5_lookingFor .section-title').textContent = t('whatAreYouLookingFor');
            document.querySelector('#step5_lookingFor .section-description').textContent = t('registrationDescription');
            document.getElementById('nextStep5').textContent = t('next');
            document.getElementById('prevStep5').textContent = t('back');
            document.querySelectorAll('#step5_lookingFor [data-looking-for]').forEach(tag => {
                const optionId = tag.dataset.lookingFor;
                const option = this.app.config.lookingForOptions.find(o => o.id === optionId);
                if (option) {
                    tag.innerHTML = `${option.emoji} ${t(option.id)}`;
                }
            });

            // Step 6: Interests
            document.querySelector('#step6_interests .section-title').textContent = t('yourInterests');
            document.querySelector('#step6_interests .section-description').textContent = t('registrationDescription');
            document.getElementById('nextStep6').textContent = t('next');
            document.getElementById('prevStep6').textContent = t('back');
            document.querySelectorAll('#step6_interests [data-interest]').forEach(tag => {
                const interestId = tag.dataset.interest;
                const interest = this.app.config.interests.find(i => i.id === interestId);
                if (interest) {
                    tag.innerHTML = `${interest.emoji} ${t(interest.id)}`;
                }
            });

            // Step 7: Preference
            document.querySelector('#step7_preference .section-title').textContent = t('whoAreYouLookingFor');
            document.querySelector('#step7_preference .section-description').textContent = t('registrationDescription');
            document.getElementById('nextStep7').textContent = t('next');
            document.getElementById('prevStep7').textContent = t('back');
            document.querySelectorAll('#step7_preference [data-preference]').forEach(tag => {
                const preferenceId = tag.dataset.preference;
                const preference = this.app.config.preferenceOptions.find(p => p.id === preferenceId);
                if (preference) {
                    tag.innerHTML = `${preference.emoji} ${t(preference.id)}`;
                }
            });

            // Step 8: Profile Color
            document.querySelector('#step8_profileColor .section-title').textContent = t('profileColor');
            document.querySelector('#step8_profileColor .section-description').textContent = t('registrationDescription');
            document.querySelector('#step8_profileColor .color-custom label').textContent = t('orChooseYourColor');
            document.getElementById('nextStep8').textContent = t('next');
            document.getElementById('prevStep8').textContent = t('back');

            // Step 9: Photos
            document.querySelector('#step9_photos .section-title').textContent = t('yourPhotos');
            document.querySelector('#step9_photos .section-description').textContent = t('addPhotoDescription');
            document.querySelector('#step9_photos .avatar-upload .btn-secondary').innerHTML = `📸 ${t('addPhoto')}`;
            document.getElementById('nextStep9').textContent = t('next');
            document.getElementById('prevStep9').textContent = t('back');

            // Step 10: About You
            document.querySelector('#step10_aboutYou .section-title').textContent = t('aboutYou');
            document.querySelector('#step10_aboutYou .section-description').textContent = t('registrationDescription');
            document.getElementById('userDescription').placeholder = t('aboutYouPlaceholder');
            document.getElementById('nextStep10').textContent = t('next');
            document.getElementById('prevStep10').textContent = t('back');

            // Step 11: Save
            document.querySelector('#step11_save .section-title').textContent = t('saveProfile');
            document.querySelector('#step11_save .section-description').textContent = t('registrationDescription');
            document.getElementById('saveProfileBtn').textContent = t('saveProfile');
            document.getElementById('prevStep11').textContent = t('back');
        }
    }
    
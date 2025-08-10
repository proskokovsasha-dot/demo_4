// assets/js/components/form.js

class FormHandler {
    constructor(app) {
        this.app = app;
        this.currentStep = 0;
        this.formSteps = [
            'step1_name',
            'step2_gender',
            'step3_city',
            'step4_dob',
            'step5_lookingFor',
            'step6_interests',
            'step7_preference',
            'step8_profileColor',
            'step9_aboutYou',
            'step10_save'
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

                <!-- Step 9: About You -->
                <div class="form-step" id="step9_aboutYou">
                    <h2 class="section-title">${t('aboutYou')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <textarea class="input-field" id="userDescription"
                              placeholder="${t('aboutYouPlaceholder')}" rows="4">${this.app.state.userData.description || ''}</textarea>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep9">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep9">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 10: Save -->
                <div class="form-step" id="step10_save">
                    <h2 class="section-title">${t('saveProfile')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <button class="btn" id="saveProfileBtn">${t('saveProfile')}</button>
                    <div class="form-navigation">
                        <button class="btn btn-secondary btn-prev" id="prevStep10">${t('back')}</button>
                    </div>
                </div>
            </div>
        `;
        this.setupFormHandlers();
        this.showStep(this.currentStep);
        this.updateFormTexts();
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
                this.updateFormTexts();
            } else {
                this.saveProfile();
            }
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateFormTexts();
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
                        alert(t('invalidDate'));
                        isValid = false;
                    } else {
                        this.app.state.userData.dob = { day, month, year };
                        this.app.state.userData.zodiacSign = this.app.getZodiacSign(day, month);
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
            case 'step9_aboutYou':
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
        const nextStep1Btn = document.getElementById('nextStep1');
        if (nextStep1Btn) nextStep1Btn.onclick = () => this.nextStep();

        const nextStep2Btn = document.getElementById('nextStep2');
        if (nextStep2Btn) nextStep2Btn.onclick = () => this.nextStep();
        const prevStep2Btn = document.getElementById('prevStep2');
        if (prevStep2Btn) prevStep2Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-gender]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                document.querySelectorAll('[data-gender]').forEach(t => t.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                this.app.state.userData.gender = e.currentTarget.dataset.gender;
            });
        });

        const nextStep3Btn = document.getElementById('nextStep3');
        if (nextStep3Btn) nextStep3Btn.onclick = () => this.nextStep();
        const prevStep3Btn = document.getElementById('prevStep3');
        if (prevStep3Btn) prevStep3Btn.onclick = () => this.prevStep();

        const nextStep4Btn = document.getElementById('nextStep4');
        if (nextStep4Btn) nextStep4Btn.onclick = () => this.nextStep();
        const prevStep4Btn = document.getElementById('prevStep4');
        if (prevStep4Btn) prevStep4Btn.onclick = () => this.prevStep();
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
        if (dobDay) dobDay.addEventListener('input', updateZodiac);
        if (dobMonth) dobMonth.addEventListener('input', updateZodiac);
        if (dobYear) dobYear.addEventListener('input', updateZodiac);
        updateZodiac();

        const nextStep5Btn = document.getElementById('nextStep5');
        if (nextStep5Btn) nextStep5Btn.onclick = () => this.nextStep();
        const prevStep5Btn = document.getElementById('prevStep5');
        if (prevStep5Btn) prevStep5Btn.onclick = () => this.prevStep();
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

        const nextStep6Btn = document.getElementById('nextStep6');
        if (nextStep6Btn) nextStep6Btn.onclick = () => this.nextStep();
        const prevStep6Btn = document.getElementById('prevStep6');
        if (prevStep6Btn) prevStep6Btn.onclick = () => this.prevStep();
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

        const nextStep7Btn = document.getElementById('nextStep7');
        if (nextStep7Btn) nextStep7Btn.onclick = () => this.nextStep();
        const prevStep7Btn = document.getElementById('prevStep7');
        if (prevStep7Btn) prevStep7Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-preference]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                document.querySelectorAll('[data-preference]').forEach(t => t.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                this.app.state.userData.preference = e.currentTarget.dataset.preference;
            });
        });

        const nextStep8Btn = document.getElementById('nextStep8');
        if (nextStep8Btn) nextStep8Btn.onclick = () => this.nextStep();
        const prevStep8Btn = document.getElementById('prevStep8');
        if (prevStep8Btn) prevStep8Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-color]').forEach(color => {
            color.addEventListener('click', (e) => {
                const selectedColor = e.currentTarget.dataset.color;
                this.app.state.userData.profileColor = selectedColor;
                this.updateColorPalette(selectedColor);
                this.app.setAppThemeColor(selectedColor); // Apply to app theme
                const customColorInput = document.getElementById('customColor');
                if (customColorInput) customColorInput.value = selectedColor;
            });
        });
        const customColor = document.getElementById('customColor');
        if (customColor) {
            customColor.addEventListener('input', (e) => {
                const selectedColor = e.target.value;
                this.app.state.userData.profileColor = selectedColor;
                this.updateColorPalette(selectedColor);
                this.app.setAppThemeColor(selectedColor); // Apply to app theme
            });
        }
        this.updateColorPalette(this.app.state.userData.profileColor);


        const nextStep9Btn = document.getElementById('nextStep9');
        if (nextStep9Btn) nextStep9Btn.onclick = () => this.nextStep();
        const prevStep9Btn = document.getElementById('prevStep9');
        if (prevStep9Btn) prevStep9Btn.onclick = () => this.prevStep();

        const saveProfileBtn = document.getElementById('saveProfileBtn');
        if (saveProfileBtn) saveProfileBtn.onclick = () => this.saveProfile();
        const prevStep10Btn = document.getElementById('prevStep10');
        if (prevStep10Btn) prevStep10Btn.onclick = () => this.prevStep();
    }

    updateColorPalette(color) {
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.color === color) {
                option.classList.add('selected');
            }
        });
        // No need to update myProfileCard here, as setAppThemeColor handles global theme
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

        const step1Name = document.querySelector('#step1_name');
        if (step1Name) {
            step1Name.querySelector('.section-title').textContent = t('registrationTitle');
            step1Name.querySelector('.section-description').textContent = t('registrationDescription');
            step1Name.querySelector('#userName').placeholder = t('yourName');
            step1Name.querySelector('#nextStep1').textContent = t('next');
        }

        const step2Gender = document.querySelector('#step2_gender');
        if (step2Gender) {
            step2Gender.querySelector('.section-title').textContent = t('registrationTitle');
            step2Gender.querySelector('.section-description').textContent = t('registrationDescription');
            step2Gender.querySelector('[data-gender="male"]').innerHTML = `👨 ${t('male')}`;
            step2Gender.querySelector('[data-gender="female"]').innerHTML = `👩 ${t('female')}`;
            step2Gender.querySelector('#nextStep2').textContent = t('next');
            step2Gender.querySelector('#prevStep2').textContent = t('back');
        }

        const step3City = document.querySelector('#step3_city');
        if (step3City) {
            step3City.querySelector('.section-title').textContent = t('registrationTitle');
            step3City.querySelector('.section-description').textContent = t('registrationDescription');
            step3City.querySelector('#userCity').placeholder = t('yourCity');
            step3City.querySelector('#nextStep3').textContent = t('next');
            step3City.querySelector('#prevStep3').textContent = t('back');
        }

        const step4Dob = document.querySelector('#step4_dob');
        if (step4Dob) {
            step4Dob.querySelector('.section-title').textContent = t('yourDob');
            step4Dob.querySelector('.section-description').textContent = t('registrationDescription');
            step4Dob.querySelector('#dobDay').placeholder = t('day');
            step4Dob.querySelector('#dobMonth').placeholder = t('month');
            step4Dob.querySelector('#dobYear').placeholder = t('year');
            step4Dob.querySelector('#nextStep4').textContent = t('next');
            step4Dob.querySelector('#prevStep4').textContent = t('back');
            const zodiacDisplay = step4Dob.querySelector('#zodiacDisplay');
            if (zodiacDisplay && zodiacDisplay.style.display !== 'none' && this.app.state.userData.zodiacSign) {
                zodiacDisplay.innerHTML = `<span class="emoji">${this.app.state.userData.zodiacSign.emoji}</span> ${t(this.app.state.userData.zodiacSign.id)}`;
            }
        }

        const step5LookingFor = document.querySelector('#step5_lookingFor');
        if (step5LookingFor) {
            step5LookingFor.querySelector('.section-title').textContent = t('whatAreYouLookingFor');
            step5LookingFor.querySelector('.section-description').textContent = t('registrationDescription');
            step5LookingFor.querySelector('#nextStep5').textContent = t('next');
            step5LookingFor.querySelector('#prevStep5').textContent = t('back');
            step5LookingFor.querySelectorAll('[data-looking-for]').forEach(tag => {
                const optionId = tag.dataset.lookingFor;
                const option = this.app.config.lookingForOptions.find(o => o.id === optionId);
                if (option) {
                    tag.innerHTML = `${option.emoji} ${t(option.id)}`;
                }
            });
        }

        const step6Interests = document.querySelector('#step6_interests');
        if (step6Interests) {
            step6Interests.querySelector('.section-title').textContent = t('yourInterests');
            step6Interests.querySelector('.section-description').textContent = t('registrationDescription');
            step6Interests.querySelector('#nextStep6').textContent = t('next');
            step6Interests.querySelector('#prevStep6').textContent = t('back');
            step6Interests.querySelectorAll('[data-interest]').forEach(tag => {
                const interestId = tag.dataset.interest;
                const interest = this.app.config.interests.find(i => i.id === interestId);
                if (interest) {
                    tag.innerHTML = `${interest.emoji} ${t(interest.id)}`;
                }
            });
        }

        const step7Preference = document.querySelector('#step7_preference');
        if (step7Preference) {
            step7Preference.querySelector('.section-title').textContent = t('whoAreYouLookingFor');
            step7Preference.querySelector('.section-description').textContent = t('registrationDescription');
            step7Preference.querySelector('#nextStep7').textContent = t('next');
            step7Preference.querySelector('#prevStep7').textContent = t('back');
            step7Preference.querySelectorAll('[data-preference]').forEach(tag => {
                const preferenceId = tag.dataset.preference;
                const preference = this.app.config.preferenceOptions.find(p => p.id === preferenceId);
                if (preference) {
                    tag.innerHTML = `${preference.emoji} ${t(preference.id)}`;
                }
            });
        }

        const step8ProfileColor = document.querySelector('#step8_profileColor');
        if (step8ProfileColor) {
            step8ProfileColor.querySelector('.section-title').textContent = t('profileColor');
            step8ProfileColor.querySelector('.section-description').textContent = t('registrationDescription');
            step8ProfileColor.querySelector('.color-custom label').textContent = t('orChooseYourColor');
            step8ProfileColor.querySelector('#nextStep8').textContent = t('next');
            step8ProfileColor.querySelector('#prevStep8').textContent = t('back');
        }

        const step9AboutYou = document.querySelector('#step9_aboutYou');
        if (step9AboutYou) {
            step9AboutYou.querySelector('.section-title').textContent = t('aboutYou');
            step9AboutYou.querySelector('.section-description').textContent = t('registrationDescription');
            step9AboutYou.querySelector('#userDescription').placeholder = t('aboutYouPlaceholder');
            step9AboutYou.querySelector('#nextStep9').textContent = t('next');
            step9AboutYou.querySelector('#prevStep9').textContent = t('back');
        }

        const step10Save = document.querySelector('#step10_save');
        if (step10Save) {
            step10Save.querySelector('.section-title').textContent = t('saveProfile');
            step10Save.querySelector('.section-description').textContent = t('registrationDescription');
            step10Save.querySelector('#saveProfileBtn').textContent = t('saveProfile');
            step10Save.querySelector('#prevStep10').textContent = t('back');
        }
    }
}

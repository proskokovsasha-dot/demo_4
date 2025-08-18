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
            'step5_education_profession', // НОВЫЙ ШАГ
            'step6_badHabits', // НОВЫЙ ШАГ
            'step7_children', // НОВЫЙ ШАГ
            'step8_pets', // НОВЫЙ ШАГ
            'step9_languages', // НОВЫЙ ШАГ
            'step10_lookingFor', // Измененный порядок
            'step11_interests', // Измененный порядок
            'step12_datingGoals', // НОВЫЙ ШАГ
            'step13_preference', // Измененный порядок
            'step14_profileColor', // Измененный порядок
            'step15_aboutYou', // Измененный порядок
            'step16_save' // Измененный порядок
        ];
    }

    renderForm() {
        const t = (key, replacements) => this.app.translate(key, replacements);

        this.app.elements.registrationForm.innerHTML = `
            <div class="form-step-container">
                <!-- Step 1: Name -->
                <div class="form-step" id="step1_name">
                    <h2 class="section-title" id="registrationTitle">${t('registrationTitle')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <input type="text" class="input-field" id="userName"
                           placeholder="${t('yourName')}"
                           value="${this.app.state.userData.name || ''}" required aria-required="true">
                    <div class="error-message" id="userNameError" aria-live="polite"></div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep1">${t('next')}</button>
                    </div>
                </div>

                <!-- Step 2: Gender -->
                <div class="form-step" id="step2_gender">
                    <h2 class="section-title">${t('registrationTitle')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <div class="tags-container" role="radiogroup" aria-labelledby="genderSelectionTitle">
                        <h3 id="genderSelectionTitle" class="visually-hidden">${t('')}</h3>
                        <div class="tag ${this.app.state.userData.gender === 'male' ? 'selected' : ''}"
                             data-gender="male" role="radio" aria-checked="${this.app.state.userData.gender === 'male'}" tabindex="0">
                            👨 ${t('male')}
                        </div>
                        <div class="tag ${this.app.state.userData.gender === 'female' ? 'selected' : ''}"
                             data-gender="female" role="radio" aria-checked="${this.app.state.userData.gender === 'female'}" tabindex="0">
                            👩 ${t('female')}
                        </div>
                    </div>
                    <div class="error-message" id="genderError" aria-live="polite"></div>
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
                           value="${this.app.state.userData.city || ''}" required aria-required="true">
                    <div class="error-message" id="userCityError" aria-live="polite"></div>
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
                               value="${this.app.state.userData.dob.day || ''}" min="1" max="31" required aria-required="true">
                        <input type="number" class="input-field" id="dobMonth" placeholder="${t('month')}"
                               value="${this.app.state.userData.dob.month || ''}" min="1" max="12" required aria-required="true">
                        <input type="number" class="input-field" id="dobYear" placeholder="${t('year')}"
                               value="${this.app.state.userData.dob.year || ''}" min="1900" max="${new Date().getFullYear()}" required aria-required="true">
                    </div>
                    <div class="error-message" id="dobError" aria-live="polite"></div>
                    <div class="zodiac-display" id="zodiacDisplay" style="display:none;"></div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep4">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep4">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 5: Education & Profession (НОВЫЙ ШАГ) -->
                <div class="form-step" id="step5_education_profession">
                    <h2 class="section-title">${t('education')}/${t('profession')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <input type="text" class="input-field" id="userEducation"
                           placeholder="${t('yourEducation')}"
                           value="${this.app.state.userData.education || ''}">
                    <input type="text" class="input-field" id="userProfession"
                           placeholder="${t('yourProfession')}"
                           value="${this.app.state.userData.profession || ''}">
                    <div class="form-navigation">
                        <button class="btn" id="nextStep5">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep5">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 6: Bad Habits (НОВЫЙ ШАГ) -->
                <div class="form-step" id="step6_badHabits">
                    <h2 class="section-title">${t('yourBadHabits')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <div class="tags-container" role="group" aria-labelledby="badHabitsTitle">
                        <h3 id="badHabitsTitle" class="visually-hidden">${t('')}</h3>
                        ${this.app.config.badHabitsOptions.map(option => `
                            <div class="tag ${(this.app.state.userData.badHabits || []).includes(option.id) ? 'selected' : ''}"
                                 data-bad-habit="${option.id}" role="checkbox" aria-checked="${(this.app.state.userData.badHabits || []).includes(option.id)}" tabindex="0">
                                ${option.emoji} ${t(option.id)}
                            </div>
                        `).join('')}
                    </div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep6">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep6">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 7: Children (НОВЫЙ ШАГ) -->
                <div class="form-step" id="step7_children">
                    <h2 class="section-title">${t('yourChildrenStatus')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <div class="tags-container" role="radiogroup" aria-labelledby="childrenStatusTitle">
                        <h3 id="childrenStatusTitle" class="visually-hidden">${t('')}</h3>
                        ${this.app.config.childrenOptions.map(option => `
                            <div class="tag ${this.app.state.userData.children === option.id ? 'selected' : ''}"
                                 data-children="${option.id}" role="radio" aria-checked="${this.app.state.userData.children === option.id}" tabindex="0">
                                ${option.emoji} ${t(option.id)}
                            </div>
                        `).join('')}
                    </div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep7">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep7">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 8: Pets (НОВЫЙ ШАГ) -->
                <div class="form-step" id="step8_pets">
                    <h2 class="section-title">${t('yourPets')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <div class="tags-container" role="group" aria-labelledby="petsTitle">
                        <h3 id="petsTitle" class="visually-hidden">${t('')}</h3>
                        ${this.app.config.petsOptions.map(option => `
                            <div class="tag ${(this.app.state.userData.pets || []).includes(option.id) ? 'selected' : ''}"
                                 data-pets="${option.id}" role="checkbox" aria-checked="${(this.app.state.userData.pets || []).includes(option.id)}" tabindex="0">
                                ${option.emoji} ${t(option.id)}
                            </div>
                        `).join('')}
                    </div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep8">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep8">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 9: Languages (НОВЫЙ ШАГ) -->
                <div class="form-step" id="step9_languages">
                    <h2 class="section-title">${t('yourLanguages')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <div class="tags-container" role="group" aria-labelledby="languagesTitle">
                        <h3 id="languagesTitle" class="visually-hidden">${t('')}</h3>
                        ${this.app.config.languagesOptions.map(option => `
                            <div class="tag ${(this.app.state.userData.languages || []).includes(option.id) ? 'selected' : ''}"
                                 data-language="${option.id}" role="checkbox" aria-checked="${(this.app.state.userData.languages || []).includes(option.id)}" tabindex="0">
                                ${option.emoji} ${t(option.id)}
                            </div>
                        `).join('')}
                    </div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep9">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep9">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 10: Looking For -->
                <div class="form-step" id="step10_lookingFor">
                    <h2 class="section-title">${t('whatAreYouLookingFor')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <div class="tags-container" role="group" aria-labelledby="lookingForTitle">
                        <h3 id="lookingForTitle" class="visually-hidden">${t('')}</h3>
                        ${this.app.config.lookingForOptions.map(option => `
                            <div class="tag ${(this.app.state.userData.lookingFor || []).includes(option.id) ? 'selected' : ''}"
                                 data-looking-for="${option.id}" role="checkbox" aria-checked="${(this.app.state.userData.lookingFor || []).includes(option.id)}" tabindex="0">
                                ${option.emoji} ${t(option.id)}
                            </div>
                        `).join('')}
                    </div>
                    <div class="error-message" id="lookingForError" aria-live="polite"></div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep10">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep10">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 11: Interests -->
                <div class="form-step" id="step11_interests">
                    <h2 class="section-title">${t('yourInterests')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <div class="tags-container" id="interestsContainer" role="group" aria-labelledby="interestsTitle">
                        <h3 id="interestsTitle" class="visually-hidden">${t('')}</h3>
                        ${this.app.config.interests.map(interest => `
                            <div class="tag ${this.app.state.userData.interests.includes(interest.id) ? 'selected' : ''}"
                                 data-interest="${interest.id}" role="checkbox" aria-checked="${this.app.state.userData.interests.includes(interest.id)}" tabindex="0">
                                ${interest.emoji} ${t(interest.id)}
                            </div>
                        `).join('')}
                    </div>
                    <div class="error-message" id="interestsError" aria-live="polite"></div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep11">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep11">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 12: Dating Goals (НОВЫЙ ШАГ) -->
                <div class="form-step" id="step12_datingGoals">
                    <h2 class="section-title">${t('yourDatingGoals')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <div class="tags-container" role="group" aria-labelledby="datingGoalsTitle">
                        <h3 id="datingGoalsTitle" class="visually-hidden">${t('')}</h3>
                        ${this.app.config.datingGoalsOptions.map(option => `
                            <div class="tag ${(this.app.state.userData.datingGoals || []).includes(option.id) ? 'selected' : ''}"
                                 data-dating-goal="${option.id}" role="checkbox" aria-checked="${(this.app.state.userData.datingGoals || []).includes(option.id)}" tabindex="0">
                                ${option.emoji} ${t(option.id)}
                            </div>
                        `).join('')}
                    </div>
                    <div class="error-message" id="datingGoalsError" aria-live="polite"></div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep12">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep12">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 13: Preference -->
                <div class="form-step" id="step13_preference">
                    <h2 class="section-title">${t('whoAreYouLookingFor')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <div class="tags-container" role="radiogroup" aria-labelledby="preferenceTitle">
                        <h3 id="preferenceTitle" class="visually-hidden">${t('')}</h3>
                        ${this.app.config.preferenceOptions.map(option => `
                            <div class="tag ${this.app.state.userData.preference === option.id ? 'selected' : ''}"
                                 data-preference="${option.id}" role="radio" aria-checked="${this.app.state.userData.preference === option.id}" tabindex="0">
                                ${option.emoji} ${t(option.id)}
                            </div>
                        `).join('')}
                    </div>
                    <div class="error-message" id="preferenceError" aria-live="polite"></div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep13">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep13">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 14: Profile Color -->
                <div class="form-step" id="step14_profileColor">
                    <h2 class="section-title">${t('profileColor')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <div class="color-palette" role="group" aria-labelledby="colorPaletteTitle">
                        <h3 id="colorPaletteTitle" class="visually-hidden">${t('')}</h3>
                        ${this.app.config.colors.map(color => `
                            <div class="color-option ${this.app.state.userData.profileColor === color ? 'selected' : ''}"
                                 style="background-color: ${color}"
                                 data-color="${color}" role="radio" aria-checked="${this.app.state.userData.profileColor === color}" tabindex="0"></div>
                        `).join('')}
                    </div>
                    <div class="color-custom">
                        <input type="color" id="customColor" value="${this.app.state.userData.profileColor}" aria-label="${t('orChooseYourColor')}">
                        <label for="customColor">${t('orChooseYourColor')}</label>
                    </div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep14">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep14">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 15: About You -->
                <div class="form-step" id="step15_aboutYou">
                    <h2 class="section-title">${t('aboutYou')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <textarea class="input-field" id="userDescription"
                              placeholder="${t('aboutYouPlaceholder')}" rows="4" required aria-required="true">${this.app.state.userData.description || ''}</textarea>
                    <div class="error-message" id="userDescriptionError" aria-live="polite"></div>
                    <div class="form-navigation">
                        <button class="btn" id="nextStep15">${t('next')}</button>
                        <button class="btn btn-secondary btn-prev" id="prevStep15">${t('back')}</button>
                    </div>
                </div>

                <!-- Step 16: Save -->
                <div class="form-step" id="step16_save">
                    <h2 class="section-title">${t('saveProfile')}</h2>
                    <p class="section-description">${t('registrationDescription')}</p>
                    <button class="btn" id="saveProfileBtn">${t('saveProfile')}</button>
                    <div class="form-navigation">
                        <button class="btn btn-secondary btn-prev" id="prevStep16">${t('back')}</button>
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
                // Set focus to the first interactive element in the active step for accessibility
                const firstInteractiveElement = step.querySelector('input, textarea, button, [tabindex="0"]');
                if (firstInteractiveElement) {
                    firstInteractiveElement.focus();
                }
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

    // Helper to display error messages
    displayError(elementId, message) {
        const errorElement = document.getElementById(elementId + 'Error');
        const inputElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
        if (inputElement) {
            if (message) {
                inputElement.classList.add('error');
                inputElement.setAttribute('aria-invalid', 'true');
                inputElement.setAttribute('aria-describedby', elementId + 'Error');
            } else {
                inputElement.classList.remove('error');
                inputElement.removeAttribute('aria-invalid');
                inputElement.removeAttribute('aria-describedby');
            }
        }
    }

    validateStep(stepIndex) {
        const t = (key, replacements) => this.app.translate(key, replacements);
        let isValid = true;
        const currentStepId = this.formSteps[stepIndex];

        // Clear previous errors for the current step
        document.querySelectorAll(`#${currentStepId} .error-message`).forEach(el => el.textContent = '');
        document.querySelectorAll(`#${currentStepId} .input-field, #${currentStepId} .tag`).forEach(el => {
            el.classList.remove('error');
            el.removeAttribute('aria-invalid');
            el.removeAttribute('aria-describedby');
        });


        switch (currentStepId) {
            case 'step1_name':
                const userNameInput = document.getElementById('userName');
                const userName = userNameInput.value.trim();
                if (!userName) {
                    this.displayError('userName', t('fillAllFieldsAlert'));
                    isValid = false;
                } else {
                    this.app.state.userData.name = userName;
                }
                break;
            case 'step2_gender':
                const genderSelected = this.app.state.userData.gender;
                if (!genderSelected) {
                    this.displayError('gender', t('fillAllFieldsAlert'));
                    isValid = false;
                }
                break;
            case 'step3_city':
                const userCityInput = document.getElementById('userCity');
                const userCity = userCityInput.value.trim();
                if (!userCity) {
                    this.displayError('userCity', t('fillAllFieldsAlert'));
                    isValid = false;
                } else {
                    this.app.state.userData.city = userCity;
                }
                break;
            case 'step4_dob':
                const dobDayInput = document.getElementById('dobDay');
                const dobMonthInput = document.getElementById('dobMonth');
                const dobYearInput = document.getElementById('dobYear');

                const dobDay = dobDayInput.value.trim();
                const dobMonth = dobMonthInput.value.trim();
                const dobYear = dobYearInput.value.trim();

                if (!dobDay || !dobMonth || !dobYear) {
                    this.displayError('dob', t('fillAllFieldsAlert'));
                    isValid = false;
                } else {
                    const day = parseInt(dobDay);
                    const month = parseInt(dobMonth);
                    const year = parseInt(dobYear);

                    const currentYear = new Date().getFullYear();
                    const minYear = 1900; // A reasonable minimum year

                    if (isNaN(day) || isNaN(month) || isNaN(year) ||
                        day < 1 || day > 31 || month < 1 || month > 12 ||
                        year < minYear || year > currentYear) {
                        this.displayError('dob', t('invalidDate'));
                        isValid = false;
                    } else {
                        // Basic date validity check (e.g., 31st of Feb)
                        const testDate = new Date(year, month - 1, day);
                        if (testDate.getFullYear() !== year || testDate.getMonth() !== month - 1 || testDate.getDate() !== day) {
                            this.displayError('dob', t('invalidDate'));
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
                }
                break;
            case 'step5_education_profession':
                // Эти поля не обязательны, поэтому всегда true
                this.app.state.userData.education = document.getElementById('userEducation').value.trim();
                this.app.state.userData.profession = document.getElementById('userProfession').value.trim();
                break;
            case 'step6_badHabits':
                // Эти поля не обязательны, поэтому всегда true
                break;
            case 'step7_children':
                // Эти поля не обязательны, поэтому всегда true
                break;
            case 'step8_pets':
                // Эти поля не обязательны, поэтому всегда true
                break;
            case 'step9_languages':
                // Эти поля не обязательны, поэтому всегда true
                break;
            case 'step10_lookingFor':
                if (this.app.state.userData.lookingFor.length === 0) {
                    this.displayError('lookingFor', t('fillAllFieldsAlert'));
                    isValid = false;
                }
                break;
            case 'step11_interests':
                if (this.app.state.userData.interests.length === 0) {
                    this.displayError('interests', t('fillAllFieldsAlert'));
                    isValid = false;
                }
                break;
            case 'step12_datingGoals':
                if (this.app.state.userData.datingGoals.length === 0) {
                    this.displayError('datingGoals', t('fillAllFieldsAlert'));
                    isValid = false;
                }
                break;
            case 'step13_preference':
                if (!this.app.state.userData.preference) {
                    this.displayError('preference', t('fillAllFieldsAlert'));
                    isValid = false;
                }
                break;
            case 'step15_aboutYou':
                const userDescriptionInput = document.getElementById('userDescription');
                const userDescription = userDescriptionInput.value.trim();
                if (!userDescription) {
                    this.displayError('userDescription', t('fillAllFieldsAlert'));
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
                document.querySelectorAll('[data-gender]').forEach(t => {
                    t.classList.remove('selected');
                    t.setAttribute('aria-checked', 'false');
                });
                e.currentTarget.classList.add('selected');
                e.currentTarget.setAttribute('aria-checked', 'true');
                this.app.state.userData.gender = e.currentTarget.dataset.gender;
                this.displayError('gender', ''); // Clear error on selection
            });
            tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            });
        });

        const nextStep3Btn = document.getElementById('nextStep3');
        if (nextStep3Btn) nextStep3Btn.onclick = () => this.nextStep();
        const prevStep3Btn = document.getElementById('prevStep3');
        if (prevStep3Btn) prevStep3Btn.onclick = () => this.prevStep();
        const userCityInput = document.getElementById('userCity');
        if (userCityInput) {
            userCityInput.addEventListener('input', () => this.displayError('userCity', ''));
        }


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
            this.displayError('dob', ''); // Clear error on input
        };
        if (dobDay) dobDay.addEventListener('input', updateZodiac);
        if (dobMonth) dobMonth.addEventListener('input', updateZodiac);
        if (dobYear) dobYear.addEventListener('input', updateZodiac);
        updateZodiac();

        // НОВЫЕ ОБРАБОТЧИКИ ДЛЯ РАСШИРЕННЫХ ПОЛЕЙ
        const nextStep5Btn = document.getElementById('nextStep5');
        if (nextStep5Btn) nextStep5Btn.onclick = () => this.nextStep();
        const prevStep5Btn = document.getElementById('prevStep5');
        if (prevStep5Btn) prevStep5Btn.onclick = () => this.prevStep();
        // Education and Profession fields are optional, no specific validation needed here.

        const nextStep6Btn = document.getElementById('nextStep6');
        if (nextStep6Btn) nextStep6Btn.onclick = () => this.nextStep();
        const prevStep6Btn = document.getElementById('prevStep6');
        if (prevStep6Btn) prevStep6Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-bad-habit]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const option = e.currentTarget.dataset.badHabit;
                const isSelected = e.currentTarget.classList.contains('selected');
                if (isSelected) {
                    e.currentTarget.classList.remove('selected');
                    e.currentTarget.setAttribute('aria-checked', 'false');
                    this.app.state.userData.badHabits = this.app.state.userData.badHabits.filter(i => i !== option);
                } else {
                    // Если выбрано "Нет", то другие не могут быть выбраны
                    if (option === 'none') {
                        this.app.state.userData.badHabits = ['none'];
                        document.querySelectorAll('[data-bad-habit]').forEach(t => {
                            t.classList.remove('selected');
                            t.setAttribute('aria-checked', 'false');
                        });
                        e.currentTarget.classList.add('selected');
                        e.currentTarget.setAttribute('aria-checked', 'true');
                    } else {
                        // Если выбрано что-то другое, убираем "Нет"
                        if (this.app.state.userData.badHabits.includes('none')) {
                            this.app.state.userData.badHabits = this.app.state.userData.badHabits.filter(i => i !== 'none');
                            document.querySelector('[data-bad-habit="none"]').classList.remove('selected');
                            document.querySelector('[data-bad-habit="none"]').setAttribute('aria-checked', 'false');
                        }
                        e.currentTarget.classList.add('selected');
                        e.currentTarget.setAttribute('aria-checked', 'true');
                        this.app.state.userData.badHabits.push(option);
                    }
                }
            });
            tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            });
        });

        const nextStep7Btn = document.getElementById('nextStep7');
        if (nextStep7Btn) nextStep7Btn.onclick = () => this.nextStep();
        const prevStep7Btn = document.getElementById('prevStep7');
        if (prevStep7Btn) prevStep7Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-children]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                document.querySelectorAll('[data-children]').forEach(t => {
                    t.classList.remove('selected');
                    t.setAttribute('aria-checked', 'false');
                });
                e.currentTarget.classList.add('selected');
                e.currentTarget.setAttribute('aria-checked', 'true');
                this.app.state.userData.children = e.currentTarget.dataset.children;
            });
            tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            });
        });

        const nextStep8Btn = document.getElementById('nextStep8');
        if (nextStep8Btn) nextStep8Btn.onclick = () => this.nextStep();
        const prevStep8Btn = document.getElementById('prevStep8');
        if (prevStep8Btn) prevStep8Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-pets]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const option = e.currentTarget.dataset.pets;
                const isSelected = e.currentTarget.classList.contains('selected');
                if (isSelected) {
                    e.currentTarget.classList.remove('selected');
                    e.currentTarget.setAttribute('aria-checked', 'false');
                    this.app.state.userData.pets = this.app.state.userData.pets.filter(i => i !== option);
                } else {
                    if (option === 'no_pets') {
                        this.app.state.userData.pets = ['no_pets'];
                        document.querySelectorAll('[data-pets]').forEach(t => {
                            t.classList.remove('selected');
                            t.setAttribute('aria-checked', 'false');
                        });
                        e.currentTarget.classList.add('selected');
                        e.currentTarget.setAttribute('aria-checked', 'true');
                    } else {
                        if (this.app.state.userData.pets.includes('no_pets')) {
                            this.app.state.userData.pets = this.app.state.userData.pets.filter(i => i !== 'no_pets');
                            document.querySelector('[data-pets="no_pets"]').classList.remove('selected');
                            document.querySelector('[data-pets="no_pets"]').setAttribute('aria-checked', 'false');
                        }
                        e.currentTarget.classList.add('selected');
                        e.currentTarget.setAttribute('aria-checked', 'true');
                        this.app.state.userData.pets.push(option);
                    }
                }
            });
            tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            });
        });

        const nextStep9Btn = document.getElementById('nextStep9');
        if (nextStep9Btn) nextStep9Btn.onclick = () => this.nextStep();
        const prevStep9Btn = document.getElementById('prevStep9');
        if (prevStep9Btn) prevStep9Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-language]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const option = e.currentTarget.dataset.language;
                const isSelected = e.currentTarget.classList.contains('selected');
                if (isSelected) {
                    e.currentTarget.classList.remove('selected');
                    e.currentTarget.setAttribute('aria-checked', 'false');
                    this.app.state.userData.languages = this.app.state.userData.languages.filter(i => i !== option);
                } else {
                    e.currentTarget.classList.add('selected');
                    e.currentTarget.setAttribute('aria-checked', 'true');
                    this.app.state.userData.languages.push(option);
                }
            });
            tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            });
        });
        // КОНЕЦ НОВЫХ ОБРАБОТЧИКОВ

        const nextStep10Btn = document.getElementById('nextStep10');
        if (nextStep10Btn) nextStep10Btn.onclick = () => this.nextStep();
        const prevStep10Btn = document.getElementById('prevStep10');
        if (prevStep10Btn) prevStep10Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-looking-for]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const option = e.currentTarget.dataset.lookingFor;
                const isSelected = e.currentTarget.classList.contains('selected');

                if (isSelected) {
                    e.currentTarget.classList.remove('selected');
                    e.currentTarget.setAttribute('aria-checked', 'false');
                    this.app.state.userData.lookingFor = this.app.state.userData.lookingFor.filter(i => i !== option);
                } else {
                    e.currentTarget.classList.add('selected');
                    e.currentTarget.setAttribute('aria-checked', 'true');
                    this.app.state.userData.lookingFor.push(option);
                }
                this.displayError('lookingFor', ''); // Clear error on selection
            });
            tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            });
        });

        const nextStep11Btn = document.getElementById('nextStep11');
        if (nextStep11Btn) nextStep11Btn.onclick = () => this.nextStep();
        const prevStep11Btn = document.getElementById('prevStep11');
        if (prevStep11Btn) prevStep11Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-interest]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const interestId = e.currentTarget.dataset.interest;
                const isSelected = e.currentTarget.classList.contains('selected');

                if (isSelected) {
                    e.currentTarget.classList.remove('selected');
                    e.currentTarget.setAttribute('aria-checked', 'false');
                    this.app.state.userData.interests = this.app.state.userData.interests.filter(i => i !== interestId);
                } else {
                    if (this.app.state.userData.interests.length < this.app.config.maxInterests) {
                        e.currentTarget.classList.add('selected');
                        e.currentTarget.setAttribute('aria-checked', 'true');
                        this.app.state.userData.interests.push(interestId);
                    } else {
                        this.displayError('interests', this.app.translate('maxInterestsAlert', { maxInterests: this.app.config.maxInterests }));
                    }
                }
                if (this.app.state.userData.interests.length > 0) {
                    this.displayError('interests', ''); // Clear error if at least one is selected
                }
            });
            tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            });
        });

        // НОВЫЙ ОБРАБОТЧИК ДЛЯ ЦЕЛЕЙ ЗНАКОМСТВА
        const nextStep12Btn = document.getElementById('nextStep12');
        if (nextStep12Btn) nextStep12Btn.onclick = () => this.nextStep();
        const prevStep12Btn = document.getElementById('prevStep12');
        if (prevStep12Btn) prevStep12Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-dating-goal]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const option = e.currentTarget.dataset.datingGoal;
                const isSelected = e.currentTarget.classList.contains('selected');
                if (isSelected) {
                    e.currentTarget.classList.remove('selected');
                    e.currentTarget.setAttribute('aria-checked', 'false');
                    this.app.state.userData.datingGoals = this.app.state.userData.datingGoals.filter(i => i !== option);
                } else {
                    e.currentTarget.classList.add('selected');
                    e.currentTarget.setAttribute('aria-checked', 'true');
                    this.app.state.userData.datingGoals.push(option);
                }
                this.displayError('datingGoals', ''); // Clear error on selection
            });
            tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            });
        });
        // КОНЕЦ НОВОГО ОБРАБОТЧИКА

        const nextStep13Btn = document.getElementById('nextStep13');
        if (nextStep13Btn) nextStep13Btn.onclick = () => this.nextStep();
        const prevStep13Btn = document.getElementById('prevStep13');
        if (prevStep13Btn) prevStep13Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-preference]').forEach(tag => {
            tag.addEventListener('click', (e) => {
                document.querySelectorAll('[data-preference]').forEach(t => {
                    t.classList.remove('selected');
                    t.setAttribute('aria-checked', 'false');
                });
                e.currentTarget.classList.add('selected');
                e.currentTarget.setAttribute('aria-checked', 'true');
                this.app.state.userData.preference = e.currentTarget.dataset.preference;
                this.displayError('preference', ''); // Clear error on selection
            });
            tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            });
        });

        const nextStep14Btn = document.getElementById('nextStep14');
        if (nextStep14Btn) nextStep14Btn.onclick = () => this.nextStep();
        const prevStep14Btn = document.getElementById('prevStep14');
        if (prevStep14Btn) prevStep14Btn.onclick = () => this.prevStep();
        document.querySelectorAll('[data-color]').forEach(colorOption => {
            colorOption.addEventListener('click', (e) => {
                const selectedColor = e.currentTarget.dataset.color;
                this.app.state.userData.profileColor = selectedColor;
                this.updateColorPalette(selectedColor);
                this.app.setAppThemeColor(selectedColor); // Apply to app theme
                const customColorInput = document.getElementById('customColor');
                if (customColorInput) customColorInput.value = selectedColor;
            });
            colorOption.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
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


        const nextStep15Btn = document.getElementById('nextStep15');
        if (nextStep15Btn) nextStep15Btn.onclick = () => this.nextStep();
        const prevStep15Btn = document.getElementById('prevStep15');
        if (prevStep15Btn) prevStep15Btn.onclick = () => this.prevStep();
        const userDescriptionInput = document.getElementById('userDescription');
        if (userDescriptionInput) {
            userDescriptionInput.addEventListener('input', () => this.displayError('userDescription', ''));
        }

        const saveProfileBtn = document.getElementById('saveProfileBtn');
        if (saveProfileBtn) saveProfileBtn.onclick = () => this.saveProfile();
        const prevStep16Btn = document.getElementById('prevStep16');
        if (prevStep16Btn) prevStep16Btn.onclick = () => this.prevStep();
    }

    updateColorPalette(color) {
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
            option.setAttribute('aria-checked', 'false');
            if (option.dataset.color === color) {
                option.classList.add('selected');
                option.setAttribute('aria-checked', 'true');
            }
        });
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

        // НОВЫЕ ШАГИ - ОБНОВЛЕНИЕ ТЕКСТА
        const step5EducationProfession = document.querySelector('#step5_education_profession');
        if (step5EducationProfession) {
            step5EducationProfession.querySelector('.section-title').textContent = `${t('education')}/${t('profession')}`;
            step5EducationProfession.querySelector('.section-description').textContent = t('registrationDescription');
            step5EducationProfession.querySelector('#userEducation').placeholder = t('yourEducation');
            step5EducationProfession.querySelector('#userProfession').placeholder = t('yourProfession');
            step5EducationProfession.querySelector('#nextStep5').textContent = t('next');
            step5EducationProfession.querySelector('#prevStep5').textContent = t('back');
        }

        const step6BadHabits = document.querySelector('#step6_badHabits');
        if (step6BadHabits) {
            step6BadHabits.querySelector('.section-title').textContent = t('yourBadHabits');
            step6BadHabits.querySelector('.section-description').textContent = t('registrationDescription');
            step6BadHabits.querySelector('#nextStep6').textContent = t('next');
            step6BadHabits.querySelector('#prevStep6').textContent = t('back');
            step6BadHabits.querySelectorAll('[data-bad-habit]').forEach(tag => {
                const optionId = tag.dataset.badHabit;
                const option = this.app.config.badHabitsOptions.find(o => o.id === optionId);
                if (option) {
                    tag.innerHTML = `${option.emoji} ${t(option.id)}`;
                }
            });
        }

        const step7Children = document.querySelector('#step7_children');
        if (step7Children) {
            step7Children.querySelector('.section-title').textContent = t('yourChildrenStatus');
            step7Children.querySelector('.section-description').textContent = t('registrationDescription');
            step7Children.querySelector('#nextStep7').textContent = t('next');
            step7Children.querySelector('#prevStep7').textContent = t('back');
            step7Children.querySelectorAll('[data-children]').forEach(tag => {
                const optionId = tag.dataset.children;
                const option = this.app.config.childrenOptions.find(o => o.id === optionId);
                if (option) {
                    tag.innerHTML = `${option.emoji} ${t(option.id)}`;
                }
            });
        }

        const step8Pets = document.querySelector('#step8_pets');
        if (step8Pets) {
            step8Pets.querySelector('.section-title').textContent = t('yourPets');
            step8Pets.querySelector('.section-description').textContent = t('registrationDescription');
            step8Pets.querySelector('#nextStep8').textContent = t('next');
            step8Pets.querySelector('#prevStep8').textContent = t('back');
            step8Pets.querySelectorAll('[data-pets]').forEach(tag => {
                const optionId = tag.dataset.pets;
                const option = this.app.config.petsOptions.find(o => o.id === optionId);
                if (option) {
                    tag.innerHTML = `${option.emoji} ${t(option.id)}`;
                }
            });
        }

        const step9Languages = document.querySelector('#step9_languages');
        if (step9Languages) {
            step9Languages.querySelector('.section-title').textContent = t('yourLanguages');
            step9Languages.querySelector('.section-description').textContent = t('registrationDescription');
            step9Languages.querySelector('#nextStep9').textContent = t('next');
            step9Languages.querySelector('#prevStep9').textContent = t('back');
            step9Languages.querySelectorAll('[data-language]').forEach(tag => {
                const optionId = tag.dataset.language;
                const option = this.app.config.languagesOptions.find(o => o.id === optionId);
                if (option) {
                    tag.innerHTML = `${option.emoji} ${t(option.id)}`;
                }
            });
        }
        // КОНЕЦ НОВЫХ ШАГОВ

        const step10LookingFor = document.querySelector('#step10_lookingFor');
        if (step10LookingFor) {
            step10LookingFor.querySelector('.section-title').textContent = t('whatAreYouLookingFor');
            step10LookingFor.querySelector('.section-description').textContent = t('registrationDescription');
            step10LookingFor.querySelector('#nextStep10').textContent = t('next');
            step10LookingFor.querySelector('#prevStep10').textContent = t('back');
            step10LookingFor.querySelectorAll('[data-looking-for]').forEach(tag => {
                const optionId = tag.dataset.lookingFor;
                const option = this.app.config.lookingForOptions.find(o => o.id === optionId);
                if (option) {
                    tag.innerHTML = `${option.emoji} ${t(option.id)}`;
                }
            });
        }

        const step11Interests = document.querySelector('#step11_interests');
        if (step11Interests) {
            step11Interests.querySelector('.section-title').textContent = t('yourInterests');
            step11Interests.querySelector('.section-description').textContent = t('registrationDescription');
            step11Interests.querySelector('#nextStep11').textContent = t('next');
            step11Interests.querySelector('#prevStep11').textContent = t('back');
            step11Interests.querySelectorAll('[data-interest]').forEach(tag => {
                const interestId = tag.dataset.interest;
                const interest = this.app.config.interests.find(i => i.id === interestId);
                if (interest) {
                    tag.innerHTML = `${interest.emoji} ${t(interest.id)}`;
                }
            });
        }

        // НОВЫЙ ШАГ - ЦЕЛИ ЗНАКОМСТВА
        const step12DatingGoals = document.querySelector('#step12_datingGoals');
        if (step12DatingGoals) {
            step12DatingGoals.querySelector('.section-title').textContent = t('yourDatingGoals');
            step12DatingGoals.querySelector('.section-description').textContent = t('registrationDescription');
            step12DatingGoals.querySelector('#nextStep12').textContent = t('next');
            step12DatingGoals.querySelector('#prevStep12').textContent = t('back');
            step12DatingGoals.querySelectorAll('[data-dating-goal]').forEach(tag => {
                const optionId = tag.dataset.datingGoal;
                const option = this.app.config.datingGoalsOptions.find(o => o.id === optionId);
                if (option) {
                    tag.innerHTML = `${option.emoji} ${t(option.id)}`;
                }
            });
        }
        // КОНЕЦ НОВОГО ШАГА

        const step13Preference = document.querySelector('#step13_preference');
        if (step13Preference) {
            step13Preference.querySelector('.section-title').textContent = t('whoAreYouLookingFor');
            step13Preference.querySelector('.section-description').textContent = t('registrationDescription');
            step13Preference.querySelector('#nextStep13').textContent = t('next');
            step13Preference.querySelector('#prevStep13').textContent = t('back');
            step13Preference.querySelectorAll('[data-preference]').forEach(tag => {
                const preferenceId = tag.dataset.preference;
                const preference = this.app.config.preferenceOptions.find(p => p.id === preferenceId);
                if (preference) {
                    tag.innerHTML = `${preference.emoji} ${t(preference.id)}`;
                }
            });
        }

        const step14ProfileColor = document.querySelector('#step14_profileColor');
        if (step14ProfileColor) {
            step14ProfileColor.querySelector('.section-title').textContent = t('profileColor');
            step14ProfileColor.querySelector('.section-description').textContent = t('registrationDescription');
            step14ProfileColor.querySelector('.color-custom label').textContent = t('orChooseYourColor');
            step14ProfileColor.querySelector('#nextStep14').textContent = t('next');
            step14ProfileColor.querySelector('#prevStep14').textContent = t('back');
        }

        const step15AboutYou = document.querySelector('#step15_aboutYou');
        if (step15AboutYou) {
            step15AboutYou.querySelector('.section-title').textContent = t('aboutYou');
            step15AboutYou.querySelector('.section-description').textContent = t('registrationDescription');
            step15AboutYou.querySelector('#userDescription').placeholder = t('aboutYouPlaceholder');
            step15AboutYou.querySelector('#nextStep15').textContent = t('next');
            step15AboutYou.querySelector('#prevStep15').textContent = t('back');
        }

        const step16Save = document.querySelector('#step16_save');
        if (step16Save) {
            step16Save.querySelector('.section-title').textContent = t('saveProfile');
            step16Save.querySelector('.section-description').textContent = t('registrationDescription');
            step16Save.querySelector('#saveProfileBtn').textContent = t('saveProfile');
            step16Save.querySelector('#prevStep16').textContent = t('back');
        }
    }
}

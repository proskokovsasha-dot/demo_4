// assets/js/components/settings.js

class SettingsHandler {
    constructor(app) {
        this.app = app;
        this.elements = {}; 
    }

    renderSettings() {
        const t = (key) => this.app.translate(key);

        this.app.elements.settingsScreen.innerHTML = `
            <div class="settings-container">
                <h2 class="section-title">${t('settings')}</h2>
                <p class="section-description">${t('yourChatsDescription')}</p>

                <!-- Language Settings Card -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <line x1="12" y1="18" x2="12" y2="22"></line>
                            <line x1="12" y1="2" x2="12" y2="6"></line>
                            <line x1="4.93" y1="10.93" x2="7.76" y2="13.76"></line>
                            <line x1="16.24" y1="10.24" x2="19.07" y2="13.07"></line>
                            <line x1="2" y1="12" x2="6" y2="12"></line>
                            <line x1="18" y1="12" x2="22" y2="12"></line>
                        </svg>
                        <h3 class="title">${t('languageSelection')}</h3>
                    </div>
                    <p class="settings-card-description">${t('selectLanguage')}.</p>
                    <div class="language-selector">
                        <label for="languageSelect">${t('selectLanguage')}:</label>
                        <select id="languageSelect" class="language-select">
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>

                <!-- Profile Color Settings Card -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0L12 2.69z"></path>
                        </svg>
                        <h3 class="title">${t('profileColorSettings')}</h3>
                    </div>
                    <p class="settings-card-description">${t('orChooseYourColor')}.</p>
                    <div class="settings-color-picker">
                        <div class="settings-color-palette" id="settingsColorPalette">
                            ${this.app.config.colors.map(color => `
                                <div class="settings-color-option ${this.app.state.userData.profileColor === color ? 'selected' : ''}"
                                     style="background-color: ${color}"
                                     data-color="${color}"></div>
                            `).join('')}
                        </div>
                        <div class="settings-color-custom">
                            <input type="color" id="settingsCustomColor" value="${this.app.state.userData.profileColor}">
                            <label>${t('orChooseYourColor')}</label>
                        </div>
                    </div>
                </div>

                <!-- Danger Zone Card -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <h3 class="title">Danger Zone</h3>
                    </div>
                    <p class="settings-card-description">${t('confirmClearData')}</p>
                    <button class="btn settings-clear-data-btn" id="clearDataBtn">${t('clearProfileData')}</button>
                </div>
            </div>
        `;

        this.initElements();
        this.bindEvents();
        this.elements.languageSelect.value = this.app.state.currentLanguage;
        this.updateColorSelection(this.app.state.userData.profileColor);
    }

    initElements() {
        this.elements = {
            settingsScreen: document.getElementById('settingsScreen'),
            clearDataBtn: document.getElementById('clearDataBtn'),
            languageSelect: document.getElementById('languageSelect'),
            colorPalette: document.getElementById('settingsColorPalette'),
            customColorInput: document.getElementById('settingsCustomColor'),
        };
    }

    bindEvents() {
        if (this.elements.clearDataBtn) {
            if (this.elements.clearDataBtn._hasClickListener) {
                this.elements.clearDataBtn.removeEventListener('click', this.elements.clearDataBtn._hasClickListener);
            }
            const newClearDataHandler = () => {
                if (confirm(this.app.translate('confirmClearData'))) {
                    this.app.clearAllData();
                }
            };
            this.elements.clearDataBtn.addEventListener('click', newClearDataHandler);
            this.elements.clearDataBtn._hasClickListener = newClearDataHandler;
        }

        if (this.elements.languageSelect) {
            if (this.elements.languageSelect._hasChangeListener) {
                this.elements.languageSelect.removeEventListener('change', this.elements.languageSelect._hasChangeListener);
            }
            const newChangeHandler = (e) => {
                this.app.setLanguage(e.target.value);
            };
            this.elements.languageSelect.addEventListener('change', newChangeHandler);
            this.elements.languageSelect._hasChangeListener = newChangeHandler;
        }

        if (this.elements.colorPalette) {
            this.elements.colorPalette.querySelectorAll('.settings-color-option').forEach(option => {
                if (option._hasClickListener) {
                    option.removeEventListener('click', option._hasClickListener);
                }
                const newColorClickHandler = (e) => {
                    const selectedColor = e.currentTarget.dataset.color;
                    this.app.state.userData.profileColor = selectedColor;
                    this.updateColorSelection(selectedColor);
                    this.app.setAppThemeColor(selectedColor); // Apply to app theme
                    localStorage.setItem('datingProfile', JSON.stringify(this.app.state.userData));
                };
                option.addEventListener('click', newColorClickHandler);
                option._hasClickListener = newColorClickHandler;
            });
        }

        if (this.elements.customColorInput) {
            if (this.elements.customColorInput._hasInputListener) {
                this.elements.customColorInput.removeEventListener('input', this.elements.customColorInput._hasInputListener);
            }
            const newCustomColorInputHandler = (e) => {
                const selectedColor = e.target.value;
                this.app.state.userData.profileColor = selectedColor;
                this.updateColorSelection(selectedColor);
                this.app.setAppThemeColor(selectedColor); // Apply to app theme
                localStorage.setItem('datingProfile', JSON.stringify(this.app.state.userData));
            };
            this.elements.customColorInput.addEventListener('input', newCustomColorInputHandler);
            this.elements.customColorInput._hasInputListener = newCustomColorInputHandler;
        }
    }

    updateColorSelection(selectedColor) {
        if (this.elements.colorPalette) {
            this.elements.colorPalette.querySelectorAll('.settings-color-option').forEach(option => {
                option.classList.remove('selected');
                if (option.dataset.color === selectedColor) {
                    option.classList.add('selected');
                }
            });
        }
        if (this.elements.customColorInput) {
            this.elements.customColorInput.value = selectedColor;
        }
    }
}

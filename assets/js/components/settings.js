// assets/js/components/settings.js

class SettingsHandler {
    constructor(app) {
        this.app = app;
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.elements = {
            settingsScreen: document.getElementById('settingsScreen'),
            clearDataBtn: document.getElementById('clearDataBtn'),
        };
    }

    bindEvents() {
        // Event listener for clear data button is already in app.js
    }

    renderSettings() {
        const t = (key) => this.app.translate(key);

        this.elements.settingsScreen.innerHTML = `
            <h2 class="section-title">${t('settings')}</h2>
            <p class="section-description">${t('yourChatsDescription')}</p>

            <div class="language-selector">
                <label for="languageSelect">${t('selectLanguage')}:</label>
                <select id="languageSelect" class="language-select">
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                </select>
            </div>

            <button class="btn btn-secondary" id="clearDataBtn">${t('clearProfileData')}</button>
        `;

        // Re-bind clear data button after re-rendering settings screen
        const clearDataBtn = document.getElementById('clearDataBtn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => {
                if (confirm(this.app.translate('confirmClearData'))) {
                    this.app.clearAllData();
                }
            });
        }

        // Set current language in the select box
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.app.state.currentLanguage;
            languageSelect.addEventListener('change', (e) => {
                this.app.setLanguage(e.target.value);
            });
        }
    }
}

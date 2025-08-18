// assets/js/components/chat.js

class ChatHandler {
    constructor(app) {
        this.app = app;
        this.elements = {};
        this.activeChatPartner = null;
        this.chats = {};
        this.blockedUsers = this.app.state.blockedUsers; // Получаем список заблокированных пользователей
        this.initElements();
        this.bindEvents();
        this.loadChats(); // НОВОЕ: Загрузка чатов при инициализации
        this.simulateIncomingMessages(); // НОВОЕ: Симуляция входящих сообщений
    }

    initElements() {
        this.elements = {
            chatListContainer: document.getElementById('chatList'),
            noChatsMessage: document.getElementById('noChatsMessage'),
            activeChatContainer: document.getElementById('activeChatContainer'),
            backToChatListBtn: document.getElementById('backToChatListBtn'),
            chatPartnerAvatar: document.getElementById('chatPartnerAvatar'),
            chatPartnerName: document.getElementById('chatPartnerName'),
            messagesContainer: document.getElementById('messagesContainer'),
            messageInput: document.getElementById('messageInput'),
            sendMessageBtn: document.getElementById('sendMessageBtn'),
            blockUserBtn: document.getElementById('blockUserBtn'), // НОВОЕ: Кнопка блокировки
            sendPhotoBtn: document.getElementById('sendPhotoBtn'), // НОВОЕ: Кнопка отправки фото
            sendEmojiBtn: document.getElementById('sendEmojiBtn'), // НОВОЕ: Кнопка отправки эмодзи
        };
    }

    bindEvents() {
        if (this.elements.backToChatListBtn) {
            this.elements.backToChatListBtn.addEventListener('click', () => this.showChatList());
        }

        if (this.elements.sendMessageBtn) {
            this.elements.sendMessageBtn.addEventListener('click', () => this.sendMessage());
        }

        if (this.elements.messageInput) {
            this.elements.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            // Debounce the input event for textarea resizing
            const debounce = (func, delay) => {
                let timeout;
                return function(...args) {
                    const context = this;
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(context, args), delay);
                };
            };
            this.elements.messageInput.addEventListener('input', debounce(() => {
                this.elements.messageInput.style.height = 'auto';
                this.elements.messageInput.style.height = this.elements.messageInput.scrollHeight + 'px';
            }, 100)); // Debounce by 100ms
        }

        // НОВОЕ: Обработчики для кнопок чата
        if (this.elements.blockUserBtn) {
            this.elements.blockUserBtn.addEventListener('click', () => this.blockActiveChatPartner());
        }
        if (this.elements.sendPhotoBtn) {
            this.elements.sendPhotoBtn.addEventListener('click', () => this.sendMediaMessage('photo'));
        }
        if (this.elements.sendEmojiBtn) {
            this.elements.sendEmojiBtn.addEventListener('click', () => this.openEmojiPicker()); // Заглушка для выбора эмодзи
        }
    }

    loadChats() {
        const savedChats = localStorage.getItem('datingAppChats');
        if (savedChats) {
            try {
                this.chats = JSON.parse(savedChats);
                // Убедимся, что у каждого чата есть свойство unreadCount
                for (const chatId in this.chats) {
                    if (this.chats.hasOwnProperty(chatId) && !this.chats[chatId].hasOwnProperty('unreadCount')) {
                        this.chats[chatId].unreadCount = 0;
                    }
                }
            } catch (e) {
                console.error('Error loading chats:', e);
                localStorage.removeItem('datingAppChats');
            }
        }
    }

    saveChats() {
        localStorage.setItem('datingAppChats', JSON.stringify(this.chats));
    }

    showChatListScreen() {
        this.renderChatList();
        this.elements.activeChatContainer.classList.remove('active');
        this.elements.chatListContainer.style.display = 'flex';
        this.elements.noChatsMessage.style.display = Object.keys(this.chats).length === 0 ? 'block' : 'none';
        this.app.elements.topNavigation.style.display = 'flex'; 
        this.updateChatTexts();
        this.updateTotalUnreadCount(); // НОВОЕ: Обновляем общий счетчик при показе списка чатов
    }

    renderChatList() {
        this.elements.chatListContainer.innerHTML = '';

        const chatIds = Object.keys(this.chats).filter(chatId => !this.app.isUserBlocked(chatId)); // Фильтруем заблокированных

        if (chatIds.length === 0) {
            this.elements.noChatsMessage.style.display = 'block';
            this.elements.noChatsMessage.innerHTML = `<p>${this.app.translate('noActiveChats')}</p>`;
            return;
        } else {
            this.elements.noChatsMessage.style.display = 'none';
        }

        chatIds.forEach(chatId => {
            const chatData = this.chats[chatId];
            const lastMessage = chatData.messages.length > 0 ? chatData.messages[chatData.messages.length - 1] : null;
            const lastMessageText = lastMessage ? (lastMessage.type === 'text' ? lastMessage.text : `[${this.app.translate('sendPhoto')}]`) : this.app.translate('typeMessage'); // НОВОЕ: Отображение типа медиа
            const lastMessageTime = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            chatItem.dataset.chatId = chatId;
            chatItem.setAttribute('role', 'listitem'); // ARIA
            chatItem.setAttribute('tabindex', '0'); // Make focusable
            chatItem.setAttribute('aria-label', `${chatData.partner.name}, ${chatData.partner.age}. Последнее сообщение: ${lastMessageText}`); // ARIA
            chatItem.innerHTML = `
                <div class="chat-avatar" style="background-image: url('${chatData.partner.avatar}');"></div>
                <div class="chat-info">
                    <div class="chat-name">${chatData.partner.name}, ${chatData.partner.age}</div>
                    <div class="chat-last-message">${lastMessageText}</div>
                </div>
                <div class="chat-time">${lastMessageTime}</div>
                ${chatData.unreadCount > 0 ? `<div class="new-messages-indicator">${chatData.unreadCount}</div>` : ''}
            `;
            chatItem.addEventListener('click', () => this.openChat(chatId));
            chatItem.addEventListener('keydown', (e) => { // Keyboard navigation
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openChat(chatId);
                }
            });
            this.elements.chatListContainer.appendChild(chatItem);
        });
    }

    openChat(chatId) {
        if (this.app.isUserBlocked(chatId)) {
            console.warn(`Attempted to open chat with blocked user: ${chatId}`);
            return;
        }

        this.activeChatPartner = this.chats[chatId].partner;
        if (!this.activeChatPartner) {
            console.error('Chat partner not found for ID:', chatId);
            return;
        }

        this.elements.chatPartnerAvatar.style.backgroundImage = `url('${this.activeChatPartner.avatar}')`;
        this.elements.chatPartnerName.textContent = `${this.activeChatPartner.name}, ${this.activeChatPartner.age}`;
        
        // НОВОЕ: Сброс счетчика непрочитанных сообщений для текущего чата
        if (this.chats[chatId].unreadCount > 0) {
            this.chats[chatId].unreadCount = 0;
            this.updateTotalUnreadCount();
            this.saveChats();
        }

        this.elements.chatListContainer.style.display = 'none';
        this.elements.activeChatContainer.classList.add('active');
        this.renderMessages();
        this.scrollToBottom();
        this.app.elements.topNavigation.style.display = 'none'; 
        this.updateChatTexts();
        this.elements.messageInput.focus(); // Focus input field
    }

    renderMessages() {
        this.elements.messagesContainer.innerHTML = '';
        const messages = this.chats[this.activeChatPartner.id].messages;

        messages.forEach(msg => {
            const messageBubble = document.createElement('div');
            messageBubble.className = `message-bubble ${msg.sender === 'me' ? 'sent' : 'received'} ${msg.type === 'media' ? 'media' : ''}`; // НОВОЕ: Класс для медиа
            
            if (msg.type === 'text') {
                messageBubble.textContent = msg.text;
            } else if (msg.type === 'media') {
                messageBubble.innerHTML = `
                    <img src="${msg.url}" alt="${msg.caption || 'Image'}">
                    ${msg.caption ? `<div class="media-caption">${msg.caption}</div>` : ''}
                `;
            }

            messageBubble.setAttribute('role', 'listitem'); // ARIA

            // НОВОЕ: Статус сообщения
            if (msg.sender === 'me') {
                const statusDiv = document.createElement('div');
                statusDiv.className = `message-status ${msg.status === 'read' ? 'read' : ''}`;
                statusDiv.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${msg.status === 'read' ? '<polyline points="20 6 9 17 4 12"></polyline><polyline points="16 6 10 12 14 16"></polyline>' : '<polyline points="20 6 9 17 4 12"></polyline>'}
                    </svg>
                    <span>${msg.status === 'read' ? this.app.translate('messageRead') : this.app.translate('messageDelivered')}</span>
                `;
                messageBubble.appendChild(statusDiv);
            }

            this.elements.messagesContainer.appendChild(messageBubble);
        });
    }

    sendMessage() {
        const messageText = this.elements.messageInput.value.trim();
        if (messageText === '' || !this.activeChatPartner) {
            return;
        }

        const newMessage = {
            text: messageText,
            sender: 'me',
            timestamp: new Date().toISOString(),
            status: 'delivered', // НОВОЕ: Статус сообщения
            type: 'text', // НОВОЕ: Тип сообщения
        };

        this.chats[this.activeChatPartner.id].messages.push(newMessage);
        this.renderMessages();
        this.scrollToBottom();
        this.elements.messageInput.value = '';
        this.elements.messageInput.style.height = 'auto';
        this.saveChats(); // НОВОЕ: Сохранение чатов
        this.simulatePartnerResponse(this.activeChatPartner.id); // НОВОЕ: Симуляция ответа
    }

    // НОВОЕ: Отправка медиа сообщений
    sendMediaMessage(type) {
        if (!this.activeChatPartner) return;

        let url = '';
        let caption = '';

        if (type === 'photo') {
            // Заглушка: в реальном приложении здесь будет логика загрузки фото
            url = `https://picsum.photos/seed/${Math.random()}/200/200`;
            caption = `Фото от ${this.app.state.userData.name}`;
        } else {
            return;
        }

        const newMediaMessage = {
            url: url,
            caption: caption,
            sender: 'me',
            timestamp: new Date().toISOString(),
            status: 'delivered',
            type: 'media',
        };

        this.chats[this.activeChatPartner.id].messages.push(newMediaMessage);
        this.renderMessages();
        this.scrollToBottom();
        this.saveChats();
        this.simulatePartnerResponse(this.activeChatPartner.id);
    }

    // НОВОЕ: Открытие выбора эмодзи (заглушка)
    openEmojiPicker() {
        // В реальном приложении здесь будет UI для выбора эмодзи/стикеров
        // Для примера, просто вставим случайный эмодзи
        const emojis = ['😊', '😂', '👍', '❤️', '🎉', '🔥', '😎', '👋', '🚀', '💡'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.elements.messageInput.value += randomEmoji;
        this.elements.messageInput.focus();
    }

    showChatList() {
        this.activeChatPartner = null;
        this.elements.activeChatContainer.classList.remove('active');
        this.showChatListScreen();
        this.app.elements.topNavigation.style.display = 'flex'; 
    }

    scrollToBottom() {
        this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
    }

    addChat(profile) {
        if (this.app.isUserBlocked(profile.id)) { // НОВОЕ: Не добавляем чат, если пользователь заблокирован
            console.log(`Cannot add chat with blocked user: ${profile.name}`);
            return;
        }
        if (!this.chats[profile.id]) {
            this.chats[profile.id] = {
                partner: { ...profile, avatar: `https://picsum.photos/seed/${profile.id}/50/50` },
                messages: [],
                unreadCount: 0, // НОВОЕ: Счетчик непрочитанных сообщений для каждого чата
            };
            console.log(`Новый чат добавлен с ${profile.name}`);
            this.saveChats(); // НОВОЕ: Сохранение чатов
            if (this.app.state.currentScreen === 'chat') {
                this.renderChatList();
            }
        }
    }

    updateChatTexts() {
        const chatScreen = document.getElementById('chatScreen');
        if (chatScreen) {
            const sectionTitle = chatScreen.querySelector('.section-title');
            if (sectionTitle) sectionTitle.textContent = this.app.translate('yourChats');
            const sectionDescription = chatScreen.querySelector('.section-description');
            if (sectionDescription) sectionDescription.textContent = this.app.translate('yourChatsDescription');
            const noChatsMessage = document.getElementById('noChatsMessage');
            if (noChatsMessage) noChatsMessage.innerHTML = `<p>${this.app.translate('noActiveChats')}</p>`;
        }

        const activeChatContainer = document.getElementById('activeChatContainer');
        if (activeChatContainer && activeChatContainer.classList.contains('active')) {
            const messageInput = document.getElementById('messageInput');
            if (messageInput) messageInput.placeholder = this.app.translate('typeMessage');
            const blockUserBtn = document.getElementById('blockUserBtn');
            if (blockUserBtn) blockUserBtn.setAttribute('aria-label', this.app.translate('blockUser'));
            const sendPhotoBtn = document.getElementById('sendPhotoBtn');
            if (sendPhotoBtn) sendPhotoBtn.setAttribute('aria-label', this.app.translate('sendPhoto'));
            const sendEmojiBtn = document.getElementById('sendEmojiBtn');
            if (sendEmojiBtn) sendEmojiBtn.setAttribute('aria-label', this.app.translate('sendEmoji'));
        }
        
        this.renderChatList();
    }

    // НОВОЕ: Симуляция входящих сообщений
    simulateIncomingMessages() {
        setInterval(() => {
            const chatIds = Object.keys(this.chats).filter(chatId => !this.app.isUserBlocked(chatId));
            if (chatIds.length > 0) {
                const randomChatId = chatIds[Math.floor(Math.random() * chatIds.length)];
                const chatData = this.chats[randomChatId];
                const messages = [
                    "Привет! Как дела?",
                    "Что нового?",
                    "Чем занимаешься?",
                    "Хорошего дня!",
                    "Как тебе приложение?",
                    "У меня все отлично, спасибо!",
                    "Надеюсь, у тебя тоже все хорошо.",
                    "Погода сегодня прекрасная, не так ли?",
                    "Слушал новую песню [название]? Мне очень понравилось!",
                    "Есть планы на выходные?",
                    "Кстати, видел [название фильма/сериала]? Рекомендую!",
                    "Как насчет встретиться как-нибудь?",
                    "Я сейчас занят(а), но скоро отвечу.",
                    "Отличная идея!",
                    "Согласен(на)!",
                    "Расскажи поподробнее.",
                    "Интересно!",
                    "Я тоже так думаю.",
                    "Это здорово!",
                    "Спасибо за сообщение!",
                ];
                const randomMessageText = messages[Math.floor(Math.random() * messages.length)];

                const newMessage = {
                    text: randomMessageText,
                    sender: 'partner',
                    timestamp: new Date().toISOString(),
                    status: 'delivered', // Для входящих сообщений всегда 'delivered'
                    type: 'text',
                };

                // Иногда отправляем медиа
                if (Math.random() < 0.2) { // 20% шанс отправить фото
                    newMessage.type = 'media';
                    newMessage.url = `https://picsum.photos/seed/${Math.random()}/200/200`;
                    newMessage.caption = `Фото от ${chatData.partner.name}`;
                }

                chatData.messages.push(newMessage);
                
                // Увеличиваем счетчик непрочитанных, если чат не активен
                if (this.activeChatPartner && this.activeChatPartner.id === randomChatId) {
                    // Если чат активен, сразу помечаем как прочитанное
                    newMessage.status = 'read';
                    this.renderMessages(); // Обновляем сообщения в активном чате
                    this.scrollToBottom();
                } else {
                    chatData.unreadCount++;
                    this.app.incrementUnreadMessages(); // Увеличиваем общий счетчик
                    this.renderChatList(); // Обновляем список чатов
                }
                this.saveChats();
            }
        }, 10000); // Каждые 10 секунд
    }

    // НОВОЕ: Симуляция ответа партнера
    simulatePartnerResponse(chatId) {
        const chatData = this.chats[chatId];
        if (!chatData || this.app.isUserBlocked(chatId)) return;

        // Симуляция "прочитано" через 3 секунды
        setTimeout(() => {
            const lastSentMessage = chatData.messages.slice().reverse().find(msg => msg.sender === 'me' && msg.status === 'delivered');
            if (lastSentMessage) {
                lastSentMessage.status = 'read';
                if (this.activeChatPartner && this.activeChatPartner.id === chatId) {
                    this.renderMessages();
                }
                this.saveChats();
            }
        }, 3000);

        // Симуляция ответа через 2-5 секунд
        setTimeout(() => {
            const messages = [
                "Отлично!",
                "Я тоже так думаю.",
                "Интересно!",
                "Спасибо!",
                "Хорошо, понял(а).",
                "👍",
                "😊",
                "😂",
                "Да, конечно!",
                "Нет, не думаю.",
            ];
            const randomMessageText = messages[Math.floor(Math.random() * messages.length)];

            const newMessage = {
                text: randomMessageText,
                sender: 'partner',
                timestamp: new Date().toISOString(),
                status: 'delivered',
                type: 'text',
            };

            // Иногда отправляем медиа
            if (Math.random() < 0.2) { // 20% шанс отправить фото
                newMessage.type = 'media';
                newMessage.url = `https://picsum.photos/seed/${Math.random()}/200/200`;
                newMessage.caption = `Фото от ${chatData.partner.name}`;
            }

            chatData.messages.push(newMessage);
            if (this.activeChatPartner && this.activeChatPartner.id === chatId) {
                this.renderMessages();
                this.scrollToBottom();
            } else {
                chatData.unreadCount++;
                this.app.incrementUnreadMessages();
                this.renderChatList();
            }
            this.saveChats();
        }, Math.random() * 3000 + 2000); // От 2 до 5 секунд
    }

    // НОВОЕ: Обновление общего счетчика непрочитанных сообщений
    updateTotalUnreadCount() {
        let totalUnread = 0;
        for (const chatId in this.chats) {
            if (this.chats.hasOwnProperty(chatId) && !this.app.isUserBlocked(chatId)) {
                totalUnread += this.chats[chatId].unreadCount;
            }
        }
        this.app.state.unreadMessagesCount = totalUnread;
        this.app.updateChatNotificationBadge();
    }

    // НОВОЕ: Блокировка пользователя
    blockActiveChatPartner() {
        if (!this.activeChatPartner) return;

        const partnerName = this.activeChatPartner.name;
        const confirmBlock = confirm(this.app.translate('confirmBlockUser', { name: partnerName }));

        if (confirmBlock) {
            this.app.blockUser(this.activeChatPartner.id);
            alert(this.app.translate('userBlocked', { name: partnerName }));
            this.showChatList(); // Вернуться к списку чатов
        }
    }
}

    
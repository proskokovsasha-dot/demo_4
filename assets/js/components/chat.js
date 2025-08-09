// assets/js/components/chat.js

class ChatHandler {
    constructor(app) {
        this.app = app;
        this.elements = {};
        this.activeChatPartner = null; // Текущий собеседник
        this.chats = {}; // Хранилище для сообщений по ID собеседника
        this.initElements();
        this.bindEvents();
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
            sendMessageBtn: document.getElementById('sendMessageBtn')
        };
    }

    bindEvents() {
        // Обработчик для кнопки "Назад" в активном чате
        if (this.elements.backToChatListBtn) {
            this.elements.backToChatListBtn.addEventListener('click', () => this.showChatList());
        }

        // Обработчик для отправки сообщения
        if (this.elements.sendMessageBtn) {
            this.elements.sendMessageBtn.addEventListener('click', () => this.sendMessage());
        }

        // Отправка сообщения по Enter
        if (this.elements.messageInput) {
            this.elements.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Предотвращаем перенос строки
                    this.sendMessage();
                }
            });
            // Автоматическое изменение высоты textarea
            this.elements.messageInput.addEventListener('input', () => {
                this.elements.messageInput.style.height = 'auto';
                this.elements.messageInput.style.height = this.elements.messageInput.scrollHeight + 'px';
            });
        }
    }

    // Метод для отображения списка чатов
    showChatListScreen() {
        this.renderChatList();
        this.elements.activeChatContainer.classList.remove('active');
        this.elements.chatListContainer.style.display = 'flex';
        this.elements.noChatsMessage.style.display = Object.keys(this.chats).length === 0 ? 'block' : 'none';
        // Убедимся, что верхнее меню видно при просмотре списка чатов
        this.app.elements.topNavigation.style.display = 'flex';
    }

    // Метод для рендеринга списка чатов
    renderChatList() {
        this.elements.chatListContainer.innerHTML = ''; // Очищаем текущий список

        const chatIds = Object.keys(this.chats);
        if (chatIds.length === 0) {
            this.elements.noChatsMessage.style.display = 'block';
            return;
        } else {
            this.elements.noChatsMessage.style.display = 'none';
        }

        chatIds.forEach(chatId => {
            const chatData = this.chats[chatId];
            const lastMessage = chatData.messages.length > 0 ? chatData.messages[chatData.messages.length - 1] : null;
            const lastMessageText = lastMessage ? lastMessage.text : 'Начните диалог...';
            const lastMessageTime = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            chatItem.dataset.chatId = chatId;
            chatItem.innerHTML = `
                <div class="chat-avatar" style="background-image: url('${chatData.partner.avatar}');"></div>
                <div class="chat-info">
                    <div class="chat-name">${chatData.partner.name}, ${chatData.partner.age}</div>
                    <div class="chat-last-message">${lastMessageText}</div>
                </div>
                <div class="chat-time">${lastMessageTime}</div>
            `;
            chatItem.addEventListener('click', () => this.openChat(chatId));
            this.elements.chatListContainer.appendChild(chatItem);
        });
    }

    // Метод для открытия конкретного чата
    openChat(chatId) {
        this.activeChatPartner = this.chats[chatId].partner;
        if (!this.activeChatPartner) {
            console.error('Chat partner not found for ID:', chatId);
            return;
        }

        this.elements.chatPartnerAvatar.style.backgroundImage = `url('${this.activeChatPartner.avatar}')`;
        this.elements.chatPartnerName.textContent = `${this.activeChatPartner.name}, ${this.activeChatPartner.age}`;
        
        this.elements.chatListContainer.style.display = 'none';
        this.elements.activeChatContainer.classList.add('active');
        this.renderMessages();
        this.scrollToBottom();
        // Скрываем верхнее навигационное меню при входе в чат
        this.app.elements.topNavigation.style.display = 'none';
    }

    // Метод для рендеринга сообщений в активном чате
    renderMessages() {
        this.elements.messagesContainer.innerHTML = ''; // Очищаем текущие сообщения
        const messages = this.chats[this.activeChatPartner.id].messages;

        messages.forEach(msg => {
            const messageBubble = document.createElement('div');
            messageBubble.className = `message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`;
            messageBubble.textContent = msg.text;
            this.elements.messagesContainer.appendChild(messageBubble);
        });
    }

    // Метод для отправки сообщения
    sendMessage() {
        const messageText = this.elements.messageInput.value.trim();
        if (messageText === '' || !this.activeChatPartner) {
            return;
        }

        const newMessage = {
            text: messageText,
            sender: 'me', // 'me' для отправленных сообщений
            timestamp: new Date().toISOString()
        };

        this.chats[this.activeChatPartner.id].messages.push(newMessage);
        this.renderMessages();
        this.scrollToBottom();
        this.elements.messageInput.value = ''; // Очищаем поле ввода
        this.elements.messageInput.style.height = 'auto'; // Сброс высоты textarea

        // Имитация ответа от собеседника через некоторое время
        setTimeout(() => {
            this.receiveMessage(this.activeChatPartner.id, `Привет, ${this.app.state.userData.name}! Я получил твое сообщение: "${messageText}"`);
        }, 1500);
    }

    // Метод для получения сообщения (имитация)
    receiveMessage(senderId, text) {
        if (!this.chats[senderId]) {
            // Если чата с таким собеседником нет, создаем его (например, если это первый контакт)
            // В реальном приложении здесь будет логика создания чата с новым пользователем
            console.warn(`Received message from unknown sender ${senderId}. Creating new chat.`);
            // Для демонстрации, если профиль не найден в likedProfiles, создадим заглушку
            const likedProfile = this.app.state.likedProfiles.find(p => p.id === senderId);
            if (likedProfile) {
                this.chats[senderId] = {
                    partner: likedProfile,
                    messages: []
                };
            } else {
                // Заглушка, если профиль не найден (в реальном приложении такого быть не должно)
                this.chats[senderId] = {
                    partner: {
                        id: senderId,
                        name: 'Неизвестный',
                        age: '??',
                        avatar: 'https://picsum.photos/seed/unknown/100/100'
                    },
                    messages: []
                };
            }
        }

        const receivedMessage = {
            text: text,
            sender: senderId, // ID собеседника для полученных сообщений
            timestamp: new Date().toISOString()
        };
        this.chats[senderId].messages.push(receivedMessage);

        // Если активный чат - это чат с отправителем, обновляем UI
        if (this.activeChatPartner && this.activeChatPartner.id === senderId) {
            this.renderMessages();
            this.scrollToBottom();
        } else {
            // В реальном приложении здесь можно показать уведомление о новом сообщении
            console.log(`Новое сообщение от ${this.chats[senderId].partner.name}: ${text}`);
            this.renderChatList(); // Обновить список чатов, чтобы показать новое сообщение
        }
    }

    // Метод для возврата к списку чатов
    showChatList() {
        this.activeChatPartner = null;
        this.elements.activeChatContainer.classList.remove('active');
        this.showChatListScreen(); // Показываем список чатов
        // Убедимся, что верхнее меню видно при возврате к списку чатов
        this.app.elements.topNavigation.style.display = 'flex';
    }

    // Прокрутка сообщений вниз
    scrollToBottom() {
        this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
    }

    // Метод для добавления нового чата (например, после лайка)
    addChat(profile) {
        if (!this.chats[profile.id]) {
            this.chats[profile.id] = {
                partner: profile,
                messages: []
            };
            console.log(`Новый чат добавлен с ${profile.name}`);
            // Если пользователь находится на экране чатов, обновить список
            if (this.app.state.currentScreen === 'chat') {
                this.renderChatList();
            }
        }
    }
}

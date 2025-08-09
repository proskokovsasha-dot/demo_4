// assets/js/components/chat.js

class ChatHandler {
    constructor(app) {
        this.app = app;
        this.elements = {};
        this.activeChatPartner = null;
        this.chats = {};
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
            this.elements.messageInput.addEventListener('input', () => {
                this.elements.messageInput.style.height = 'auto';
                this.elements.messageInput.style.height = this.elements.messageInput.scrollHeight + 'px';
            });
        }
    }

    showChatListScreen() {
        this.renderChatList();
        this.elements.activeChatContainer.classList.remove('active');
        this.elements.chatListContainer.style.display = 'flex';
        this.elements.noChatsMessage.style.display = Object.keys(this.chats).length === 0 ? 'block' : 'none';
        this.app.elements.topNavigation.style.display = 'flex';
    }

    renderChatList() {
        this.elements.chatListContainer.innerHTML = '';

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
        this.app.elements.topNavigation.style.display = 'none';
    }

    renderMessages() {
        this.elements.messagesContainer.innerHTML = '';
        const messages = this.chats[this.activeChatPartner.id].messages;

        messages.forEach(msg => {
            const messageBubble = document.createElement('div');
            messageBubble.className = `message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`;
            messageBubble.textContent = msg.text;
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
            timestamp: new Date().toISOString()
        };

        this.chats[this.activeChatPartner.id].messages.push(newMessage);
        this.renderMessages();
        this.scrollToBottom();
        this.elements.messageInput.value = '';
        this.elements.messageInput.style.height = 'auto';
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
        if (!this.chats[profile.id]) {
            this.chats[profile.id] = {
                partner: profile,
                messages: []
            };
            console.log(`Новый чат добавлен с ${profile.name}`);
            if (this.app.state.currentScreen === 'chat') {
                this.renderChatList();
            }
        }
    }
}

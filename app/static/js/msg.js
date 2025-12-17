const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const msg = chatInput.value.trim();
    if (!msg) return;

    // Mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.classList.add('message', 'user');
    userMsg.textContent = msg;
    chatMessages.appendChild(userMsg);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simula resposta do parceiro
    setTimeout(() => {
        const partnerMsg = document.createElement('div');
        partnerMsg.classList.add('message', 'partner');
        partnerMsg.textContent = 'Resposta automática do contratante...';
        chatMessages.appendChild(partnerMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
});

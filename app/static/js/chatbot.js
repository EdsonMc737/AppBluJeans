// Seleciona os elementos
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Pega o ID do modelo do atributo do form
const modeloId = chatForm.dataset.modeloId;

chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const msg = chatInput.value.trim();
    if (!msg) return;

    // Cria mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.classList.add('message', 'user');
    userMsg.textContent = msg;
    chatMessages.appendChild(userMsg);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        // Chamada para a rota Flask
        const res = await fetch(`/chat/${modeloId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg })
        });

        const data = await res.json();

        // Cria mensagem do bot
        const botMsg = document.createElement('div');
        botMsg.classList.add('message', 'partner');
        botMsg.textContent = data.response;
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (err) {
        console.error('Erro ao enviar mensagem:', err);
    }
});

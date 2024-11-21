document.getElementById('cadastro').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const animeEscolhido = document.getElementById('anime');
    const selectedOption = animeEscolhido.options[animeEscolhido.selectedIndex];

    const anime = {
        imagem: selectedOption.value,
        nome: selectedOption.dataset.nome
    };

    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    if (!regex.test(senha)) {
        alert('A senha deve conter no mínimo 8 caracteres, incluindo uma letra, um número e um caractere especial.');
        return;
    }

    const conta = {nome, email, senha, anime};

    const contas = JSON.parse(localStorage.getItem('contas')) || {};

    if (contas[email]) {
        alert('E-mail já cadastrado!');
        return;
    }

    contas[email] = conta;
    localStorage.setItem('contas', JSON.stringify(contas));

    alert('Conta cadastrada com sucesso!');
    window.location.href = 'login.html';
});
document.getElementById('login').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    const contas = JSON.parse(localStorage.getItem('contas')) || {};

    const conta = contas[email];

    if (conta && conta.senha === senha) {
        localStorage.setItem('logado', JSON.stringify(conta));
        alert('Login realizado com sucesso!');
        window.location.href = 'home.html';
    } else {
        alert('E-mail ou senha incorretos.');
    }
});
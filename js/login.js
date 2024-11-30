document.getElementById('login').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    const usuario = {
        email: email,
        password: senha
    };

    try {
        const response = await fetch('https://projetoweb-api.vercel.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('usuario', JSON.stringify(data.user));

            alert('Login realizado com sucesso!');
            window.location.href = 'home.html';
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'E-mail ou senha incorretos.');
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
        alert('Erro ao realizar login. Tente novamente mais tarde.');
    }
});
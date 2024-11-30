document.getElementById('cadastro').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const animeEscolhido = document.getElementById('anime');
    const selectedAnimeId = animeEscolhido.value;

    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    if (!regex.test(senha)) {
        alert('A senha deve conter no mínimo 8 caracteres, incluindo uma letra, um número e um caractere especial.');
        return;
    }

    const usuario = {
        name: nome,
        email: email,
        password: senha,
        anime_preference: selectedAnimeId
    };

    try {
        const response = await fetch('https://projetoweb-api.vercel.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message || 'Conta cadastrada com sucesso!');
            window.location.href = 'login.html';
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Erro ao registrar usuário.');
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
        alert('Erro ao registrar usuário. Tente novamente mais tarde.');
    }
});
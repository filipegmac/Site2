async function loadUserData() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você não está logado!');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('https://projetoweb-api.vercel.app/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();
            const { name, email, animes } = userData;

            document.getElementById('bemvindo').textContent += `${name}!`;
            document.getElementById('email').textContent = `Seu e-mail é: ${email}`;

            if (animes && animes.length > 0) {
                const anime = animes[0];
                document.getElementById('anime-image').src = anime.cover || '/img/default.webp';
                document.getElementById('anime-title').textContent = anime.title || 'Título não disponível';
            } else {
                document.getElementById('anime-title').textContent = 'Você ainda não escolheu um anime favorito.';
            }
        } else {
            alert('Erro ao carregar os dados do usuário. Faça login novamente.');
            logout();
        }
    } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
        alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
        logout();
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}

loadUserData();
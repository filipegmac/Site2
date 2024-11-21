const defaultImage = ';/img/default.webp';

function loadImage(src) {
    const img = new Image();
    img.src = src;
    img.onerror = function () {
        this.src = defaultImage;
    };
    return img;
}

const logado = JSON.parse(localStorage.getItem('logado'));

if (logado) {
    document.getElementById('bemvindo').textContent += `${logado.nome}!`;
    document.getElementById('email').textContent = `Seu e-mail é: ${logado.email}`;
    const img = loadImage(logado.anime.imagem);
    img.id = 'anime';
    const animeContainer = document.querySelector('.container');
    animeContainer.appendChild(img);
    const animeName = document.createElement('p');
    animeName.textContent = logado.anime.nome;
    animeName.style.textAlign = 'center';
    animeContainer.appendChild(animeName);

} else {
    alert('Você não está logado!');
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('logado');
    window.location.href = 'login.html';
}
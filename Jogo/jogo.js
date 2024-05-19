const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Carregar imagens
const background = new Image();
const playerImg = new Image();
const itemImg = new Image();
background.src = 'images/background.png';
playerImg.src = 'images/player.png';
itemImg.src = 'images/item.png';

// Variáveis do jogo
let player = { x: 375, y: 275, width: 50, height: 50 };
let items = [];
let score = 0;

// Função para desenhar o jogador
function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// Função para desenhar os itens
function drawItems() {
    items.forEach(item => {
        ctx.drawImage(itemImg, item.x, item.y, 30, 30);
    });
}

// Função para gerar itens aleatórios
function generateItem() {
    let x = Math.random() * (canvas.width - 30);
    let y = Math.random() * (canvas.height - 30);
    items.push({ x: x, y: y });
}

// Função para verificar colisão
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + 30 &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + 30 &&
           rect1.y + rect1.height > rect2.y;
}

// Função para atualizar o jogo
function updateGame() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawItems();

    // Verificar colisões
    items.forEach((item, index) => {
        if (checkCollision(player, item)) {
            items.splice(index, 1);
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
        }
    });
}

// Função para mover o jogador
function movePlayer(event) {
    const speed = 10;
    switch (event.key) {
        case 'ArrowUp':
            player.y = Math.max(0, player.y - speed);
            break;
        case 'ArrowDown':
            player.y = Math.min(canvas.height - player.height, player.y + speed);
            break;
        case 'ArrowLeft':
            player.x = Math.max(0, player.x - speed);
            break;
        case 'ArrowRight':
            player.x = Math.min(canvas.width - player.width, player.x + speed);
            break;
    }
}

// Iniciar o jogo
function startGame() {
    document.addEventListener('keydown', movePlayer);
    setInterval(updateGame, 1000 / 30); // Atualizar a cada 30 fps
    setInterval(generateItem, 2000); // Gerar novo item a cada 2 segundos
}

window.onload = startGame;

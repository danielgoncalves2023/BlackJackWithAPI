var deckUser = [];
var deckOponent = [];
var deckGame = "";
const cardsUser = document.querySelector('.table_user')
const cardsOponent = document.querySelector('.table_oponent')
const drawNewCardUser = document.querySelector('#drawNewCardUser')
drawNewCardUser.addEventListener('click', () => deckGame.drawNewCard(deckUser, 1))
const btnEndGame = document.querySelector('#buttonEndGame')
const results = document.querySelector('#interacao')
btnEndGame.addEventListener('click', () => displayResults())

// API DECK OF CARDS
async function getDeckId() {
    const deck_count = 4

    try {
        const res = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck_count}`);
        const data = await res.json();
        const deckId = await data.deck_id;
        return deckId;
    } catch (error) {
        console.error(error);
    }
}

async function initialize() {
    // Obter o deckId usando a função getDeckId
    const deckId = await getDeckId();

    // Criando a instância de Deck com deckId da API
    deckGame = new Deck(deckId, cardsUser, cardsOponent);

    // Comprando as duas cartas iniciais para cada lado
    deckGame.drawCardStart(deckUser, 2)
    deckGame.drawCardStart(deckOponent, 2)
}

initialize();

function displayResults(){
    // Delay para melhorar a experiência do usuário
    setTimeout(() => {
        let winner = "";
        
        if(deckGame.totalPointsUser > 21 && deckGame.totalPointsOponent > 21){
            winner = "EMPATE! Os dois passaram de 21 pontos."
        } else if(deckGame.totalPointsUser > 21 && deckGame.totalPointsOponent <= 21){
            winner = "VOCÊ PERDEU! Ultrapassou os 21 pontos."
        } else if(deckGame.totalPointsUser <= 21 && deckGame.totalPointsOponent > 21){
            winner = "VOCÊ VENCEU! Seu oponente ultrapassou os 21 pontos."
        } else if(deckGame.totalPointsUser < deckGame.totalPointsOponent){
            winner = "VOCÊ PERDEU! Tente denovo."
        } else if(deckGame.totalPointsUser > deckGame.totalPointsOponent){
            winner = "VOCÊ VENCEU! Parabéns."
        } else {
            winner = "EMPATE! Ambos conseguiram a mesma pontuação."
        }

        results.innerHTML = `
        <div class="pontuacao">
            <h1>Você obteve ${deckGame.totalPointsUser} pontos.</h1>
            <h1>Seu oponente obteve ${deckGame.totalPointsOponent} pontos.</h1>
            <p>${winner}</p>
            <button onclick="restartGame()">Novo jogo</button>
        </div>
        `
    }, 700);
}

function restartGame(){
    // Delay para melhorar a experiência do usuário
    setTimeout(() => {
        location.reload();
    }, 500)
}
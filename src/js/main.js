var deckUser = [];
var deckOponent = [];
var deckGame = "";
var cardsUser = document.querySelector('.table_user')
var cardsOponent = document.querySelector('.table_oponent')
var drawNewCardUser = document.querySelector('#drawNewCardUser')
drawNewCardUser.addEventListener('click', () => deckGame.drawNewCard(deckUser, 1))

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

    // Criando a instância de Deck com deckId
    deckGame = new Deck(deckId, cardsUser, cardsOponent);

    // Comprando as duas cartas iniciais para cada lado
    deckGame.drawCardStart(deckUser, 2)
    deckGame.drawCardStart(deckOponent, 2)
}

initialize();

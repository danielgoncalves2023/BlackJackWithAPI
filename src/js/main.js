var deckUser = [];
var deckOponent = [];
var deckGame = "";
var drawNewCardUser = document.querySelector('#drawNewCardUser')

// API DECK OF CARDS
async function getDeckId() {
    const deck_count = 4

    try {
        const res = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck_count}`);
        const data = await res.json();
        const deckId = await data.deck_id;
        // console.log(deckId)
        return deckId;
    } catch (error) {
        console.error(error);
    }
}

async function convertCardsToHtmlUser() {
    const cardsUser = document.querySelector('.table_user')
    cardsUser.innerHTML = '';

    for (let i = 0; i < deckUser.length; i++) {
        let card = deckUser[i];

        cardsUser.innerHTML += `
        <div>
            <div class='cards' style="background-image: url('${card.image}')"></div>
            <h1>${card.value}<span>${card.suit}</span></h1>
        </div>
        `;

        // console.log(deckUser)
    }
}

async function convertCardsToHtmlOponent() {
    const cardsOponent = document.querySelector('.table_oponent')
    cardsOponent.innerHTML = '';

    for (let i = 0; i < deckOponent.length; i++) {
        let card = deckOponent[i];

        cardsOponent.innerHTML += `
        <div>
            <div class='cards' style="background-image: url('${card.image}')"></div>
            <h1>${card.value}<span>${card.suit}</span></h1>
        </div>
        `;

        // console.log(deckOponent)
    }
}

async function initialize() {
    // Obter o deckId usando a função getDeckId
    const deckId = await getDeckId();

    // Criando a instância de Deck com deckId
    deckGame = new Deck(deckId);

    // Comprando as duas cartas iniciais para cada lado
    deckGame.drawCardStart(deckUser, 2)
    deckGame.drawCardStart(deckOponent, 2)
}

initialize();

drawNewCardUser.addEventListener('click', () => deckGame.drawNewCard(deckUser, 1))

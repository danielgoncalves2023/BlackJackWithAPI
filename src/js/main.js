var deckUser = [];
var deckOponent = [];
var deckGame = "";
var totalPointsUser = 0;
var totalPointsOponent = 0;
var drawNewCardUser = document.querySelector('#drawNewCardUser')
drawNewCardUser.addEventListener('click', () => deckGame.drawNewCard(deckUser, 1))

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
    }
}

async function convertCardsToHtmlOponent() {
    const cardsOponent = document.querySelector('.table_oponent')
    cardsOponent.innerHTML = '';
    let i = 0;

    for (i = 0; i < deckOponent.length; i++) {
        let card = deckOponent[i];

        if (i < 1) {
            cardsOponent.innerHTML = `
                <div>
                    <div class='cards' style="background-image: url('${card.image}')"></div>
                    <h1>${card.value}<span>${card.suit}</span></h1>
                </div>
                `;
        } else {
            cardsOponent.innerHTML += `
                <div>
                    <div class='back-card'></div>
                    <h1 class='info-back-card'>${card.value}<span>${card.suit}</span></h1>
                </div>
                `;
        }
    }
}

async function revelCardsOponent() {
    const cardsOponent = document.querySelector('.table_oponent')
    let allCards = [];

    // Revelar cartas viradas
    for (let i = 0; i < deckOponent.length; i++) {
        const card = deckOponent[i];

        allCards += `
            <div>
                <div class='cards' style="background-image: url('${card.image}')"></div>
                <h1>${card.value}<span>${card.suit}</span></h1>
            </div>
        `

        cardsOponent.innerHTML = allCards
    }
}

async function countPointsOponent() {
    totalPointsOponent = 0;

    for (let i = 0; i < deckOponent.length; i++) {
        let cardValue = deckOponent[i].value;
        revelCardsOponent();

        // Contabilizar pontos Oponente
        if (cardValue >= 1 && cardValue <= 10) {
            const cardPoint = Number(cardValue)

            switch (cardPoint) {
                case 1:
                    totalPointsOponent += 1;
                    break;
                case 2:
                    totalPointsOponent += 2;
                    break;
                case 3:
                    totalPointsOponent += 3;
                    break;
                case 4:
                    totalPointsOponent += 4;
                    break;
                case 5:
                    totalPointsOponent += 5;
                    break;
                case 6:
                    totalPointsOponent += 6;
                    break;
                case 7:
                    totalPointsOponent += 7;
                    break;
                case 8:
                    totalPointsOponent += 8;
                    break;
                case 9:
                    totalPointsOponent += 9;
                    break;
                case 10:
                    totalPointsOponent += 10;
                    break;
                default:
                    alert("Erro ao calcular pontuação final.")
            }
        } else if (cardValue == 'QUEEN' || cardValue == 'JACK' || cardValue == 'KING') {
            totalPointsOponent += 10;
        } else if (cardValue == 'ACE') {
            if (totalPointsOponent >= 11) {
                totalPointsOponent += 1;
            } else {
                totalPointsOponent += 11;
            }
        } else {
            alert('Error na soma de pontos do Oponente.')
        }
    }
}

async function countPointsUser() {
    totalPointsUser = 0;
    
    for (let i = 0; i < deckUser.length; i++) {
        let cardValue = deckUser[i].value;

        if (cardValue >= 1 && cardValue < 11) {
            const cardPoint = Number(cardValue)

            switch (cardPoint) {
                case 1:
                    totalPointsUser += 1;
                    break;
                case 2:
                    totalPointsUser += 2;
                    break;
                case 3:
                    totalPointsUser += 3;
                    break;
                case 4:
                    totalPointsUser += 4;
                    break;
                case 5:
                    totalPointsUser += 5;
                    break;
                case 6:
                    totalPointsUser += 6;
                    break;
                case 7:
                    totalPointsUser += 7;
                    break;
                case 8:
                    totalPointsUser += 8;
                    break;
                case 9:
                    totalPointsUser += 9;
                    break;
                case 10:
                    totalPointsUser += 10;
                    break;
                default:
                    alert("Erro ao calcular pontuação final.")
            }
        } else if (cardValue == 'QUEEN' || cardValue == 'JACK' || cardValue == 'KING') {
            totalPointsUser += 10;
        } else if (cardValue == 'ACE') {
            if (confirm("O ÁS pode ter valor 1 ou 11.Para definir que ele tenha valor 1 clique 'OK', ou se quer que seu valor seja 11 clique 'Cancelar'.") == true) {
                totalPointsUser += 1;
            } else {
                totalPointsUser += 11;
            }
        }
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

async function endGame() {
    // Contagem de pontos do Usuário
    countPointsUser();

    console.log(`Total points user: ${totalPointsUser}`)
    console.log(deckUser)
    // Fim contagem de pontos do Usuário

    // Contagem de pontos do Oponente
    countPointsOponent();

    while (totalPointsOponent <= 14) {
        await deckGame.drawNewCard(deckOponent, 1);
        countPointsOponent();
    }

    console.log(`Total points oponent: ${totalPointsOponent}`)
    console.log(deckOponent)
    // Fim contagem de pontos do Oponente
}
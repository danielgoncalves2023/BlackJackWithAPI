var deckUser = [];
var deckOponent = [];
var deckGame = "";
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

function endGame() {
    var totalPointsUser = 0;
    var totalPointsOponent = 0;

    for (let i = 0; i < deckUser.length; i++) {
        let value = deckUser[i].value;

        if (value >= 1 & value <= 10) {
            const cardPoint = Number(value)

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
                default:
                    alert("Erro ao calcular pontuação final.")
            }
        } else if (value == 'QUEEN' | value == 'JACK' | value == 'KING'){
            totalPointsUser += 10;
        } else if (value == 'ACE'){
            if(confirm("O ÁS pode ter valor 1 ou 11.Para definir que ele tenha valor 1 clique 'OK', ou se quer que seu valor seja 11 clique 'Cancelar'.") == true){
                totalPointsUser += 1;
            } else {
                totalPointsUser += 11;
            }
        }
    }

    // console.log(`Total points user: ${totalPointsUser}`)

    for (let i = 0; i < deckOponent.length; i++) {
        let value = deckOponent[i].value;

        if (value >= 1 & value <= 10) {
            const cardPoint = Number(value)

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
                default:
                    alert("Erro ao calcular pontuação final.")
            }
        } else if (value == 'QUEEN' | value == 'JACK' | value == 'KING'){
            totalPointsOponent += 10;
            // Oponent não pode "confirmar" se Ás vale 1 ou 11.
            // TO DO
        } else if (value == 'ACE'){
            if(confirm("O ÁS pode ter valor 1 ou 11.Para definir que ele tenha valor 1 clique 'OK', ou se quer que seu valor seja 11 clique 'Cancelar'.") == true){
                totalPointsOponent += 1;
            } else {
                totalPointsOponent += 11;
            }
        }
    }

    console.log(`Total points user: ${totalPointsOponent}`)

}
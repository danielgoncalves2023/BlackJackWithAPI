class Deck {
    deck_id;
    table_user;
    table_oponent;
    totalPointsUser;
    totalPointsOponent;
    displayUserPoints;
    displayOponentPoints;

    constructor(
        deck_id, table_user, table_oponent,
        totalPointsUser = 0, totalPointsOponent = 0,
        displayUserPoints, displayOponentPoints
        ){
        this.deck_id = deck_id;
        this.table_user = table_user;
        this.table_oponent = table_oponent;
        this.totalPointsUser = totalPointsUser;
        this.totalPointsOponent = totalPointsOponent;
        this.displayUserPoints = displayUserPoints;
        this.displayOponentPoints = displayOponentPoints;
    }

    // Converte as cartas da API para elementos HTML
    convertCardsToHtmlUser() {
        this.table_user.innerHTML = '';
    
        for (let i = 0; i < deckUser.length; i++) {
            let card = deckUser[i];
    
            this.table_user.innerHTML += `
            <div>
                <div class='cards' style="background-image: url('${card.image}')"></div>
                <h1>${card.value}<span>${card.suit}</span></h1>
            </div>
            `;
        }
    }

    // Converte as cartas da API para elementos HTML
    convertCardsToHtmlOponent() {
        this.table_oponent.innerHTML = '';
        let i = 0;
    
        for (i = 0; i < deckOponent.length; i++) {
            let card = deckOponent[i];
    
            if (i < 1) {
                this.table_oponent.innerHTML = `
                    <div>
                        <div class='cards' style="background-image: url('${card.image}')"></div>
                        <h1>${card.value}<span>${card.suit}</span></h1>
                    </div>
                    `;
            } else {
                this.table_oponent.innerHTML += `
                    <div>
                        <div class='back-card'></div>
                        <h1 class='info-back-card'>${card.value}<span>${card.suit}</span></h1>
                    </div>
                    `;
            }
        }
    }

    // Revela as cartas viradas do Oponente
    revealCardsOponent() {
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
    
            this.table_oponent.innerHTML = allCards
        }
    }

    // Compra de cartas iniciais
    async drawCardStart(deck, qtde = 2){
        try {
            const res = await fetch(`https://deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=${qtde}`)
            const data = await res.json();
            const cardsDrawed = await data.cards
            deck.length = 0;
            deck.push(...cardsDrawed);
        } catch (error) {
            console.log(error);
        }

        if(deck === deckUser){
            this.convertCardsToHtmlUser();
        } else if (deck === deckOponent){
            this.convertCardsToHtmlOponent();
        } else {
            alert("Erro ao carregar as cartas.")
        }
    }

    // Compra de novas cartas
    async drawNewCard(deck, qtde = 1){
        try {
            const res = await fetch(`https://deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=${qtde}`)
            const data = await res.json();
            const cardDrawed = await data.cards
            deck.push(cardDrawed[0]);
        } catch (error) {
            console.log(error);
        }

        if(deck === deckUser){
            this.convertCardsToHtmlUser();
        } else if (deck === deckOponent){
            this.convertCardsToHtmlOponent();
        } else {
            alert("Erro ao carregar as cartas.")
        }
    }

    // Contagem final de pontos do Oponente
    countPointsOponent() {
        this.totalPointsOponent = 0;
    
        for (let i = 0; i < deckOponent.length; i++) {
            let cardValue = deckOponent[i].value;
            this.revealCardsOponent();
    
            if (cardValue >= 1 && cardValue <= 10) {
                const cardPoint = Number(cardValue)
    
                switch (cardPoint) {
                    case 1:
                        this.totalPointsOponent += 1;
                        break;
                    case 2:
                        this.totalPointsOponent += 2;
                        break;
                    case 3:
                        this.totalPointsOponent += 3;
                        break;
                    case 4:
                        this.totalPointsOponent += 4;
                        break;
                    case 5:
                        this.totalPointsOponent += 5;
                        break;
                    case 6:
                        this.totalPointsOponent += 6;
                        break;
                    case 7:
                        this.totalPointsOponent += 7;
                        break;
                    case 8:
                        this.totalPointsOponent += 8;
                        break;
                    case 9:
                        this.totalPointsOponent += 9;
                        break;
                    case 10:
                        this.totalPointsOponent += 10;
                        break;
                    default:
                        alert("Erro ao calcular pontuação final.")
                }
            } else if (cardValue == 'QUEEN' || cardValue == 'JACK' || cardValue == 'KING') {
                this.totalPointsOponent += 10;
            } else if (cardValue == 'ACE') {
                if (this.totalPointsOponent >= 11) {
                    this.totalPointsOponent += 1;
                } else {
                    this.totalPointsOponent += 11;
                }
            } else {
                alert('Error na soma de pontos do Oponente.')
            }
        }
    }

    // Contagem final de pontos do Usuário
    countPointsUser() {
        this.totalPointsUser = 0;
        
        for (let i = 0; i < deckUser.length; i++) {
            let cardValue = deckUser[i].value;
    
            if (cardValue >= 1 && cardValue < 11) {
                const cardPoint = Number(cardValue)
    
                switch (cardPoint) {
                    case 1:
                        this.totalPointsUser += 1;
                        break;
                    case 2:
                        this.totalPointsUser += 2;
                        break;
                    case 3:
                        this.totalPointsUser += 3;
                        break;
                    case 4:
                        this.totalPointsUser += 4;
                        break;
                    case 5:
                        this.totalPointsUser += 5;
                        break;
                    case 6:
                        this.totalPointsUser += 6;
                        break;
                    case 7:
                        this.totalPointsUser += 7;
                        break;
                    case 8:
                        this.totalPointsUser += 8;
                        break;
                    case 9:
                        this.totalPointsUser += 9;
                        break;
                    case 10:
                        this.totalPointsUser += 10;
                        break;
                    default:
                        alert("Erro ao calcular pontuação final.")
                }
            } else if (cardValue == 'QUEEN' || cardValue == 'JACK' || cardValue == 'KING') {
                this.totalPointsUser += 10;
            } else if (cardValue == 'ACE') {
                if (confirm("Para definir que o Ás tenha valor 11 clique 'OK', ou se quer que seu valor seja 1 clique 'Cancelar'.")) {
                    this.totalPointsUser += 11;
                } else {
                    this.totalPointsUser += 1;
                }
            } else {
                alert('Error na soma de pontos do Usuário.')
            }
        }
    }

    // Finalização de jogo pelo usuário
    async endGame() {
        // Contagem de pontos do Usuário
        deckGame.countPointsUser();
    
        console.log(`Total points user: ${deckGame.totalPointsUser}`)
        console.log(deckUser)
        // Fim contagem de pontos do Usuário
    
        // Contagem de pontos do Oponente
        deckGame.countPointsOponent();
    
        while (deckGame.totalPointsOponent <= 14) {
            await deckGame.drawNewCard(deckOponent, 1);
            deckGame.countPointsOponent();
        }
    
        console.log(`Total points oponent: ${deckGame.totalPointsOponent}`)
        console.log(deckOponent) 
        // Fim contagem de pontos do Oponente
    }
}
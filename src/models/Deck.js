class Deck {
    deck_id;

    constructor(deck_id){
        this.deck_id = deck_id;
    }

    async drawCardStart(deck, qtde){
        try {
            const res = await fetch(`https://deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=${qtde}`)
            const data = await res.json();
            const cardsDrawed = await data.cards
            deck.length = 0;
            deck.push(...cardsDrawed);
        } catch (error) {
            console.log(error);
        }

        if(deck == deckUser){
            convertCardsToHtmlUser();
        } else if (deck == deckOponent){
            convertCardsToHtmlOponent();
        } else {
            alert("Erro ao carregar as cartas.")
        }
    }

    async drawNewCard(deck, qtde){
        try {
            const res = await fetch(`https://deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=${qtde}`)
            const data = await res.json();
            const cardDrawed = await data.cards
            deck.push(cardDrawed[0]);
        } catch (error) {
            console.log(error);
        }

        if(deck == deckUser){
            convertCardsToHtmlUser();
        } else if (deck == deckOponent){
            convertCardsToHtmlOponent();
        } else {
            alert("Erro ao carregar as cartas.")
        }
    }
}
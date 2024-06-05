import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import constants from './constants';

const getCardValue = (card) => {
    const value = card.slice(0, -1);
    if (value === 'A') return 11;
    if (['J', 'Q', 'K', 'T'].includes(value)) return 10;
    return parseInt(value, 10);
};

const calculateScore = (hand) => {
    let score = hand.reduce((acc, card) => acc + getCardValue(card), 0);
    let aces = hand.filter(card => card.startsWith('A')).length;

    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
};

const useGame = ({ textures }) => {
    const [deck, set_deck] = useState(_.shuffle(_.filter(constants.CARDS, (card) => card !== constants.CARDS.base)));
    const [player_hand, set_player_hand] = useState([]);
    const [dealer_hand, set_dealer_hand] = useState([]);
    const [player_score, set_player_score] = useState(0);
    const [dealer_score, set_dealer_score] = useState(0);
    const [result, set_result] = useState("");
    const [isStanding, setIsStanding] = useState(false);
    const [show_popup, setShowPopup] = useState(false);
    const [game_started, set_game_started] = useState(false);
    const [show_second_card, set_show_second_card] = useState(false);
    const dealer_score_ref = useRef(dealer_score);
    const player_score_ref = useRef(player_score);
    const deck_ref = useRef(deck);

    useEffect(() => {
        dealer_score_ref.current = dealer_score;
        player_score_ref.current = player_score;
        deck_ref.current = deck;
    }, [dealer_score, player_score, deck]);

    const deal_cards = () => {
        
        set_show_second_card(false);
        set_game_started(true);
        const shuffled_deck = _.shuffle(_.filter(constants.CARDS, (card) => card !== constants.CARDS.base));
        set_deck(shuffled_deck);
        if (shuffled_deck.length >= 4) {
            const new_player_hand = [shuffled_deck.pop(), shuffled_deck.pop()];
            const new_dealer_hand = [shuffled_deck.pop(), shuffled_deck.pop()];

            set_player_hand(new_player_hand);
            set_dealer_hand(new_dealer_hand);

            set_player_score(calculateScore(new_player_hand));
            set_dealer_score(calculateScore(new_dealer_hand));
        } else {
            console.error("Not enough cards");
        }
    };

    const hit_card = () => {
        if (deck.length > 0) {
            set_deck((prev_deck) => {
                const new_deck = [...prev_deck];
                const new_card = new_deck.pop();
                const new_player_hand = [...player_hand, new_card];

                set_player_hand(new_player_hand);
                const new_player_score = calculateScore(new_player_hand);
                set_player_score(new_player_score);

                if (new_player_score > 21) {
                    const final_result = "Dealer wins";
                    set_result(final_result);
                    setTimeout(() => setShowPopup(true), 1000);
                }

                return new_deck;
            });
        } else {
            console.error("No more cards in the deck");
        }
    };

    const stand_cards = () => {
        setIsStanding(true);
        set_show_second_card(true);
    };

    const reset_game = () => {
        set_deck(_.shuffle(_.filter(constants.CARDS, (card) => card !== constants.CARDS.base)));
        set_player_hand([]);
        set_dealer_hand([]);
        set_player_score(0);
        set_dealer_score(0);
        set_result("");
        setIsStanding(false);
        set_game_started(false);
        setShowPopup(false);
        set_show_second_card(false);
    };

    useEffect(() => {
        if (isStanding) {
            const dealer_result = (current_dealer_hand) => {
                const current_dealer_score = calculateScore(current_dealer_hand);


                if (current_dealer_score < player_score_ref.current) {
                    const new_deck = [...deck_ref.current];
                    const new_card = new_deck.pop();
                    const new_dealer_hand = [...current_dealer_hand, new_card];
                    const new_score = calculateScore(new_dealer_hand);
                    
                    set_deck(new_deck);
                    
                    
                    setTimeout(() => {
                        set_dealer_hand(new_dealer_hand);
                        set_dealer_score(new_score);

                        if (new_score < player_score_ref.current && new_score < 22) {
                            setTimeout(() => dealer_result(new_dealer_hand), 500);
                        } else {
                            const final_result = new_score > 21 || new_score < player_score_ref.current ? "Player wins" : "Dealer wins";
                            set_result(final_result);
                            setTimeout(() => setShowPopup(true), 2000); // Apply a delay of 2 seconds before showing the popup
                        }
                    }, 500); 
                } else {
                    const final_result = current_dealer_score <= 21 ? "Dealer wins" : "Player wins";
                    set_result(final_result);
                    setTimeout(() => setShowPopup(true), 2000);
                }
            };

            dealer_result(dealer_hand);
        }
    }, [isStanding, dealer_hand]);

    useEffect(() => {
        if (player_score > 21) {
            const final_result = "Dealer wins";
            set_result(final_result);
            setTimeout(() => setShowPopup(true), 1000); 
        }
    }, [player_score]);

    return {
        game_started,
        deck,
        player_hand,
        player_score,
        dealer_score,
        dealer_hand,
        result,
        show_popup,
        deal_cards,
        hit_card,
        stand_cards,
        reset_game,
        textures,
        show_second_card,
    };
};

export default useGame;

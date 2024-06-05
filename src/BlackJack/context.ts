import React from "react";

interface Props {
    game_started: boolean;
    deck: any;
    player_hand:any;
    dealer_hand:any;
    player_score:any;
    dealer_score:any;
    result:any;
    deal_cards:any;
    hit_card:any;
    stand_cards:any,
    textures: any;
    show_popup: any;
    reset_game: any;
    show_second_card: boolean;
}

const GameContext = React.createContext<Props>({} as Props);

export default GameContext;
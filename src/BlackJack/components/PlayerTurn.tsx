import React, { useContext } from 'react'
import _ from 'lodash';
import GameContext from '../context';
import { Container,Sprite,Text } from '@pixi/react-animated';
import constants from '../constants';
import DealButton from './DealButtons';
const PlayerTurn = () => {
    
    const { textures,player_hand,hit_card,stand_cards,game_started,player_score } = useContext(GameContext)
    const renderCards = (hand) => {
        return _.map(hand,(card, index) => (
            <Sprite
                key={index}
                texture={textures[card]}
                x={index * 30}  
                y={0}
                width={100}
                height={150}
                anchor={0.5}
                
            />
        ));
      };
  return (
    <>
        <Container x={constants.WIDTH/2} y={constants.BOTTOM_DECK_Y}>
            {renderCards(player_hand)}
            <Container x={0} y={-100} width={100} height={30} >
        {game_started && <Text
          text={`Player Score: ${player_score}`}
          style={{ fontSize: 24, fill: '#000000' }}
          anchor={0.5}
        />}
      </Container>
        </Container>
        {game_started && 
        <DealButton
        on_click={hit_card}
        x={constants.WIDTH/2 - 200}
        y={constants.BOTTOM_DECK_Y}
        width={100}
        height={30}
        text="Hit"
        bg_color={0xd35400}
      />
        }
        { game_started &&
        <DealButton
        on_click={stand_cards}
        x={constants.WIDTH/2 + 200}
        y={constants.BOTTOM_DECK_Y}
        width={100}
        height={30}
        text="Stand"
        bg_color={0xd35400}
      />
}
    </>
  )
}

export default PlayerTurn
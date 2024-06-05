import React, { useContext } from 'react'
import GameContext from '../context'
import { Container,Sprite,Text } from '@pixi/react-animated';
import constants from '../constants';
import _ from 'lodash';
const Dealer_cards = () => {
    
    const { dealer_hand,textures,show_second_card,dealer_score } = useContext(GameContext)
    const renderCards = (hand) => {
        return _.map(hand,(card, index) => {
          const card_texture = index === 1 && !show_second_card ? constants.CARDS.base : card;
          return(
            <Sprite
            key={index}
            texture={textures[card_texture]}
            x={index * 30}
            y={0}
            width={100}
            height={150}
            anchor={0.5}
          />
          );
        });
      };
  return (
    <>
        <Container x={constants.WIDTH/2} y={constants.TOP_DECK_Y+100}>
    {renderCards(dealer_hand)}
    { show_second_card && 
    <Container x={0} y={-100} width={100} height={30} >
        <Text
          text={`Dealer Score: ${dealer_score}`}
          style={{ fontSize: 24, fill: '#000000' }}
          anchor={0.5}
        />
      </Container>
    }
    </Container>
    </>
    
  )
}

export default Dealer_cards
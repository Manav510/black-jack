import React, { useContext, useState } from 'react';
import { Container } from '@pixi/react-animated';
import constants from '../constants';
import GameContext from '../context';
import DealButton from './DealButtons';
import _ from 'lodash';
import { useSprings } from 'react-spring';
import Cards from './Cards';

const StartGame = () => {
  const { deal_cards, textures } = useContext(GameContext);
  const [springs, api] = useSprings(constants.NUMBER_OF_CARDS, (i) => ({
    texture: textures[constants.CARDS.base],
    x: constants.WIDTH - 100,
    scale: [constants.SCALE, constants.SCALE],
    y: 100,
    zIndex: 1000 - i,
    width: 100,
    height: 150,
    anchor: 0.5,
    angle: -45,
  }));

  const handle_deal_cards = () => {

    const get_final_config = (
      final_x: number,
      final_y: number,
      delay: number,
      zIndex: number,
      angle: number
      
    ) => {
      return {
        to: [
          {
            x: final_x,
            y: final_y,
            angle:angle
            
          },
          {
            zIndex,
          },
        ],
        delay,
        config: {
          duration: 1000,
        },
      };
    };

    api.start((i) => {
      const baseAngle = 0;

      if (i < 2) {
        return {
          ...get_final_config(
            constants.WIDTH / 2 - (i-2)* constants.DIFF_BW_CARDS,
            constants.BOTTOM_DECK_Y,
            i * 200,
            0,
            baseAngle
            
          ),
          onRest: () => {
            
            if (i === 1) { 
              deal_cards();
            }
          },
        };
      }  
      if (i >= 2 && i < 4) {
        return {
          ...get_final_config(
            constants.WIDTH / 2 ,
            constants.TOP_DECK_Y,
            i * 30,
            i,
            baseAngle
          ),
          onRest: () => {
             
            if (i === 3) { 
              deal_cards();
            }
          },
        };
      }
    });
  };

  return (
    <>
      {springs.map((props, index) => (
        <Cards key={`item${index}`} card_props={props} />
      ))}

      <Container x={constants.WIDTH / 2 - 50} y={constants.HEIGHT / 2}>
        <DealButton
          on_click={handle_deal_cards}
          x={0}
          y={100}
          width={100}
          height={30}
          text="Deal"
          bg_color={0xd35400}
        />
      </Container>
    </>
  );
};

export default StartGame;

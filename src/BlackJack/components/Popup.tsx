import React from 'react';
import { Container, Text } from '@pixi/react-animated';
import constants from '../constants';

const Popup = ({ result, onClose }) => {
    
  return (
    <Container
      interactive={true}
      buttonMode={true}
      pointerdown={onClose}
      x={constants.WIDTH / 2 - 200}
      y={constants.HEIGHT / 2 - 100}
      width={400}
      height={200}
      backgroundColor={0x000000}
      alpha={0.8}
    >
      <Text
        text={result}
        style={{
          fontSize: 24,
          fill: 'white',
          textAlign: 'center',
        }}
        anchor={0.5}
        x={200}
        y={100}
      />
    </Container>
  );
};

export default Popup;
import { Text } from '@pixi/react';
import { Container, Graphics } from '@pixi/react-animated'

const DealButton = ({
    on_click,
    text,
    x,
    y,
    width,
    height,
    bg_color,
}) => {
  return (
    <Container 
    x={x}
    y={y}
    anchor={0.5}
    cursor={"pointer"}
    eventMode={"static"}
    pointertap={on_click}
    >
      <Graphics 
        draw={g => {
          g.clear();
          g.beginFill(0xd35400);
          g.drawCircle(width / 2, height / 2, width / 2);
          g.endFill();
          g.beginFill(0xecf0f1);
          g.drawCircle(width / 2, height / 2, width / 2 - 10)
          g.endFill();
        }}
      />
      <Text 
      text={text}
      anchor={0.5}
      x={width/2}
      y={height/2}
      />
    </Container>
  )
}

export default DealButton
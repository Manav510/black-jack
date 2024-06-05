import { Sprite } from '@pixi/react-animated'

interface Props {
  card_props: any;
}
const Cards = ({ card_props }: Props) => {
  return (
    <Sprite 
    x={0}
    y={0}
    zIndex={0}
    cursor={"pointer"}
    eventMode={"static"}
    {...card_props}
    />
  )
}

export default Cards
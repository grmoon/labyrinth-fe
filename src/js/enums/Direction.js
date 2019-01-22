import createEnum from '@enums/utils/create-enum';

const Direction = createEnum({
  name: 'Direction',
  props: ['up', 'down', 'left', 'right']
});

Direction.opposite = function (direction) {
  let opposite;

  switch (direction) {
    case Direction.up:
      opposite = Direction.down;
      break;
    case Direction.down:
      opposite = Direction.up;
      break;
    case Direction.left:
      opposite = Direction.right;
      break;
    case Direction.right:
      opposite = Direction.left;
      break;
    default:
      throw new Error(`${direction} is not a valid Direction`);
  }

  return opposite;
}

export default Direction;

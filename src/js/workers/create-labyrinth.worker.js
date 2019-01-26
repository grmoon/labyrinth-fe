import Labyrinth from '@labyrinth/Labyrinth';

self.onmessage = ({ data: labyrinthParams }) => {
    self.postMessage(new Labyrinth(labyrinthParams));
}
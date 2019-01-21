<template>
  <div
    class="labyrinth"
    :style="`grid-template-areas: '${style.gridTemplateAreas}';`"
  >
    <template
      v-for="(row, rowIdx) in labyrinth.getGrid()"
    >
      <Cell
        v-for="(cell, cellIdx) in row"
        :key="`${rowIdx}-${cellIdx}`"
        :cell="cell"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
$cell-dimension: 10em;

.labyrinth {
  display: grid;
  grid-auto-rows: $cell-dimension;
  grid-auto-columns: $cell-dimension;
}
</style>


<script>
import Direction from '@labyrinth/Direction';
import Cell from '@components/Cell';
import { mapState } from 'vuex';

const directionKeyMap = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
}

export default {
    computed: {
      style() {
        const numCols = this.labyrinth.getNumCols();

        return {
          gridTemplateAreas: new Array(numCols).fill('a').join(' ')
        }
      },
      ...mapState(['labyrinth']),
    },
    components: { Cell },
    methods: {
      movePlayer(keydownEvent) {
        const keyCode = keydownEvent.keyCode;
        let direction;

        switch (keyCode) {
          case directionKeyMap.UP:
            direction = Direction.UP;
            break;
          case directionKeyMap.DOWN:
            direction = Direction.DOWN;
            break;
          case directionKeyMap.LEFT:
            direction = Direction.LEFT;
            break;
          case directionKeyMap.RIGHT:
            direction = Direction.RIGHT;
            break;
        }

        this.$store.commit('moveOccupant', direction);
      }
    },
    mounted() {
      document.addEventListener('keydown', this.movePlayer);
    },
    destroyed() {
      document.removeEventListener('keydown', this.movePlayer);
    }
}
</script>
<template>
  <div class="labyrinth-container">
    <Congratulations v-if="gameOver" />
    <Compass
      v-else-if="shouldShowCompass"
      :source="occupiedCellDOM"
      :destination="endCellDOM"
    />
    <div
      class="labyrinth"
      :style="`grid-template-areas: '${style.gridTemplateAreas}';`"
    >
      <template
        v-for="(row, rowIdx) in labyrinth.asArray()"
      >
        <Cell
          v-for="(cell, cellIdx) in row"
          :key="`${rowIdx}-${cellIdx}`"
          :cell="cell"
        />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$cell-dimension: 10em;

.labyrinth-container {
  display:inline-block;
  position: relative;
}

.labyrinth {
  border: 1px solid black;
  display: grid;
  grid-auto-columns: $cell-dimension;
  grid-auto-rows: $cell-dimension;
  width: fit-content;
}
</style>

<script>
import Cell from '@components/Cell';
import Compass from '@components/Compass';
import Congratulations from '@components/Congratulations';
import Direction from '@enums/Direction';
import { mapState } from 'vuex';

const DirectionKeyMap = {
  up: 38,
  down: 40,
  left: 37,
  right: 39
}

export default {
    computed: {
      style() {
        const numCols = this.labyrinth.numCols;

        return {
          gridTemplateAreas: new Array(numCols).fill('a').join(' ')
        }
      },
      gameOver() {
        return this.endCellDOM === this.occupiedCellDOM;
      },
      shouldShowCompass() {
        return this.endCellDOM !== undefined && this.occupiedCellDOM !== undefined;
      },
      ...mapState(['labyrinth', 'occupiedCellDOM', 'endCellDOM'])
    },
    components: { Cell, Compass, Congratulations},
    methods: {
      removeEventListener() {
        document.removeEventListener('keydown', this.movePlayer);
      },
      movePlayer(keydownEvent) {
        const keyCode = keydownEvent.keyCode;
        let direction;

        switch (keyCode) {
          case DirectionKeyMap.up:
            direction = Direction.up;
            break;
          case DirectionKeyMap.down:
            direction = Direction.down;
            break;
          case DirectionKeyMap.left:
            direction = Direction.left;
            break;
          case DirectionKeyMap.right:
            direction = Direction.right;
            break;
        }

        this.$store.commit('moveOccupant', direction);
      }
    },
    mounted() {
      document.addEventListener('keydown', this.movePlayer);
    },
    updated() {
      if (this.gameOver) {
        this.removeEventListener();
      }
    },
    destroyed() {
      this.removeEventListener();
    }
}
</script>
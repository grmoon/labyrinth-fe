<template>
  <div class="cell">
    <img
      v-if="isOccupied"
      :src="Dinosaur"
    >
  </div>
</template>

<style lang="scss" scoped>
.cell {
    align-items: center;
    border: 1px solid black;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
}
</style>


<script>
import Cell from '@labyrinth/Cell';
import Dinosaur from '@img/dinosaur';

export default {
    props: {
        cell: {
            type: Cell,
            required: true
        }
    },
    data() {
        return {
            Dinosaur
        }
    },
    computed: {
        isOccupied() {
            return this.cell.isOccupied()
        }
    },
    watch: {
        isOccupied(isOccupied) {
            if (isOccupied) {
                this.$el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
            }
        }
    }
}
</script>
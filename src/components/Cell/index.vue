<template>
  <div :class="classes">
    <img
      v-if="isOccupied"
      :src="Dinosaur"
    >
    <div v-else-if="isEnd">
      End
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cell {
    align-items: center;
    border: 1px solid transparent;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;

    &.cell {
        &--up-inaccessible {
            border-top: 1px solid black;
        }

        &--left-inaccessible {
            border-left: 1px solid black;
        }

        &--down-inaccessible {
            border-bottom: 1px solid black;
        }

        &--right-inaccessible {
            border-right: 1px solid black;
        }
    }
}
</style>

<script>
import { mapState } from 'vuex';
import Cell from '@labyrinth/Cell';
import Dinosaur from '@img/dinosaur';
import Direction from '@enums/Direction';
import RouteName from '@enums/RouteName';

export default {
    props: {
        cell: {
            type: Cell,
            required: true
        }
    },
    data() {
        const classes = ['cell'];

        for (let direction of Direction) {
            if (!this.cell.canAccess(direction)) {
                classes.push(`cell--${direction}-inaccessible`);
            }
        }

        return {
            Dinosaur,
            classes
        }
    },
    computed: {
        isOccupied() {
            return this.cell.isOccupied();
        },
        isEnd() {
            return this.cell === this.labyrinth.getEnd();
        },
        ...mapState(['labyrinth'])
    },
    updated() {
        if (this.isEnd && this.isOccupied) {
            this.$nextTick(_ => {
                setTimeout(_ => {
                    alert("Woohoo!");
                    this.$router.push({ name: RouteName.configuration });
                }, 0);
            });
        }
    },
    mounted() {
        if (this.isEnd) {
            this.$store.commit('setEndCellDOM', this.$el);
        }

        this.scrollIntoView()
    },
    methods: {
        scrollIntoView(isOccupied) {
            if (isOccupied || this.isOccupied) {
                this.$store.commit('setOccupiedCellDOM', this.$el);

                setTimeout(_ => {
                    this.$el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center'
                    });
                });
            }
        }
    },
    watch: {
        isOccupied(isOccupied) {
            this.scrollIntoView(isOccupied);
        }
    }
}
</script>
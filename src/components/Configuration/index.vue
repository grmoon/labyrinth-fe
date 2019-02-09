<template>
  <div>
    <div v-if="generatingLabyrinth">
      Generating Labyrinth...
    </div>
    <div v-else>
      <form @submit.prevent="generateForm_onSubmit">
        <div>
          <label>
            Name: <input
              v-model="occupantName"
              required
              type="text"
              name="occupantName"
            >
          </label>
        </div>
        <div>
          <label>
            Number of Rows: <input
              v-model="numRows"
              required
              type="number"
              name="numRows"
            >
          </label>
        </div>
        <div>
          <label>
            Number of Columns: <input
              v-model="numCols"
              required
              type="number"
              name="numCols"
            >
          </label>
        </div>
        <input
          type="submit"
          value="Generate Labyrinth"
        >
      </form>
      <div>OR</div>
      <form
        v-if="connected"
        @submit.prevent="selectForm_onSubmit"
      >
        <select
          required
          v-model="selection"
        >
          <option
            v-for="(description, key) in labyrinths"
            :key="key"
            :value="key"
          >
            Rows: {{ description.numRows }}, Columns: {{ description.numCols }}
          </option>
        </select>
        <input
          type="submit"
          value="Join an Existing Labyrinth"
        >
      </form>
    </div>
  </div>
</template>

<script>
import RouteName from '@enums/RouteName';
import { mapState } from 'vuex';

export default {
    computed: mapState(['labyrinths', 'connected']),
    data() {
        return {
            generatingLabyrinth: false,
            numCols: 5,
            numRows: 5,
            occupantName: 'Emily',
            selection: undefined,
        }
    },
    methods: {
        selectForm_onSubmit() {
          debugger;
        },
        generateForm_onSubmit() {
            this.generatingLabyrinth = true;

            this.$store.dispatch('createLabyrinth', {
              numCols: this.numCols,
              numRows: this.numRows
            }).then(_ => {
              this.$store.commit('addOccupant', { name: this.occupantName });
              this.$router.push({ name: RouteName.labyrinth });
            }).catch(err => {
              alert('Invalid number of rows/columns. Try creating a smaller labyrinth.');
              console.error(err);
            }).finally(_ => {
              this.generatingLabyrinth = false;
            });
        }
    }
}
</script>

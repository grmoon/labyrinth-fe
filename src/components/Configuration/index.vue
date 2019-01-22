<template>
  <form @submit.prevent="form_onSubmit">
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
</template>

<script>
import RouteName from '@enums/RouteName';

export default {
    data() {
        return {
            occupantName: 'Emily',
            numCols: 5,
            numRows: 5
        }
    },
    methods: {
        form_onSubmit() {
            this.$store.dispatch('createLabyrinth', {
              numCols: this.numCols,
              numRows: this.numRows
            }).then(_ => {
              this.$store.commit('addOccupant', { name: this.occupantName });
              this.$router.push({ name: RouteName.labyrinth });
            });
        }
    }
}
</script>
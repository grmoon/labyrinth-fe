<template>
  <div class="compass">
    <div
      class="compass__needle"
      :style="{ transform: `rotate(${rotation}deg)`}"
    >
      &larr;
    </div>
  </div>
</template>

<style lang='scss' scoped>
.compass {
  background-color: #FFF;
  border-radius: 50%;
  border: 1px solid black;
  padding: 0.5em;
  position: fixed;

  & > &__needle {
      transition: transform 0.25s;
  }
}
</style>

<script>
function getCoordinates(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
function calcAngleDegrees(vector, currRotation) {
  let angle = Math.atan2(vector.y, vector.x) * 180 / Math.PI;

  if (angle < 0) {
    const posAngle = angle + 360;

    if (Math.abs(posAngle - currRotation) < Math.abs(angle - currRotation)) {
      angle = posAngle;
    }
  }

  return angle;
}

export default {
  props: {
    destination: {
      type: HTMLDivElement,
      required: true
    },
    source: {
      type: HTMLDivElement,
      required: true
    }
  },
  data() {
    return {
      rotation: 0
    }
  },
  methods: {
    calculateVector() {
      const sourceCoords = getCoordinates(this.source);
      const destinationCoords = getCoordinates(this.destination);
      const vector = {
        x: sourceCoords.x - destinationCoords.x,
        y: sourceCoords.y - destinationCoords.y
      };

      this.rotation = calcAngleDegrees(vector, this.rotation);
    }
  },
  mounted() {
    this.calculateVector();
  },
  watch: {
    source() {
      this.calculateVector();
    },
    destination() {
      this.calculateVector();
    }
  }
};
</script>

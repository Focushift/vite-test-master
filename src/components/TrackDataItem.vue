<template>
  <div class="track-info">
    <div class="logo">
      <img :src="item.imageUrl" alt="Track image" />
    </div>
    <div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import TrackItem from '../models/TrackItemModel'

export default defineComponent({
  name: 'TrackDataItem',
  props: {
    item: {
      type: Object as PropType<TrackItem>,
      required: true,
      default: () => ({}),
    },
  },
  setup(props) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
  .track-info {
    padding: 10px;
    margin: 10px;
    display: flex;

    .logo {
      border: 1px solid #DDDDDD;
      padding: 4px;

      > img {
        max-width: 200px;
      }
    }
  }
</style>
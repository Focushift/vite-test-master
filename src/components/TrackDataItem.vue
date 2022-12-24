<template>
  <div class="track-info">
    <div class="logo">
      <img :src="item.imageUrl" alt="Track image" />
    </div>
    <div class="track-description">
      <h2>
        <a :href="item.iTunesTrackUrl" v-text="item.title" target="_blank"></a>
      </h2>
      <h3>
        <b v-text="item.artist"></b>
      </h3>
      <div>Duration: {{ item.duration }}</div>
      <div>Start time: {{ item.dateTime.toLocaleTimeString() }}</div>
    </div>
    <div v-if="isPlaying" class="track-playing-time">
      Playing
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
    const isPlaying = computed(() => props.item?.status === 'playing')
    const playingTime = computed(() => {
      if (!isPlaying.value) return 0

    })

    return {
      isPlaying,
      playingTime,
    }
  }
})
</script>

<style lang="scss" scoped>
  .track-info {
    padding: 10px;
    margin: 10px;
    display: flex;
    border-top: 1px solid #CEE3F7;
    border-left: 1px solid #CEE3F7;
    border-radius: 10px 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpifvjm1y8mBgYGVhDxG0SAuT/hxHcQ8QNEfMNCfAERX+EEGheNQNP7A248wrZfDP///2cACDAAgd4hBSmkkhAAAAAASUVORK5CYII=) repeat-x 0 -15px;

    .logo {
      border: 1px solid #DDDDDD;
      padding: 4px;

      > img {
        max-width: 200px;
      }
    }
    .track-description {
      padding: 20px;
    }
  }
</style>
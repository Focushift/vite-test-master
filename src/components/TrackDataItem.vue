<template>
  <div class="track-info">
    <div class="logo">
      <a :href="item.iTunesTrackUrl" :title="item.title" target="_blank">
        <img :src="item.imageUrl" alt="Track image" />
      </a>
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
      <progress :value="playingTimeProgress" max="100" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
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
    const playingTimeProgress = computed(() => {
      const { dateTime, duration } = props.item
      if (!isPlaying.value || !dateTime || !duration || !duration.includes(':')) return 0
      const currentTime = new Date()
      const startTime = new Date(props.item.dateTime)
      const playingSeconds = (currentTime.getTime() - startTime.getTime()) / 1000
      const [hours, minutes, seconds] = duration.split(':')
      const durationSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds)
      return playingSeconds / durationSeconds * 100
    })

    return {
      isPlaying,
      playingTimeProgress,
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

      img {
        max-width: 200px;
      }
    }
    .track-description {
      padding: 20px;
      flex-grow: 1;
    }
    .track-playing-time {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 150px;
    }
  }
</style>
<template>
  <div>
    <TrackDataItem
      v-for="item in sortedTracks"
      :key="item.artist + item.title"
      :item="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import TrackDataItem from './TrackDataItem.vue'
import TrackItem from '../models/TrackItemModel'
import TracksListResponse from '../models/TracksListResponseModel'

const listUrl = 'https://onair.radioapi.io/thisisgo/go/onair.json'

export default defineComponent({
  name: 'TrackData',
  components: { TrackDataItem },
  setup() {
    const trackData = ref<Array<TrackItem>>([])
    let loadingPromise = ref<null | Promise<any>>(null)
    let controller: AbortController | null = null
    let interval: number | undefined

    const sortedTracks = computed(() => {
      const tracks = trackData.value
      if (!tracks?.length) return []
      return tracks.sort((a, b) => {
        if (a.status === 'playing') return -1
        if (b.status === 'playing') return 1
        return b.dateTime.getTime() - a.dateTime.getTime()
      })
    })

    onMounted(() => interval = setInterval(() => loadTracks(), 2000))

    onBeforeUnmount(() => {
      if (controller) controller.abort()
      clearInterval(interval)
    })

    function loadTracks() {
      if (controller) controller.abort()
      controller = new AbortController()

      loadingPromise.value = fetch(listUrl, { signal: controller.signal })
        .then(res => res.json())
        .then((res: TracksListResponse) => trackData.value = processTracks(res))
        .catch(err => {
          if (err.name !== 'AbortError') alert('Something went wrong!')
        })
    }

    function processTracks(res: TracksListResponse) {
      const tracks = res?.nowplaying
      if (!tracks?.length) return []
      tracks.forEach(item => item.dateTime = new Date(item.time))
      return tracks
    }

    return {
      loadingPromise,
      sortedTracks,
    }
  }
})
</script>
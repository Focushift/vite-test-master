import TrackItem from './TrackItemModel'

export default interface TracksListResponse {
  nowplaying: Array<TrackItem>
}
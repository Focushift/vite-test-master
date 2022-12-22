export default interface TrackItem {
  artist: string
  duration: string
  iTunesTrackUrl: string
  imageUrl: string
  previewUrl: ""
  status: "playing" | "history"
  time: string
  title: string
  dateTime: Date
}
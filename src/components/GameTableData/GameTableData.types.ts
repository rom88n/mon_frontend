export type ServerType = {
  id: string
  name: string
  country: string
  host: string
  port: number
  map: string
  players: number
  maxPlayers: number
  rating: number
  online: boolean
  updatedAt: string
}

export type GameType = {
  id: string
  title: string
  slug: string
}
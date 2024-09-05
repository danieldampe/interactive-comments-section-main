export interface NavItems {
  currentUser: User
  comments: Comment[]
}

export interface Comment {
  id: number | string
  content: string
  createdAt: string | number
  score: number
  user: User
  vote?: boolean
  replies?: Comment[]
  replyingTo?: string
}

export interface User {
  image: Image
  username: string
}

export interface Image {
  png: string
  webp: string
}

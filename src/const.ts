import data from './assets/data.json'
import { User, Comment } from './types'

const { currentUser, comments }: {
  currentUser: User
  comments: Comment[]
} = data

export {
  currentUser,
  comments
}

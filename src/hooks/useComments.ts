import { create } from 'zustand'
import { currentUser, comments } from '../const'
import { User, Comment } from '../types'
import { createJSONStorage, persist } from 'zustand/middleware'
import { mapValuesDeep, filterDeep } from 'deepdash-es/standalone'
import { useModal } from './useModal'

interface State {
  currentUser: User
  comments: Comment[]
}

interface Action {
  createComment: (newComment: Comment, id?: Comment['id']) => void
  deleteComment: (id: Comment['id']) => void
  updateComment: (id: Comment['id'], newContent: Comment['content']) => void
  voteComment: (id: Comment['id'], newScore: Comment['score'], newVote: Comment['vote']) => void
}

const useComments = create(
  persist<State & Action>(
    (set) => ({
      currentUser,
      comments,
      // Create & Read
      createComment: (newComment, id) => set((state) => {
        let newComments: Comment[]
        if (id !== undefined) {
          newComments = mapValuesDeep(
            state.comments,
            (comment: Comment) => {
              if (comment.id === id) {
                const { replies } = comment
                replies !== undefined
                  ? replies.unshift(newComment)
                  : comment.replies = [newComment]
              }
              return comment
            },
            {
              childrenPath: ['replies']
            }
          )
        } else {
          newComments = [...state.comments, newComment]
        }
        return { comments: newComments }
      }),
      // Delete
      deleteComment: id => {
        const { showModal } = useModal('delete-comment')
        showModal({
          callback: () => set((state) => {
            const newComments = filterDeep(
              state.comments,
              (comment: Comment) => {
                if (comment.id !== id) return true
              },
              {
                childrenPath: ['replies']
              }
            )
            return { comments: newComments }
          })
        })
      },
      // Update
      updateComment: (id, newContent) => set((state) => {
        const newComments = mapValuesDeep(
          state.comments,
          (comment: Comment) => {
            if (comment.id === id) comment.content = newContent
            return comment
          },
          {
            childrenPath: ['replies']
          }
        )
        return { comments: newComments }
      }),
      // Vote
      voteComment: (id, newScore, newVote) => set((state) => {
        const newComments = mapValuesDeep(
          state.comments,
          (comment: Comment) => {
            if (comment.id === id) {
              comment.score = newScore
              comment.vote = newVote
            }
            return comment
          },
          {
            childrenPath: ['replies']
          }
        )

        return { comments: newComments }
      })
    }),
    {
      name: 'comments-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export { useComments }

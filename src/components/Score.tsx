import { Comment } from '../types'
import IconPlus from '../assets/images/icon-plus.svg?react'
import IconMinus from '../assets/images/icon-minus.svg?react'
import { useRef } from 'react'
import { useComments } from '../hooks/useComments'

type Props = Pick<Comment, 'id' | 'score' | 'vote'>

export const Score: React.FC<Props> = ({ id, score, vote }) => {
  const { voteComment } = useComments()

  const initialScore: Comment['score'] = vote === undefined
    ? score
    : vote
      ? score - 1
      : score + 1

  const voteRef = useRef(vote)
  const scoreRef = useRef(initialScore)
  const scoreUpRef = useRef(scoreRef.current + 1)
  const scoreDownRef = useRef(scoreRef.current - 1)

  const handlerVote = (evt: React.FormEvent): void => {
    const { currentTarget: button } = evt
    if (!(button instanceof HTMLButtonElement)) return
    let newScore: Comment['score']
    let newVote: Comment['vote'] = button.value === 'up'

    if (newVote === voteRef.current) {
      voteRef.current = undefined
      newVote = undefined
      newScore = scoreRef.current
    } else {
      voteRef.current = newVote
      newVote
        ? newScore = scoreUpRef.current
        : newScore = scoreDownRef.current
    }

    voteComment(id, newScore, newVote)
  }

  return (
    <div className='flex bg-gray-100 rounded-lg [&>*]:flex [&>*]:justify-center [&>*]:items-center [&>*]:h-9 md:flex-col'>
      <button
        className='w-10 cursor-pointer [&_path]:hover:fill-blue-800 [&_path]:data-[checked=true]:fill-blue-800'
        name='vote'
        value='up'
        data-checked={vote === true}
        onClick={handlerVote}
      >
        <IconPlus className='scale-90' />
      </button>
      <div>
        <div className='font-medium text-blue-800'>{score}</div>
      </div>
      <button
        className='w-10 cursor-pointer [&_path]:hover:fill-blue-800 [&_path]:data-[checked=true]:fill-blue-800'
        name='vote'
        value='down'
        data-checked={vote === false}
        onClick={handlerVote}
      >
        <IconMinus className='scale-90' />
      </button>
    </div>
  )
}

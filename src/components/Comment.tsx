import { useState } from 'react'
import { Comment as Props } from '../types'
import { getImageUrl } from '../utilities/get-image-url'
import { Reply } from './Reply'
import { ReplyBox } from './ReplyBox'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useComments } from '../hooks/useComments'
import { Delete } from './Delete'
import { Edit } from './Edit'
import { handlerSubmit } from '../utilities/handler-submit'
import { Score } from './Score'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export const Comment: React.FC<Props> = ({ id, user, score, content, replies, createdAt, replyingTo, vote }) => {
  const { currentUser, deleteComment, updateComment } = useComments()
  const [isReplying, setIsReplying] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const hasReplies = replies !== undefined && replies.length > 0
  const newCreatedAt = typeof createdAt === 'number' ? timeAgo.format(new Date(createdAt)) : createdAt
  const isYou = currentUser.username === user.username

  const toggleIsReplying = (): void => setIsReplying(prev => !prev)

  const handlerUpdate = (evt: React.FormEvent): void => handlerSubmit(
    evt,
    (content) => {
      updateComment(id, content)
      setIsUpdating(false)
    }
  )

  return (
    <div>
      <div className='flex flex-col gap-y-4 p-3.5 bg-white rounded-md md:relative md:flex-row-reverse md:gap-x-6 md:p-6 md:rounded-lg'>
        <div className='space-y-4 md:flex-grow'>
          <div className='flex items-center gap-x-4'>
            <img className='size-8' src={getImageUrl(user.image.webp)} alt={user.username} />
            <div className='flex items-center gap-x-2'>
              <div className='font-medium text-blue-950'>{user.username}</div>
              {isYou && <div className='px-1.5 pb-0.5 font-medium lowercase text-xs text-white bg-blue-800 rounded-sm'>You</div>}
            </div>
            <div className='text-gray-500'>{newCreatedAt}</div>
          </div>
          <div>
            {!isUpdating
              ? (
                <p className='text-gray-500 break-words md:pr-1'>
                  {replyingTo !== undefined && (
                    <span className='font-medium text-blue-900'>@{replyingTo}</span>
                  )} {content}
                </p>
                )
              : (
                <form className='flex flex-col items-end gap-y-3.5' onSubmit={handlerUpdate}>
                  <textarea className='w-full h-24 py-3 px-5 border border-gray-200 rounded-lg resize-none' name='content' defaultValue={content} />
                  <button className='py-3 px-8 font-medium uppercase text-white bg-blue-800 rounded-lg hover:opacity-50' type='submit'>Update</button>
                </form>
                )}
          </div>
        </div>
        <div className='flex justify-between items-center md:items-start'>
          <Score id={id} score={score} vote={vote} />
          <div className='space-x-4 md:absolute md:top-6 md:right-6 md:space-x-6 md:translate-y-1'>
            {isYou
              ? (
                <>
                  <Delete onClick={() => deleteComment(id)} />
                  <Edit onClick={() => setIsUpdating(prev => !prev)} />
                </>
                )
              : <Reply onClick={toggleIsReplying} />}
          </div>
        </div>
      </div>
      {isReplying && (
        <div className='mt-2'>
          <ReplyBox
            id={id}
            replyingTo={user.username}
            toggleIsReplying={toggleIsReplying}
          />
        </div>
      )}
      {hasReplies && (
        <div className='mt-4 pl-4 border-l-2 border-gray-200 space-y-4 md:pl-10 md:ml-10 md:space-y-5'>
          {replies.map((reply) => (
            <Comment key={reply.id} {...reply} />
          ))}
        </div>
      )}
    </div>
  )
}

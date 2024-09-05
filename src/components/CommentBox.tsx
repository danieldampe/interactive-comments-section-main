import { FormEvent } from 'react'
import { useComments } from '../hooks/useComments'
import { getImageUrl } from '../utilities/get-image-url'
import { handlerSubmit } from '../utilities/handler-submit'

export const CommentBox: React.FC = () => {
  const { currentUser, createComment } = useComments()

  const handlerCreate = (evt: FormEvent): void => handlerSubmit(
    evt,
    (content) => {
      createComment({
        id: crypto.randomUUID(),
        content,
        createdAt: Date.now(),
        score: 0,
        user: currentUser
      })
    },
    {
      reset: true
    }
  )

  return (
    <form className='flex flex-col gap-y-3.5 p-3.5 bg-white rounded-md md:flex-row md:items-start md:gap-x-4 md:p-6 md:rounded-lg' onSubmit={handlerCreate}>
      <div className='hidden md:block'>
        <img className='size-10' src={getImageUrl(currentUser.image.webp)} alt={currentUser.username} />
      </div>
      <div className='md:flex-grow'>
        <textarea className='w-full h-24 py-3 px-5 border border-gray-200 rounded-lg resize-none' name='content' placeholder='Add a comment...' />
      </div>
      <div className='flex justify-between items-center'>
        <img className='size-8 md:hidden' src={getImageUrl(currentUser.image.webp)} alt={currentUser.username} />
        <button className='py-3 px-8 font-medium uppercase text-white bg-blue-800 rounded-lg hover:opacity-50' type='submit'>Send</button>
      </div>
    </form>
  )
}

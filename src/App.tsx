import { useComments } from './hooks/useComments'
import { Comment } from './components/Comment'
import { CommentBox } from './components/CommentBox'
import { Modal } from './components/Modal'
import { Attribution } from './components/Attribution'

const App: React.FC = () => {
  const { comments } = useComments()

  return (
    <main className='py-8 px-4 font-rubik bg-gray-100 overflow-x-hidden md:py-16'>
      <Modal
        id='delete-comment'
        title='Delete comment'
        content='Are you sure you want to delete this comment? This will remove the comment and can not be undone.'
        options={['No, cancel', 'Yes, delete']}
      />
      <div className='max-w-[735px] mx-auto space-y-4 md:space-y-5'>
        <div className='space-y-4 md:space-y-5'>
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
        <div>
          <CommentBox />
        </div>
      </div>
      <Attribution />
    </main>
  )
}

export default App

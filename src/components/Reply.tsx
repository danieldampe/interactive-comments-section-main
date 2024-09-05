import IconReply from '../assets/images/icon-reply.svg?react'

interface Props {
  onClick: () => void
}

export const Reply: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <div className='flex items-center gap-x-2 font-medium text-blue-800 hover:opacity-75'>
        <IconReply />
        <div>Reply</div>
      </div>
    </button>
  )
}

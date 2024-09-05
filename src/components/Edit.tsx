import IconEdit from '../assets/images/icon-edit.svg?react'

interface Props {
  onClick: () => void
}

export const Edit: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <div className='flex items-center gap-x-2 font-medium text-blue-800 hover:opacity-75'>
        <IconEdit />
        <div>Edit</div>
      </div>
    </button>
  )
}

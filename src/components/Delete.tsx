import IconDelete from '../assets/images/icon-delete.svg?react'

interface Props {
  onClick: () => void
}

export const Delete: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <div className='flex items-center gap-x-2 font-medium text-red-600 hover:opacity-75'>
        <IconDelete />
        <div>Delete</div>
      </div>
    </button>
  )
}

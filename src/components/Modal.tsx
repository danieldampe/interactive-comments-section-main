interface Props {
  id: string
  title: string
  content: string
  options: [string, string]
}

export const Modal: React.FC<Props> = ({ id, title, content, options }) => {
  return (
    <dialog id={id} className='fixed top-0 left-0 z-50 open:flex justify-center items-center min-w-full min-h-full bg-black bg-opacity-75'>
      <form className='w-11/12 max-w-[400px] p-6 bg-white rounded-lg md:p-8' method='dialog'>
        <div>
          <div className='font-medium text-xl text-blue-950 md:text-2xl'>{title}</div>
        </div>
        <div className='mt-3 md:mt-4'>
          <p>{content}</p>
        </div>
        <div className='flex justify-between mt-4 md:mt-5'>
          {options.map((option, index) => {
            const isFirst = index === 0

            return (
              <button
                key={index}
                className={`w-[47.75%] py-3 uppercase font-medium text-white ${isFirst ? 'bg-slate-700' : 'bg-red-700'} rounded-lg hover:opacity-75`}
                type='submit'
                value={isFirst ? 'cancel' : 'submit'}
              >
                {option}
              </button>
            )
          })}
        </div>
      </form>
    </dialog>
  )
}

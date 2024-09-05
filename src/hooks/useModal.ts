type useModalHook = (id: string) => {
  showModal: ({ callback }: {
    callback: () => void
  }) => void
}

export const useModal: useModalHook = (id: string) => {
  const dialog = document.getElementById(id)

  if (!(dialog instanceof HTMLDialogElement)) throw new Error('It isn\'t an HTMLDialogElement')

  const showModal = ({ callback }: { callback: () => void }): void => {
    dialog.show()

    const handlerClose = (): void => {
      if (dialog.returnValue === 'submit') {
        callback()
      } else {
        dialog.removeEventListener('close', handlerClose)
      }
    }

    dialog.addEventListener('close', handlerClose)
  }

  return { showModal }
}

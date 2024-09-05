export function handlerSubmit (
  evt: React.FormEvent,
  callback: (content: string) => void,
  options?: {
    reset?: boolean
  }
): void {
  evt.preventDefault()
  const { target: form } = evt
  if (!(form instanceof HTMLFormElement)) return
  const formData = new FormData(form)
  const content = formData.get('content')
  const regex = /^(?!\s*$).+/
  if (typeof content !== 'string' || !regex.test(content)) return
  callback(content)
  if (options === undefined) return
  const { reset } = options
  if (reset === true) form.reset()
}

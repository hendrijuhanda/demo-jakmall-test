export default (length: number, excepts?: string[]) => {
  let characters = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ'

  if (excepts) {
    excepts.forEach((val) => {
      characters = characters.replace(val, '')
    })
  }

  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

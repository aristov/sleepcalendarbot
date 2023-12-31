import { Keyboard } from 'grammy'

const text = process.env.LIGHTSOUT_BUTTON_TEXT || 'Lights out'
const keyboard = Keyboard.from([
  [Keyboard.text(text)],
])

keyboard.resized()
keyboard.oneTime()

export default keyboard

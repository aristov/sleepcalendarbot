import { DateTime } from 'luxon'
import { InlineKeyboard } from 'grammy'

const wakeUpButtonText = process.env.WAKEUP_BUTTON_TEXT || `I'm awake`
const lightsOutText = process.env.LIGHTSOUT_TEXT || 'OK, click the button below when you wake up'

export async function useLightsOut(ctx) {
  const now = DateTime.now()
  const keyboard = InlineKeyboard.from([
    [InlineKeyboard.text(wakeUpButtonText, now.toISO())],
  ])
  await ctx.reply(lightsOutText, {
    reply_markup : keyboard,
  })
}

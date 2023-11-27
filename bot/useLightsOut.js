import { DateTime } from 'luxon'
import { InlineKeyboard } from 'grammy'

export async function useLightsOut(ctx) {
  const now = DateTime.now()
  const keyboard = new InlineKeyboard
  keyboard.text(`I'm awake`, now.toISO())
  await ctx.reply('OK, click the button below when you wake up', {
    reply_markup : keyboard,
  })
}

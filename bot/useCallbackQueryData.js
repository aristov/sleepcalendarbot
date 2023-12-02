import { DateTime, Duration } from 'luxon'
import calendar from './calendar.js'
import keyboard from './keyboard.js'

const calendarId = process.env.GOOGLE_CALENDAR_ID
const summary = process.env.EVENT_SUMMARY_TEXT || 'Sleep'
const wakeUpText = process.env.WAKEUP_TEXT || 'Sleep log entry added'

export async function useCallbackQueryData(ctx) {
  const start = DateTime.fromISO(ctx.callbackQuery.data)
  const end = DateTime.now()
  calendarId && await calendar.events.insert({
    calendarId,
    resource : {
      start : {
        dateTime : start.toISO(),
      },
      end : {
        dateTime : end.toISO(),
      },
      summary,
      colorId : process.env.EVENT_COLOR_ID,
      reminders : {
        useDefault : false,
      },
    },
  })
  const startString = start.toFormat('H:mm')
  const endString = end.toFormat('H:mm')
  const diff = end.diff(start, ['hours', 'minutes', 'seconds', 'milliseconds'])
  const duration = Duration.fromObject({
    hours : diff.hours || undefined,
    minutes : diff.minutes || undefined,
    seconds : diff.hours || diff.minutes ?
      undefined :
      diff.seconds,
  })
  const durationString = duration.toHuman()
  const text = `${ wakeUpText }\n\n${ startString } — ${ endString }\n${ durationString }`
  await ctx.reply(text, {
    reply_markup : keyboard,
  })
  await ctx.deleteMessage()
  await ctx.answerCallbackQuery()
}

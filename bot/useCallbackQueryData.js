import { DateTime, Duration } from 'luxon'
import calendar from './calendar.js'

export async function useCallbackQueryData(ctx) {
  const start = DateTime.fromISO(ctx.callbackQuery.data)
  const end = DateTime.now()
  await calendar.events.insert({
    calendarId : process.env.GOOGLE_CALENDAR_ID,
    resource : {
      start : {
        dateTime : start.toISO(),
      },
      end : {
        dateTime : end.toISO(),
      },
      summary : process.env.EVENT_SUMMARY_TEXT,
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
  await ctx.deleteMessage()
  await ctx.reply(
    `Sleep log entry added\n\n${ startString } — ${ endString }\n${ durationString }`,
  )
  await ctx.answerCallbackQuery()
}

import { DateTime, Duration } from 'luxon'
import calendar from './calendar.js'

const hour = Duration.fromObject({ hours : 1 })
const hourAsMinutes = hour.as('minutes')
const hourAsMilliseconds = hour.as('milliseconds')

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
  const units = end - start < hourAsMilliseconds ?
    ['minutes'] :
    ['hours', 'minutes']
  const diff = end.diff(start, units)
  const minutes = Math.round(diff.as('minutes'))
  const hours = Math.floor(minutes / hourAsMinutes)
  const duration = Duration.fromObject({
    hours : hours || undefined,
    minutes : minutes % hourAsMinutes,
  })
  const durationString = duration.toHuman()
  await ctx.deleteMessage()
  await ctx.reply(
    `Sleep log entry added\n\n${ startString } — ${ endString }\n${ durationString }`,
  )
  await ctx.answerCallbackQuery()
}

import { DateTime, Interval } from 'luxon'
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
  const interval = Interval.fromDateTimes(start, end)
  const time = interval.toLocaleString(DateTime.TIME_24_SIMPLE)
  await ctx.deleteMessage()
  await ctx.reply(`Sleep log entry added: ${ time }`)
  await ctx.answerCallbackQuery()
}

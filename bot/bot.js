import './env.js'
import './Context.js'
import { Bot } from 'grammy'
import { autoRetry } from '@grammyjs/auto-retry'
import { useLogger } from './useLogger.js'
import { useAccess } from './useAccess.js'
import { useHtml } from './useHtml.js'
import { useLightsOut } from './useLightsOut.js'
import { useCallbackQueryData } from './useCallbackQueryData.js'
import { useDefault } from './useDefault.js'
import { useError } from './useError.js'

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN)

bot.api.config.use(autoRetry())

bot.use(useLogger)
bot.use(useAccess)

bot.command('start', useHtml('start'))
bot.command('help', useHtml('help'))
bot.command('lightsout', useLightsOut)

bot.on('callback_query:data', useCallbackQueryData)
bot.on('message', useDefault)

bot.catch(useError)

export default bot

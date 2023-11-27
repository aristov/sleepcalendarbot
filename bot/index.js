import './env.js'
import { Settings } from 'luxon'
import lodash from 'lodash'
import commands from './commands.js'
import logger from './logger.js'
import bot from './bot.js'

Settings.defaultLocale = process.env.DEFAULT_LOCALE || 'en'

async function start(bot) {
  try {
    const promise = bot.start()
    const me = await bot.api.getMe()
    await bot.api.setMyCommands(commands)
    promise.then(lodash.noop)
    logger.info('The @%s successfully launched', me.username)
  }
  catch(err) {
    logger.fatal(err)
  }
}

process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())

void start(bot)

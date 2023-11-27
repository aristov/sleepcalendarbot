import { Context } from 'grammy'
import logger from './logger.js'

Context.prototype.replyWithHtml = async function(html, options) {
  await this.reply(html, {
    parse_mode : 'HTML',
    disable_web_page_preview : true,
    ...options,
  })
}

Context.prototype.replyWithCanceled = async function() {
  await this.reply('⚠️ Action canceled', {
    reply_markup : {
      remove_keyboard : true,
    },
  })
}

Context.prototype.replyWithSuccess = async function(text, options) {
  await this.reply(`✅️️ ${ text }`, {
    reply_markup : {
      remove_keyboard : true,
    },
    ...options,
  })
}

Context.prototype.replyWithError = async function(message, options) {
  try {
    await this.replyWithHtml(`❌ ${ message }`, options)
  }
  catch(err) {
    logger.error(err)
  }
}

export { Context }

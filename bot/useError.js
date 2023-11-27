import { GrammyError, HttpError } from 'grammy'
import logger from './logger.js'

const developerId = process.env.TELEGRAM_DEVELOPER_ID

export async function useError(err) {
  const ctx = err.ctx
  const error = err.error
  if(typeof error === 'string') {
    await ctx.replyWithError(error)
    return
  }
  const message = process.env.NODE_ENV === 'development' ?
    error.message :
    'Internal server error'
  await ctx.replyWithError(message)
  if(developerId) {
    await ctx.api.sendMessage(developerId, `❌ ${ error.message }`)
  }
  logger.error(`Error while handling update ${ ctx.update.update_id }:`)
  if(error instanceof GrammyError) {
    logger.error('Error in request: %s', error.description)
    return
  }
  if(error instanceof HttpError) {
    logger.error('Could not contact Telegram:')
    logger.error(error)
    return
  }
  logger.error('Unknown error:')
  logger.error(error)
}

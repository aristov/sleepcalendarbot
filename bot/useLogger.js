import logger from './logger.js'

export async function useLogger(ctx, next) {
  if(!ctx.msg) {
    await next()
    return
  }
  const username = ctx.from.username
  const alias = username ?
    '@' + username :
    ctx.from.id
  const text = ctx.msg.contact ?
    '[contact]' :
    ctx.msg.text ?? '[non-text message]'
  logger.info('%s (%s): %s', ctx.from.first_name, alias, text)
  await next()
}

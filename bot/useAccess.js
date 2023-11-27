export async function useAccess(ctx, next) {
  if(ctx.from.id != process.env.TELEGRAM_USER_ID) {
    throw 'Access denied'
  }
  await next()
}

export async function useDefault(ctx) {
  if(ctx.chat.type === 'private') {
    await ctx.reply('🤖 I don\'t understand you')
  }
}

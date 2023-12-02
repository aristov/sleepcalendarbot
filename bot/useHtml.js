import fs from 'node:fs/promises'

const cache = {}

export function useHtml(basename, options) {
  return async ctx => {
    let html = cache[basename]
    if(!html) {
      const filename = `html/${ basename }.html`
      const { pathname } = new URL(filename, import.meta.url)
      html = cache[basename] = await fs.readFile(pathname, 'utf-8')
    }
    await ctx.reply(html, {
      parse_mode : 'HTML',
      disable_web_page_preview : true,
      ...options,
    })
  }
}

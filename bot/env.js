import dotenv from 'dotenv'

const url = new URL('../.env', import.meta.url)

dotenv.config({
  path : url.pathname,
})

export default process.env

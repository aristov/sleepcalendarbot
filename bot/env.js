import dotenv from 'dotenv'

if(!process.env.NODE_ENV) {
  const url = new URL('../.env', import.meta.url)
  dotenv.config({
    path : url.pathname,
  })
}

export default process.env

import './env.js'
import pino from 'pino'
import pinoPretty from 'pino-pretty'

const DEST_STDOUT = 1
const DEST_STDERR = 2

const sync = process.env.NODE_ENV === 'development'
const options = {
  level : 'trace',
}
const multistream = pino.multistream([
  {
    level : 'trace',
    stream : pinoPretty({
      destination : DEST_STDOUT,
      hideObject : true,
      minimumLevel : 'trace',
      translateTime : 'SYS:standard',
      colorize : true,
      sync,
    }),
  },
  {
    level : 'error',
    stream : pinoPretty({
      destination : DEST_STDERR,
      translateTime : 'SYS:standard',
      colorize : true,
      sync,
    }),
  },
], {
  dedupe : true,
})
const logger = pino(options, multistream)

logger.trace = logger.trace.bind(logger)
logger.debug = logger.debug.bind(logger)
logger.info = logger.info.bind(logger)
logger.warn = logger.warn.bind(logger)
logger.error = logger.error.bind(logger)
logger.fatal = logger.fatal.bind(logger)

export default logger

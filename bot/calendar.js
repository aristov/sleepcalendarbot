import { google } from 'googleapis'
import oAuth2Client from './oAuth2Client.js'

const calendar = google.calendar({
  version : 'v3',
  auth : oAuth2Client,
})

export default calendar

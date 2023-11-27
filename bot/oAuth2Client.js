import './env.js'
import { google } from 'googleapis'

const oAuth2Client = google.auth.fromJSON({
  type : 'authorized_user',
  client_id : process.env.GOOGLE_CLIENT_ID,
  client_secret : process.env.GOOGLE_CLIENT_SECRET,
  refresh_token : process.env.GOOGLE_REFRESH_TOKEN,
})

export default oAuth2Client

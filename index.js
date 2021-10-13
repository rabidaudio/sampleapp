const express = require('express')

const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('assets'))

app.get('/', (req, res) => {
  res.render('index', {
    name: req.query.name || 'world'
  })
})

// expects query ?v= of youtube video id
app.get('/api/audio.mp3', (req, res) => {
  res.set({ 'Content-Type': 'audio/mpeg' })
  ffmpeg(ytdl(`http://www.youtube.com/watch?v=${req.query.v}`, {
    filter: 'audio'
  }))
    .audioCodec('libmp3lame')
    .noVideo()
    .outputFormat('mp3')
    .on('error', (err) => console.error(err))
    .on('end', () => console.log('Audio stream finised'))
    .pipe(res, { end: true })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})

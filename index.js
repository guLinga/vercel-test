const express = require('express')
const axios = require('axios')
const app = express()
var cors = require('cors')
app.use(cors())
app.options('*', cors())

const port = 4000

app.get('/', async (req, res) => {
  console.log('/ 进入执行')
  try {
    const data = await axios({
      url: 'https://api.notion.com/v1/databases/c1f91f1dd43248819b6e58193177aae0/query',
      method: 'POST',
      headers: {
        Authorization:
          'Bearer secret_1UF9i8rNjcWQGyhMm9Mo3fmuZCcQbUlMEeVGaZMCrf1',
        'Notion-Version': '2022-06-28',
      },
    })
    console.log('data', data.data)
    res.send({
      title: 'Hello World!',
      data: data.data,
    })
  } catch (error) {
    console.log('error', error)

    res.send({
      title: 'Hello World!',
      error,
    })
  }
})

app.get('/test', (req, res) => {
  console.log('/test 进入执行')
  res.send('Hello World! test')
})

app.get('/we', (req, res) => {
  const Wechaty = require('wechaty')
  class weChaty {
    bot = null
    constructor() {
      this.bot = Wechaty.WechatyBuilder.build({
        name: 'wechat-assistant', // generate xxxx.memory-card.json and save login data for the next login
        puppetOptions: {
          uos: true,
        },
      })
      this.bot.on('scan', (code) => {
        const qrcodeImageUrl = `https://wechaty.js.org/qrcode/${encodeURIComponent(
          code
        )}`
        res.send(qrcodeImageUrl)
      })
      this.bot.on('login', (user) => console.log(`User ${user} logged in`))
      this.bot.on('message', this.onMessage.bind(this))
    }
    onMessage(message) {
      const room = message.room()
      if (
        room &&
        message.payload.roomId ===
          '@@3028fee88f1f1dba1507039875d73c7f6448fd3c3759fb27b5d79fc97072af13'
      ) {
        room.say('你好')
      }
    }
    run() {
      this.bot.start()
    }
  }
  new weChaty().run()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

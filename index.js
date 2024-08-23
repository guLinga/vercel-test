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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

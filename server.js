const express = require('express')
const app = express()


app.get('/', (req, res)=> {
    res.send('Heloo node api')
})

app.listen(3000, () => {
    console.log('api is running  on port 3000')
})
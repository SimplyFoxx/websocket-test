//Vytvářim funkci express, která tahá z npm balíčku express
const express = require('express')
//vytvářim funkci app, která spouští funkci express
const path = require('path')
const app = express()
//určuju port pro proces
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => console.log('Chat Server on port ' + PORT))

app.use(express.static(path.join(__dirname, 'public')))
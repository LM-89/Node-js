const express = require('express')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

const messages = []

app.get('/', (req, res, next) => {
    res.send(`
        <h1>Hello</h1>
        <ul>
            <li><a href="/form">Form</a></li>
        </ul>    
    `)
})

app.get('/messages', (req, res, next) => {
    const messagesList = messages.map(message => `<li>${message}</li>`).join('')

    res.send(`
        <h1>Messages</h1>
        <ul>${messagesList}</ul>
        <a href="/form">Add new message</a>    
        <a href="/">Home page</a>    
    `)
})

app.get('/form', (req, res, next) => {
    res.send(`
        <div>
            <h1>Form</h1>
            <form action="/form-submitted" method="POST">
                <input type="text" name="message" />
                <button type="submit">Send</button>
            </form> 
        </div> 
    `)
})

app.post('/form-submitted', (req, res, next) => {
    console.log(req.body)
    const { message } = req.body

    if (message) {
        messages.push(message)
    }
    res.redirect('/messages')
})

app.get('*', (req, res, next) => {
    res.send(`
        <h1>Page not found</h1>
        <a href="/">Go back</a>
    `)
})


const PORT = 3000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
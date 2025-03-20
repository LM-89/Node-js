// TOP constant(copy/paste) utilities---------------
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const colors = require('colors')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))  //Cssui

app.locals.siteTitle = 'School '
app.locals.currentDate = new Date().getFullYear()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
//------------------------------------------------

//------ROUTES----------
const studentsRoutes = require('./routes/students')
const groupsRoutes = require('./routes/groups')
const languagesRoutes = require('./routes/languages')
const subjectsRoutes = require('./routes/subjects')
const lecturersRoutes = require('./routes/lecturers')

app.use(studentsRoutes)
app.use(groupsRoutes)
app.use(languagesRoutes)
app.use(subjectsRoutes)
app.use(lecturersRoutes)

//------HOME PAGE----------------------------
app.get('/', (req, res, next) => {
    res.render('index')
})
//-------------------------------------------


// Bottom utilities---------irgi copy paste kitam projektui
app.get('*', (req, res, next) => {
    res.send(`
        <h1>Page not found</h1>
        <a href="/">Go back</a>
    `)
})

const PORT = 3000
app.listen(PORT, () => console.log('Server is running on port: '.italic.brightMagenta + `${PORT}`.italic.yellow))


//-------GAL PRIREIKS FUNKCIJU-------

// function updateDataDB(endpoint, item) {
//     const filePath = path.join('db', endpoint + '.json')

//     const data = getDataDB(endpoint)
    
//     data.push(item)
    
//     const stringifiedData = JSON.stringify(data, null, 2)

//     fs.writeFileSync(filePath, stringifiedData)
// }

// function getDataDB(endpoint) {
//     const filePath = path.join('db', endpoint + '.json')

//     if (!fs.existsSync(filePath)) {
//         throw new Error('File does not exist')
//     }
    
//     const fileContent = fs.readFileSync(filePath)

//     const data = JSON.parse(fileContent)

//     return data
// }
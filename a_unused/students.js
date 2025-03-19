// // TOP constant(copy/paste) utilities
// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// app.use(bodyParser.urlencoded({ extended: true }))



// app.get('/', (req, res, next) => {
//     res.send(`
//         <h1>Home Page</h1>
//         <ul>
//             <li><a href="/student-form">Student Form</a>/<a href="/students">Students List</a></li>
//             <li><a href="/game-form">Game Form</a>/<a href="/games">Games List</a></li>
//         </ul>          
//     `)
// })

// const students = []

// app.get('/student-form', (req, res, next) => {
//     res.send(`
//         <div>
//             <a href="/">Go Back</a>
//             <a href="/students">Students List</a>
//             <h1>Student Form</h1>

//             <form action="form-submitted" method="POST" id="student-form">
//                 <div class="form-control">
//                     <label for="student-name">Name:</label>
//                     <input type="text" name="name" id="student-name" required value="John" />
//                 </div>

//                 <div class="form-control">
//                     <label for="student-surname">Surname:</label>
//                     <input type="text" name="surname" id="student-surname" required value="Doe" />
//                 </div>

//                 <div class="form-control">
//                     <label for="student-age">Age:</label>
//                     <input type="number" name="age" id="student-age" required value="36" />
//                 </div>

//                 <div class="form-control">
//                     <label for="student-phone">Phone:</label>
//                     <input type="tel" name="phone" id="student-phone" required value="+37077717033" />
//                 </div>

//                 <div class="form-control">
//                     <label for="student-email">Email:</label>
//                     <input type="email" name="email" id="student-email" required value="student@example.com" />
//                 </div>

//                 <div class="form-control">
//                     <label for="student-it-knowledge">IT Knowledge:</label>
//                     <input type="range" name="it-knowledge" id="student-it-knowledge" required value="5" min="0" max="10" step="0.5"/>
//                     <output id="it-knowledge-output">5</output>
//                 </div>

//                 <fieldset>
//                     <legend>Group:</legend>

//                     <div class="form-control">
//                         <input type="radio" name="group" id="group-1" value="TYPE 20" checked />
//                         <label for="group-1">TYPE 20gr.</label>
//                     </div>

//                     <div class="form-control">
//                         <input type="radio" name="group" id="group-2" value="TYPE 21" checked />
//                         <label for="group-2">TYPE 21gr.</label>
//                     </div>

//                     <div class="form-control">
//                         <input type="radio" name="group" id="group-3" value="TYPE 22" checked />
//                         <label for="group-3">TYPE 22gr.</label>
//                     </div>
//                 </fieldset>

//                 <fieldset>
//                     <legend>Programming Languages:</legend>

//                     <div class="form-control">
//                         <input type="checkbox" name="programming-language" id="language-1" value="JavaScript" checked />
//                         <label for="language-1">JavaScript</label>
//                     </div>

//                     <div class="form-control">
//                         <input type="checkbox" name="programming-language" id="language-2" value="Rust" />
//                         <label for="language-2">Rust</label>
//                     </div>

//                     <div class="form-control">
//                         <input type="checkbox" name="programming-language" id="language-3" value="Python" />
//                         <label for="language-3">Python</label>
//                     </div>                    
//                 </fieldset>

//                 <button type="submit">Create Student</button>
//             </form>

//             <script>
//                 const itKnowledgeInput = document.getElementById('student-it-knowledge')
//                 const itKnowledgeOutput = document.getElementById('it-knowledge-output')

//                 itKnowledgeInput.addEventListener('input', function () {
//                     itKnowledgeOutput.textContent = this.value
//                 })
                
//                 itKnowledgeOutput.textContent = itKnowledgeInput.value
//             </script>
//         </div>    
//     `)
// })

// app.post('/form-submitted', (req, res, next) => {
//     const { name, surname, age, phone, email, group } = req.body
//     const itKnowledge = req.body['it-knowledge']
//     const programmingLanguages = [].concat(req.body['programming-language'] || [])

//     if (name && surname && age && phone && email && group && itKnowledge && programmingLanguages) {
//         students.push({ name, surname, age, phone, email, itKnowledge, group, programmingLanguages })
//     }
//     res.redirect('/students')
// })

// app.get('/students', (req, res, next) => {
//     const studentsList = 
//     students.map(student => 
//         `<li>
//             <p class="student-info">Name and Surname: ${student.name} ${student.surname}</p>
//             <p class="student-info">Age: ${student.age}</p>
//             <p class="student-info">Phone: ${student.phone}</p>
//             <p class="student-info">Email: ${student.email}</p>
//             <p class="student-info">IT Knowledge: ${student.itKnowledge}/10</p>
//             <p class="student-info">Group: ${student.group}/10</p>
//             <p class="student-info">Programming Languages: ${student.programmingLanguages.join(', ')}/10</p>
//         </li>`
//     ).join('')

//     res.send(`
//         <div>
//             <a href="/">Home Page</a>
//             <a href="/student-form">Add Another Student</a>

//             <h1>Students</h1>

//             <ul>${studentsList}</ul>
//         </div>    
//     `)
// })



// const games = []

// app.get('/game-form', (req, res, next) => {
//     res.send(`
//         <div>
//             <a href="/">Go Back</a>
//             <a href="/games">Games List</a>
//             <h1>Game Form</h1>

//             <form action="game-form-submitted" method="POST" id="game-form">
//                 <div class="form-control">
//                     <label for="game-title">Title:</label>
//                     <input type="text" name="title" id="game-title" required value="DOOM Dark Ages" />
//                 </div>

//                 <div class="form-control">
//                     <label for="description">Description:</label>
//                     <textarea name="description" id="description" required rows="5">Interesting description!</textarea>
//                 </div>

//                 <div class="form-control">
//                     <label for="cover">Cover URL:</label>
//                     <input type="url" name="cover" id="cover" required size="30" />
//                 </div>

//                 <div class="form-control">
//                     <label for="developer">Developer:</label>
//                     <input type="text" name="developer" id="developer" required value="GGG" />
//                 </div>

//                 <div class="form-control">
//                     <label for="price">Price:</label>
//                     <input type="number" name="price" id="price" required value="15.15" step="0.01" />
//                 </div>

//                 <div class="form-control">
//                     <label for="release-date">Release Date:</label>
//                     <input type="date" name="release-date" id="release-date" required />
//                 </div>

//                 <div class="form-control">
//                     <label for="rating">Rating:</label>
//                     <input type="range" name="rating" id="rating" required value="2.5" min="0" max="5" step="0.1" />
//                     <output id="rating-output"></output>
//                 </div>

//                 <div class="form-control">
//                     <label for="category">Category:</label>
//                     <select name="category" id="category" required>
//                         <option value="FPS">FPS</option>
//                         <option value="Action">Action</option>
//                         <option value="Racing">Racing</option>
//                         <option value="Adventure">Adventure</option>
//                         <option value="Horror">Horror</option>
//                         <option value="RPG">RPG</option>
//                     </select>
//                 </div>

//                 <button type="submit">Register a Game</button>

//                 <script>
//                     const ratingInput = document.getElementById('rating')
//                     const ratingOutput = document.getElementById('rating-output')

//                     ratingInput.addEventListener('input', function () {
//                         ratingOutput.textContent = this.value
//                     })
                    
//                     ratingOutput.textContent = ratingInput.value
//                 </script>
//             </form>

            
//         </div>    
//     `)
// })

// app.post('/game-form-submitted', (req, res, next) => {
//     const { title, description, developer, price, rating, category, cover } = req.body
//     const releaseDate = req.body['release-date']

//     if (title && description && developer && price && rating && category && releaseDate && cover) {
//         games.push({ title, description, developer, price, rating, category, releaseDate, cover })
//     }
//     res.redirect('/games')
// })

// app.get('/games', (req, res, next) => {
//     const gamesList = 
//     games.map(game => 
//         `<li>
//             <div class="game-cover-container">
//                 <img src="${game.cover}" />
//             </dvi>
//             <p class="game-info">Title: ${game.title}</p>
//             <p class="game-info">Developer: ${game.developer}</p>
//             <p class="game-info">Category: ${game.category}</p>
//             <p class="game-info">Release Date: ${game.releaseDate}</p>
//             <p class="game-info">Rating: ${game.rating}/5</p>
//             <p class="game-info">About: ${game.description}</p>
//             <p class="game-info">Price: ${game.price}</p>
//         </li>`
//     ).join('')

//     res.send(`
//         <div>
//             <a href="/">Home Page</a>
//             <a href="/game-form">Add Another Game</a>

//             <h1>Games</h1>

//             <ul>${gamesList}</ul>
//         </div>    
//     `)
// })


// // Bottom utilities-----------------------------
// app.get('*', (req, res, next) => {
//     res.send(`
//         <h1>Page not found</h1>
//         <a href="/">Go back</a>
//     `)
// })
// const PORT = 3000
// app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
// TOP constant(copy/paste) utilities---------------
const express = require('express')
const { v4: uuid } = require('uuid')

const bodyParser = require('body-parser')
const colors = require('colors')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

//-----------------STUDENTS-------------------

let students = [
    {
        id: uuid(),
        name: 'John',
        surname: 'Doe',
        age: 30,
        phone: '+37067798877',
        email: 'john.doe@example.com',
        group: 'TYPE 21',
        itKnowledge: 5,
        interests: [ 'JavaScript', 'Python' ],
    },
    {
        id: uuid(),
        name: 'Mario',
        surname: 'Itsame',
        age: 99,
        phone: '+37067798877',
        email: 'itsame.Mario@example.com',
        group: 'TYPE 22',
        itKnowledge: 8,
        interests: [ 'JavaScript', 'Rust', 'Python' ],
    },
]

app.get('/', (req, res, next) => {
    res.send(`
        <h1>Home Page</h1>
        <ul>
            <li> <a href="/students">Students List</a> </li>

            <li> <a href="/groups">Groups List</a> </li>

            <li> <a href="/programming-languages">Programming Languages List</a> </li>

            <li> <a href="/lecturers">Lecturers List</a> </li>

            <li> <a href="/subjects">Subjects List</a> </li>
        </ul>          
    `)
})

app.get('/students', (req, res, next) => {
    const studentsList = 
    students.map(({ id, name, surname, age, phone, email, itKnowledge, group, interests }) => 
        `<li>
            <a href="/students/${id}" class="student-info">${name} ${surname}</a>
            <p class="student-info">Age: ${age}</p>
            <p class="student-info">Phone: ${phone}</p>
            <p class="student-info">Email: ${email}</p>
            <p class="student-info">IT Knowledge: ${itKnowledge}/10</p>
            <p class="student-info">Group: ${group}</p>
            <p class="student-info">Programming Languages: ${interests.join(', ')}</p>
        </li>`
    ).join('')

    res.send(`
        <div>
            <a href="/">Home Page</a>
            <a href="/create-student">Create a Student Record</a>

            <h1>Students</h1>

            <ul>${studentsList}</ul>
        </div>    
    `)
    console.log(students)
})

app.get('/students/:id', (req, res, next) => {
    const { id } = req.params

    const filteredStudent = students.find(student => student.id === id)

    const { name, surname, age, phone, email, itKnowledge, group, interests } = filteredStudent

    if (filteredStudent) {
        res.send(`
            <a href="/">Home Page</a>
            <a href="/students">Students List</a>

            <h1>Student: ${name} ${surname} (id: ${id})</h1>
            <p class="student-info">Age: ${age}</p>
            <p class="student-info">Phone: ${phone}</p>
            <p class="student-info">Email: ${email}</p>
            <p class="student-info">IT Knowledge: ${itKnowledge}/10</p>
            <p class="student-info">Group: ${group}</p>
            <p class="student-info">Programming Languages: ${interests.join(', ')}.</p>

            <form action="/delete-student" method="POST">
                <button type="submit">Delete Student</button>
                <input type="hidden" name="studentId" value="${id}" />
            </form>

            <a href="/edit-student/${id}"><button>Edit Student's Data</button></a>
        `)
    } else {
        res.send(`
            <h1>No Records</h1>
            <p>Student with id: ${id} was not found.</p>
            <a href="/students">Students List</a>
        `)
    }

})

app.get('/create-student', (req, res, next) => {
    res.send(`
        <div>
            <a href="/">Home Page</a>
            <a href="/students">Students List</a>
            <h1>Student Form</h1>

            <form action="/student-created" method="POST" id="create-student-form">
                <div class="form-control">
                    <label for="student-name">Name:</label>
                    <input type="text" name="name" id="student-name" required value="John" />
                </div>

                <div class="form-control">
                    <label for="student-surname">Surname:</label>
                    <input type="text" name="surname" id="student-surname" required value="Doe" />
                </div>

                <div class="form-control">
                    <label for="student-age">Age:</label>
                    <input type="number" name="age" id="student-age" required value="36" />
                </div>

                <div class="form-control">
                    <label for="student-phone">Phone:</label>
                    <input type="tel" name="phone" id="student-phone" required value="+37077717033" />
                </div>

                <div class="form-control">
                    <label for="student-email">Email:</label>
                    <input type="email" name="email" id="student-email" required value="student@example.com" />
                </div>

                <div class="form-control">
                    <label for="student-it-knowledge">IT Knowledge:</label>
                    <input type="range" name="itKnowledge" id="student-it-knowledge" required value="5" min="0" max="10" step="0.5"/>
                    <output id="it-knowledge-output">5</output>
                </div>

                <fieldset>
                    <legend>Group:</legend>

                    <div class="form-control">
                        <input type="radio" name="group" id="group-1" value="TYPE 20" checked />
                        <label for="group-1">TYPE 20gr.</label>
                    </div>

                    <div class="form-control">
                        <input type="radio" name="group" id="group-2" value="TYPE 21" checked />
                        <label for="group-2">TYPE 21gr.</label>
                    </div>

                    <div class="form-control">
                        <input type="radio" name="group" id="group-3" value="TYPE 22" checked />
                        <label for="group-3">TYPE 22gr.</label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Programming Languages:</legend>

                    <div class="form-control">
                        <input type="checkbox" name="interests" id="language-1" value="JavaScript" checked />
                        <label for="language-1">JavaScript</label>
                    </div>

                    <div class="form-control">
                        <input type="checkbox" name="interests" id="language-2" value="Rust" />
                        <label for="language-2">Rust</label>
                    </div>

                    <div class="form-control">
                        <input type="checkbox" name="interests" id="language-3" value="Python" />
                        <label for="language-3">Python</label>
                    </div>                    
                </fieldset>

                <button type="submit">Create a Student Record</button>
            </form>

            <script>
                const itKnowledgeInput = document.getElementById('student-it-knowledge')
                const itKnowledgeOutput = document.getElementById('it-knowledge-output')

                itKnowledgeInput.addEventListener('input', function () {
                    itKnowledgeOutput.textContent = this.value
                })
                
                itKnowledgeOutput.textContent = itKnowledgeInput.value
            </script>
        </div>    
    `)
})

app.post('/student-created', (req, res, next) => {
    const id = uuid()

    const interests = Array.isArray(req.body.interests) ? req.body.interests : [req.body.interests || 'No records yet..']

    const newStudent = { ...req.body, id, interests }
    
    students.push(newStudent)
    
    res.redirect(`/students/${id}`)
})

app.get('/edit-student/:id', (req, res, next) => {
    const { id } = req.params

    const filteredStudent = students.find(student => student.id === id)

    const { name, surname, age, phone, email, itKnowledge, group, interests } = filteredStudent

    res.send(`
        <div>
            <h1>Edit Student's Data</h1> 
            
            <form action="/student-edited" method="POST" id="edit-student-form">
                <div class="form-control">
                    <label for="student-name">Name:</label>
                    <input type="text" name="name" id="student-name" required value="${name}" />
                </div>

                <div class="form-control">
                    <label for="student-surname">Surname:</label>
                    <input type="text" name="surname" id="student-surname" required value="${surname}" />
                </div>

                <div class="form-control">
                    <label for="student-age">Age:</label>
                    <input type="number" name="age" id="student-age" required value="${age}" />
                </div>

                <div class="form-control">
                    <label for="student-phone">Phone:</label>
                    <input type="tel" name="phone" id="student-phone" required value="${phone}" />
                </div>

                <div class="form-control">
                    <label for="student-email">Email:</label>
                    <input type="email" name="email" id="student-email" required value="${email}" />
                </div>

                <div class="form-control">
                    <label for="student-it-knowledge">IT Knowledge:</label>
                    <input type="range" name="itKnowledge" id="student-it-knowledge" required value="${itKnowledge}" min="0" max="10" step="0.5"/>
                    <output id="it-knowledge-output">5</output>
                </div>

                <fieldset>
                    <legend>Group:</legend>

                    <div class="form-control">
                        <input type="radio" name="group" id="group-1" value="TYPE 20" ${group === 'TYPE 20' ? 'checked' : ''} />
                        <label for="group-1">TYPE 20gr.</label>
                    </div>

                    <div class="form-control">
                        <input type="radio" name="group" id="group-2" value="TYPE 21" ${group === 'TYPE 21' ? 'checked' : ''} />
                        <label for="group-2">TYPE 21gr.</label>
                    </div>

                    <div class="form-control">
                        <input type="radio" name="group" id="group-3" value="TYPE 22" ${group === 'TYPE 22' ? 'checked' : ''} />
                        <label for="group-3">TYPE 22gr.</label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Programming Languages:</legend>

                    <div class="form-control">
                        <input type="checkbox" name="interests" id="language-1" value="JavaScript" ${interests.includes('JavaScript') ? 'checked' : ''} />
                        <label for="language-1">JavaScript</label>
                    </div>

                    <div class="form-control">
                        <input type="checkbox" name="interests" id="language-2" value="Rust" ${interests.includes('Rust') ? 'checked' : ''} />
                        <label for="language-2">Rust</label>
                    </div>

                    <div class="form-control">
                        <input type="checkbox" name="interests" id="language-3" value="Python" ${interests.includes('Python') ? 'checked' : ''} />
                        <label for="language-3">Python</label>
                    </div>                    
                </fieldset>

                <button type="submit">Update Info</button>

                <input type="hidden" name="id" value="${id}" />
            </form>

            <script>
                const itKnowledgeInput = document.getElementById('student-it-knowledge')
                const itKnowledgeOutput = document.getElementById('it-knowledge-output')

                itKnowledgeInput.addEventListener('input', function () {
                    itKnowledgeOutput.textContent = this.value
                })
                
                itKnowledgeOutput.textContent = itKnowledgeInput.value
            </script>
        </div>
    `)
})

app.post('/student-edited', (req, res, next) => {
    const { id, name, surname, age, phone, email, itKnowledge, group, interests } = req.body;

    students = students.map(student => student.id === id ? {
        ...student,
        name,
        surname,
        age: Number(age),
        phone,
        email,
        itKnowledge: Number(itKnowledge),
        group,
        interests: Array.isArray(interests) ? interests : [interests],
    } : student)

    res.redirect(`/students/${id}`)
});

app.post('/delete-student', (req, res, next) => {
    const { studentId } = req.body

    // const updatedStudentsList = students.filter(student => student.id !== studentId)
    // students = updatedStudentsList

    students = students.filter(student => student.id !== studentId)

    res.redirect('/students')
})

//-----------------GROUPS-------------------

let groups = [
    { 
        id: uuid(), 
        name: "TYPE 20", 
        description: "Group TYPE 20" 
    },
    { 
        id: uuid(), 
        name: "TYPE 21", 
        description: "Group TYPE 21" 
    },
    { 
        id: uuid(), 
        name: "TYPE 22", 
        description: "Group TYPE 22"         
    },
]

app.get('/groups', (req, res, next) => {
    const groupList = groups.map(({ id, name, description }) => 
        `<li>
            <a href="/groups/${id}">${name}</a>
            <p>${description}</p>
        </li>`
    ).join('')

    res.send(`
        <div>
            <a href="/">Home Page</a>
            <a href="/create-group">Create a Group</a>

            <h1>Groups</h1>

            <ul>${groupList}</ul>
        </div>
    `)
})

app.get('/groups/:id', (req, res, next) => {
    const { id } = req.params
    const group = groups.find(group => group.id === id)

    if (group) {        
        const groupStudents = students.filter(student => student.group === group.name)
        const studentsList = groupStudents.map(student => `<li>${student.name} ${student.surname}</li>`).join('')
        const { id, name, description } = group

        res.send(`
            <div>
                <a href="/">Home Page</a>
                <a href="/groups">Groups List</a>

                <h1>Group: ${name}</h1>                
                <p>${description}</p>

                <h2>Students in this group:</h2>
                <ul>${studentsList || '<li>No students assigned</li>'}</ul>

                <a href="/edit-group/${id}"><button>Edit Group Info</button></a>

                <form action="/delete-group" method="POST" style="display:inline;">
                    <input type="hidden" name="groupId" value="${id}" />
                    <button type="submit">Delete Group</button>
                </form>
            </div>
        `)

    } else {
        res.send(`<h1>Group not found</h1><a href="/groups">Back to Groups</a>`)
    }
})

app.get('/create-group', (req, res, next) => {
    res.send(`
        <div>
            <a href="/">Home Page</a>
            <a href="/groups">Groups List</a>

            <h1>Create a Group</h1>

            <form action="/group-created" method="POST">

                <div class="form-control">
                    <label for="group-name">Group Name:</label>
                    <input type="text" name="name" id="group-name" required />
                </div>

                <div class="form-control">
                    <label for="group-description">Description:</label>
                    <textarea name="description" id="group-description" required></textarea>
                </div>

                <button type="submit">Create Group</button>
            </form>

        </div>
    `)
})

app.post('/group-created', (req, res, next) => {
    const id = uuid()
    const { name, description } = req.body

    groups.push({ id, name, description })

    res.redirect(`/groups/${id}`)
})

app.get('/edit-group/:id', (req, res, next) => {
    const { id } = req.params
    const group = groups.find(group => group.id === id)

    if (group) {
        const { name, description, id } = group
        
        res.send(`
            <div>
                <a href="/">Home Page</a>
                <a href="/groups">Groups List</a>

                <h1>Edit Group Info</h1>

                <form action="/group-edited" method="POST">

                    <div class="form-control">
                        <label for="group-name">Group Name:</label>
                        <input type="text" name="name" id="group-name" required value="${name}" />
                    </div>

                    <div class="form-control">
                        <label for="group-description">Description:</label>
                        <textarea name="description" id="group-description" required>${description}</textarea>
                    </div>

                    <input type="hidden" name="id" value="${id}" />
                    <button type="submit">Update Group Info</button>
                </form>
            </div>
        `)
    } else {
        res.redirect('/groups')
    }
})

app.post('/group-edited', (req, res, next) => {
    const { id, name, description } = req.body

    groups = groups.map(group => group.id === id ? { ...group, name, description } : group)

    res.redirect(`/groups/${id}`)
})

app.post('/delete-group', (req, res, next) => {
    const { groupId } = req.body

    groups = groups.filter(group => group.id !== groupId)

    res.redirect('/groups')
})

//-----------------PROGRAMMING LANGUAGES-------------------

let programmingLanguages = [
    { 
        id: uuid(), 
        name: "JavaScript", 
        description: "Versatile and popular."         
    },
    { 
        id: uuid(), 
        name: "Python", 
        description: "Great for data science."         
    },
    { 
        id: uuid(), 
        name: "Rust", 
        description: "Safe and fast systems language."         
    },
]

app.get('/programming-languages', (req, res, next) => {
    const languagesList = programmingLanguages.map(({ id, name, description }) => 
        `<li>
            <a href="/programming-languages/${id}">${name}</a>
            <p>${description}</p>
        </li>`
    ).join('')

    res.send(`
        <div>
            <a href="/">Home Page</a>
            <a href="/create-programming-language">Create a Programming Language</a>

            <h1>Programming Languages</h1>

            <ul>${languagesList}</ul>
        </div>
    `)
})

app.get('/programming-languages/:id', (req, res, next) => {
    const { id } = req.params
    const language = programmingLanguages.find(language => language.id === id)

    if (language) {
        const langStudents = students.filter(student => student.interests.includes(language.name))

        const studentsList = langStudents.map(student => `<li>${student.name} ${student.surname}</li>`).join('')

        const { name, description, id } = language

        res.send(`
            <div>
                <a href="/">Home Page</a>
                <a href="/programming-languages">Programming Languages List</a>

                <h1>${name}</h1>
                <p>${description}</p>

                <h2>Students interested in ${name}:</h2>
                <ul>${studentsList || '<li>No students found</li>'}</ul>

                <a href="/edit-programming-language/${id}"><button>Edit Language</button></a>

                <form action="/delete-programming-language" method="POST" style="display:inline;">
                    <input type="hidden" name="languageId" value="${id}" />
                    <button type="submit">Delete Language</button>
                </form>
            </div>
        `)
    } else {
        res.send(`<h1>Language Record not found</h1><a href="/programming-languages">Back to Languages List</a>`)
    }
})

app.get('/create-programming-language', (req, res, next) => {
    res.send(`
        <div>
            <a href="/">Home Page</a>
            <a href="/programming-languages">Programming Languages List</a>

            <h1>Create a Programming Language</h1>

            <form action="/programming-language-created" method="POST">
                <div class="form-control">
                    <label for="language-name">Language Name:</label>
                    <input type="text" name="name" id="language-name" required />
                </div>

                <div class="form-control">
                    <label for="language-description">Description:</label>
                    <textarea name="description" id="language-description" required></textarea>
                </div>

                <button type="submit">Add New Language</button>
            </form>

        </div>
    `)
})

app.post('/programming-language-created', (req, res, next) => {
    const id = uuid()
    const { name, description } = req.body

    programmingLanguages.push({ id, name, description })

    res.redirect(`/programming-languages/${id}`)
})

app.get('/edit-programming-language/:id', (req, res, next) => {
    const { id } = req.params
    const language = programmingLanguages.find(language => language.id === id)

    if (language) {
        res.send(`
            <div>
                <a href="/">Home Page</a>
                <a href="/programming-languages">Programming Languages List</a>

                <h1>Edit Programming Language</h1>

                <form action="/programming-language-edited" method="POST">
                    <div class="form-control">
                        <label for="language-name">Language Name:</label>
                        <input type="text" name="name" id="language-name" required value="${language.name}" />
                    </div>

                    <div class="form-control">
                        <label for="language-description">Description:</label>
                        <textarea name="description" id="language-description" required>${language.description}</textarea>
                    </div>

                    <input type="hidden" name="id" value="${language.id}" />
                    <button type="submit">Update Language</button>
                </form>

            </div>
        `)
    } else {
        res.redirect('/programming-languages')
    }
})

app.post('/programming-language-edited', (req, res, next) => {
    const { id, name, description } = req.body

    programmingLanguages = programmingLanguages.map(language => language.id === id ? { ...language, name, description } : language)

    res.redirect(`/programming-languages/${id}`)
})

app.post('/delete-programming-language', (req, res, next) => {
    const { languageId } = req.body

    programmingLanguages = programmingLanguages.filter(language => language.id !== languageId)

    res.redirect('/programming-languages')
})

//-----------------LECTURERS--------------------

let lecturers = [
    { 
        id: uuid(),
        name: "Alice",
        surname: "Smith",
        phone: "+123456789",
        email: "alice.smith@example.com",
        age: 40,
        subjects: ["Computer Science", "Programming"],
        yearsOfExperience: 15,
        favoriteLanguage: "JavaScript",
    },
    { 
        id: uuid(),
        name: "Bob",
        surname: "Johnson",
        phone: "+987654321",
        email: "bob.johnson@example.com",
        age: 50,
        subjects: ["Mathematics", "Physics"],
        yearsOfExperience: 20,
        favoriteLanguage: "Python",
    },
]

app.get('/lecturers', (req, res, next) => {
    const lecturersList = lecturers.map(({ name, id, surname, phone, email, age, subjects, yearsOfExperience, favoriteLanguage }) =>
        `<li>
            <a href="/lecturers/${id}">${name} ${surname}</a>
            <p>Phone: ${phone}</p>
            <p>Email: ${email}</p>
            <p>Age: ${age}</p>
            <p>Subjects: ${subjects.join(', ')}</p>
            <p>Years of Experience: ${yearsOfExperience}</p>
            <p>Favorite Language: ${favoriteLanguage}</p>
        </li>`
    ).join('')

    res.send(`
        <div>
            <a href="/">Home Page</a>
            <a href="/create-lecturer">Create a Lecturer</a>

            <h1>Lecturers List</h1>

            <ul>${lecturersList}</ul>
        </div>
    `)
})

app.get('/lecturers/:id', (req, res, next) => {
    const { id } = req.params
    const filteredLecturer = lecturers.find(lecturer => lecturer.id === id)
    
    if (filteredLecturer) {
        const { name, surname, id, phone, email, age, subjects, yearsOfExperience, favoriteLanguage } = filteredLecturer

        res.send(`
            <div>
                <a href="/">Home Page</a>
                <a href="/lecturers">Lecturers List</a>

                <h1>${name} ${surname}</h1>
                <p>Phone: ${phone}</p>
                <p>Email: ${email}</p>
                <p>Age: ${age}</p>
                <p>Subjects: ${subjects.join(', ')}</p>
                <p>Years of Experience: ${yearsOfExperience}</p>
                <p>Favorite Programming Language: ${favoriteLanguage}</p>

                <a href="/edit-lecturer/${id}"><button>Edit Lecturer</button></a>

                <form action="/delete-lecturer" method="POST" style="display:inline;">
                    <input type="hidden" name="lectId" value="${id}" />
                    <button type="submit">Delete Lecturer</button>
                </form>
            </div>
        `)

    } else {
        res.send(`<h1>Lecturer not found</h1><a href="/lecturers">Back to List</a>`)
    }
})

app.get('/create-lecturer', (req, res, next) => {
    res.send(`
        <div>
            <a href="/">Home Page</a>
            <a href="/lecturers">Lecturers List</a>

            <h1>Create a Lecturer</h1>

            <form action="/lecturer-created" method="POST">
                <div class="form-control">
                    <label for="lecturer-name">First Name:</label>
                    <input type="text" name="name" id="lecturer-name" required />
                </div>

                <div class="form-control">
                    <label for="lecturer-surname">Surname:</label>
                    <input type="text" name="surname" id="lecturer-surname" required />
                </div>

                <div class="form-control">
                    <label for="lecturer-phone">Phone:</label>
                    <input type="tel" name="phone" id="lecturer-phone" required />
                </div>

                <div class="form-control">
                    <label for="lecturer-email">Email:</label>
                    <input type="email" name="email" id="lecturer-email" required />
                </div>

                <div class="form-control">
                    <label for="lecturer-age">Age:</label>
                    <input type="number" name="age" id="lecturer-age" required />
                </div>

                <div class="form-control">
                    <label for="lecturer-subjects">Subjects (comma separated):</label>
                    <input type="text" name="subjects" id="lecturer-subjects" required />
                </div>

                <div class="form-control">
                    <label for="lecturer-experience">Years of Experience:</label>
                    <input type="number" name="yearsOfExperience" id="lecturer-experience" required />
                </div>

                <div class="form-control">
                    <label for="lecturer-favorite-language">Favorite Programming Language:</label>
                    <select name="favoriteLanguage" id="lecturer-favorite-language" required>
                        ${programmingLanguages.map(({ name }) => `<option value="${name}">${name}</option>`).join('')}
                    </select>
                </div>

                <button type="submit">Create Lecturer</button>
            </form>
        </div>
    `)
})

app.post('/lecturer-created', (req, res, next) => {
    const id = uuid()
    const { name, surname, phone, email, age, subjects, yearsOfExperience, favoriteLanguage } = req.body
    
    const subjectsArr = subjects.split(',').map(subject => subject.trim())

    lecturers.push({
        id,
        name,
        surname,
        phone,
        email,
        age: Number(age),
        subjects: subjectsArr,
        yearsOfExperience: Number(yearsOfExperience),
        favoriteLanguage
    })

    res.redirect(`/lecturers/${id}`)
})

app.get('/edit-lecturer/:id', (req, res, next) => {
    const { id } = req.params
    const filteredLecturer = lecturers.find(lecturer => lecturer.id === id)

    if (filteredLecturer) {
        const { id, name, surname, age, phone, email, subjects, yearsOfExperience, favoriteLanguage } = filteredLecturer

        res.send(`
            <div>
                <a href="/">Home Page</a>
                <a href="/lecturers">Lecturers List</a>

                <h1>Edit Lecturer</h1>

                <form action="/lecturer-edited" method="POST">
                    <div class="form-control">
                        <label for="lecturer-name">First Name:</label>
                        <input type="text" name="name" id="lecturer-name" required value="${name}" />
                    </div>

                    <div class="form-control">
                        <label for="lecturer-surname">Surname:</label>
                        <input type="text" name="surname" id="lecturer-surname" required value="${surname}" />
                    </div>

                    <div class="form-control">
                        <label for="lecturer-phone">Phone:</label>
                        <input type="tel" name="phone" id="lecturer-phone" required value="${phone}" />
                    </div>

                    <div class="form-control">
                        <label for="lecturer-email">Email:</label>
                        <input type="email" name="email" id="lecturer-email" required value="${email}" />
                    </div>

                    <div class="form-control">
                        <label for="lecturer-age">Age:</label>
                        <input type="number" name="age" id="lecturer-age" required value="${age}" />
                    </div>

                    <div class="form-control">
                        <label for="lecturer-subjects">Subjects (comma separated):</label>
                        <input type="text" name="subjects" id="lecturer-subjects" required value="${subjects.join(', ')}" />
                    </div>

                    <div class="form-control">
                        <label for="lecturer-experience">Years of Experience:</label>
                        <input type="number" name="yearsOfExperience" id="lecturer-experience" required value="${yearsOfExperience}" />
                    </div>

                    <div class="form-control">
                        <label for="lecturer-favorite-language">Favorite Programming Language:</label>
                        <select name="favoriteLanguage" id="lecturer-favorite-language" required>
                            ${programmingLanguages.map(({ name }) => `<option value="${name}" ${favoriteLanguage === name ? "selected" : ""}>${name}</option>`).join('')}
                        </select>
                    </div>

                    <input type="hidden" name="id" value="${id}" />
                    <button type="submit">Update Lecturer</button>
                </form>
            </div>
        `)
    } else {
        res.redirect('/lecturers')
    }
})

app.post('/lecturer-edited', (req, res, next) => {
    const { id, name, surname, phone, email, age, subjects, yearsOfExperience, favoriteLanguage } = req.body

    const subjectsArr = subjects.split(',').map(subject => subject.trim())

    lecturers = lecturers.map(lecturer => lecturer.id === id ? {
        ...lecturer,
        name,
        surname,
        phone,
        email,
        age: Number(age),
        subjects: subjectsArr,
        yearsOfExperience: Number(yearsOfExperience),
        favoriteLanguage
    } : lecturer)

    res.redirect(`/lecturers/${id}`)
})

app.post('/delete-lecturer', (req, res, next) => {
    const { lecturerId } = req.body

    lecturers = lecturers.filter(lecturer => lecturer.id !== lecturerId)

    res.redirect('/lecturers')
})

//-----------------SUBJECTS---------------------

let subjects = [
    { 
        id: uuid(), 
        name: "Mathematics", 
        description: "Fundamental math concepts"         
    },
    { 
        id: uuid(), 
        name: "Computer Science", 
        description: "Study of computers and algorithms"         
    },
    { 
        id: uuid(), 
        name: "Physics", 
        description: "Study of matter and energy"         
    },
]

app.get('/subjects', (req, res, next) => {

    const subjectList = subjects.map(({ id, name, description }) => 
        `<li>
            <a href="/subjects/${id}">${name}</a>
            <p>${description}</p>
        </li>`
    ).join('')

    res.send(`
        <div>
            <a href="/">Home Page</a>
            <a href="/create-subject">Create a Subject</a>

            <h1>Subjects</h1>

            <ul>${subjectList}</ul>
        </div>
    `)
})

app.get('/subjects/:id', (req, res, next) => {
    const { id } = req.params
    const filteredSubject = subjects.find(subject => subject.id === id)

    if (filteredSubject) {

        const subjectLecturers = lecturers.filter(lecturer => lecturer.subjects.includes(filteredSubject.name))

        const lecturersList = subjectLecturers.map(({ name, surname }) => `<li>${name} ${surname}</li>`).join('')

        const { id, name, description } = filteredSubject

        res.send(`
            <div>
                <a href="/">Home Page</a>
                <a href="/subjects">Subjects List</a>

                <h1>${name}</h1>
                <p>${description}</p>
                <h2>Lecturers teaching ${name}:</h2>
                <ul>${lecturersList || '<li>No lecturers found</li>'}</ul>

                <a href="/edit-subject/${id}"><button>Edit Subject</button></a>

                <form action="/delete-subject" method="POST" style="display:inline;">
                    <input type="hidden" name="subjectId" value="${id}" />
                    <button type="submit">Delete Subject</button>
                </form>
            </div>
        `)

    } else {
        res.send(`<h1>Subject not found</h1><a href="/subjects">Back to List</a>`)
    }
})

app.get('/create-subject', (req, res, next) => {
    res.send(`
        <div>
            <a href="/">Home Page</a>
            <a href="/subjects">Subjects List</a>

            <h1>Create a Subject</h1>

            <form action="/subject-created" method="POST">
                <div class="form-control">
                    <label for="subject-name">Subject Name:</label>
                    <input type="text" name="name" id="subject-name" required />
                </div>

                <div class="form-control">
                    <label for="subject-description">Description:</label>
                    <textarea name="description" id="subject-description" required></textarea>
                </div>

                <button type="submit">Create Subject</button>
            </form>
        </div>
    `)
})

app.post('/subject-created', (req, res, next) => {
    const id = uuid()
    const { name, description } = req.body

    subjects.push({ id, name, description })

    res.redirect(`/subjects/${id}`)
})

app.get('/edit-subject/:id', (req, res, next) => {
    const { id } = req.params
    const filteredSubject = subjects.find(subject => subject.id === id)

    if (filteredSubject) {
        const { id, name, description } = filteredSubject

        res.send(`
            <div>
                <a href="/">Home Page</a>
                <a href="/subjects">Subjects List</a>

                <h1>Edit Subject</h1>

                <form action="/subject-edited" method="POST">
                    <div class="form-control">
                        <label for="subject-name">Subject Name:</label>
                        <input type="text" name="name" id="subject-name" required value="${name}" />
                    </div>

                    <div class="form-control">
                        <label for="subject-description">Description:</label>
                        <textarea name="description" id="subject-description" required>${description}</textarea>
                    </div>

                    <input type="hidden" name="id" value="${id}" />
                    <button type="submit">Update Subject</button>
                </form>
            </div>
        `)

    } else {
        res.redirect('/subjects')
    }
})

app.post('/subject-edited', (req, res, next) => {
    const { id, name, description } = req.body

    subjects = subjects.map(subject => subject.id === id ? { ...subject, name, description } : subject)

    res.redirect(`/subjects/${id}`)
})

app.post('/delete-subject', (req, res, next) => {
    const { subjectId } = req.body

    subjects = subjects.filter(subject => subject.id !== subjectId)

    res.redirect('/subjects')
})




// Bottom utilities-----------------------------
app.get('*', (req, res, next) => {
    res.send(`
        <h1>Page not found</h1>
        <a href="/">Go back</a>
    `)
})

const PORT = 3000
app.listen(PORT, () => console.log('Server is running on port: '.italic.brightMagenta + `${PORT}`.italic.yellow))
const express = require('express')
const router = express.Router()
const { getGroups, getGroupById, createGroup, updateGroup, deleteGroup } = require('../services/groups')
const { getStudents } = require('../services/students')

module.exports = router 


router.get('/groups', (req, res, next) => {
    const groups = getGroups()
    res.render('groups/groups', { groups })
})

router.get('/groups/:id', (req, res, next) => {
    const { id } = req.params
    const group = getGroupById(id)
    const students = getStudents()
    const groupStudents = students.filter(student => student.group === group.name)    

    res.render('groups/group', { group, id, groupStudents })
})

router.get('/create-group', (req, res, next) => {
    res.render('groups/create-group')
})

router.post('/group-created', (req, res, next) => {
    const { body } = req
    const createdGroup = createGroup(body)    
    
    res.redirect(`/groups/${createdGroup.id}`)
})

router.get('/edit-group/:id', (req, res, next) => {
    const { id } = req.params
    const group = getGroupById(id)

    if (group) { 
        res.render('groups/edit-group', { group })       
    } else {
        res.redirect('/groups')
    }
})

router.post('/group-edited', (req, res, next) => {
    const { body } = req

    const updatedGroup = updateGroup(body)

    res.redirect(`/groups/${updatedGroup.id}`)
})

router.post('/delete-group', (req, res, next) => {
    const { groupId } = req.body

    deleteGroup(groupId)

    res.redirect('/groups')
})
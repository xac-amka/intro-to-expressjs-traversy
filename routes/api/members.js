const express = require('express');
const router = express.Router();
const members = require('../../Members');
const { v4: uuidv4 } = require('uuid');

// Get all members
router.get('/', (req, res) => {
    res.json(members);
});

// Get single member
router.get('/:id', (req, res) => {
    const isFound = members.some(member => member.id === parseInt(req.params.id));

    if(isFound){
        // === says this type should equals this type
        res.json(members.filter((member)=> member.id === parseInt(req.params.id)));
        // res.send(req.params.id);
    }else{
        res.status(400).json({msg: 'Member not found with id: ' + req.params.id});
    }

});

// Create Member
router.post('/', (req, res)=>{
    const newMember = {
        id : uuidv4(),
        name : req.body.name,
        email : req.body.email,
        status : 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ msg: 'Please fill your name and email'})
    }

    members.push(newMember);
    res.redirect('/');
    // res.json(members);
});

// Update Members
router.put('/:id', (req, res) => {
    const isFound = members.some(member => member.id === parseInt(req.params.id));

    if(isFound){
        const updateMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({ msg: 'Member updated', member : member });
            }
        });
    }else{
        res.status(400).json({msg: 'Member not found with id: ' + req.params.id});
    }

});

// Delete Member
router.delete('/:id', (req, res) => {
    const isFound = members.some(member => member.id === parseInt(req.params.id));

    if(isFound){
        res.json({ msg: 'Member deleted', members: members.filter((member)=> member.id !== parseInt(req.params.id)) });
    }else{
        res.status(400).json({msg: 'Member not found with id: ' + req.params.id});
    }

});

module.exports = router;
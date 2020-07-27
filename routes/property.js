const express = require('express');
const router = express.Router();

const Property = require('../models/property').Property
const Comment = require('../models/property').Comment

// Add Property
router.post("/addprop", (req, res) => {
    Property.findOne({ uid: req.body.uid }).then(property => {
        if (property) {
            return res.status(400).json({
                uid: "Property already exists"
            })
        } else {
            const newProperty = new Property({
                uid: req.body.uid,
                code: req.body.code,
                name: req.body.name,
                location: req.body.location,
                comments: [],

            })
            newProperty
                .save()
                .then(property => res.json(property))
                .catch(err => console.log(err))
        }
    })
})

// All the property 
router.post('/getprop', (req, res) => {
    Property.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
})

// Add Comments
router.post('/addcomment', (req, res) => {
    var dup = 0;

    Property.findOne({ uid: req.body.uid }, (err, property) => {
        let comment = new Comment({ comment: req.body.comment, email: req.body.email })

        if (property.comments == null) {
            property.comments = [comment]
        }
        property.comments.forEach(comment => {
            if (comment.email === req.body.email) {
                dup++
            }
        });
        (dup > 0) ? res.send({ err: "Already commented" }) : property.comments.push(comment)


        property
            .save()
            .then(prop => res.send({
                success: true
            }))
            .catch(err => console.log(err))
    })
})

// Delete Comments
router.post('/deletecomment', (req, res) => {
    Property.findOne({ uid: req.body.uid }, (err, property) => {
        if (property.comments == null) {
            return res.send({
                err: "No comment to delete"
            })
        }
        property.comments = property.comments.filter((ele) => {
            if (ele.email == req.body.email) {
                return false
            }
            else return true;
        })
        property.save()
            .then((result) => res.send({
                success: true
            }))
            .catch(err => console.log(err))
    })
})

// Get Comments
router.post('/getcomment', (req, res) => {
    Property.findOne({ uid: req.body.uid }, (err, property) => {
        if (!property) {
            return res.send({
                err: "No such property exists"
            })
        }
        else {
            return res.send(property.comments)
        }
    })
})


// Get user's comment

router.post('/getusercomment', (req, res) => {
    let target = [] 
    Property.findOne({ uid: req.body.uid }, (err, property) => {
        if (!property) {
            return
        }
       
        property.comments.forEach(e => {
            if (e.email == req.body.email) {
                target.push(e)
            }
        })
        
        if (target.length==0) {
            return 
           
        }
        else {
            return res.send(target[0].comment)
        }
    })
})




module.exports = router

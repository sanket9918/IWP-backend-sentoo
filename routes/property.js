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


// Add Comments
router.post('/addcomment', (req, res) => {


    Property.findOne({ uid: req.body.uid }, (err, property) => {
        let comment = new Comment({ comment: req.body.comment, email: req.body.email })

        if (property.comments == null) {
            property.comments = [comment]
        }
        property.comments.forEach(comment => {
            if (comment.email === req.body.email) {
                return res.send({
                    err: 'User already commented'
                })
            }
        });
        property.comments.push(comment)
        property
            .save()
            .then(prop => res.send(prop))
            .catch(err => console.log(err))
    })
})

router.post('/deletecomment', (req, res) => {
    Property.findOne({ uid: req.body.uid }, (err, property) => {
        property.comments = property.comments.filter((ele) => {
            if (ele.email == req.body.email) {
                return false
            }
            else return true;
        })
        property.save()
            .then((result) => res.send(result))
            .catch(err => console.log(err))
    })
})

module.exports = router

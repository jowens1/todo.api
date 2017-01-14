// routes/task.js
'use strict';

// dependencies
const express = require('express');
const Task = require('../models/tasks');
const router = express.Router();

// route definitions here...

// routes ending with /todos
router.route('/todos')
    .post((req, res) => {
        const task = new Task({
            name: req.body.name,
            note: req.body.note
        });

        task.save(err => {
            if (err) {
                return res.send(err);
            }

            return res.json({message: 'New task created'});
        });
    })
    .get((req, res) => {
        Task.find({}).sort({createdAt: -1})
            .exec((err, task) => {
                if (err) {
                    return res.send(err);
                }

                return res.json(task);
            });
    });

// routes starting with /todos/:id
router.route('/todos/:id')
    .get((req, res) => {
        Task.findById(req.params.id, (err, task) => {
            if (err) {
                return res.send(err)
            }

            return res.json(task);
        })
    })
    .put((req, res) => {
        Task.findByIdAndUpdate(req.params.id, {
                // fix to this portion to not require passing the name and note in order to avoid nullifying fields
                name: req.body.name,
                note: req.body.note,
                completed: req.body.completed
            },
            err => {
                if (err) {
                    return res.send(err);
                }

                return res.json({message: 'Task updated successfully'});
            }
        )
    })
    .delete((req, res) => {
        Task.remove({_id: req.params.id}, err => {
            if(err){
                return res.send(err);
            }

            return res.json({message: 'Task has been removed'});
        });
    });


module.exports = router;
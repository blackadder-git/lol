var express = require('express');
const sequences = require('./sequences');
const Advent = require('../models/advent');

var router = express.Router();

console.log("In routes/advents.js");

// GET
router.get('/', (req, res) => {
   console.log("In routes/advents.js get()");

   Advent.find()
   .then(
      advents => {
         //console.log(advents);
         res.status(200).json({
            message: "Advents fetched successfully!",
            advents: advents
         })
      })
   .catch(error => {
      console.error('Error fetching advents:', error);
      res.status(500).json({
         message: "Error fetching advents",
         error: error.message
      });
   });
});


// POST
router.post("/", async (req, res) => {
   console.log("In routes/advents.js post()");

   const maxAdventId = await sequences.nextId("advents");
   console.log("Next Advent ID", maxAdventId);

   const advent = new Advent({
      id: "" + maxAdventId,
      name: req.body.name,
      description: req.body.description,
      link: req.body.link,
      timestamp: req.body.timestamp
   });
   console.log("New Advent", advent);

   advent.save()
   .then(
      res.status(201).json({
         message: 'Advent added successfully',
         advent: advent
      })
   )
   .catch(error => {
      console.error('Error fetching advents:', error);
      res.status(500).json({
         error: error.message
      });
   });
});


// PUT
router.put('/:id', (req, res) => {
   console.log("In routes/advents.js put()", req.params.id);

   Advent.findOne({ id: req.params.id })
   .then(advent => {
      advent.name = req.body.name;
      advent.description = req.body.description;
      advent.link = req.body.link;
      advent.timestamp = req.body.timestamp;
 
      Advent.updateOne({ id: req.params.id }, advent)
      .then(result => {
           res.status(204).json({
             message: 'Advent updated successfully'
           })
      })
      .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
   })
   .catch(error => {
      res.status(500).json({
         message: 'Advent not found.',
         error: { advent: 'Advent not found'}
      });
   });
});


// DELETE
router.delete("/:id", (req, res) => {
   console.log("In routes/advents.js delete()");

   Advent.findOne({ id: req.params.id })
   .then(document => {
      Advent.deleteOne({ id: req.params.id })
      .then(result => {
         res.status(204).json({
            message: "Advent deleted successfully"
         });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
         });
      })
   })
   .catch(error => {
      res.status(500).json({
         message: 'Advent not found.',
         error: { advent: 'Advent not found'}
       });
   });
});

module.exports = router;
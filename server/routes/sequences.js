var Sequence = require('../models/sequence');

var maxAdventId;
var sequenceId = null;
let sequence = null;
 
// Thank you Aaron Picker
const sequences = {   // First, I restructured sequenceGenerator to be a variable containing the various methods.
  async init() {    // Make this init() function asynchronous
    try {
      sequence = await Sequence.findOne({}).exec();   // "exec()" here has to do with Mongoose and async functions. Not sure if it's entirely necessary, but it works with it in there. 
      if (!sequence) {
        throw new Error('Sequence not found');
      }
      console.log("Sequence object:", sequence);
      this.sequenceId = sequence._id;
      this.maxAdventId = sequence.maxAdventId;
      console.log("advent", this.maxAdventId);
    } 
    catch (err) {
      console.error('Error initializing Sequences:', err);
      throw err;
    }
  },
  async nextId(collectionType) {

    //return 101;
    // Ensure the generator is initialized. If not, call the init() function above. 
    if (!this.sequenceId) {
      await this.init();
    }
    //..... // This function continues
    var updateObject = {};
    var nextId;
  
    switch (collectionType) {
      case 'advents':
        this.maxAdventId++;
        updateObject = { maxAdventId: this.maxAdventId };
        nextId = this.maxAdventId;
        console.log("maxAdventId", nextId);
        break;
      default:
        console.log("unknown collectionType");
        return -1;
    }
  
    console.log("Update sequence _id", this.sequenceId, "set object", updateObject);
    
    Sequence.updateOne({ _id: this.sequenceId}, {$set: updateObject})
    .then(result => {
      console.log('Sequence updated:', result);
    })
    .catch(error => {
      console.error('Error updating sequence:', error);
    }); 

    console.log("nextId:", nextId);
    return nextId;
  }  
}; // Close out the sequences object.

module.exports = sequences;
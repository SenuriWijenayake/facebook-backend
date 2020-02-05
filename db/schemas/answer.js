var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var answerSchema = new Schema({
  userId : String,
  questionId: Number,
  questionSet : String,
  initConfidence : Number,
  initRadioOpinion : String,
  initOpinion : String,
  manipulationRadioOpinion: { type : String, required: false },
  newConfidence : { type : Number, required: false },
  newRadioOpinion : { type : String, required: false },
  newOpinion : { type : String, required: false },
  like : { type : Number, required: false },
  comment : { type : Number, required: false },
  share : { type : Number, required: false },
  report : { type : Number, required: false },
  submitTime : { type : Date, required: false, default: Date.now },
  editTime : { type : Date, required: false, default: Date.now }
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;

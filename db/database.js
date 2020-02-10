//Import the mongoose module
var mongoose = require('mongoose');
// var mongoDB = 'mongodb://admin:admin1234@ds125272.mlab.com:25272/gender';
// var mongoDB = 'mongodb://admin:admin1234@ds237072.mlab.com:37072/gender-new';
var mongoDB = 'mongodb://localhost:27017/study4';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

//Importing schemas
var Result = require('./schemas/result');
var User = require('./schemas/user');
var Answer = require('./schemas/answer');
var BigFiveRaw = require('./schemas/bigFiveRaw');
var Chat = require('./schemas/chat');
var bigFiveQuestions = require('./bigFiveQuestions');


//Function to save the chat of the user
exports.saveRawChat = function(userId, chat) {
  return new Promise(function(resolve, reject) {

    console.log("Inside the database function");
    var myChat = new Chat({
      userId: userId,
      chat: chat
    });

    myChat.save(function(err) {
      if (err) throw err;
      resolve('Chat messages for' + userId.toString() + 'were saved successfully');
    });
  });

};

//Function to save the saw big five results to the database
exports.saveBigFiveRaw = function(userId, results) {
  var result = new BigFiveRaw({
    userId: userId,
    allAnswers: results
  });

  result.save(function(err) {
    if (err) throw err;
    console.log('Big five raw answers saved successfully!');
  });
};

//Function to save the big five results to the database
exports.saveBigFiveResults = function(userId, results) {
  var result = new Result({
    userId: userId,
    Extraversion: results.Extraversion,
    Agreeableness: results.Agreeableness,
    Conscientiousness: results.Conscientiousness,
    Neuroticism: results.Neuroticism,
    Openness: results.Openness
  });

  result.save(function(err) {
    if (err) throw err;
    console.log('Results saved successfully!');
  });
};

//Function to update an answer with seed
exports.updateAnswerWithSeed = function(answer,seed) {
  var bool = true;
  if (seed == 2){
    bool = false
  }
  var query = {
    userId: answer.userId,
    questionId: answer.questionId
  };
  var newData = {
    femaleFirst: bool
  };

  Answer.findOneAndUpdate(query, newData, {
    upsert: true
  }, function(err, doc) {
    if (err) reject(err);
    console.log("Seed saved");
  });

};

//Function to save user details
exports.saveUser = function(user) {
  return new Promise(function(resolve, reject) {
    var newUser = new User({
      gender: user.gender,
      genderSpecified: user.genderSpecified,
      age: user.age,
      education: user.education,
      educationSpecified: user.educationSpecified,
      socialmedia: user.socialmedia,
      questionSet: user.questionSet,
      qOrder : user.qOrder
    });

    newUser.save(function(err, newUser) {
      if (err) reject(err);
      resolve(newUser._id.toString());
    });
  });
};

//Function to save an answer
exports.saveAnswer = function(answer) {
  return new Promise(function(resolve, reject) {
    var newAnswer = new Answer({
      userId: answer.userId,
      questionId: answer.questionId,
      questionSet: answer.questionSet,
      initialOpinion: answer.initialOpinion,
      initialConfidence: answer.initialConfidence,
      initialFamiliarity: answer.initialFamiliarity,
      initialTextOpinion: answer.initialTextOpinion
    });

    newAnswer.save(function(err, newAnswer) {
      if (err) reject(err);
      resolve(newAnswer._id.toString());
    });
  });
};

//Function to update an answer
exports.updateAnswer = function(answer) {
  var query = {
    userId: answer.userId,
    questionId: answer.questionId
  };
  var newData = {
    manipulationRadioOpinion: answer.manipulationRadioOpinion,
    newOpinion: answer.newOpinion,
    newConfidence: answer.newConfidence,
    newTextOpinion: answer.newTextOpinion,
    like: answer.like,
    comment: answer.comment,
    share: answer.share,
    report: answer.report,
    editTime: Date.now()
  };

  return new Promise(function(resolve, reject) {
    Answer.findOneAndUpdate(query, newData, {
      upsert: true
    }, function(err, newAnswer) {
      if (err) reject(err);
      resolve(newAnswer._id.toString());
    });
  });
};

//Function to get the big five questions
exports.getBigFiveQuestions = function() {
  return (bigFiveQuestions);
};

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

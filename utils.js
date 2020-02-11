/*This file contains the utilities required for the logic on code.js*/

//Importing the questions
exports.questions = require('./db/questions');
exports.questionsTwo = require('./db/questionsTwo');

//Function to randomize the distribution size values
exports.randValues = function(isMajority, sizeValues) {

  if (isMajority == 'True') {
    isMajority = true;
  }
  if (isMajority == 'False') {
    isMajority = false;
  }

  //Remove zeros
  var noZeros = [];
  var offset = Math.floor(Math.random() * 4) + 1;

  //Determine the offset
  if (this.areArraysEqual(sizeValues, [50, 40, 10, 0]) ||
    this.areArraysEqual(sizeValues, [40, 30, 30, 0]) ||
    this.areArraysEqual(sizeValues, [40, 50, 10, 0]) ||
    this.areArraysEqual(sizeValues, [5, 90, 5, 0]) ||
    this.areArraysEqual(sizeValues, [30, 40, 30, 0])) {

    offset = Math.floor(Math.random() * 2) + 1
  }

  for (var i = 0; i < sizeValues.length; i++) {
    if (sizeValues[i] != 0) {
      noZeros.push(sizeValues[i]);
    }
  }

  var arrayLength = noZeros.length;

  if (isMajority == true) {
    console.log("Inside majority");
    if (arrayLength == 1) {
      noZeros.push(0);
      noZeros.push(0);
      noZeros.push(0);
    }

    if (arrayLength == 2) {
      noZeros[0] = noZeros[0] - offset;
      noZeros[1] = noZeros[1] + offset;
      noZeros.push(0);
      noZeros.push(0);
    }

    if (arrayLength == 3) {
      noZeros[0] = noZeros[0] - offset * 2;
      noZeros[1] = noZeros[1] + offset;
      noZeros[2] = noZeros[2] + offset;
      noZeros.push(0);
    }
    noZeros.sort(function(a, b) {
      return b - a
    });
  } else {
    console.log("Inside minority");
    if (arrayLength == 2) {
      noZeros[0] = noZeros[0] + offset;
      noZeros[1] = noZeros[1] - offset;
      noZeros.push(0);
      noZeros.push(0);
    }

    if (arrayLength == 3) {
      noZeros[0] = noZeros[0] + offset;
      noZeros[1] = noZeros[1] - offset * 2;
      noZeros[2] = noZeros[2] + offset;
      noZeros.push(0);
    }
  }
  console.log(noZeros);
  return (noZeros);
};

//Function to get question by questionNumber
exports.getQuestionByNumber = function(set, number) {
  var questions;
  if (set == "1"){
    questions = this.questions;
  } else{
    questions = this.questionsTwo;
  }

  for (var i = 0; i < questions.length; i++) {
    if (questions[i].questionNumber == number) {
      return (questions[i]);
    }
  }
};

//Returns the answer given the answer id
exports.getAnswerById = function(answers, id) {
  for (var i = 0; i < answers.length; i++) {
    if (answers[i].id == id) {
      return (answers[i]);
    }
  }
}

//Function to compare two arrays
exports.areArraysEqual = function(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      return (false);
    }
  }
  return (true);
}

//Returns the manipulation check for each question
exports.getManipulationForQuestion = function(set, id) {
  var question = this.getQuestionByNumber(set, id);
  return (question.majority);
}

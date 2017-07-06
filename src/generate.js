var conjugate = require('./conjugate');
var nouns = require('../data/nouns.json');
var predicatePronouns = require('../data/predicate_pronouns.json');
var subjectPronouns = require('../data/subject_pronouns.json');
var verbs = require('../data/verbs.json');
var tenses = require('../data/tenses.json');
var predicates = require('../data/predicates.json');

var randInt = function(a, b) {
  return Math.floor(Math.random() * (b - a) + a);
};

var randomElement = function(array) {
  return array[randInt(0, array.length)];
};

var template = function(templateString, actions) {
  Object.keys(actions).forEach(function(actionName) {
    var actionFunction = actions[actionName];
    var matcher = new RegExp('{{ ' + actionName + ' }}');
    while(matcher.test(templateString)) {
      templateString = templateString.replace(matcher, actionFunction());
    }
  });

  return templateString;
};

var actions = {
  noun: function() {
    return randomElement(nouns);
  },

  subject_pronoun: function() {
    return randomElement(subjectPronouns);
  },

  predicate_pronoun: function() {
    return randomElement(predicatePronouns);
  },

  verb: function() {
    return randomElement(verbs);
  },

  tensed_verb: function() {
    return template(randomElement(tenses), actions);
  },

  predicate: function() {
    return template(randomElement(predicates), actions);
  },
};

module.exports = function() {
  var person = randInt(1, 4); // 1-3
  var plural = Boolean(randInt(0, 2)); // true or false
  var tense = randomElement(conjugate.TENSES); 

  var pronoun = subjectPronouns[ person - 1 + Number(plural) * 3 ];
  var stem = randomElement(Object.keys(verbs));
  var conjugated = conjugate(stem, person, plural, tense);

  return pronoun + ' ' + conjugated + ' ' + actions.predicate();
};

console.log(module.exports());


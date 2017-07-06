var nouns = require('../data/nouns.json');
var predicatePronouns = require('../data/predicate_pronouns.json');
var subjectPronouns = require('../data/subject_pronouns.json');
var verbs = require('../data/verbs.json');
var tenses = require('../data/tenses.json');
var predicates = require('../data/predicates.json');

var randomElement = function(array) {
  var i = Math.floor(Math.random() * array.length);
  return array[i];
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
  return template('{{ subject_pronoun }} {{ tensed_verb }} {{ predicate }}', actions);
};


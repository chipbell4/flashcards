var Sentencer = require('sentencer');
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

Sentencer.configure({
  nounList: nouns,

  actions: {
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
      return Sentencer.make(randomElement(tenses));
    },

    subject: function() {
      // TODO: Make this smarter
      if(Math.random() < 0.5) {
        return Sentencer.make('{{ a_noun }}');
      } else {
        return Sentencer.make('the {{ noun }}');
      }
    },

    predicate: function() {
      return Sentencer.make(randomElement(predicates));
    },
  }
});

console.log(Sentencer.make('{{ subject }} {{ tensed_verb }} {{ predicate }}'));
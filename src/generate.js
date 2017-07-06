var Sentencer = require('sentencer');
var nouns = require('../data/nouns.json');
var predicatePronouns = require('../data/predicate_pronouns.json');
var subjectPronouns = require('../data/subject_pronouns.json');
var verbs = require('../data/verbs.json');
var tenses = require('../data/tenses.json');
var sentenceStructures = require('../data/sentence_structures.json');

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
      if(Math.random() < 0.5) {
        return Sentencer.make('{{ a_noun }}');
      } else {
        return Sentencer.make('the {{ noun }}');
      }
    },
  }
});

console.log(Sentencer.make('{{ subject }} {{ tensed_verb }}'));

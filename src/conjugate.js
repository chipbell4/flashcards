var pronouns = require('../data/subject_pronouns.json');
var verbs = require('../data/verbs.json');

var TENSES = [
  'present',
  'past',
  'future',
  'past imperfect',
  'present perfect',
  'past perfect',
  'conditional',
  'conditional perfect',
  'continuous present',
  'continuous past',
  'continuous future'
];

var conjugate = function(verb, person, plural, tense) {
  var subjectIndex = person - 1;
  if(plural) {
    subjectIndex += 3;
  }

  var verbConfig = verbs[verb];
  var conjugatedVerb = verb;
  if(tense === 'present') {
    if(verbConfig.present instanceof Array) {
      conjugatedVerb = verbConfig.present[subjectIndex]; 
    } else if(subjectIndex === 1) {
      conjugatedVerb = verbConfig.present + 's';
    } else {
      conjugatedVerb = verbConfig.present;
    }
  } else if(tense === 'past') {
    if(verbConfig.past instanceof Array) {
      conjugatedVerb = verbConfig.past[subjectIndex]; 
    } else {
      conjugatedVerb = verbConfig.past;
    }
  } else if(tense === 'future') {
    conjugatedVerb = 'will ' + verb;
  } else if(tense === 'past imperfect') {
    conjugatedVerb = 'used to ' + verb;
  } else if(tense === 'present perfect') {
    conjugatedVerb = 'have ' + verbConfig.participle;
  } else if(tense === 'past perfect') {
    conjugatedVerb = 'had ' + verbConfig.participle;
  } else if(tense === 'conditional') {
    conjugatedVerb = 'would ' + verb;
  } else if(tense === 'conditional perfect') {
    conjugatedVerb = 'would have ' + verbConfig.participle;
  } else if(tense === 'continuous past') {
    var auxillary = conjugate('be', person, plural, 'past'); 
    var gerund = verbConfig.gerund || verb + 'ing';
    conjugatedVerb = auxillary + ' ' + gerund;
  } else if(tense === 'continuous present') {
    var auxillary = conjugate('be', person, plural, 'present'); 
    var gerund = verbConfig.gerund || verb + 'ing';
    conjugatedVerb = auxillary + ' ' + gerund;
  } else if(tense === 'continuous future') {
    var gerund = verbConfig.gerund || verb + 'ing';
    conjugatedVerb = 'will be ' + gerund;
  }

  return conjugatedVerb;
};

module.exports = conjugate;
module.exports.TENSES = TENSES;

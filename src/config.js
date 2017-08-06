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

module.exports = {
  buildAllCheckboxes: function() {
    var container = document.getElementById('tense-selection');
    TENSES.forEach(function(tense) {
      container.appendChild(this.buildCheckbox(tense));
    }.bind(this));
  },

  buildCheckbox: function(tense) {
    var displayTense = tense.charAt(0).toUpperCase() + tense.slice(1);
    var idTense = tense.replace(/ /g, '-');

    var container = document.createElement('span');
    container.classList.add('checkbox-container');
    var label = document.createElement('label');
    label.classList.add('checkbox-label');
    label.innerText = displayTense;
    label.setAttribute('for', idTense);
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.id = idTense

    container.appendChild(label);
    container.appendChild(input);

    return container;
  },
};
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
  availableTenses: function() {
    var filtered = TENSES.filter(function(tense) {
      var id = tense.replace(/ /g, '-');
      return document.getElementById(id).checked;
    });

    if(filtered.length === 0) {
      return [TENSES[0]];
    }

    return filtered;
  },

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

    var localStorageKey = idTense + '-checked';
    if(localStorage.getItem(localStorageKey) === null) {
      localStorage.setItem(localStorageKey, true);
      input.checked = true;
    } else {
      input.checked = localStorage.getItem(localStorageKey) === 'true';
    }

    input.addEventListener('change', function() {
      localStorage.setItem(localStorageKey, input.checked);
    });

    container.appendChild(label);
    container.appendChild(input);

    return container;
  },

  tenses: TENSES
};

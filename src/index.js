var generate = require('./generate.js');
var config = require('./config.js');

var sentenceContainer = document.getElementById('sentence');

var refresh = function() {
  sentenceContainer.innerText = generate();
};

document.addEventListener('click', refresh);
document.addEventListener('keydown', function(evt) {
  if(evt.keyCode === 13) {
    refresh();
  }
})

document.getElementById('tab').addEventListener('click', function(evt) {
  // don't regenerate a sentence, since that wasn't user intention
  evt.stopPropagation();

  var tab = evt.target;

  var configContainer = document.getElementById('config-container');
  configContainer.classList.toggle('showing');

  if(configContainer.classList.contains('showing')) {
    tab.innerHTML = '▼';
  } else {
    tab.innerHTML = '▲';
  }

  return false;
});

config.buildAllCheckboxes();
refresh();

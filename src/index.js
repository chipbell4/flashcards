var generate = require('./generate.js');

var sentenceContainer = document.getElementById('sentence');

var refresh = function() {
  sentenceContainer.innerText = generate();
};

var refreshButton = document.getElementById('refresh');
document.addEventListener('click', refresh);
refresh();

var generate = require('./generate.js');

var sentenceContainer = document.getElementById('sentence');

var refresh = function() {
  sentenceContainer.innerText = generate();
};

document.addEventListener('click', refresh);
refresh();

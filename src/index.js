var generate = require('./generate.js');

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
refresh();

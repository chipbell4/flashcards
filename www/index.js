window.App = {
  init: function() {
    this.sentenceContainer = document.getElementById('sentence');
    this.refreshButton = document.getElementById('refresh');
    this.refreshButton.addEventListener('click', this.refresh.bind(this));
  },

  isIgnorableSentence: function() {
    return false;
  },

  sentencesRemaining: [],

  getSentence: function() {
    if(this.sentencesRemaining.length > 0) {
      return Promise.resolve(this.sentencesRemaining.pop());
    }

    return fetch('https://randomwordgenerator.com/json/sentences.json')
      .then(response => response.json())
      .then(rawJson => rawJson.data.map(sentenceObj => sentenceObj.sentence))
      .then(sentences => {
        this.sentencesRemaining = sentences.filter(sentence => !this.isIgnorableSentence(sentence));
        return this.sentencesRemaining.pop();
      });
  },

  refresh: function() {
    this.getSentence().then(sentence => this.sentenceContainer.innerText = sentence);
  }
};

window.App.init();
window.App.refresh();

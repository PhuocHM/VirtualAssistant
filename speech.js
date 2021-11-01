const synth = window.speechSynthesis;

const textToSpeech = (string) => {
  let voice = new SpeechSynthesisUtterance(string);
  voice.text = string;
  voice.lang = "en-GB";
  voice.volume = 1;
  voice.rate = 1;
  voice.pitch = 1;
  synth.speak(voice);
};

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.onresult = function (event) {
  var lastResult = event.results.length - 1;
  var content = event.results[lastResult][0].transcript;
  output(content);
};
function regStart() {
  recognition.start();
}

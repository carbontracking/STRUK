var mySynth = window.speechSynthesis;
var myVoices = mySynth.getVoices();
var currentVoice;
var nav = 0;
for(var i = 0; i < myVoices.length; i++) {
    if (myVoices[i].lang === "fr-FR") {
        currentVoice = i;
        speakElement(document.getElementsByClassName('selected'));
        break;
    }
}
console.log(navigator.userAgent);
for (let poulet = 0; poulet < navigator.userAgent.length; poulet++)
{
    if (navigator.userAgent[poulet] == "F" && navigator.userAgent[poulet+1] == "i"&&
	navigator.userAgent[poulet+2] == "r" && navigator.userAgent[poulet+3] == "e" &&
	navigator.userAgent[poulet+4] == "f"&& navigator.userAgent[poulet+5] == "o"&&
	navigator.userAgent[poulet+6] == "x")
    {
	nav = 1;
	break;
    }
}
if (currentVoice === undefined && nav === 1) {
    document.location.reload(true);
}

function speakElement(myText) {
    var tts = arrangeTextElement(myText);
    var myUtterance = new SpeechSynthesisUtterance(tts);

    if (mySynth.speaking === true) {
        mySynth.cancel();
    }
    myUtterance.voice = myVoices[currentVoice];
    myUtterance.lang = myVoices[currentVoice].lang;
    myUtterance.rate = 0.8;
    mySynth.speak(myUtterance);
}

function arrangeTextElement(myText) {
  var tts = "";
  var textLength = myText.length;

  for(var i = 0; i < textLength; i++) {
    if (i !== 0) {
      tts += '.';
    }
    tts += ' ' + myText[i].innerText;
  }
  return (tts);
}

// lecture par phrase

function speakPhrase(tts) {
    var myUtterance = new SpeechSynthesisUtterance(tts);

    if (mySynth.speaking === true) {
	mySynth.cancel();
    }
    myUtterance.voice = myVoices[currentVoice];
    myUtterance.lang = myVoices[currentVoice].lang;
    myUtterance.rate = 0.8;
    mySynth.speak(myUtterance);
}

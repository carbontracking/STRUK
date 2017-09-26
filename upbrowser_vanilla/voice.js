var mySynth;
var myVoices;
var currentVoice;
var nav = 0;
var start = 0;

speakElement(document.getElementsByClassName('selected'));
start = 1;
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
    mySynth = window.speechSynthesis;
    myVoices = mySynth.getVoices();
    currentVoice = 1;
    tts = arrangeTextElement(myText);
    var myUtterance = new SpeechSynthesisUtterance(tts);
    if (mySynth.speaking === true) {
        mySynth.cancel();
    }
    myUtterance.voice = myVoices[1];
    if (myUtterance.voice === null || myUtterance.voice.name === "Google US English")
	    myUtterance.voice = myVoices[6];
    myUtterance.lang = "fr-FR";
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
    myUtterance.voice = myVoices[1];
    if (myUtterance.voice === null || myUtterance.voice.name === "Google US English")
	    myUtterance.voice = myVoices[6];
    myUtterance.lang = "fr-FR",
    myUtterance.rate = 0.8;
    mySynth.speak(myUtterance);
}

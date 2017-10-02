var mySynth;
var myVoices;
var currentVoice;
var nav = 0;

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
	    if (myUtterance.voice != null)
	    {
	        var i = 0;
	        while (myVoices[i].lang != "fr-FR")
	        {
	            i++;
	        }
	        myUtterance.voice = myVoices[i];
	    }
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
    var i = 0;
    var tmp = "";
    while (i < tts.length)
    {
        if (tts[i] === '<' && tts[i+1] === 'i' && tts[i+2] === 'm' && tts[i+3] === 'g')
        {
            while (i < tts.length)
            {
                if (tts[i] === 'a' && tts[i+1] === 'l' && tts[i+2] === 't' && tts[i+3] === '=' && tts[i+4] === '\"')
                {
                    i = i + 5;
                    while (tts[i] != '\"')
                    {
                        tmp += tts[i];
                        i++;
                    }
                    while (tts[i] != '/' && tts[i+1] != '>')
                    i++;
                    i = i + 2;
                    break;
                }
                else
                    i++;
            }
        }
        else if (tts[i] === '<' && tts[i+1] === 'a')
        {
            while (tts[i] != '>')
            i++;
            tmp += "lien, ";
        }
        else if(tts[i] === '<' && tts[i+1] === '/' && tts[i+2] === 'a' && tts[i+3] === '>')
        {
            tmp += ", fin de lien";
            i = i + 4;
        }
        else
        {
            tmp += tts[i];
            i++;
        }
    }
    var myUtterance = new SpeechSynthesisUtterance(tmp);

    if (mySynth.speaking === true) {
	mySynth.cancel();
    }
    myUtterance.voice = myVoices[1];
    if (myUtterance.voice != null)
    {
        var i = 0;
        while (myVoices[i].lang != "fr-FR")
        {
            i++;
            
        }
        myUtterance.voice = myVoices[i];
    }
    myUtterance.lang = "fr-FR",
    myUtterance.rate = 0.8;
    mySynth.speak(myUtterance);
}
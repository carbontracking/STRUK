
//on defini les globale pour modifier la langue
{
var mySynth;
var myVoices;
var lang_value = "fr-FR";
var parole = 1;
}

// on regard si le navigateur est firefox
for (let poulet = 0; poulet < navigator.userAgent.length; poulet++)
{
    if (navigator.userAgent[poulet] == "F" && navigator.userAgent[poulet+1] == "i"&&
	navigator.userAgent[poulet+2] == "r" && navigator.userAgent[poulet+3] == "e" &&
	navigator.userAgent[poulet+4] == "f"&& navigator.userAgent[poulet+5] == "o"&&
	navigator.userAgent[poulet+6] == "x")
    {
        //si c'est firefox alors on lit le premier element selectionné    
        speakElement(document.getElementsByClassName("selected"));
        break;
    }
}

// google ne renvoi les voix qu'après le script donc chrome ne pourra pas parler au lancement de l'appli
//Cependant vous pouvez remplacer speakphrase par speake element(document.getElementsbyClassName("selected")) pour utiliser la voix de l'os
//Mais depuis les mise a jours de chrome utiliser les voix windows n'est pas recommandé.
for (let poulet = 0; poulet < navigator.userAgent.length; poulet++)
{
    if (navigator.userAgent[poulet] == 'C' && navigator.userAgent[poulet+1] == 'h'&&
	navigator.userAgent[poulet+2] == 'r' && navigator.userAgent[poulet+3] == 'o' &&
	navigator.userAgent[poulet+4] == 'm' && navigator.userAgent[poulet+5] == 'e')
    {
    //parle dans le vide pour mettre fin au script et recuperer les voix de google
    speakPhrase("");
	break;
    }
}

//lance la voix de synthese
function speakElement(myText)
{
    if (parole == 1)
    {
        mySynth = window.speechSynthesis;
        myVoices = mySynth.getVoices();
        tts = arrangeTextElement(myText);
        if (mySynth.speaking === true)
        {
            mySynth.cancel();
        }
        var myUtterance = new SpeechSynthesisUtterance(tts);
        myUtterance.voice = myVoices[1];
        if (myUtterance.voice != null)
        {
            var i = 0;
	        var cpt = "";
	        while (i < myVoices.length)
	        {
	            if (myVoices[i].lang === lang_value)
	                cpt += i;
	            i++;
	        }
	        if (cpt.length === 1)
	            i = cpt[0];
	        else if (cpt.length === 2)
	            i = cpt[1];
	       else
	            i = 0;
	        myUtterance.voice = myVoices[i];
	    }
        myUtterance.lang = lang_value;
        myUtterance.rate = 1;
        window.speechSynthesis.speak(myUtterance);
    }
}


//parse les elements recuperé par getElementsbyClassName
function arrangeTextElement(myText)
{
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

// lecture phrase par phrase
function speakPhrase(tts)
{
    if (parole == 1)
    {
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
    mySynth = window.speechSynthesis;
    myVoices = mySynth.getVoices();
    currentVoice = 1;
    var myUtterance = new SpeechSynthesisUtterance(tmp);

    if (mySynth.speaking === true)
    {
        mySynth.cancel();
    }
    myUtterance.voice = myVoices[1];
    if (myUtterance.voice != null)
    {
        var i = 0;
        var cpt = "";
        while (i < myVoices.length)
	        {
	            if (myVoices[i].lang === lang_value)
	                cpt += i;
	            i++;
	        }
	        if (cpt.length === 1)
	            i = cpt[0];
	       else if (cpt.length === 2)
	            i = cpt[1];
	       else
	            i = 0;
        myUtterance.voice = myVoices[i];
    }
    myUtterance.lang = lang_value,
    myUtterance.rate = 1;
    mySynth.speak(myUtterance);
    }
}
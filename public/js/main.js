//pour que Menu soit focus par default
document.getElementsByClassName("selected")[0].focus();

//evenement: quand on utilise le clavier dans le document
document.onkeydown = applyKey;

//touches utilisées
{
var KEY_DOWN	= 40;
var KEY_UP		= 38;
var KEY_LEFT	= 37;
var KEY_RIGHT	= 39;
var KEY_END		= 35;
var KEY_BEGIN	= 36;
var KEY_ENTER	= 13;
var KEY_SPACE	= 32;
var KEY_K		= 75;
var KEY_L		= 76;
var KEY_M		= 77;
var KEY_ESC		= 27;
var REMAP_KEY_T	= 5019;
var KEY_DEL		= 46;
var KEY_A		= 65;
var KEY_B		= 66;
var KEY_C		= 67;
var KEY_D		= 68;
var KEY_E		= 69;
var KEY_F		= 70;
var KEY_G		= 71;
var KEY_H		= 72;
var KEY_I		= 73;
var KEY_J		= 74;
var KEY_N		= 78;
var KEY_O		= 79;
var KEY_P		= 80;
var KEY_Q		= 81;
var KEY_R		= 82;
var KEY_S		= 83;
var KEY_T		= 84;
var KEY_U		= 85;
var KEY_V		= 86;
var KEY_W		= 87;
var KEY_X		= 88;
var KEY_Y		= 89;
var KEY_Z		= 90;
var KEY_PF1		= 112;
var KEY_PF2		= 113;
var KEY_PF3		= 114;
var KEY_PF4		= 115;
var KEY_PF5		= 116;
var KEY_PF6		= 117;
var KEY_PF7		= 118;
var KEY_PF8		= 119;
}

//initialisation des globales
{
var nav_upb = 1;
var nav_totale = 1;
var elem = 0;
var size = 1;
var drop = 0;
}

while (document.body.getElementsByClassName(size)[0])
	size++;
//initialisation de l'evenement en fonction du naviguateur
function checkEventObj ( _event_ )
{
    // verifions si le navigateur est IE
    if ( window.event )
		return window.event;
    // Si ce n'est pas IE
    else
		return _event_;
}

function applyKey (_event_)
{
	
	//initialisation des variables tel que la fenetre node keyCode..
	{
    var winObj = checkEventObj(_event_);
    var intKeyCode = winObj.keyCode;
    var intCtrlKey = winObj.ctrlKey;
    var intShiftKey = winObj.shiftKey;
    }
    //different message en fonction des langues
	{
	var msg1;
	var msg2;
	var msg3;
	var msg4;
	var msg5;
	var msg6;
	var msg7;
	
	if (lang_value === "en-US")
	{
		msg1 = "end of the page";
		msg2 = "start of the page";
		msg3 = "wrong selection";
		msg4 = "you wrote: ";
		msg5 = ". And you enter in the Upbrowser's navigation";
		msg6 = "ou enter in the Upbrowser's navigation";
		msg7 = "You are out of the Upbrowser navigation";
	}
	else if (lang_value === "fr-FR")
	{
		msg1 = "fin de la page";
		msg2 = "Début de la page";
		msg3 = "sélection incorrecte";
		msg4 = "Vous avez écrit: ";
		msg5 = ". Et vous entrez en navigation upbrowser.";
		msg6 = "Vous entrez en navigation upbrowser";
		msg7 = "vous sortez de la navigation upbrowser";
	}
	else
	{
		msg1 = "final de página";
		msg2 = "inicio de página";
		msg3 = "seleccion incorrecta";
		msg4 = "usted ha escrito: ";
		msg5 = ". Y navegas por Upbrowser.";
		msg6 = "Ingresas la navegación de Upbrowser.";
		msg7 = "deja la navegación Upbrowser";
	}
	}
	
	if (intKeyCode == KEY_A)
	{
		console.log(document.getElementsByClassName("jcrop-selection jcrop-current"));
	}
	if (nav_totale == 0)
	{
		if (intKeyCode == KEY_U && intCtrlKey == true && intShiftKey == true)
			nav_totale = 1;
		if (nav_upb == 0)
		{
			if (intKeyCode == KEY_ENTER)
			{
				nav_upb = 1;
				var phrase_mem;
				if (document.getElementsByClassName(elem)[0])
				{
					if (document.activeElement.value)
					{
						phrase_mem = document.activeElement.value;
						if (phrase_mem.length != 0)
							speakPhrase(msg4+phrase_mem);
					}
				}
				if (document.activeElement)
					document.activeElement.blur();
				drop = 0;
				winObj.keyCode = intKeyCode = REMAP_KEY_T;
				winObj.returnValue = false;
				return false;
			}
			
			if (intKeyCode == KEY_UP)
			{
				if (document.activeElement.tagName == "SELECT")
				{
					if (drop > 0)
						drop--;
					speakPhrase(document.activeElement[drop].value)
				}
			}
			
			else if (intKeyCode == KEY_DOWN)
			{
				if (document.activeElement.tagName == "SELECT")
				{
					if (drop < document.activeElement.length-1)
						drop++;
					speakPhrase(document.activeElement[drop].value)
				}
			}
			
			else if (intKeyCode == KEY_LEFT)
			{
				if (document.activeElement.tagName == "SELECT")
				{
					if (drop > 0)
						drop--;
					speakPhrase(document.activeElement[drop].value)
				}
			}
			
			else if (intKeyCode == KEY_RIGHT)
			{
				if (document.activeElement.tagName == "SELECT")
				{
					if (drop < document.activeElement.length-1)
						drop++;
					speakPhrase(document.activeElement[drop].value)
				}
			}
			
			else
				drop = 0;
		}
	
		if (nav_upb === 1)
		{
			if (intKeyCode == KEY_ENTER)
			{
				var new_elem;
				if (document.getElementsByClassName(elem)[0])
					new_elem = document.getElementsByClassName(elem)[0];
				else if (document.getElementsByClassName("selected")[0])
					new_elem = document.getElementsByClassName("selected")[0];
				new_elem.focus();
				if ((new_elem.tagName == "INPUT" || new_elem.tagName == "TEXTAREA" || new_elem.tagName == "SELECT") && (new_elem.attributes.type.value == "text" || new_elem.attributes.type.value == "email" || new_elem.attributes.type.value == "password" || new_elem.attributes.type.value == "radio"))
				{
					nav_upb = 0;
					winObj.keyCode = intKeyCode = REMAP_KEY_T;
					winObj.returnValue = false;
					return false;
				}
			}
		
    		if (intKeyCode == KEY_L)
			{
		if (lang_value === "es-US")
		{
			lang_value = "en-US";
			speakPhrase("english");
		}
		else if (lang_value === "en-US")
		{
			lang_value = "fr-FR";
			speakPhrase("français");
		}
		else
		{
			lang_value = "es-US";
			speakPhrase("Espanol");
		}
		winObj.keyCode = intKeyCode = REMAP_KEY_T;
		winObj.returnValue = false;
		return false;
	}

			else if (intKeyCode == KEY_SPACE)
			{
				var selection;
    			if (window.getSelection())
    				selection = window.getSelection().anchorNode;
    			else
    				selection = document.getSelection().anchorNode;
    			if (selection != null)
    			{
    				var k = 0;
    				var class_found = 0;
    				while (k < size)
    				{
    					if (k==selection.parentElement.className)
    					{
    						class_found = 1;
    						break;
    					}
    					k++;
    				}
			   		if (class_found === 1)
    				{
    					//si on a trouvé une selection on supprime la selection actuel pour la remplacer
    					if (document.getElementsByClassName('selected')[0])
    						document.getElementsByClassName('selected')[0].className = elem;
    					elem = selection.parentElement.className;
    					selection.parentElement.className = "selected";
        		 		document.getElementsByClassName("selected")[0].scrollIntoView();
    					speakPhrase(document.getElementsByClassName("selected")[0].innerHTML);
    					if (document.getElementsByClassName(elem)[0])
    						read_selected();
    					else if (document.getElementsByClassName("selected")[0])
    						read_classname();
    				}
    				else
    					speakPhrase(msg3);
    			}
    			else
    				speakPhrase(msg3);
    			winObj.keyCode = intKeyCode = REMAP_KEY_T;
				winObj.returnValue = false;
				return false;
			}
	
    		else if (intKeyCode == KEY_RIGHT)
    		{
    		if (elem < size-1)
    		{
    			if(document.activeElement)
    				document.activeElement.blur();
    			elem++;
    			var new_class = 1;
    			while (elem < size-1 && document.getElementsByClassName(elem)[0].attributes[0].value == "ok")
    			{
    				elem++;
    				new_class++;
    			}
    			if (document.getElementsByClassName("selected")[0])
    				document.getElementsByClassName("selected")[0].className = elem-new_class;
    			document.getElementsByClassName(elem)[0].className = "selected";
    			if (document.getElementsByClassName(elem)[0])
    				read_selected();
    			else if (document.getElementsByClassName("selected")[0])
    				read_classname();
    		}
    		else
    			speakPhrase(msg1);
    		if (document.getElementsByClassName("selected")[0])
    			document.getElementsByClassName("selected")[0].scrollIntoView();
    		winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			return false;
    	}

    		else if (intKeyCode == KEY_LEFT)
    		{
    		if (elem > 0)
    		{
    			if (document.activeElement)
    				document.activeElement.blur();
    			var num = 1;
    			elem--;
    			while (elem > 0 && document.getElementsByClassName(elem)[0].attributes[0].value == "ok")
    			{
    				elem--;
    				num++;
    			}
    			if (document.getElementsByClassName("selected")[0])
    				document.getElementsByClassName("selected")[0].className = elem+num;
    			document.getElementsByClassName(elem)[0].className = "selected";
    			if (document.getElementsByClassName(elem)[0])
    				read_selected();
    			else if (document.getElementsByClassName("selected")[0])
    				read_classname();
    		}
    		else
    			speakPhrase(msg2);
    		if (document.getElementsByClassName("selected")[0])
    			document.getElementsByClassName("selected")[0].scrollIntoView();
    		winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			return false;
		}
	
			else if (intKeyCode == KEY_UP)
			{
			if (elem != -1)
			{
				document.getElementsByClassName("selected")[0].className = elem;
				var tmp = elem-1;
				while (tmp > 0 && document.getElementsByClassName(tmp)[0].tagName[0] != "H")
					tmp--;
				var title = document.getElementsByClassName(tmp)[0];
				if (tmp >= 0)
				{
					elem = tmp;
					title.className = "selected";
					title.scrollIntoView();
					if (document.activeElement)
						document.activeElement.blur();
					if (title.tagName == 'A')
						title.focus();
					speakPhrase(title.textContent);
				}
				else
				{
					document.getElementsByClassName(elem)[0].className = "selected";
					speakPhrase(msg2);
				}
			}
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			return false;
		}
		
			else if (intKeyCode == KEY_DOWN)
			{
			if (elem != -1)
			{
				document.getElementsByClassName("selected")[0].className = elem;
				var tmp = elem+1;
				while (tmp < size && document.getElementsByClassName(tmp)[0].tagName[0] != "H")
					tmp++;
				var title = document.getElementsByClassName(tmp)[0];
				if (tmp < size && document.getElementsByClassName(tmp)[0].tagName[0] === "H")
				{
					elem = tmp;
					title.className = "selected";
					title.scrollIntoView();
					if (document.activeElement)
						document.activeElement.blur();
					if (title.tagName == 'A')
						title.focus();
					speakPhrase(title.textContent);
				}
				else
				{
					document.getElementsByClassName(elem)[0].className = "selected";
					speakPhrase(msg1);
				}
			}
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			return false;
		}
		
			if (intKeyCode == KEY_S)
			{
		if (mySynth.speaking === true)
		{
        	mySynth.cancel();
        	parole = 0;
		}
		else
		{
			parole = 1;
			if (document.getElementsByClassName("selected")[0])
				speakPhrase(document.getElementsByClassName("selected")[0].textContent)
			else if (document.getElementsByClassName("selected2")[0])
				speakPhrase(document.getElementsByClassName("selected2")[0].innerHTML)
		}
		winObj.keyCode = intKeyCode = REMAP_KEY_T;
		winObj.returnValue = false;
		return false;
	}
		}
		else if (document.getElementsByClassName(elem)[0])
		{
		if (document.getElementsByClassName(elem)[0].tagName == "INPUT" || document.getElementsByClassName(elem)[0].tagName == "TEXTAREA")
		{
			if (document.getElementsByClassName(elem)[0].attributes.type.value == "text" || document.getElementsByClassName(elem)[0].attributes.type.value == "email")
				speakPhrase(winObj.key);
			if (document.getElementsByClassName(elem)[0].attributes.type.value == "radio")
			{
				if (document.activeElement.value == "Oui")
					speakPhrase("Non");
				else
					speakPhrase("Oui");
			}
		}
	}
	}
	else
	{
		if (intKeyCode == KEY_U && intCtrlKey == true && intShiftKey == true)
			nav_totale = 0;
	}
}


function read_selected()
{
	var nw_sel = document.getElementsByClassName(elem)[0];
    if (nw_sel.tagName == "INPUT" || nw_sel.tagName == "TEXTAREA" || nw_sel.tagName == "SELECT")
    {
    	if (nw_sel.tagName != "SELECT" && nw_sel.attributes.type.value != "text" && nw_sel.attributes.type.value != "email" && nw_sel.attributes.type.value != "radio" && nw_sel.attributes.type.value != "password")
    	{
    		nw_sel.focus();
    		speakPhrase(document.getElementsByClassName("selected")[0].innerHTML+", "+nw_sel.attributes.type.value);
    	}
    	else
    	{
    		if (nw_sel.value.length === 0)
    			speakPhrase(document.getElementsByClassName("selected")[0].innerHTML+", "+nw_sel.attributes.type.value+": vide.");
    		else
    			speakPhrase(document.getElementsByClassName("selected")[0].innerHTML+", "+nw_sel.attributes.type.value+": "+nw_sel.value+".");
    	}
    }
    else
    {
    	nw_sel.focus();
    	speakPhrase(document.getElementsByClassName("selected")[0].innerHTML);
    }
}

function read_classname()
{
	var nw_sel = document.getElementsByClassName("selected")[0];
    if (nw_sel.tagName == "INPUT" || nw_sel.tagName == "TEXTAREA" || nw_sel.tagName == "SELECT")
    {
    	if (nw_sel.tagName != "SELECT" && nw_sel.attributes.type.value != "text" && nw_sel.attributes.type.value != "email" && nw_sel.attributes.type.value != "radio" && nw_sel.attributes.type.value != "password")
    	{
    		nw_sel.focus();
    		speakPhrase(document.getElementsByClassName("selected")[0].innerHTML+", "+nw_sel.attributes.type.value);
    	}
    	else
    	{
    		if (nw_sel.value.length === 0)
    			speakPhrase(document.getElementsByClassName("selected")[0].innerHTML+", "+nw_sel.attributes.type.value+": vide.");
    		else
    			speakPhrase(document.getElementsByClassName("selected")[0].innerHTML+", "+nw_sel.attributes.type.value+": "+nw_sel.value+".");
    	}
    }
    else
    {
    	nw_sel.focus();
    	speakPhrase(document.getElementsByClassName("selected")[0].innerHTML+", "+nw_sel.attributes.type.value);
   }
}
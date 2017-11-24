//evenement: quand on utilise le clavier dans le document
document.onkeydown = applyKey;

//clavier
{
var KEY_PDOWN	= 34;
var KEY_PUP		= 33;
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
var KEY_C		= 67;
var KEY_J		= 74;
var KEY_S		= 83;
var KEY_H		= 72;
var KEY_D		= 68;
var KEY_DEL		= 46;
var REMAP_KEY_T	= 5019;
var KEY_BACK_TAB 	= 8;
var KEY_TAB		= 9;
var KEY_SH_TAB  	= 16;
var KEY_ESC		= 27;
var KEY_A		= 65;
var KEY_B		= 66;
var KEY_E		= 69;
var KEY_F		= 70;
var KEY_G		= 71;
var KEY_I		= 73;
var KEY_N		= 78;
var KEY_O		= 79;
var KEY_P		= 80;
var KEY_Q		= 81;
var KEY_R		= 82;
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
var size = 0;
var glob = 0;
var g_pos = 1;
var memory_node = 0;
var phrase = 0;
var length = 0;

while (document.getElementById(length))
	length++;
length--;
}

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
	//different message en fonction des langues
	{
	var msg1;
	var msg2;
	var msg3;
	if (lang_value === "en-US")
	{
		msg1 = "end of the element";
		msg2 = "start of the element";
		msg3 = "wrong selection";
	}
	else if (lang_value === "fr-FR")
	{
		msg1 = "fin de l'élément";
		msg2 = "Début de l'élément";
		msg3 = "sélection incorrecte";
	}
	else
	{
		msg1 = "final del elemento";
		msg2 = "inicio del elemento";
		msg3 = "seleccion incorrecta";
	}
	}
	
	//initialisation des variables tel que la fenetre node keyCode..
	{
	var windown = window.innerHeight/2;
    // initialisation en fonction du navigateur
    var winObj = checkEventObj(_event_);
    var intKeyCode = winObj.keyCode;
    var childNode = document.body.childNodes;
    }
    
	//differente touches pour controller l'appli
	{
	//modifier la taille --
	
    if (intKeyCode == KEY_END)
    {
	var x = document.getElementsByClassName("selected");
	size = size - 1;
	for (var i = 0; i < x.length; i++)
	{
	    if (x[i].nodeName[0] === "H")
	    {
		if (x[i].nodeName[1] === "1")
		    x[i].style.fontSize=36+size+"px";
		else if (x[i].nodeName[1] === "2")
		    x[i].style.fontSize=24+size+"px";
		else if (x[i].nodeName[1] === "3")
		    x[i].style.fontSize=21+size+"px";
		else if (x[i].nodeName[1] === "4")
		    x[i].style.fontSize=18+size+"px";
		else if (x[i].nodeName[1] === "5")
		    x[i].style.fontSize=16+size+"px";
	    }
	    else
		x[i].style.fontSize=16+size+"px";
	}
	winObj.keyCode = intKeyCode = REMAP_KEY_T;
	winObj.returnValue = false;
	return false;
    }

    //modifier la taille ++
    if (intKeyCode == KEY_BEGIN)
    {
	var x = document.getElementsByClassName("selected");
	size = size + 1;
	for (var i = 0; i < x.length; i++)
	{
	    if (x[i].nodeName[0] === "H")
	    {
		if (x[i].nodeName[1] === "1")
		    x[i].style.fontSize=36+size+"px";
		else if (x[i].nodeName[1] === "2")
		    x[i].style.fontSize=24+size+"px";
		else if (x[i].nodeName[1] === "3")
		    x[i].style.fontSize=21+size+"px";
		else if (x[i].nodeName[1] === "4")
		    x[i].style.fontSize=18+size+"px";
		else if (x[i].nodeName[1] === "5")
		    x[i].style.fontSize=16+size+"px";
	    }
	    else
		x[i].style.fontSize=16+size+"px";
	}
	winObj.keyCode = intKeyCode = REMAP_KEY_T;
	winObj.returnValue = false;
	return false;
    }

    //changer la couleur de fond
    if (intKeyCode == KEY_C)
    {
	if (glob === 0)
	{
	    document.bgColor="#E0CDA9";
	    glob = 1;
	}
	else if (glob === 1)
	{
	    document.bgColor="#D2CAEC";
	    glob = 2;
	}
	else if (glob === 2)
	{
	    document.bgColor="#000000";
	    document.body.style.color = '#FFFFFF';
	    glob = 3;
	}
	else if (glob === 3)
	{
	    document.bgColor="#FFFFFF";
	    document.body.style.color = '#000000';
	    glob = 0;
	}
	winObj.keyCode = intKeyCode = REMAP_KEY_T;
	winObj.returnValue = false;
	return false;
    }

    //changer la langue
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

	//recuprerer la selection actuelle
    if (intKeyCode == KEY_SPACE)
    {
    	var selection;
    	//si le navigateur ne reconnai pas window on utilise document.get
    	if (window.getSelection())
    		selection = window.getSelection().anchorNode;
    	else
    		selection = document.getSelection().anchorNode;
    	if (selection != null)
    	{
    		var test_id = 0;
    		var found_p = false;
    		if (selection.parentElement.id)
    		{
    			while (test_id < length)
    			{
    				if (selection.parentElement.id == test_id)
    				{
    					console.log(selection.parentElement.id);
    					found_p = true;
    					break;
    				}
    				test_id++;
    			}
    		}
    		if (document.getSelection().isCollapsed == false && found_p === true)
    		{
    			//si on a trouvé une selection on supprime la selection actuel pour la remplacer
    			if (document.getElementsByClassName('selected')[0])
    				document.getElementsByClassName('selected')[0].className = "";
    			else if (document.getElementsByClassName('selected2')[0])
    				document.getElementsByClassName('selected2')[0].className = "";
    			selection.parentElement.className = "selected2";
    			document.getElementsByClassName("selected2")[0].focus();
    			phrase = document.getElementsByClassName('selected2')[0].id;
    			var tmp_scroll = phrase;
    			//affichage element en haut
    			if (document.body.clientHeight - windown*2 < document.getElementById(phrase).offsetTop)
            		document.getElementById(phrase).scrollIntoView();
            	//affichage element centré
            	else
            	{
    				while (document.getElementById(tmp_scroll).offsetTop > document.getElementById(phrase).offsetTop - windown && tmp_scroll > 0)
    					tmp_scroll--;
    				if (document.getElementById(tmp_scroll).offsetTop < document.getElementById(phrase).offsetTop - windown)
    					tmp_scroll++;
    				document.getElementById(tmp_scroll).scrollIntoView();
            	}
    			memory_node = 2;
    			//on vien de passer en phrase par phrase
    			speakPhrase(document.getElementById(phrase).innerHTML);
    			// on demarre la lecture de la phrase
    		}
    		else
    		speakPhrase(msg3);
    	}
    	else
    		speakPhrase(msg3);
    		//message d'erreur
		winObj.keyCode = intKeyCode = REMAP_KEY_T;
		winObj.returnValue = false;
		return false;
    }

    //titre precedant
    if ( intKeyCode == KEY_UP)
	{
		//on est dans une lecture titre par titre
		if (memory_node === 0)
		{
			//on purge la classe des phrase
			document.getElementById(phrase).className = "";
			var temp = 1;
			//on purge la selection des titres
			for (var i = 1; 'selected' != childNode[i].className; i++);
			temp = i;
			if (childNode[i].id === 'selected')
			childNode[i].id = '';
			if (i != 1)
			i--;
			//on cherche les titres
			for (;i < childNode.length; i--)
            {
            	if (childNode[i].nodeName[0] === 'H')
            	{
            		var scroll = 0;
            		//element en haut
            		if (document.body.clientHeight - windown*2 < childNode[i].offsetTop)
            			childNode[i].scrollIntoView();
            		//element centré
            		else
            		{
            			while(document.getElementById(scroll).offsetTop != childNode[i].offsetTop)
            				scroll++;
            			while (document.getElementById(scroll).offsetTop > childNode[i].offsetTop - windown && scroll > 0)
    						scroll--;
    					while (document.getElementById(scroll).offsetTop < childNode[i].offsetTop - windown)
    						scroll++;
    					document.getElementById(scroll).scrollIntoView();
            		}
            		//switch de class
            		childNode[temp].className = '';
            		temp = temp + 1;
                    childNode[i].className = 'selected';
                    i = i + 1;
                    break;
            	}
            }
            winObj.keyCode = intKeyCode = REMAP_KEY_T;
            winObj.returnValue = false;
            let pos = 0;
            for (; 'selected' != childNode[pos].className; pos++);
            //deplacement invalide donc message d'errreur
            if (g_pos === pos)
            speakPhrase(msg2);
            //lecture de l'élément séléctionné
            else
            speakElement(document.getElementsByClassName('selected'));
            g_pos = pos;
            return false;
		}
		//on passe dans une lecture titre par titre
		else
		{
			var pos_phrase = document.getElementsByClassName('selected2')[0].offsetTop;
			var test_node = 0;
			//on recupere la node la plus proche du titre
			while (childNode[test_node].offsetTop < pos_phrase && test_node < childNode.length-1)
			test_node++;
			test_node--;
			//on parcoure les node afin de trouver un titre
			while (childNode[test_node].nodeName[0] != 'H' && test_node > 0)
			test_node--;
			if (childNode[test_node].nodeName[0] === 'H')
			{
				//switch de class
				document.getElementsByClassName('selected2')[0].className = "";
				childNode[test_node].className = "selected";
				var scroll = 0;
				//element en haut
				if (document.body.clientHeight - windown*2 < document.getElementsByClassName('selected')[0].offsetTop)
            			document.getElementsByClassName('selected')[0].scrollIntoView();
            	//element centré
				else
				{
            		while(document.getElementById(scroll).offsetTop != document.getElementsByClassName('selected')[0].offsetTop)
            				scroll++;
    				while (document.getElementById(scroll).offsetTop > document.getElementsByClassName('selected')[0].offsetTop - windown && scroll > 0)
    					scroll--;
    				if (document.getElementById(scroll).offsetTop < document.getElementsByClassName('selected')[0].offsetTop - windown)
    					scroll++;
    				document.getElementById(scroll).scrollIntoView();
				}
				//lecture de l'élément selectionné
				speakElement(document.getElementsByClassName('selected'));
				memory_node = 0;
			}
			//deplacement invalide donc message d'erreur
			else
			speakPhrase(msg2);
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
	    	winObj.returnValue = false; 
	    	return false;
		}
	}

	//titre suivant
    if ( intKeyCode == KEY_DOWN)
	{
		//si on est dans une lecture titre par titre
		if (memory_node === 0)
		{
			//on purge la selection des phrase
			document.getElementById(phrase).className = "";
			var temp = 0;
			//on purge la selection des titre
			for (var i = 0; 'selected' != childNode[i].className; i++);
			temp = i;
			if (childNode[i].id === 'selected')
			childNode[i].id = '';
			i++;
            for (;i < childNode.length; i++)
            {
            	//quand on trouve un titre un switch les classe
            	if (childNode[i].nodeName[0] === 'H')
            	{
            		var scroll = 0;
            		childNode[temp].className = '';
            		temp = temp + 1;
            		childNode[i].className = 'selected';
            		//element en haut
            		if (document.body.clientHeight - windown*2 < childNode[i].offsetTop)
            			childNode[i].scrollIntoView();
            		//element centré
            		else
            		{
            			while(document.getElementById(scroll).offsetTop != childNode[i].offsetTop)
            				scroll++;
            			while (document.getElementById(scroll).offsetTop > childNode[i].offsetTop - windown && scroll > 0)
    						scroll--;
    					while (document.getElementById(scroll).offsetTop < childNode[i].offsetTop - windown)
    						scroll++;
    					document.getElementById(scroll).scrollIntoView();
            		}
            		i = i + 1;
            		break;
            	}
            }
            winObj.keyCode = intKeyCode = REMAP_KEY_T;
            winObj.returnValue = false;
            let pos = 0;
            for (; 'selected' != childNode[pos].className; pos++);
            //deplacement non valide donc message d'erreur
            if (g_pos === pos)
            speakPhrase(msg1);
            //sinon on lance la lecture de l'element selectionnné
            else
            speakElement(document.getElementsByClassName('selected'));
            g_pos = pos;
            return false;
		}
		//on passe dans une lecture titre par titre
		else
		{
			var pos_phrase = document.getElementsByClassName('selected2')[0].offsetTop;
			var test_node = 0;
			//on recupere la node la plus proche de la phrase actuelle
			while (childNode[test_node].offsetTop < pos_phrase && test_node < childNode.length-1)
			test_node++;
			//on parcour les nodes afin de trouver un titre
			while (childNode[test_node].nodeName[0] != 'H' && test_node < childNode.length-1)
			test_node++;
			//si on trouve un titre un switch les classes
			if (childNode[test_node].nodeName[0] === 'H')
			{
				document.getElementsByClassName('selected2')[0].className = "";
				childNode[test_node].className = "selected";
				var scroll = 0;
				//element en haut
				if (document.body.clientHeight - windown*2 < document.getElementsByClassName('selected')[0].offsetTop)
            			document.getElementsByClassName('selected')[0].scrollIntoView();
            	//element centré
            	else
            	{
            		while(document.getElementById(scroll).offsetTop != document.getElementsByClassName('selected')[0].offsetTop)
            			scroll++;
    				while (document.getElementById(scroll).offsetTop > document.getElementsByClassName('selected')[0].offsetTop - windown && scroll > 0)
    					scroll--;
    				if (document.getElementById(scroll).offsetTop < document.getElementsByClassName('selected')[0].offsetTop - windown)
    					scroll++;
    				document.getElementById(scroll).scrollIntoView();
            	}
				speakElement(document.getElementsByClassName('selected'));
				memory_node = 0;
			}
			//si on ne trouve pas de titre on envoi un messaged'erreur
			else
			speakPhrase(msg1);
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
	    	winObj.returnValue = false; 
	    	return false;
		}
    }

    //phrase suivante
	if ( intKeyCode == KEY_RIGHT)
	{
		//si on est en lecture phrase par phrase
		if (memory_node === 2)
		{
			//on va a la phrase suivante en changeant de span
			if (phrase < length)
			{
				document.getElementById(phrase).className = "";
				phrase++;
				document.getElementById(phrase).className = "selected2";
	    	}
	    	var tmp_scroll = phrase;
	    	//element en haut
	    	if (document.body.clientHeight - windown*2 < document.getElementById(phrase).offsetTop)
            	document.getElementById(phrase).scrollIntoView();
            //element centré
            else
            {
    			while (document.getElementById(tmp_scroll).offsetTop > document.getElementById(phrase).offsetTop - windown && tmp_scroll > 0)
    				tmp_scroll--;
    			if (document.getElementById(tmp_scroll).offsetTop < document.getElementById(phrase).offsetTop - windown)
    				tmp_scroll++;
    			document.getElementById(tmp_scroll).scrollIntoView();
            }
	    	winObj.keyCode = intKeyCode = REMAP_KEY_T;
	    	winObj.returnValue = false; 
	    	//lecture de la phrase
	    	var txt = document.getElementById(phrase).innerHTML;
	    	speakPhrase(txt);
	    	document.getElementsByClassName("selected2")[0].focus();
	    	return false;
		}
		//on est en titre par titre mais on passe en phrase par phrase
		else
		{
			var pos_title = document.getElementsByClassName('selected')[0].offsetTop;
			var test_phrase = 0;
			//on prend la phrase la plus proche du titre 
			while (document.getElementById(test_phrase).offsetTop <= pos_title && test_phrase < length)
			{
				test_phrase++;
			}
			phrase = test_phrase;
			document.getElementById(phrase).className = "selected2";
			//la phrase devien l'element selectioné et la classe de l'élément precedant devient nul
			document.getElementsByClassName("selected")[0].className = "";
			var tmp_scroll = phrase;
			//element en haut
			if (document.body.clientHeight - windown*2 < document.getElementById(phrase).offsetTop)
            	document.getElementById(phrase).scrollIntoView();
            //element centré
			else
			{
    			while (document.getElementById(tmp_scroll).offsetTop > document.getElementById(phrase).offsetTop - windown && tmp_scroll > 0)
    				tmp_scroll--;
    			if (document.getElementById(tmp_scroll).offsetTop < document.getElementById(phrase).offsetTop - windown)
    				tmp_scroll++;
    			document.getElementById(tmp_scroll).scrollIntoView();
			}
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
	    	winObj.returnValue = false; 
	    	var txt = document.getElementById(phrase).innerHTML;
	    	speakPhrase(txt);
	    	//lecture de la phrase
	    	memory_node = 2;
	    	//passage en phrase par phrase
	    	document.getElementsByClassName("selected2")[0].focus();
	    	return false;
		}
	}

	//phrase precedante
	if (intKeyCode == KEY_LEFT )
	{
		//si on est dans une lecture phrase par phrase
		if (memory_node === 2)
		{
			//on change de phrase en passant au span precendant
			if (phrase > 0) 
			{
				document.getElementById(phrase).className = "";
				phrase--;
				document.getElementById(phrase).className = "selected2";
			}
			var tmp_scroll = phrase;
			//element en haut 
			if (document.body.clientHeight - windown*2 < document.getElementById(phrase).offsetTop)
            	document.getElementById(phrase).scrollIntoView();
            //element centré
            else
            {
    			while (document.getElementById(tmp_scroll).offsetTop > document.getElementById(phrase).offsetTop - windown && tmp_scroll > 0)
    				tmp_scroll--;
    			if (document.getElementById(tmp_scroll).offsetTop < document.getElementById(phrase).offsetTop - windown)
    				tmp_scroll++;
    			document.getElementById(tmp_scroll).scrollIntoView();
            }
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			//lecture de la phrase
			var txt = document.getElementById(phrase).innerHTML;
			speakPhrase(txt);
			document.getElementsByClassName("selected2")[0].focus();
			return false;
		}
		//on rentre dans une lecture phrase par phrase
		else
		{
			var pos_title = document.getElementsByClassName('selected')[0].offsetTop;
			var test_phrase = 0;
			//on prend la phrase la plus proche di titre actuel
			while (document.getElementById(test_phrase).offsetTop < pos_title && test_phrase < length)
			{
				test_phrase++;
			}
			phrase = test_phrase;
			//switch de class
			document.getElementById(phrase).className = "selected2";
			document.getElementsByClassName("selected")[0].className = "";
			var tmp_scroll = phrase;
			//element en haut
			if (document.body.clientHeight - windown*2 < document.getElementById(phrase).offsetTop)
            	document.getElementById(phrase).scrollIntoView();
            //element centré
            else
            {
    			while (document.getElementById(tmp_scroll).offsetTop > document.getElementById(phrase).offsetTop - windown && tmp_scroll > 0)
    				tmp_scroll--;
    			if (document.getElementById(tmp_scroll).offsetTop < document.getElementById(phrase).offsetTop - windown)
    				tmp_scroll++;
    			document.getElementById(tmp_scroll).scrollIntoView();
            }
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
	    	winObj.returnValue = false; 
	    	//lecture de la phrase
	    	var txt = document.getElementById(phrase).innerHTML;
	    	speakPhrase(txt);
	    	memory_node = 2;
	    	document.getElementsByClassName("selected2")[0].focus();
	    	return false;
		}
    }

    //titre de niveau plus haut
    if ( intKeyCode == KEY_BACK_TAB)
	{
		//si on est en lecture titre par titre uniquement
		if (memory_node === 0)
		{
			//on purge la classe des phrases
			document.getElementById(phrase).className = "";
			var temp = 1;
			//on purge les classes des titres
			for (var i = 1; 'selected' != childNode[i].className; i++);
			if (childNode[i].id === 'selected')
				childNode[i].id = '';
			if (i != 0 && i != 1)
			{
				temp = i;
				//on recupere le niveau de titre actuel
				var current_title = childNode[i].nodeName[1];
				if (i != 1)
				{
					i--;
					//nouvelle purge
					for(let tmp2=1; tmp2<childNode.length; tmp2++)
					{
						if (childNode[i].className === 'selected')
						childNode[i].className = '';
					}
					for (;i < childNode.length; i--)
					{
						if (childNode[i].nodeName[0] === 'H' && childNode[i].nodeName[1] < current_title)
						{
							childNode[temp].className = '';
							temp = temp + 1;
							while (temp < childNode.length && childNode[temp].nodeName[0] !== 'H')
							{
								childNode[temp].className = '';
								temp = temp + 1;
							}
							childNode[i].className = 'selected';
							//element en haut
							document.getElementById(childNode[i].id).scrollIntoView();
							i = i + 1;
							break;
						}
					}
				}
				winObj.keyCode = intKeyCode = REMAP_KEY_T;
				winObj.returnValue = false;
				let pos = 0;
				for (; 'selected' != childNode[pos].className; pos++);
				//deplacement invalide donc message d'erreur
				if (g_pos === pos)
				speakPhrase(msg2);
				//lecture de l'élément
				else
				speakElement(document.getElementsByClassName('selected'));
				g_pos = pos;
				return false;
			}
		}
	}
	
	if (intKeyCode == KEY_ENTER)
	{
		if (document.getElementById(phrase).href)
			window.open(document.getElementById(phrase).href);
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

	if (intKeyCode == KEY_PUP)
	{
		if (document.getElementsByClassName("selected")[0])
		{
			var i = 0;
			var scroll = 0;
			var wiam = document.getElementsByClassName("selected")[0].tagName;
			while (document.getElementsByTagName(wiam)[i].className != "selected")
				i++;
			i--;
			if (i >= 0)
			{
				document.getElementsByTagName(wiam)[i].className = "selected";
				document.getElementsByClassName("selected")[1].className = "";
				if (document.body.clientHeight - windown*2 < document.getElementsByClassName('selected')[0].offsetTop)
            			document.getElementsByClassName('selected')[0].scrollIntoView();
            	else
            	{
            		while(document.getElementById(scroll).offsetTop != document.getElementsByClassName('selected')[0].offsetTop)
            			scroll++;
    				while (document.getElementById(scroll).offsetTop > document.getElementsByClassName('selected')[0].offsetTop - windown && scroll > 0)
    					scroll--;
    				if (document.getElementById(scroll).offsetTop < document.getElementsByClassName('selected')[0].offsetTop - windown)
    					scroll++;
    				speakPhrase(document.getElementsByClassName("selected")[0].textContent);
    				document.getElementById(scroll).scrollIntoView();
            	}
			}
		}
		winObj.keyCode = intKeyCode = REMAP_KEY_T;
		winObj.returnValue = false;
		return false;
	}
	
	if (intKeyCode == KEY_PDOWN)
	{
		if (document.getElementsByClassName("selected")[0])
		{
			var i = 0;
			var scroll = 0;
			var wiam = document.getElementsByClassName("selected")[0].tagName;
			while (document.getElementsByTagName(wiam)[i].className != "selected")
				i++;
			i++;
			if (i < document.getElementsByTagName(wiam).length)
			{
				document.getElementsByTagName(wiam)[i].className = "selected";
				document.getElementsByClassName("selected")[0].className = "";
								//element en haut
				if (document.body.clientHeight - windown*2 < document.getElementsByClassName('selected')[0].offsetTop)
            			document.getElementsByClassName('selected')[0].scrollIntoView();
            	//element centré
            	else
            	{
            		while(document.getElementById(scroll).offsetTop != document.getElementsByClassName('selected')[0].offsetTop)
            			scroll++;
    				while (document.getElementById(scroll).offsetTop > document.getElementsByClassName('selected')[0].offsetTop - windown && scroll > 0)
    					scroll--;
    				if (document.getElementById(scroll).offsetTop < document.getElementsByClassName('selected')[0].offsetTop - windown)
    					scroll++;
    				speakPhrase(document.getElementsByClassName("selected")[0].textContent);
    				document.getElementById(scroll).scrollIntoView();
            	}
			}
		}
		winObj.keyCode = intKeyCode = REMAP_KEY_T;
		winObj.returnValue = false;
		return false;
	}
	
	if (intKeyCode == KEY_ESC)
	{
		window.close();
		winObj.keyCode = intKeyCode = REMAP_KEY_T;
		winObj.returnValue = false;
		return false;
	}
	
	}
}

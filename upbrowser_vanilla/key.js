document.onkeydown = applyKey;
 
KEY_DOWN	= 40;
KEY_UP		= 38;
KEY_LEFT	= 37;
KEY_RIGHT	= 39;

KEY_END		= 35;
KEY_BEGIN	= 36;

KEY_BACK_TAB 	= 8;
KEY_TAB		= 9;
KEY_SH_TAB  	= 16;
KEY_ENTER	= 13;
KEY_ESC		= 27;
KEY_SPACE	= 32;
KEY_DEL		= 46;

KEY_A		= 65;
KEY_B		= 66;
KEY_C		= 67;
KEY_D		= 68;
KEY_E		= 69;
KEY_F		= 70;
KEY_G		= 71;
KEY_H		= 72;
KEY_I		= 73;
KEY_J		= 74;
KEY_K		= 75;
KEY_L		= 76;
KEY_M		= 77;
KEY_N		= 78;
KEY_O		= 79;
KEY_P		= 80;
KEY_Q		= 81;
KEY_R		= 82;
KEY_S		= 83;
KEY_T		= 84;
KEY_U		= 85;
KEY_V		= 86;
KEY_W		= 87;
KEY_X		= 88;
KEY_Y		= 89;
KEY_Z		= 90;

KEY_PF1		= 112;
KEY_PF2		= 113;
KEY_PF3		= 114;
KEY_PF4		= 115;
KEY_PF5		= 116;
KEY_PF6		= 117;
KEY_PF7		= 118;
KEY_PF8		= 119;

REMAP_KEY_T	= 5019;

var size = 0;
var glob = 0;
var glob_phrase = 0;
var g_pos = 1;
var p = 0;
var test = 0;
var memory = 0;
var memory_node = "";
var nav_block = 0;
var test = 1;
var first = 0;
var phrase = 0;
var title = 1;
var mem_scroll = window.innerHeight;
var mem_scroll2 = 0;
var sup_TOC = document.getElementsByClassName('selected')[0].offsetTop;


function checkEventObj ( _event_ )
{
    // verifions si le navigateur est IE
    if ( window.event )
	return window.event;
    // Si ce n'est pas IE
    else
	return _event_;
}

function back()
{
    var ii=0;
    var childNode = document.body.childNodes;
    while ('phrase' != childNode[ii].className && ii < childNode.length-1)
	ii = ii + 1;
    while ('phrase' === childNode[ii].className && ii < childNode.length-1)
    {
	childNode[ii].className = 'selected';
	ii = ii + 1;

    }
}

function applyKey (_event_){
    // initialisation en fonction du navigateur
    var winObj = checkEventObj(_event_);
    var intKeyCode = winObj.keyCode;
    var intAltKey = winObj.altKey;
    var intCtrlKey = winObj.ctrlKey;

    back();

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


    else
    {
	if (nav_block === 1)
	{
	    var x = document.getElementsByClassName("selected");
	    size = 0;
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
		    else
			x[i].style.fontSize=16+size+"px";
		}
		else
		    x[i].style.fontSize=16+size+"px";
	    }
	}

		
	if (nav_block === 1)
	{

	    
	    if ( intKeyCode == KEY_RIGHT)
	    {
		document.getElementById(phrase).className = "";
		test = 1;
	    	glob_phrase = 0;
		var childNode = document.body.childNodes;
		for (var i = 0; 'selected' != childNode[i].className; i++);
		if (childNode[i].id === 'selected')
		    childNode[i] = '';
		if (i+1 < childNode.length-2 && childNode[i + 1].nodeName[0] !== 'H')
		{
		    if (childNode[i].id === 'selected')
			childNode[i].id = '';
		    childNode[i].className = '';
		    childNode[i + 1].id = 'selected';
		    childNode[i + 1].className = 'selected';
		    i = i + 2;
		    while (i < childNode.length && childNode[i].className === 'selected')
		    {
			childNode[i].className = ''
			i = i + 1;
		    }
		}
		winObj.keyCode = intKeyCode = REMAP_KEY_T;
		winObj.returnValue = false;
		let view = document.getElementById('selected');
		if (view != null)
		{
		    if (document.getElementsByClassName('selected')[0].offsetTop+sup_TOC >= mem_scroll)
		    {
			view.scrollIntoView();
			mem_scroll = mem_scroll + document.getElementsByClassName('selected')[0].offsetTop+sup_TOC;
		    }
		}
		speakElement(document.getElementsByClassName('selected'));
		let pos = 0;
		for (; 'selected' != childNode[pos].className; pos++);
		if (g_pos === pos)
		    speakPhrase("fin de l'élément");
		else
		    speakElement(document.getElementsByClassName('selected'));
		g_pos = pos;
		return false;
	    
    }


    if (intKeyCode == KEY_LEFT )
	    {
		document.getElementById(phrase).className = "";
		test = 1;
		glob_phrase = 0;
		var childNode = document.body.childNodes;
		for (var i = 0; 'selected' != childNode[i].className; i++);
		if (childNode[i].id === 'selected')
		    childNode[i] = '';
		if (i-1 >= 0 && childNode[i-1].nodeName[0] !== 'H' && childNode[i].nodeName[0] !== 'H')
		{
		    if (childNode[i].id === 'selected')
			childNode[i].id = '';
		    childNode[i].className = '';
		    childNode[i - 1].className = 'selected';
		    childNode[i - 1].id = 'selected';
		    while (childNode[i].className === 'selected')
		    {
			childNode[i].className = ''
			i = i + 1;
		    }
		}
		let view = document.getElementById('selected');
		if (view != null)
		    view.scrollIntoView();
		winObj.keyCode = intKeyCode = REMAP_KEY_T;
		winObj.returnValue = false;
		speakElement(document.getElementsByClassName('selected'));
		let pos = 0;
		for (; 'selected' != childNode[pos].className; pos++);
		if (g_pos === pos)
		    speakPhrase("début de l'élément");
		else
		    speakElement(document.getElementsByClassName('selected'));
		g_pos = pos;
		return false;
	    }
	}

	
    if ( intKeyCode == KEY_UP)
	{
	    document.getElementById(phrase).className = "";
	    test = 1;
	    glob_phrase = 0;
	    var temp = 1;
	    var poulet = 0;
	    var childNode = document.body.childNodes;
	    for (var i = 1; 'selected' != childNode[i].className; i++);
            temp = i;
	    if (childNode[i].id === 'selected')
		childNode[i].id = '';
	    if (i != 1)
		i--;
	    for(let tmp2=1; tmp2<childNode.length; tmp2++)
	    {
		if (childNode[i].className === 'selected')
		    childNode[i].className = '';
	    }
	    for (;i < childNode.length; i--)
            {
		if (childNode[i].nodeName[0] === 'H')
		{
		    if (childNode[i].offsetTop+sup_TOC <= mem_scroll2)
		    {
			var scroll_top = i;
			mem_scroll = mem_scroll - (mem_scroll - childNode[i].offsetTop+sup_TOC);
			mem_scroll2 = mem_scroll2 - (mem_scroll2 - childNode[i].offsetTop+sup_TOC);
			while (childNode[scroll_top].offsetTop+sup_TOC > mem_scroll2 && scroll_top > 0)
			    scroll_top--;
			childNode[scroll_top].scrollIntoView();
		    }
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
	    if (g_pos === pos)
		speakPhrase("debut de l'élément");
	    else
		speakElement(document.getElementsByClassName('selected'));
	    g_pos = pos;
	    return false;
	}

	
    if ( intKeyCode == KEY_DOWN)
	{
	    document.getElementById(phrase).className = "";
	    test = 1;
	    glob_phrase = 0;
	    var found = false
	    var temp = 0;
	    var poulet;
	    var childNode = document.body.childNodes;
	    for (var i = 0; 'selected' != childNode[i].className; i++);
	    temp = i;
	    if (childNode[i].id === 'selected')
		childNode[i].id = '';
	    i++;
            for (;i < childNode.length; i++)
	    {
		if (childNode[i].nodeName[0] === 'H')
		{
		    if (document.getElementsByClassName('selected')[0].offsetTop+sup_TOC >= mem_scroll)
		    {
			document.getElementById(childNode[i].id).scrollIntoView();
			mem_scroll = mem_scroll + (document.getElementsByClassName('selected')[0].offsetTop+sup_TOC);
			mem_scroll2 = mem_scroll2 + (document.getElementsByClassName('selected')[0].offsetTop+sup_TOC);
		    }
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
	    if (g_pos === pos)
		speakPhrase("fin de l'élément");
	    else
		speakElement(document.getElementsByClassName('selected'));
	    g_pos = pos;
	    return false;
    }

	
    if ( intKeyCode == KEY_L)
	{
	    document.getElementById(phrase).className = "";
	    test = 1;
	    glob_phrase = 0;
	    var temp = 1;
	    var childNode = document.body.childNodes;
	    for (var i = 1; 'selected' != childNode[i].className; i++);
	    if (childNode[i].id === 'selected')
		childNode[i].id = '';
	    if (i != 0 && i != 1)
	    {
		temp = i;
		var current_title = childNode[i].nodeName[1];
		if (i != 1)
		{
		    i--;
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
			    document.getElementById(childNode[i].id).scrollIntoView();
			    i = i + 1;
			    while (i < childNode.length && childNode[i].nodeName[0] !== 'H')
			    {
				childNode[i].className = 'selected';
				i = i + 1;
			    }
			    break;
			}
		    }
		}
		winObj.keyCode = intKeyCode = REMAP_KEY_T;
		winObj.returnValue = false;
		let pos = 0;
		for (; 'selected' != childNode[pos].className; pos++);
		if (g_pos === pos)
		    speakPhrase("début de l'élément");
		else
		    speakElement(document.getElementsByClassName('selected'));
		g_pos = pos;
		return false;
	    }
	}


	
    if (intKeyCode == KEY_M)
	{
	    document.getElementById(phrase).className = "";
	    test = 1;
	    glob_phrase = 0;
	    var found = false
            var temp = 0;
	    var childNode = document.body.childNodes;
            for (var i = 0; 'selected' != childNode[i].className; i++);
	    if (childNode[i].id === 'selected')
		childNode[i].id = '';
	    temp = i;
	    var current_title = childNode[i].nodeName[1];
	    i++;
            for (;i < childNode.length; i++)
	    {
		if (childNode[i].nodeName[0] === 'H' && childNode[i].nodeName[1] > current_title)
		{
		    childNode[temp].className = '';
		    temp = temp + 1;
		    while (temp < childNode.length && childNode[temp].nodeName[0] !== 'H')
		    {
			childNode[temp].className = '';
			temp = temp + 1;
		    }
                    childNode[i].className = 'selected';
		    document.getElementById(childNode[i].id).scrollIntoView();
		    i = i + 1;
		    while (i < childNode.length && childNode[i].nodeName[0] !== 'H')
		    {
			childNode[i].className = 'selected';
			i = i + 1;
		    }
                    break;
		}
		if (childNode[i].nodeName[0] === 'H' && childNode[i].nodeName[1] < current_title)
		    break;
            }
	    winObj.keyCode = intKeyCode = REMAP_KEY_T;
	    winObj.returnValue = false;
	    let pos = 0;
	    for (; 'selected' != childNode[pos].className; pos++);
	    if (g_pos === pos)
		speakPhrase("fin de l'élément");
	    else
		speakElement(document.getElementsByClassName('selected'));
	    g_pos = pos;
	    return false;
	}
    }

    
    if (intKeyCode == KEY_ENTER)
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

    
    if (intKeyCode == KEY_SPACE)
    {
	winObj.keyCode = intKeyCode = REMAP_KEY_T;
	winObj.returnValue = false;
	speakElement(document.getElementsByClassName('selected'));
	return false;
    }

    
    if (intKeyCode == KEY_P)
    {
	if (nav_block === 1)
	    nav_block = 0;
	else
	    nav_block = 1;
    }


        if (intKeyCode == KEY_W)
    {
	test = 1;
	var tmp = phrase(document.getElementsByClassName('selected'));
	var txt = "";
	if (glob_phrase >= tmp.length)
	    glob_phrase = 1;
	if (glob_phrase === 1 && (tmp[glob_phrase] <= '9' && tmp[glob_phrase] >= '0'))
	{
	    while ((tmp[glob_phrase-1] != '.' || tmp[glob_phrase] != ' ') && glob_phrase < tmp.length)
	    {
		txt += tmp[glob_phrase];
		glob_phrase = glob_phrase + 1;
	    }
	    glob_phrase++;
	}
	else
	{
	    while (tmp[glob_phrase-1] != ','&& tmp[glob_phrase-1] != ';' && tmp[glob_phrase-1] != ' ' && glob_phrase < tmp.length)
	    {
		txt += tmp[glob_phrase];
		glob_phrase = glob_phrase + 1;
	    }
	}
	glob_phrase = glob_phrase + 1;
	winObj.keyCode = intKeyCode = REMAP_KEY_T;
	winObj.returnValue = false;
	speakPhrase(txt);
	return false;
    }



    if (nav_block === 0)
    {

	
	if ( intKeyCode == KEY_RIGHT)
	{
	    if (phrase < document.getElementsByTagName("span").length - 1)
	    {
		document.getElementById(phrase).className = "";
		phrase++;
		document.getElementById(phrase).className = "selected2";
	    }
	    let view = document.getElementById(phrase);
	    if (view != null)
		view.scrollIntoView();
	    winObj.keyCode = intKeyCode = REMAP_KEY_T;
	    winObj.returnValue = false;
	    var txt = document.getElementById(phrase).innerHTML
	    speakPhrase(txt);
	    return false;
	}


	if (intKeyCode == KEY_LEFT )
	{
	    if (phrase > 0) 
	    {
		document.getElementById(phrase).className = "";
		phrase--;
		document.getElementById(phrase).className = "selected2";
	    }
	    let view = document.getElementById(phrase);
	    if (view != null)
		view.scrollIntoView();
	    winObj.keyCode = intKeyCode = REMAP_KEY_T;
	    winObj.returnValue = false;
	    var txt = document.getElementById(phrase).innerHTML;
	    speakPhrase(txt);
	    return false;
	}
    }
    
}


function phrase_spe(myText) {
    var tts = "";
    tts += ' ' + myText[0].innerText;
    return (tts);
}


function phrase(myText) {
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

//Eléments gérés par le script
var checkElem = ['BODY', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'OL', 'UL','LI', 'A', 'IMG'];

document.body.onload = upBrowser();
//document.onclick = setSelectionTOC();

function upBrowser() {
    var newBody = document.createElement("BODY");
//    var myToc = document.createElement("DIV");
    var childNode = document.body.childNodes;
    var myElement;
    
    for(var i = 0; i < childNode.length; i++) {
        if(childNode[i].nodeType === 1) {
            console.log("Node " + i + " est un element.")
//            for(var j = 0; j < checkElem.length && childNode[i].childElementCount(checkElem[j]) != true; j++);
//            if (j < checkElem.length) {
                //récupérer element (récursive)
//            }
        } else if(childNode[i].nodeType === 3) {
            if (childNode[i].length > 0 && !is_all_ws(childNode[i])) {
                console.log("Node " + i + " est un texte non vide.")
            }
            else {
                console.log("Node " + i + " est un texte vide.")

            }
        }
    }
}

function is_all_ws(nod) {
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r ]/.test(nod.nodeValue));
}


/*
// Parsing général du fichier HTML
function f1() {
    var childNode = document.body.childNodes;
    var newBody = document.createElement("BODY");
    var childLength = childNode.length;
    var childPart;
    var myToc = document.createElement("DIV");
    
    console.log(childNode[0]);

    //Parcours du body actuel
    for(var i = 0; i < childLength; i++) { // Auto: i = 0 ; Button: i = 2
        //Le node ciblée est un élément -> parsing
        if(childNode[i].nodeType === 1) {
            childPart = f2(childNode[i], newBody, newBody);
            //Ajoute l'intégralité de l'élément si ce n'est pas déjà fait
            if (newBody !== childPart) {
                newBody.appendChild(childPart);
            }
        }
        //La node est un texte -> suppression des espaces inutiles, ajout
        else if (childNode[i].nodeType === 3) {
            childPart = document.createTextNode(myTrim(childNode[i].nodeValue));
            if (childPart.length > 0) {
                newBody.appendChild(document.createElement("P")).appendChild(childPart);
            }
        }
    }
    //remplace le body atuel par le nouveau body
    newBody.firstElementChild.setAttribute("class", "selected");
    newBody.setAttribute("onclick", "setSelectionTOC()");
    document.documentElement.removeChild(document.body);
    document.documentElement.appendChild(newBody);
    f5();
    generateTOC(myToc);
    myToc.setAttribute("class", "TOC");
    for (var i = 1; i < document.body.childNodes.length; i++) {
        document.body.childNodes[i].className = 'nope';
    }
    document.body.insertBefore(myToc, document.body.firstElementChild);
    parse_phrase();
}

//Fonction de suppression des espaces inutiles
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

//Parsing de l'élément actuel
function f2(myNode, newBody, parentBody) {
    var bodyPart = f3(myNode, newBody, parentBody);

    return (f4(bodyPart, myNode, newBody));
}

//Création ou Redirection de l'élément
function f3(myNode, newBody, parentBody) {
    var tempNode = myNode;
    var bodyPart;

    //On remonte au parent tant que la balise visualisée n'est pas une balise valide
    while (checkElem.indexOf(tempNode.nodeName) === -1) {
        tempNode = tempNode.parentNode;
    }
    //La balise envoyé en paramètre est valide : Création d'une nouvelle balise
    if (tempNode.nodeName.localeCompare(myNode.nodeName) === 0) {
        bodyPart = document.createElement(myNode.nodeName);
        // Rajout d'attributs pour <a>
        if (tempNode.nodeName.localeCompare("A") === 0 && tempNode.hasAttribute("href")){
            bodyPart.setAttribute("href", tempNode.getAttribute("href"));
            bodyPart.setAttribute("target", "_blank");
        }
        // Rajout d'attributs pour <img>
        else if (tempNode.nodeName.localeCompare("IMG") === 0){
            if (tempNode.hasAttribute("src")) {
                bodyPart.setAttribute("src", tempNode.getAttribute("src"));
            }
            if (tempNode.hasAttribute("alt")) {
                bodyPart.setAttribute("alt", tempNode.getAttribute("alt"));
            }
        }
    }
    //La balise n'est pas valide, on cherche une balise valide dans sa hiérarchie
    // C'est un parent
    else if (tempNode.nodeName.localeCompare(newBody.nodeName) === 0) {
        bodyPart = newBody;
    }
    // C'est le body
    else {
        bodyPart = parentBody;
    }
    return (bodyPart);
}

//Construction de la hiérarchie interne à l'élément
function f4(bodyPart, myNode, newBody) {
    var childNode = myNode.childNodes;
    var childLength = childNode.length;
    var childPart;

    //Parcours de l'élément actuel
    for(var i = 0; i < childLength; i++) {
        //La node est un élément -> parsing
        if(childNode[i].nodeType === 1) {
            childPart = f2(childNode[i], newBody, bodyPart);
            //Ajoute l'intégralité de l'élément si ce n'est pas déjà fait
            if (bodyPart !== childPart) {
                bodyPart.appendChild(childPart);
            }
        }
        //La node est un texte -> suppression des espaces inutiles (?), ajout
        else if (childNode[i].nodeType === 3) {
            childPart = document.createTextNode(childNode[i].nodeValue);
            //console.log(bodyPart);
            if (bodyPart.nodeName === "BODY") {
                bodyPart.appendChild(document.createElement("P")).appendChild(childPart);
            }
            else {
                bodyPart.appendChild(childPart);
            }
        }
    }
    return (bodyPart);
}

//Implémentation du CSS et du script UpBrowser
function f5() {
    var my_css = document.createElement("LINK");
    my_css.setAttribute("rel", "stylesheet");
    my_css.setAttribute("type", "text/css");
    my_css.setAttribute("href", "/js/Upbrowser/index.css");
    document.head.appendChild(my_css);

    var my_script = document.createElement("SCRIPT");
    my_script.setAttribute("src", "/js/Upbrowser/key.js");
    document.body.appendChild(my_script);

    my_script = document.createElement("SCRIPT");
    my_script.setAttribute("src", "/js/Upbrowser/voice.js");
    document.body.appendChild(my_script);
}

/*
 * Dynamic Table of Contents script
 * by Matt Whitlock <http://www.whitsoftdev.com/>
 */



function createLink(href, innerHTML) {
    var a = document.createElement("a");
    a.setAttribute("href", href);
    a.innerHTML = innerHTML;
    return a;
}

function generateTOC(toc) {
    var i1 = 0, i2 = 0, i3 = 0, i4 = 0;
    var section;
    toc = toc.appendChild(document.createElement("ul"));
    for (var i = 0; i < document.body.childNodes.length; ++i) {
        var node = document.body.childNodes[i];
        var tagName = node.nodeName.toLowerCase();
        if (tagName == "h4") {
            ++i4;
            if (i4 == 1) toc.lastChild.lastChild.lastChild.lastChild.lastChild.appendChild(document.createElement("ul"));
            section = i1 + "." + i2 + "." + i3 + "." + i4;
            node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
            node.id = "section" + section;
            toc.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
        }
        else if (tagName == "h3") {
            ++i3, i4 = 0;
            if (i3 == 1) toc.lastChild.lastChild.lastChild.appendChild(document.createElement("ul"));
            section = i1 + "." + i2 + "." + i3;
            node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
            node.id = "section" + section;
            toc.lastChild.lastChild.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
        }
        else if (tagName == "h2")
        {
            ++i2, i3 = 0, i4 = 0;
            if (i2 == 1) toc.lastChild.appendChild(document.createElement("ul"));
            section = i1 + "." + i2;
            node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
            node.id = "section" + section;
            toc.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
        }
        else if (tagName == "h1") {
            ++i1, i2 = 0, i3 = 0, i4 = 0;
            section = i1;
            node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
            node.id = "section" + section;
            toc.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
        }
    }
}

//Selection du titre via le TOC
function setSelectionTOC() {
    if (typeof document.activeElement.href == 'undefined') {
        return;
    }
    if (document.activeElement.hostname != document.location.hostname) {
        return;
    }
    var myClick = document.activeElement.href;
    var searchId = myClick.slice(myClick.lastIndexOf("#section1") + 1, myClick.length);
    var mySelect = document.getElementById(searchId);
    if (document.getElementsByClassName('selected').length != 0)
        document.getElementsByClassName('selected')[0].className = "";
    else
        document.getElementsByClassName('selected2')[0].className = "";
    memory_node = 0;
    mySelect.className = 'selected';
    speakPhrase(document.getElementsByClassName('selected')[0].textContent);
}


function parse_phrase()
{
    var	i = 1;
    var k = 0;
    var num = 0;
    var txt = "";
    var tmp = "";
    var childNode = document.body.childNodes;
    while (i < childNode.length)
    {
	tmp = childNode[i].innerHTML;
	if (childNode[i].nodeName === "OL" ||childNode[i].nodeName === "UL" )
	{
	    while (k < tmp.length)
	    {
	        if (tmp[k] === '<' && tmp[k+1] === 'l' && tmp[k+2] === 'i' && tmp[k+3] === '>')
	        {
	            txt += "<li><span id="+num+">";
	            num++;
	            k = k + 4;
	        }
	        else if (tmp[k] === '<' && tmp[k+1] === '/' && tmp[k+2] === 'l' && tmp[k+3] === 'i' && tmp[k+4] === '>')
	        {
	            txt += "</span></li>";
	            k = k + 5;
	        }
	        else if ((tmp[k] === '.' || tmp[k] === '!' || tmp[k] === '?') && tmp[k+1] === ' ' && ((tmp[k+2] <= 'Z' && tmp[k+2] >= 'A') |- (tmp[k+2] <= 'z' && tmp[k+2] >= 'a') || (tmp[k+2] <= '1' && tmp[k+2] >= '0')))
	        {
	            txt += tmp[k],
	            txt += "</span><span id="+num+">";
	            num++;
	            k++;
	        }
	        else
	        {
	            txt += tmp[k];
	            k++;
	        }
	    }
	}
	else
	{
	    while (tmp[k] == ' '  || tmp[k] == '\n' || tmp[k] == '')
	    {
	        k++;
	    }
	    if (k < tmp.length)
	    {
	        txt = "<span id="+num+">";
	        num++;
	    }
	    else
	    {
	        txt = "";
	    }
	    while (k < tmp.length)
	    {
		txt += tmp[k];
		    if ((tmp[k] === '.' || tmp[k] === '?' || tmp[k] === '.') && tmp[k+1] === ' ')
		    {
		        txt += "</span>";
		        if (k + 2 < tmp.length)
		        {
			        txt += "<span id="+num+">";	
			        num++;
		        }
		    }
		    k = k + 1;
	    }
	}
	childNode[i].innerHTML = txt;
	txt = "";
	k = 0;
	i = i + 1;
	}
}
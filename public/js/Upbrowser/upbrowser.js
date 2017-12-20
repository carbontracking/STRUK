//Eléments gérés par le script
var checkElem = ['BODY', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'OL', 'UL','LI', 'A', 'IMG'];
document.body.onload = f1();

// Parsing général du fichier HTML
function f1() {
    var childNode = document.body.childNodes;
    var newBody = document.createElement("BODY");
    var childLength = childNode.length;
    var childPart;

    //Parcours du body actuel
    for(var i = 0; i < childLength; i++) {
        //Le node ciblée est un élément -> parsing
        if(childNode[i].nodeType === 1) {
            childPart = f2(childNode[i], newBody, newBody);
            //Ajoute l'intégralité de l'élément si ce n'est pas déjà fait
            if (newBody !== childPart) {
                newBody.appendChild(childPart);
            }
        }
        //La node ciblée est un texte -> Si il n'est pas vide, mise en paragraphe
        else if(childNode[i].nodeType === 3) {
            if (childNode[i].length > 0 && !is_all_ws(childNode[i])) {
                childPart = document.createTextNode(childNode[i].nodeValue);
                newBody.appendChild(document.createElement("P")).appendChild(childPart);
            }
        }
    }
    //remplace le body atuel par le nouveau body
    for(var j = 0; j < newBody.children.length && newBody.firstElementChild.tagName != "H1"; j++) {
        newBody.firstElementChild.outerHTML = "";
    }
//    newBody.setAttribute("onclick", "setSelectionTOC()");
    document.documentElement.removeChild(document.body);
    document.documentElement.appendChild(newBody);
    f5();
}

function is_all_ws(nod) {
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r ]/.test(nod.nodeValue));
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
        } else if(childNode[i].nodeType === 3) {
            if (childNode[i].length > 0 && !is_all_ws(childNode[i])) {
                childPart = document.createTextNode(childNode[i].nodeValue);
                if (bodyPart.nodeName === "BODY") {
                    bodyPart.appendChild(document.createElement("P")).appendChild(childPart);
                }
                else {
                    bodyPart.appendChild(childPart);
                }
            }
        }
    }
    return (bodyPart);
}

//Implémentation du CSS et du script UpBrowser
function f5() {
    
    var my_script = document.createElement("SCRIPT");

    my_script.setAttribute("src", "/js/Upbrowser/page.js");
    document.head.appendChild(my_script);
}
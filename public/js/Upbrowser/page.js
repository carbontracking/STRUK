document.body.onload = setPage();
window.onclick = setSelectionTOC();

function setPage() {
    var myToc = document.createElement("DIV");
    var save;

    document.body.childNodes[0].className = "selected";
    setScripts();

	
    generateTOC(myToc);
    myToc.setAttribute("class", "TOC");
    document.body.insertBefore(myToc, document.body.firstElementChild);
    parse_phrase();
    save = get_save();
    upbrowserSave(save);
}

function setScripts() {
    var my_css = document.createElement("LINK");
    my_css.setAttribute("rel", "stylesheet");
    my_css.setAttribute("type", "text/css");
    my_css.setAttribute("href", "/js/Upbrowser/index.css");
    document.head.appendChild(my_css);

    var my_script = document.createElement("SCRIPT");
    my_script.setAttribute("src", "/js/Upbrowser/key.js");
//    document.body.appendChild(my_script);
    document.head.appendChild(my_script);

    my_script = document.createElement("SCRIPT");
    my_script.setAttribute("src", "/js/Upbrowser/voice.js");
//    document.body.appendChild(my_script);
    document.head.appendChild(my_script);
}

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
	        else if (tmp[k] === '<' && tmp[k+1] === 'u' && tmp[k+2] === 'l' && tmp[k+3] === '>')
	        {
	            txt += "</span><ul>";
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
	         else if (tmp[k] === '<' && tmp[k+1] === 'a' && tmp[k+2] === ' ')
	        {
	            txt += "<a id="+num+" ";
	            num++;
	            k = k + 3;
	            while (tmp[k] != '<' || tmp[k+1] != '/' || tmp[k+2] != 'a' || tmp[k+3] != '>')
	            {
	                txt += tmp[k];
	                k++;   
	            }
	            k = k + 4;
	            txt += "</a>";
	            //mettre une condition
	            /*
	            txt += "<span id="+num+" >";
	            num++;*/
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
	        if (tmp[k] === '<' && tmp[k+1] === 'a' && tmp[k+2] === ' ')
	        {
	            txt += "</span><a id="+num+" ";
	            num++;
	            k = k + 3;
	            while (tmp[k] != '<' || tmp[k+1] != '/' || tmp[k+2] != 'a' || tmp[k+3] != '>')
	            {
	                txt += tmp[k];
	                k++;   
	            }
	            k = k + 3;
	            txt += "</a>";
	            if (k + 2 < tmp.length && tmp[k] && tmp[k+1] != '<')
		        {
			        txt += "<span id="+num+">";	
			        num++;
		        }
	        }
	        else
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

function setSelectionTOC() {
    if (typeof document.activeElement.href == 'undefined' || document.activeElement.hostname != document.location.hostname)
        return;
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

function upbrowserSave(save) {
    //Server: save file
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
            if (document.getElementsByClassName("saving")[0]) {
                document.getElementsByClassName("saving")[0].outerHTML = "";
            }
        };
    var string = "id=" + document.getElementsByTagName("META")[0].name +
        "&html=" + encodeURIComponent(save);
    xhttp.open("POST", "/upbrowserSave?_method=POST", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(string);

}

function get_save()
{
	var txt = document.body.cloneNode(true);
	if (txt.getElementsByClassName("saving")[0])
		txt.getElementsByClassName("saving")[0].outerHTML = "";
	while (txt.getElementsByTagName("SPAN").length > 0)
		txt.getElementsByTagName("SPAN")[0].outerHTML = txt.getElementsByTagName("SPAN")[0].innerHTML;
	txt.getElementsByClassName("TOC")[0].outerHTML = "";
	var h = 1;
	var nb = 0;
	var c = 0;
	var tmp = "";
	var str = "";
	while (h < 6)
	{
		while (nb < txt.getElementsByTagName('h'+h).length)
		{
			str = txt.getElementsByTagName('h'+h)[nb].innerHTML;
			while (str[c] != ' ')
				c++;
			c++;
			while (c < str.length)
			{
				tmp += str[c];
				c++;
			}
			txt.getElementsByTagName('h'+h)[nb].innerHTML = tmp;
			tmp = "";
			nb++;
			c = 0;
		}
		nb = 0;
		h++;
	}
	while (nb < txt.getElementsByTagName("A").length)
		txt.getElementsByTagName("A")[nb++].id = "";
	for (let i= 0; i < txt.getElementsByTagName("SCRIPT").length; i++)
		txt.getElementsByTagName("SCRIPT")[i].outerHTML = "";
	if (txt.getElementsByClassName("selected")[0])
		txt.getElementsByClassName("selected")[0].className = "";
	else if (txt.getElementsByClassName("selected2")[0])
		txt.getElementsByClassName("selected2")[0].className = "";
	return (txt.innerHTML);
}
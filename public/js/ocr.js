var nbr_box = 0;
var gloglo;
var colo1 = "rgb(224, 205, 169)";//"#E0CDA9";
var colo2 = "#c0c0c0";

function click_div(elem)
{
    var i = 0;
    if (event.srcElement.tagName == "DIV" || event.srcElement.tagName == "P")
    {
        while (document.getElementById(i))
        {
            div = document.getElementsByClassName(i)
            if (div.length == 3)
            {
                if (div[1].style.backgroundColor == colo1)
                    div[1].style.backgroundColor = colo2;
            }
            else
            {
                if (div[0].style.backgroundColor == colo1)
                    div[0].style.backgroundColor = colo2;
            }
            i++;
        }
        elem.style.backgroundColor = colo1;
        document.getElementsByClassName("jcrop-selection jcrop-current")[0].className = "jcrop-selection";
        document.getElementById(elem.className).className = "jcrop-selection jcrop-current";
        i = 0;
        while (i < gloglo.ui.multi.length)
        {
            if (gloglo.ui.multi[i].element[0].id == elem.className)
            {
                gloglo.ui.multi[i].focus();
                break;
            }
            i++;
        }
    }
}

function disp(elem)
{
    var i = 45;
    var tmp = "";
    while (elem[i] != '\"')
        tmp += elem[i++];
    var nbr = parseInt(tmp, 10);
    var nbr_class = 0;
    if (document.getElementsByClassName(nbr)[2])
        nbr_class = 1;
    if (document.getElementsByClassName(nbr)[nbr_class].childNodes[4].style.display == "none")
        document.getElementsByClassName(nbr)[nbr_class].childNodes[4].style.display = "";
    else
        document.getElementsByClassName(nbr)[nbr_class].childNodes[4].style.display = "none";
}

function makeblob(dataURL)
{
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1)
    {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; ++i)
        uInt8Array[i] = raw.charCodeAt(i);
    return new Blob([uInt8Array], { type: contentType });
}
       
function ocr(dest) 
{
    var params = {"language": "fr", "detectOrientation ": "true"};
    $.ajax({
        url: "https://westeurope.api.cognitive.microsoft.com/vision/v1.0/ocr"+'?'+$.param(params),
        beforeSend: function (xhrObj)
        {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "bc14674cf9454c5194f1e0e1e7110f80");
        },
        type: "POST",
        // The DataURL will be something like "data:image/png;base64,{image-data-in-base64}"
        data: makeblob(document.getElementsByTagName("CANVAS")[1].toDataURL()),
        processData: false
    })
    .success(function (data, status) {pars_json(data, dest)})
    .error(function (xhr, status, err) {alert("error ocr");});
}

//parse le json et ecrit le resultat dans le tableau

function pars_json(data, dest)
{
    var line = 0;
    var word = 0;
    var txt = "";
    var test = 0;
    if (data.regions.length === 0)
        alert("le résultat du crop est vide");
    while (test < data.regions.length)
    {
        while (line < data.regions[test].lines.length)
        {
            while (word < data.regions[test].lines[line].words.length)
            {
                if (data.regions[test].lines[line].words[word].text)
                    txt += data.regions[test].lines[line].words[word].text + " ";
                word++;
            }
            if (txt[txt.length-2] == '.' || txt[txt.length-2] == '?' || txt[txt.length-2] == '!')
                txt += "<br>";
            word = 0;
            line++;
        }
        txt += "<br><br>";
        line = 0;
        test++;
    }
    var nbr = 0;
    if (document.getElementsByClassName(dest)[2])
        nbr = 1;
    var balise = document.getElementsByClassName(dest)[nbr+1].value;
    txt = modif_txt(txt);
    var box = "<select class=\""+dest+"\"> <option>"+balise+"</option><option>P</option><option>H1</option><option>H2</option><option>H3</option><option>H4</option><option>H5</option><option>LI</option><option>IMG</option></select>&nbsp&nbsp&nbsp&nbsp<button onclick=\"disp(this.outerHTML)\" info=\""+dest+"\">Display</button><br>";
    document.getElementsByClassName(dest)[nbr].innerHTML = box+"<p style=\"display: none;\">"+txt+"</p>";
}

function modif_txt(txt)
{
    var i = 0;
    var k = 0;
    var tmp = "";
    while (i < txt.length)
    {
        if (txt[i] == '-' && txt[i+1] == ' ')
            i++;
        else
        {
            tmp += txt[i];
            k++;
        }
        i++;
    }
    return (tmp);
}

function write_img(dest)
{
    var url = document.getElementsByTagName("CANVAS")[1].toDataURL();
    if (document.getElementsByClassName(dest)[2])
        document.getElementsByClassName(dest)[1].innerHTML += "<img src=\""+url+"\" style=\"width:100px; heigth: 100px;\">";
    else
        document.getElementsByClassName(dest)[0].innerHTML += "<img src=\""+url+"\" style=\"width: 100px; heigth: 100px;\">";
}

function create_box(crop)
{
    crop.element[0].id = nbr_box;
    var i = 0;
    while (document.getElementsByClassName(i)[0])
    {
        div = document.getElementsByClassName(i)
        if (div.length == 3)
        {
            if (div[1].style.backgroundColor == colo1)
                div[1].style.backgroundColor = colo2;
        }
        else
        {
            if (div[0].style.backgroundColor == colo1)
                div[0].style.backgroundColor = colo2;
        }
        i++;
    }
    var option = "<option>P</option><option>H1</option><option>H2</option><option>H3</option><option>H4</option><option>H5</option><option>LI</option><option>IMG</option>";
    document.getElementsByTagName("TD")[1].innerHTML += "<div draggable=true ondragstart=\"drag(event)\" onclick=\"click_div(this)\" class=\""+nbr_box+"\" style=\"background-color: "+colo1+"; border: 1px solid black\"><select class=\""+nbr_box+"\">"+option+"</select></div>";
    nbr_box++;
}

function delete_div()
{
    nbr_box--;
    var nbr_to_delete = document.getElementsByClassName("jcrop-selection jcrop-current")[0].id;
    var class_nbr = parseInt(nbr_to_delete, 10)+1;
    var div;
    if (document.getElementsByClassName(nbr_to_delete).length == 3)
        document.getElementsByClassName(nbr_to_delete)[1].outerHTML = "";
    else
        document.getElementsByClassName(nbr_to_delete)[0].outerHTML = "";
    while (document.getElementsByClassName(class_nbr)[0])
    {
        div = document.getElementsByClassName(class_nbr);
        if (div.length == 3)
        {
            div[1].className = div[1].className - 1;
            div[1].className = div[1].className - 1;
        }
        else if (div.length == 2)
        {
            div[0].className = div[0].className - 1;
            div[0].className = div[0].className - 1;
        }
        if (document.getElementById(class_nbr))
            document.getElementById(class_nbr).id = document.getElementById(class_nbr).id - 1;
        class_nbr++;
    }
    var i = 0;
    while (document.getElementsByClassName(i)[0])
    {
        div = document.getElementsByClassName(i)
        if (div.length == 3)
        {
            if (div[1].style.backgroundColor == colo1)
                div[1].style.backgroundColor = colo2;
        }
        else
        {
            if (div[0].style.backgroundColor == colo1)
                div[0].style.backgroundColor = colo2;
        }
        i++;
    }
    i = 0;
    while (document.getElementsByClassName(i)[1])
        i++;
    i--;
    if (document.getElementsByClassName(i).length == 3)
        document.getElementsByClassName(i)[1].style.backgroundColor = colo1;
    else
        document.getElementsByClassName(i)[0].style.backgroundColor = colo1;
    document.getElementById(i).className = "jcrop-selection jcrop-current";
}

function drop_div(ev)
{
    if (document.getElementById("decale"))
        document.getElementById("decale").outerHTML = "";
    var td = document.getElementById("result").childNodes;
    var div = [];
    var i =0, k = 0;
    var pos_drop = ev.pageY-70;
    //ON RECUPERE TOUS LES DIV DONC TOUTES LES BOX
    while (i < td.length)
    {
        if (td[i].tagName == "DIV")
        {
            div[k] = td[i];
            k++;
        }
        i++;
    }
    i = 0;
    // ON RECHERCHE LEQUEL DIV EST EN DESSOUS DE NOUS
    while (i < div.length)
    {
        if (pos_drop <= div[i].offsetTop)
            break;
        i++;
    }
    // SI ON LE PLACE EN BAS
    if (i == div.length)
        i--;
    var classe = ev.dataTransfer.getData("class");
    var data = "";
    var dest = document.getElementsByClassName(i);
    //SUPPRESSION DU DIV AVANT LE DEPLACEMENT SI C EST UN DES 5 PREMIERS
    if (document.getElementsByClassName(classe).length == 3)
    {
        data = document.getElementsByClassName(classe)[1].outerHTML;
        document.getElementsByClassName(classe)[1].outerHTML = "";
    }
    // SI CE N EST PAS UN DES 5 PREMIERS
    else
    {
        data = document.getElementsByClassName(classe)[0].outerHTML;
        document.getElementsByClassName(classe)[0].outerHTML = "";
    }
    // SI ON LE PLACE EN BAS
    if (!dest[0])
    {
        console.log(dest);
        dest = document.getElementsByClassName(i-1);
        console.log(dest);
        if (dest[0])
        {
            if (dest[0].tagName == "A")
                dest[1].outerHTML = dest[1].outerHTML + data;
            else
                dest[0].outerHTML = dest[0].outerHTML + data;
        }
    }
    else if (dest[0].tagName == "A" && !dest[1])
    {
        dest = document.getElementsByClassName(i-1);
        if (dest[0].tagName == "A")
            dest[1].outerHTML = dest[1].outerHTML + data;
        else
            dest[0].outerHTML = dest[0].outerHTML + data;
    }
    // SI ON LE PLACE PARTOUT SAUF EN BAS
    else
    {
        if (dest[0].tagName == "A")
            dest[1].outerHTML = data + dest[1].outerHTML;
        else
            dest[0].outerHTML = data + dest[0].outerHTML;
    }
}

function dragover(ev)
{
    if (document.getElementById("decale"))
        document.getElementById("decale").outerHTML = "";
    ev.preventDefault();
    var td = document.getElementById("result").childNodes;
    var div = [];
    var i =0, k = 0;
    var pos_drop = ev.pageY-70;
    //ON RECUPERE TOUS LES DIV DONC TOUTES LES BOX
    while (i < td.length)
    {
        if (td[i].tagName == "DIV")
        {
            div[k] = td[i];
            k++;
        }
        i++;
    }
    i = 0;
    // ON RECHERCHE LEQUEL DIV EST EN DESSOUS DE NOUS
    while (i < div.length)
    {
        if (pos_drop <= div[i].offsetTop)
            break;
        i++;
    }
    // SI ON LE PLACE EN BAS
    if (i != div.length)
    {
        if (document.getElementsByClassName(i).length == 3)
            document.getElementsByClassName(i)[1].outerHTML = "<p ondrop=\"drop_div(event);\" id=\"decale\"><br><br><br></p>" + document.getElementsByClassName(i)[1].outerHTML;
        else
            document.getElementsByClassName(i)[0].outerHTML = "<p ondrop=\"drop_div(event);\" id=\"decale\"><br><br><br></p>" + document.getElementsByClassName(i)[0].outerHTML;
    }
}

function drag(ev) {ev.dataTransfer.setData("class", ev.target.className);}
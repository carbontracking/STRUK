var nbr_box = 0;
var gloglo;
var colo1 = "rgb(224, 205, 169)";//"#E0CDA9";
var colo2 = "#c0c0c0";
var wait_what = 0;

function click_div(elem, event)
{
    var i = 0;
    var ev_name;
    if (event.srcElement)
        ev_name = event.srcElement.tagName;
    else
        ev_name = event.target.tagName;
    if (ev_name == "DIV" || ev_name == "P")
    {
        while (document.getElementById(i))
        {
            var div = document.getElementsByClassName(i);
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
    var nbr = parseInt(elem.attributes[1].value, 10);
    var nbr_class = 0;
    if (document.getElementsByClassName(nbr)[2])
        nbr_class = 1;
    var long = document.getElementsByClassName(nbr)[nbr_class].childNodes.length - 1;
    if (document.getElementsByClassName(nbr)[nbr_class].childNodes[long].style.display == "none")
    {
        document.getElementsByClassName(nbr)[nbr_class].childNodes[long].style.display = "";
        long--;
        while(long > 0)
        {
            if (document.getElementsByClassName(nbr)[nbr_class].childNodes[long].tagName == "TEXTAREA")
                document.getElementsByClassName(nbr)[nbr_class].childNodes[long].style.display = "";
            long--;
        }
        elem.innerHTML = "Cacher";
    }
    else
    {
        document.getElementsByClassName(nbr)[nbr_class].childNodes[long].style.display = "none";
        while (long > 0)
        {
            if (document.getElementsByClassName(nbr)[nbr_class].childNodes[long].tagName == "TEXTAREA")
                document.getElementsByClassName(nbr)[nbr_class].childNodes[long].style.display = "none";
            long--;
        }
        elem.innerHTML = "Afficher";
    }
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
    var i = 0;
    if (document.getElementsByClassName(dest).length == 3)
        i = 1;
    document.getElementsByClassName(dest)[i+1].childNodes[0].innerHTML = document.getElementsByClassName(dest)[i+1].value;
    document.getElementsByClassName(dest)[i].innerHTML += "<div class=\"in_save\"><img style=\"width: 200px; height: 200px;\" src=\"css/saving.gif\"></div>";
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
        data: makeblob(document.getElementsByTagName("CANVAS")[document.getElementsByTagName("CANVAS").length-1].toDataURL()),
        processData: false
    })
    .success(function (data, status) {pars_json(data, dest)})
    .error(function (xhr, status, err) {alert("error ocr");});
}

//parse le json et ecrit le resultat dans le tableau

function pars_json(data, dest)
{
    document.getElementsByClassName("in_save")[0].outerHTML = "";
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
                txt += "\n";
            word = 0;
            line++;
        }
        txt += "\n\n";
        line = 0;
        test++;
    }
    var nbr = 0;
    if (document.getElementsByClassName(dest)[2])
        nbr = 1;
    var balise = document.getElementsByClassName(dest)[nbr+1].value;
    txt = modif_txt(txt);
    var drr = "<div class=\"cc\" dragg=\""+dest+"\"draggable=true ondragstart=\"drag(event)\"></div>"
    var box = "<div class=\"ok\" title=\"Vous avez modifié votre selection !\" onclick=\"supp_danger(this)\" ></div><select class=\""+dest+"\" style=\"width: 15%; margin-left: 5% ;margin-top: 2%; margin-bottom: 2%;\"><option>P</option><option>H1</option><option>H2</option><option>H3</option><option>H4</option><option>H5</option><option>P</option><option>LI</option><option>IMG</option></select>&nbsp&nbsp&nbsp&nbsp<button onclick=\"disp(this)\" info=\""+dest+"\">Afficher</button>&nbsp&nbsp&nbsp&nbsp";
    document.getElementsByClassName(dest)[nbr].innerHTML = drr + box+"<button class=\"supp_b\" info=\""+dest+"\" onclick=\"delete_button(this)\">Supprimer</button><br><textarea style=\"display: none; max-width: 90%; margin-left: 5%; width: 90%; height: 100px;\">"+txt+"</textarea>";
    if (document.getElementsByClassName(dest).length == 3)
        document.getElementsByClassName(dest)[2].childNodes[0].innerHTML = balise;
    else
        document.getElementsByClassName(dest)[1].childNodes[0].innerHTML = balise;
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
    save_text_area();
    crop.element[0].id = nbr_box;
    var i = 0;
    while (document.getElementsByClassName(i)[0])
    {
        var div = document.getElementsByClassName(i);
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
    
    var div = [];
    i = 0;
    var k = 0;
    while (i < document.getElementsByTagName("TD")[1].childNodes.length)
    {
        if (document.getElementsByTagName("TD")[1].childNodes[i].tagName == "DIV")
        {
            while (k < document.getElementsByTagName("TD")[1].childNodes[i].childNodes.length)
            {
                if (document.getElementsByTagName("TD")[1].childNodes[i].childNodes[k].tagName == "SELECT")
                    document.getElementsByTagName("TD")[1].childNodes[i].childNodes[k].childNodes[0].innerHTML = document.getElementsByTagName("TD")[1].childNodes[i].childNodes[k].value;
                k++;
            }
            k = 0;
        }
        i++;
    }
    var drr = "<div class=\"cc\" dragg=\""+nbr_box+"\"draggable=true ondragstart=\"drag(event)\"></div>"
    var option = "<option>P</option><option>H1</option><option>H2</option><option>H3</option><option>H4</option><option>H5</option><option>P</option><option>LI</option><option>IMG</option>";
    document.getElementsByTagName("TD")[1].innerHTML += "<div onclick=\"click_div(this, event)\" class=\""+nbr_box+"\" style=\"background-color: "+colo1+"; border: 1px solid black\">"+drr+"<p class=\"ok\" title=\"Vous avez modifié votre selection !\" onclick=\"supp_danger(this)\"></p><select class=\""+nbr_box+"\" style=\"width: 15%; margin-left: 5%; margin-top: 2%; margin-bottom: 2%;\">"+option+"</select>&nbsp&nbsp&nbsp&nbsp<button class=\"supp_b\" info=\""+nbr_box+"\" onclick=\"delete_button(this)\">Supprimer</button></div>";
    nbr_box++;
}

function delete_button(elem)
{
    var nbr = parseInt(elem.attributes[1].value, 10)+1;
    nbr_box--;
    while (nbr < document.getElementsByClassName("supp_b").length)
    {
        document.getElementsByClassName("supp_b")[nbr].attributes[1].value = document.getElementsByClassName("supp_b")[nbr].attributes[1].value - 1;
        nbr++;
    }
    nbr  = parseInt(elem.attributes[1].value, 10);
    if (document.getElementsByClassName(nbr).length == 3)
        document.getElementsByClassName(nbr)[1].outerHTML = "";
    else
        document.getElementsByClassName(nbr)[0].outerHTML = "";
    document.getElementById(nbr).outerHTML = "";
    nbr++;
    while (document.getElementById(nbr))
    {
        if (document.getElementsByClassName(nbr).length == 3)
        {
            document.getElementsByClassName(nbr)[2].className = document.getElementsByClassName(nbr)[2].className - 1;
            document.getElementsByClassName(nbr)[1].className = document.getElementsByClassName(nbr)[1].className - 1;
        }
        else
        {
            if (document.getElementsByClassName(nbr)[1])
                document.getElementsByClassName(nbr)[1].className = document.getElementsByClassName(nbr)[1].className - 1;
            document.getElementsByClassName(nbr)[0].className = document.getElementsByClassName(nbr)[0].className - 1;
        }
        document.getElementById(nbr).id = nbr - 1;
        nbr++;
    }
    var i = 0;
    var len = 0;
    while (i < document.getElementsByTagName("TD")[1].childNodes.length)
    {
        if (document.getElementsByTagName("TD")[1].childNodes[i].tagName == "DIV")
            len++;
        i++;
    }
    if (document.getElementsByClassName("danger").length == 0)
    {
        if (len == document.getElementsByTagName("TEXTAREA").length && len != 0)
        {
            if (document.getElementById("save"))
                document.getElementById("save").style.display = "";
        }
        else
        {
            if (document.getElementById("save"))
                document.getElementById("save").style.display = "none";
        }
    }
}

function delete_div()
{
    nbr_box--;
    if (nbr_box != 0)
    {
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
    else
    {
        if (document.getElementsByClassName(nbr_box).length == 3)
            document.getElementsByClassName(nbr_box)[1].outerHTML = "";
        else
            document.getElementsByClassName(nbr_box)[0].outerHTML = "";
    }
    var i = 0;
    var len = 0;
    while (i < document.getElementsByTagName("TD")[1].childNodes.length)
    {
        if (document.getElementsByTagName("TD")[1].childNodes[i].tagName == "DIV")
            len++;
        i++;
    }
    if (document.getElementsByClassName("danger").length == 0)
    {
        if (len == document.getElementsByTagName("TEXTAREA").length && len != 0)
        {
            if (document.getElementById("save"))
                document.getElementById("save").style.display = "";
        }
        else
        {
            if (document.getElementById("save"))
                document.getElementById("save").style.display = "none";
        }
    }
}

function drop_div(ev)
{
    if (wait_what == 0)
    {
        ev.preventDefault();
        if (document.getElementById("decale"))
            document.getElementById("decale").outerHTML = "";
        var td = document.getElementById("result").childNodes;
        var div = [];
        var i =0, k = 0;
        var pos_drop = ev.pageY - 120;
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
        var classe = ev.dataTransfer.getData("class");
        var data = "";
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
        if (i == div.length)
        {
            k = 0;
            var j = 0;
            div = [];
            while (j < td.length)
            {
                if (td[j].tagName == "DIV")
                {
                    div[k] = td[j];
                    k++;
                }
                j++;
            }
            while (!div[i] && i >= 0)
                i--;
            var dest = div[i];
            if (i == -1)
            {
                if (document.getElementById("save"))
                    document.getElementById("save").outerHTML = document.getElementById("save").outerHTML + data;
                else
                    document.getElementById("ocr_button").outerHTML = document.getElementById("ocr_button").outerHTML + data;
            }
            else
                dest.outerHTML = dest.outerHTML + data;
        }
        // SI ON LE PLACE PARTOUT SAUF EN BAS
        else if (i == 0)
        {
            if (document.getElementById("save"))
                document.getElementById("save").outerHTML = document.getElementById("save").outerHTML + data;
            else
                document.getElementById("ocr_button").outerHTML = document.getElementById("ocr_button").outerHTML + data;
        }
        else
        {
            try{div[i].outerHTML = data + div[i].outerHTML;}
            catch (ex) {div[i - 1].outerHTML = div[i - 1].outerHTML + data;}
        }
        wait_what = 1;
    }
    else
        wait_what = 0;
}

function dragover(ev)
{
    ev.preventDefault();
    var env_path_id;
    if (ev.path)
        env_path_id = ev.path[0].id;
    else
        env_path_id = ev.target.id;
    if (env_path_id != "decale")
    {
        if (document.getElementById("decale"))
            document.getElementById("decale").outerHTML = "";
        var td = document.getElementById("result").childNodes;
        var div = [];
        var i =0, k = 0;
        var pos_drop = ev.pageY - 120;
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
            div[i].outerHTML = "<p  id=\"decale\" ondrop=\"drop_div(event);\"><br><br><br></p>" + div[i].outerHTML;
    }
}

function drag(ev)
{
    save_text_area();
    wait_what = 0;
    var i = 0;
    var td = document.getElementById("result").childNodes;
    var div = [];
    var i =0, k = 0;
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
    while (i  < div.length)
    {
        if (document.getElementsByClassName(i).length == 3)
            document.getElementsByClassName(i)[2].childNodes[0].innerHTML = document.getElementsByClassName(i)[2].value;
        else
            document.getElementsByClassName(i)[1].childNodes[0].innerHTML = document.getElementsByClassName(i)[1].value;
        i++;
    }
    ev.dataTransfer.setData("class", ev.target.attributes.dragg.value);
}

function supp_danger(elem)
{
    elem.className = "ok";
    if (document.getElementsByClassName("danger").length == 0)
    {
        if (document.getElementById("save"))
            document.getElementById("save").style.display = "";
    }
}

function save_img(dest, p, value, left, top, largeur, hauteur)
{
    var drr = "<div class=\"cc\" dragg=\""+dest+"\"draggable=true ondragstart=\"drag(event)\"></div>"
    var box = "<div class=\"ok\" title=\"Vous avez modifié votre selection !\" onclick=\"supp_danger(this)\" ></div><select class=\""+dest+"\" style=\"width: 15%; margin-left: 5%; margin-top: 2%; margin-bottom: 2%;\"><option>P</option><option>H1</option><option>H2</option><option>H3</option><option>H4</option><option>H5</option><option>P</option><option>LI</option><option>IMG</option></select>&nbsp&nbsp&nbsp&nbsp<button onclick=\"disp(this)\" info=\""+dest+"\">Afficher</button>";
    document.getElementsByClassName(dest)[p].innerHTML = drr+box+"&nbsp&nbsp&nbsp&nbsp<button class=\"supp_b\" info=\""+dest+"\" onclick=\"delete_button(this)\">Supprimer</button><br>";
    document.getElementsByClassName(dest)[p + 1].childNodes[0].innerHTML = value;
    document.getElementsByClassName(dest)[p].innerHTML += "<canvas width=\""+largeur+"px\" height=\""+hauteur+"px\" id=\"draw\" style=\"display: none;\"></canvas>";
    var canvas = document.getElementById("draw");
    var ctx = canvas.getContext("2d");
    var image = document.getElementById("target");
    ctx.drawImage(image, left, top, largeur, hauteur, 0, 0, largeur, hauteur);
    var url = document.getElementById("draw").toDataURL();
    var po = "<textarea style=\"display: none; max-width: 90%; margin-left: 5%; margin-right: 5%;\"></textarea><br><img id=\"re_write\" width=\"90%\" style=\"margin-left: 5%; display: none;\" src=\""+url+"\">";
    document.getElementById("draw").outerHTML += po;
    document.getElementById("draw").outerHTML = "";
    document.getElementById("re_write").id = "";
}

function launch_ocr() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open("GET", "/OCR?_method=GET", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function save_new_html_file() {
    var xhttp = new XMLHttpRequest();
    var taglist = document.getElementsByTagName("SELECT");
    var arealist = document.getElementsByTagName("TEXTAREA");
    var imglist = document.getElementsByTagName("IMG");
    var j = 2;
    var data_request = [];
    
    for(var i = 0; i < taglist.length && i < arealist.length; i++) {
        if (taglist[i].value === "IMG") {
            data_request[i] = {"tag": taglist[i].value, "area": arealist[i].value, "src": imglist[j].src};
            j += 1;
        } else {
            data_request[i] = {"tag": taglist[i].value, "area": arealist[i].value};
        }
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var id = document.getElementById('save').value;
            if (!document.getElementById("upedit"))
            document.getElementById('save').outerHTML = "<button id =\"save\" name=\"id\" value=\"" + id +
                "\" onclick=\"save_new_html_file()\">SAUVEGARDE</button> " +
                "<form method=\"GET\" action=\"/upedit\" style=\"margin-top: 5%;\"> " +
                "<button style=\"margin-top: 0px;\" type=\"submit\" id=\"upedit\" name=\"id\" value=\"" + this.responseText + 
                "\">UpEdit</button></form> " +
                "<form method=\"GET\" action=\"/upbrowser\" target=\"_blank\">" +
                "<button style=\"margin-top: 0px; type=\"submit\" id=\"upbrowser\" name=\"id\" value=\"" + this.responseText + 
                "\">UpBrowser</button></form>";
        }
    }
    xhttp.open("POST", "/OCR?_method=POST", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("myreq=" + JSON.stringify(data_request) + "&id=" + document.getElementById("save").value);
}


function save_text_area()
{
    var i = 0;
    while (i < document.getElementsByTagName("TEXTAREA").length)
    {
        document.getElementsByTagName("TEXTAREA")[i].innerHTML = document.getElementsByTagName("TEXTAREA")[i].value;
        i++;
    }
}
/**** GLOBAL****/
/*             */
/* global elem */
/* global size */
/*             */
/**** GLOBAL****/

var table_select_basic = 10;
var table_select_edit = 7;

//Bouton d'édition d'une ligne de donnée
function showEdit(line, data_id) {
    var lineEdit = line.nextElementSibling;
    var classNumber = Number(line.children[0].children[0].className);

    size = size - (table_select_basic - table_select_edit);
    if (elem >= classNumber + table_select_edit) {
        elem = elem - (table_select_basic - table_select_edit);
    }
    line.style.display = "none";
    lineEdit.removeAttribute("style");
    updateclassNumber(lineEdit, classNumber);
    if (line.children[4].innerHTML.indexOf("oui") != -1) {
        lineEdit.children[4].children[0].children[1].checked = true;
    } else {
        lineEdit.children[4].children[0].children[3].checked = true;
    }
    removeClassLine(line);
}

//Enlève les classes présentes dans la ligne de base du tableau donnée en paramètre
function removeClassLine(line) {
    for (let i = 0; i < 6; i++) {
        if (i === 5) {
            for (let j = 0; j < 10; j++) {
                if (j === 1 || j === 3 || j === 5) {
                    line.children[i].children[j].children[0].removeAttribute("class");
                } else {
                    line.children[i].children[j].removeAttribute("class");
                }
            }
        }
        line.children[i].children[0].removeAttribute("class");
    }
}

//Enlève les classes présentes dans la ligne d'édition du tableau donnée en paramètre
function removeClassLineEdit(line) {
    for (let i = 0; i < 6; i++) {
        if (i === 0 || i === 4) {
            for (let j = 0; line.children[i].children[0].children[j] && j < 3; j++) {
                line.children[i].children[0].children[j].removeAttribute("class");
            }
        } else if (i === 3 || i === 5) {
            for (let j = 0; line.children[i].children[j] && j < 4; j++) {
                line.children[i].children[j].removeAttribute("class");
            }
        } else {
            line.children[i].children[0].removeAttribute("class");
        }
    }
}

//Mets à jour les classes pour la sélection
function updateclassNumber(line, classNumber) {
    while (line != null) {
        if (line.style.display != 'none') {
            if (line.id.indexOf("_edit") != -1) {
                for (let i = 0; i < 6; i++) {
                    if (i === 0 || i === 4) {
                        for (let j = 0; line.children[i].children[0].children[j] && j < 3; j++) {
                            if (line.children[i].children[0].children[j].className !== 'selected') {
                                line.children[i].children[0].children[j].className = classNumber + i;
                            }
                        }
                    } else if (i === 3 || i === 5) {
                        for (let j = 0; line.children[i].children[j] && j < 4; j++) {
                            if (line.children[i].children[j].className !== 'selected') {
                                line.children[i].children[j].className = classNumber + i + (j / 2 >> 0);
                            }
                        }
                    } else {
                        if (line.children[i].children[0].className !== 'selected') {
                            line.children[i].children[0].className = classNumber + i;
                        }
                    }
                }
                classNumber += table_select_edit;
            }
            else {
                for (let i = 0; i < 6; i++) {
                    if (line.children[i].children[0].className !== 'selected') {
                        line.children[i].children[0].className = classNumber + i;
                    }
                    if (i === 5) {
                        for (let j = 0; j < 10; j++) {
                            if ((j % 2 === 1) && (j <= 5)) {
                                if (line.children[i].children[j].children[0].className !== 'selected') {
                                    line.children[i].children[j].children[0].className = classNumber + i + (j / 2 >> 0);
                                }
                            } else {
                                if (line.children[i].children[j].className !== 'selected') {
                                    line.children[i].children[j].className = classNumber + i + (j / 2 >> 0);
                                }
                            }
                        }
                    }
                }
                classNumber += table_select_basic;
            }
        }
        line = line.nextElementSibling;
    }
}

//Bouton de retour à la ligne de base du tableau
function returnLine(myId) {
    var classNumber = Number(myId.nextElementSibling.children[0].children[0].children[0].className);
    size = size + (table_select_basic - table_select_edit);
    if (elem >= classNumber + table_select_edit) {
        elem = elem + (table_select_basic - table_select_edit);
    }
    myId.removeAttribute("style");
    myId.nextElementSibling.style.display = "none";
    updateclassNumber(myId, classNumber);
    removeClassLineEdit(myId.nextElementSibling);
    
}

//Bouton enregistrant les modifications apportés sur la ligne d'édition du tableau
function editLine(index, line, data_id) {
    var radio_i;
    var radio = document.getElementsByName("Public_edit_" + index);
    var classNumber = Number(line.nextElementSibling.children[0].children[0].children[0].className);
    var xhttp = new XMLHttpRequest();

    if (radio[0].checked) {
        radio_i = 1;
    } else {
        radio_i = 3;
    }
    size = size + (table_select_basic - table_select_edit);
    if (elem >= classNumber + table_select_edit) {
        elem = elem + (table_select_basic - table_select_edit);
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            line.children[0].children[0].innerHTML = line.nextElementSibling.children[0].children[0].children[1].value;
            line.children[3].children[0].innerHTML = line.nextElementSibling.children[3].children[1].value;
            if (radio_i === 1) {
                line.children[4].children[0].innerHTML = "oui";
            } else {
                line.children[4].children[0].innerHTML = "non";
            }
            line.removeAttribute("style");
            line.nextElementSibling.style.display = "none";
            updateclassNumber(line, classNumber);
            removeClassLineEdit(line.nextElementSibling);
        }
    };
    xhttp.open("PUT", "/home?_method=PUT", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send('id=' + data_id +
        '&titre=' + line.nextElementSibling.children[0].children[0].children[1].value + 
        '&commentaire=' + line.nextElementSibling.children[3].children[1].value + 
        '&acces=' + line.nextElementSibling.children[4].children[0].children[radio_i].value);
}

//Bouton qui supprime la ligne du tableau ainsi que ses données
function deleteLine(line, id) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            line.outerHTML = "";
        }
    };
    xhttp.open("DELETE", "/home?_method=DELETE", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send('id=' + id);
}

/************* AWS *************/
function aws_deleteLine(line, id) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            line.outerHTML = "";
        }
    };
    xhttp.open("DELETE", "/aws?_method=DELETE", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send('id=' + id);
}
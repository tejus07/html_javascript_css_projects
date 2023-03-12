let allDetails = [];
let count = 0;
let rowcount = 1;

function validateName() {
    let nameVal = document.forms["task"]["name"].value;
    if (nameVal === "") {
        document.getElementById("validName").innerHTML = "*Enter Name";
        document.getElementById("name").style.border = "1px solid red";
        return false;
    } else {
        let regExp = /^[a-zA-Z ]{3,30}$/,
            result = regExp.test(nameVal);

        if (result === false) {
            document.getElementById("validName").innerHTML = "*Invalid Name";
            document.getElementById("name").style.border = "1px solid red";
            return false;
        } else {
            return true;
        }
    }
}

function validPhone() {
    let phoneVal = document.forms["task"]["phone"].value;
    if (phoneVal === "") {
        document.getElementById("validPhone").innerHTML = "*Enter Number";
        document.getElementById("phone").style.border = "1px solid red";
    } else {
        let regExp = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
        let result = regExp.test(phoneVal);
        if (result === false) {
            document.getElementById("validPhone").innerHTML = "*Invalid Number";
            document.getElementById("name").style.border = "1px solid red";
        } else
            return true;
    }
}

function validEmail(id) {

    let email = document.forms["task"]["email"].value,
        dupCheck;

    allDetails.forEach(obj => {
        if (obj.email === email) {
            if (id === 'apply-btn') {
                dupCheck = false;
            }


        }
    })
    if (dupCheck === false) {
        document.getElementById("validEmail").innerHTML = "*Duplicates not allowed";
        document.getElementById("email").style.border = "1px solid red";
    } else {
        if (email === "") {
            document.getElementById("validEmail").innerHTML = "*Enter Email";
            document.getElementById("email").style.border = "1px solid red";
        } else {
            let regExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
            let result = regExp.test(email);
            if (result === false) {
                document.getElementById("validEmail").innerHTML = "*Invalid Email";
                document.getElementById("email").style.border = "1px solid red";
            } else
                return true;
        }
    }
}

function validDOB() {
    let currDate = new Date();
    let dobVal = document.forms["task"]["dob"].value;
    let age = calAge(dobVal);
    let dobDateObj = new Date(dobVal);
    let timeMS = dobDateObj.getTime();

    if (dobVal === "") {
        document.getElementById("validAge").innerHTML = "*Enter Date";
        document.getElementById("dob").style.border = "1px solid red";
    } else {
        if (!timeMS && timeMS !== 0)
            return false;
        let result = dobDateObj.toISOString().slice(0, 10) === dobVal;
        let checkCurrDate
        if (currDate.getTime() > dobDateObj.getTime()) checkCurrDate = true;
        if (checkCurrDate === true && result === true) {
            if (age < 101)
                return true;
            else if (age >= 101) {
                document.getElementById("validAge").innerHTML = "*How are you alive?";
                return false;
            }
        } else {
            document.getElementById("validAge").innerHTML = "*Invalid Date";
            document.getElementById("dob").style.border = "1px solid red";
            return false;
        }
    }
}

function validSub() {
    let checkBoxVal = document.getElementsByName('sub');
    let checkVals = [];

    checkBoxVal.forEach(element => {
        if (element.checked)
            checkVals.push(element.value);
    });

    if (checkVals.length === 0) {
        document.getElementById("validSub").innerHTML = "*Select Subject";
        return false;
    } else
        return true;
}

function validateData(id) {
    let vName = validateName();
    let vPhone = validPhone();
    let vEmail = validEmail(id);
    let vDOB = validDOB();
    let vSub = validSub();
    clearCheckValidation(vName, vPhone, vSub, vEmail, vDOB);

    if ((vName === true) && (vPhone === true) && (vEmail === true) && (vDOB === true) && (vSub === true)) {
        if (id === 'apply-btn') {
            addToObject();
        } else {
            updateEditRow(id);
        }
    } else {
        return false;
    }

}

function clearCheckValidation(vName, vPhone, vSub, vEmail, vDOB) {
    if (vName === true) {
        document.getElementById("validName").innerText = null;
        document.getElementById("name").style.border = "none";
    }
    if (vPhone === true) {
        document.getElementById("validPhone").innerText = null;
        document.getElementById("phone").style.border = "none";
    }
    if (vSub === true)
        document.getElementById("validSub").innerText = null;
    if (vEmail === true) {
        document.getElementById("validEmail").innerText = null;
        document.getElementById("email").style.border = "none";
    }
    if (vDOB === true) {
        document.getElementById("validAge").innerText = null;
        document.getElementById("dob").style.border = "none";
    }
    return true;
}

function clearValidation() {
    document.getElementById("validName").innerText = null;
    document.getElementById("validPhone").innerText = null;
    document.getElementById("validEmail").innerText = null;
    document.getElementById("validSub").innerText = null;
    document.getElementById("validAge").innerText = null;
    document.getElementById("name").style.border = "none";
    document.getElementById("phone").style.border = "none";
    document.getElementById("dob").style.border = "none";
    document.getElementById("email").style.border = "none";
    return true;
}

function calAge(dobVal1) {
    let birthDate = new Date(dobVal1);
    let difference = Date.now() - birthDate.getTime();
    let ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function capitalize(String) {
    return String.trim().toLowerCase().replace(/(^\w)|(\s\w)/g, match => match.toUpperCase());
}

//W.I.P
function checkEmailLength(email) {
    if (email.length <= 26) {
        return email;
    } else {
        let a = email.match(/.{1,26}/g);
        a.join(' ');
        return a;
    }
}

function getInputVal(id) {
    let nameVal = document.getElementById("name").value,
        phoneVal = document.getElementById("phone").value,
        emailVal = document.getElementById("email").value,
        dobVal = document.getElementById("dob").value;
    //To Capitalize
    nameVal = capitalize(nameVal);
    emailVal = checkEmailLength(emailVal);

    let checkboxesVal = document.getElementsByName('sub');
    let checkVals = [];
    checkboxesVal.forEach(element => {
        if (element.checked)
            checkVals.push(element.value);
    });

    let radioboxVal = document.getElementsByName('gender');
    let radioVals = [];
    radioboxVal.forEach(element => {
        if (element.checked)
            radioVals.push(element.value);
    });
    return {
        number: Number(id),
        name: nameVal,
        phone: phoneVal,
        age: dobVal,
        email: emailVal,
        sub: checkVals,
        gender: radioVals,
    };
}

function addToObject() {
    clearValidation();
    let obj = getInputVal(count);
    allDetails.push(obj);

    let button1 = document.createElement("button");
    button1.setAttribute("id", `${count}`);
    button1.setAttribute("onclick", "editRow(this.id)");
    button1.setAttribute("class", "btn-edit w3-border");
    button1.innerHTML = "Edit";

    let button2 = document.createElement("button");
    button2.setAttribute("id", `${count}`);
    button2.setAttribute("onclick", "removeRow(this.id)");
    button2.setAttribute("class", "btn-remove w3-border");
    button2.innerHTML = "Remove";

    let table = document.getElementById("table");
    table.style.display = "table";
    let i = allDetails.length;
    let row = table.insertRow(i);
    row.setAttribute("id", "row_id" + count);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);
    let cell9 = row.insertCell(8);
    let srCount = Number(table.rows.length);
    cell1.innerHTML = String(srCount - 1);
    cell2.innerHTML = obj.name;
    cell3.innerHTML = obj.phone;
    cell4.innerHTML = calAge(obj.age) + " yr";
    cell5.innerHTML = obj.email;
    cell6.innerHTML = obj.sub.toString();
    cell7.innerHTML = obj.gender.toString();
    cell8.appendChild(button1);
    cell8.setAttribute("class", "btn-cell");
    cell9.appendChild(button2);
    cell9.setAttribute("class", "btn-cell");
    document.getElementById("task").reset();
    count++;
    rowcount++;
}

function editRow(clicked_id) {
    clearValidation();
    document.getElementById("task").reset();

    let id = Number(clicked_id);
    let objIndex = allDetails.findIndex((obj => obj.number === id));
    document.getElementById("name").value = allDetails[objIndex].name;
    document.getElementById("phone").value = allDetails[objIndex].phone;
    document.getElementById("email").value = allDetails[objIndex].email;
    document.getElementById("dob").value = allDetails[objIndex].age;
    let checkVal = allDetails[objIndex].sub;
    let checked = document.getElementsByName("sub");
    checked.forEach(element => {
        checkVal.forEach(object => {
            if (element.defaultValue === object) {
                element.checked = true;
            }
        })
    })

    let RadioVal = document.getElementsByName("gender");
    let radioChecked = allDetails[objIndex].gender;
    RadioVal.forEach(element => {
        radioChecked.forEach(object => {
            if (element.defaultValue === object)
                element.checked = true;
        })
    })

    document.getElementById("apply-btn").style.display = "none";
    let button3 = document.getElementsByClassName('btn-update')[0];
    button3.setAttribute("id", `${Number(clicked_id)}`);
    button3.style.display = "block";
    button3.setAttribute("onclick", "validateData(this.id)");
}

function updateEditRow(clicked_id) {
    clearValidation();
    document.getElementsByClassName("btn-update")[0].style.display = "none";
    document.getElementById("apply-btn").style.display = "inline-block";
    let editObj = getInputVal(clicked_id);
    let objIndex = allDetails.findIndex((obj => obj.number === Number(clicked_id)));
    allDetails.splice(objIndex, 1, editObj);
    let table = document.getElementById("table"),
        rowId = Number(clicked_id),
        rowNo = document.getElementById("row_id" + rowId).id;

    table.rows[rowNo].cells[1].innerHTML = editObj.name;
    table.rows[rowNo].cells[2].innerHTML = editObj.phone;
    table.rows[rowNo].cells[3].innerHTML = calAge(editObj.age) + " yr";
    table.rows[rowNo].cells[4].innerHTML = editObj.email;
    table.rows[rowNo].cells[5].innerHTML = editObj.sub.toString();
    table.rows[rowNo].cells[6].innerHTML = editObj.gender.toString();
    document.getElementById("task").reset();
}

function removeRow(clicked_id) {
    clearValidation();
    document.getElementById("task").reset();
    let buttonID = Number(clicked_id);
    let objIndex = allDetails.findIndex((obj => obj.number === buttonID));
    allDetails.splice(objIndex, 1);
    document.getElementById("row_id" + buttonID).remove();
    updateColNo();

    document.getElementsByClassName("btn-update")[0].style.display = "none";
    document.getElementById("apply-btn").style.display = "block";
}

function updateColNo() {
    let table = document.getElementById("table");
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerHTML = i.toString();
    }
    if (table.rows.length < 2) {
        table.style.display = "none";
    }
}

function filterUpdateColNo() {
    let table = document.getElementById("table");
    let count = 1;
    for (let i = 1; i < table.rows.length; i++) {
        console.log(table.rows[i].style.display);
        if(table.rows[i].style.display !== "none"){
            table.rows[i].cells[0].innerHTML = count.toString();
            console.log("in count");
            count++;
        }
    }
    if (table.rows.length < 2) {
        table.style.display = "none";
    }
}

function getFilterValues() {
    let genderValue = document.getElementsByName("genderF");
    let genderCheckedValues = [];
    genderValue.forEach(element => {
        if (element.checked)
            genderCheckedValues.push(element.value);
    });


    let subjectValue = document.getElementsByName("subF");
    let subjectCheckedValues = [];
    subjectValue.forEach(element => {
        if (element.checked)
            subjectCheckedValues.push(element.value);
    });

    let genderMatches = [];

    allDetails.forEach(obj => {
        genderCheckedValues.forEach(element => {
            if (obj.gender[0] === element) {
                genderMatches.push(obj);
            }
        })
    });
    if (genderMatches.length === 0) {
        let subMatches = [];
        for (let i = 0; i < allDetails.length; i++) {
            let result = !subjectCheckedValues.some(val => !allDetails[i].sub.includes(val));
            if (result === true) {
                subMatches.push(allDetails[i]);
            }
        }

        arrayToTableDisplay(subMatches);
    } else {
        let subMatches = [];
        for (let i = 0; i < genderMatches.length; i++) {
            let result = !subjectCheckedValues.some(val => !genderMatches[i].sub.includes(val));
            if (result) {
                subMatches.push(genderMatches[i]);
            }
        }

        if (!subjectValue) {
            clearFilterValues();
        } else {

            arrayToTableDisplay(subMatches);
        }

    }

}

function arrayToTableDisplay(subMatches) {

    let table = document.getElementById("table");
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].style.display = "none";
    }


    for (let j = 0; j < subMatches.length; j++) {
        let input, filter, table, tr, td, i, txtValue;
        input = subMatches[j].email;
        filter = input.toUpperCase();
        table = document.getElementById("table");
        tr = table.getElementsByTagName("tr");
        console.log(tr.length);
        for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[4];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase() === filter) {
                    tr[i].style.display = "";
                }
            }
        }
    }
    filterUpdateColNo();
}

function clearFilterValues() {
    let table = document.getElementById("table");
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].style.display = "table-row";
    }
    document.getElementById("filter").reset();
    updateColNo();

}


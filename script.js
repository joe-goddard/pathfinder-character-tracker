let charID;
let actID;
let reNum;
let reNumG;
let die = [];
//initialise varaibles to be used across multiple methods
class Store {
    static addChar() {
        let chaDB = firebase.database().ref('characters');
        let newChaRef = chaDB.push(); // create a new random string under characters in the database to serve as the path for this character
        newChaRef.set({
            name: document.querySelector('#cName').value // gets the name of the character from the character name input
        })
    }

    static addInfo() {
        let infoDB = firebase.database().ref(`info/${charID}`); // saves the info in the path of the character id under info
        infoDB.set({
            data: document.querySelector('#info-box').value // gets the info data from the info box
        })
    }

    static addResources() {
        let resDB = firebase.database().ref(`resources/${charID}/res${reNum}`); // saves the resource in the number the resource entry is assigned under the character id in resources
        resDB.set({  // gets name, current value, and max value from the inputs of the number the resource entry is assigned
            name: document.querySelector('#rName' + reNum).value,
            curVal: document.querySelector('#rCurrent' + reNum).value,
            maxVal: document.querySelector('#rMax' + reNum).value
        })
    }

    static addAct(charID) {
        let actionDB = firebase.database().ref(`actions/${charID}`);
        let newActRef = actionDB.push(); // create a new random string under actions and the character id in the database to serve as the path for this action
        newActRef.set({  // gets variables from the action entry inputs
            name: document.querySelector('#aName').value,
            atMod: document.querySelector('#aAMod').value,
            atType: document.querySelector('#aAType').value,
            range: document.querySelector('#aRange').value,
            critMod: document.querySelector('#aCCMod').value,
            critMult: document.querySelector('#aCMult').value,
            critRange: document.querySelector('#aCRange').value,
            damMod: document.querySelector('#aDMod').value,
            dieList: $('#diceDisp').data('arr'),
            extra: document.querySelector('#aEffects').value
        })
        return newActRef.key;  // return the action id to be used to specify this entry
    }

    static upAct(charID) {
        let actionDB = firebase.database().ref(`actions/${charID}/${actID}`); // update the action that has already been selected under the action id
        actionDB.set({ // gets variables from the action entry inputs
            name: document.querySelector('#aName').value,
            atMod: document.querySelector('#aAMod').value,
            atType: document.querySelector('#aAType').value,
            range: document.querySelector('#aRange').value,
            critMod: document.querySelector('#aCCMod').value,
            critMult: document.querySelector('#aCMult').value,
            critRange: document.querySelector('#aCRange').value,
            damMod: document.querySelector('#aDMod').value,
            dieList: $('#diceDisp').data('arr'),
            extra: document.querySelector('#aEffects').value
        })
    }

    static getInfo(charID) {
        let infoDB = firebase.database().ref(`info/${charID}`); // finds info path under info and the set character id
        infoDB.once('value', snap => {
            snap.forEach(data => {
                let info = {}
                info.id = data.key;
                info.data = data.val()
                document.querySelector('#info-box').innerHTML = info.data // puts the value with the data key in the info box
            })
        })
    }
    static getRes(charID, reNumG) {
        let resDB = firebase.database().ref(`resources/${charID}/res${reNumG}`); // finds resource path under resources, the character id, and the set resource entry number
        resDB.once('value', snap => {
            snap.forEach(data => { // puts the value of each key in the corresponding input
                let res = {}
                res.id = data.key;
                res.name = data.val()
                res.curVal = data.val()
                res.maxVal = data.val()
                if (res.id == 'name') { document.querySelector('#rName' + reNumG).value = res.name }
                if (res.id == 'curVal') { document.querySelector('#rCurrent' + reNumG).value = res.curVal }
                if (res.id == 'maxVal') { document.querySelector('#rMax' + reNumG).value = res.maxVal }
            })
        })
    }
    static getAct() {
        let actionDB = firebase.database().ref(`actions/${charID}`); // goes to the character id under actions
        actionDB.once('value', snap => {
            snap.forEach(data => { // create new entry in the list of action names with its html id being the created action id
                let actions = {}
                actions.id = data.key;
                actions.name = data.val().name
                var act = document.createElement("p");
                var text = document.createTextNode(actions.name);
                act.appendChild(text);
                act.id = actions.id;
                var element = document.querySelector('#act-list');
                element.appendChild(act);
            })
        })
    }
    static getActCal(actID) {
        let actionDB = firebase.database().ref(`actions/${charID}/${actID}`); // gets the selected action under the action id under the character id under actions
        actionDB.once('value', snap => {
            snap.forEach(data => { // gets each value saved in the action and puts them in their respective inputs
                let actions = {}
                actions.id = data.key;
                actions.name = data.val()
                actions.atMod = data.val()
                actions.atType = data.val()
                actions.range = data.val()
                actions.critMod = data.val()
                actions.critMult = data.val()
                actions.critRange = data.val()
                actions.damMod = data.val()
                actions.dieList = data.val()
                actions.extra = data.val()
                if (actions.id == 'name') { document.querySelector('#aName').value = actions.name }
                if (actions.id == 'atMod') { document.querySelector('#aAMod').value = actions.atMod }
                if (actions.id == 'atType') { document.querySelector('#aAType').value = actions.atType }
                if (actions.id == 'range') { document.querySelector('#aRange').value = actions.range }
                if (actions.id == 'critMod') { document.querySelector('#aCCMod').value = actions.critMod }
                if (actions.id == 'critMult') { document.querySelector('#aCMult').value = actions.critMult }
                if (actions.id == 'critRange') { document.querySelector('#aCRange').value = actions.critRange }
                if (actions.id == 'damMod') { document.querySelector('#aDMod').value = actions.damMod }
                if (actions.id == 'dieList') { die = JSON.parse(actions.dieList) } // updates the die variable, converting the stored string of die to an array
                if (actions.id == 'extra') { document.querySelector('#aEffects').value = actions.extra }
            })
        })
    }
    static getChar() {
        let charDB = firebase.database().ref('characters'); // goes under characters
        charDB.once('value', snap => {
            snap.forEach(data => { // create new entry in the list of character names with its html id being the created character id
                let characters = {}
                characters.id = data.key;
                characters.name = data.val().name
                var cha = document.createElement("p");
                var text = document.createTextNode(characters.name);
                cha.appendChild(text);
                cha.id = characters.id;
                var element = document.querySelector('#cha-list');
                element.appendChild(cha);
            })
        })
    }
    static deleteDice(charID, actID) {
        firebase.database().ref(`actions/${charID}/${actID}/dieList`).remove(); // deletes the saved array of dice in the selected action
    }
    static deleteAction(charID, actID) {
        firebase.database().ref(`actions/${charID}/${actID}`).remove(); // deletes the selected action path
    }
    static deleteCharacter(charID) {
        firebase.database().ref(`characters/${charID}`).remove(); // deletes the selected character path
        firebase.database().ref(`info/${charID}`).remove(); // deletes the info saved under the character
        firebase.database().ref(`resources/${charID}`).remove(); // deletes the resources saved under the character
        firebase.database().ref(`actions/${charID}`).remove(); // deletes the actions saved under the character
    }
}
document.addEventListener('DOMContentLoaded', Store.getChar); // gets the list of characters as the page loads

document.querySelector('#new-cha').addEventListener('click', (e) => {
    if (document.querySelector('#cName').value !== "") { // makes sure the name input is not empty
        Store.addChar(name); // activate the method to create a new character path, saving its name and making a new id
        location.reload(); // reload the page to trigger the method to load the list of character names
    }
})
document.querySelector('#cha-list').addEventListener('click', (e) => {
    if (event.target.id !== "cha-list") { // makes sure the user hasnt clicked soemwhere in the div other than a character name
        charID = event.target.id; // sets the character id variable as the html id of the clicked character
        document.querySelector('#cha-select').classList.add("hidden"); // hides the character selection screen
        document.querySelector('#main-screen').classList.remove("hidden"); // shows the character screen
        Store.getInfo(charID); // gets the info for the character
        Store.getAct(charID); // gets the list of actions for the character
        reNumG = 1;
        for (i = 0; i < 7; i++) {
            Store.getRes(charID, reNumG); // goes through each of the 6 resource inputs and gets them
            reNumG++;
        }
    }
})
document.querySelector('#act-list').addEventListener('click', (e) => {
    if (event.target.id !== "act-list") { // makes sure the user hasnt clicked soemwhere in the div other than an action name
        actID = event.target.id; // sets the action id variable as the html id of the clicked action
        document.querySelector('#act-list').classList.add("hidden"); // hide list of actions
        document.querySelector('#new-act').classList.add("hidden"); // hide new action button
        document.querySelector('#add-act').classList.add("hidden"); // hide add action button
        document.querySelector('#act-entry').classList.remove("hidden"); // show action inputs
        document.querySelector('#act-roll').classList.remove("hidden"); // show the roll information
        Store.getActCal(actID); // gets the data from the selected action
    }
})
document.querySelector('#new-act').addEventListener('click', (e) => {
    document.querySelector('#act-list').classList.add("hidden"); // hide list of actions
    document.querySelector('#new-act').classList.add("hidden"); // hide new action buttom
    document.querySelector('#act-save').classList.add("hidden"); // hide save action button
    document.querySelector('#act-roll').classList.add("hidden"); // hide roll info 
    document.querySelector('#clear-dice').classList.add("hidden"); // hide clear dice button
    document.querySelector('#act-entry').classList.remove("hidden"); // show action inputs
    document.querySelector('#add-act').classList.remove("hidden"); // show add action button

})
document.querySelector('#add-act').addEventListener('click', (e) => {
    if (document.querySelector('#aName').value !== "") { // makes sure the user hasnt left the action name blank
        document.querySelector('#act-list').innerHTML = " "; // removes the action list
        die = JSON.stringify(die) // turns the die array into a string that can be saved in the database
        $('#diceDisp').data('arr', die) // sets the die variable as the data-arr of the dice display
        Store.addAct(charID); // adds the action to the database
        Store.getAct(charID);  // gets the list of actions
        document.querySelector('#act-entry').classList.add("hidden"); // hides the action inputs
        document.querySelector('#act-list').classList.remove("hidden"); // shows action list
        document.querySelector('#new-act').classList.remove("hidden"); // shows new action button
        document.querySelector('#clear-dice').classList.remove("hidden"); // shows clear dice button
        document.querySelector('#act-save').classList.remove("hidden"); // shows save action button

    }
})
document.querySelector('#end-act').addEventListener('click', (e) => {
    document.querySelector('#act-entry').classList.add("hidden"); // hides action inputs
    document.querySelector('#act-list').classList.remove("hidden"); // shows action list
    document.querySelector('#new-act').classList.remove("hidden"); // shows new action button
})
document.querySelector('#add-die').addEventListener('click', (e) => {
    if (typeof die == "string") { die = JSON.parse(die); } // converts the die vaiable t an array if it is a string
    let num = document.querySelector('#aDNum').value; // sets the dice number varable as the corresponding input value
    let type = document.querySelector('#aDType').value; // sets the dice number type as the corresponding input value
    let rad = document.querySelector('#rad').checked; // sets whether the dice is to be multiplied on crit as a boolean
    if (rad == true) { rad = 1 } // sets the variable to one if the radio was checked
    else { rad = 0 } // sets the variable to 0 if the radio was not checked
    die.push([parseInt(num), parseInt(type), rad]);  // pushes a new array into the dice array with [0] being the dice number, [1] being the dice type, and [2] being whether it is multiplied on crit
    document.querySelector('#rad').checked = false; // unchecks the radio
})
document.querySelector('#act-save').addEventListener('click', (e) => {
    die = JSON.stringify(die) // turns the die array into a string that can be saved in the database
    $('#diceDisp').data('arr', die) // sets the die variable as the data-arr of the dice display
    Store.upAct(charID) // updates the action in the database
})

document.querySelector('#save-info').addEventListener('click', Store.addInfo); // adds the info under the character
document.querySelector('#re-save1').addEventListener('click', (e) => { reNum = 1; Store.addResources(reNum) }); // save resource 1 in the database
document.querySelector('#re-save2').addEventListener('click', (e) => { reNum = 2; Store.addResources(reNum) }); // save resource 2 in the database
document.querySelector('#re-save3').addEventListener('click', (e) => { reNum = 3; Store.addResources(reNum) }); // save resource 3 in the database
document.querySelector('#re-save4').addEventListener('click', (e) => { reNum = 4; Store.addResources(reNum) }); // save resource 4 in the database
document.querySelector('#re-save5').addEventListener('click', (e) => { reNum = 5; Store.addResources(reNum) }); // save resource 5 in the database
document.querySelector('#re-save6').addEventListener('click', (e) => { reNum = 6; Store.addResources(reNum) }); // save resource 6 in the database

document.querySelector('#clear-dice').addEventListener('click', (e) => {
    Store.deleteDice(charID, actID) // deletes the die saved in the database
})
document.querySelector('#del-act').addEventListener('click', (e) => {
    Store.deleteAction(charID, actID) // deletes the selected action
    Store.getAct(charID); // gets the action list
    document.querySelector('#act-list').innerHTML = " "; // resets the action list
    document.querySelector('#act-entry').classList.add("hidden"); // hide the action inputs
    document.querySelector('#act-list').classList.remove("hidden"); // show the action list
    document.querySelector('#new-act').classList.remove("hidden"); // show the new action button
})
document.querySelector('#del-cha').addEventListener('click', (e) => {
    Store.deleteCharacter(charID) // delete the selected character
    location.reload() // reload the page to show the list of characters
})

document.querySelector('#roll-att').addEventListener('click', (e) => {
    if (typeof die == "string") { die = JSON.parse(die); } // converts the die variable into an array if it is a string
    let atMod = document.querySelector('#aAMod').value; // creates the attack mod variable from the value of the corresponding input
    let critMod = document.querySelector('#aCCMod').value; // creates the crit confirm mod variable from the value of the corresponding input
    let critRange = document.querySelector('#aCRange').value; // creates the critical range variable from the value of the corresponding input
    let attack = Math.floor(Math.random() * 20) + 1; // random number from 1-20 for the attack roll
    document.querySelector('#toHitDisp').innerHTML = attack; // shows the base result of the attack roll
    if (attack > 20 - critRange) { // rolls a critical confirm if the base attack roll was within the critical range
        let critConfirm = Math.floor(Math.random() * 20) + 1; // random number from 1-20 for the crit confirm roll
        document.querySelector('#critDisp').innerHTML = critConfirm; // shows the base result of the crit confirm roll
        critConfirm = critConfirm + parseInt(atMod) + parseInt(critMod); // sets the final crit confirm result as the original roll plus the attack mod and confirm mod
        document.querySelector('#critDisp').innerHTML += " (" + critConfirm + ")"; // shows final confirm in brackets next to the original roll
    }
    else {
        document.querySelector('#critDisp').innerHTML = "[Critical Confirm Result]" // sets the display as the default if no confirm roll is made
    }
    attack = attack + parseInt(atMod); // sets final attack result as the original roll plus the attack mod
    document.querySelector('#toHitDisp').innerHTML += " (" + attack + ")"; // shows final attack result in brackets next to the original roll
})
document.querySelector('#roll-dam').addEventListener('click', (e) => {
    if (typeof die == "string") { die = JSON.parse(die); } // converts the die variable into an array if it is a string
    let damageDieYMult = 0; // create varable for the sum of dice results to be multiplied on critical
    let damageDieNMult = 0; // create varable for the sum of dice results to not be multiplied on critical
    let damMod = document.querySelector('#aDMod').value; // creates the damage mod variable from the value of the corresponding input
    let critMult = document.querySelector('#aCMult').value; // creates the critical multiplier variable from the value of the corresponding input
    document.querySelector('#damDisp').innerHTML = " " // clears the damage dice display
    for (i = 0; i < die.length; i++) {
        for (j = 0; j < die[i][0]; j++) { // does the following for a number of times equal to the dice number in the array
            let dieRoll = Math.floor(Math.random() * die[i][1]) + 1; // gets a random number from 1-the dice type number
            document.querySelector('#damDisp').innerHTML += dieRoll + ", "; // displays the result with a comma next to it
            if (die[i][2] == 1) {
                damageDieYMult = damageDieYMult + dieRoll; // adds to the sum of dice results to be multiplied on critical if the dice is set to be
            }
            else {
                damageDieNMult = damageDieNMult + dieRoll;  // adds to the sum of dice results not to be multiplied on critical if the dice is set to be
            }
        }
    }
    let damage = parseInt(damageDieYMult) + parseInt(damageDieNMult) + parseInt(damMod); // creates variable for the total dice results and the damage modifier
    let crit = parseInt(damageDieYMult) * parseInt(critMult); // creates variable for the critical sum by multiplyng the sum of dice to be multiplied by the critical multiplier
    let critDam = parseInt(crit) + parseInt(damageDieNMult) + parseInt(damMod); // creates variable for the total critical results by adding the multiplied dice to the non-multiplied dice and the damage modifier
    document.querySelector('#totalDisp').innerHTML = "Base Total: " + damage + "<br>" + "Critical Total: " + critDam // shows the base total and the critical total
})
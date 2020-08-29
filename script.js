let charID;
let actID;
let reNum;
let reNumG;
let hide;
let show;
let die = [];
class Characters {
    constructor(name, charID) {
        this.name = name
        this.charID = charID
    }
}
class Actions {
    constructor(name, id, atMod, atType, range, critMod, critMult, critRange, damMod, dieNum, dieType, dieList, extra) {
        this.name = name
        this.id = id
        this.atMod = atMod
        this.atType = atType
        this.range = range
        this.critMod = critMod
        this.critMult = critMult
        this.critRange = critRange
        this.damMod = damMod
        this.dieNum = dieNum
        this.dieType = dieType
        this.dieList = dieList
        this.extra = extra
    }
}
class Info {
    constructor(id, data) {
        this.id = id
        this.data = data
    }
}
class Resources {
    constructor(name, id, curVal, maxVal) {
        this.name = name
        this.id = id
        this.curVal = curVal
        this.maxVal = maxVal
    }
}

class UI {
    static hideShow(hide, show) {
        hide.classList.add("hidden")
        show.classList.remove("hidden")
    }
}

class Store {

    static addChar() {
        let chaDB = firebase.database().ref('characters');
        let newChaRef = chaDB.push();
        newChaRef.set({
            name: document.querySelector('#cName').value
        })
    }

    static addInfo() {
        let infoDB = firebase.database().ref(`info/${charID}`);
        infoDB.set({
            data: document.querySelector('#info-box').value
        })
    }

    static addResources() {
        let resDB = firebase.database().ref(`resources/${charID}/res${reNum}`);
        resDB.set({
            name: document.querySelector('#rName' + reNum).value,
            curVal: document.querySelector('#rCurrent' + reNum).value,
            maxVal: document.querySelector('#rMax' + reNum).value
        })
    }

    static addAct(charID) {
        let actionDB = firebase.database().ref(`actions/${charID}`);
        let newActRef = actionDB.push();
        newActRef.set({
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
        return newActRef.key;
    }

    static upAct(charID) {
        let actionDB = firebase.database().ref(`actions/${charID}/${actID}`);
        actionDB.set({
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
        let infoDB = firebase.database().ref(`info/${charID}`);
        infoDB.once('value', snap => {
            snap.forEach(data => {
                let info = {}
                info.id = data.key;
                info.data = data.val()
                document.querySelector('#info-box').innerHTML = info.data
            })
        })
    }
    static getRes(charID, reNumG) {
        let resDB = firebase.database().ref(`resources/${charID}/res${reNumG}`);
        resDB.once('value', snap => {
            snap.forEach(data => {
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
        let actionDB = firebase.database().ref(`actions/${charID}`);
        actionDB.once('value', snap => {
            snap.forEach(data => {
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
        let actionDB = firebase.database().ref(`actions/${charID}/${actID}`);
        actionDB.once('value', snap => {
            snap.forEach(data => {
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
                if (actions.id == 'dieList') { die = JSON.parse(actions.dieList) }

                if (actions.id == 'extra') { document.querySelector('#aEffects').value = actions.extra }
            })
        })
    }
    static getChar() {
        let charDB = firebase.database().ref('characters');
        charDB.once('value', snap => {
            snap.forEach(data => {
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
        firebase.database().ref(`actions/${charID}/${actID}/dieList`).remove();
    }
    static deleteAction(charID, actID) {
        firebase.database().ref(`actions/${charID}/${actID}`).remove();
    }
    static deleteCharacter(charID) {
        firebase.database().ref(`characters/${charID}`).remove();
        firebase.database().ref(`info/${charID}`).remove();
        firebase.database().ref(`resources/${charID}`).remove();
        firebase.database().ref(`actions/${charID}`).remove();
    }
}
document.addEventListener('DOMContentLoaded', Store.getChar);

document.querySelector('#new-cha').addEventListener('click', (e) => {
    if (document.querySelector('#cName').value !== "") {
    Store.addChar(name);
    location.reload();
    }
})
document.querySelector('#cha-list').addEventListener('click', (e) => {
    if(event.target.id !== "cha-list") {
    charID = event.target.id;
    hide = document.querySelector('#cha-select');
    show = document.querySelector('#main-screen');
    UI.hideShow(hide, show);
    Store.getInfo(charID);
    Store.getAct(charID);
    reNumG = 1;
    for (i = 0; i < 7; i++) {
        Store.getRes(charID, reNumG);
        reNumG++;
    }
}
})
document.querySelector('#act-list').addEventListener('click', (e) => {
    if(event.target.id !== "act-list") {
    actID = event.target.id;
    hide = document.querySelector('#act-list');
    show = document.querySelector('#act-entry');
    UI.hideShow(hide, show);
    hide = document.querySelector('#new-act');
    show = document.querySelector('#act-roll');
    UI.hideShow(hide, show);
    hide = document.querySelector('#add-act');
    show = document.querySelector('#baka');
    UI.hideShow(hide, show);
    Store.getActCal(actID);
    }
})
document.querySelector('#new-act').addEventListener('click', (e) => {
    hide = document.querySelector('#act-list');
    show = document.querySelector('#act-entry');
    UI.hideShow(hide, show);
    hide = document.querySelector('#new-act');
    show = document.querySelector('#baka');
    UI.hideShow(hide, show);
    hide = document.querySelector('#act-save');
    show = document.querySelector('#baka');
    UI.hideShow(hide, show);
    hide = document.querySelector('#baka');
    show = document.querySelector('#add-act');
    UI.hideShow(hide, show);
    hide = document.querySelector('#act-roll');
    show = document.querySelector('#baka');
    UI.hideShow(hide, show);
    hide = document.querySelector('#clear-dice');
    show = document.querySelector('#baka');
    UI.hideShow(hide, show);
    
})
document.querySelector('#add-act').addEventListener('click', (e) => {
    if (document.querySelector('#aName').value !== ""){
    document.querySelector('#act-list').innerHTML = " ";
    die = JSON.stringify(die)
    $('#diceDisp').data('arr', die)
    Store.addAct(charID);
    Store.getAct(charID);
    hide = document.querySelector('#act-entry');
    show = document.querySelector('#act-list');
    UI.hideShow(hide, show);
    hide = document.querySelector('#baka');
    show = document.querySelector('#new-act');
    UI.hideShow(hide, show);
    hide = document.querySelector('#baka');
    show = document.querySelector('#clear-dice');
    UI.hideShow(hide, show);
    hide = document.querySelector('#baka');
    show = document.querySelector('#act-save');
    UI.hideShow(hide, show);
    
    }
})
document.querySelector('#end-act').addEventListener('click', (e) => {
    hide = document.querySelector('#act-entry');
    show = document.querySelector('#act-list');
    UI.hideShow(hide, show);
    hide = document.querySelector('#baka');
    show = document.querySelector('#new-act');
    UI.hideShow(hide, show);
})
document.querySelector('#add-die').addEventListener('click', (e) => {
    if (typeof die == "string") { die = JSON.parse(die);}
    let num = document.querySelector('#aDNum').value;
    let type = document.querySelector('#aDType').value;
    let rad = document.querySelector('#rad').checked;
    if (rad == true) { rad = 1 }
    else { rad = 0 }
    die.push([parseInt(num), parseInt(type), rad]);
    document.querySelector('#rad').checked = false;
})
document.querySelector('#act-save').addEventListener('click', (e) => {
    die = JSON.stringify(die)
    $('#diceDisp').data('arr', die)
    Store.upAct(charID)
})

document.querySelector('#save-info').addEventListener('click', Store.addInfo);
document.querySelector('#re-save1').addEventListener('click', (e) => { reNum = 1; Store.addResources(reNum) });
document.querySelector('#re-save2').addEventListener('click', (e) => { reNum = 2; Store.addResources(reNum) });
document.querySelector('#re-save3').addEventListener('click', (e) => { reNum = 3; Store.addResources(reNum) });
document.querySelector('#re-save4').addEventListener('click', (e) => { reNum = 4; Store.addResources(reNum) });
document.querySelector('#re-save5').addEventListener('click', (e) => { reNum = 5; Store.addResources(reNum) });
document.querySelector('#re-save6').addEventListener('click', (e) => { reNum = 6; Store.addResources(reNum) });

document.querySelector('#clear-dice').addEventListener('click', (e) => {
    Store.deleteDice(charID, actID)
})
document.querySelector('#del-act').addEventListener('click', (e) => {
    Store.deleteAction(charID, actID)
    Store.getAct(charID);
    document.querySelector('#act-list').innerHTML = " ";
    hide = document.querySelector('#act-entry');
    show = document.querySelector('#act-list');
    UI.hideShow(hide, show);
    hide = document.querySelector('#baka');
    show = document.querySelector('#new-act');
    UI.hideShow(hide, show);
})
document.querySelector('#del-cha').addEventListener('click', (e) => {
    Store.deleteCharacter(charID)
    location.reload()
})

document.querySelector('#roll-att').addEventListener('click', (e) => {
    if (typeof die == "string") { die = JSON.parse(die); }
    let atMod = document.querySelector('#aAMod').value;
    let critMod = document.querySelector('#aCCMod').value;
    let critRange = document.querySelector('#aCRange').value;
    let attack = Math.floor(Math.random() * 20) + 1;
    document.querySelector('#toHitDisp').innerHTML = attack;
    if (attack > 20 - critRange) {
        let critConfirm = Math.floor(Math.random() * 20) + 1;
        document.querySelector('#critDisp').innerHTML = critConfirm;
        critConfirm = critConfirm + parseInt(atMod) + parseInt(critMod);
        document.querySelector('#critDisp').innerHTML += " (" + critConfirm + ")";
    }
    else {
        document.querySelector('#critDisp').innerHTML = "[Critical Confirm Result]"
    }
    attack = attack + parseInt(atMod);
    document.querySelector('#toHitDisp').innerHTML += " (" + attack + ")";
})
document.querySelector('#roll-dam').addEventListener('click', (e) => {
    if (typeof die == "string") { die = JSON.parse(die); }
    console.log(die)
    let damageDieYMult = 0;
    let damageDieNMult = 0;
    let damMod = document.querySelector('#aDMod').value;
    let critMult = document.querySelector('#aCMult').value;
    document.querySelector('#damDisp').innerHTML = " "
    for (i = 0; i < die.length; i++) {
        for (j = 0; j < die[i][0]; j++) {
            let dieRoll = Math.floor(Math.random() * die[i][1]) + 1;
            document.querySelector('#damDisp').innerHTML += dieRoll + ", ";
            if (die[i][2] == 1) {
                damageDieYMult = damageDieYMult + dieRoll;
            }
            else {
                damageDieNMult = damageDieNMult + dieRoll;
            }
        }
    }
    let damage = parseInt(damageDieYMult) + parseInt(damageDieNMult) + parseInt(damMod);
    let crit = parseInt(damageDieYMult) * parseInt(critMult);
    let critDam = parseInt(crit) + parseInt(damageDieNMult) + parseInt(damMod);
    document.querySelector('#totalDisp').innerHTML = "Base Total: " + damage + "<br>" + "Critical Total: " + critDam
})
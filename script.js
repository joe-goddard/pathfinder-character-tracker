let charID;
let reNum;
let reNumG;
class Characters{
    constructor(name, charID){
        this.name = name
        this.charID = charID
    }
}
class Actions{
    constructor(name, id, atMod, atType, range, critMod, critMult, critRange, damMod, dieNum, dieType, dieList, extra){
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
class Info{
    constructor(id, data){
        this.id = id
        this.data = data
    }
}
class Resources{
    constructor(name, id, curVal, maxVal){
        this.name = name
        this.id = id
        this.curVal = curVal
        this.maxVal = maxVal
    }
}

class UI{
    static hideShow(hide, show){
        hide.classList.add("hidden")
        show.classList.remove("hidden")
    }
}

class Store{

    static addChar(){
        let chaDB = firebase.database().ref('characters');
        let newChaRef = chaDB.push();
        newChaRef.set({
            name: document.querySelector('#cName').value
        })
    }

    static addInfo(){
        let infoDB = firebase.database().ref(`info/${charID}`);
        infoDB.set({
            data: document.querySelector('#info-box').value
        })
    }

    static addResources(){
        let resDB = firebase.database().ref(`resources/${charID}/res${reNum}`);
        resDB.set({
            name: document.querySelector('#rName'+reNum).value,
            curVal: document.querySelector('#rCurrent'+reNum).value,
            maxVal: document.querySelector('#rMax'+reNum).value
            
        })
    }
/** 
    static addAct(action, charID){
        let actionDB = firebase.database().ref(`actions/${charID}`);
        let newActRef = actionDB.push();
        newActRef.set({
            name: action.name,
            id: action.id,
            atMod: action.atMod,
            atType: action.atType,
            range: action.range,
            critMod: action.critMod,
            critMult: action.critMult,
            critRange: action.critRange,
            damMod: action.damMod,
            dieNum: action.dieNum,
            dieType: action.dieType,
            dieList: action.dieList,
            extra: action.extra
        })
        return newActRef.key;
    }
    */
    static getInfo(charID){
        let infoDB = firebase.database().ref(`info/${charID}`);
        infoDB.once('value',snap =>{
                snap.forEach(data=>{
                    let info = {}
                info.id = data.key;
                info.data = data.val()
                document.querySelector('#info-box').innerHTML = info.data
                })
            })
          }
          static getRes(charID, reNumG){
            let resDB = firebase.database().ref(`resources/${charID}/res${reNumG}`);
            resDB.once('value',snap =>{
                    snap.forEach(data=>{
                        let res = {}
                    res.id = data.key;
                    res.name = data.val()
                    res.curVal = data.val()
                    res.maxVal = data.val()
                    if(res.id == 'name'){document.querySelector('#rName'+reNumG).value = res.name}
                    if(res.id == 'curVal'){document.querySelector('#rCurrent'+reNumG).value = res.curVal}
                    if(res.id == 'maxVal'){document.querySelector('#rMax'+reNumG).value = res.maxVal}
                    })
                })
            }
              
    static getChar(){
        let charDB = firebase.database().ref('characters');
        charDB.once('value',snap =>{
                snap.forEach(data=>{
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
}
document.addEventListener('DOMContentLoaded',Store.getChar);

document.querySelector('#new-cha').addEventListener('click',(e)=>{
    Store.addChar(name);
    location.reload()
})
document.querySelector('#cha-list').addEventListener('click',(e)=>{
    charID = event.target.id;
    let hide = document.querySelector('#cha-select')
    let show = document.querySelector('#main-screen')
    UI.hideShow(hide, show);
    Store.getInfo(charID)
    reNumG = 1;
    for (i = 0; i < 7; i++) {
        Store.getRes(charID, reNumG)
        reNumG++
    }
})
document.querySelector('#new-act').addEventListener('click',(e)=>{
    let hide = document.querySelector('#new-act')
    let show = document.querySelector('#act-entry')
    UI.hideShow(hide, show);
})
document.querySelector('#add-act').addEventListener('click',(e)=>{
    let hide = document.querySelector('#act-entry')
    let show = document.querySelector('#act-roll')
    UI.hideShow(hide, show);
})

document.querySelector('#save-info').addEventListener('click',Store.addInfo);
document.querySelector('#re-save1').addEventListener('click',(e)=>{reNum = 1;Store.addResources(reNum)})
document.querySelector('#re-save2').addEventListener('click',(e)=>{reNum = 2;Store.addResources(reNum)})
document.querySelector('#re-save3').addEventListener('click',(e)=>{reNum = 3;Store.addResources(reNum)})
document.querySelector('#re-save4').addEventListener('click',(e)=>{reNum = 4;Store.addResources(reNum)})
document.querySelector('#re-save5').addEventListener('click',(e)=>{reNum = 5;Store.addResources(reNum)})
document.querySelector('#re-save6').addEventListener('click',(e)=>{reNum = 6;Store.addResources(reNum)})

/**
var dice = [
    [1, 2, 1],
    [3, 4, 0],
    [5, 6, 1],
    [2, 10, 0],
  ];
var atCritFail = false;
var atCritSuccess = false;
var atMod = 1;
var critMod = 1;
var damMod = 1;
var critMult = 2;
var critRange = 3;
var attack = Math.floor(Math.random() * 20) + 1;
if (attack == 1) {
    atCritFail = true;
}
if (attack == 20){
    atCritSuccess = true;
}
if (attack > 20 - 3) {
var critConfirm = Math.floor(Math.random() * 20) + 1;
critConfirm = critConfirm + atMod + critMod;
}
attack = attack + atMod;
for (i = 0; i < dice.length; i++) {
    for (j = 0; j < dice[i][0]; j++) {
var damageDie = Math.floor(Math.random() * dice[i][1]) + 1;
}
}

var damage = damageDie + damMod
var crit = damageDie * critMult
var critDam = crit + damMod
*/
class Characters{
    constructor(name, charID){
        this.name = name
        this.charID = charID
    }
}
class Actions{
    constructor(name, actID, atMod, atType, range, critMod, critMult, critRange, damMod, dieNum, dieType, dieList, extra){
        this.name = name
        this.actID = actID
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
    constructor(name, infoID, data){
        this.name = name
        this.infoID = infoID
        this.data = data
    }
}
class Resources{
    constructor(name, resourceID, curVal, maxVal){
        this.name = name
        this.resourceID = resourceID
        this.curVal = curVal
        this.maxVal = maxVal
    }
}

class UI{
    
}

class Store{

}
var dice = [
    [1, 2, 1],
    [3, 4, 0],
    [5, 6, 1],
    [2, 10, 0],
  ];
var atMod = 1
var critMod = 1
var damMod = 1
var critMult = 2
var attack = Math.floor(Math.random() * 20) + 1;
attack = attack + atMod
var critConfirm = Math.floor(Math.random() * 20) + 1;
critConfirm = critConfirm + critMod
for (i = 0; i < dice.length; i++) {
    for (j = 0; j < dice[j][0]; j++) {
var damageDie = Math.floor(Math.random() * dice[j][1]) + 1;
console.log(dice[j][0])

}
}

var damage = damageDie + damMod
var crit = damageDie * critMult
var critDam = crit + damMod
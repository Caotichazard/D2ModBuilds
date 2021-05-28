var AllModsList;

$.getJSON("./mod_data.json", function(json) {
    
    AllModsList = json
    
    
    renderAll()
    
    
    
});

function renderAll(){
    renderArmor("titan","helmet",current_build["armor"]["helmet"]["affinity"],AllModsList)
    renderArmor("titan","arms",current_build["armor"]["arms"]["affinity"],AllModsList)
    renderArmor("titan","chest",current_build["armor"]["chest"]["affinity"],AllModsList)
    renderArmor("titan","leg",current_build["armor"]["leg"]["affinity"],AllModsList)
    renderArmor("titan","class",current_build["armor"]["class"]["affinity"],AllModsList)

    
    makeStuffHoverable("helmet")
    makeStuffHoverable("arms")
    makeStuffHoverable("chest")
    makeStuffHoverable("leg")
    makeStuffHoverable("class")
}

function rerenderAll(){
    rerenderArmor("titan","helmet")
    rerenderArmor("titan","arms")
    rerenderArmor("titan","chest")
    rerenderArmor("titan","leg")
    rerenderArmor("titan","class")
}

function rerenderArmor(char,armor){
    teste = document.getElementById(armor);
    
    teste.innerHTML = createArmor(char,armor,current_build["armor"][armor]["affinity"],AllModsList)
    makeStuffHoverable(armor)
    
}

function makeStuffHoverable(armor){
    makeModHoverable(armor,"general")
    makeModHoverable(armor,"armor1")
    makeModHoverable(armor,"armor2")
    makeModHoverable(armor,"combat")
    makeModHoverable(armor,"activities")

    makeAffinityHoverable(armor)
}
function renderArmor(char,armor,affinity,allMods){
    teste = document.getElementById("teste");
    affinty = current_build["armor"][armor]["affinity"]
    teste.innerHTML += createArmor(char,armor,affinity,allMods)
    
    
}



function createArmor(char,armor,affinity,allMods){
    
    outputString ='<div id="'+armor+'">'
    //imagem da armadura
    outputString += createArmorImage(char,armor)
    outputString += '<br>'
    //barra de energia
    outputString += createEnergyBar(armor)
    outputString += '<br>'
    //affinidade e seletor
    outputString += createAffinityInfo(armor)

    outputString += createModSelectedSection(armor)
    outputString += createModListSection(armor,affinity,allMods)
    outputString += '</div>'
    
    
    //mods e seletor

    return outputString
}

function createArmorImage(char,armor){
    outputString = ''
    outputString += '<div class="armor-image">'
    outputString += '<img src="https://www.bungie.net/common/destiny2_content/icons/898624eb5964b7456a03bfa70467fe2d.jpg" alt="titan-helmet">'
    outputString += '</div>'

    return outputString
}

function createEnergyBar(armor){
    outputString = ''

    outputString += '<div class="energy-bar" id="'+armor+'-energy-bar">'
    energy_used = current_build["armor"][armor]["energy"]
    for (i = 0; i < 10; i++) {
        outputString +='<div class="energy-unit '
        if(i < energy_used){
            outputString += 'full'
        }else{
            outputString += 'empty'
        }
        outputString += '" id="'+armor+'-energy-'+(i+1).toString()+'"></div>'
    }
    
    
    
    outputString +='</div>'

    return outputString
}

function createAffinityInfo(armor){
    affinities = {
        "solar" : 'https://www.bungie.net/common/destiny2_content/icons/ea89705796a93504412e041c1b5931c0.png',
        "arc" : 'https://www.bungie.net/common/destiny2_content/icons/91fe40e7d2ed2edbce42aa0b1917fd73.png',
        "void" : 'https://www.bungie.net/common/destiny2_content/icons/d0b6369c27cea3a71f059665ba397720.png'
    }

    
    outputString = ''

    outputString += '<div class="affinity-info">'
    outputString +=  '<div class="affinity-selected">'
    outputString +=  '<div id="'+armor+'-affinity-selected">'
    outputString +=   '<div class="affinty-socket">'
    outputString +=   '<img src="'+affinities[getAffinityFromBuild(armor)]+'" alt="affinity">'
    outputString +=    '</div>'
    outputString +=   '</div>'
    outputString +=  '</div>'

    outputString += '<div id="'+armor+'-affinity-list" class="affinity-list">'
    for (const [key, mod] of Object.entries(affinities)) {
        //console.log(key, value);
        outputString += '<div class="affinty-socket" onclick="setAffinityToBuild(\''+armor+'\',\''+key+'\')">'
        
            
        
        outputString += '<img src="'+mod+'" alt="affinity">'
        outputString += '</div>'
        
    }
    outputString += '</div>'
                
            
    outputString +=      '</div>'

    return outputString
}

function createModSelectedSection(armor){
    outputString = ''

    outputString += '<div class="sloted-mods">'
    outputString += '<div class="sloted-mod" id="'+armor+'-mod-general-selected">'
    outputString += createModSocket(getModFromBuild(armor,'general'))
    outputString +='</div>'

    outputString += '<div class="sloted-mod" id="'+armor+'-mod-armor1-selected">'
    outputString += createModSocket(getModFromBuild(armor,'armor1'))
    outputString += '</div>'

    outputString += '<div class="sloted-mod" id="'+armor+'-mod-armor2-selected">'
    outputString += createModSocket(getModFromBuild(armor,'armor2'))
    outputString +='</div>'

    outputString +='<div class="sloted-mod" id="'+armor+'-mod-combat-selected">'
    outputString += createModSocket(getModFromBuild(armor,'combat'))
    outputString +='</div>'

    outputString +='<div class="sloted-mod" id="'+armor+'-mod-activities-selected">'
    outputString += createModSocket(getModFromBuild(armor,'activities'))
    outputString +='</div>'

    outputString +='</div>'

    return outputString
}

function createModListSection(armor,affinity,allMods){
    outputString = ''
    outputString += '<div class="mod-lists">'
    outputString +='<div id="'+armor+'-mod-general-list" class="mod-list">'
    outputString += createModSelector(armor,"general",affinity,allMods)
    outputString +='</div>'

    outputString +='<div id="'+armor+'-mod-armor1-list" class="mod-list">'
    outputString += createModSelector(armor,"armor1",affinity,allMods)
    outputString +='</div>'
    outputString +='<div id="'+armor+'-mod-armor2-list" class="mod-list">'
    outputString += createModSelector(armor,"armor2",affinity,allMods)
    outputString +='</div>'
    outputString +='<div id="'+armor+'-mod-combat-list" class="mod-list">'
    outputString += createModSelector(armor,"combat",affinity,allMods)
    outputString +='</div>'
    outputString +='<div id="'+armor+'-mod-activities-list" class="mod-list">'
    outputString += createModSelector(armor,"activities",affinity,allMods)
    outputString +='</div>'
    outputString +='</div>'
    
    
    return outputString
}



function createModSelector(armor,slot,affinity,allMods){
    modList = fillModList(armor,slot,affinity,allMods)
    return createModList(armor,slot,modList)
    
}


// Fills the html element with the visual representation of all mods
function createModList(armor,slot,modsList){
    //var mod_list = document.getElementById(armor+"-mod-"+slot+"-list");
    
    modInfoForEquip = {
        'armor':armor,
        'slot':slot,
        'hash': 0,
    }
    outputString = ''

    for (const [key, mod] of Object.entries(modsList)) {
        //console.log(key, value);
        modInfoForEquip['hash'] = key
        outputString += createModSocket(mod,modInfoForEquip)
        
    }
    return outputString
}



//Funtion that returns a list of all the mods corresponding to the armor slot and affinity
function fillModList(armor,slot,affinity,allMods){
    modList = {}
    if(slot == "armor1" || slot == "armor2"){
        Object.assign(modList,getModsWithAffinity(getModsFromCategory(allMods,armor),"no"),getModsWithAffinity(getModsFromCategory(allMods,armor),affinity))
    }else{
        Object.assign(modList,getModsWithAffinity(getModsFromCategory(allMods,slot),"no"),getModsWithAffinity(getModsFromCategory(allMods,slot),affinity))
    }
    return modList
}

//Returns mod from given category
function getModsFromCategory(modsList,category){
    return modsList[category]
}

//Returns mods with the given affinty
function getModsWithAffinity(modsList,affinity){
    modsToReturn = {}
    for (const [hash, mod] of Object.entries(modsList)) {
        if(mod["investment"]["affinity"] == affinity){
            modsToReturn[hash] = mod
        }
    }
    return modsToReturn
}

//When the document is loaded this function runs

$(document).ready(function(){
    
    makeModHoverable("helmet","general")
    makeModHoverable("helmet","armor1")
    makeModHoverable("helmet","armor2")
    makeModHoverable("helmet","combat")
    makeModHoverable("helmet","activities")

    makeModHoverable("arms","general")
    makeModHoverable("arms","armor1")
    makeModHoverable("arms","armor2")
    makeModHoverable("arms","combat")
    makeModHoverable("arms","activities")

    makeAffinityHoverable("helmet")
});


//Gives the onHover funtion to MOD elements that need it
function makeModHoverable(armor,slot){
    //Makes when hovering a mod socket the corresponding list shows
    $("#"+armor+"-mod-"+slot+"-selected").hover(function(){
        $("#"+armor+"-mod-"+slot+"-list").css({
            "display" : 'inline-grid', 
            
        });
        $("#"+armor+"-mod-"+slot+"-selected").css({
            'background-color' : 'hsla(0, 0%, 0%, 0.5)'
        });
        
        }, function(){
        $("#"+armor+"-mod-"+slot+"-list").css({
            "display" : 'none', 
            
        });
        $("#"+armor+"-mod-"+slot+"-selected").css({
            'background-color' : 'hsla(0, 0%, 0%, 0)'
        });
        
    });
    
    
    //When the list is shown, if hovered over, wont disapear
    $("#"+armor+"-mod-"+slot+"-list").hover(function(){
        $("#"+armor+"-mod-"+slot+"-list").css("display", "inline-grid");
        $("#"+armor+"-mod-"+slot+"-selected").css({
            'background-color' : 'hsla(0, 0%, 0%, 0.5)'
        });
        
        }, function(){
        $("#"+armor+"-mod-"+slot+"-list").css("display", "none");
        $("#"+armor+"-mod-"+slot+"-selected").css({
            'background-color' : 'hsla(0, 0%, 0%, 0)'
        });
        
    });
}

function makeAffinityHoverable(armor){
//Makes when hovering a mod socket the corresponding list shows
    $("#"+armor+"-affinity-selected").hover(
        function(){
        $("#"+armor+"-affinity-list").css("display", "inline-grid");
        }, 
        function(){
        $("#"+armor+"-affinity-list").css("display", "none");
        }
    );

    //When the list is shown, if hovered over, wont disapear
    $("#"+armor+"-affinity-list").hover(function(){
        $("#"+armor+"-affinity-list").css("display", "inline-grid");
        }, function(){
        $("#"+armor+"-affinity-list").css("display", "none");
    });
}


//Recieves data for a Single Mod and returns its socket (little image no text)
function createModSocket(modData,modInfoForEquip){
    outputString = ''
    outputString += '<div class="mod-socket"'
    if(modInfoForEquip != null){
        //console.log(modInfoForEquip)
        outputString += 'onclick="setModToBuild(\''+modInfoForEquip['armor']+'\',\''+modInfoForEquip['slot']+'\','+modInfoForEquip['hash']+')"'
    }
    outputString += '>'
    outputString +=     '<img class="mod-socket-img" src="https://www.bungie.net'+modData["icon"]+'" alt="mod">'
    if(modData["investment"]["cost"] != -1){
        outputString +=     '<img class="mod-socket-img" src="imgs/mods/costs/mod_cost_'+modData["investment"]["cost"].toString()+'.png" alt="cost">'
        outputString +=     '<img class="mod-socket-img" src="imgs/mods/affinities/'+modData["investment"]["affinity"]+'_affinity.png" alt="affinity">'
    }
    
    outputString += createModCard(modData)
    outputString += '</div>'

    return outputString
}

//Recieve data for a single mod and returns its card (Text and Image for Description)
function createModCard(modData){
    outputString = ''
    outputString += '<div class="mod-card">'
    outputString +=    '<div class="mod-header">'
    outputString +=        '<span class="mod-name">'+ modData["name"] + '</span>'
    outputString +=        '<span class="mod-type">'+modData["type"]+'</span>'
    outputString +=    '</div>'
    outputString +=    '<div class="mod-body">'
    if(modData["tooltip"]){
        outputString +=        '<span>'+modData["tooltip"]+'</span>'
    }
    outputString +=        '<div class="mod-perks">'
    for (const [key, perk] of Object.entries(modData["perks"])) {
        outputString +=            '<div class="mod-perk">'
        outputString +=                '<img src="https://www.bungie.net/'+perk["icon"]+'" alt="mod">'
        outputString +=                '<div class="mod-perk-description">'
        outputString +=                    '<span class="mod-perk-name">'+perk["name"]+'</span>'
        outputString +=                   '<span>'+ perk["description"] +'</span>'
        outputString +=                '</div>'
        outputString +=            '</div>'
    }
    
    

    outputString +=        '</div>'
    outputString +=    '</div>'
    outputString += '</div>'

    return outputString
}




var current_build = {
    'armor': {
        'helmet' : {
            'energy' : 0,
            'affinity' : 'void',
            'general' : 0,
            'armor1' : 0,
            'armor2' : 0,
            'combat' : 0,
            'activities' : 0,
        },
        'arms' : {
            'energy' : 0,
            'affinity' : 'solar',
            'general' : 0,
            'armor1' : 0,
            'armor2' : 0,
            'combat' : 0,
            'activities' : 0,
        },
        'chest' : {
            'energy' : 0,
            'affinity' : 'solar',
            'general' : 0,
            'armor1' : 0,
            'armor2' : 0,
            'combat' : 0,
            'activities' : 0,
        },
        'leg' : {
            'energy' : 0,
            'affinity' : 'solar',
            'general' : 0,
            'armor1' : 0,
            'armor2' : 0,
            'combat' : 0,
            'activities' : 0,
        },
        'class' : {
            'energy' : 0,
            'affinity' : 'solar',
            'general' : 0,
            'armor1' : 0,
            'armor2' : 0,
            'combat' : 0,
            'activities' : 0,
        },
    }
}

function getModFromBuild(armor,slot){
    modHash = current_build["armor"][armor][slot]
    var modToReturn
    if(slot == "armor1" || slot == "armor2"){
        modToReturn = AllModsList[armor][modHash]
    }else{
        modToReturn = AllModsList[slot][modHash]
    }

    return modToReturn
}

function getAffinityFromBuild(armor){
    return current_build["armor"][armor]['affinity']
}

function setModToBuild(armor,slot,modHash){
    //console.log("EQUIPO" + mod)
    var newMod
    var curMod
    if(slot == "armor1" || slot == "armor2"){
        newMod = AllModsList[armor][modHash]
        curMod = AllModsList[armor][current_build["armor"][armor][slot]]
    }else{
        newMod = AllModsList[slot][modHash]
        curMod = AllModsList[slot][current_build["armor"][armor][slot]]
    }
    canSlot = false

    if(checkModCompatible(armor,newMod)){
        if(checkEnergyToSlot(armor,curMod,newMod)){
            canSlot = true
        }
    }
    if(canSlot){
        current_build["armor"][armor][slot] =  modHash
        current_build["armor"][armor]["energy"] += newMod["investment"]["cost"] - curMod["investment"]["cost"]
        console.log("Si")
    }
    
    rerenderArmor("titan",armor)
}

function checkModCompatible(armor,mod){
    if(mod["investment"]["affinity"] == 'no' || mod["investment"]["affinity"] == current_build["armor"][armor]['affinity']){
        return true
    }
    return false
}

function checkEnergyToSlot(armor,curMod,newMod){
    console.log(current_build["armor"][armor]["energy"] - curMod["investment"]["cost"] + newMod["investment"]["cost"])
    if(current_build["armor"][armor]["energy"] - curMod["investment"]["cost"] + newMod["investment"]["cost"] <= 10){
        return true
    }
    return false
}


function setAffinityToBuild(armor,affinity){
    current_build["armor"][armor]['affinity'] = affinity

    current_build["armor"][armor]['energy'] = 0    
    current_build["armor"][armor]['general'] = 0
    current_build["armor"][armor]['armor1'] = 0
    current_build["armor"][armor]['armor2'] = 0
    current_build["armor"][armor]['combat'] = 0
    current_build["armor"][armor]['activities'] = 0

    rerenderArmor('titan',armor)
}

armor_enum = {
    'helmet': '0',
    'arms': '1',
    'chest': '2',
    'leg': '3',
    'class': '4',
}
armor_enum_2 = {
     '0':'helmet',
     '1': 'arms',
     '2':'chest',
     '3':'leg' ,
     '4':'class' ,
}

affinity_enum = {
    'arc':'0',
    'solar':'1',
    'void':'2',
}

affinity_enum_2 = {
    '0':'arc',
    '1':'solar',
    '2':'void',
}

function ExportBuild(){
    buildString = BuildToString()
    input_line = document.getElementById("build-string");
    input_line.value = buildString
}

function ImportBuild(){
    console.log("A")
    input_line = document.getElementById("build-string");
    buildString = input_line.value
    StringToBuild(buildString)
}
function BuildToString(){
    outputString = ''

    for(const [part,content] of Object.entries(current_build)){
        slot_counter = 0
        for(const [armor,slots] of Object.entries(content)){
            outputString += armor_enum[armor]
            outputString += '/'

            outputString += affinity_enum[slots["affinity"]]
            outputString += '/'
            outputString += slots["energy"]
            outputString += '/'
            outputString += slots["general"]
            outputString += '/'
            outputString += slots["armor1"]
            outputString += '/'
            outputString += slots["armor2"]
            outputString += '/'
            outputString += slots["combat"]
            outputString += '/'
            outputString += slots["activities"]
            
            
            if(slot_counter < 4){
                outputString += '|'
            }
            slot_counter+= 1
        }
    }
    
    return lzw_encode(outputString)
    
}

function StringToBuild(string){
    decoded_string = lzw_decode(string)
    
    splited_strings = decoded_string.split('|')
    splited_strings.forEach(function(armor){
        slots_splited = armor.split('/')
        
        current_build["armor"][armor_enum_2[slots_splited[0]]]["affinity"] = affinity_enum_2[slots_splited[1]]
        current_build["armor"][armor_enum_2[slots_splited[0]]]["energy"] = parseInt(slots_splited[2])
        current_build["armor"][armor_enum_2[slots_splited[0]]]["general"] = parseInt(slots_splited[3])
        current_build["armor"][armor_enum_2[slots_splited[0]]]["armor1"] = parseInt(slots_splited[4])
        current_build["armor"][armor_enum_2[slots_splited[0]]]["armor2"] = parseInt(slots_splited[5])
        current_build["armor"][armor_enum_2[slots_splited[0]]]["combat"] = parseInt(slots_splited[6])
        current_build["armor"][armor_enum_2[slots_splited[0]]]["activities"] = parseInt(slots_splited[7])
      });

      rerenderAll()
      
}
// LZW-compress a string
function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}
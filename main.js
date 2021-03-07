
var default_build = {
    ".helmet": {
        ".affinity": 1,
        ".general": 0,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 0,
        ".armor-2": 0,
        "total_energy": 0
    },
    ".gauntlet": {
        ".affinity": 1,
        ".general": 0,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 0,
        ".armor-2": 0,
        "total_energy": 0
    },
    ".chest":{
        ".affinity": 1,
        ".general": 0,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 0,
        ".armor-2": 0,
        "total_energy": 0
    },
    ".boots":{
        ".affinity": 1,
        ".general": 0,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 0,
        ".armor-2": 0,
        "total_energy": 0
    },
    ".class":{
        ".affinity": 1,
        ".general": 0,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 0,
        ".armor-2": 0,
        "total_energy": 0
    }
}
var error_messages = {
    ".helmet": {
        "message": '' 
    },
    ".gauntlet": {
        "message": '' 
    },
    ".chest":{
        "message": '' 
    },
    ".boots":{
        "message": '' 
    },
    ".class":{
        "message": '' 
    }
}

var current_build
var test_build ={
    ".helmet": {
        ".affinity": 0,
        ".general": 0,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 0,
        ".armor-2": 0,
        "total_energy": 0
    },
    ".gauntlet": {
        ".affinity": 0,
        ".general": 0,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 0,
        ".armor-2": 0,
        "total_energy": 0
    },
    ".chest":{
        ".affinity": 1,
        ".general": 1,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 2,
        ".armor-2": 2,
        "total_energy": 0
    },
    ".boots":{
        ".affinity": 0,
        ".general": 0,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 0,
        ".armor-2": 0,
        "total_energy": 0
    },
    ".class":{
        ".affinity": 0,
        ".general": 0,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 0,
        ".armor-2": 0,
        "total_energy": 0
    }
}

$(document).ready(function(){
    
    
    current_build = readBuild()
    
    current_build = checkBuild(test_build)
    
    loadSelectors(current_build)
    loadBuild(current_build)

  });

/**
 * 
 * @param {String} possible_build 
 * @returns build object, default_build if invalid or null string, else returns the possible_build from the string
 */
function readBuild(possible_build=null){
    if(possible_build==null){
        return default_build
    }else{
        return default_build
    }
}
/**
 * 
 * @param {build} tmp_build 
 * @returns returns a valid build
 */
function checkBuild(tmp_build){
    var armor_pieces = [".helmet",".gauntlet",".chest",".boots",".class"]
    var mod_slots = [".general",".combat",".activity",".armor-1",".armor-2"]

    var hadError = false
    armor_pieces.forEach(function(armor){
        
        if(tmp_build[armor][".affinity"] > 3 || tmp_build[armor][".affinity"] < 1){
            tmp_build[armor] = default_build[armor]
        }else{
            var slot_total_energy = 0
            var costly_mod_slot
            var costly_mod_cost = 0
            var cur_mod
            mod_slots.forEach(function(slot){
                if(slot == ".armor-1" || slot==".armor-2"){
                    if(tmp_build[armor][slot] > all_mods[slot][armor].length ||tmp_build[armor][slot] < 0){
                        tmp_build[armor][slot] = 0
                    }
                    cur_mod = all_mods[slot][armor][tmp_build[armor][slot]]
                }else{
                    if(tmp_build[armor][slot] > all_mods[slot].length ||tmp_build[armor][slot] < 0){
                        tmp_build[armor][slot] = 0
                    }
                    cur_mod = all_mods[slot][tmp_build[armor][slot]]
                }

                if(isAffinityCompatible(tmp_build[armor][".affinity"],cur_mod["affinity"])){
                    if(cur_mod["cost"] > 0){
                        slot_total_energy += cur_mod["cost"] - 1
                        if(cur_mod["cost"] > costly_mod_cost){
                            costly_mod_slot = slot
                            costly_mod_cost = cur_mod["cost"] - 1
                        }
                    }
                }else{
                    tmp_build[armor][slot] = 0
                }
            })

            if(slot_total_energy > 10){
                tmp_build[armor][costly_mod_slot] = 0
                slot_total_energy -= costly_mod_cost
            }
            tmp_build[armor]["total_energy"] = slot_total_energy
        }
        
    })

    return tmp_build
    
}

function loadBuild(current_build){
    var armor_pieces = [".helmet",".gauntlet",".chest",".boots",".class"]
    var mod_slots = [".general",".combat",".activity",".armor-1",".armor-2"]

    armor_pieces.forEach(function(armor){
        $(armor).children(".selected").each(function(){
            $(this).children(".affinity").each(function(){
                $(this).empty()
                $(this).append(getAffinitySelected(current_build[armor][".affinity"]))
            })
            
        })
        $(armor).children("div").children(".energy_counter").each(function(){
            
            $(this).children().children().children().each(function(){
                $(this).children().addClass("empty").removeClass("full")
            })
            for(let index = 0; index < current_build[armor]["total_energy"]; index++) {
                $(this).children().children().children().children(".u"+index).addClass("full").removeClass("empty")
                
            }
        })

    })

    armor_pieces.forEach(function(armor){
        mod_slots.forEach(function(slot){
        $(armor).children(".selected").each(function(){
                $(this).children(slot).each(function(){
                    $(this).empty()
                    $(this).append(getSelected(current_build[armor][".affinity"],slot,armor,current_build[armor][slot]))
                    
                })
            }) 
        })
    })
}

function loadSelectors(current_build){
    var armor_pieces = [".helmet",".gauntlet",".chest",".boots",".class"]
    var mod_slots = [".general",".combat",".activity",".armor-1",".armor-2"]
    
    armor_pieces.forEach(function(armor){
        $(armor).children(".selectors").each(function(){
            $(this).children(".affinity").each(function(){
                $(this).empty()
                $(this).append(getAffinitySelector())
            })
            
            
        })
    })
    
    armor_pieces.forEach(function(armor){
        mod_slots.forEach(function(slot){
        $(armor).children(".selectors").each(function(){
                $(this).children(slot).each(function(){
                    $(this).empty()
                    $(this).append(getSelector(current_build[armor][".affinity"],slot,armor))
                    console.log("A")
                })
            }) 
        })
    })

    var all_slots = [".affinity",".general",".combat",".activity",".armor-1",".armor-2"]
    armor_pieces.forEach(function(armor){
        all_slots.forEach(function(slot){
            $(armor).children(".selectors").each(function(){
                $(this).children(slot).children().children().each(function(){
                    $(this).click(() =>{
                        var value = $(this).children(".value").html()
                        updateBuild(armor,slot,value)     
                    })
                })
            })
             
        })
    })

    

    armor_pieces.forEach(function(element){
        var arrSlots = [".affinity",".general", ".armor-1", ".armor-2", ".combat", ".activity"]
        arrSlots.forEach(function(slot){
            $(element).children().children(".dropdown"+slot).hover(function(){
                $(element).children().children(".dropdown-content"+slot).css("display", "flex");
                $(".spacer"+element).css("height",$(element).children().children(".dropdown-content"+slot).css("height"))
            }, function(){
                $(element).children().children(".dropdown-content"+slot).css("display", "none");
                $(".spacer"+element).css("height","0")
            });
            $(element).children().children(".dropdown-content"+slot).hover(function(){
                $(element).children().children(".dropdown-content"+slot).css("display", "flex");
                $(".spacer"+element).css("height",$(element).children().children(".dropdown-content"+slot).css("height"))
            }, function(){
                $(element).children().children(".dropdown-content"+slot).css("display", "none");
                $(".spacer"+element).css("height","0")
            });
            
        })
        
    })

    
    
}

function loadData(current_build){
    loadBuild(current_build)
    loadSelectors(current_build)
}

function canChangeSlot(armor,slot,value){
    var tmp_build = current_build
    var nxt_mod,cur_mod

    if(slot == '.affinity'){
        showTooltip("<p>You just changed the affinity </p>")
        return true
    }else{
        if(slot == ".armor-1" ||slot == ".armor-2"){
            cur_mod = all_mods[slot][armor][current_build[armor][slot]]
            nxt_mod = all_mods[slot][armor][value]
        }else{
            cur_mod = all_mods[slot][current_build[armor][slot]]
            nxt_mod = all_mods[slot][value]
        }
        
        if(isAffinityCompatible(tmp_build[armor][".affinity"],nxt_mod["affinity"])){
            if(cur_mod["cost"] > 0){
                
                if(nxt_mod["cost"] > 0){
                    
                    if(tmp_build[armor]["total_energy"] - (cur_mod["cost"] -1) + (nxt_mod["cost"] -1)<= 10){
                        showTooltip(nxt_mod["type"])
                        return true
                    }else{
                        error_messages[armor]["message"] = "Not enough energy"
                        showErrorMsg(armor)
                    }
                }else{
                    showTooltip(nxt_mod["type"])
                    return true
                }
                
            }else{
                if(nxt_mod["cost"] > 0){
                    
                    if(tmp_build[armor]["total_energy"] + (nxt_mod["cost"] -1)<= 10){
                        showTooltip(nxt_mod["type"])
                        return true
                    }else{
                        error_messages[armor]["message"] = "Not enough energy"
                        showErrorMsg(armor)
                    }
                }else{
                    showTooltip(nxt_mod["type"])
                    return true
                }
            }
        }
    }
    
    return false
    
}

function updateBuild(armor,slot,value){
    if(canChangeSlot(armor,slot,value)){
        changeSlot(armor,slot,value)
    }else{
        console.log("num pode")
    }

    loadData(current_build)
}

function changeSlot(armor,slot,value){
    var nxt_mod,cur_mod
    if(slot == '.affinity'){
        var mod_slots = [,".general",".combat",".activity",".armor-1",".armor-2"]
        current_build[armor][slot] = value
        mod_slots.forEach(function(slot){
            current_build[armor][slot] = 0
        })
        current_build[armor]["total_energy"] = 0
        
    }else{
        
        if(slot == ".armor-1" ||slot == ".armor-2"){
            cur_mod = all_mods[slot][armor][current_build[armor][slot]]
            nxt_mod = all_mods[slot][armor][value]
        }else{
            cur_mod = all_mods[slot][current_build[armor][slot]]
            nxt_mod = all_mods[slot][value]
        }

        if(cur_mod["cost"] == 0){
            current_build[armor][slot] = value
            current_build[armor]["total_energy"] += nxt_mod["cost"] -1
        }else{
            if(nxt_mod["cost"] == 0){
                current_build[armor][slot] = value
                current_build[armor]["total_energy"] -= (cur_mod["cost"] -1)
            }else{
                current_build[armor][slot] = value
                current_build[armor]["total_energy"] -= (cur_mod["cost"] -1)
                current_build[armor]["total_energy"] += nxt_mod["cost"] -1
            }
        }
        

    }
}

function showErrorMsg(armor){
    $(".error"+armor).empty()
    $(".error"+armor).append(error_messages[armor]["message"])
}
function showTooltip(type){
    if(type == "None"){

    }else if(type =="Warmind cell"){
        $(".tooltip").append("<p> You need to have a Ikelos or Seventh Seraph weapon to take advantage of this mod</p>") 
    }else if(type == "Charged with light generator"){
        $(".tooltip").append("<p> You need to have a Charged with light consumer mod to take advantage of this mod</p>") 
    }else if(type == "Charged with light consumer"){
        $(".tooltip").append("<p> You need to have a Charged with light generator mod to take advantage of this mod</p>") 
    }else if(type == "Raid"){
        $(".tooltip").append("<p> This mod's effects only take place on the corresponding activity</p>") 
    }
    
}

function isAffinityCompatible(armor_affinity,mod_affinity){
    if(armor_affinity == mod_affinity || mod_affinity == 0){
        return true
    }else{
        return false
    }
}



function getAffinitySelector(){
    var string = ""
    affinities.forEach(function(element, i){
        string+= "<div>"
        string += "<div >" + "<img src='"+element["img"]+ "' alt='element-"+element["name"] + "'>" + "<span hidden class='value'>" +(i+1)+"</span>" + "</div>"
        string += "</div>"
    })
    return string
}

function getSelector(affinity,slot,armor){
    var mod_list
    if(slot == ".armor-1" || slot == ".armor-2"){
        mod_list = all_mods[slot][armor]
    }else{
        mod_list = all_mods[slot]
    }
    console.log(mod_list)
    var string = ""
    mod_list.forEach(function(element,i){
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-tooltip'>"
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +i+"</span>" + "</div>"
            string += "<div class='text mod-tooltip-text'>" + element["name"] +"</div>"
            string += "</div>"
        }
    })
    return string
}


function getAffinitySelected(index){
    var string = ""
    if(index > 3 || index < 1){
        string += "<div >" + "<img src='"+affinities[0]["img"]+ "' alt='element-"+affinities[0]["name"] + "'>" + "<span hidden class='value'>" +1+"</span>" + "</div>"
    }else{
        string += "<div >" + "<img src='"+affinities[index-1]["img"]+ "' alt='element-"+affinities[index-1]["name"] + "'>" + "<span hidden class='value'>" +index+"</span>" + "</div>"
    }
    return string
}

function getSelected(affinity,slot,armor,index){
    var mod_list
    if(slot == ".armor-1" || slot == ".armor-2"){
        mod_list = all_mods[slot][armor]
    }else{
        mod_list = all_mods[slot]
    }
    var string = ""
    if(index < 0 || index > mod_list.length-1){
        string += "<div class='mod-showcase'>" + "<img src='"+mod_list[0]["img"]+ "' alt='general-mod'>"
        string += "<img src='" + mod_affinities[mod_list[0]["affinity"]]["img"] + "' alt='mod-affinity'>"
        string += "<img src='" + mod_costs[mod_list[0]["cost"]]["img"] + "' alt='mod-cost'>"
        string += "<span hidden class='value'>" +0+"</span>" + "</div>"
    }else{
        element = mod_list[index]
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='general-mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +index+"</span>" + "</div>"
        }else {
            string += "<div class='mod-showcase'>" + "<img src='"+mod_list[0]["img"]+ "' alt='general-mod'>"
            string += "<img src='" + mod_affinities[mod_list[0]["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[mod_list[0]["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +0+"</span>" + "</div>"
        }
    }
    
    return string
}


var mod_affinities = [
    {
        "name": "No Affinity",
        "img": "imgs/mods/affinities/no_affinity.png"
    },
    {
        "name": "Arc Affinity",
        "img": "imgs/mods/affinities/arc_affinity.png"
    },
    {
        "name": "Solar Affinity",
        "img": "imgs/mods/affinities/solar_affinity.png"
    },
    {
        "name": "Void Affinity",
        "img": "imgs/mods/affinities/void_affinity.png"
    }
]

var mod_costs = [
    {
        "name": "no cost",
        "img": "imgs/mods/affinities/no_affinity.png"
    },
    {
        "name": "0 cost",
        "img": "imgs/mods/costs/mod_cost_0.png"
    },{
        "name": "1 cost",
        "img": "imgs/mods/costs/mod_cost_1.png"
    },{
        "name": "2 cost",
        "img": "imgs/mods/costs/mod_cost_2.png"
    },{
        "name": "3 cost",
        "img": "imgs/mods/costs/mod_cost_3.png"
    },{
        "name": "4 cost",
        "img": "imgs/mods/costs/mod_cost_4.png"
    },{
        "name": "5 cost",
        "img": "imgs/mods/costs/mod_cost_5.png"
    },{
        "name": "6 cost",
        "img": "imgs/mods/costs/mod_cost_6.png"
    },{
        "name": "7 cost",
        "img": "imgs/mods/costs/mod_cost_7.png"
    },{
        "name": "8 cost",
        "img": "imgs/mods/costs/mod_cost_8.png"
    },{
        "name": "9 cost",
        "img": "imgs/mods/costs/mod_cost_9.png"
    },
]

var affinities = [
    {
        "name": "arc",
        "img": "https://www.bungie.net/common/destiny2_content/icons/91fe40e7d2ed2edbce42aa0b1917fd73.png"
    },
    {
        "name": "solar",
        "img": "https://www.bungie.net/common/destiny2_content/icons/ea89705796a93504412e041c1b5931c0.png"
    },
    
    {
        "name":"void",
        "img": "https://www.bungie.net/common/destiny2_content/icons/d0b6369c27cea3a71f059665ba397720.png"
    }
]

var general_mods = [
    {
        "name": "Empty General Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/3a1e41ae2e2cbe33611481665f7d0378.png",
        "affinity": 0,
        "cost": 0,
        "type": "None"
    },
    {
        "name":"Intellect Mod",
        "img": "https://bungie.net/common/destiny2_content/icons/9fd56c3b42923c9df23edf585b0107bf.png",
        "affinity": 0,
        "cost": 5+1,
        "type": "None"

    },
    {
        "name": "Minor Intellect Mod",
        "img":"https://bungie.net/common/destiny2_content/icons/d8da60458e3355ddf7123be5ffe3dc3c.png",
        "affinity": 0,
        "cost": 2+1,
        "type": "None"
    },
    {
        "name":"Discipline Mod",
        "img": "https://bungie.net/common/destiny2_content/icons/9d54e2149f945b2c298020da443b70fa.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "None"

    },
    {
        "name": "Minor Discipline Mod",
        "img":"https://bungie.net/common/destiny2_content/icons/8fa2d4e4c82586668210e12c5115575a.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "None"
    },
    {
        "name":"Strength Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/07f2361532c79e773909220e5884ab07.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "None"

    },
    {
        "name": "Minor Strength Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/ec0b298ec4dac0023604e467a58c3868.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "None"
    }
]



var combat_mods = [
    {
        "name": "Empty Combat Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/53fa0b010b6b5e4b6bf9b8367d2980e0.png",
        "affinity": 0,
        "cost": 0,
        "type": "None"

    },
    {
        "name": "Rage of the Warmind",
        "img": "https://bungie.net/common/destiny2_content/icons/41e2c3607cef7cc665417dde5172ea32.png",
        "affinity": 2,
        "cost": 5+1,
        "type": "Warmind cell mod"
    },
    {
        "name": "Reactive Pulse",
        "img": "https://www.bungie.net/common/destiny2_content/icons/19fc1544595d371c631855656c9f31b7.png",
        "affinity": 1,
        "cost": 3+1,
        "type": "Charged with light consumer"
    },
    {
        "name": "Charge Harvester",
        "img": "https://bungie.net/common/destiny2_content/icons/a8acc2b6cf36527f879051a38622e310.png",
        "affinity": 3,
        "cost": 3+1,
        "type": "Charged with light generator"
    },
    {
        "name": "Global Reach",
        "img": "https://www.bungie.net/common/destiny2_content/icons/9106c7e977dc578319d636c9566047de.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "Warmind cell"
    }
]

var activity_mods = [
    {
        "name": "Empty Activity Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/aa09438250638a654652801673cce7d8.png",
        "affinity": 0,
        "cost": 0,
        "type": "Raid"
    },
    {
        "name": "Scanner Augment",
        "img": "https://www.bungie.net/common/destiny2_content/icons/e01f849d196fa1d63cfc95dede616038.png",
        "affinity": 1,
        "cost": 1+1,
        "type": "Raid"
    },
    {
        "name": "Supressor Augment",
        "img": "https://bungie.net/common/destiny2_content/icons/3da4be3a2c3609aafbee3655e902c0b2.png",
        "affinity": 3,
        "cost": 1+1,
        "type": "Raid"
    },
    {
        "name":"Operator Augment",
        "img": "https://bungie.net/common/destiny2_content/icons/24a82ebb135726111e3c99073871cdaa.png",
        "affinity": 2,
        "cost": 1+1,
        "type": "Raid"
    },
    {
        "name": "Herd Thinner",
        "img": "https://bungie.net/common/destiny2_content/icons/68e54e0d7beab4eaa228a522c85a6d60.png",
        "affinity": 0,
        "cost": 2+1,
        "type": "Raid"
    }
]



var helmet_mods = [
    {
        "name": "Empty Helmet Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/d89699e6307ac5d2a306cf054978e251.png",
        "affinity": 0,
        "cost": 0,
        "type": "None"
    },
    {
        "name":"Sidearm Ammo Finder",
        "img":"https://www.bungie.net/common/destiny2_content/icons/c1ae38920a60c4e8f393d44761972169.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "None"
    },
    {
        "name":"Shotgun Ammo Finder",
        "img":"https://www.bungie.net/common/destiny2_content/icons/5ab48ede85a6972d2c0b1f4bc5bcb640.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "None"
    },
    {
        "name":"Bow Targeting",
        "img":"https://www.bungie.net/common/destiny2_content/icons/a5121e051f0aeaa9eb39c90652ae68c6.png",
        "affinity": 0,
        "cost": 4+1,
        "type": "None"
    },
    {
        "name":"Submachine Gun Targeting",
        "img":"https://www.bungie.net/common/destiny2_content/icons/73c7b20dacf59b2e2bb460184f22c11d.png",
        "affinity": 0,
        "cost": 2+1,
        "type": "None"
    },
    {
        "name": "Hands-On",
        "img": "https://www.bungie.net/common/destiny2_content/icons/f47540dc70a9aad624a8936c7e82fcbd.png",
        "affinity": 1,
        "cost": 3+1,
        "type": "None"
    }
]

var gauntlet_mods = [
    {
        "name": "Empty Gauntlet Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/18bb744532b78a20164f150c770c5f89.png",
        "affinity": 0,
        "cost": 0,
        "type": "None"
    },
    {
        "name":"submachine gun loader",
        "img": "https://bungie.net/common/destiny2_content/icons/0cf177981705d5633f9ace696c4d9f39.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "None"
    },
    {
        "name": "Impact Induction",
        "img": "https://www.bungie.net/common/destiny2_content/icons/e00ae3014d71f672690e493cb814e9bf.png",
        "affinity": 2,
        "cost": 3+1,
        "type": "None"
    }

]

var chest_mods = [
    {
        "name": "Empty Chest Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/6bf61607ffa8198cdabdf0fa3b5feab1.png",
        "affinity": 0,
        "cost": 0,
        "type": "None"
    },
    {
        "name": "Void Resistance",
        "img": "https://bungie.net/common/destiny2_content/icons/5a3cc0bd1709b28147ec5fbc497360f8.png",
        "affinity": 3,
        "cost": 1+1,
        "type": "None"
    },
    {
        "name": "Sniper Rifle Reserves",
        "img": "https://www.bungie.net/common/destiny2_content/icons/8700b5f6f2a832d513f81746d796f439.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "None"
    }
]

var boots_mods = [
    {
        "name": "Empty Boots Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/c4b573f9dd4892f6eb3bfb9b194170d0.png",
        "affinity": 0,
        "cost": 0,
        "type": "None"
    },
    {
        "name": "Recuperation",
        "img": "https://www.bungie.net/common/destiny2_content/icons/ca8ea4c398dbf809bcec8a24b1c37180.png",
        "affinity": 2,
        "cost": 1+1,
        "type": "None"
    },
    {
        "name": "Auto Rifle Scavenger",
        "img": "https://bungie.net/common/destiny2_content/icons/5a8063288c58c6d329cd66fffde4e350.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "None"
    }
]

var class_mods = [
    {
        "name": "Empty Class Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/3cfff0f2aa68784762f553eb7997e909.png",
        "affinity": 0,
        "cost": 0,
        "type": "None"
    },
    {
        "name": "Perpetuation",
        "img": "https://bungie.net/common/destiny2_content/icons/2d61f6d5e5199a84189227d392105e3d.png",
        "affinity": 3,
        "cost": 2+1,
        "type": "None"
    },
    {
        "name": "Distribution",
        "img": "https://bungie.net/common/destiny2_content/icons/a116725dc6ebe6a35866ecc7c681cef4.png",
        "affinity": 0,
        "cost": 4+1,
        "type": "None"
    }

]

var armor_mods = {
    ".helmet": helmet_mods,
    ".gauntlet": gauntlet_mods,
    ".chest": chest_mods,
    ".boots": boots_mods,
    ".class": class_mods
}

var all_mods = {
    ".general": general_mods,
    ".armor-1": armor_mods,
    ".armor-2": armor_mods,
    ".combat": combat_mods,
    ".activity": activity_mods
}
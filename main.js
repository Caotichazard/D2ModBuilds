
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

function resetBuild(){
    var armor_pieces = [".helmet",".gauntlet",".chest",".boots",".class"]
    var mod_slots = [".general",".combat",".activity",".armor-1",".armor-2"]
    armor_pieces.forEach(function(armor){
        current_build[armor][".affinity"] = 1
        mod_slots.forEach(function(slot){
            current_build[armor][slot] = 0
        })
        current_build[armor]["total_energy"] = 0
    })
    loadData(current_build)
}

function loadData(current_build){
    loadBuild(current_build)
    loadSelectors(current_build)
}

function buildToString(){
    var armor_pieces = [".helmet",".gauntlet",".chest",".boots",".class"]
    var mod_slots = [".affinity",".general",".combat",".activity",".armor-1",".armor-2"]

    var string = ""
    armor_pieces.forEach(function(armor){
        string += armor
        mod_slots.forEach(function(slot){
            string += "," + current_build[armor][slot]
        })
        string += "|"
    })
    input = document.getElementById("build-string")
    input.value = string
    console.log(string)
}

function stringToBuild(string){
    var armor_pieces = [".helmet",".gauntlet",".chest",".boots",".class"]
    var mod_slots = [".affinity",".general",".combat",".activity",".armor-1",".armor-2"]
    console.log(default_build)
    var tmp_build = default_build
    console.log(tmp_build)
    var armor_import = string.split("|")
    var slot_import = []
    armor_import.forEach(function(tmp,i){
        if(i < 5){
            slot_import.push(tmp.split(','))
        }
        
    })

    slot_import.forEach(function(tmp){
        mod_slots.forEach(function(slot,i){
            console.log(tmp_build[tmp[0]][slot])
            tmp_build[tmp[0]][slot] = tmp[i+1]
        })
    })
  
    console.log(tmp_build)
    return tmp_build
}

function importBuild(){
    input = document.getElementById("build-string")
    string = input.value
    var tmp_build,tmp_build2
    tmp_build = stringToBuild(string)
    tmp_build2 = checkBuild(tmp_build)
    loadData(tmp_build2)
    console.log(tmp_build,tmp_build2)
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
    /*
    if(type =="Warmind cell"){
        $(".tooltip").append("<p> You need to have a Ikelos or Seventh Seraph weapon to take advantage of this mod</p>") 
    }else if(type == "Charged with light generator"){
        $(".tooltip").append("<p> You need to have a Charged with light consumer mod to take advantage of this mod</p>") 
    }else if(type == "Charged with light consumer"){
        $(".tooltip").append("<p> You need to have a Charged with light generator mod to take advantage of this mod</p>") 
    }else if(type == "Raid"){
        $(".tooltip").append("<p> This mod's effects only take place on the corresponding activity</p>") 
    }
    */
    
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
    
    var string = ""
    mod_list.forEach(function(element,i){
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-tooltip'>"
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +i+"</span>" + "</div>"
            string += "<div class='text mod-tooltip-text'>" 
            string += "<div class='mod-header'> <span class='name'>" + element["name"] + "</span><span class='type'>" + element["type"] + "</span></div>"
            if(element["description"].length > 0){
                string += "<div class='mod-body'>" 
                element["description"].forEach(function(description){
                    string += "<span>" + description + "</span>" + "<br>"
                })
                string +=  "</div>"
            }
            string += "</div>"
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
            string += "<div class='mod-tooltip'>"
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='general-mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +index+"</span>" + "</div>"
            string += "<div class='text mod-tooltip-text mod-tooltip-upper'>" 
            string += "<div class='mod-header'> <span class='name'>" + element["name"] + "</span><span class='type'>" + element["type"] + "</span></div>"
            if(element["description"].length > 0){
                string += "<div class='mod-body'>" 
                element["description"].forEach(function(description){
                    string += "<span>" + description + "</span>" + "<br>"
                })
                string +=  "</div>"
            }
            string += "</div>"
            string += "</div>"
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
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name":"Intellect Mod",
        "img": "https://bungie.net/common/destiny2_content/icons/9fd56c3b42923c9df23edf585b0107bf.png",
        "affinity": 0,
        "cost": 5+1,
        "type": "General Armor Mod",
        "description": [
            "+10 Intellect"
        ],

    },
    {
        "name": "Minor Intellect Mod",
        "img":"https://bungie.net/common/destiny2_content/icons/d8da60458e3355ddf7123be5ffe3dc3c.png",
        "affinity": 0,
        "cost": 2+1,
        "type": "General Armor Mod",
        "description": [
            "+5 Intellect"
        ],
    },
    {
        "name":"Discipline Mod",
        "img": "https://bungie.net/common/destiny2_content/icons/9d54e2149f945b2c298020da443b70fa.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "General Armor Mod",
        "description": [
            "+10 Discipline"
        ],

    },
    {
        "name": "Minor Discipline Mod",
        "img":"https://bungie.net/common/destiny2_content/icons/8fa2d4e4c82586668210e12c5115575a.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "General Armor Mod",
        "description": [
            "+5 Discipline"
        ],
    },
    {
        "name":"Strength Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/07f2361532c79e773909220e5884ab07.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "General Armor Mod",
        "description": [
            "+10 Strength"
        ],

    },
    {
        "name": "Minor Strength Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/ec0b298ec4dac0023604e467a58c3868.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "General Armor Mod",
        "description": [
            "+5 Strength"
        ],
    },
    {
        "name": "Mobility Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/c664ddd10920daab49cc3808dbb6a1e6.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "General Armor Mod",
        "description": [
            "+10 Mobility"
        ],
    },
    {
        "name": "Minor Mobility Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/287901ef741855655856f6e8f5776f03.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "General Armor Mod",
        "description": [
            "+5 Mobility"
        ],
    },
    {
        "name": "Resilience Mod",
        "img":"https://bungie.net/common/destiny2_content/icons/195f4f173adb52b336b4ecd67101004d.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "General Armor Mod",
        "description": [
            "+10 Resilience"
        ],
    },
    {
        "name": "Minor Resilience Mod",
        "img":"https://bungie.net/common/destiny2_content/icons/53c28186a4b97285a01aace5748e4de7.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "General Armor Mod",
        "description": [
            "+5 Resilience"
        ],
    }
]



var combat_mods = [
    {
        "name": "Empty Combat Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/53fa0b010b6b5e4b6bf9b8367d2980e0.png",
        "affinity": 0,
        "cost": 0,
        "type": "None",
        "description": [
            ""
        ],

    },
    
    {
        "name": "Taking Charge",
        "img": "https://www.bungie.net/common/destiny2_content/icons/5f0c0d6604569712074ae7cba8fb47d3.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "Charged with Light Mod",
        "description": [
            "Become Charged with Light by picking up Orbs of Power.",
        ],
    },
    {
        "name": "Shield Break Charge",
        "img": "https://www.bungie.net/common/destiny2_content/icons/32b5e4b0719f6bec8e70987db09aa755.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "Charged with Light Mod",
        "description": [
            "Become Charged with Light by breaking a combatant shield with the matching energy type.",
        ],
    },
    {
        "name": "Empowered Finish",
        "img": "https://www.bungie.net/common/destiny2_content/icons/a8e2913f5e424d4c8ed18c719c85c2db.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "Charged with Light Mod",
        "description": [
            "Become Charged with Light by finishing a combatant, consuming one-tenth of your Super energy.",
        ],
    },
    {
        "name": "High-Energy Fire",
        "img": "https://bungie.net/common/destiny2_content/icons/126c83604240748a98f807a85220b652.png",
        "affinity": 0,
        "cost": 4+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, gain a bonus to weapon damage. Each defeated combatant consumes one stack of Charged with Light.",
        ],
    },
    {
        "name": "Quick Charge",
        "img": "https://www.bungie.net/common/destiny2_content/icons/e80f0a325b78190e164810724044776e.png",
        "affinity": 1,
        "cost": 5+1,
        "type": "Charged with Light Mod",
        "description": [
            "Become Charged with Light by rapidly defeating multiple combatants with Fusion Rifles or Shotguns.",
            "This mod's secondary perk is active when at least one other Arc mod is socketed into this armor, or when at least one other Arc Charged With Light mod is socketed into another piece of armor you are wearing.",
            "Secondary perk: <br>Ever Ready: Greatly increases the ready speed of Fusion Rifles, Shotguns, Submachine Guns, and Swords.",
            
        ],
    },
    {
        "name": "Striking Light",
        "img": "https://www.bungie.net/common/destiny2_content/icons/e1eb7cf6ad88c3311f775df370bd21e4.png",
        "affinity": 1,
        "cost": 5+1,
        "type": "Charged with Light Mod",
        "description": [
            "Become Charged with Light by rapidly defeating multiple combatants with Fusion Rifles or Shotguns.",
            "This mod's secondary perk is active when at least one other Arc mod is socketed into this armor, or when at least one other Arc Charged With Light mod is socketed into another piece of armor you are wearing.",
            "Secondary perk: <br>Uncatchable: Gain damage resistance against combatants while sprinting.",
            
        ],
    },
    {
        "name": "Heavy Handed",
        "img": "https://bungie.net/common/destiny2_content/icons/c6d1db58becc093aa5d7b2534af41005.png",
        "affinity": 1,
        "cost": 7+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, regain half of your melee energy when you use a charged melee ability, consuming one stack of Charged with Light.",
            "This mod's secondary perk is active when at least one other Arc mod is socketed into this armor, or when at least one other Arc Charged With Light mod is socketed into another piece of armor you are wearing.",
            "Secondary perk: <br>Lock and Load: While surrounded by multiple combatants, defeating a combatant with a Fusion Rifle, Shotgun, Sidearm, or Submachine Gun adds ammo for that weapon to your reserves.",
            
        ],
    },
    {
        "name": "Powerful Friends",
        "img": "https://www.bungie.net/common/destiny2_content/icons/006460670f0ca57fbe5ee1af83dcfd4d.png",
        "affinity": 1,
        "cost": 4+1,
        "type": "Charged with Light Mod",
        "description": [
            "When you become Charged with Light, nearby allies also become Charged with Light, if they are not already.",
            "This mod's secondary perk is active when at least one other Arc mod is socketed into this armor, or when at least one other Arc Charged With Light mod is socketed into another piece of armor you are wearing.",
            "Secondary perk: <br>Stat Increase: +20 Mobility",
            
        ],
    },
    {
        "name": "Swift Charge",
        "img": "https://www.bungie.net/common/destiny2_content/icons/80b1179638c3627864a1ab5247151305.png",
        "affinity": 1,
        "cost": 5+1,
        "type": "Charged with Light Mod",
        "description": [
            "Become Charged with Light by rapidly defeating combatants with Pulse Rifles, Sidearms, or Submachine Guns.",
            "This mod's secondary perk is active when at least one other Arc mod is socketed into this armor, or when at least one other Arc Charged With Light mod is socketed into another piece of armor you are wearing.",
            "Secondary perk: <br>Pulse Rifle Scavenger: Defeating combatants with a Pulse Rifle grants a chance to drop Special ammo for your allies.",
            
        ],
    },
    {
        "name": "Lucent Blade",
        "img": "https://www.bungie.net/common/destiny2_content/icons/b2863d7ca41af5bca31641ecc6c5998a.png",
        "affinity": 1,
        "cost": 4+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, dealing damage with a Sword gives you bonus Sword damage for 5 seconds, consuming one stack of Charged with Light.",
            "This mod's secondary perk is active when at least one other Arc mod is socketed into this armor, or when at least one other Arc Charged With Light mod is socketed into another piece of armor you are wearing.",
            "Secondary perk: <br>Replenishing Guard: Greatly increases the charge rate for your equipped Swords.",
            
        ],
    },
    {
        "name": "Reactive Pulse",
        "img": "https://www.bungie.net/common/destiny2_content/icons/19fc1544595d371c631855656c9f31b7.png",
        "affinity": 1,
        "cost": 3+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, when you take damage while surrounded by combatants, you emit a burst of damaging Arc energy, consuming one stack of Charged with Light.",
            "This mod's secondary perk is active when at least one other Arc mod is socketed into this armor, or when at least one other Arc Charged With Light mod is socketed into another piece of armor you are wearing.",
            "Secondary perk: <br>Finisher Bulwark: Gain a powerful overshield while performing your finisher.",
        ],
    },
    {
        "name": "Radiant Light",
        "img": "https://bungie.net/common/destiny2_content/icons/b6649b05c177d25a0faae24fe727fbb9.png",
        "affinity": 1,
        "cost": 3+1,
        "type": "Charged with Light Mod",
        "description": [
            "Casting your Super causes nearby allies to become Charged with Light.",
            "This mod's secondary perk is active when at least one other Arc mod is socketed into this armor, or when at least one other Arc Charged With Light mod is socketed into another piece of armor you are wearing.",
            "Secondary perk: <br> Stat Increase: +20 Strength",
        ],
    },
    {
        "name": "Heal Thyself",
        "img": "https://bungie.net/common/destiny2_content/icons/e7067bd91843c6a9a40cceba9d376683.png",
        "affinity": 2,
        "cost": 4+1,
        "type": "Charged with Light Mod",
        "description": [
            "While you are Charged with Light, grenade final blows heal you and consume one stack of Charged with Light.",
            "This mod's effects stack with other copies of this mod.",
            
        ],
    },
    {
        "name": "Firepower",
        "img": "https://www.bungie.net/common/destiny2_content/icons/070b7b77cd6fb8462dc6013764cb3709.png",
        "affinity": 2,
        "cost": 4+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, regain a portion of your grenade energy when you use your grenade, consuming one stack of Charged with Light.",
            "This mod's effects stack with other copies of this mod.",
            
        ],
    },
    {
        "name": "Blast Radius",
        "img": "https://www.bungie.net/common/destiny2_content/icons/6b0d065905e6e640a2c23b1af25160d1.png",
        "affinity": 2,
        "cost": 3+1,
        "type": "Charged with Light Mod",
        "description": [
            "Become Charged with Light by rapidly defeating multiple combatants with Grenade Launchers or Rocket Launchers.",
            "This mod's effects stack with other copies of this mod.",
            
        ],
    },
    {
        "name": "Charged Up",
        "img": "https://www.bungie.net/common/destiny2_content/icons/ce29f32ba5ef8758d1b5f3cfad0944a6.png",
        "affinity": 2,
        "cost": 2+1,
        "type": "Charged with Light Mod",
        "description": [
            "Allows for 1 additional stack of Charged with Light.",
            "This mod's effects stack with other copies of this mod.",
            
        ],
    },
    {
        "name": "Sustained Charge",
        "img": "https://www.bungie.net/common/destiny2_content/icons/900534ac5f6ffd274521ed7fc0e43e31.png",
        "affinity": 2,
        "cost": 4+1,
        "type": "Charged with Light Mod",
        "description": [
            "Become Charged with Light by rapidly defeating combatants with Auto Rifles, Trace Rifles, or Machine Guns. Additional copies of this mod increase the time allowed between combatants that are defeated.",
            "This mod's effects stack with other copies of this mod.",
            
        ],
    },
    {
        "name": "Argent Ordnance",
        "img": "https://www.bungie.net/common/destiny2_content/icons/9bc05cbb389498fb9ca99807c9b91b6b.png",
        "affinity": 2,
        "cost": 5+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, readying or firing a Rocket Launcher grants it increased damage and reload speed. Damaging a combatant with a rocket consumes one stack of Charged with Light.",
            "This mod's effects stack with other copies of this mod.",
            
        ],
    },
    {
        "name": "Kindling the Flame",
        "img": "https://bungie.net/common/destiny2_content/icons/cc1eb304baed451cbb4b8b5cfcab164f.png",
        "affinity": 2,
        "cost": 2+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, reviving a downed Guardian gives you a burst of healing, consuming one stack of Charged with Light.",
            "This mod's effects stack with other copies of this mod.",
            
        ],
    },
    {
        "name": "Supercharged",
        "img": "https://bungie.net/common/destiny2_content/icons/7102cef97f85ae4fae1d34153c292973.png",
        "affinity": 2,
        "cost": 5+1,
        "type": "Charged with Light Mod",
        "description": [
            "You can have 2 additional stacks of Charged with Light, up to a maximum of 5.",
            "This mod's effects stack with other copies of this mod.",
            
        ],
    },
    {
        "name": "Protective Light",
        "img": "https://bungie.net/common/destiny2_content/icons/f9d3dcc86e0805401b6f0ce72b0847ba.png",
        "affinity": 3,
        "cost": 2+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, you gain significant damage resistance against combatants when your shields are destroyed. This effect consumes all stacks of Charged with Light. The more stacks consumed, the longer the damage resistance lasts.",
            "This mod imposes a stat penalty when socketed in exchange for a reduced energy cost.",
            "Stat Penalty: -10 Strength"
        ],
    },
    {
        "name": "Extra Reserves",
        "img": "https://bungie.net/common/destiny2_content/icons/fc70edeb4ce73caf4021b67c0017794b.png",
        "affinity": 3,
        "cost": 3+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, defeating combatants with Void damage grants a chance to drop Special ammo. This effect consumes all stacks of Charged with Light. The more stacks you have, the higher your chance of gaining the ammo drop.",
            "This mod imposes a stat penalty when socketed in exchange for a reduced energy cost.",
            "Stat Penalty: -10 Intellect"
        ],
    },
    {
        "name": "Precisely Charged",
        "img": "https://bungie.net/common/destiny2_content/icons/13d7d5a897651438d055d64942c1ff4f.png",
        "affinity": 3,
        "cost": 1+1,
        "type": "Charged with Light Mod",
        "description": [
            "Become Charged with Light by getting multiple rapid precision final blows with Linear Fusion Rifles or Sniper Rifles.",
            "This mod imposes a stat penalty when socketed in exchange for a reduced energy cost.",
            "Stat Penalty: -10 Discipline"
        ],
    },
    {
        "name": "Stacks on Stacks",
        "img": "https://bungie.net/common/destiny2_content/icons/519f5f15cddf0f17906e951fd3a9769b.png",
        "affinity": 3,
        "cost": 4+1,
        "type": "Charged with Light Mod",
        "description": [
            "Gain an extra stack of Charged with Light for every stack you gain.",
            "This mod imposes a stat penalty when socketed in exchange for a reduced energy cost.",
            "Stat Penalty: -10 Recovery"
        ],
    },
    {
        "name": "Precision Charge",
        "img": "https://bungie.net/common/destiny2_content/icons/2614935a04f326038bddff44a374e996.png",
        "affinity": 3,
        "cost": 2+1,
        "type": "Charged with Light Mod",
        "description": [
            "Become Charged with Light by rapidly defeating combatants with precision kills from Bows, Hand Cannons, and Scout Rifles.",
            "This mod imposes a stat penalty when socketed in exchange for a reduced energy cost.",
            "Stat Penalty: -10 Strength"
        ],
    },
    {
        "name": "Surprise Attack",
        "img": "https://bungie.net/common/destiny2_content/icons/df471d6e132702ba8bdfc87b16d1c441.png",
        "affinity": 3,
        "cost": 1+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, reloading or readying a Sidearm will consume all stacks of Charged with Light and convert them into stacks of a major damage buff, which are depleted as you damage combatants with that Sidearm.",
            "This mod imposes a stat penalty when socketed in exchange for a reduced energy cost.",
            "Stat Penalty: -10 Intellect"
        ],
    },
    {
        "name": "Energy Converter",
        "img": "https://bungie.net/common/destiny2_content/icons/e0b2cb5c2a1fd8ffa92f20c91ed5e7e0.png",
        "affinity": 3,
        "cost": 4+1,
        "type": "Charged with Light Mod",
        "description": [
            "While Charged with Light, using your grenade attack grants you Super energy, consuming all stacks of Charged with Light. The more stacks you have, the more energy you gain, up to a maximum of 50% of your Super energy.",
            "This mod imposes a stat penalty when socketed in exchange for a reduced energy cost.",
            "Stat Penalty: -10 Discipline"
        ],
    },
    {
        "name": "Charge Harvester",
        "img": "https://bungie.net/common/destiny2_content/icons/a8acc2b6cf36527f879051a38622e310.png",
        "affinity": 3,
        "cost": 3+1,
        "type": "Charged with Light Mod",
        "description": [
            "While you are not Charged with Light, any kill or assist has a small cumulative chance to cause you to become Charged with Light.",
            "This mod imposes a stat penalty when socketed in exchange for a reduced energy cost.",
            "Stat Penalty: -10 to the stat that governs your class ability recharge rate"
        ],
    },
    {
        "name": "Global Reach",
        "img": "https://www.bungie.net/common/destiny2_content/icons/9106c7e977dc578319d636c9566047de.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Warmind cells you create affect and damage targets at a greater distance",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Blessing of Rasputin",
        "img": "https://bungie.net/common/destiny2_content/icons/3b89677660624c4c0bd27e89fe52649c.png",
        "affinity": 1,
        "cost": 2+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Collecting a Warmind Cell increases the chances that your next final blow with a Seraph weapon will create a Warmind Cell.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Warmind's Light",
        "img": "https://bungie.net/common/destiny2_content/icons/14dc085823df3d8819aedad8747bc09c.png",
        "affinity": 1,
        "cost": 3+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Become Charged with Light by collecting a Warmind Cell.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Modular Lightning",
        "img": "https://bungie.net/common/destiny2_content/icons/7c730a8f363a494fd25d3c98aa4111b8.png",
        "affinity": 1,
        "cost": 3+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Collecting a Warmind Cell creates a burst of chaining Arc energy around you.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Strength of Rasputin",
        "img": "https://bungie.net/common/destiny2_content/icons/20a81ffdf748de8cebd8c90973a5275e.png",
        "affinity": 1,
        "cost": 2+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Collecting a Warmind Cell grants you melee energy.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Sheltering Energy",
        "img": "https://bungie.net/common/destiny2_content/icons/7e6816b6da94913a9743d2855191ee88.png",
        "affinity": 1,
        "cost": 5+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Collecting a Warmind Cell grants you an overshield.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Chosen of the Warmind",
        "img": "https://bungie.net/common/destiny2_content/icons/0d11c3a259eb95eb3918bd2130b304ac.png",
        "affinity": 1,
        "cost": 1+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Collecting or destroying a Warmind Cell creates a concussive blast that pushes enemies away.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Light of the Fire",
        "img": "https://bungie.net/common/destiny2_content/icons/14dc085823df3d8819aedad8747bc09c.png",
        "affinity": 2,
        "cost": 4+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Rapidly defeating targets with the detonation of a Warmind Cell generates an Orb of Power.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Burning Cells",
        "img": "https://bungie.net/common/destiny2_content/icons/e51fc35efbfb77746846ff39157de297.png",
        "affinity": 2,
        "cost": 3+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Destroying a Warmind Cell creates a burst of Solar energy that causes enemies to burn for several seconds.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Wrath of Rasputin",
        "img": "https://bungie.net/common/destiny2_content/icons/5f066e7b42e77905e008511d02c2ea32.png",
        "affinity": 2,
        "cost": 1+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Solar splash damage final blows have a chance to create Warmind Cells.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Fireteam Medic",
        "img": "https://bungie.net/common/destiny2_content/icons/1b0357512d53319f63e5d2bf3c0a17b7.png",
        "affinity": 2,
        "cost": 3+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Destroying a Warmind Cell creates a burst of healing for you and allies near you.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Rage of the Warmind",
        "img": "https://bungie.net/common/destiny2_content/icons/41e2c3607cef7cc665417dde5172ea32.png",
        "affinity": 2,
        "cost": 5+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Adds additional Solar damage to the explosions of Warmind Cells you destroy.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Incinerating Light",
        "img": "https://www.bungie.net/common/destiny2_content/icons/14dc085823df3d8819aedad8747bc09c.png",
        "affinity": 2,
        "cost": 3+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Become Charged with Light by rapidly defeating multiple enemies with the explosion of a Warmind Cell.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Grasp of the Warmind",
        "img": "https://bungie.net/common/destiny2_content/icons/180ee0e9b32d2676a171dfbc606b14ba.png",
        "affinity": 3,
        "cost": 3+1,
        "type": "Warmind Cell Mod",
        "description": [
            "You can pick up, carry, and throw Warmind Cells. Once thrown, a Warmind Cell cannot be picked up again.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Cellular Suppression",
        "img": "https://bungie.net/common/destiny2_content/icons/ba4111a459ca971860571ef9ce5ca4ed.png",
        "affinity": 3,
        "cost": 4+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Damaging a Warmind Cell creates a burst of suppressing Void energy. Additionally, you deal less damage to Warmind Cells.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Power of Rasputin",
        "img": "https://bungie.net/common/destiny2_content/icons/75029cbc3eb965029197391d41ff9246.png",
        "affinity": 3,
        "cost": 4+1,
        "type": "Warmind Cell Mod",
        "description": [
            "You gain a bonus to weapon damage against enemies that are near Warmind Cells.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Warmind's Protection",
        "img": "https://bungie.net/common/destiny2_content/icons/9b3809c858edb260cdc2ae341c26601e.png",
        "affinity": 3,
        "cost": 2+1,
        "type": "Warmind Cell Mod",
        "description": [
            "You take reduced damage from enemies that are near Warmind Cells.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Warmind's Longevity",
        "img": "https://bungie.net/common/destiny2_content/icons/5ea2d5af34ebe66b4c8919d0dbd69e4b.png",
        "affinity": 3,
        "cost": 1+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Warmind Cells you create last longer.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    {
        "name": "Light from Darkness",
        "img": "https://bungie.net/common/destiny2_content/icons/14dc085823df3d8819aedad8747bc09c.png",
        "affinity": 3,
        "cost": 3+1,
        "type": "Warmind Cell Mod",
        "description": [
            "Become Charged with Light by rapidly defeating multiple enemies near a Warmind Cell using weapons or abilities.",
            "Intrinsic: <br>Defeating a combatant with a Seventh Seraph weapon has a chance to drop a Warmind Cell. Multiple copies of this mod do not stack",
            
            
        ],
    },
    
    {
        "name": "Elemental Ordnance",
        "img": "https://www.bungie.net/common/destiny2_content/icons/3b875aea848fe37d8b693418bf3effe0.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "Elemental Well Mod",
        "description": [
            "Defeating a combatant with a grenade spawns an elemental well that matches your subclass energy type.",
            "Intrinsic: <br>Picking up an elemental well grants energy to your ability with the lowest current energy. Picking up an elemental well whose element matches your subclass damage type grants energy to all of your abilities.",
            
            
        ],
    },
    {
        "name": "Elemental Light",
        "img": "https://www.bungie.net/common/destiny2_content/icons/034ae7c2c029209816088d3fa81f4a06.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "Elemental Well Mod",
        "description": [
            "Defeating a combatant with your Super spawns an elemental well that matches your subclass energy type.",
            "Intrinsic: <br>Picking up an elemental well grants energy to your ability with the lowest current energy. Picking up an elemental well whose element matches your subclass damage type grants energy to all of your abilities.",
            
            
        ],
    },
    {
        "name": "Elemental Armaments",
        "img": "https://bungie.net/common/destiny2_content/icons/447bcd67662b6036ba9807dbc528b8ca.png",
        "affinity": 0,
        "cost": 2+1,
        "type": "Elemental Well Mod",
        "description": [
            "Weapons takedowns with a damage type that matches your subclass element have an escalating chance to spawn an elemental well.",
            "Intrinsic: <br>Picking up an elemental well grants energy to your ability with the lowest current energy. Picking up an elemental well whose element matches your subclass damage type grants energy to all of your abilities.",
            
            
        ],
    },
    {
        "name": "Font of Might",
        "img": "https://bungie.net/common/destiny2_content/icons/d5dc170cb40ee6e43564cc35e8551e05.png",
        "affinity": 0,
        "cost": 4+1,
        "type": "Elemental Well Mod",
        "description": [
            "Picking up an elemental well that matches your subclass energy type grants a temporary bonus to weapon damage of that same elemental type.",
            "Intrinsic: <br>Picking up an elemental well grants energy to your ability with the lowest current energy. Picking up an elemental well whose element matches your subclass damage type grants energy to all of your abilities.",
            
            
        ],
    },
    {
        "name": "Font of Wisdom",
        "img": "https://bungie.net/common/destiny2_content/icons/5f0f125d9e6194cf156a257f20811bc3.png",
        "affinity": 0,
        "cost": 4+1,
        "type": "Elemental Well Mod",
        "description": [
            "Picking up an elemental well that matches your subclass energy type grants you a temporary significant increase in your Intellect, improving the recharge rate of your Super.",
            "Intrinsic: <br>Picking up an elemental well grants energy to your ability with the lowest current energy. Picking up an elemental well whose element matches your subclass damage type grants energy to all of your abilities.",
            
            
        ],
    },
    {
        "name": "Elemental Charge",
        "img": "https://bungie.net/common/destiny2_content/icons/ffc9d51dc0f442c535909eb2b4b8d1a2.png",
        "affinity": 0,
        "cost": 2+1,
        "type": "Elemental Well Mod",
        "description": [
            "Become Charged with Light by picking up an elemental well. If the elemental well's element type matches your subclass element, you gain 2 stacks of Charged with Light.",
            "Intrinsic: <br>Picking up an elemental well grants energy to your ability with the lowest current energy. Picking up an elemental well whose element matches your subclass damage type grants energy to all of your abilities.",
            
            
        ],
    },
    
    
]

var activity_mods = [
    {
        "name": "Empty Activity Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/aa09438250638a654652801673cce7d8.png",
        "affinity": 0,
        "cost": 0,
        "type": "Raid",
        "description": [
            ""
        ],
    },
    {
        "name": "Herd Thinner",
        "img": "https://bungie.net/common/destiny2_content/icons/68e54e0d7beab4eaa228a522c85a6d60.png",
        "affinity": 0,
        "cost": 2+1,
        "type": "Raid",
        "description": [
            ""
        ],
    },
    {
        "name": "Scanner Augment",
        "img": "https://www.bungie.net/common/destiny2_content/icons/e01f849d196fa1d63cfc95dede616038.png",
        "affinity": 1,
        "cost": 1+1,
        "type": "Raid",
        "description": [
            ""
        ],
    },
    {
        "name": "Supressor Augment",
        "img": "https://bungie.net/common/destiny2_content/icons/3da4be3a2c3609aafbee3655e902c0b2.png",
        "affinity": 3,
        "cost": 1+1,
        "type": "Raid",
        "description": [
            ""
        ],
    },
    {
        "name":"Operator Augment",
        "img": "https://bungie.net/common/destiny2_content/icons/24a82ebb135726111e3c99073871cdaa.png",
        "affinity": 2,
        "cost": 1+1,
        "type": "Raid",
        "description": [
            ""
        ],
    },
    
]



var helmet_mods = [
    {
        "name": "Empty Helmet Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/d89699e6307ac5d2a306cf054978e251.png",
        "affinity": 0,
        "cost": 0,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name":"Sidearm Ammo Finder",
        "img":"https://www.bungie.net/common/destiny2_content/icons/c1ae38920a60c4e8f393d44761972169.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name":"Shotgun Ammo Finder",
        "img":"https://www.bungie.net/common/destiny2_content/icons/5ab48ede85a6972d2c0b1f4bc5bcb640.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name":"Bow Targeting",
        "img":"https://www.bungie.net/common/destiny2_content/icons/a5121e051f0aeaa9eb39c90652ae68c6.png",
        "affinity": 0,
        "cost": 4+1,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name":"Submachine Gun Targeting",
        "img":"https://www.bungie.net/common/destiny2_content/icons/73c7b20dacf59b2e2bb460184f22c11d.png",
        "affinity": 0,
        "cost": 2+1,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name": "Hands-On",
        "img": "https://www.bungie.net/common/destiny2_content/icons/f47540dc70a9aad624a8936c7e82fcbd.png",
        "affinity": 1,
        "cost": 3+1,
        "type": "None",
        "description": [
            ""
        ],
    }
]

var gauntlet_mods = [
    {
        "name": "Empty Gauntlet Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/18bb744532b78a20164f150c770c5f89.png",
        "affinity": 0,
        "cost": 0,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name":"submachine gun loader",
        "img": "https://bungie.net/common/destiny2_content/icons/0cf177981705d5633f9ace696c4d9f39.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name": "Impact Induction",
        "img": "https://www.bungie.net/common/destiny2_content/icons/e00ae3014d71f672690e493cb814e9bf.png",
        "affinity": 2,
        "cost": 3+1,
        "type": "None",
        "description": [
            ""
        ],
    }

]

var chest_mods = [
    {
        "name": "Empty Chest Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/6bf61607ffa8198cdabdf0fa3b5feab1.png",
        "affinity": 0,
        "cost": 0,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name": "Void Resistance",
        "img": "https://bungie.net/common/destiny2_content/icons/5a3cc0bd1709b28147ec5fbc497360f8.png",
        "affinity": 3,
        "cost": 1+1,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name": "Sniper Rifle Reserves",
        "img": "https://www.bungie.net/common/destiny2_content/icons/8700b5f6f2a832d513f81746d796f439.png",
        "affinity": 0,
        "cost": 3+1,
        "type": "None",
        "description": [
            ""
        ],
    }
]

var boots_mods = [
    {
        "name": "Empty Boots Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/c4b573f9dd4892f6eb3bfb9b194170d0.png",
        "affinity": 0,
        "cost": 0,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name": "Recuperation",
        "img": "https://www.bungie.net/common/destiny2_content/icons/ca8ea4c398dbf809bcec8a24b1c37180.png",
        "affinity": 2,
        "cost": 1+1,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name": "Auto Rifle Scavenger",
        "img": "https://bungie.net/common/destiny2_content/icons/5a8063288c58c6d329cd66fffde4e350.png",
        "affinity": 0,
        "cost": 1+1,
        "type": "None",
        "description": [
            ""
        ],
    }
]

var class_mods = [
    {
        "name": "Empty Class Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/3cfff0f2aa68784762f553eb7997e909.png",
        "affinity": 0,
        "cost": 0,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name": "Perpetuation",
        "img": "https://bungie.net/common/destiny2_content/icons/2d61f6d5e5199a84189227d392105e3d.png",
        "affinity": 3,
        "cost": 2+1,
        "type": "None",
        "description": [
            ""
        ],
    },
    {
        "name": "Distribution",
        "img": "https://bungie.net/common/destiny2_content/icons/a116725dc6ebe6a35866ecc7c681cef4.png",
        "affinity": 0,
        "cost": 4+1,
        "type": "None",
        "description": [
            ""
        ],
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
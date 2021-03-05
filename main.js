function removeTooltips(){
    
    element= document.querySelectorAll('.tutorial');
    console.log(element[0].className)
    element[0].className=element[0].className.replace('tutorial','');
}


var current_build = {
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
        ".affinity": 3,
        ".general": 0,
        ".combat": 0,
        ".activity": 0,
        ".armor-1": 0,
        ".armor-2": 1,
        "total_energy": 0
    },
    ".boots":{
        ".affinity": 1,
        ".general": 0,
        ".combat": 2,
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

current_build_errors = {
    ".helmet": {
        "has_error": false,
        "error_message" : ""
    },
    ".gauntlet": {
        "has_error": false,
        "error_message" : ""
    },
    ".chest":{
        "has_error": false,
        "error_message" : ""
    },
    ".boots":{
        "has_error": false,
        "error_message" : ""
    },
    ".class":{
        "has_error": false,
        "error_message" : ""
    }
}

function setBuildValue(armor,slot,value){
    var tmp_build = current_build
    tmp_build[armor][slot] = parseInt(value)
    isValid = checkBuild(tmp_build)
    if(isValid){
        loadData(current_build)
        loadBuild(current_build)
    }
    else{
        //console.log("TA ERRADO PORRA")
    }
    return
    
}

$(document).ready(function(){
    
    


    loadData(current_build)
    checkBuild(current_build)
    loadBuild(current_build)

    
    
    
    



    
    
    
    
  });

function getAffinitySelector(){
    var string = ""
    affinities.forEach(function(element, i){
        string += "<div >" + "<img src='"+element["img"]+ "' alt='element-"+element["name"] + "'>" + "<span hidden class='value'>" +(i+1)+"</span>" + "</div>"
    })
    return string
}

function getGeneralSelector(affinity){
    var string = ""
    general_mods.forEach(function(element,i){
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='general-mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +i+"</span>" + "</div>"
        }
    })
    return string
}

function getCombatSelector(affinity){
    var string = ""
    combat_mods.forEach(function(element,i){
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='combat-mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +i+"</span>" + "</div>" 
        }
    })
    return string
}

function getActivitySelector(affinity){
    var string = ""
    activity_mods.forEach(function(element,i){
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='activity-mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>" 
            string += "<span hidden class='value'>" +i+"</span>" + "</div>"
        }
    })
    return string
}


function getArmorSelector(armor,affinity){
    var string = ""
    armor_mods[armor].forEach(function(element,i){
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='"+ armor +"-mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +i+"</span>" + "</div>" 
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

function getGeneralSelected(affinity,index){
    var string = ""
    if(index < 0 || index > general_mods.length-1){
        string += "<div class='mod-showcase'>" + "<img src='"+general_mods[0]["img"]+ "' alt='general-mod'>"
        string += "<img src='" + mod_affinities[general_mods[0]["affinity"]]["img"] + "' alt='mod-affinity'>"
        string += "<img src='" + mod_costs[general_mods[0]["cost"]]["img"] + "' alt='mod-cost'>"
        string += "<span hidden class='value'>" +0+"</span>" + "</div>"
    }else{
        element = general_mods[index]
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='general-mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +index+"</span>" + "</div>"
        }else {
            string += "<div class='mod-showcase'>" + "<img src='"+general_mods[0]["img"]+ "' alt='general-mod'>"
            string += "<img src='" + mod_affinities[general_mods[0]["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[general_mods[0]["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +0+"</span>" + "</div>"
        }
    }
    
    return string
}

function getCombatSelected(affinity,index){
    var string = ""
    if(index < 0 || index > combat_mods.length-1){
        string += "<div class='mod-showcase'>" + "<img src='"+combat_mods[0]["img"]+ "' alt='general-mod'>"
        string += "<img src='" + mod_affinities[combat_mods[0]["affinity"]]["img"] + "' alt='mod-affinity'>"
        string += "<img src='" + mod_costs[combat_mods[0]["cost"]]["img"] + "' alt='mod-cost'>"
        string += "<span hidden class='value'>" +0+"</span>" + "</div>"
    }else{
        element = combat_mods[index]
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='combat-mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +index+"</span>" + "</div>" 
        }else {
            string += "<div class='mod-showcase'>" + "<img src='"+combat_mods[0]["img"]+ "' alt='general-mod'>"
            string += "<img src='" + mod_affinities[combat_mods[0]["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[combat_mods[0]["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +0+"</span>" + "</div>"
        }
    }
    
    return string
}

function getActivitySelected(affinity,index){
    var string = ""
    if(index < 0 || index > activity_mods.length-1){
        string += "<div class='mod-showcase'>" + "<img src='"+activity_mods[0]["img"]+ "' alt='general-mod'>"
            string += "<img src='" + mod_affinities[activity_mods[0]["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[activity_mods[0]["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +0+"</span>" + "</div>"
    }else{
        element = activity_mods[index]
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='activity-mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>" 
            string += "<span hidden class='value'>" +index+"</span>" + "</div>"
        }else{
            string += "<div class='mod-showcase'>" + "<img src='"+activity_mods[0]["img"]+ "' alt='general-mod'>"
            string += "<img src='" + mod_affinities[activity_mods[0]["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[activity_mods[0]["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +0+"</span>" + "</div>"
        }
    }
   
    return string
}


function getArmorSelected(armor,affinity,index){
    var string = ""
    
    
    if(index < 0 || index > armor_mods[armor].length-1){
        string += "<div class='mod-showcase'>" + "<img src='"+armor_mods[armor][0]["img"]+ "' alt='general-mod'>"
        string += "<img src='" + mod_affinities[armor_mods[armor][0]["affinity"]]["img"] + "' alt='mod-affinity'>"
        string += "<img src='" + mod_costs[armor_mods[armor][0]["cost"]]["img"] + "' alt='mod-cost'>"
        string += "<span hidden class='value'>" +0+"</span>" + "</div>"
    }else{
        element = armor_mods[armor][index]
        if(isAffinityCompatible(affinity,element["affinity"])){
            string += "<div class='mod-showcase'>" + "<img src='"+element["img"]+ "' alt='"+ armor +"-mod'>"
            string += "<img src='" + mod_affinities[element["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[element["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +index+"</span>" + "</div>" 
        }
        else{
            string += "<div class='mod-showcase'>" + "<img src='"+armor_mods[armor][0]["img"]+ "' alt='general-mod'>"
            string += "<img src='" + mod_affinities[armor_mods[armor][0]["affinity"]]["img"] + "' alt='mod-affinity'>"
            string += "<img src='" + mod_costs[armor_mods[armor][0]["cost"]]["img"] + "' alt='mod-cost'>"
            string += "<span hidden class='value'>" +0+"</span>" + "</div>"
        }
    }
    
    return string
}

function isAffinityCompatible(armor_affinity,mod_affinity){
    if(armor_affinity == mod_affinity || mod_affinity == 0){
        return true
    }else{
        return false
    }
}
function checkBuild(current_build){
    var armor_pieces = [".helmet",".gauntlet",".chest",".boots",".class"]
    var mod_slots = [".affinity",".general",".combat",".activity",".armor-1",".armor-2"]

    var hadError = false
    armor_pieces.forEach(function(armor){
        //console.log(armor)
        var energy_spent = 0
        mod_slots.forEach(function(slot){
            var index = current_build[armor][slot]
            var mod_energy = 0
            if(slot != ".affinity"){
                if(slot == ".general"){
                    mod_energy += general_mods[index]["cost"]
                }else if(slot == ".combat"){
                    mod_energy += combat_mods[index]["cost"]
                }
                else if(slot == ".activity"){
                    mod_energy += activity_mods[index]["cost"]
                }
                else{
                    mod_energy += armor_mods[armor][index]["cost"]
                }
            }

            if(mod_energy > 0){
                energy_spent += mod_energy -1
            }
            
        })
        current_build[armor]["total_energy"] = energy_spent
        
        //console.log(energy_spent)
        if(energy_spent > 10){
            hadError = true
            current_build_errors[armor]["has_error"] = true
            current_build_errors[armor]["error_message"] = "Too much energy needed!"
            
        }
    })
    if (hadError){
        return false
    }
    return true
}
function loadBuild(current_build){
    var armor_pieces = [".helmet",".gauntlet",".chest",".boots",".class"]
    var mod_slots = [".affinity",".general",".combat",".activity",".armor-1",".armor-2"]

    armor_pieces.forEach(function(armor){
        $(armor).children(".selected").each(function(){
            $(this).children(".armor-1").each(function(){
                $(this).empty()
                $(this).append(getArmorSelected(armor,current_build[armor][".affinity"],current_build[armor][".armor-1"]))
            })
            $(this).children(".armor-2").each(function(){
                $(this).empty()
                $(this).append(getArmorSelected(armor,current_build[armor][".affinity"],current_build[armor][".armor-2"]))
            })
            $(this).children(".affinity").each(function(){
                $(this).empty()
                $(this).append(getAffinitySelected(current_build[armor][".affinity"]))
            })
            $(this).children(".general").each(function(){
                $(this).empty()
                $(this).append(getGeneralSelected(current_build[armor][".affinity"],current_build[armor][".general"]))
            })
            $(this).children(".combat").each(function(){
                $(this).empty()
                $(this).append(getCombatSelected(current_build[armor][".affinity"],current_build[armor][".combat"]))
            })
            $(this).children(".activity").each(function(){
                $(this).empty()
                $(this).append(getActivitySelected(current_build[armor][".affinity"],current_build[armor][".activity"]))
            })
        })
        $(armor).children("div").children(".energy_counter").each(function(){
            console.log(current_build[armor]["total_energy"])
            $(this).children().children().children().each(function(){
                $(this).children().addClass("empty").removeClass("full")
            })
            for(let index = 0; index < current_build[armor]["total_energy"]; index++) {
                console.log($(this).children().children().children().children(".u"+index).addClass("full").removeClass("empty"))
                
            }
        })

    })
}

function loadData(current_build){
    var armor_pieces = [".helmet",".gauntlet",".chest",".boots",".class"]
    var mod_slots = [".affinity",".general",".combat",".activity",".armor-1",".armor-2"]
    
    armor_pieces.forEach(function(armor){
        $(armor).children(".selectors").each(function(){
            $(this).children(".armor-1").each(function(){
                $(this).empty()
                $(this).append(getArmorSelector(armor,current_build[armor][".affinity"]))
            })
            $(this).children(".armor-2").each(function(){
                $(this).empty()
                $(this).append(getArmorSelector(armor,current_build[armor][".affinity"]))
            })
            $(this).children(".affinity").each(function(){
                $(this).empty()
                $(this).append(getAffinitySelector())
            })
            $(this).children(".general").each(function(){
                $(this).empty()
                $(this).append(getGeneralSelector(current_build[armor][".affinity"]))
            })
            $(this).children(".combat").each(function(){
                $(this).empty()
                $(this).append(getCombatSelector(current_build[armor][".affinity"]))
            })
            $(this).children(".activity").each(function(){
                $(this).empty()
                $(this).append(getActivitySelector(current_build[armor][".affinity"]))
            })
        })
    })

    armor_pieces.forEach(function(armor){
        mod_slots.forEach(function(slot){
            $(armor).children(".selectors").each(function(){
                $(this).children(slot).children().each(function(){
                    $(this).click(() =>{
                        
                        
                        $(this).parents(".armor").children(".selected").children(slot).empty()
                        $(this).parents(".armor").children(".selected").children(slot).append($(this).clone())
                        var value = $(this).children(".value").html()
                        setBuildValue(armor,slot,value)
                        
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
        "cost": 0
    },
    {
        "name":"Intellect Mod",
        "img": "https://bungie.net/common/destiny2_content/icons/9fd56c3b42923c9df23edf585b0107bf.png",
        "affinity": 0,
        "cost": 5+1

    },
    {
        "name": "Minor Intellect Mod",
        "img":"https://bungie.net/common/destiny2_content/icons/d8da60458e3355ddf7123be5ffe3dc3c.png",
        "affinity": 0,
        "cost": 2+1
    },
    {
        "name":"Discipline Mod",
        "img": "https://bungie.net/common/destiny2_content/icons/9d54e2149f945b2c298020da443b70fa.png",
        "affinity": 0,
        "cost": 3+1

    },
    {
        "name": "Minor Discipline Mod",
        "img":"https://bungie.net/common/destiny2_content/icons/8fa2d4e4c82586668210e12c5115575a.png",
        "affinity": 0,
        "cost": 1+1
    },
    {
        "name":"Strength Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/07f2361532c79e773909220e5884ab07.png",
        "affinity": 0,
        "cost": 3+1

    },
    {
        "name": "Minor Strength Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/ec0b298ec4dac0023604e467a58c3868.png",
        "affinity": 0,
        "cost": 1+1
    }
]



var combat_mods = [
    {
        "name": "Empty Combat Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/53fa0b010b6b5e4b6bf9b8367d2980e0.png",
        "affinity": 0,
        "cost": 0
    },
    {
        "name": "Rage of the Warmind",
        "img": "https://bungie.net/common/destiny2_content/icons/41e2c3607cef7cc665417dde5172ea32.png",
        "affinity": 2,
        "cost": 5+1
    },
    {
        "name": "Reactive Pulse",
        "img": "https://www.bungie.net/common/destiny2_content/icons/19fc1544595d371c631855656c9f31b7.png",
        "affinity": 1,
        "cost": 3+1
    },
    {
        "name": "Charge Harvester",
        "img": "https://bungie.net/common/destiny2_content/icons/a8acc2b6cf36527f879051a38622e310.png",
        "affinity": 3,
        "cost": 3+1
    },
    {
        "name": "Global Reach",
        "img": "https://www.bungie.net/common/destiny2_content/icons/9106c7e977dc578319d636c9566047de.png",
        "affinity": 0,
        "cost": 1+1
    }
]

var activity_mods = [
    {
        "name": "Empty Activity Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/aa09438250638a654652801673cce7d8.png",
        "affinity": 0,
        "cost": 0
    },
    {
        "name": "Scanner Augment",
        "img": "https://www.bungie.net/common/destiny2_content/icons/e01f849d196fa1d63cfc95dede616038.png",
        "affinity": 1,
        "cost": 1+1
    },
    {
        "name": "Supressor Augment",
        "img": "https://bungie.net/common/destiny2_content/icons/3da4be3a2c3609aafbee3655e902c0b2.png",
        "affinity": 3,
        "cost": 1+1
    },
    {
        "name":"Operator Augment",
        "img": "https://bungie.net/common/destiny2_content/icons/24a82ebb135726111e3c99073871cdaa.png",
        "affinity": 2,
        "cost": 1+1
    },
    {
        "name": "Herd Thinner",
        "img": "https://bungie.net/common/destiny2_content/icons/68e54e0d7beab4eaa228a522c85a6d60.png",
        "affinity": 0,
        "cost": 2+1
    }
]



var helmet_mods = [
    {
        "name": "Empty Helmet Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/d89699e6307ac5d2a306cf054978e251.png",
        "affinity": 0,
        "cost": 0
    },
    {
        "name":"Sidearm Ammo Finder",
        "img":"https://www.bungie.net/common/destiny2_content/icons/c1ae38920a60c4e8f393d44761972169.png",
        "affinity": 0,
        "cost": 1+1
    },
    {
        "name":"Shotgun Ammo Finder",
        "img":"https://www.bungie.net/common/destiny2_content/icons/5ab48ede85a6972d2c0b1f4bc5bcb640.png",
        "affinity": 0,
        "cost": 3+1
    },
    {
        "name":"Bow Targeting",
        "img":"https://www.bungie.net/common/destiny2_content/icons/a5121e051f0aeaa9eb39c90652ae68c6.png",
        "affinity": 0,
        "cost": 4+1
    },
    {
        "name":"Submachine Gun Targeting",
        "img":"https://www.bungie.net/common/destiny2_content/icons/73c7b20dacf59b2e2bb460184f22c11d.png",
        "affinity": 0,
        "cost": 2+1
    },
    {
        "name": "Hands-On",
        "img": "https://www.bungie.net/common/destiny2_content/icons/f47540dc70a9aad624a8936c7e82fcbd.png",
        "affinity": 1,
        "cost": 3+1
    }
]

var gauntlet_mods = [
    {
        "name": "Empty Gauntlet Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/18bb744532b78a20164f150c770c5f89.png",
        "affinity": 0,
        "cost": 0
    },
    {
        "name":"submachine gun loader",
        "img": "https://bungie.net/common/destiny2_content/icons/0cf177981705d5633f9ace696c4d9f39.png",
        "affinity": 0,
        "cost": 3+1
    },
    {
        "name": "Impact Induction",
        "img": "https://www.bungie.net/common/destiny2_content/icons/e00ae3014d71f672690e493cb814e9bf.png",
        "affinity": 2,
        "cost": 3+1
    }

]

var chest_mods = [
    {
        "name": "Empty Chest Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/6bf61607ffa8198cdabdf0fa3b5feab1.png",
        "affinity": 0,
        "cost": 0
    },
    {
        "name": "Void Resistance",
        "img": "https://bungie.net/common/destiny2_content/icons/5a3cc0bd1709b28147ec5fbc497360f8.png",
        "affinity": 3,
        "cost": 1+1
    },
    {
        "name": "Sniper Rifle Reserves",
        "img": "https://www.bungie.net/common/destiny2_content/icons/8700b5f6f2a832d513f81746d796f439.png",
        "affinity": 0,
        "cost": 3+1
    }
]

var boots_mods = [
    {
        "name": "Empty Boots Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/c4b573f9dd4892f6eb3bfb9b194170d0.png",
        "affinity": 0,
        "cost": 0
    },
    {
        "name": "Recuperation",
        "img": "https://www.bungie.net/common/destiny2_content/icons/ca8ea4c398dbf809bcec8a24b1c37180.png",
        "affinity": 2,
        "cost": 1+1
    },
    {
        "name": "Auto Rifle Scavenger",
        "img": "https://bungie.net/common/destiny2_content/icons/5a8063288c58c6d329cd66fffde4e350.png",
        "affinity": 0,
        "cost": 1+1
    }
]

var class_mods = [
    {
        "name": "Empty Class Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/3cfff0f2aa68784762f553eb7997e909.png",
        "affinity": 0,
        "cost": 0
    },
    {
        "name": "Perpetuation",
        "img": "https://bungie.net/common/destiny2_content/icons/2d61f6d5e5199a84189227d392105e3d.png",
        "affinity": 3,
        "cost": 2+1
    },
    {
        "name": "Distribution",
        "img": "https://bungie.net/common/destiny2_content/icons/a116725dc6ebe6a35866ecc7c681cef4.png",
        "affinity": 0,
        "cost": 4+1
    }

]

var armor_mods = {
    ".helmet": helmet_mods,
    ".gauntlet": gauntlet_mods,
    ".chest": chest_mods,
    ".boots": boots_mods,
    ".class": class_mods
}
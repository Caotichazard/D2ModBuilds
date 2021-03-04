function removeTooltips(){
    console.log("AAAAAAA")
    element= document.querySelectorAll('.tutorial');
    console.log(element[0].className)
    element[0].className=element[0].className.replace('tutorial','');
}

$(document).ready(function(){
    
    var arr = [".helmet",".gauntlet",".chest",".boots",".class"]


    loadData()
    

    var mod_slots = [".affinity",".general",".combat",".activity",".armor-1",".armor-2"]
    
    mod_slots.forEach(function(element){
        $(".armor").children(".selectors").each(function(){
            $(this).children(element).children().each(function(){
                $(this).click(() =>{
                    $(this).parents(".armor").children(".selected").children(element).empty()
                    $(this).parents(".armor").children(".selected").children(element).append($(this).clone())
                    
                })
            })
        })
         
    })



    
    arr.forEach(function(element){
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
    
    
  });

function getAffinitySelector(){
    var string = ""
    affinities.forEach(function(element){
        string += "<div >" + "<img src='"+element["img"]+ "' alt='element-"+element["name"] + "'>" + "</div>"
    })
    return string
}

function getGeneralSelector(){
    var string = ""
    general_mods.forEach(function(element){
        string += "<div >" + "<img src='"+element["img"]+ "' alt='general-mod'>" + "</div>"
    })
    return string
}

function getCombatSelector(){
    var string = ""
    combat_mods.forEach(function(element){
        string += "<div >" + "<img src='"+element["img"]+ "' alt='combat-mod'>" + "</div>"
    })
    return string
}

function getActivitySelector(){
    var string = ""
    activity_mods.forEach(function(element){
        string += "<div >" + "<img src='"+element["img"]+ "' alt='activity-mod'>" + "</div>"
    })
    return string
}

function getHelmetSelector(){
    var string = ""
    helmet_mods.forEach(function(element){
        string += "<div >" + "<img src='"+element["img"]+ "' alt='helmet-mod'>" + "</div>"
    })
    return string
}

function getGauntletSelector(){
    var string = ""
    gauntlet_mods.forEach(function(element){
        string += "<div >" + "<img src='"+element["img"]+ "' alt='helmet-mod'>" + "</div>"
    })
    return string
}

function getChestSelector(){
    var string = ""
    chest_mods.forEach(function(element){
        string += "<div >" + "<img src='"+element["img"]+ "' alt='helmet-mod'>" + "</div>"
    })
    return string
}

function getBootsSelector(){
    var string = ""
    boots_mods.forEach(function(element){
        string += "<div >" + "<img src='"+element["img"]+ "' alt='helmet-mod'>" + "</div>"
    })
    return string
}
function getClassSelector(){
    var string = ""
    class_mods.forEach(function(element){
        string += "<div >" + "<img src='"+element["img"]+ "' alt='helmet-mod'>" + "</div>"
    })
    return string
}

function loadData(){
    $(".armor").children(".selectors").each(function(){
        $(this).children(".affinity").each(function(){
            $(this).append(getAffinitySelector())
        })
        $(this).children(".general").each(function(){
            $(this).append(getGeneralSelector())
        })
        $(this).children(".combat").each(function(){
            $(this).append(getCombatSelector())
        })
        $(this).children(".activity").each(function(){
            $(this).append(getActivitySelector())
        })
    })
    $(".helmet").children(".selectors").each(function(){
        $(this).children(".armor-1").each(function(){
            $(this).append(getHelmetSelector())
        })
        $(this).children(".armor-2").each(function(){
            $(this).append(getHelmetSelector())
        })
    })
    $(".gauntlet").children(".selectors").each(function(){
        $(this).children(".armor-1").each(function(){
            $(this).append(getGauntletSelector())
        })
        $(this).children(".armor-2").each(function(){
            $(this).append(getGauntletSelector())
        })
    })
    $(".chest").children(".selectors").each(function(){
        $(this).children(".armor-1").each(function(){
            $(this).append(getChestSelector())
        })
        $(this).children(".armor-2").each(function(){
            $(this).append(getChestSelector())
        })
    })
    $(".boots").children(".selectors").each(function(){
        $(this).children(".armor-1").each(function(){
            $(this).append(getBootsSelector())
        })
        $(this).children(".armor-2").each(function(){
            $(this).append(getBootsSelector())
        })
    })
    $(".class").children(".selectors").each(function(){
        $(this).children(".armor-1").each(function(){
            $(this).append(getClassSelector())
        })
        $(this).children(".armor-2").each(function(){
            $(this).append(getClassSelector())
        })
    })
}


var affinities = [
    {
        "name": "solar",
        "img": "https://www.bungie.net/common/destiny2_content/icons/ea89705796a93504412e041c1b5931c0.png"
    },
    {
        "name": "arc",
        "img": "https://www.bungie.net/common/destiny2_content/icons/91fe40e7d2ed2edbce42aa0b1917fd73.png"
    },
    {
        "name":"void",
        "img": "https://www.bungie.net/common/destiny2_content/icons/d0b6369c27cea3a71f059665ba397720.png"
    }
]

var general_mods = [
    {
        "name": "Empty General Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/3a1e41ae2e2cbe33611481665f7d0378.png"
    },
    {
        "name":"Intellect Mod",
        "img": "https://bungie.net/common/destiny2_content/icons/9fd56c3b42923c9df23edf585b0107bf.png",

    },
    {
        "name": "Minor Intellect Mod",
        "img":"https://bungie.net/common/destiny2_content/icons/d8da60458e3355ddf7123be5ffe3dc3c.png"
    },
    {
        "name":"Discipline Mod",
        "img": "https://bungie.net/common/destiny2_content/icons/9d54e2149f945b2c298020da443b70fa.png",

    },
    {
        "name": "Minor Discipline Mod",
        "img":"https://bungie.net/common/destiny2_content/icons/8fa2d4e4c82586668210e12c5115575a.png"
    },
    {
        "name":"Strength Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/07f2361532c79e773909220e5884ab07.png",

    },
    {
        "name": "Minor Strength Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/ec0b298ec4dac0023604e467a58c3868.png"
    }
]



var combat_mods = [
    {
        "name": "Empty Combat Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/53fa0b010b6b5e4b6bf9b8367d2980e0.png"
    },
    {
        "name": "rage of the warmind",
        "img": "https://bungie.net/common/destiny2_content/icons/41e2c3607cef7cc665417dde5172ea32.png"
    },
    {
        "name": "Reactive Pulse",
        "img": "https://www.bungie.net/common/destiny2_content/icons/19fc1544595d371c631855656c9f31b7.png"
    },
    {
        "name": "Charge Harvester",
        "img": "https://bungie.net/common/destiny2_content/icons/a8acc2b6cf36527f879051a38622e310.png"
    },
    {
        "name": "Global Reach",
        "img": "https://www.bungie.net/common/destiny2_content/icons/9106c7e977dc578319d636c9566047de.png"
    }
]

var activity_mods = [
    {
        "name": "Empty Activity Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/aa09438250638a654652801673cce7d8.png"
    },
    {
        "name": "Scanner Augment",
        "img": "https://www.bungie.net/common/destiny2_content/icons/e01f849d196fa1d63cfc95dede616038.png"
    },
    {
        "name": "Supressor Augment",
        "img": "https://bungie.net/common/destiny2_content/icons/3da4be3a2c3609aafbee3655e902c0b2.png"
    },
    {
        "name":"Operator Augment",
        "img": "https://bungie.net/common/destiny2_content/icons/24a82ebb135726111e3c99073871cdaa.png"
    },
    {
        "name": "Herd Thinner",
        "img": "https://bungie.net/common/destiny2_content/icons/68e54e0d7beab4eaa228a522c85a6d60.png"
    }
]

var helmet_mods = [
    {
        "name": "Empty Helmet Mod",
        "img":"https://www.bungie.net/common/destiny2_content/icons/d89699e6307ac5d2a306cf054978e251.png"
    },
    {
        "name":"Sidearm Ammo Finder",
        "img":"https://www.bungie.net/common/destiny2_content/icons/c1ae38920a60c4e8f393d44761972169.png"
    },
    {
        "name":"Shotgun Ammo Finder",
        "img":"https://www.bungie.net/common/destiny2_content/icons/5ab48ede85a6972d2c0b1f4bc5bcb640.png"
    },
    {
        "name":"Bow Targeting",
        "img":"https://www.bungie.net/common/destiny2_content/icons/a5121e051f0aeaa9eb39c90652ae68c6.png"
    },
    {
        "name":"Submachine Gun Targeting",
        "img":"https://www.bungie.net/common/destiny2_content/icons/73c7b20dacf59b2e2bb460184f22c11d.png"
    },
    {
        "name": "hands-on",
        "img": "https://www.bungie.net/common/destiny2_content/icons/f47540dc70a9aad624a8936c7e82fcbd.png"
    }
]

var gauntlet_mods = [
    {
        "name": "Empty Gauntlet Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/18bb744532b78a20164f150c770c5f89.png"
    },
    {
        "name":"submachine gun loader",
        "img": "https://bungie.net/common/destiny2_content/icons/0cf177981705d5633f9ace696c4d9f39.png"
    },
    {
        "name": "Impact Induction",
        "img": "https://www.bungie.net/common/destiny2_content/icons/e00ae3014d71f672690e493cb814e9bf.png"
    }

]

var chest_mods = [
    {
        "name": "Empty Chest Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/6bf61607ffa8198cdabdf0fa3b5feab1.png"
    },
    {
        "name": "Void Resistance",
        "img": "https://bungie.net/common/destiny2_content/icons/5a3cc0bd1709b28147ec5fbc497360f8.png"
    },
    {
        "name": "Sniper Rifle Reserves",
        "img": "https://www.bungie.net/common/destiny2_content/icons/8700b5f6f2a832d513f81746d796f439.png"
    }
]

var boots_mods = [
    {
        "name": "Empty Boots Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/c4b573f9dd4892f6eb3bfb9b194170d0.png"
    },
    {
        "name": "Recuperation",
        "img": "https://www.bungie.net/common/destiny2_content/icons/ca8ea4c398dbf809bcec8a24b1c37180.png"
    },
    {
        "name": "Auto Rifle Scavenger",
        "img": "https://bungie.net/common/destiny2_content/icons/5a8063288c58c6d329cd66fffde4e350.png"
    }
]

var class_mods = [
    {
        "name": "Empty Class Mod",
        "img": "https://www.bungie.net/common/destiny2_content/icons/3cfff0f2aa68784762f553eb7997e909.png"
    },
    {
        "name": "Perpetuation",
        "img": "https://bungie.net/common/destiny2_content/icons/2d61f6d5e5199a84189227d392105e3d.png"
    },
    {
        "name": "Distribution",
        "img": "https://bungie.net/common/destiny2_content/icons/a116725dc6ebe6a35866ecc7c681cef4.png"
    }

]
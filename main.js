function removeTooltips(){
    console.log("AAAAAAA")
    element= document.querySelectorAll('.tutorial');
    console.log(element[0].className)
    element[0].className=element[0].className.replace('tutorial','');
}

$(document).ready(function(){
    loadData()
    


    $(".armor").children(".selectors").each(function(){
        $(this).children(".affinity").children().each(function(){
            $(this).click(() =>{
                $(this).parents(".armor").children(".selected").children(".affinity").empty()
                $(this).parents(".armor").children(".selected").children(".affinity").append($(this).clone())
                
            })
        })
    })



    var helmet = ".helmet"
    var gauntlet = ".gauntlet"
    var arr = [helmet,gauntlet]
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

function loadData(){
    $(".armor").children(".selectors").each(function(){
        $(this).children(".affinity").each(function(){
            $(this).append(getAffinitySelector())
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
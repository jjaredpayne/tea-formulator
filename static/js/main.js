var selectedHerbName = "Lemon Balm";
var selectedHerbText = "Lemon balm (Melissa officinalis)[note 1] is a perennial herbaceous plant in the mint family and native to south-central Europe, the Mediterranean Basin, Iran, and Central Asia, but now naturalized elsewhere.";
var selectedlatinbinomial = "Melissa officinalis"
var selectedHerb = ''
var herbToAdd = ''

//Flavor attributes
var Bi = "<div> </div>"
var Sa = "<div> &nbsp</div>"
var Sw = "<div> &nbsp</div>"
var So = "<div> &nbsp</div>"
var Um = "<div> &nbsp</div>"
var Co = "<div> &nbsp</div>"
var Ea = "<div> &nbsp</div>"
var Fl = "<div> &nbsp</div>"
var Fr = "<div> &nbsp</div>"
var He = "<div> &nbsp</div>"
var Ho = "<div> &nbsp</div>"
var Nu = "<div> &nbsp</div>"
var Pi = "<div> &nbsp</div>"
var Pu = "<div> &nbsp</div>"
var Sp = "<div> &nbsp</div>"
var Su = "<div> &nbsp</div>"
var Wo = "<div> &nbsp</div>"

var indexUrl = 'http://127.0.0.1:5000/';
var wikiURL = 'http://127.0.0.1:5001/';

// Resets html elements, so flavor list can be repopulated.
function resetFlavors () {
    Bi = "<div> &nbsp </div>"
    Sa = "<div> &nbsp</div>"
    Sw = "<div> &nbsp</div>"
    So = "<div> &nbsp</div>"
    Um = "<div> &nbsp</div>"
    Co = "<div> &nbsp</div>"
    Ea = "<div> &nbsp</div>"
    Fl = "<div> &nbsp</div>"
    Fr = "<div> &nbsp</div>"
    He = "<div> &nbsp</div>"
    Ho = "<div> &nbsp</div>"
    Nu = "<div> &nbsp</div>"
    Pi = "<div> &nbsp</div>"
    Pu = "<div> &nbsp</div>"
    Sp = "<div> &nbsp</div>"
    Su = "<div> &nbsp</div>"
    Wo = "<div> &nbsp</div>"
}

// When clicked, herb is selected and ready to be requested for info.
// Passes Herb object for further processing.
function SelectHerb( Herb ){
    return new Promise(function(resolve, reject){
        console.log( Herb )
        herbToAdd = Herb;
        console.log(herbToAdd)
        selectedHerb = JSON.parse(Herb.replaceAll("'", '"'));
        selectedHerbName = selectedHerb.commonname;
        selectedlatinbinomial = decodeURI(selectedHerb.latinbinomial);
        selectedlatinbinomial = selectedlatinbinomial.replace(/\s+/g, '');
        selectedHerbPlantPart = selectedHerb.plantpart;
        UpdateHerbInfo( Herb )
    });
};

// When TeaList item is clicked, item is selected and immediately removed
// Only the latinbinomial string is needed for ID
function SelectTeaHerb( latinbinomial ){
    return new Promise(function(resolve, reject){
        tealatinbinomial = latinbinomial
        console.log(tealatinbinomial);
        RemoveTeaHerb(tealatinbinomial)
    });
};

// Updates the HTML on the specified Flavor tab (herb or tea)
function UpdateFlavorTab ( parsedHerb, TeaOrHerb ){
    resetFlavors();

    parsedHerb = JSON.parse(Herb.replaceAll("'", '"'));
    if (parsedHerb.flavors.Bi == 1)
        Bi="<div>Bitter</div>"
    if (parsedHerb.flavors.Sa == 1)
        Sa= "<div>Salty</div>"
    if (parsedHerb.flavors.Sw == 1)
        Sw= "<div>Sweet</div>"
    if (parsedHerb.flavors.So == 1)
        So= "<div>Sour</div>"
    if (parsedHerb.flavors.Um == 1)
        Um= "<div>Umami</div>"
    if (parsedHerb.flavors.Co == 1)
        Co= "<div>Cooling</div>"
    if (parsedHerb.flavors.Ea == 1)
        Ea= "<div>Earthy</div>"
    if (parsedHerb.flavors.Fl == 1)
        Fl= "<div>Floral</div>"
    if (parsedHerb.flavors.Fr == 1)
        Fr= "<div>Fruit</div>";
    if (parsedHerb.flavors.He == 1)
        He="<div>Herbaceous</div>"
    if (parsedHerb.flavors.Ho == 1)
        Ho= "<div>Hot</div>"
    if (parsedHerb.flavors.Nu == 1)
        Nu= "<div>Nutty</div>"
    if (parsedHerb.flavors.Pi == 1)
        Pi= "<div>Piney</div>"
    if (parsedHerb.flavors.Pu == 1)
        Pu= "<div>Pungent</div>"
    if (parsedHerb.flavors.Sa == 1)
        Sp= "<div>Spicy</div>"        
    if (parsedHerb.flavors.Sp == 1)
        Su= "<div>Sulfury</div>"
    if (parsedHerb.flavors.Wo == 1)
        Wo= "<div>Woody</div>"

    c1 = Bi + Sa + Sw + So + Um + Co + Ea + Fl + Fr
    c2 = He + Ho + Nu + Pi + Pu + Sp + Su + Wo

    if ( TeaOrHerb == "Herb" ){
        document.getElementById('herbFlavorC1').innerHTML = c1;
        document.getElementById('herbFlavorC2').innerHTML = c2;
    }
    if( TeaOrHerb == "Tea" ){
        document.getElementById('teaFlavorC1').innerHTML = c1;
        document.getElementById('teaFlavorC2').innerHTML = c2;
    }
}

// Updates the information on the Herb Info card.
function UpdateHerbInfo( Herb ){
    console.log("UpdateHerbInfo")
    return new Promise(function(resolve, reject){
        document.getElementById('herbImage').src = "static/" + selectedlatinbinomial + ".jpg";
        document.getElementById('herbName').innerText = selectedHerbName;
        //document.getElementById('herbText').innerText = RequestWikiText(Herb)
        RequestWikiText(Herb)

        // flavorHerb = JSON.parse(Herb.replaceAll("'", '"'));
        UpdateFlavorTab( Herb, "Herb" );
    });
};

http://wiki.sheep.art.pl/Wiki%20Markup%20Parser%20in%20Python
function RequestWikiText( Herb ){
    return new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();
        console.log(JSON.parse(Herb.replaceAll("'", '"')));
        parsedHerb = JSON.parse(Herb.replaceAll("'", '"'))
        reqURL = wikiURL + 'requestText' + '?wikipage=' + parsedHerb.latinbinomial + '&heading=Description';
        console.log(reqURL);
        req.open('GET', reqURL, true);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                if (req.responseText !== '') {
                    document.getElementById('herbText').innerText = req.responseText
                } 
                else {
                    console.log('error: reponse empty');
                }
            } 
            else {
                console.log("Error! " + req.statusText);
            }
        });
        req.send(null);
    });
};


// 
function RemoveTeaHerb( latinbinomial ){
    return new Promise(function(resolve, reject){
        var tealatinbinomial = latinbinomial
        RemoveFromTea( tealatinbinomial )
    });
};

// Sends request including which herb to add to the TeaList. Recieves TeaList and redraws it.
function AddToTea() {
    return new Promise(function (resolve, reject) {
        //var parsedFullHerb = JSON.parse(fullHerb.replaceAll("'", '"'));    
        var req = new XMLHttpRequest();

        reqURL = indexUrl + 'AddToTea' + '?herbToAdd=' + herbToAdd;
        console.log('reqURL:', reqURL);
        req.open('GET', reqURL, true);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                if (req.responseText !== '') {
                    var TeaList = req.responseText;
                    TeaList = JSON.parse(TeaList)

                    DrawTeaList( TeaList );
                } 
                else {
                    console.log('error: reponse empty');
                }
            } 
            else {
                console.log("Error! " + req.statusText);
            }
        });
        req.send(null);
    });
};

// Sends request indicating which Herb to replace. Receives, updated TeaList and redraws it.
function RemoveFromTea( tealatinbinomial ) {
    return new Promise(function (resolve, reject) {
        //var parsedFullHerb = JSON.parse(fullHerb.replaceAll("'", '"'));    
        var req = new XMLHttpRequest();

        reqURL = indexUrl + 'RemoveFromTea' + '?latinbinomial=' + tealatinbinomial;
        //console.log('reqURL:', reqURL);
        req.open('GET', reqURL, true);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                if (req.responseText !== '') {
                    var TeaList = req.responseText;
                    TeaList = JSON.parse(TeaList)

                    DrawTeaList( TeaList );
                } 
                else {
                    console.log('error: reponse empty');
                }
            } 
            else {
                console.log("Error! " + req.statusText);
            }
        });
        req.send(null);
    });
};

function DrawTeaList( TeaList ){
    var teaListEntries =  ''
    //Loop through TeaList and update HTML
    for (var i = 0; i < TeaList.length ; i++){
        currentHerb = TeaList[i]
        if(String(TeaList[i].commonname) == "TeaFlavors"){
            UpdateFlavorTab( TeaList[i], "Tea" );
        }
        else{
            imgurl =TeaList[i].latinbinomial
            imgurl = imgurl.replaceAll(" ", '')
            imgurl += ".jpg"

            teaListEntries += "<a href=\"#!\" class=\"collection-item avatar orange lighten-5\" onclick=\"SelectTeaHerb('"+ TeaList[i].commonname + "', '"+TeaList[i].latinbinomial + "')\">"
                +"<img src=/static/" + imgurl + " class='circle'></img>"
                +"<span id='TeaList.commonname' class='title'>" + TeaList[i].commonname + "</span>"
                +"<p id ='" + TeaList[i].latinbinomial + "'>'" +  TeaList[i].latinbinomial + "'</p>"
                +"<p id = >" + TeaList[i].plantpart + "</p>"
                +"</a>"
                +"</li>"
        }
    }
    document.getElementById('teaListEntries').innerHTML = teaListEntries
}
var selectedHerbName = "Lemon Balm";
var selectedHerbText = "Lemon balm (Melissa officinalis)[note 1] is a perennial herbaceous plant in the mint family and native to south-central Europe, the Mediterranean Basin, Iran, and Central Asia, but now naturalized elsewhere.";
var selectedlatinbinomial = "Melissa officinalis"
var selectedHerb = ''
// var herbToAdd = ''

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
var wikiURL = 'https://wiki-text-scraper-361.herokuapp.com/';

// Resets html elements, so flavor list can be repopulated.
function resetFlavors () {
    Bi = "<div> &nbsp</div>"
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
        herbToAdd = Herb;
        selectedHerb = Herb;
        selectedHerbName = selectedHerb.commonname;
        selectedlatinbinomial = decodeURI(selectedHerb.latinbinomial);
        selectedlatinbinomial = selectedlatinbinomial.replace(/\s+/g, '');
        print("selectedlatinbinomial" + selectedlatinbinomial)
        print("selectedherb" + selectedHerb)
        print("herbToAdd" + herbToAdd)
        selectedHerbPlantPart = selectedHerb.plantpart;
        UpdateHerbInfo( Herb )
    });
};

// Updates the HTML on the specified Flavor tab (herb or tea)
function UpdateFlavorTab ( parsedHerb, TeaOrHerb ){
    resetFlavors();

    parsedHerb = JSON.parse(parsedHerb);
    if (parsedHerb.flavors.Bi >= 1)
        Bi="<div>Bitter</div>"
    if (parsedHerb.flavors.Sa >= 1)
        Sa= "<div>Salty</div>"
    if (parsedHerb.flavors.Sw >= 1)
        Sw= "<div>Sweet</div>"
    if (parsedHerb.flavors.So >= 1)
        So= "<div>Sour</div>"
    if (parsedHerb.flavors.Um >= 1)
        Um= "<div>Umami</div>"
    if (parsedHerb.flavors.Co >= 1)
        Co= "<div>Cooling</div>"
    if (parsedHerb.flavors.Ea >= 1)
        Ea= "<div>Earthy</div>"
    if (parsedHerb.flavors.Fl >= 1)
        Fl= "<div>Floral</div>"
    if (parsedHerb.flavors.Fr >= 1)
        Fr= "<div>Fruit</div>";
    if (parsedHerb.flavors.He >= 1)
        He="<div>Herbaceous</div>"
    if (parsedHerb.flavors.Ho >= 1)
        Ho= "<div>Hot</div>"
    if (parsedHerb.flavors.Nu >= 1)
        Nu= "<div>Nutty</div>"
    if (parsedHerb.flavors.Pi >= 1)
        Pi= "<div>Piney</div>"
    if (parsedHerb.flavors.Pu >= 1)
        Pu= "<div>Pungent</div>"
    if (parsedHerb.flavors.Sa >= 1)
        Sp= "<div>Spicy</div>"        
    if (parsedHerb.flavors.Sp >= 1)
        Su= "<div>Sulfury</div>"
    if (parsedHerb.flavors.Wo >= 1)
        Wo= "<div>Woody</div>"

    c1 = Bi + Sa + Sw + So + Um + Co + Ea + Fl + Fr
    c2 = He + Ho + Nu + Pi + Pu + Sp + Su + Wo

    if ( TeaOrHerb == "herb" ){
        document.getElementById('herbFlavorC1').innerHTML = c1;
        document.getElementById('herbFlavorC2').innerHTML = c2;
    }
    if( TeaOrHerb == "tea" ){
        document.getElementById('teaFlavorC1').innerHTML = c1;
        document.getElementById('teaFlavorC2').innerHTML = c2;
    }
}

// Updates the HTML for information on the Herb Info card.
function UpdateHerbInfo( Herb ){
    return new Promise(function(resolve, reject){

        document.getElementById('herbInfoCard').onclick = function(){ AddToTea(Herb); };
        document.getElementById('herbImage').src = "data:image/jpg;base64," + Herb.base64Image;
        document.getElementById('herbName').innerText = selectedHerbName;

        RequestWikiText(JSON.stringify(Herb))
        UpdateFlavorTab( JSON.stringify(Herb), "herb" );
    });
};

function RequestWikiText( Herb ){
    return new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();
        parsedHerb = JSON.parse(Herb)
        reqURL = wikiURL + 'requestText' + '?wikipage=' + parsedHerb.latinbinomial + '&heading=Description';
        req.open('GET', reqURL, true);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                if (req.responseText !== '') {
                    decodedText = JSON.parse(req.responseText)
                    document.getElementById('herbText').innerText = decodedText['wikitext']
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
function AddToTea( herbToAdd) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        reqURL = indexUrl + 'AddToTea' + '?herbToAdd=' + JSON.stringify(herbToAdd);
        console.log('reqURL:', reqURL);
        req.open('GET', reqURL, true);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                if (req.responseText !== '') {
                    var TeaList = req.responseText;
                    TeaList = JSON.parse(TeaList)

                    DrawList( TeaList, 'tea' );
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

// Sends request indicating which Herb to remove. Receives updated TeaList and redraws it.
function RemoveFromTea( tealatinbinomial ) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        reqURL = indexUrl + 'RemoveFromTea' + '?latinbinomial=' + tealatinbinomial;
        req.open('GET', reqURL, true);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                if (req.responseText !== '') {
                    var TeaList = req.responseText;
                    TeaList = JSON.parse(TeaList);
                    DrawList( TeaList, 'tea' );
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

// Place each item in the List into either the Tea or Herb HTML collection
function DrawList( List, TeaOrHerb ){
    var ListEntries =  ''
    for (var i = 0; i < List.length ; i++){
        // If Tea, pass the current Tea Flavors to the update function.
        if(String(List[i].commonname) == "TeaFlavors"){
            UpdateFlavorTab( JSON.stringify(List[i]), "tea" );
        }
        // Elsewise, create an HTML entry for the given list.
        else{
            if (TeaOrHerb == "herb")
                ListEntries += '<a href=\'#!\' class=\'collection-item avatar orange lighten-5\' onclick=\'UpdateHerbInfo('+ JSON.stringify(List[i]) +')\'>'
            else
                ListEntries += "<a href=\"#!\" class=\"collection-item avatar orange lighten-5\" onclick=\"RemoveFromTea('"+ List[i].latinbinomial + "')\">"

            ListEntries += "<img src=data:image/jpg;base64," + List[i].base64Image + " class='circle'></img>"
            +"<span id='List.commonname' class='title'>" + List[i].commonname + "</span>"
            +"<p id ='" + List[i].latinbinomial + "'>'" +  List[i].latinbinomial + "'</p>"
            +"<p id = >" + List[i].plantpart + "</p>"
            +"</a>"
            +"</li>"
        }
    }

    if (TeaOrHerb == "herb")
        document.getElementById('herbListMembers').innerHTML = ListEntries
    if (TeaOrHerb == "tea")
        document.getElementById('teaListMembers').innerHTML = ListEntries
}
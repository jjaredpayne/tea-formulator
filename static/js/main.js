var indexUrl = 'https://tea-formulator.herokuapp.com/';
var wikiURL = 'https://wiki-text-scraper-361.herokuapp.com/';

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

// Updates the HTML on the specified Flavor tab (herb or tea)
function UpdateFlavorTab ( parsedHerb, teaOrHerb ){
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

    col1 = Bi + Sa + Sw + So + Um + Co + Ea + Fl + Fr
    col2 = He + Ho + Nu + Pi + Pu + Sp + Su + Wo

    if ( teaOrHerb == "herb" ){
        document.getElementById('herbFlavorC1').innerHTML = col1;
        document.getElementById('herbFlavorC2').innerHTML = col2;
    }
    if( teaOrHerb == "tea" ){
        document.getElementById('teaFlavorC1').innerHTML = col1;
        document.getElementById('teaFlavorC2').innerHTML = col2;
    }
}

// Updates the HTML for information on the Herb Info card.
function UpdateHerbInfo( herb ){
    return new Promise(function(resolve, reject){
        RequestHerbImage(JSON.stringify(herb))
        RequestWikiText(JSON.stringify(herb))
        UpdateFlavorTab(JSON.stringify(herb), "herb");
        document.getElementById('herbInfoCard').onclick = function(){ AddToTea(herb); };
        document.getElementById('herbName').innerText = herb.commonname;
    });
};

// Sends request including which herb to add to the TeaList. Recieves TeaList and redraws it.
function AddToTea(herbToAdd) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        var reqURL = indexUrl + 'AddToTea'
        herbToAdd = JSON.stringify(herbToAdd)
        req.open('POST', reqURL, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("dataType", "json");
        req.addEventListener("load", function () {
            ProcessResponse( req, ProcessTeaList );
        });
        req.send(herbToAdd);
    });
};

// Makes request to Flask to filter the herblist by passing a flavor.
// Flask returns the filtered list which is passed
function FilterHerbList(flavor){
        var reqUrl = indexUrl + 'FilterHerbList' + '?flavorFilter=' + flavor;
        var req = new XMLHttpRequest();
        MakeRequest(ProcessFilteredList, reqUrl)
};

// Makes request to http://.... to return specified text from Wikipedia
function RequestWikiText( herb ){
        var parsedHerb = JSON.parse(herb)
        var reqUrl = wikiURL + 'requestText' + '?wikipage=' + parsedHerb.latinbinomial + '&heading=Description';
        MakeRequest(ProcessWikiText, reqUrl)
};

// Makes a request to https://.... to return specified image from Wikipedia
function RequestHerbImage( herb ){
    return new Promise(function (resolve, reject) {
        var parsedHerb = JSON.parse(herb)
        var reqUrl = indexUrl + 'requestImage' + '?latinbinomial=' + parsedHerb.latinbinomial;
        MakeRequest(ProcessHerbImage, reqUrl)
    });
};

// Sends a request indicating which Herb to remove. Receives updated TeaList and redraws it.
function RemoveFromTea( tealatinbinomial ) {
    return new Promise(function (resolve, reject) {
        var reqUrl = indexUrl + 'RemoveFromTea' + '?latinbinomial=' + tealatinbinomial;
        MakeRequest(ProcessTeaList, reqUrl)
    });
};

// Initializes XML Http Request, and calls ProcessResponse().
function MakeRequest( responseFunction, reqUrl ){
    var req = new XMLHttpRequest();
    req.open('GET', reqUrl, true);
    req.addEventListener("load", function () {
        ProcessResponse(req, responseFunction);
    });
    req.send(null);
}

// Catches response errors and if there are none, calls successFunction
// which finally performs the work.
function ProcessResponse( req, successFunction ){
    if (req.status >= 200 && req.status < 400) {
        if (req.responseText !== '')
            successFunction( req.responseText );
        else
            console.log('error: reponse empty');
    } 
    else {
        console.log("Error! " + req.statusText);
    }
}

// Updates the DOM with the filtered herb list
function ProcessFilteredList ( list ){
    var filteredList = JSON.parse(list)
    DrawList( filteredList, 'herb' );
}

// Updates the DOM with herb and tea lists
function ProcessTeaList( teaList ){
    teaList = JSON.parse(teaList);
    DrawList( teaList, 'tea' );
}

// Updates the DOM with the Herb Info card image
function ProcessHerbImage( herb ){
    herb = JSON.parse(herb)
    document.getElementById('herbImage').src = "data:image/jpg;base64," + herb['base64Image'];
}

// Updates the DOM with the Herb Info card text
function ProcessWikiText( text ){
    decodedText = JSON.parse(text)
    document.getElementById('herbText').innerText = decodedText['wikitext']
}

// Process the list and create the corresponding HTML for each entry.
function DrawList( list, teaOrHerb ){
    var listEntries =  ''
    for (var i = 0; i < list.length ; i++){
        // Update the tea flavors tab.
        // Else, create an HTML entry for the list item.
        if(String(list[i].commonname) == "tea_flavors")
            UpdateFlavorTab( JSON.stringify(list[i]), "tea" );
        else
            listEntries += SetHTML(teaOrHerb, list, i);
    }
    UpdateHTML (teaOrHerb, listEntries)
}


// Creates an HTML entry for each object in the the tea or herb list.
function SetHTML( teaOrHerb, list, i ){
    listEntries = ''
    if (teaOrHerb == "herb"){
        listEntries += '<a href="#!" class="collection-item" onclick=\'UpdateHerbInfo('+ JSON.stringify(list[i]) +')\'>'
        +'<p>' + list[i].commonname
        +' (' + list[i].latinbinomial + ')</p>'
        +'<p id = >' + list[i].plantpart + '</p>'
        +'</a>'
    }
    if (teaOrHerb == "tea"){
        console.log(list[i])
        console.log(list[i].commonname +"thumbnail: " + list[i].thumbnail)
        listEntries +="<li class=\"collection-item avatar orange lighten-5\">"
        +"<img class='circle' src=data:image/jpg;base64," + list[i].thumbnail + "></img>"
        +"<span id='list.commonname' class='title'>" + list[i].commonname + "</span>"
        +"<p id ='" + list[i].latinbinomial + "'>'" +  list[i].latinbinomial + "'</p>"
        +"<p id = >" + list[i].plantpart + "</p>"
        +"<a href='#!' class='secondary-content'><i class='small material-icons' onclick=\"RemoveFromTea(\'" 
        +list[i].latinbinomial + "\')\">close</i></a>"
        +"</li>"
        console.log("'" + list[i].latinbinomial + "'")
    }
    return listEntries
}

// Updates the DOM with the compiled HTML list entries.
function UpdateHTML( teaOrHerb, listEntries ){
    if (teaOrHerb == "herb")
        document.getElementById('herbListMembers').innerHTML = listEntries
    if (teaOrHerb == "tea")
        document.getElementById('teaListMembers').innerHTML = listEntries
}

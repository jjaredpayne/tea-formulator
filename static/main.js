var selectedHerbName = "Lemon Balm";
var selectedHerbText = "Lemon balm (Melissa officinalis)[note 1] is a perennial herbaceous plant in the mint family and native to south-central Europe, the Mediterranean Basin, Iran, and Central Asia, but now naturalized elsewhere.";
var selectedlatinbinomial = "Melissa officinalis"
var selectedHerb = ''
var confirmedHerb = ''
var tealatinbinomial = ''
var fullHerb = ''

//Flavor attributes
var Bi = "<div> </div>"
var Sa = "<div> &nbsp</div>"
var Sw = "<div> &nbsp</div>"
var So = "<div> &nbsp</div>"
var Um = "<div> &nbsp</div>"
var Co= "<div> &nbsp</div>"
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

function resetFlavors () {
    Bi = "<div> &nbsp </div>"
    Sa = "<div> &nbsp</div>"
    Sw = "<div> &nbsp</div>"
    So = "<div> &nbsp</div>"
    Um = "<div> &nbsp</div>"
    Co= "<div> &nbsp</div>"
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

function SelectHerb( Herb ){
    // console.log("viewHerbInfo")
    return new Promise(function(resolve, reject){

        fullHerb = Herb;
        selectedHerb = JSON.parse(Herb.replaceAll("'", '"'));
        console.log(selectedHerb);

        selectedHerbName = selectedHerb.commonname;
        selectedlatinbinomial = decodeURI(selectedHerb.latinbinomial);
        selectedlatinbinomial = selectedlatinbinomial.replace(/\s+/g, '');
        selectedHerbPlantPart = selectedHerb.plantpart;
        UpdateHerbInfo( Herb )

    });
};

function SelectTeaHerb( latinbinomial ){
    return new Promise(function(resolve, reject){
        tealatinbinomial = latinbinomial
        console.log(tealatinbinomial);
        RemoveFromTea()
    });
};

function UpdateHerbInfo( Herb ){
    console.log("UpdateHerbInfo")
    return new Promise(function(resolve, reject){

        document.getElementById('herbImage').src = "static/" + selectedlatinbinomial + ".jpg";
        document.getElementById('herbName').innerText = selectedHerbName;
        document.getElementById('herbText').innerText = selectedHerbText;

        flavorHerb = JSON.parse(Herb.replaceAll("'", '"'));
        console.log(flavorHerb)
        console.log(flavorHerb.flavors)
        console.log(flavorHerb.flavors.Bi)
        resetFlavors();
        if (flavorHerb.flavors.Bi == 1)
            Bi="<div>Bitter</div>"
        if (flavorHerb.flavors.Sa == 1)
            Sa= "<div>Salty</div>"
        if (flavorHerb.flavors.Sw == 1)
            Sw= "<div>Sweet</div>"
        if (flavorHerb.flavors.So == 1)
            So= "<div>Sour</div>"
        if (flavorHerb.flavors.Um == 1)
            Um= "<div>Umami</div>"
        if (flavorHerb.flavors.Co == 1)
            Co= "<div>Cooling</div>"
        if (flavorHerb.flavors.Ea == 1)
            Ea= "<div>Earthy</div>"
        if (flavorHerb.flavors.Fl == 1)
            Fl= "<div>Floral</div>"
        if (flavorHerb.flavors.Fr == 1)
            Fr= "<div>Fruit</div>";
        if (flavorHerb.flavors.He == 1)
            He="<div>Herbaceous</div>"
        if (flavorHerb.flavors.Ho == 1)
            Ho= "<div>Hot</div>"
        if (flavorHerb.flavors.Nu == 1)
            Nu= "<div>Nutty</div>"
        if (flavorHerb.flavors.Pi == 1)
            Pi= "<div>Piney</div>"
        if (flavorHerb.flavors.Pu == 1)
            Pu= "<div>Pungent</div>"
        if (flavorHerb.flavors.Sa == 1)
            Sp= "<div>Spicy</div>"        
        if (flavorHerb.flavors.Sp == 1)
            Su= "<div>Sulfury</div>"
        if (flavorHerb.flavors.Wo == 1)
            Wo= "<div>Woody</div>"

        c1 = Bi + Sa + Sw + So + Um + Co + Ea + Fl + Fr
        c2 = He + Ho + Nu + Pi + Pu + Sp + Su + Wo

        document.getElementById('herbFlavorC1').innerHTML = c1;
        document.getElementById('herbFlavorC2').innerHTML = c2;

        confirmedHerb = fullHerb

    });
};

function AddToTea() {
        return new Promise(function (resolve, reject) {
            // document.getElementById('addToTeaButton').addEventListener('click', function (event) {
                console.log("fullHerb")
                var parsedFullHerb = JSON.parse(fullHerb.replaceAll("'", '"'));    
                var confirmedlatinebinomial = parsedFullHerb.latinbinomial;    
                var req = new XMLHttpRequest();

                reqURL = indexUrl + 'AddToTea' + '?fullHerb=' + fullHerb;
                console.log('reqURL:', reqURL);
                req.open('GET', reqURL, true);
                req.addEventListener("load", function () {
                    if (req.status >= 200 && req.status < 400) {
                        if (req.responseText !== '') {

                            var TeaList = req.responseText;

                            console.log("TeaList: " + TeaList)
                            TeaList = JSON.parse(TeaList)
                            console.log(typeof TeaList)
                            console.log(TeaList)

                            // console.log("JSON.parse: " + JSON.parse(req.responseText));
                            // let response = JSON.parse(req.responseText);

                            console.log(TeaList.length);


                            var teaListEntries =  ''

                            //Loop through TeaList and update HTML
                            for (var i = 0; i < TeaList.length ; i++){
                            // for(currentHerb in TeaList){
                                // console.log(typeof TeaList)
                                // console.log("CURRENT TeaList: " + TeaList.commonname)
                                // console.log("CURRENT Herb: " )
                                // console.log(TeaList[i] )
                                // currentHerb = TeaList[i]
                                //currentHerb= JSON.parse(TeaList[i])
                                currentHerb = TeaList[i]
                                console.log("TEALIST[i]")
                                console.log(TeaList[i].commonname)
                                console.log(typeof TeaList[i].commonname)
                                if(String(TeaList[i].commonname) == "TeaFlavors"){
                                    resetFlavors();
                                    if (TeaList[i].flavors.Bi >= 1)
                                        Bi="<div>Bitter</div>"
                                    if (TeaList[i].flavors.Sa >= 1)
                                        Sa= "<div>Salty</div>\n"
                                    if (TeaList[i].flavors.Sw >= 1)
                                        Sw= "<div>Sweet</div>"
                                    if (TeaList[i].flavors.So >= 1)
                                        So= "<div>Sour</div>"
                                    if (TeaList[i].flavors.Um >= 1)
                                        Um= "<div>Umami</div>"
                                    if (TeaList[i].flavors.Co >= 1)
                                        Co= "<div>Cooling</div>"
                                    if (TeaList[i].flavors.Ea >= 1)
                                        Ea= "<div>Earthy</div>"
                                    if (TeaList[i].flavors.Fl >= 1)
                                        Fl= "<div>Floral</div>"
                                    if (TeaList[i].flavors.Fr >= 1)
                                        Fr= "<div>Fruit</div>";
                                    if (TeaList[i].flavors.He >= 1)
                                        He="<div>Herbaceous</div>"
                                    if (TeaList[i].flavors.Ho >= 1)
                                        Ho= "<div>Hot</div>"
                                    if (TeaList[i].flavors.Nu >= 1)
                                        Nu= "<div>Nutty</div>"
                                    if (TeaList[i].flavors.Pi >= 1)
                                        Pi= "<div>Piney</div>"
                                    if (TeaList[i].flavors.Pu >= 1)
                                        Pu= "<div>Pungent</div>"
                                    if (TeaList[i].flavors.Sa >= 1)
                                        Sp= "<div>Spicy</div>"        
                                    if (TeaList[i].flavors.Sp >= 1)
                                        Su= "<div>Sulfury</div>"
                                    if (TeaList[i].flavors.Wo >= 1)
                                        Wo= "<div>Woody</div>"

                                    c1 = Bi + Sa + Sw + So + Um + Co + Ea + Fl + Fr
                                    c2 = He + Ho + Nu + Pi + Pu + Sp + Su + Wo
        
                                    document.getElementById('teaFlavorC1').innerHTML = c1;
                                    document.getElementById('teaFlavorC2').innerHTML = c2;
                                }
                                else{
                                    imgurl =TeaList[i].latinbinomial
                                    imgurl = imgurl.replaceAll(" ", '')
                                    imgurl += ".jpg"
                                    console.log("imgurl" + imgurl)

                                    teaListEntries += "<a href=\"#!\" class=\"collection-item avatar orange lighten-5\" onclick=\"SelectTeaHerb('"+TeaList[i].latinbinomial + "')\">"
                                        +"<img src=/static/" + imgurl + " class='circle'></img>"
                                        +"<span id='TeaList.commonname' class='title'>" + TeaList[i].commonname + "</span>"
                                        +"<p id ='" + TeaList[i].latinbinomial + "'>'" +  TeaList[i].latinbinomial + "'</p>"
                                        +"<p id = >" + TeaList[i].plantpart + "</p>"
                                        +"</a>"
                                        +"</li>"
                                }
                            }
                            
                            document.getElementById('teaListEntries').innerHTML = teaListEntries
                            // documentFragment.getElementById('teaFlavor').innerHTML = teaListEntries
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
            // });
        });
    }
    ;


    
function RemoveFromTea() {
    return new Promise(function (resolve, reject) {
        // document.getElementById('addToTeaButton').addEventListener('click', function (event) {
            console.log("fullHerb")
            var parsedFullHerb = JSON.parse(fullHerb.replaceAll("'", '"'));    
            var req = new XMLHttpRequest();

            reqURL = indexUrl + 'RemoveFromTea' + '?latinbinomial=' + tealatinbinomial;
            //console.log('reqURL:', reqURL);
            req.open('GET', reqURL, true);
            req.addEventListener("load", function () {
                if (req.status >= 200 && req.status < 400) {
                    if (req.responseText !== '') {

                        var TeaList = req.responseText;

                        //console.log("TeaList: " + TeaList)
                        TeaList = JSON.parse(TeaList)
                        //console.log(typeof TeaList)
                        //console.log(TeaList)

                        // console.log("JSON.parse: " + JSON.parse(req.responseText));
                        // let response = JSON.parse(req.responseText);

                        //console.log(TeaList.length);


                        var teaListEntries =  ''

                        //Loop through TeaList and update HTML
                        for (var i = 0; i < TeaList.length ; i++){
                        // for(currentHerb in TeaList){
                            // console.log(typeof TeaList)
                            // console.log("CURRENT TeaList: " + TeaList.commonname)
                            // console.log("CURRENT Herb: " )
                            console.log(TeaList[i] )
                            // currentHerb = TeaList[i]
                            // currentHerb= JSON.parse(TeaList[i])
                            currentHerb = TeaList[i]
                            console.log("TEALIST[i]")
                            console.log(TeaList[i].commonname)
                            console.log(typeof TeaList[i].commonname)
                            if(String(TeaList[i].commonname) == "TeaFlavors"){
                                resetFlavors();
                                if (TeaList[i].flavors.Bi >= 1)
                                    Bi="<div>Bitter</div>"
                                if (TeaList[i].flavors.Sa >= 1)
                                    Sa= "<div>Salty</div>\n"
                                if (TeaList[i].flavors.Sw >= 1)
                                    Sw= "<div>Sweet</div>"
                                if (TeaList[i].flavors.So >= 1)
                                    So= "<div>Sour</div>"
                                if (TeaList[i].flavors.Um >= 1)
                                    Um= "<div>Umami</div>"
                                if (TeaList[i].flavors.Co >= 1)
                                    Co= "<div>Cooling</div>"
                                if (TeaList[i].flavors.Ea >= 1)
                                    Ea= "<div>Earthy</div>"
                                if (TeaList[i].flavors.Fl >= 1)
                                    Fl= "<div>Floral</div>"
                                if (TeaList[i].flavors.Fr >= 1)
                                    Fr= "<div>Fruit</div>";
                                if (TeaList[i].flavors.He >= 1)
                                    He="<div>Herbaceous</div>"
                                if (TeaList[i].flavors.Ho >= 1)
                                    Ho= "<div>Hot</div>"
                                if (TeaList[i].flavors.Nu >= 1)
                                    Nu= "<div>Nutty</div>"
                                if (TeaList[i].flavors.Pi >= 1)
                                    Pi= "<div>Piney</div>"
                                if (TeaList[i].flavors.Pu >= 1)
                                    Pu= "<div>Pungent</div>"
                                if (TeaList[i].flavors.Sa >= 1)
                                    Sp= "<div>Spicy</div>"        
                                if (TeaList[i].flavors.Sp >= 1)
                                    Su= "<div>Sulfury</div>"
                                if (TeaList[i].flavors.Wo >= 1)
                                    Wo= "<div>Woody</div>"
                                    
                                c1 = Bi + Sa + Sw + So + Um + Co + Ea + Fl + Fr
                                c2 = He + Ho + Nu + Pi + Pu + Sp + Su + Wo
    
                                document.getElementById('teaFlavorC1').innerHTML = c1;
                                document.getElementById('teaFlavorC2').innerHTML = c2;
                            }
                            else{
                                imgurl =TeaList[i].latinbinomial
                                imgurl = imgurl.replaceAll(" ", '')
                                imgurl += ".jpg"
                                console.log("imgurl" + imgurl)

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
                    else {
                        console.log('error: reponse empty');
                    }
                } 
                else {
                    console.log("Error! " + req.statusText);
                }
        });
        req.send(null);
        // });
    });
}
;
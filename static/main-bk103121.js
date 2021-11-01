var selectedHerbName = "Lemon Balm";
var selectedHerbText = "Lemon balm (Melissa officinalis)[note 1] is a perennial herbaceous plant in the mint family and native to south-central Europe, the Mediterranean Basin, Iran, and Central Asia, but now naturalized elsewhere.";
var selectedlatinbinomial = "Melissa officinalis"
var selectedHerb = ''
var confirmedHerb = ''
var tealatinbinomial = ''

var indexUrl = 'http://127.0.0.1:5000/';


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
        UpdateHerbInfo()

    });
};

function SelectTeaHerb( latinbinomial ){
    return new Promise(function(resolve, reject){
        tealatinbinomial = latinbinomial
        console.log(tealatinbinomial);
        RemoveFromTea()
    });
};

function UpdateHerbInfo(){
    console.log("UpdateHerbInfo")
    return new Promise(function(resolve, reject){

        document.getElementById('herbImage').src = "static/" + selectedlatinbinomial + ".jpg";
        document.getElementById('herbName').innerText = selectedHerbName;
        document.getElementById('herbText').innerText = selectedHerbText;

        var B = "<div>1</div>"
        var Sa = "<div>2</div>"
        var Sw = "<div>3</div>"
        var So = "<div>4</div>"
        var U = "<div>5</div>"
        var C= "<div>6</div>"
        var E = "<div>7</div>"
        var Fl = "<div>8</div>"
        var Fr = "<div>9</div>"
        var He = "<div></div>"
        var Ho = "<div></div>"
        var N = "<div></div>"
        var Pi = "<div></div>"
        var Pu = "<div></div>"
        var Sp = "<div></div>"
        var Su = "<div></div>"
        var W = "<div></div>"

        fullHerb = fullHerb.replaceAll("'", '"');
        console.log("fullherb" + fullHerb)
        console.log("fullherb" + fullHerb["flavors"])
        console.log("fullherb" + fullHerb[0])
        console.log("fullherb" + fullHerb[1])

        if (fullHerb[0].B == "1")
            B="<div>Bitter</div>"
        if (fullHerb[0].Sa == 1)
            Sa= "<div>Salty</div>\n"
        if (fullHerb[0].Sw == 1)
            Sw= "<div>Sweet</div>"
        if (fullHerb[0].So == 1)
            So= "<div>Sour</div>"
        if (fullHerb[0].U == 1)
            U= "<div>Umami</div>"
        if (fullHerb[0].C == 1)
            Co= "<div>Cooling</div>"
        if (fullHerb[0].E == 1)
            Ea= "<div>Earthy</div>"
        if (fullHerb[0].Fl == 1)
            Fl= "<div>Floral</div>"
        if (fullHerb[0].Fr == 1)
            Fr= "<div>Fruit</div>";
        if (fullHerb[0].He == 1)
            He="<div>Herbaceous</div>"
        if (fullHerb[0].Ho == 1)
            Ho= "<div>Hot</div>"
        if (fullHerb[0].N == 1)
            N= "<div>Nutty</div>"
        if (fullHerb[0].Pi == 1)
            Pi= "<div>Piney</div>"
        if (fullHerb[0].Pu == 1)
            Pu= "<div>Pungent</div>"
        if (fullHerb[0].Sa == 1)
            Sp= "<div>Spicy</div>"        
        if (fullHerb[0].Sp == 1)
            Su= "<div>Sulfury</div>"
        if (fullHerb[0].W == 1)
            W= "<div>Woody</div>"

        c1 = B + Sa + Sw + So + U + C + E + Fl + Fr
        c2 = He + Ho + N + Pi + Pu + Sp + Su + W
        console.log(B)

        document.getElementById('herbFlavorC1').innerHTML = c1;
        document.getElementById('herbFlavorC2').innerHTML = c2;

        confirmedHerb = fullHerb

    });
};

function AddToTea() {
        return new Promise(function (resolve, reject) {
            // document.getElementById('addToTeaButton').addEventListener('click', function (event) {
                console.log("fullHerb")
                //var parsedFullHerb = JSON.parse(fullHerb.replaceAll("'", '"'));    
                //var confirmedlatinebinomial = parsedFullHerb.latinbinomial;    
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

                                teaListEntries += "<a href=\"#!\" class=\"collection-item avatar\" onclick=\"SelectTeaHerb('"+TeaList[i].latinbinomial + "')\">"
                                    +"<i class=\'material-icons circle\'>"+"wikiphoto"+"</i>"
                                    //+"<span id='"+ TeaList[i].commonname + "' class='title'>" + TeaList[i].commonname + "</span>"
                                    +"<span id='TeaList.commonname' class='title'>" + TeaList[i].commonname + "</span>"
                                    +"<p id ='" + TeaList[i].latinbinomial + "'>'" +  TeaList[i].latinbinomial + "'</p>"
                                    +"<p id = >" + TeaList[i].plantpart + "</p>"
                                    +"</a>"
                                    +"</li>"
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

                            teaListEntries += "<a href=\"#!\" class=\"collection-item avatar\" onclick=\"SelectTeaHerb('"+ TeaList[i].commonname + "', '"+TeaList[i].latinbinomial + "')\">"
                                +"<i class=\'material-icons circle\'>"+"wikiphoto"+"</i>"
                                //+"<span id='"+ TeaList[i].commonname + "' class='title'>" + TeaList[i].commonname + "</span>"
                                +"<span id='TeaList.commonname' class='title'>" + TeaList[i].commonname + "</span>"
                                +"<p id ='" + TeaList[i].latinbinomial + "'>'" +  TeaList[i].latinbinomial + "'</p>"
                                +"<p id = >" + TeaList[i].plantpart + "</p>"
                                +"</a>"
                                +"</li>"
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
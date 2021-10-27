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
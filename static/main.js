var selectedHerbName = "Lemon Balm";
var selectedHerbText = "Lemon balm (Melissa officinalis)[note 1] is a perennial herbaceous plant in the mint family and native to south-central Europe, the Mediterranean Basin, Iran, and Central Asia, but now naturalized elsewhere.";
var selectedlatinbinomial = "Melissa officinalis"
var selectedHerb = ''
var confirmedHerb = ""

var indexUrl = 'http://127.0.0.1:5000/';


function SelectHerb( Herb ){
    console.log("viewHerbInfo")
    return new Promise(function(resolve, reject){

        fullHerb = Herb;
        selectedHerb = JSON.parse(Herb.replaceAll("'", '"'));
        console.log(selectedHerb);

        selectedHerbName = selectedHerb.commonname;
        selectedlatinbinomial = decodeURI(selectedHerb.latinbinomial);
        selectedlatinbinomial = selectedlatinbinomial.replace(/\s+/g, '');
        selectedHerbPlantPart = selectedHerb.plantpart;

        if(selectedlatinbinomial == "Melissaofficinalis"){
            selectedHerbText = "Lemon balm (Melissa officinalis)[note 1] is a perennial herbaceous plant in the mint family and native to south-central Europe, the Mediterranean Basin, Iran, and Central Asia, but now naturalized elsewhere.";
        }
        if(selectedlatinbinomial == "Menthaspicata"){
            selectedHerbText = "Spear Mint Text";
        }

        console.log(selectedHerbName)
        console.log(selectedHerbPlantPart)
        console.log(selectedlatinbinomial)

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

                            var TeaList = req.responseText.replaceAll("'",'"');
                            console.log("TeaList" + TeaList)
                            console.log(typeof TeaList)
                            TeaList = JSON.stringify(TeaList)
                            console.log("TeaList" + TeaList)
                            console.log(typeof TeaList)
                            TeaList = JSON.parse(TeaList)
                            console.log("TeaList" + TeaList)
                            console.log(typeof TeaList)
                            TeaList = TeaList.split()


                            // console.log("JSON.parse: " + JSON.parse(req.responseText));
                            // let response = JSON.parse(req.responseText);
                            // console.log('response: ' + response.results);

                            var allHerbEntries = ''



                            //Loop through TeaList and update HTML
                            for (var teaHerb = 0; teaHerb < TeaList.length; teaHerb++){
                                currentHerb= JSON.parse(TeaList[teaHerb])
                                console.log(currentHerb)
                                console.log(currentHerb[teaHerb].commonname)

                               allHerbEntries += "<a href=\"#!\" class=\"collection-item avatar\" onclick=\"SelectHerb('"+ TeaList[teaHerb].commonname + "', '"+TeaList[teaHerb].latinbinomial + "')\">"
                                    +"<i class=\'material-icons circle\'>"+"wikiphoto"+"</i>"
                                    +"<span id='"+ TeaList[teaHerb].commonname + "' class='title'>" + TeaList[teaHerb].commonname + "</span>"
                                    +"<span id='TeaList.commonname' class='title'>" + TeaList[teaHerb].commonname + "</span>"
                                    +"<p id ='" + TeaList[teaHerb].latinbinomial + "'>'" +  TeaList[teaHerb].latinbinomial + "'</p>"
                                    +"<p id = >" + TeaList[teaHerb].plantpart + "</p>"
                                    +"</a>"
                                    +"</li>"
                            }
                            document.getElementById('TeaListEntries').innerHTML = allHerbEntries
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
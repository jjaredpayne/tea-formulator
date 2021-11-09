from flask import Flask, render_template, request, jsonify
import json
import urllib.parse
import requests
import wikipedia
import base64

app = Flask(__name__)

melissaofficinalis = {
    "commonname": "Lemon Balm",
    "latinbinomial": "Melissa officinalis",
    "plantpart": "Leaf",
    "image": "melissaofficinalis.jpg",
    "flavors":
    {
        "Bi": "0",
        "Sa": "1",
        "So": "0",
        "Sw": "1",
        "Um": "0",
        "Co": "1",
        "Ea": "0",
        "Fl": "1",
        "Fr": "0",
        "He": "1",
        "Ho": "0",
        "Nu": "0",
        "Pi": "0",
        "Pu": "0",
        "Sp": "0",
        "Su": "0",
        "Wo": "0"
    },
    "base64Image": ""
}
menthaspicata = {
    "commonname": "Spear Mint",
    "latinbinomial": "Mentha spicata",
    "plantpart": "Leaf",
    "image": "menthaspicata.jpg",
        "flavors":
    {
        "Bi": "1",
        "Sa": "0",
        "So": "1",
        "Sw": "0",
        "Um": "1",
        "Co": "0",
        "Ea": "1",
        "Fl": "0",
        "Fr": "0",
        "He": "0",
        "Ho": "0",
        "Nu": "0",
        "Pi": "0",
        "Pu": "0",
        "Sp": "0",
        "Su": "0",
        "Wo": "0"
    },
    "base64Image": ""
}
cinnamomumcassia = {
    "commonname": "Cassia",
    "latinbinomial": "Cinnamomum cassia",
    "plantpart": "Bark",
    "image": "cinnamomumcassia.jpg",
    "flavors":
    {
        "Bi": "1",
        "Sa": "0",
        "So": "0",
        "Sw": "0",
        "Um": "0",
        "Co": "0",
        "Ea": "0",
        "Fl": "0",
        "Fr": "0",
        "He": "0",
        "Ho": "0",
        "Nu": "0",
        "Pi": "0",
        "Pu": "0",
        "Sp": "0",
        "Su": "0",
        "Wo": "0"
    },
    "base64Image": ""
}
phytolaccaamericana = {
    "commonname": "Poke",
    "latinbinomial": "Phytolacca americana",
    "plantpart": "Fruit",
    "image": "phytolaccaamericana.jpg",
    "flavors":
    {
        "Bi": "1",
        "Sa": "0",
        "So": "0",
        "Sw": "0",
        "Um": "0",
        "Co": "0",
        "Ea": "0",
        "Fl": "0",
        "Fr": "0",
        "He": "0",
        "Ho": "0",
        "Nu": "0",
        "Pi": "0",
        "Pu": "0",
        "Sp": "0",
        "Su": "0",
        "Wo": "0"
    },
    "base64Image": ""
}
hypericumperforatum = {
    "commonname": "St. John's Wort",
    "latinbinomial": "Hypericum perforatum",
    "plantpart": "Leaf",
    "image": "hypericumperforatum.jpg",
    "flavors":
    {
        "Bi": "1",
        "Sa": "0",
        "So": "0",
        "Sw": "0",
        "Um": "0",
        "Co": "0",
        "Ea": "0",
        "Fl": "0",
        "Fr": "0",
        "He": "0",
        "Ho": "0",
        "Nu": "0",
        "Pi": "0",
        "Pu": "0",
        "Sp": "0",
        "Su": "0",
        "Wo": "0"
    },
    "base64Image": ""
}
passifloraincarnata = {
    "commonname": "Passionflower",
    "latinbinomial": "Passiflora incarnata",
    "plantpart": "Leaf and Stem",
    "image": "passifloraincarnata.jpg",
    "flavors":
    {
        "Bi": "1",
        "Sa": "0",
        "So": "0",
        "Sw": "0",
        "Um": "0",
        "Co": "0",
        "Ea": "0",
        "Fl": "0",
        "Fr": "0",
        "He": "0",
        "Ho": "0",
        "Nu": "0",
        "Pi": "0",
        "Pu": "0",
        "Sp": "0",
        "Su": "0",
        "Wo": "0"
    },
    "base64Image": ""
}
centellaasiatica = {
    "commonname": "Gotu Kola",
    "latinbinomial": "Centella asiatica",
    "plantpart": "Leaf and Stem",
    "image": "centellaasiatica.jpg",
    "flavors":
    {
        "Bi": "1",
        "Sa": "0",
        "So": "0",
        "Sw": "0",
        "Um": "0",
        "Co": "0",
        "Ea": "0",
        "Fl": "0",
        "Fr": "0",
        "He": "0",
        "Ho": "0",
        "Nu": "0",
        "Pi": "0",
        "Pu": "0",
        "Sp": "0",
        "Su": "0",
        "Wo": "0"
    },
    "base64Image": ""
}
arctostaphylosuvaursi = {
    "commonname": "Kinnickinick",
    "latinbinomial": "Arctostaphylos uva-ursi",
    "plantpart": "Leaf",
    "image": "arctostaphylosuva-ursi.jpg",
    "flavors":
    {
        "Bi": "1",
        "Sa": "0",
        "So": "0",
        "Sw": "0",
        "Um": "0",
        "Co": "0",
        "Ea": "0",
        "Fl": "0",
        "Fr": "0",
        "He": "0",
        "Ho": "0",
        "Nu": "0",
        "Pi": "0",
        "Pu": "0",
        "Sp": "0",
        "Su": "0",
        "Wo": "0"
    },
    "base64Image": ""
}
curcumalonga = {
    "commonname": "Turmeric",
    "latinbinomial": "Curcuma longa",
    "plantpart": "Rhizome",
    "image": "curcumalonga.jpg",
    "flavors":
    {
        "Bi": "1",
        "Sa": "0",
        "So": "0",
        "Sw": "0",
        "Um": "0",
        "Co": "0",
        "Ea": "0",
        "Fl": "0",
        "Fr": "0",
        "He": "0",
        "Ho": "0",
        "Nu": "0",
        "Pi": "0",
        "Pu": "0",
        "Sp": "0",
        "Su": "0",
        "Wo": "0"
    },
    "base64Image": ""
}
TeaFlavors = {
    "commonname": "TeaFlavors",
    "flavors":
    {
        "Bi": 0,
        "Sa": 0,
        "So": 0,
        "Sw": 0,
        "Um": 0,
        "Co": 0,
        "Ea": 0,
        "Fl": 0,
        "Fr": 0,
        "He": 0,
        "Ho": 0,
        "Nu": 0,
        "Pi": 0,
        "Pu": 0,
        "Sp": 0,
        "Su": 0,
        "Wo": 0
    },
    "base64Image": ""
}
HerbList = []
TeaList = [TeaFlavors]

def getWikiImage(wikiUrl):
    wikiText = requests.get('https://wikipedia-image-scraper.azurewebsites.net/getFirstImage?WikiUrl=' + wikiUrl )
    return wikiText.json()

@app.route("/", methods=['GET', 'POST'])
def teamain():
    print("are updates being reflected?")
    HerbList.append(melissaofficinalis)
    HerbList.append(menthaspicata)
    HerbList.append(cinnamomumcassia)
    HerbList.append(phytolaccaamericana)
    HerbList.append(hypericumperforatum)
    HerbList.append(passifloraincarnata)
    HerbList.append(centellaasiatica)
    HerbList.append(arctostaphylosuvaursi)
    HerbList.append(curcumalonga)

    # for herb in HerbList:
        # wikipage = herb['latinbinomial']
        # # Perform search for the wikipage (places results in
        # # an array)
        # result = wikipedia.search(wikipage)

        # # if the first result doesn't work, use the 2nd result
        # # if neither work, return an error
        # try:
        #     try:
        #         page = wikipedia.page(result[0])
        #     except:
        #         page = wikipedia.page(result[1])
        # except:
        #     return "Error. Wikipedia page not found."
        # wikiImageObject = getWikiImage(page.url)
        # print(wikiImageObject)
        # print(type(wikiImageObject))
        # # wikiImageObject = wikiImageObject.decode('utf8')
        # # print(type(wikiImageObject))
        # # wikiImageObject = jsonify(wikiImageObject)
        # # print(type(wikiImageObject))
        # # wikiImageObject = wikiImageObject.json()
        # # print(type(wikiImageObject))
        # herb['base64Image'] = wikiImageObject['firstImage']['base64']
        # print(herb)
    # Send herb dict object with render
    return render_template("index.html", HerbList=HerbList)

@app.route("/AddToTea", methods=['GET', 'POST'])
def addHerb():
    if request.method == "GET":
        addedHerb = request.args.get('herbToAdd', '')
        addedHerb = addedHerb.replace("'", '"')
        herbJSON = json.loads(addedHerb)
        print("addedHerb" + addedHerb)
        TeaList.append(herbJSON)
        # print("HERBJSON\n")
        # print(herbJSON)
        # print(herbJSON['flavors'])
        # print(type(herbJSON['flavors']))
        # print(herbJSON['flavors']['Bi'])
        # TeaFlavors['flavors']['Bi']
        modTeaFlavor("add", herbJSON)
    return jsonify(TeaList)

def modTeaFlavor(action, herbJSON):
    if action == "add":
        print(type(herbJSON))
        for flavor in TeaFlavors['flavors']:
            if herbJSON['flavors'][flavor] == "1":
                TeaFlavors['flavors'][flavor] += 1
                print("added 1 to: " + flavor)
                print("TeaTotal flavor: " + str(TeaFlavors['flavors'][flavor]))
    if action == "subtract":
        for flavor in TeaFlavors['flavors']:
            if herbJSON['flavors'][flavor] == "1":
                TeaFlavors['flavors'][flavor] -= 1
                # print("added 1 to: " + flavor)
                # print("TeaTotal flavor: " + str(TeaFlavors['flavors'][flavor]))
    
@app.route("/RemoveFromTea", methods=['GET', 'POST'])
def removeHerb():
    if request.method == "GET":
        latinbinomial = request.args.get('latinbinomial', '')
        # print(latinbinomial)
        # print(type(latinbinomial))
        for herb in TeaList:
            # print(herb)
            # print(type(str(herb)))
            if latinbinomial in str(herb):
                TeaList.remove(herb)
                # print("Herb Removed " + str(herb))
        # print("After Removal" + str(TeaList))
    modTeaFlavor("subtract", herb)

    return jsonify(TeaList)

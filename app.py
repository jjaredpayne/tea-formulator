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
        "Bi": 0,
        "Sa": 1,
        "So": 0,
        "Sw": 1,
        "Um": 0,
        "Co": 1,
        "Ea": 0,
        "Fl": 1,
        "Fr": 0,
        "He": 1,
        "Ho": 0,
        "Nu": 0,
        "Pi": 0,
        "Pu": 0,
        "Sp": 0,
        "Su": 0,
        "Wo": 0
    },
    "base64Image": "",
    "thumbnail": ""
}
menthaspicata = {
    "commonname": "Spear Mint",
    "latinbinomial": "Mentha spicata",
    "plantpart": "Leaf",
    "image": "menthaspicata.jpg",
        "flavors":
    {
        "Bi": 1,
        "Sa": 0,
        "So": 1,
        "Sw": 0,
        "Um": 1,
        "Co": 0,
        "Ea": 1,
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
    "base64Image": "",
    "thumbnail": ""
}
cinnamomumcassia = {
    "commonname": "Cassia",
    "latinbinomial": "Cinnamomum cassia",
    "plantpart": "Bark",
    "image": "cinnamomumcassia.jpg",
    "flavors":
    {
        "Bi": 1,
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
    "base64Image": "",
    "thumbnail": ""
}
phytolaccaamericana = {
    "commonname": "Poke",
    "latinbinomial": "Phytolacca americana",
    "plantpart": "Fruit",
    "image": "phytolaccaamericana.jpg",
    "flavors":
    {
        "Bi": 1,
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
    "base64Image": "",
    "thumbnail": ""
}
hypericumperforatum = {
    "commonname": "St. John's Wort",
    "latinbinomial": "Hypericum perforatum",
    "plantpart": "Leaf",
    "image": "hypericumperforatum.jpg",
    "flavors":
    {
        "Bi": 1,
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
    "base64Image": "",
    "thumbnail": ""
}
passifloraincarnata = {
    "commonname": "Passionflower",
    "latinbinomial": "Passiflora incarnata",
    "plantpart": "Leaf and Stem",
    "image": "passifloraincarnata.jpg",
    "flavors":
    {
        "Bi": 1,
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
    "base64Image": "",
    "thumbnail": ""
}
centellaasiatica = {
    "commonname": "Gotu Kola",
    "latinbinomial": "Centella asiatica",
    "plantpart": "Leaf and Stem",
    "image": "centellaasiatica.jpg",
    "flavors":
    {
        "Bi": 1,
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
    "base64Image": "",
    "thumbnail": ""
}
arctostaphylosuvaursi = {
    "commonname": "Kinnickinick",
    "latinbinomial": "Arctostaphylos uva-ursi",
    "plantpart": "Leaf",
    "image": "arctostaphylosuva-ursi.jpg",
    "flavors":
    {
        "Bi": 1,
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
    "base64Image": "",
    "thumbnail": ""
}
curcumalonga = {
    "commonname": "Turmeric",
    "latinbinomial": "Curcuma longa",
    "plantpart": "Rhizome",
    "image": "curcumalonga.jpg",
    "flavors":
    {
        "Bi": 1,
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
    "base64Image": "",
    "thumbnail": ""
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
    "base64Image": "",
    "thumbnail": ""
}
HerbList = []
TeaList = [TeaFlavors]

imgReq = {
    "img": "",
    "width": "",
    "height": ""
    }

def getWikiImage(wikiUrl):
    print("getWikiImage")
    wikiText = requests.get('https://wikipedia-image-scraper.azurewebsites.net/getFirstImage?WikiUrl=' + wikiUrl)
    return wikiText.json()

def getResizedImage(imgObj):
    print(imgObj)
    resizedImg = requests.post('http://wozniakr.pythonanywhere.com/resize', json=imgObj)
    print(resizedImg.text)
    return resizedImg.json()

@app.route("/requestImage", methods=['GET', 'POST'])
def requestImage():
    if request.method == "GET":
        print("requestImage")
        latinbinomial = request.args.get('latinbinomial', '')
        wikipage = latinbinomial
        print(wikipage)
        # Perform search for the wikipage (places results in
        # an array)
        result = wikipedia.search(wikipage)
        print(result)
        # if the first result doesn't work, use the 2nd result
        # if neither work, return an error
        try:
            try:
                page = wikipedia.page(result[0])
            except:
                page = wikipedia.page(result[1])
        except:
            return "Error. Wikipedia page not found."
        wikiImgObj = getWikiImage(page.url)
                
        imgReq['img'] = wikiImgObj['firstImage']['base64']
        imgReq['img'] = wikiImgObj['firstImage']['base64']
        imgReq['width'] = 41
        imgReq['height'] = 41

        thumbnailImgObj = getResizedImage(imgReq)
        print(thumbnailImgObj)

        for herb in HerbList:
            if herb['latinbinomial'] == latinbinomial:
                herb['base64Image'] = wikiImgObj['firstImage']['base64']
                herb['thumbnail'] = thumbnailImgObj['base64']
                return jsonify(herb)
        print(HerbList)


@app.route("/", methods=['GET', 'POST'])
def teamain():
    print("are updates being reflected?")
    HerbList.clear()
    HerbList.append(melissaofficinalis)
    HerbList.append(menthaspicata)
    HerbList.append(cinnamomumcassia)
    HerbList.append(phytolaccaamericana)
    HerbList.append(hypericumperforatum)
    HerbList.append(passifloraincarnata)
    HerbList.append(centellaasiatica)
    HerbList.append(arctostaphylosuvaursi)
    # HerbList.append(curcumalonga)

    # # Request image from WikiImageScraper
    # for herb in HerbList:
    #     print("herb: " + str(herb))
    #     wikipage = herb['latinbinomial']
    #     # Perform search for the wikipage (places results in
    #     # an array)
    #     result = wikipedia.search(wikipage)
    #     # if the first result doesn't work, use the 2nd result
    #     # if neither work, return an error
    #     try:
    #         try:
    #             page = wikipedia.page(result[0])
    #         except:
    #             page = wikipedia.page(result[1])
    #     except:
    #         return "Error. Wikipedia page not found."
    #     wikiImgObj = getWikiImage(page.url)

    #     imgReq['img'] = wikiImgObj['firstImage']['base64']
    #     imgReq['width'] = 41
    #     imgReq['height'] = 41

    #     thumbnailImgObj = getResizedImage(imgReq)

    #     herb['base64Image'] = wikiImgObj['firstImage']['base64']

    #     herb['thumbnail'] = thumbnailImgObj['base64']
    #     # print(herb)
    #     # Send herb dict object with render
    return render_template("index.html", HerbList=HerbList)

@app.route("/AddToTea", methods=['GET', 'POST'])
def addHerb():
    if request.method == "GET":
        addedHerb = request.args.get('herbToAdd', '')
        addedHerb = addedHerb.replace("'", '"')
        herbJSON = json.loads(addedHerb)
        for herb in HerbList:
            print(herb['latinbinomial'])
            print(herbJSON['latinbinomial'])
            if herb['latinbinomial'] == herbJSON['latinBinomial']:
                TeaList.append(herb)
                modTeaFlavor("add", herb)
                return jsonify(TeaList)
    if request.method == "POST":
        addedHerb = request.json
        # herbJSON = json.loads(addedHerb)
        print(addedHerb['latinbinomial'])
        for herb in HerbList:
            print(herb['latinbinomial'])
            print(addedHerb['latinbinomial'])
            if herb['latinbinomial'] == addedHerb['latinbinomial']:
                TeaList.append(herb)
                modTeaFlavor("add", herb)
                return jsonify(TeaList)

def modTeaFlavor(action, herbJSON):
    if action == "add":
        print("mod tea flavors " + str(herbJSON['flavors']))
        for flavor in TeaFlavors['flavors']:
            if herbJSON['flavors'][flavor] >= 1:
                TeaFlavors['flavors'][flavor] += 1
                print("mod tea flavors " + str(herbJSON['flavors']))
    if action == "subtract":
        for flavor in TeaFlavors['flavors']:
            if herbJSON['flavors'][flavor] == 1:
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


@app.route("/FilterHerbList", methods=['GET', 'POST'])
def filterList():
    if request.method == "GET":
        flavorFilter = request.args.get('flavorFilter', '')
        if flavorFilter == "rm":
            return jsonify(HerbList)
        FilteredList = []
        for herb in HerbList:
            if herb['flavors'][flavorFilter] >= 1:
                FilteredList.append(herb)
        return jsonify(FilteredList)

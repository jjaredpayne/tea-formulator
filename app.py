from flask import Flask, render_template, request, jsonify
import json
import urllib.parse
import requests
import wikipedia
import base64

app = Flask(__name__)

# object used to request resized image from Microservice
imgReq = {
    "img": "",
    "width": "",
    "height": ""
    }



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
    "commonname": "St Johns Wort",
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

# Contains the herb objects to be displayed on the herb list 
HerbList = []

# Contains the herb objects to be displayed on the tea list, 
# as well as the totalled Tea Flavors object
TeaList = [TeaFlavors]

# Requests Image from Charlie Chi Hang Leung's Wikipedia image scraper microservice
def getWikiImage(wikiUrl):
    print("getWikiImage")
    wikiText = requests.get('https://wikipedia-image-scraper.azurewebsites.net/getFirstImage?WikiUrl=' + wikiUrl)
    return wikiText.json()

# Requests Image from Rachel Wozniak's image resizing microservice
def getResizedImage(imgObj):
    print(imgObj)
    resizedImg = requests.post('http://wozniakr.pythonanywhere.com/resize', json=imgObj)
    print(resizedImg.text)
    return resizedImg.json()

@app.route("/requestImage", methods=['GET', 'POST'])
def requestImage():
    if request.method == "GET":
        latinbinomial = request.args.get('latinbinomial', '')

        # If the image has already been retrieved, simply return the herb object
        for herb in HerbList:
            if herb['latinbinomial'] == latinbinomial:
                herb['base64Image'] != ''
                return jsonify(herb)

        # Perform Wikipedia search for latinbinomial and retrieve the first valid
        # page.
        wikipage = latinbinomial
        result = wikipedia.search(wikipage, results=2)
        try:
            try:
                page = wikipedia.page(result[0])
            except:
                page = wikipedia.page(result[1])
        except:
            return "Error. Wikipedia page not found."
        
        # Submit the retrieved Wikipedia page URL to the Wikipedia Image Scraper 
        # Microservice
        wikiImgObj = getWikiImage(page.url)
                 
        # Populate the image request object with the image string, and the requested
        # picture dimensions.
        imgReq['img'] = wikiImgObj['firstImage']['base64']
        imgReq['width'] = 41
        imgReq['height'] = 41

        # Submit the image request object to the Resize Image microservice and assign
        thumbnailImgObj = getResizedImage(imgReq)

        # Find the matching herb and insert the images into the object.
        # Return the jsonified object.
        for herb in HerbList:
            if herb['latinbinomial'] == latinbinomial:
                herb['base64Image'] = wikiImgObj['firstImage']['base64']
                herb['thumbnail'] = thumbnailImgObj['base64']
                return jsonify(herb)

# Populates herb list on page load and renders the page.
@app.route("/", methods=['GET', 'POST'])
def teamain():
    HerbList.clear()
    HerbList.append(melissaofficinalis)
    HerbList.append(menthaspicata)
    HerbList.append(cinnamomumcassia)
    HerbList.append(phytolaccaamericana)
    HerbList.append(hypericumperforatum)
    HerbList.append(passifloraincarnata)
    HerbList.append(centellaasiatica)
    HerbList.append(arctostaphylosuvaursi)

    return render_template("index.html", HerbList=HerbList)

# Recieves an Herb object json file, adds the herb to the tea list, and
# updates the totalled tea flavors.
@app.route("/AddToTea", methods=['GET', 'POST'])
def addHerb():
    if request.method == "POST":
        print("JSON " + str(request.json))
        herbToAdd = request.json
        print(herbToAdd['latinbinomial'])
        for herb in TeaList:
            if herb['commonname'] == 'TeaFlavors':
                print("TeaFlavor")
            elif herb['latinbinomial'] == herbToAdd['latinbinomial']:
                return jsonify(TeaList)
        TeaList.append(herbToAdd)
        modTeaFlavor("add", herbToAdd)
        return jsonify(TeaList)

# Adds or subtracts the passed herb's flavor from the totalled tea flavors
def modTeaFlavor(addOrSub, herbJSON):
    if addOrSub == "add":
        for flavor in TeaFlavors['flavors']:
            if herbJSON['flavors'][flavor] >= 1:
                TeaFlavors['flavors'][flavor] += 1
    if addOrSub == "subtract":
        for flavor in TeaFlavors['flavors']:
            if herbJSON['flavors'][flavor] == 1:
                TeaFlavors['flavors'][flavor] -= 1

# Recieves the latinbinomial of an herb, removes it from the tea list
# and updates the totalled herb flavors
@app.route("/RemoveFromTea", methods=['GET', 'POST'])
def removeHerb():
    if request.method == "GET":
        latinbinomial = request.args.get('latinbinomial', '')
        for herb in TeaList:
            if latinbinomial in str(herb):
                TeaList.remove(herb)
    modTeaFlavor("subtract", herb)

    return jsonify(TeaList)

# Recieves a flavor, and rebuilds the herb list with only herbs
# containing that flavor.
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
        
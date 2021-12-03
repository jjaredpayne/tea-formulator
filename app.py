from flask import Flask, render_template, request, jsonify
# import json
# import urllib.parse
import requests
import wikipedia
# import base64

app = Flask(__name__)

# object used to request resized image from Microservice
img_req = {
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
        "Sa": 0,
        "So": 0,
        "Sw": 0,
        "Um": 0,
        "Co": 0,
        "Ea": 0,
        "Fl": 1,
        "Fr": 1,
        "He": 1,
        "Ho": 0,
        "Nu": 0,
        "Pi": 0,
        "Pu": 0,
        "Sp": 0,
        "Su": 1,
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
        "Bi": 0,
        "Sa": 0,
        "So": 0,
        "Sw": 0,
        "Um": 0,
        "Co": 1,
        "Ea": 1,
        "Fl": 0,
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
        "Ea": 1,
        "Fl": 0,
        "Fr": 0,
        "He": 0,
        "Ho": 1,
        "Nu": 0,
        "Pi": 0,
        "Pu": 0,
        "Sp": 1,
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
        "Bi": 0,
        "Sa": 0,
        "So": 0,
        "Sw": 0,
        "Um": 0,
        "Co": 1,
        "Ea": 0,
        "Fl": 0,
        "Fr": 0,
        "He": 0,
        "Ho": 0,
        "Nu": 0,
        "Pi": 0,
        "Pu": 1,
        "Sp": 0,
        "Su": 1,
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
        "Bi": 0,
        "Sa": 0,
        "So": 0,
        "Sw": 0,
        "Um": 1,
        "Co": 0,
        "Ea": 0,
        "Fl": 0,
        "Fr": 1,
        "He": 0,
        "Ho": 0,
        "Nu": 0,
        "Pi": 0,
        "Pu": 1,
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
        "Bi": 0,
        "Sa": 0,
        "So": 0,
        "Sw": 0,
        "Um": 0,
        "Co": 0,
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
        "Um": 1,
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
        "Su": 1,
        "Wo": 1
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
        "Sa": 1,
        "So": 0,
        "Sw": 0,
        "Um": 0,
        "Co": 0,
        "Ea": 0,
        "Fl": 0,
        "Fr": 0,
        "He": 0,
        "Ho": 0,
        "Nu": 1,
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
        "Ea": 1,
        "Fl": 0,
        "Fr": 0,
        "He": 0,
        "Ho": 0,
        "Nu": 1,
        "Pi": 0,
        "Pu": 0,
        "Sp": 1,
        "Su": 0,
        "Wo": 0
    },
    "base64Image": "",
    "thumbnail": ""
}
tea_flavors = {
    "commonname": "tea_flavors",
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
herb_list = []

# Contains the herb objects to be displayed on the tea list,
# as well as the totalled Tea Flavors object
tea_list = [tea_flavors]


# Requests Image from Charlie Chi Hang Leung's Wikipedia
# image scraper microservice
def getWikiImage(wiki_url):
    img_scraper = "https://wiki-image.herokuapp.com/getFirstImage?WikiUrl="
    print("Requesting from: " + img_scraper + wiki_url)
    wiki_img = requests.get(img_scraper + wiki_url)
    return wiki_img.json()


# Requests Image from Rachel Wozniak's image resizing microservice
def getResizedImage(img_obj):
    print("getting resized image")
    resized_img = requests.post('http://wozniakr.pythonanywhere.com/resize',
                                json=img_obj)
    return resized_img.json()


@app.route("/requestImage", methods=['GET', 'POST'])
def requestImage():
    if request.method == "GET":
        latinbinomial = request.args.get('latinbinomial', '')
        print('request image')
        # If the image has already been retrieved, simply return the
        # herb object
        for herb in herb_list:
            print('Checking if image already exists...')
            if herb['latinbinomial'] == latinbinomial:
                if herb['base64Image'] != '':
                    return jsonify(herb)

        # Perform Wikipedia search for latinbinomial and retrieve the
        # first valid page
        wikipage = latinbinomial
        result = wikipedia.search(wikipage, results=2)
        try:
            try:
                page = wikipedia.page(result[0])
            except Exception:
                page = wikipedia.page(result[1])
        except Exception:
            return "Error. Wikipedia page not found."
        print("Wikipage found: " + page.url)
        # Submit the retrieved Wikipedia page URL to the Wikipedia Image
        # Scraper Microservice
        wiki_img_obj = getWikiImage(page.url)
        # Populate the image request object with the image string, and the
        # requested picture dimensions.
        img_req['img'] = wiki_img_obj['firstImage']['base64']
        img_req['width'] = 41
        img_req['height'] = 41

        # Submit the image request object to the Resize Image microservice
        # and assign
        thumbnail_img_obj = getResizedImage(img_req)

        # Find the matching herb and insert the images into the object.
        # Return the jsonified object.
        for herb in herb_list:
            if herb['latinbinomial'] == latinbinomial:
                herb['base64Image'] = wiki_img_obj['firstImage']['base64']
                herb['thumbnail'] = thumbnail_img_obj['base64']
                print(herb)
                return jsonify(herb)


# Populates herb list on page load and renders the page.
@app.route("/", methods=['GET', 'POST'])
def teamain():
    herb_list.clear()
    herb_list.append(melissaofficinalis)
    herb_list.append(menthaspicata)
    herb_list.append(cinnamomumcassia)
    herb_list.append(phytolaccaamericana)
    herb_list.append(hypericumperforatum)
    herb_list.append(passifloraincarnata)
    herb_list.append(centellaasiatica)
    herb_list.append(arctostaphylosuvaursi)

    return render_template("index.html", HerbList=herb_list)


# Recieves an Herb object json file, adds the herb to the tea list, and
# updates the totalled tea flavors.
@app.route("/AddToTea", methods=['GET', 'POST'])
def addHerb():
    if request.method == "POST":
        print("JSON " + str(request.json))
        herb_to_add = request.json
        print(herb_to_add['latinbinomial'])
        for herb in tea_list:
            print(herb_to_add['latinbinomial'])
            if herb['commonname'] == 'tea_flavors':
                print("tea_flavor")
            # Do not add an herb if it's already in the list
            elif herb['latinbinomial'] == herb_to_add['latinbinomial']:
                return jsonify(tea_list)
        for herb in herb_list:
            if herb['latinbinomial'] == herb_to_add['latinbinomial']:
                tea_list.append(herb)
        mod_tea_flavor("add", herb_to_add)
        return jsonify(tea_list)


# Adds or subtracts the passed herb's flavor from the totalled tea flavors
def mod_tea_flavor(add_or_sub, herb_json):
    if add_or_sub == "add":
        for flavor in tea_flavors['flavors']:
            if herb_json['flavors'][flavor] >= 1:
                tea_flavors['flavors'][flavor] += 1
    if add_or_sub == "subtract":
        for flavor in tea_flavors['flavors']:
            if herb_json['flavors'][flavor] == 1:
                tea_flavors['flavors'][flavor] -= 1


# Recieves the latinbinomial of an herb, removes it from the tea list
# and updates the totalled herb flavors
@app.route("/RemoveFromTea", methods=['GET', 'POST'])
def removeHerb():
    if request.method == "GET":
        latinbinomial = request.args.get('latinbinomial', '')
        for herb in tea_list:
            if latinbinomial in str(herb):
                tea_list.remove(herb)
    mod_tea_flavor("subtract", herb)
    return jsonify(tea_list)


# Recieves a flavor, and rebuilds the herb list with only herbs
# containing that flavor.
@app.route("/FilterHerbList", methods=['GET', 'POST'])
def filterList():
    if request.method == "GET":
        flavorFilter = request.args.get('flavorFilter', '')
        if flavorFilter == "rm":
            return jsonify(herb_list)
        FilteredList = []
        for herb in herb_list:
            if herb['flavors'][flavorFilter] >= 1:
                FilteredList.append(herb)
        return jsonify(FilteredList)

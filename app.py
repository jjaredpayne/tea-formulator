from flask import Flask, render_template, request, jsonify
import json
import urllib.parse

app = Flask(__name__)

# class Herb:
#   def __init__(self, commonname, latinbinomial, plantpart):
#     self.commonname = commonname
#     self.latinbinomial = latinbinomial
#     self.plantpart = plantpart

melissaofficinalis = {
        "flavors": [
        {
            "B": "1",
            "Sa": "0",
            "So": "0",
            "Sw": "0",
            "U": "0",
            "C": "0",
            "E": "0",
            "Fl": "0",
            "Fr": "0",
            "He": "0",
            "Ho": "0",
            "N": "0",
            "Pi": "0",
            "Pu": "0",
            "Sp": "0",
            "Su": "0",
            "W": "0",
        }
    ],
    "commonname": "Lemon Balm",
    "latinbinomial": "Melissa officinalis",
    "plantpart": "Leaf",
}
menthaspicata = {
    "commonname": "Spear Mint",
    "latinbinomial": "Mentha spicata",
    "plantpart": "Leaf"
}
cinnamomumcassia = {"commonname": "Cassia",
    "latinbinomial": "Cinnamomum cassia",
    "plantpart": "Bark"
}
phytolaccaamericana = {
    "commonname": "Poke",
    "latinbinomial": "Phytolacca americana",
    "plantpart": "Fruit"
}
hypericumperforatum = {
    "commonname": "St. John's Wort",
    "latinbinomial": "Hypericum perforatum",
    "plantpart": "Leaf"
}
passifloraincarnata = {
    "commonname": "Passionflower",
    "latinbinomial": "Passiflora incarnata",
    "plantpart": "Leaf and Stem"
}
centellaasiatica = {
    "commonname": "Gotu Kola",
    "latinbinomial": "Centella asiatica",
    "plantpart": "Leaf and Stem"
}
arctostaphylosuvaursi = {
    "commonname": "Kinnickinick",
    "latinbinomial": "Arctostaphylos uvaursi",
    "plantpart": "Leaf"
}
curcumalonga = {
    "commonname": "Turmeric",
    "latinbinomial": "Curcuma longa",
    "plantpart": "Rhizome"
}

HerbList = []
TeaList = []


@app.route("/", methods=['GET', 'POST'])
def teamain():

    HerbList.append(melissaofficinalis)
    HerbList.append(menthaspicata)
    HerbList.append(cinnamomumcassia)
    HerbList.append(phytolaccaamericana)
    HerbList.append(hypericumperforatum)
    HerbList.append(passifloraincarnata)
    HerbList.append(centellaasiatica)
    HerbList.append(arctostaphylosuvaursi)
    HerbList.append(curcumalonga)

    print("HerbList " + str(HerbList))

    return render_template("index.html", HerbList=HerbList, TeaList=TeaList)


@app.route("/AddToTea", methods=['GET', 'POST'])
def addHerb():
    if request.method == "GET":
        addedHerb = request.args.get('fullHerb', '')
        addedHerb = addedHerb.replace("'", '"')
        herbJSON = json.loads(addedHerb)
        print(herbJSON)
        print(type(herbJSON))
        TeaList.append(herbJSON)
        print("teaList" + str(TeaList))

    return jsonify(TeaList)


@app.route("/RemoveFromTea", methods=['GET', 'POST'])
def removeHerb():
    if request.method == "GET":
        latinbinomial = request.args.get('latinbinomial', '')
        print(latinbinomial)
        print(type(latinbinomial))
        for herb in TeaList:
            print(herb)
            print(type(str(herb)))
            if latinbinomial in str(herb):
                TeaList.remove(herb)
                print("Herb Removed " + str(herb))
        print("After Removal" + str(TeaList))

    return jsonify(TeaList)

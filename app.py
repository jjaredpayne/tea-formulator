from flask import Flask, render_template, request, jsonify
import json
import urllib.parse

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
    }
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
    }
}
cinnamomumcassia = {"commonname": "Cassia",
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
    }
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
    }
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
    }
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
    }
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
    }
}
arctostaphylosuvaursi = {
    "commonname": "Kinnickinick",
    "latinbinomial": "Arctostaphylos uvaursi",
    "plantpart": "Leaf",
    "image": "arctostaphylosuvaursi.jpg",
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
    }
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
    }
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
    }
}
HerbList = []
TeaList = [TeaFlavors]

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

    # Send herb dict object with render
    return render_template("index.html", HerbList=HerbList)

@app.route("/AddToTea", methods=['GET', 'POST'])
def addHerb():
    if request.method == "GET":
        addedHerb = request.args.get('herbToAdd', '')
        addedHerb = addedHerb.replace("'", '"')
        herbJSON = json.loads(addedHerb)
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
        for flavor in TeaFlavors['flavors']:
            if herbJSON['flavors'][flavor] == "1":
                TeaFlavors['flavors'][flavor] += 1
                print("added 1 to: " + flavor)
                print("TeaTotal flavor: "+ str(TeaFlavors['flavors'][flavor]))
    if action == "subtract":
        for flavor in TeaFlavors['flavors']:
            if herbJSON['flavors'][flavor] == "1":
                TeaFlavors['flavors'][flavor] -= 1
                print("added 1 to: " + flavor)
                print("TeaTotal flavor: " + str(TeaFlavors['flavors'][flavor]))
    
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
    modTeaFlavor("subtract", herb)

    return jsonify(TeaList)

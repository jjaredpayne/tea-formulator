from flask import Flask, render_template, request
import json
import urllib.parse

app = Flask(__name__)

# class Herb:
#   def __init__(self, commonname, latinbinomial, plantpart):
#     self.commonname = commonname
#     self.latinbinomial = latinbinomial
#     self.plantpart = plantpart

melissaofficinalis = {"commonname": "Lemon Balm", "latinbinomial": "Melissa officinalis", "plantpart": "Leaf"}
menthaspicata = {"commonname": "Spear Mint", "latinbinomial": "Mentha spicata", "plantpart": "Leaf"}
cinnamomumcassia = {"commonname": "Cassoa", "latinbinomial": "Cinnamomum cassia", "plantpart": "Bark"}

HerbList = []
TeaList = []

@app.route("/", methods=['GET', 'POST'])
def teamain():

    # melissaofficinalis = Herb("Lemon Balm", "Melissa officinalis", "Leaf")
    # menthaspicata = Herb( "Spear Mint", "Mentha spicata", "Leaf" )
    # cinnamomumcassia = Herb("Cassia", "Cinnamomum cassia", "Bark")
    # phytolaccaamericana = Herb("Poke", "Phytolacca americana", "Fruit")
    # hypericumperforatum = Herb("St. John's Wort", "Hypericum perforatum", "Leaf and Stems")
    # passifloraincarnata = Herb("Passionflower", "Passiflora incarnata", "Leaf and Stems")
    # centellaasiatica = Herb("Gotu Kola", "Centella Asiatica", "Leaf")
    # arctostaphylosuvaursi = Herb("Kinnickinick", "Arctostaphylos uva-ursi", "Leaf")
    # curcumalonga = Herb("Tumeric", "Curcuma long", "Rhizome")

    print(melissaofficinalis)
    print(type(melissaofficinalis))
    HerbList.append(melissaofficinalis)
    HerbList.append(menthaspicata)
    HerbList.append(cinnamomumcassia)
    # HerbList.append(phytolaccaamericana)
    # HerbList.append(hypericumperforatum)
    # HerbList.append(passifloraincarnata)
    # HerbList.append(centellaasiatica)
    # HerbList.append(arctostaphylosuvaursi)
    # HerbList.append(curcumalonga)

    print("HerbList " + str(HerbList))

    return render_template("index.html", HerbList = HerbList, TeaList = TeaList)

@app.route("/AddToTea", methods=['GET', 'POST'])
def addHerb():
    if request.method == "GET":
        addedHerb = request.args.get('fullHerb', '')
        addedHerb = addedHerb.replace("'",'"')
        herbJSON = json.loads(addedHerb)
        print(herbJSON)
        print(type(herbJSON))    
        TeaList.append(herbJSON)
        print("teaList" + str(TeaList))

    return str(TeaList)
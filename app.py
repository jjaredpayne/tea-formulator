from flask import Flask, render_template

app = Flask(__name__)

class Herb:
  def __init__(self, commonname, latinbinomial, plantpart):
    self.commonname = commonname
    self.latinbinomial = latinbinomial
    self.plantpart = plantpart

@app.route("/")
def teamain():

    melissaofficinalis = Herb("Lemon Balm", "Melissa officinalis", "Leaf")
    menthaspicata = Herb( "Spear Mint", "Mentha spicata", "Leaf" )
    cinnamomumcassia = Herb("Cassia", "Cinnamomum cassia", "Bark")
    phytolaccaamericana = Herb("Poke", "Phytolacca americana", "Fruit")
    hypericumperforatum = Herb("St. John's Wort", "Hypericum perforatum", "Leaf and Stems")
    passifloraincarnata = Herb("Passionflower", "Passiflora incarnata", "Leaf and Stems")
    centellaasiatica = Herb("Gotu Kola", "Centella Asiatica", "Leaf")
    arctostaphylosuvaursi = Herb("Kinnickinick", "Arctostaphylos uva-ursi", "Leaf")
    curcumalonga = Herb("Tumeric", "Curcuma long", "Rhizome")

    HerbList = []

    HerbList.append(melissaofficinalis)
    HerbList.append(menthaspicata)
    HerbList.append(cinnamomumcassia)
    HerbList.append(phytolaccaamericana)
    HerbList.append(hypericumperforatum)
    HerbList.append(passifloraincarnata)
    HerbList.append(centellaasiatica)
    HerbList.append(arctostaphylosuvaursi)
    HerbList.append(curcumalonga)

    print(HerbList)

    return render_template("index.html", HerbList = HerbList, Test = "Test")



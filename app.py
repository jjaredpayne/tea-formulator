from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def teamain():
    
    title = "Tea Formulator Home"
    paragraph = "WOW"

    return render_template("index.html", title = title, paragraph = paragraph)

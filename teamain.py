from flask import Flask

app = Flask(_name_)

@app.rout("/")
def index():
    return "Hello World!"

from flask import Flask, redirect, url_for, render_template, request, jsonify
from lightSniff import groups
from blind_control import *

app = Flask(__name__)

devices = ["lights", "blinds"]

@app.route('/')
@app.route('/home/')
def home():
    return render_template('home.html', devices = devices, groups = groups) #level = level

@app.route('/blinds/', methods = ['GET', 'POST'])
def blinds():
    if request.method == "POST":
        print(request.form['direction'])
        if request.form['direction']  == 'close':
            #print(blindState['level'])
            blindState['level'] -= 1
            #print(blindState['level'])
        if request.form['direction'] == 'open':
            blindState['level'] += 1
            #print(blindState['level'])
    return jsonify(blindState)

@app.route('/security/')
def security():
    return render_template('security.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

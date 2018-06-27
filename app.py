from flask import Flask, redirect, url_for, render_template, request, jsonify
app = Flask(__name__)

from nodes import *

devices = ["lights", "blinds"]

@app.route('/')
@app.route('/home/')
def home():
    return render_template('home.html', devices=devices)


@app.route('/lights/', methods=['GET', 'POST'])
def lights():
    return render_template('Lights.html')


@app.route('/blinds/', methods=['GET', 'POST'])
def blinds():
    return render_template('blinds.html')


@app.route('/security/')
def security():
    return render_template('security.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

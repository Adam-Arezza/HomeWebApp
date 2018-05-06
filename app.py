from flask import Flask, redirect, url_for, render_template, request, jsonify
app = Flask(__name__)


@app.route('/')
@app.route('/home/')
def home():
    return render_template('home.html')

#Route for the light control page
#contains function calls for controlling the lights
#check huelight.py for light functions
@app.route('/lights/', methods=['GET', 'POST'])
def lights():
    ##if request.method == 'POST':
        ##location = request.form['location']
        ##state = request.form['state']
        ##lightcontrol(location, state)
    return render_template('Lights.html')

@app.route('/lights/dimmer/', methods=['POST'])
def lightDimmer():
    print(request.form)
    if request.method == 'POST':
        a = request.form['dimSet']
        res = dimmer(a)
        return jsonify(success=res, message="Dimming light")
    else:
        return jsonify(success=False, message="no dim")


@app.route('/blinds/', methods=['GET','POST'])
def blinds():
    if request.method == "POST":
        a = request.form['blinds']
        command(a)
    return render_template('blinds.html')


@app.route('/security/')
def security():
    return render_template('security.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

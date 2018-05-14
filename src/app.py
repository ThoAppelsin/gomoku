from flask import Flask, request, render_template, url_for, jsonify
app = Flask(__name__)

@app.route("/", methods=['GET', 'POST', 'DELETE'])
def hello():
    if request.method == 'GET':
        print('got it')
        return render_template('app.html')
    elif request.method == 'POST':
        data = request.get_json()
        print('received', data)

        return jsonify({'r': 3, 'c': 2, 'winner': 'you'})

    else:
        print('deleting all')

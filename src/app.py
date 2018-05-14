from flask import Flask, request, render_template
app = Flask(__name__)

@app.route("/", methods=['GET', 'POST', 'DELETE'])
def hello():
    if request.method == 'GET':
        print('got it')
        return render_template('app.html')
    elif request.method == 'POST':
        print('received', request.get_json())
    else:
        print('deleting all')
    return "Hello World!"

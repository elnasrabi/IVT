
from flask import Flask, request, jsonify

from pytds import login
import sqlalchemy as sa
from sqlalchemy import create_engine
import sqlalchemy_pytds

from sql_connection import get_sql_connection
from flask_cors import CORS

import json
import rules
import exceptions
import admin



#app = FastAPI()

app = Flask(__name__)

CORS(app, support_credentials=True)

connection = get_sql_connection()

# Rule Master

@app.route('/getRules', methods=['GET'])
def get_rules():
    response = rules.get_all_rules(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteRule', methods=['POST'])
def delete_Rule():
   # return_id = rules.delete_rule(connection, request.form['rule_id'])
    print('Call Started')
    rule_id_data = request.get_json()
    print('param data',rule_id_data['rule_id'])
    # x=rule_id_data['rule_id']
    # print('x param data',x['rule_id'])
    Msg = rules.delete_rule(connection, rule_id_data['rule_id'])
  
   
    # rule_id_json = Todo(content=todo_data['content'])
    # return_id_json = rules.delete_rule(connection, request.form['rule_id'])
    response = jsonify({
        'rule_id': rule_id_data,
         'Msg': Msg,
         
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response',response)
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    # response.headers.add('Access-Control-Allow-Credentials', 'true')
    # response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    # response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept     ')
   
    return response


@app.route('/saveRule', methods=['POST'])
def insert_new_rule():
    request_payload = json.loads(request.form['data'])
    Msg = rules.insert_new_rule(connection, request_payload)
    response = jsonify({
        'Msg': Msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/editRule', methods=['GET','POST'])
def Edit_rule():
    request_payload = json.loads(request.form['data'])
    Msg = rules.edit_rule(connection, request_payload)
    response = jsonify({
        'Msg': Msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Exceptions




@app.route('/exception/getCurrentException', methods=['GET'])
def get_exception():
    response = exceptions.get_all_current_exceptions(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/exception/heldConnote', methods=['POST'])
def held_connote():
    request_payload = request.get_json()
    resultcode = exceptions.heldConnote(connection, request_payload)
    response = jsonify({
        'Msg': resultcode
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/exception/heldBulkConnote', methods=['POST'])
def held_bulk_connote():
    request_payload = request.get_json()
    resultcode = exceptions.heldBulkConnoteTest(connection, request_payload)
    response = jsonify({
        'Msg': resultcode
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


#------Admin----------------------
@app.route('/rules/getPrefixes', methods=['GET'])
def get_prefixes():
    response = admin.get_prefixes(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/updatePrefix', methods=['POST'])
def update_single_prefixs():
    request_payload = request.get_json()
    msg = admin.updatePrefix(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/deletePrefix', methods=['POST'])
def delete_single_prefixs():
    request_payload = request.get_json()
    msg = admin.deletePrefix(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/newPrefix', methods=['POST'])
def new_prefixs():
    request_payload = request.get_json()
    msg = admin.newPrefix(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/runIVT', methods=['POST'])
def run_IVT():
    request_payload = request.get_json()
    msg = admin.runIVT(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    

if __name__ == "__main__":
    print("Starting Python Flask Server")
    app.run(port=4545)
    # CORS(app)

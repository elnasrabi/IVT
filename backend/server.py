
from flask import Flask, request, jsonify

from sql_connection import get_sql_connection
from flask_cors import CORS

import json
import rules

from typing import Optional

from fastapi import FastAPI

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
    return_id = rules.delete_rule(connection, request.form['rule_id'])
    rule_id_data = request.get_json()
    print(rule_id_data)
    # rule_id_json = Todo(content=todo_data['content'])
    # return_id_json = rules.delete_rule(connection, request.form['rule_id'])
    response = jsonify({
        'rule_id': rule_id_data
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    # response.headers.add('Access-Control-Allow-Origin', 'https://afs-web01:91')
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

# @app.route('/getAllOrders', methods=['GET'])
# def get_all_orders():
#     response = orders_dao.get_all_orders(connection)
#     response = jsonify(response)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# @app.route('/insertOrder', methods=['POST'])
# def insert_order():
#     request_payload = json.loads(request.form['data'])
#     order_id = orders_dao.insert_order(connection, request_payload)
#     response = jsonify({
#         'order_id': order_id
#     })
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# @app.route('/deleteProduct', methods=['POST'])
# def delete_product():
#     return_id = products_dao.delete_product(connection, request.form['product_id'])
#     response = jsonify({
#         'product_id': return_id
#     })
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response




if __name__ == "__main__":
    print("Starting Python Flask Server")
    app.run(debug=True)
    # CORS(app)

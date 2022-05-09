
from flask import Flask, request, jsonify


from sql_connection import get_sql_connection

from sql_connection import get_job_agent_connection

from flask_cors import CORS

import json
import rules
import exceptions
import admin
import dashboard



#app = FastAPI()

app = Flask(__name__)

CORS(app, support_credentials=True)

connection = get_sql_connection()
job_agent_connection = get_job_agent_connection()

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

#region dashboard

@app.route('/dashboard/getTotalMeasure', methods=['GET','POST'])
def get_total_measure():
    request_payload = request.get_json()
    response = dashboard.get_Total_Measures(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/dashboard/getCommonMeasure', methods=['GET','POST'])
def get_common_measure():
    request_payload = request.get_json()
    response = dashboard.get_Common_Measures(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/dashboard/getTop10Exception', methods=['GET','POST'])
def get_top10_exception():
    request_payload = request.get_json()
    response = dashboard.get_Top10_Exceptions(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/dashboard/getLastLIVTRunCountInvoiceWeek', methods=['GET','POST'])
def get_last_ivtrun_invoiceweek():
    request_payload = request.get_json()
    response = dashboard.get_Last_IVTRUN_InvoiceWeek(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/dashboard/getFocusedCustomer', methods=['GET','POST'])
def get_focued_customer():
    request_payload = request.get_json()
    response = dashboard.get_Focused_Customer(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

#endregion 


#region exceptions
@app.route('/exception/getCurrentException', methods=['GET','POST'])
def get_exception():
    request_payload = request.get_json()
    response = exceptions.get_all_current_exceptions(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/exception/getHistoricalException', methods=['GET','POST'])
def get_hist_exception():
    request_payload = request.get_json()
    response = exceptions.get_all_historical_exceptions(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/exception/getHeldConnote', methods=['GET','POST'])
def get_heldconnote():
    request_payload = request.get_json()
    response = exceptions.get_held_connote(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response



@app.route('/rules/updateHeldConnote', methods=['POST'])
def update_HeldReason():
    request_payload = request.get_json()
    msg = exceptions.updateHeldConnote(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/deleteHeldConnote', methods=['POST'])
def delete_HeldConnote():
    request_payload = request.get_json()
    msg = exceptions.deleteHeldConnote(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
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

@app.route('/admin/IVTDataLoad', methods=['GET', 'POST'])
def bulk_sell():
    request_payload = request.get_json()
    resultcode = admin.bulkloaad_Insert(connection,job_agent_connection,request_payload)
    # resultcode.headers.add('Access-Control-Allow-Origin', '*')
    response = jsonify({
        'Msg': resultcode
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion

#------Admin----------------------

#region prefix 
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

#endregion


#region route
@app.route('/rules/getRoutes', methods=['GET'])
def get_Routees():
    response = admin.get_Routes(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/updateRoute', methods=['POST'])
def update_single_Routes():
    request_payload = request.get_json()
    msg = admin.updateRoute(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/deleteRoute', methods=['POST'])
def delete_single_Routes():
    request_payload = request.get_json()
    msg = admin.deleteRoute(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/newRoute', methods=['POST'])
def new_Routes():
    request_payload = request.get_json()
    msg = admin.newRoute(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion




#region cubic 
@app.route('/rules/getCubics', methods=['GET'])
def get_Cubices():
    response = admin.get_Cubics(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/updateCubic', methods=['POST'])
def update_single_Cubics():
    request_payload = request.get_json()
    msg = admin.updateCubic(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/deleteCubic', methods=['POST'])
def delete_single_Cubics():
    request_payload = request.get_json()
    msg = admin.deleteCubic(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/newCubic', methods=['POST'])
def new_Cubics():
    request_payload = request.get_json()
    msg = admin.newCubic(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion



#region fuel 
@app.route('/rules/getFuels', methods=['GET'])
def get_Fueles():
    response = admin.get_Fuels(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/updateFuel', methods=['POST'])
def update_single_Fuels():
    request_payload = request.get_json()
    msg = admin.updateFuel(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/deleteFuel', methods=['POST'])
def delete_single_Fuels():
    request_payload = request.get_json()
    msg = admin.deleteFuel(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/newFuel', methods=['POST'])
def new_Fuels():
    request_payload = request.get_json()
    msg = admin.newFuel(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion





#region tolerance 
@app.route('/rules/getTolerances', methods=['GET'])
def get_Tolerancees():
    response = admin.get_Tolerances(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/updateTolerance', methods=['POST'])
def update_single_Tolerances():
    request_payload = request.get_json()
    msg = admin.updateTolerance(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/deleteTolerance', methods=['POST'])
def delete_single_Tolerances():
    request_payload = request.get_json()
    msg = admin.deleteTolerance(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/newTolerance', methods=['POST'])
def new_Tolerances():
    request_payload = request.get_json()
    msg = admin.newTolerance(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion


#region user 
@app.route('/rules/getUsers', methods=['GET'])
def get_Useres():
    response = admin.get_Users(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/updateUser', methods=['POST'])
def update_single_Users():
    request_payload = request.get_json()
    msg = admin.updateUser(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/deleteUser', methods=['POST'])
def delete_single_Users():
    request_payload = request.get_json()
    msg = admin.deleteUser(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/newUser', methods=['POST'])
def new_Users():
    request_payload = request.get_json()
    msg = admin.newUser(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion

#region AMPortfolio 
@app.route('/rules/getAMPortfolios', methods=['GET'])
def get_AMPortfolioes():
    response = admin.get_AMPortfolios(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/updateAMPortfolio', methods=['POST'])
def update_single_AMPortfolios():
    request_payload = request.get_json()
    msg = admin.updateAMPortfolio(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/deleteAMPortfolio', methods=['POST'])
def delete_single_AMPortfolios():
    request_payload = request.get_json()
    msg = admin.deleteAMPortfolio(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rules/newAMPortfolio', methods=['POST'])
def new_AMPortfolios():
    request_payload = request.get_json()
    msg = admin.newAMPortfolio(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion

#region auth
@app.route('/admin/getlogin', methods=['get','POST'])
def get_login():
    request_payload = request.get_json()
    response = admin.get_login(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion 

#region IVT ENGINE
@app.route('/rules/runIVT', methods=['POST'])
def run_IVT():
    request_payload = request.get_json()
    msg = admin.runIVT(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    #endregion 




if __name__ == "__main__":
    print("Starting Python Flask Server")
    app.run(port=4545)
    # CORS(app)

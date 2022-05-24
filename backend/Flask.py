
from flask import Flask, request, jsonify


from sql_connection import get_sql_connection

from sql_connection import get_job_agent_connection

from flask_cors import CORS,cross_origin

import json
import rules
import exceptions
import admin
import ML
import dashboard
import os


#app = FastAPI()

app = Flask(__name__)

app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app)



connection = get_sql_connection()
job_agent_connection = get_job_agent_connection()

# Rule Master

@app.route('/api/getRules', methods=['GET'])
def get_rules():
    response = rules.get_all_rules(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/deleteRule', methods=['POST'])
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
    # response.headers.add('Access-Control-Allow-Origin', '*')
    # response.headers.add('Access-Control-Allow-Credentials', 'true')
    # response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    # response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept     ')
   
    return response


@app.route('/api/saveRule', methods=['POST'])
def insert_new_rule():
    request_payload = json.loads(request.form['data'])
    Msg = rules.insert_new_rule(connection, request_payload)
    response = jsonify({
        'Msg': Msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/editRule', methods=['GET','POST'])
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

@app.route('/api/dashboard/getTotalMeasure', methods=['GET','POST'])
def get_total_measure():
    request_payload = request.get_json()
    response = dashboard.get_Total_Measures(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/api/dashboard/getCommonMeasure', methods=['GET','POST'])
def get_common_measure():
    request_payload = request.get_json()
    response = dashboard.get_Common_Measures(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/api/dashboard/getTop10Exception', methods=['GET','POST'])
def get_top10_exception():
    request_payload = request.get_json()
    response = dashboard.get_Top10_Exceptions(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/api/dashboard/getLastLIVTRunCountInvoiceWeek', methods=['GET','POST'])
def get_last_ivtrun_invoiceweek():
    request_payload = request.get_json()
    response = dashboard.get_Last_IVTRUN_InvoiceWeek(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/api/dashboard/getFocusedCustomer', methods=['GET','POST'])
def get_focued_customer():
    request_payload = request.get_json()
    response = dashboard.get_Focused_Customer(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

#endregion 


#region exceptions
@app.route('/api/exception/getCurrentException', methods=['GET','POST'])
def get_exception():
    request_payload = request.get_json()
    response = exceptions.get_all_current_exceptions(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/api/exception/getHistoricalException', methods=['GET','POST'])
def get_hist_exception():
    request_payload = request.get_json()
    response = exceptions.get_all_historical_exceptions(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response

@app.route('/api/exception/getHeldConnote', methods=['GET','POST'])
def get_heldconnote():
    request_payload = request.get_json()
    response = exceptions.get_held_connote(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response



@app.route('/api/rules/updateHeldConnote', methods=['POST'])
def update_HeldReason():
    request_payload = request.get_json()
    msg = exceptions.updateHeldConnote(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/deleteHeldConnote', methods=['POST'])
def delete_HeldConnote():
    request_payload = request.get_json()
    msg = exceptions.deleteHeldConnote(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/api/exception/heldConnote', methods=['POST'])
def held_connote():
    request_payload = request.get_json()
    resultcode = exceptions.heldConnote(connection, request_payload)
    response = jsonify({
        'Msg': resultcode
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/exception/heldBulkConnote', methods=['POST'])
def held_bulk_connote():
    request_payload = request.get_json()
    resultcode = exceptions.heldBulkConnoteTest(connection, request_payload)
    response = jsonify({
        'Msg': resultcode
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/admin/IVTDataLoad', methods=['GET', 'POST'])
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
@app.route('/api/rules/getPrefixes', methods=['GET'])
def get_prefixes():
    response = admin.get_prefixes(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/updatePrefix', methods=['POST'])
def update_single_prefixs():
    request_payload = request.get_json()
    msg = admin.updatePrefix(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/deletePrefix', methods=['POST'])
def delete_single_prefixs():
    request_payload = request.get_json()
    msg = admin.deletePrefix(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/newPrefix', methods=['POST'])
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
@app.route('/api/rules/getRoutes', methods=['GET'])
def get_Routees():
    response = admin.get_Routes(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/updateRoute', methods=['POST'])
def update_single_Routes():
    request_payload = request.get_json()
    msg = admin.updateRoute(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/deleteRoute', methods=['POST'])
def delete_single_Routes():
    request_payload = request.get_json()
    msg = admin.deleteRoute(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/newRoute', methods=['POST'])
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
@app.route('/api/rules/getCubics', methods=['GET'])
def get_Cubices():
    response = admin.get_Cubics(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/updateCubic', methods=['POST'])
def update_single_Cubics():
    request_payload = request.get_json()
    msg = admin.updateCubic(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/deleteCubic', methods=['POST'])
def delete_single_Cubics():
    request_payload = request.get_json()
    msg = admin.deleteCubic(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/newCubic', methods=['POST'])
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
@app.route('/api/rules/getFuels', methods=['GET'])
def get_Fueles():
    response = admin.get_Fuels(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/updateFuel', methods=['POST'])
def update_single_Fuels():
    request_payload = request.get_json()
    msg = admin.updateFuel(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/deleteFuel', methods=['POST'])
def delete_single_Fuels():
    request_payload = request.get_json()
    msg = admin.deleteFuel(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/newFuel', methods=['POST'])
def new_Fuels():
    request_payload = request.get_json()
    msg = admin.newFuel(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion



#region Consolodition 
@app.route('/api/rules/getConsoloditions', methods=['GET'])
def get_Consoloditiones():
    response = admin.get_Consoloditions(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/updateConsolodition', methods=['POST'])
def update_single_Consoloditions():
    request_payload = request.get_json()
    msg = admin.updateConsolodition(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/deleteConsolodition', methods=['POST'])
def delete_single_Consoloditions():
    request_payload = request.get_json()
    msg = admin.deleteConsolodition(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/newConsolodition', methods=['POST'])
def new_Consoloditions():
    request_payload = request.get_json()
    msg = admin.newConsolodition(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion



#region tolerance 
@app.route('/api/rules/getTolerances', methods=['GET'])
def get_Tolerancees():
    response = admin.get_Tolerances(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/updateTolerance', methods=['POST'])
def update_single_Tolerances():
    request_payload = request.get_json()
    msg = admin.updateTolerance(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/deleteTolerance', methods=['POST'])
def delete_single_Tolerances():
    request_payload = request.get_json()
    msg = admin.deleteTolerance(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/newTolerance', methods=['POST'])
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
@app.route('/api/rules/getUsers', methods=['GET'])
def get_Useres():
    response = admin.get_Users(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/updateUser', methods=['POST'])
def update_single_Users():
    request_payload = request.get_json()
    msg = admin.updateUser(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/deleteUser', methods=['POST'])
def delete_single_Users():
    request_payload = request.get_json()
    msg = admin.deleteUser(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/newUser', methods=['POST'])
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
@app.route('/api/rules/getAMPortfolios', methods=['GET'])
def get_AMPortfolioes():
    response = admin.get_AMPortfolios(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/updateAMPortfolio', methods=['POST'])
def update_single_AMPortfolios():
    request_payload = request.get_json()
    msg = admin.updateAMPortfolio(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/deleteAMPortfolio', methods=['POST'])
def delete_single_AMPortfolios():
    request_payload = request.get_json()
    msg = admin.deleteAMPortfolio(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/rules/newAMPortfolio', methods=['POST'])
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
@app.route('/api/admin/getlogin', methods=['get','POST'])
def get_login():
    request_payload = request.get_json()
    response = admin.get_login(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#region auth
@app.route('/api/admin/getloginlocal', methods=['get','POST'])
def get_loginlocal():
    #request_payload = request.get_json()
    loginname=os.getlogin()
    #user_info = win32net.NetUserGetInfo(win32net.NetGetAnyDCName(), win32api.GetUserName(), 2)
    response = loginname
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#endregion 

#region IVT ENGINE
@app.route('/api/rules/runIVT', methods=['POST'])
def run_IVT():
    request_payload = request.get_json()
    msg = admin.runIVT(connection, request_payload)
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    #endregion 

    #region ML Models
@app.route('/api/ML/getMLIFExceptions', methods=['GET'])
def get_ML_IF_Exceptions():
   # request_payload = request.get_json()
    msg = ML.get_ML_IF_exceptions()
    response = jsonify({
        'Msg': msg
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/ML/getCurrentMLException', methods=['GET','POST'])
def get_ML_Current_exception():
    request_payload = request.get_json()
    response = ML.get_all_current_MLexceptions(connection,request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:',response)
    return response
    #endregion 



if __name__ == "__main__":
    print("Starting Python Flask Server")
    app.run(port=5050)
    

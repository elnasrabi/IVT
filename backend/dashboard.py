

from sql_connection import  get_sql_connection
import pandas as pd

import json
from datetime import datetime
#import pandas as pd
# Some other example server values are
# server = 'localhost\sqlexpress' # for a named instance
# server = 'myserver,port' # to specify an alternate port
def get_Total_Measures(connection,login):
   
    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getDashbaordTotalMeasures] @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    
    respons=[]
    for (TotalExceptions, TotalCustomer, TotalCarrier,TotalGross,TotalQuantity,HeldCount) in cursor:
        respons.append(
            {
                'TotalExceptions':TotalExceptions,
                'TotalCustomer':TotalCustomer,
                'TotalCarrier':TotalCarrier,
                'TotalGross':TotalGross,
                'TotalQuantity':TotalQuantity,
                'HeldCount':HeldCount


            }
        )

    cursor.close()
    return respons


def get_Common_Measures(connection,login):
    connection= get_sql_connection()
    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getDashbaordCommonMeasure] @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    
    respons=[]
    for (cType, CommonDesc, TotCount,Percenarge,loginname) in cursor:
        respons.append(
            {
                'cType':cType,
                'CommonDesc':CommonDesc,
                'TotCount':TotCount,
                'Percenarge':Percenarge,
                'loginname':loginname

            }
        )
   
    cursor.close()
    return respons

def get_Focused_Customer(connection,login):
    connection= get_sql_connection()
    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getDashbaordFocuesedCustomer] @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    
    respons=[]
    for (TotCount,Customer) in cursor:
        respons.append(
            {
               'TotCount':TotCount,
                'Customer':Customer
                
            }
        )
   
    cursor.close()
    return respons


def get_Top10_Exceptions(connection,login):
 
    cursor = connection.cursor()
    query = "EXEC [WebIVT].sp_getDashbaordTop10Exception @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    
    respons=[]
    for (ErrDesc, TotCount, Percenarge,loginname) in cursor:
        respons.append(
            {
                'ErrDesc':ErrDesc,
                'TotCount':TotCount,
                'Percenarge':Percenarge,
                'loginname':loginname

            }
        )
    cursor.close()
    return respons

def get_Last_IVTRUN_InvoiceWeek(connection,login):
 
    cursor = connection.cursor()
    query = "EXEC [WebIVT].sp_getDashbaordLastIVTRun_InvoiceWeek @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    
    respons=[]
    for (TotCount, CustomerCount,CarrierCount,CurrentWeek) in cursor:
        respons.append(
            {
               
                'TotCount':TotCount,
                'CustomerCount':CustomerCount,
                'CarrierCount':CarrierCount,
                'CurrentWeek':CurrentWeek
                
                

            }
        )
    cursor.close()
    return respons

def connect():
    return pytds.connect(dsn='AFS-SQL01',database='IVT',autocommit=True, auth=login.SspiAuth())
    

    
if __name__=='__main__':
    connection=get_sql_connection()
    # print(get_all_rules(connection))
  

    # print(delete_rule(connection, {
    #     'ErrCode': '902'
    # }))
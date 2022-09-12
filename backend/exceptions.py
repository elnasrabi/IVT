

from sql_connection import  get_sql_connection
import pandas as pd
import json
from datetime import datetime
#import pandas as pd
# Some other example server values are
# server = 'localhost\sqlexpress' # for a named instance
# server = 'myserver,port' # to specify an alternate port


def get_all_current_exceptions(connection,login):


    

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getAllCurrentException] @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    respons=[]
    for (supplier_ref, jno, customer,cons_date,carrier,invoice_no,invoice_date,con_note,from_loc,colsubzone,to_loc,delsubzone,option_code,work_code,freight_charges,other_charges,fuel_surch,total_nett,gst,gross,items,quantity,space,lift,weight,pallet,hours,cubic,del_com,entered_by,
    status,cus_ref,col_post,del_post,chg_kg,unit,del_ref,CurrentWeek,RecordedDate,ErrPriority,ErrCode,ShortErrDesc,ErrDesc,ActionTime,AccountManager,
    FinanceGroup,CustomerName,BusinessCountry,LoginName) in cursor:
        respons.append(
            {
                'supplier_ref':supplier_ref,
                'jno':jno,
                'customer':customer,
                'cons_date':cons_date,
                'carrier':carrier,
                'invoice_no':invoice_no,
                'invoice_date':invoice_date,
                'con_note':con_note,
                'from_loc':from_loc,
                'colsubzone':colsubzone,
                'to_loc':to_loc,
                'delsubzone':delsubzone,
                'option_code':option_code,
                'work_code':work_code,
                'freight_charges':freight_charges,
                'other_charges':other_charges,
                'fuel_surch':fuel_surch,
                'total_nett':total_nett,
                'gst':gst,
                'gross':gross,
                'items':items,
                'quantity':quantity,
                'space':space,
                'lift':lift,
                'weight':weight,
                'pallet':pallet,
                'hours':hours,
                'cubic':cubic,
                'del_com':del_com,
                'entered_by':entered_by,
                'status':status,
                'cus_ref':cus_ref,
                'col_post':col_post,
                'del_post':del_post,
                'chg_kg':chg_kg,
                'unit':unit,
                'del_ref':del_ref,
                'CurrentWeek':CurrentWeek,
                'RecordedDate':RecordedDate,
                'ErrPriority':ErrPriority,
                'ShortErrDesc':ShortErrDesc,
                'ErrCode':ErrCode,
                'ErrDesc':ErrDesc,
                'ActionTime':ActionTime,
                'AccountManager' : AccountManager ,
	            'FinanceGroup' : FinanceGroup,
	            'CustomerName' : CustomerName,
	            'BusinessCountry' : BusinessCountry,
                'LoginName':LoginName

            }
        )


    cursor.close()
    return respons

def get_all_quality_exceptions_for_download(connection,login):


    

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_get_Quality_Exception_For_Download] @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    respons=[]
    for (supplier_ref, jno, customer,cons_date,carrier,invoice_no,invoice_date,con_note,from_loc,colsubzone,to_loc,delsubzone,option_code,work_code,freight_charges,other_charges,fuel_surch,total_nett,gst,gross,items,quantity,space,lift,weight,pallet,hours,cubic,del_com,entered_by,
    status,cus_ref,col_post,del_post,chg_kg,unit,del_ref,CurrentWeek,RecordedDate,ErrPriority,ErrCode,ShortErrDesc,ErrDesc,Sub_Reason,ActionTime,AccountManager,
    FinanceGroup,CustomerName,BusinessCountry,LoginName) in cursor:
        respons.append(
            {
                'supplier_ref':supplier_ref,
                'jno':jno,
                'customer':customer,
                'cons_date':cons_date,
                'carrier':carrier,
                'invoice_no':invoice_no,
                'invoice_date':invoice_date,
                'con_note':con_note,
                'from_loc':from_loc,
                'colsubzone':colsubzone,
                'to_loc':to_loc,
                'delsubzone':delsubzone,
                'option_code':option_code,
                'work_code':work_code,
                'freight_charges':freight_charges,
                'other_charges':other_charges,
                'fuel_surch':fuel_surch,
                'total_nett':total_nett,
                'gst':gst,
                'gross':gross,
                'items':items,
                'quantity':quantity,
                'space':space,
                'lift':lift,
                'weight':weight,
                'pallet':pallet,
                'hours':hours,
                'cubic':cubic,
                'del_com':del_com,
                'entered_by':entered_by,
                'status':status,
                'cus_ref':cus_ref,
                'col_post':col_post,
                'del_post':del_post,
                'chg_kg':chg_kg,
                'unit':unit,
                'del_ref':del_ref,
                'CurrentWeek':CurrentWeek,
                'RecordedDate':RecordedDate,
                'ErrPriority':ErrPriority,
                'ShortErrDesc':ShortErrDesc,
                'ErrCode':ErrCode,
                'ErrDesc':ErrDesc,
                'Sub_Reason':Sub_Reason,
                'ActionTime':ActionTime,
                'AccountManager' : AccountManager ,
	            'FinanceGroup' : FinanceGroup,
	            'CustomerName' : CustomerName,
	            'BusinessCountry' : BusinessCountry,
                'LoginName':LoginName

            }
        )


    cursor.close()
    return respons

def get_all_historical_exceptions(connection,reqs):


    

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getHistoricalException] @LoginName=? ,@InvoiceWeek=?"
    data=(reqs['LoginName'],reqs['InvoiceWeek'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    respons=[]
    for (supplier_ref, jno, customer,cons_date,carrier,invoice_no,invoice_date,con_note,from_loc,colsubzone,to_loc,delsubzone,option_code,work_code,freight_charges,other_charges,fuel_surch,total_nett,gst,gross,items,quantity,space,lift,weight,pallet,hours,cubic,del_com,entered_by,status,cus_ref,col_post,del_post,chg_kg,unit,del_ref,CurrentWeek,RecordedDate,ErrPriority,ErrCode,ShortErrDesc,ErrDesc,ActionTime,AccountManager,FinanceGroup,CustomerName,BusinessCountry,LoginName) in cursor:
        respons.append(
            {
                'supplier_ref':supplier_ref,
                'jno':jno,
                'customer':customer,
                'cons_date':cons_date,
                'carrier':carrier,
                'invoice_no':invoice_no,
                'invoice_date':invoice_date,
                'con_note':con_note,
                'from_loc':from_loc,
                'colsubzone':colsubzone,
                'to_loc':to_loc,
                'delsubzone':delsubzone,
                'option_code':option_code,
                'work_code':work_code,
                'freight_charges':freight_charges,
                'other_charges':other_charges,
                'fuel_surch':fuel_surch,
                'total_nett':total_nett,
                'gst':gst,
                'gross':gross,
                'items':items,
                'quantity':quantity,
                'space':space,
                'lift':lift,
                'weight':weight,
                'pallet':pallet,
                'hours':hours,
                'cubic':cubic,
                'del_com':del_com,
                'entered_by':entered_by,
                'status':status,
                'cus_ref':cus_ref,
                'col_post':col_post,
                'del_post':del_post,
                'chg_kg':chg_kg,
                'unit':unit,
                'del_ref':del_ref,
                'CurrentWeek':CurrentWeek,
                'RecordedDate':RecordedDate,
                'ErrPriority':ErrPriority,
                'ErrCode':ErrCode,
                'ShortErrDesc':ShortErrDesc,
                'ErrDesc':ErrDesc,
                'ActionTime':ActionTime,
                'AccountManager' : AccountManager ,
	            'FinanceGroup' : FinanceGroup,
	            'CustomerName' : CustomerName,
	            'BusinessCountry' : BusinessCountry,
                'LoginName':LoginName

            }
        )

   
    cursor.close()
    return respons

def heldConnote(connection,connote):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_HeldConnote] @Connote = ?, @Reason = ?, @HeldBy = ?,@Customer=? , @Carrier=? "
  
    data=(connote['Connote'],connote['Reason'],connote['HeldBy'],connote['Customer'],connote['Carrier'])
       # Prepare the stored procedure execution script and parameter values
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Connote has been helded successfully.'



def get_held_connote(connection,login):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getAllHeldConnote] @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    respons=[]
    for (Id,Connote ,Reason ,HeldBy ,ActionTime ,supplier_ref ,jno ,customer ,cons_date ,carrier ,CurrentWeek ,ErrPriority ,ErrDesc ,invoice_no ,invoice_date ,con_note ,from_loc ,colsubzone ,to ,delsubzone ,option_code ,work_code ,freight_charges ,other_charges ,fuel_surch ,total_nett ,gst ,gross ,items ,quantity ,space ,lift ,weight ,pallet ,hours ,cubic ,del_com 
    ,entered_by ,status ,cus_ref ,col_post ,del_post ,chg_kg ,unit ,del_ref,AccountManager,FinanceGroup,CustomerName,BusinessCountry,LoginName) in cursor:
     respons.append(
            {
                'supplier_ref':supplier_ref,
                'jno':jno,
                'customer':customer,
                'cons_date':cons_date,
                'carrier':carrier,
                'Connote':Connote,
                'Reason': Reason,
                'HeldBy':HeldBy ,
                'Id':Id,
                'CurrentWeek':CurrentWeek,
                'ErrPriority':ErrPriority,
                'cons_date':cons_date,
                'ActionTime':datetime.date(ActionTime).strftime("%b %d %Y"),
                'ErrDesc':ErrDesc,
                'invoice_no':invoice_no,
                'invoice_date':invoice_date,
                'con_note':con_note,
                'from_loc':from_loc,
                'colsubzone':colsubzone,
                'to':to,
                'delsubzone':delsubzone,
                'option_code':option_code,
                'work_code':work_code,
                'freight_charges':freight_charges,
                'other_charges':other_charges,
                'fuel_surch':fuel_surch,
                'total_nett':total_nett,
                'gst':gst,
                'gross':gross,
                'items':items,
                'quantity':quantity,
                'space':space,
                'lift':lift,
                'weight':weight,
                'pallet':pallet,
                'hours':hours,
                'cubic':cubic,
                'del_com':del_com,
                'entered_by':entered_by,
                'status':status,
                'cus_ref':cus_ref,
                'col_post':col_post,
                'del_post':del_post,
                'chg_kg':chg_kg,
                'unit':unit,
                'del_ref':del_ref,
                'AccountManager':AccountManager,
                'FinanceGroup':FinanceGroup,
                'CustomerName':CustomerName,
                'BusinessCountry':BusinessCountry,
                'LoginName':LoginName,


            }
        )
    cursor.close()
    return respons


def get_held_connote_for_download(connection,login):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getHeldConnoteForDownload] @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    respons=[]
    for (HeldType,HeldBy,HeldAt,InvoiceWeek,Reason,Supplier_ref,Jno,Customer,Cons_date,Carrier,Connote,from_loc,Colsubzone,To,Delsubzone,Option_code,Work_code,Freight_charges,Other_charges,Fuel_surch,Total_nett,Cus_ref,Buy_Freight_Charges,Buy_Other_Charges,Buy_Fuel_Surch,Buy_TotalNett,Sub_Reason,gross,
    items,space,lift,weight,pallet,hours,cubic,del_com,col_post,del_post,chg_kg,del_ref,unit,Col_loc,Del_loc,ErrCode,ErrPriority,ShortErrDesc,HoldRelease,
    Comment,Margin,BuyFuelPerc,SellFuelPerc,Dead_WeightBased,Cubic_Items,AP_InternalComment) in cursor:
     respons.append(
            {
                'HeldType':HeldType,
                'HeldBy':HeldBy,
                'HeldAt':HeldAt,
                'InvoiceWeek':InvoiceWeek,
                'Reason':Reason,
                'Supplier_ref':Supplier_ref,
                'Jno': Jno,
                'Customer':Customer ,
                'Cons_date':Cons_date,
                'Carrier':Carrier,
                'Connote':Connote,
                'from_loc':from_loc,
                'Colsubzone':Colsubzone,
                'To':To,
                'Delsubzone':Delsubzone,
                'Option_code':Option_code,
                'Work_code':Work_code,
                'Freight_charges':Freight_charges,
                'Other_charges':Other_charges,
                'Fuel_surch':Fuel_surch,
                'Total_nett':Total_nett,
                'Cus_ref':Cus_ref,
                'Buy_Freight_Charges':Buy_Freight_Charges,
                'Buy_Other_Charges':Buy_Other_Charges,
                'Buy_Fuel_Surch':Buy_Fuel_Surch,
                'Buy_TotalNett':Buy_TotalNett,
                'Sub_Reason':Sub_Reason,
                'gross':gross,
                'items':items,
                'space':space,
                'lift':lift,
                'weight':weight,
                'pallet':pallet,
                'hours':hours,
                'cubic':cubic,
                'del_com':del_com,
                'col_post':col_post,
                'del_post':del_post,
                'chg_kg':chg_kg,
                'del_ref':del_ref,
                'unit':unit,
                'Col_loc':Col_loc,
                'Del_loc':Del_loc,
                'ErrCode':ErrCode,
                'ErrPriority':ErrPriority,
                'ShortErrDesc':ShortErrDesc,
                'HoldRelease':HoldRelease,
                'Comment':Comment,
                'Margin':Margin,
                'BuyFuelPerc':BuyFuelPerc,
                'SellFuelPerc':SellFuelPerc,
                'Dead_WeightBased':Dead_WeightBased,
                'Cubic_Items':Cubic_Items,
                'AP_InternalComment':AP_InternalComment,

            }
        )
    cursor.close()
    return respons
def updateHeldConnote(connection,HeldConnote):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_UpdateHeldConnote] @Id = ?, @Reason = ?, @HeldBy = ? "
  
    data=(HeldConnote['Id'],HeldConnote['Reason'],HeldConnote['HeldBy'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Held reason has updated successfully.'

def deleteHeldConnote(connection,HeldConnote):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_DeleteHeldConnote] @Id = ?"
  
    data=(HeldConnote['Id'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Connote has released successfully.'

    

    
def heldBulkConnote(connection,connote):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_BulkHeldConnote] @Connote=?"
  
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,connote)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Connote has been helded successfully.'

def delete_rule(connection, rule_id):
    cursor = connection.cursor()
    query = "delete FROM[AFStaging].[IVT].[Rules] where [ErrCode] = ?"
    data = (rule_id)
    cursor.execute(query, data)
    connection.commit()
    cursor.close()
    return("Rule Successfully Deleted")


def edit_rule(connection, rule):
    cursor = connection.cursor()
    query = "update [AFStaging].[IVT].[Rules] set ErrDesc=? , ErrPriority=?  where [ErrCode] = ?"
    data=(rule['Desc'],rule['Priority'],rule['ErrCode'])
    cursor.execute(query, data)
    connection.commit()
    cursor.close()
    print("Rule Successfully Updated")

    
if __name__=='__main__':
    connection=get_sql_connection()
    # print(get_all_rules(connection))
  

    # print(delete_rule(connection, {
    #     'ErrCode': '902'
    # }))
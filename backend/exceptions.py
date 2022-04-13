

from sql_connection import  get_sql_connection
import pandas as pd
import pytds
from pytds import login
import sqlalchemy as sa
from sqlalchemy import create_engine
import sqlalchemy_pytds


#import pandas as pd
# Some other example server values are
# server = 'localhost\sqlexpress' # for a named instance
# server = 'myserver,port' # to specify an alternate port
def get_all_current_exceptions(connection):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getAllCurrentException]"
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query)
    respons=[]
    for (supplier_ref, jno, customer,cons_date,carrier,invoice_no,invoice_date,con_note,from_loc,colsubzone,to_loc,delsubzone,option_code,work_code,freight_charges,other_charges,fuel_surch,total_nett,gst,gross,items,quantity,space,lift,weight,pallet,hours,cubic,del_com,entered_by,
    status,cus_ref,col_post,del_post,chg_kg,unit,del_ref,CurrentWeek,RecordedDate,ErrPriority,ErrCode,ErrDesc,ActionTime,AccountManager,
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

  
    return respons

def heldConnote(connection,connote):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_HeldConnote] @Connote = ?, @Reason = ?, @HeldBy = ?"
  
    data=(connote['Connote'],connote['Reason'],connote['HeldBy'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode

    return 'Connote has been helded successfully.'
    
def connect():
    return pytds.connect(dsn='AFS-SQL01',database='IVT',autocommit=True, auth=login.SspiAuth())
    
def heldBulkConnote(connection,connote):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_BulkHeldConnote] @Connote=?"
  
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,connote)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode

    return 'Connote has been helded successfully.'

def heldBulkConnoteTest(connection,connote):
 engine = sa.create_engine('mssql+pytds://[ServerName]', creator=connect)
 proc_name = "so51930062"
 type_name = proc_name + "Type"

# set up test environment
 with engine.begin() as conn:
     conn.exec_driver_sql(f"""\
                DROP PROCEDURE IF EXISTS {proc_name} 
            """)
     conn.exec_driver_sql(f"""\
                DROP TYPE IF EXISTS {type_name} 
            """)
     conn.exec_driver_sql(f"""\
                CREATE TYPE {type_name} AS TABLE (
                id int,
                txt nvarchar(50)
                ) 
            """)
     conn.exec_driver_sql(f"""\
                CREATE PROCEDURE {proc_name} 
                @prefix nvarchar(10),
                @tvp {type_name} READONLY
                AS
                BEGIN
                    SET NOCOUNT ON;
                    SELECT id, @prefix + txt AS new_txt FROM @tvp;
                END
            """)

 conn = engine.raw_connection()
 with engine.begin() as conn:
            data = {"prefix": "new_", "tvp": [(1, "foo"), (2, "bar")]}
            sql = f"{{CALL {proc_name} (:prefix, :tvp)}}"
            print(conn.execute(sa.text(sql), data).fetchall())
        # [(1, 'new_foo'), (2, 'new_bar')]

def delete_rule(connection, rule_id):
    cursor = connection.cursor()
    query = "delete FROM[AFStaging].[IVT].[Rules] where [ErrCode] = ?"
    data = (rule_id)
    cursor.execute(query, data)
    connection.commit()
    return("Rule Successfully Deleted")


def edit_rule(connection, rule):
    cursor = connection.cursor()
    query = "update [AFStaging].[IVT].[Rules] set ErrDesc=? , ErrPriority=?  where [ErrCode] = ?"
    data=(rule['Desc'],rule['Priority'],rule['ErrCode'])
    cursor.execute(query, data)
    connection.commit()
    print("Rule Successfully Updated")

    
if __name__=='__main__':
    connection=get_sql_connection()
    # print(get_all_rules(connection))
  

    # print(delete_rule(connection, {
    #     'ErrCode': '902'
    # }))
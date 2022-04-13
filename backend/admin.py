

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
def get_prefixes(connection):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getPrefixes]"
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query)
    respons=[]
    for (Id,Customercode, Carrier, Prefix,DeliveryComment,CustomerReference) in cursor:
        respons.append(
            {   'Id':Id,
                'Customercode':Customercode,
                'Carrier':Carrier,
                'Prefix':Prefix,
                'DeliveryComment':DeliveryComment,
                'CustomerReference':CustomerReference
               
            }
        )

  
    return respons

def updatePrefix(connection,prefix):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_UpdatePrefix] @Id = ?, @Prefix = ?, @Customercode = ?,@Carrier=? ,@DeliveryComment=?,@CustomerReference=?"
  
    data=(prefix['Id'],prefix['Prefix'],prefix['Customercode'],prefix['Carrier'],prefix['DeliveryComment'],prefix['CustomerReference'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode

    return 'Prefix has updated successfully.'

def deletePrefix(connection,prefix):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_DeletePrefix] @Id = ?"
  
    data=(prefix['Id'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode

    return 'Prefix has deleted successfully.'

def newPrefix(connection,prefix):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_NewPrefix] @Prefix = ?, @Customercode = ?,@Carrier=? ,@DeliveryComment=?,@CustomerReference=?"
    data=(prefix['Prefix'],prefix['Customercode'],prefix['Carrier'],prefix['DeliveryComment'],prefix['CustomerReference'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode

    return 'Prefix has created successfully.'


def runIVT(connection,task):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_Run_IVT] @Task = ?"
    data=(task['task'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode

    return 'IVT Engine tasks have finished successfully.'

    
    
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
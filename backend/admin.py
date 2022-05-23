


from sql_connection import  get_sql_connection
import pandas as pd

import os;

import json

import pandas as pd

#import pandas as pd
# Some other example server values are
# server = 'localhost\sqlexpress' # for a named instance
# server = 'myserver,port' # to specify an alternate port

#region prefix
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

    cursor.close()
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
    cursor.close()

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
    cursor.close()

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
    cursor.close()
    return 'Prefix has created successfully.'
#endregion 


#region route
def get_Routes(connection):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getRoutes]"
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query)
    respons=[]
    for (Id
      ,RefDataTypeCode
      ,SourceRefCode
      ,DestRefCode
      ,CreationDate) in cursor:
        respons.append(
            {   'Id':Id,
                'RefDataTypeCode':RefDataTypeCode,
                'SourceRefCode':SourceRefCode,
                'DestRefCode':DestRefCode,
                'CreationDate':CreationDate
               
               
            }
        )

    cursor.close()
    return respons

def updateRoute(connection,route):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_UpdateRoute] @Id = ?, @RefDataTypeCode = ?, @SourceRefCode = ?,@DestRefCode=? "
  
    data=(route['Id'],route['RefDataTypeCode'],route['SourceRefCode'],route['DestRefCode'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Route has updated successfully.'

def deleteRoute(connection,route):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_DeleteRoute] @Id = ?"
  
    data=(route['Id'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Route has deleted successfully.'

def newRoute(connection,route):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_NewRoute] @RefDataTypeCode = ?, @SourceRefCode = ?,@DestRefCode=?"
    data=(route['RefDataTypeCode'],route['SourceRefCode'],route['DestRefCode'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Route has created successfully.'
#endregion 


#region cubic
def get_Cubics(connection):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getCubics]"
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query)
    respons=[]
    for (Id
      ,Customer
      ,Carrier
      ,RefCubic
       ) in cursor:
        respons.append(
            {   'Id':Id,
                'Customer':Customer,
                'Carrier':Carrier,
                'RefCubic':RefCubic,
               
            }
        )

    cursor.close()
    return respons

def updateCubic(connection,Cubic):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_UpdateCubic] @Id = ?, @Customer = ?, @Carrier = ?,@RefCubic=? "
  
    data=(Cubic['Id'],Cubic['Customer'],Cubic['Carrier'],Cubic['RefCubic'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Cubic has updated successfully.'

def deleteCubic(connection,Cubic):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_DeleteCubic] @Id = ?"
  
    data=(Cubic['Id'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Cubic has deleted successfully.'

def newCubic(connection,Cubic):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_NewCubic]  @Customer = ?, @Carrier = ?,@RefCubic=? "
  
    data=(Cubic['Customer'],Cubic['Carrier'],Cubic['RefCubic'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Cubic has created successfully.'
#endregion 




#region fuel
def get_Fuels(connection):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getFuel]"
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query)
    respons=[]
    for (Id
      ,Customer
      ,Carrier
      ,RefFuelSurch
      ,UpdatedDate
       ) in cursor:
        respons.append(
            {   'Id':Id,
                'Customer':Customer,
                'Carrier':Carrier,
                'RefFuelSurch':RefFuelSurch,
                'UpdatedDate':UpdatedDate.strftime("%Y/%m/%d")
               
            }
        )

    cursor.close()
    return respons

def updateFuel(connection,Fuel):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_UpdateFuel] @Id = ?, @Customer = ?, @Carrier = ?,@RefFuelSurch=? "
  
    data=(Fuel['Id'],Fuel['Customer'],Fuel['Carrier'],Fuel['RefFuelSurch'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Fuel has updated successfully.'

def deleteFuel(connection,Fuel):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_DeleteFuel] @Id = ?"
  
    data=(Fuel['Id'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Fuel has deleted successfully.'

def newFuel(connection,Fuel):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_NewFuel]  @Customer = ?, @Carrier = ?,@RefFuelSurch=? "
  
    data=(Fuel['Customer'],Fuel['Carrier'],Fuel['RefFuelSurch'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Fuel has created successfully.'
#endregion 



#region tolerance
def get_Tolerances(connection):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getTolerance]"
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query)
    respons=[]
    for (Id
      ,Customercode
      ,Carrier
      ,P4_TOLERANCE
      ,P5_TOLERANCE
      ,P6_TOLERANCE
      ,ChargeWeightMin
      ,ChargeWeightMax
      ,TotalNettMin
      ,TotalNettMax

       ) in cursor:
        respons.append(
            {   'Id':Id,
                'Customer':Customercode,
                'Carrier':Carrier,
                'P4_TOLERANCE':P4_TOLERANCE,
                'P5_TOLERANCE':P5_TOLERANCE,
                'P6_TOLERANCE':P6_TOLERANCE,
                'ChargeWeightMin':ChargeWeightMin,
                'ChargeWeightMax':ChargeWeightMax,
                'TotalNettMin':TotalNettMin,
                'TotalNettMax':TotalNettMax,
               
            }
        )
    cursor.close()
  
    return respons

def updateTolerance(connection,Tolerance):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_UpdateTolerance] @Id = ?, @CustomerCode = ?, @Carrier = ?,@P4_TOLERANCE=? ,@P5_TOLERANCE=? ,@P6_TOLERANCE=?,@ChargeWeightMin=? ,@ChargeWeightMax=? ,@TotalNettMin=? ,@TotalNettMax=? "
  
    data=(Tolerance['Id'],Tolerance['Customer'],Tolerance['Carrier'],Tolerance['P4_TOLERANCE'],Tolerance['P5_TOLERANCE'],Tolerance['P6_TOLERANCE']
    ,Tolerance['ChargeWeightMin'],Tolerance['ChargeWeightMax'],Tolerance['TotalNettMin'],Tolerance['TotalNettMax'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Tolerance has updated successfully.'

def deleteTolerance(connection,Tolerance):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_DeleteTolerance] @Id = ?"
  
    data=(Tolerance['Id'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'Tolerance has deleted successfully.'

def newTolerance(connection,Tolerance):
   cursor=connection.cursor()
   query = "EXEC [WebIVT].[sp_NewTolerance]  @CustomerCode = ?, @Carrier = ?,@P4_TOLERANCE=? ,@P5_TOLERANCE=? ,@P6_TOLERANCE=? ,@ChargeWeightMin=? ,@ChargeWeightMax=? ,@TotalNettMin=? ,@TotalNettMax=? "
  
   data=(Tolerance['Customer'],Tolerance['Carrier'],Tolerance['P4_TOLERANCE'],Tolerance['P5_TOLERANCE'],Tolerance['P6_TOLERANCE']
    ,Tolerance['ChargeWeightMin'],Tolerance['ChargeWeightMax'],Tolerance['TotalNettMin'],Tolerance['TotalNettMax'])
       # Prepare the stored procedure execution script and parameter values
   cursor.execute(query,data)
   connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
   cursor.close()
   return 'Tolerance has created successfully.'
#endregion 


#region user
def get_Users(connection):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getUsers]"
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query)
    respons=[]
    for (Id
      ,AccountManager
      ,LoginName
      ,IsActive
      ,ModifiedDate
      ,UserType
      ,UserEntity

       ) in cursor:
        respons.append(
            {   'Id':Id,
                'AccountManager':AccountManager,
                'LoginName':LoginName,
                'IsActive':IsActive,
                'ModifiedDate':ModifiedDate,
                'UserType':UserType,
                'UserEntity':UserEntity,
               
            }
        )
    cursor.close()
  
    return respons

def updateUser(connection,User):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_UpdateUser] @Id = ?, @AccountManager = ?, @LoginName = ?,@IsActive=? ,@UserType=? "
  
    data=(User['Id'],User['AccountManager'],User['LoginName'],User['IsActive'],User['UserType'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'User has updated successfully.'

def deleteUser(connection,User):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_DeleteUser] @Id = ?"
  
    data=(User['Id'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'User has deleted successfully.'

def newUser(connection,User):
   cursor=connection.cursor()
   query = "EXEC [WebIVT].[sp_NewUser]  @AccountManager = ?, @LoginName = ?,@IsActive=? ,@UserType=? "
  
   data=(User['AccountManager'],User['LoginName'],User['IsActive'],User['UserType'])
       # Prepare the stored procedure execution script and parameter values
   cursor.execute(query,data)
   connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
   cursor.close()
   return 'User has created successfully.'
#endregion 


#region AMPortfolio
def get_AMPortfolios(connection):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getAMPortfolio]"
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query)
    respons=[]
    for (Id
       ,CustomerCode
      ,AccountManager
      ,LoginName

       ) in cursor:
        respons.append(
            {   'Id':Id,
                'CustomerCode':CustomerCode,
                'AccountManager':AccountManager,
                'LoginName':LoginName,
            }
        )

    cursor.close()
    return respons

def updateAMPortfolio(connection,AMPortfolio):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_UpdateAMPortfolio] @Id = ?, @CustomerCode = ?, @AccountManager = ?,@LoginName=? "
  
    data=(AMPortfolio['Id'],AMPortfolio['CustomerCode'],AMPortfolio['AccountManager'],AMPortfolio['LoginName'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'AM Portfolio has updated successfully.'

def deleteAMPortfolio(connection,AMPortfolio):
    cursor=connection.cursor()
    query = "EXEC [WebIVT].[sp_DeleteAMPortfolio] @Id = ?"
  
    data=(AMPortfolio['Id'])
       # Prepare the stored procedure execution script and parameter values
    cursor.execute(query,data)
    connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor.close()
    return 'AM Portfolio has deleted successfully.'

def newAMPortfolio(connection,AMPortfolio):
   cursor=connection.cursor()
   query = "EXEC [WebIVT].[sp_NewAMPortfolio]  @CustomerCode = ?, @AccountManager = ?,@LoginName=? "
        
   data=(AMPortfolio['CustomerCode'],AMPortfolio['AccountManager'],AMPortfolio['LoginName'])
            # Prepare the stored procedure execution script and parameter values
   cursor.execute(query,data)
   connection.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
   cursor.close()
   return 'AM Portfolio has created successfully.'
#endregion 



#region authentication
def getloginLocal():

    loginname=os.getlogin()
    user_info = win32net.NetUserGetInfo(win32net.NetGetAnyDCName(), win32api.GetUserName(), 2)
    full_name = user_info["full_name"]
    displayname=full_name
    response={'loginname':loginname,'displayname':displayname}
    
    return response

def get_login(connection,login):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getLogin] @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
    respons=[]
    for (Id
      ,AccountManager
      ,LoginName
      ,IsActive
      ,ModifiedDate
      ,UserType
      ,UserEntity

       ) in cursor:
        respons.append(
            {   'Id':Id,
                'AccountManager':AccountManager,
                'LoginName':LoginName,
                'IsActive':IsActive,
                'ModifiedDate':ModifiedDate,
                'UserType':UserType,
                'UserEntity':UserEntity,
               
            }
        )

    cursor.close()
    return respons
#endregion 

def receive_before_cursor_execute(
       conn, cursor, statement, params, context, executemany
        ):
            if executemany:
                cursor.fast_executemany = True
def bulkloaad_Insert(connection,agentconn,load_detail):
    # s1 = json.dumps(sellData)
    # a_json = json.loads(s1)
    # print(a_json)
    # df = pd.DataFrame.from_dict(a_json)
    querydata=(load_detail['Type'])
    controldata=(load_detail['InvoiceWeek'][0:10],load_detail['Type'])
    # controldata=controldata[0:10]
    query="EXEC msdb.dbo.sp_start_job N'IVT_File_Load' ;"
    FileLoadControlquery = " EXEC [WebIVT].[sp_FileloadControl] @InvoiceWeek = ?,@Type=?"
    if(querydata=='Sell'):
        query="EXEC msdb.dbo.sp_start_job N'IVT_Sell_File_Load' ;"
    elif(querydata=='Buy'):
        query="EXEC msdb.dbo.sp_start_job N'IVT_Buy_File_Load' ;"
    elif(querydata=='All'):
        query="EXEC msdb.dbo.sp_start_job N'IVT_File_Load' ;"

    crsr = connection.cursor()
    crsr.execute(FileLoadControlquery,controldata)
    connection.commit()
    crsr.close()
# agent cursor
    Agentcrsr = agentconn.cursor()
    Agentcrsr.execute(query)
    agentconn.commit()
    Agentcrsr.close()
    return 'Data load have finished successfully.'


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
    cursor.close()
    return 'IVT Engine tasks have finished successfully - ML Model results will be available shortly.'

    
    
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
    cursor.close()
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
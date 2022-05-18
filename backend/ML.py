import pyodbc
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import IsolationForest
import numpy as np   
from sqlalchemy import event
import sqlalchemy as db
import urllib
from datetime import date
today = date.today() 

def get_ML_IF_exceptions():
    server = 'AFS-SQL01' 
    database = 'IVT' 
    username = 'report_subscriber' 
    password = 'P@ssw0rd'  
    # Normal Data Load   #######################################################################################################
    cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    # cursor = cnxn.cursor()
    # # select 26 rows from SQL table to insert in dataframe.
    # #query = "  select  * from IVTDS_Corrected TABLESAMPLE SYSTEM(10 PERCENT)"
    query = "SELECT  CustomerSubCode       ,[ConsignmentDate]       ,[Carrier]       ,[From]       ,[To]       ,[WorkCode]       ,[FreightCharges]       ,[OtherCharges]       ,[FuelSurcharge]       ,[TotalNett]       ,[Gst]       ,[Gross]       ,[Quantity]       ,[Space]       ,[Weight]       ,[Pallet]       ,[Cubic]       ,[Hours]       ,[ConsignmentNote]       ,[CustomerReference]       ,[Items]       ,[Lift]       ,[ChargeKilogram]       ,[JobNumber]       ,[OptionCode]   FROM IVT.WebIVT.Last12M_Sell "
    IVTDS_Normal = pd.read_sql(query, cnxn)
    # IVTDS_Normal['failed']=0    
    #IVTDS_Normal = pd.read_csv("C:\\Users\\mnasir\\Documents\\GitHub\\IVT\\backend\\IVTDS_Normal.csv")
    # New Data Load   #######################################################################################################
    cursor2 = cnxn.cursor()
    # select 26 rows from SQL table to insert in dataframe.
    query = "  select  customer CustomerSubCode       ,con_note [ConsignmentDate]       ,[Carrier]       ,[From]       ,[To]       ,work_code [WorkCode]       ,freight_charges [FreightCharges]       ,other_charges [OtherCharges]       ,fuel_surch [FuelSurcharge]       ,total_nett [TotalNett]       ,[Gst]       ,[Gross]       ,[Quantity]       ,[Space]       ,[Weight]       ,[Pallet]       ,[Cubic]       ,[Hours]       ,con_note [ConsignmentNote]       ,cus_ref [CustomerReference]       ,[Items]       ,[Lift]       ,chg_kg [ChargeKilogram]       ,jno [JobNumber]       ,option_code [OptionCode] 	     FROM [IVT].[dbo].[Sell_Side] s"
    IVTDS_Test = pd.read_sql(query, cnxn)

    #Normal DF   #######################################################################################################
    df_IVTDS_Normal=IVTDS_Normal[['CustomerSubCode', 'Carrier', 'From', 'To', 'WorkCode','CustomerReference','OptionCode',
        'FreightCharges', 'OtherCharges', 'FuelSurcharge', 'TotalNett', 'Gst',
        'Gross', 'Quantity', 'Space', 'Weight', 'Pallet', 'Cubic', 'Hours'
        , 'Items', 'Lift', 'ChargeKilogram','JobNumber'
        ]]

    df_IVTDS_Normal[[
        'FreightCharges', 'OtherCharges', 'FuelSurcharge', 'TotalNett', 'Gst',
        'Gross', 'Quantity', 'Space', 'Weight', 'Pallet', 'Cubic', 'Hours'
        , 'Items', 'Lift', 'ChargeKilogram','JobNumber',
        ]]=df_IVTDS_Normal[[
        'FreightCharges', 'OtherCharges', 'FuelSurcharge', 'TotalNett', 'Gst',
        'Gross', 'Quantity', 'Space', 'Weight', 'Pallet', 'Cubic', 'Hours'
        , 'Items', 'Lift', 'ChargeKilogram','JobNumber'
        ]].astype(float)

    df_IVTDS_Normal[[
        'CustomerSubCode', 'Carrier', 'From', 'To', 'WorkCode',
        'CustomerReference', 'OptionCode'
        ]]=df_IVTDS_Normal[[
        'CustomerSubCode', 'Carrier', 'From', 'To', 'WorkCode',
        'CustomerReference', 'OptionCode'
        ]].astype(str)


    # New Data DF   #######################################################################################################

    df_IVTDS_NewData=IVTDS_Test
    df_IVTDS_NewData[[
        'FreightCharges', 'OtherCharges', 'FuelSurcharge', 'TotalNett', 'Gst',
        'Gross', 'Quantity', 'Space', 'Weight', 'Pallet', 'Cubic', 'Hours'
        , 'Items', 'Lift', 'ChargeKilogram','JobNumber',
        ]]=df_IVTDS_NewData[[
        'FreightCharges', 'OtherCharges', 'FuelSurcharge', 'TotalNett', 'Gst',
        'Gross', 'Quantity', 'Space', 'Weight', 'Pallet', 'Cubic', 'Hours'
        , 'Items', 'Lift', 'ChargeKilogram','JobNumber'
        ]].astype(float)

    df_IVTDS_NewData[[
        'CustomerSubCode', 'Carrier', 'From', 'To', 'WorkCode',
        'CustomerReference', 'OptionCode'
        ]]=df_IVTDS_NewData[[
        'CustomerSubCode', 'Carrier', 'From', 'To', 'WorkCode',
        'CustomerReference', 'OptionCode'
        ]].astype(str)

    #Normal Encoder   #######################################################################################################

    X = df_IVTDS_Normal.iloc[:, 0: 23].values
    # y=df_IVTDS_Normal.iloc[:,22].values

    labelencoder_X_0 = LabelEncoder()
    X[:, 0] = labelencoder_X_0.fit_transform(X[:, 0]) # Customer encoding

    labelencoder_X_1 = LabelEncoder()
    X[:, 1] = labelencoder_X_1.fit_transform(X[:, 1])

    labelencoder_X_2 = LabelEncoder()
    X[:, 2] = labelencoder_X_2.fit_transform(X[:, 2])

    labelencoder_X_3 = LabelEncoder()
    X[:, 3] = labelencoder_X_3.fit_transform(X[:, 3])

    labelencoder_X_4 = LabelEncoder()
    X[:, 4] = labelencoder_X_4.fit_transform(X[:, 4])

    labelencoder_X_5 = LabelEncoder()
    X[:, 5] = labelencoder_X_5.fit_transform(X[:, 5])

    labelencoder_X_6 = LabelEncoder()
    X[:, 6] = labelencoder_X_6.fit_transform(X[:, 6])


    df_ivt = pd.DataFrame(data=X,  columns=["CustomerSubCode", "Carrier","From","To","WorkCode"
    ,"CustomerReference","OptionCode","FreightCharges","OtherCharges","FuelSurcharge","TotalNett","Gst","Gross"
    ,"Quantity","Space","Weight","Pallet","Cubic","Hours","Items","Lift","ChargeKilogram","JobNumber"])
    # df_ivt['Failed']=IVTDS.iloc[:,22].values

    # New Data Enocder   #######################################################################################################

    df_newdata=df_IVTDS_NewData[['CustomerSubCode', 'Carrier', 'From', 'To', 'WorkCode','CustomerReference','OptionCode',
        'FreightCharges', 'OtherCharges', 'FuelSurcharge', 'TotalNett', 'Gst',
        'Gross', 'Quantity', 'Space', 'Weight', 'Pallet', 'Cubic', 'Hours'
        , 'Items', 'Lift', 'ChargeKilogram','JobNumber']]

    X_new = df_newdata.iloc[:, 0: 23].values


    labelencoder_X_new_0 = LabelEncoder()
    X_new[:, 0] = labelencoder_X_new_0.fit_transform(X_new[:, 0]) # Customer encoding

    labelencoder_X_new_1 = LabelEncoder()
    X_new[:, 1] = labelencoder_X_new_1.fit_transform(X_new[:, 1])

    labelencoder_X_new_2 = LabelEncoder()
    X_new[:, 2] = labelencoder_X_new_2.fit_transform(X_new[:, 2])


    labelencoder_X_new_3 = LabelEncoder()
    X_new[:, 3] = labelencoder_X_new_3.fit_transform(X_new[:, 3])

    labelencoder_X_new_4 = LabelEncoder()
    X_new[:, 4] = labelencoder_X_new_4.fit_transform(X_new[:, 4])

    labelencoder_X_new_5 = LabelEncoder()
    X_new[:, 5] = labelencoder_X_new_5.fit_transform(X_new[:, 5])

    labelencoder_X_new_6 = LabelEncoder()
    X_new[:, 6] = labelencoder_X_new_6.fit_transform(X_new[:, 6])


    df_newdata_ivt = pd.DataFrame(data=X_new,  columns=["CustomerSubCode", "Carrier","From","To","WorkCode"
    ,"CustomerReference","OptionCode","FreightCharges","OtherCharges","FuelSurcharge","TotalNett","Gst","Gross"
    ,"Quantity","Space","Weight","Pallet","Cubic","Hours","Items","Lift","ChargeKilogram","JobNumber"])


    # Model Creation ######################################################################


    clf = IsolationForest(n_estimators=50, max_samples='auto', contamination=float(0.01),max_features=1.0)
    clf.fit(X)

    df_newdata_ivt['scores']=clf.decision_function(df_newdata_ivt[["CustomerSubCode", "Carrier","From","To","WorkCode"
    ,"CustomerReference","OptionCode","FreightCharges","OtherCharges","FuelSurcharge","TotalNett","Gst","Gross"
    ,"Quantity","Space","Weight","Pallet","Cubic","Hours","Items","Lift","ChargeKilogram","JobNumber"]])
    df_newdata_ivt['anomaly']=clf.predict(df_newdata_ivt[["CustomerSubCode", "Carrier","From","To","WorkCode"
    ,"CustomerReference","OptionCode","FreightCharges","OtherCharges","FuelSurcharge","TotalNett","Gst","Gross"
    ,"Quantity","Space","Weight","Pallet","Cubic","Hours","Items","Lift","ChargeKilogram","JobNumber"]])


    # Data Inserting into DB ##################################################

    params = 'DRIVER={SQL Server}' + ';SERVER='+server + ';PORT=1433;DATABASE=' + database + ';UID=' + username + ';PWD=' + password
    db_params = urllib.parse.quote_plus(params)
    engine = db.create_engine("mssql+pyodbc:///?odbc_connect={}".format(db_params))
    df_newdata_sql=df_newdata_ivt[['JobNumber','scores','anomaly']]

    df_newdata_sql=df_newdata_sql[df_newdata_sql['anomaly'] == -1]

    df_newdata_sql['ActionTime'] = pd.to_datetime('today')
    @event.listens_for(engine, "before_cursor_execute")
    def receive_before_cursor_execute(
        conn, cursor, statement, params, context, executemany
            ):
                if executemany:
                    cursor.fast_executemany = True

    df_newdata_sql.to_sql('AutoDetectedException', engine, index=False, if_exists="replace", schema="WebIVT")
   

    Historyquery = "EXEC [WebIVT].[sp_Run_AutoDetectML]"
  
       # Prepare the stored procedure execution script and parameter values
    cursor2.execute(Historyquery)
    cnxn.commit()
    # resultcode=0
    # for (MessageCode) in cursor:
    #     resultcode=MessageCode
    cursor2.close()
    return 'Predicted Exceptions are Ready Now.'


def get_all_current_MLexceptions(connection,login):

    cursor = connection.cursor()
    query = "EXEC [WebIVT].[sp_getAllCurrentMLException] @LoginName=?"
    data=(login['LoginName'])
    #storedProc = "exec database..stored_procedure 'param1','param2'"
    cursor.execute(query,data)
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

    # input_dict = json.loads(respons)
    # filtered = [x for x in respons if x['LoginName'] == 'fhenderson']
    # df=pd.DataFrame.from_dict(respons)
    # df_filtered = df[df['LoginName'].isin(['fhenderson'])]
    # df_filtered=df_filtered.values.tolist()
# Filter python objects with list comprehensions
    # output_dict = [x for x in input_dict if x['LoginName'] == 'fhenderson']

# Transform python object back into json
    # output_json = json.dumps(output_dict)
    cursor.close()
    return respons

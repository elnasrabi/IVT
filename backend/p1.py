

from sql_connection import  get_sql_connection

#import pandas as pd
# Some other example server values are
# server = 'localhost\sqlexpress' # for a named instance
# server = 'myserver,port' # to specify an alternate port
def get_all_rules(connection):

    cursor = connection.cursor()
    query = "select ErrPriority,ErrCode,ErrDesc FROM [AFStaging].[IVT].[Rules] order by [ErrCode] "
    cursor.execute(query)
    respons=[]
    for (ErrPriority, ErrCode, ErrDesc) in cursor:
        respons.append(
            {
            'ErrPriority':ErrPriority,
            'ErrCode':ErrCode,
            'ErrDesc':ErrDesc,
            }
        )


    return respons

def insert_new_rule(connection,rule):
    cursor=connection.cursor()
    query="insert into [IVT].[Rules]([ErrPriority], [ErrCode], [ErrDesc], [OnOff], [Mandatory], [VCode]) values(?,?,?,?,?,?)"
    data=(rule['Priority'],rule['RuleCode'],rule['Desc'],'1','1','vTest')
    cursor.execute(query,data)
    connection.commit()
    return ("Rule Successfully Inserted")

def delete_rule(connection, rule_id):
    cursor = connection.cursor()
    query = "delete FROM[AFStaging].[IVT].[Rules] where [ErrCode] = ?"
    data = (rule_id)
    cursor.execute(query, data)
    connection.commit()
    print("Rule Successfully Deleted")


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
    print(insert_new_rule(connection,{
        'ErrPriority': 'P10',
        'ErrCode': '903',
        'ErrDesc': 'Test Desc',
        'OnOff':'1',
        'Mandatory':'1',
        'VCode':'v9'
    }))

    # print(delete_rule(connection, {
    #     'ErrCode': '902'
    # }))
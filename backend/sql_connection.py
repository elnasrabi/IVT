import pyodbc
__cnx =None
__cnxx=None
def get_sql_connection():
    global __cnx
    if __cnx is None:
        server = 'AFS-SQL01'
        database = 'IVT'
        username = 'report_subscriber'
        password = 'P@ssw0rd'
        __cnx = pyodbc.connect(
            'DRIVER={SQL Server};SERVER=' + server + ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password +';MARS_Connection=Yes')
    return __cnx



def get_job_agent_connection():
    global __cnxx
    if __cnxx is None:
        server = 'AFS-SQL01-DEV\AFS_SQL01_DEV'
        database = 'msdb'
        username = 'report_subscriber'
        password = 'P@ssw0rd'
        __cnxx = pyodbc.connect(
            'DRIVER={SQL Server};SERVER=' + server + ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password +';MARS_Connection=Yes')
    return __cnxx
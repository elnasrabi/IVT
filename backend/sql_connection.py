import pyodbc
__cnx =None
def get_sql_connection():
    global __cnx
    if __cnx is None:
        server = 'AFS-SQL01'
        database = 'IVT'
        username = 'report_subscriber'
        password = 'P@ssw0rd'
        __cnx = pyodbc.connect(
            'DRIVER={SQL Server};SERVER=' + server + ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password)
    return __cnx
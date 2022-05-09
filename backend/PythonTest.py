import pyodbc

from sql_connection import get_sql_connection
connection = get_sql_connection()
cnxn = pyodbc.connect(connection, autocommit=True)
crsr = cnxn.cursor()
crsr.execute("TRUNCATE TABLE fast_executemany_test")

crsr.fast_executemany = True

sql = "INSERT INTO fast_executemany_test (txtcol) VALUES (?)"
params = [(f'txt{i:06d}',) for i in range(1000)]
crsr.executemany(sql, params)
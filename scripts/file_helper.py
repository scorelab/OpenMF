import sys
import sqlite3

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def write_as_tsv(filepath, columns, rows):
    tsv_file = open(filepath, "w+", encoding="utf-8")
    column_header = '\t'.join(columns)
    tsv_file.write(column_header + '\n')
    for tpl in rows:
        str_tpl = []
        for x in tpl:
            str_tpl.append(str(x))
        row_as_str = '\t'.join(str_tpl)
        tsv_file.write(row_as_str + '\n')
    tsv_file.close()

def convert_to_tsv(db_path, tsv_file_path):
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    cursor.execute('SELECT name FROM sqlite_master WHERE type = "table"')
    tables = []
    print('Tables in database are :: ')
    for table_tuple in cursor.fetchall():
        tables.append(table_tuple[0])
        print(table_tuple[0])
    for table in tables:
        schema_query = 'pragma table_info("{0}")'.format(table)
        schema = cursor.execute(schema_query).fetchall()
        columns = []
        for columns_tpl in schema:
            columns.append(columns_tpl[1])
        select_query = 'SELECT * from {0};'.format(table)
        rows = cursor.execute(select_query).fetchall()
        write_as_tsv(tsv_file_path + '/' + table + '.tsv', columns, rows)

def convert_to_json(db_path, json_file_path):
    connection = sqlite3.connect(db_path)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute('SELECT name FROM sqlite_master WHERE type = "table"')
    tables = cursor.fetchall()
    print('Tables in database are :: ')
    for table_name in tables:
            print (table_name['name'])
            conn = sqlite3.connect(db_path)  
            conn.row_factory = dict_factory
            cur1 = conn.cursor()
            cur1.execute("SELECT * FROM "+table_name['name'])
            results = cur1.fetchall() 
            # generate and save JSON files with the table name for each of the database tables
            with open(json_file_path + '/' +table_name['name']+'.json', 'a') as the_file:
                the_file.write(format(results).replace(" u'", "'").replace("'", "\""))
    connection.close()
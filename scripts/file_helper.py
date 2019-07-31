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

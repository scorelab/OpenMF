"""
This one contains generator functions for basic html layout generation.
Basic layouts -
1. List
2. Table

"""
styles = """
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
"""

doc_type_tag = "<!DOCTYPE html>"
html_open_tag = '<html>'
html_close_tag = '</html>'
head_open_tag = '<head>'
head_close_tag = '</head>'
body_open_tag = '<body>'
body_close_tag = '</body>'
table_open_tag = '<table>'
table_close_tag = '</table>'
tr_open_tag = '<tr>'
tr_close_tag = '</tr>'
td_open_tag = '<td>'
td_close_tag = '</td>'
th_open_tag = '<th>'
th_close_tag = '</th>'
new_line = '\n'


def header_generator(header_content):
    head = head_open_tag \
           + new_line + header_content \
           + new_line + head_close_tag \
           + new_line
    return head


def body_generator(body_content):
    return body_open_tag + new_line \
           + body_content + new_line \
           + body_close_tag + new_line


def list_generator():
    pass


def table_generator(table_columns, table_rows):
    html_str = table_open_tag + new_line
    if table_columns is not None:
        html_str += tr_open_tag + new_line
        for column in table_columns:
            html_str += th_open_tag + new_line \
                        + column + new_line \
                        + tr_close_tag + new_line
        html_str += tr_close_tag + new_line

    for row in table_rows:
        html_str += tr_open_tag + new_line
        for elem in row:
            html_str += td_open_tag \
                        + new_line + str(elem) + new_line \
                        + td_close_tag \
                        + new_line
        html_str += tr_close_tag + new_line

    html_str += table_close_tag + new_line
    return html_str


def wrap_html(head, body):
    return doc_type_tag + '\n' \
           + html_open_tag + '\n' \
           + head + '\n' \
           + body + '\n' \
           + html_close_tag


def css_style_generator():
    return styles

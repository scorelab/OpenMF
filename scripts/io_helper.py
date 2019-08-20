def write_to_file(filepath, content):
    with open(filepath, 'w') as f:
        f.write(str(content))
        f.close()

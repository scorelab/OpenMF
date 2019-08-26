def write_to_file(filepath, content):
    try:
        with open(filepath, 'w') as f:
            f.write(str(content))
            f.close()
    except Exception as e:
        print(e)
        return False
    return True

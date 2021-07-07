""" Helper functions that would be used for case routes."""

# import dependencies
import os

def getDirectoryTree(tree, rootDirectory, rootDirectoryName, i=0):
    """

    getDirectoryTree() does Depth first traversal to
    each sub-directory and files that reside inside rootDirectory.

    Arguments:-
    1. tree: A dictionary where result will be stored.
    2. rootDirectory: Path whose directory tree will be created.
    3. rootDirectoryName: Name of the rootDirectory.

    Result:-
    None, but fills tree with directory tree

    """

    ## add meta data to each tree
    tree['id'] = i
    tree['name'] = rootDirectoryName
    tree['children'] = []

    ## iterate thourgh all the sub-dirs and files
    for item in os.scandir(rootDirectory):

        ## if item is a file
        if(item.is_file()):

            ### create node
            node = {
                'id': item.inode(),
                'name': item.name,
            }

            ### push node to current tree
            tree['children'].append(node)

        ## if item is a directory
        if(item.is_dir()):

            ## create a empty dictionary for next sub children
            tree['children'].append({})

            ## recursively call to sub dirs
            getDirectoryTree(tree['children'][len(tree['children'])-1], item.path, item.name, item.inode())
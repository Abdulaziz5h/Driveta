export default class Tree {
  constructor() {}

  insertInTree(node, rootNode) {
    if (node.parentId === null) {
      if (rootNode.categoryChildrens === null) {
        rootNode.categoryChildrens = [
          {
            id: node.id,
            categoryChildrens: node.categoryChildrens,
            documents: node.documents,
            hasChildren: node.hasChildren,
            name: node.name,
            parentId: node.parentId
          },
        ];
      } else {
        rootNode.categoryChildrens.push({
          id: node.id,
          categoryChildrens: node.categoryChildrens,
          documents: node.documents,
          hasChildren: node.hasChildren,
          name: node.name,
          parentId: node.parentId
        });
      }
      rootNode.hasChildren = true
    } else {
      const categoryChildrens = rootNode.categoryChildrens;
      for (let i = 0; i < categoryChildrens.length; i++) {
        const currentNode = categoryChildrens[i];
        if (currentNode.id === node.parentId) {
          currentNode.categoryChildrens === null // =>
            ? (currentNode.categoryChildrens = [
                {
                  id: node.id,
                  categoryChildrens: node.categoryChildrens,
                  documents: node.documents,
                  hasChildren: node.hasChildren,
                  name: node.name,
                  parentId: node.parentId
                },
              ]) // =>
            : currentNode.categoryChildrens.push({
                id: node.id,
                categoryChildrens: node.categoryChildrens,
                documents: node.documents,
                hasChildren: node.hasChildren,
                name: node.name,
                parentId: node.parentId
              });
            currentNode.hasChildren = true
          return false;
        } else if (currentNode.categoryChildrens) {
          this.insertInTree(node, currentNode);
        }
      }
    }
  }

  updateTree(node, rootNode) {
    if (node.parentId === null) {
      rootNode.categoryChildrens.forEach((item) => {
        if (item.id === node.id) {
          Object.assign(item, node);
        }
      });
    } else {
      const categoryChildrens = rootNode.categoryChildrens;
      for (let i = 0; i < categoryChildrens.length; i++) {
        const currentNode = categoryChildrens[i];
        if (currentNode.id === node.parentId) {
          currentNode.categoryChildrens.forEach((item) => {
            if (item.id === node.id) {
              Object.assign(item, node);
            }
          });
          return false;
        } else if (currentNode.categoryChildrens) {
          this.updateTree(node, currentNode);
        }
      }
    }
  }

  printTree(node) {
    const categoryChildrens = node.categoryChildrens;
    if (categoryChildrens) {
      categoryChildrens.forEach((currentNode) => {
        console.log(currentNode);
        this.printTree(currentNode);
      });
    }
  }

  deleteNode(id, rootNode) {
    const categoryChildrens = rootNode.categoryChildrens;
    if (categoryChildrens) {
      for (let i = 0; i < categoryChildrens.length; i++) {
        if (categoryChildrens[i].id !== id) {
          this.deleteNode(id, categoryChildrens[i]);
        } else {
          categoryChildrens.splice(i, 1);
          return false;
        }
      }
    }
  }

  // un used func
  removeAllChildNodes(id, node) {
    const child = node.child;
    if (child) {
      for (let i = 0; i < child.length; i++) {
        if (child[i].id !== id) {
          this.removeAllChildNodes(id, child[i]);
        } else {
          child[i].child = null;
          return false;
        }
      }
    }
  }
}

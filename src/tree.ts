import Node from './node';

class Tree {
  root: Node;

  constructor(array: number[]) {
    // Sort array
    const sorted = array.sort((a, b) => a - b);
    // Remove duplicates from array
    const filtered = sorted.filter(
      (value, index) => sorted.indexOf(value) === index
    );

    this.root = this._buildTree(filtered, 0, filtered.length - 1)!;
  }

  private _buildTree(array: number[], start: number, end: number) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const rootNode = new Node(array[mid]);

    rootNode.left = this._buildTree(array, start, mid - 1);
    rootNode.right = this._buildTree(array, mid + 1, end);

    return rootNode;
  }

  insert(value: number) {
    const newNode = new Node(value);
    let node = this.root;
    let traversing = true;

    while (traversing) {
      // Prevent insertion of node if it exists already
      if (node.data === newNode.data) {
        console.log('This node already exists!');
        traversing = false;
        return;
      }

      if (newNode.data < node.data) {
        if (!node.left) {
          node.left = newNode;
          traversing = false;
          return;
        }

        node = node.left;
      }

      if (newNode.data > node.data) {
        if (!node.right) {
          node.right = newNode;
          traversing = false;
          return;
        }

        node = node.right;
      }
    }
  }

  // Get in-order smallest node
  private _kthSmallestNode(node: Node) {
    while (node.left !== null) {
      node = node.left;
    }

    return node;
  }

  private _delete(currentNode: null | Node, value: number) {
    // Base case
    if (!currentNode) return null;

    // Node to be deleted found
    if (currentNode.data === value) {
      // Is leaf node (No children)
      if (!currentNode.left && !currentNode.right) {
        return null;
      }
      // Has 1 child
      else if (!currentNode.left) {
        return currentNode.right;
      } else if (!currentNode.right) {
        return currentNode.left;
      }
      // Has 2 children
      else {
        // Find smallest value in right subtree
        let tempNode = this._kthSmallestNode(currentNode.right);
        currentNode.data = tempNode.data;

        currentNode.right = this._delete(currentNode.right, tempNode.data);
        return currentNode;
      }
    }
    // Iterate tree
    else {
      if (value < currentNode.data) {
        currentNode.left = this._delete(currentNode.left, value);
      }

      if (value > currentNode.data) {
        currentNode.right = this._delete(currentNode.right, value);
      }

      return currentNode;
    }
  }

  delete(value: number) {
    this._delete(this.root, value);
  }

  // Returns the node with given value
  private _find(root: null | Node, value: number): null | Node {
    if (!root) return null;

    if (root.data === value) return root;

    if (value < root.data) {
      return this._find(root.left, value);
    }

    if (value > root.data) return this._find(root.right, value);

    return null;
  }

  find(value: number) {
    return this._find(this.root, value);
  }

  levelOrder(callback?: (node: Node) => void) {
    const queue = [this.root];
    const data: number[] = [];

    // Iterate over queue while there are nodes
    while (queue.length) {
      const node = queue.shift()!;

      // Push node children into queue
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      if (callback) {
        callback(node);
      }

      data.push(node.data);
    }

    return data;
  }

  private _levelOrderRec(
    queue: Node[],
    data: number[],
    callback?: (node: Node) => void
  ): number[] {
    // Base case (queue is empty)
    if (!queue.length) return data;

    const node = queue.shift()!;

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);

    if (callback) callback(node);

    data.push(node.data);

    return this._levelOrderRec(queue, data, callback);
  }

  levelOrderRecursive(callback?: (node: Node) => void) {
    return this._levelOrderRec([this.root], [], callback);
  }

  // Left, Root, Right
  private _inorder(
    node: null | Node,
    data: number[],
    callback?: (node: Node) => void
  ): number[] {
    // Base case
    if (!node) return data;

    if (node.left) this._inorder(node.left, data, callback);

    if (callback) callback(node);
    data.push(node.data);

    if (node.right) this._inorder(node.right, data, callback);

    return data;
  }

  inorder(callback?: (node: Node) => void) {
    return this._inorder(this.root, [], callback);
  }

  // Root, Left, Right
  private _preorder(
    node: null | Node,
    data: number[],
    callback?: (node: Node) => void
  ): number[] {
    // Base case
    if (!node) return data;

    if (callback) callback(node);
    data.push(node.data);

    if (node.left) this._preorder(node.left, data, callback);
    if (node.right) this._preorder(node.right, data, callback);

    return data;
  }

  preorder(callback?: (node: Node) => void) {
    return this._preorder(this.root, [], callback);
  }

  // Left, Right, Root
  private _postorder(
    node: null | Node,
    data: number[],
    callback?: (node: Node) => void
  ): number[] {
    // Base case
    if (!node) return data;

    if (node.left) this._postorder(node.left, data, callback);
    if (node.right) this._postorder(node.right, data, callback);

    if (callback) callback(node);
    data.push(node.data);

    return data;
  }

  postorder(callback?: (node: Node) => void) {
    return this._postorder(this.root, [], callback);
  }

  private _height(root: null | Node): number {
    if (!root) return -1;

    const leftHeight = this._height(root.left);
    const rightHeight = this._height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  height(nodeValue: number) {
    const node = this.find(nodeValue);
    return node ? this._height(node) : -1;
  }

  private _depth(root: null | Node, nodeData: number, level: number): number {
    // Base case if there is no more nodes to traverse
    if (!root) return -1;

    // Node found
    if (nodeData === root.data) return level;

    // Traverse tree
    return nodeData < root.data
      ? this._depth(root.left, nodeData, level + 1)
      : this._depth(root.right, nodeData, level + 1);
  }

  depth(nodeValue: number) {
    return this._depth(this.root, nodeValue, 0);
  }

  isBalanced() {
    const leftTreeHeight = this._height(this.root.left);
    const rightTreeHeight = this._height(this.root.right);
    const heightDifference = leftTreeHeight - rightTreeHeight;

    return heightDifference === 0 || heightDifference === 1 ? true : false;
  }

  rebalance() {
    const sortedNodes = this.inorder();
    this.root = this._buildTree(sortedNodes, 0, sortedNodes.length - 1)!;
  }

  private _prettyPrint(node: Node, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this._prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this._prettyPrint(
        node.left,
        `${prefix}${isLeft ? '    ' : '│   '}`,
        true
      );
    }
  }

  print() {
    this._prettyPrint(this.root);
  }
}

export default Tree;

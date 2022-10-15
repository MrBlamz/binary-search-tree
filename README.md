# Binary Search Tree

Implementation of a binary search tree structure written in Typescript.

**Tree** class has the following methods:

- `constructor(array: number): void` - Creates the BST with the given data
- `insert(value: number): void` - Inserts a new node with the given value into the tree
- `delete(value: number): void` - Deletes the node holding the given value from the tree
- `find(value: number): Node | Null` - Returns the node holding the given value in the tree
- `levelOrder(callback?: (node: Node) => void): number[]` - Traverses each node of the tree in level order
- `levelOrderRecursive(callback?: (node: Node) => void): number[]` - Same as **levelOrder** but implemented with recursion
- `inorder(callback?: (node: Node) => void): number[]` - Traverses each node of the tree inorder
- `preorder(callback?: (node: Node) => void): number[]` - Traverses each node of the tree preorder
- `postorder(callback?: (node: Node) => void): number[]` - Traverses each node of the tree postorder
- `height(nodeValue: number): number` - Returns the height of a node -- defined as the longest path between the node and a leaf node
- `depth(nodeValue: number): number` - Returns the depth of a node -- defined as the distance between the node and the root
- `isBalanced(): boolean` - Returns true/false based on whether or not the tree is balanced
- `rebalance(): void` - Rebalances the tree
- `print(): void` - prints the tree in the console in a human reader friendly format

## Try Yourself

The **main.ts** file contains driver code that shows the **Tree** methods in action.  
To run this project, clone it to your machine and then install it's dependencies by typing **npm install**. Then run the command **npm run dev** to start the dev server.

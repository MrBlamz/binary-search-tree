// Driver code
import Tree from './tree';

// Generate random number between 0 and max
const generateRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generateRandomArray = (length: number) => {
  const array: number[] = [];

  while (length) {
    const randomNumber = generateRandomNumber(0, 100);
    array.push(randomNumber);
    length--;
  }

  return array;
};

// 1 - Create a binary search tree from an array of random numbers
const randomArray = generateRandomArray(10);
const tree = new Tree(randomArray);

// 2 - Confirm that the tree is balanced by calling isBalanced
tree.print();
console.log('Is Balanced:', tree.isBalanced());

//3 - Print out all elements in level, pre, post, and in order
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());

// 4 - Unbalance the tree by adding several numbers > 100
tree.insert(generateRandomNumber(100, 200));
tree.insert(generateRandomNumber(100, 200));
tree.insert(generateRandomNumber(100, 200));
tree.insert(generateRandomNumber(100, 200));
tree.insert(generateRandomNumber(100, 200));

// 5 - Confirm that the tree is unbalanced by calling isBalanced
tree.print();
console.log('Is Balanced:', tree.isBalanced());

// 6 - Balance the tree by calling rebalance
tree.rebalance();

// 7 - Confirm that the tree is balanced by calling isBalanced
tree.print();
console.log('Is Balanced:', tree.isBalanced());

// 8 - Print out all elements in level, pre, post, and in order
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());

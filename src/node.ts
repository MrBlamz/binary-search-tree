class Node {
  data: number;
  left: null | Node;
  right: null | Node;

  constructor(data: number) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

export default Node;

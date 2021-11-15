interface INode<T> {
  value: T | null;
  left: INode<T> | null;
  right: INode<T> | null;
}

class NodeTree<T> {
  value: T | null;
  left: INode<T> | null;
  right: INode<T> | null;
  constructor() {
    this.value = null;
    this.right = null;
    this.left = null;
  }
  add(value: T, node: INode<T>): NodeTree<T> | undefined {
    node = node || this;
    if (!node.value) {
      node.value = value;
      return;
    }
    if (value > node.value) {
      if (!node.right) {
        node.right = new NodeTree();
      }
      return this.add(value, node.right);
    } else {
      if (!node.left) {
        node.left = new NodeTree();
      }
      return this.add(value, node.left);
    }
  }

  search(value: T, node: INode<T>): INode<T> | null {
    node = node || this;
    if (node.value && value > node.value) {
      if (!node.right) {
        return null;
      }
      return this.search(value, node.right);
    } else if (node.value && value < node.value) {
      if (!node.left) {
        return null;
      }
      return this.search(value, node.left);
    } else {
      return node;
    }
  }

  getMin(node: INode<T>): INode<T> {
    node = node || this;
    if (!node.left) {
      return node;
    }
    return this.getMin(node.left);
  }
  remove(value: T, node: INode<T> | null): INode<T> | null {
    node = node || this;
    if (node.value && value > node.value) {
      if (!node.right) {
        return null;
      }
      node.right = this.remove(value, node.right);
      return node;
    } else if (node.value && value < node.value) {
      if (!node.left) {
        return null;
      }
      node.left = this.remove(value, node.left);
      return node;
    } else {
      if (!node.left && !node.right) {
        node = null;
        return node;
      } else if (!node.right) {
        node = node.left;
        return node;
      } else if (!node.left) {
        node = node.right;
        return node;
      } else {
        let min = this.getMin(node.right);
        node.value = min.value;
        if (min.value) {
          node.right = this.remove(min.value, node.right);
        }
        return node;
      }
    }
  }
}

function fastSort(array: number[]): number[] {
  if (array.length <= 1) {
    return array;
  }
  let centerElementIndex: number = Math.floor(array.length / 2);
  let centerElement: number = array[centerElementIndex];
  let minArray: number[] = [];
  let maxArray: number[] = [];
  for (let i = 0; i < array.length; i++) {
    if (i === centerElementIndex) {
      continue;
    }
    if (array[i] < centerElement) {
      minArray.push(array[i]);
    } else {
      maxArray.push(array[i]);
    }
  }
  return [...fastSort(minArray), centerElement, ...fastSort(maxArray)];
}

function bubbleSort(array: number[]): number[] {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        let buffer = array[j];
        array[j] = array[j + 1];
        array[j + 1] = buffer;
      }
    }
  }
  return array;
}

class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const new_head = new this.Node({ element, next: this._head(), prev: this._sentinel });
    this._head().prev = new_head;
    this._sentinel.next = new_head;

    return new_head;
  }

  insertTail(element) {
    const new_tail = new this.Node({ element, next: this._sentinel, prev: this._tail() });
    this._tail().next = new_tail;
    this._sentinel.prev = new_tail;

    return new_tail;
  }

  removeHead() {
    return this._head().remove()
  }

  removeTail() {
    return this._tail().remove();
  }

  remove(node) {
    let currentNode = this._head();

    while (currentNode._active) {
      if (currentNode == node) {
        return currentNode.remove();
      }

      currentNode = currentNode.next;
    }
  }

  forEach(callback, newObject = this) {
    let currNode = this._head();
    let i = 0;

    while (currNode._active) {
      callback(currNode.element, i, newObject);
      i++;
      currNode = currNode.next;
    }
  }

  count() {
    let count = 0;
    let currentNode = this._head();

    while (currentNode._active) {
      count++;
      currentNode = currentNode.next;
    }

    return count;
  }
}

export default DoublyLinkedList;
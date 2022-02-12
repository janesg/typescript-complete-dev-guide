import { AbstractSortable } from './AbstractSortable';

export class SortableLinkedList extends AbstractSortable {
    private len: number;
    private head: Node | null;
    private tail: Node | null;

    constructor() {
        super();
        this.len = 0;
        this.head = null;
        this.tail = null;
    }

    add(value: any): void {
        const newNode = new Node(value);
        if (!this.tail) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode; 
        }
        this.len += 1;
    }

    get(idx: number): any {
        if (idx >= this.len) {
            throw `Index: ${idx} is invalid for list of length: ${this.len}`
        }

        let tmp = this.head;
        for (let i = 0; i < idx; i++) {
            if (!tmp) {
                throw `Unexpected null value at index: ${idx}`
            } else {
                tmp = tmp.next;
            }
        }

        return tmp?.value;
    }

    getAll(): any[] {
        const data: any[] = [];
        
        let tmp = this.head;
        while (tmp) {
            data.push(tmp.value);
            tmp = tmp.next;
        }

        return data;
    }

    private getNode(idx: number): any {
        if (idx >= this.len) {
            throw `Index: ${idx} is invalid for list of length: ${this.len}`
        }

        let tmp = this.head;
        for (let i = 0; i < idx; i++) {
            if (!tmp) {
                throw `Unexpected null value at index: ${idx}`
            } else {
                tmp = tmp.next;
            }
        }

        return tmp;
    }

    get length(): number {
        return this.len;
    }

    compare(idx1: number, idx2: number): number {
        if (this.get(idx1) > this.get(idx2)) {
            return 1;
        } else if (this.get(idx1) < this.get(idx2)) {
            return -1;
        } else {
            return 0;
        }
    }

    swap(idx1: number, idx2: number): void {
        // We are not swapping the actual nodes
        // ..instead we just swap the node values
        const val1 = this.getNode(idx1);
        const val2 = this.getNode(idx2);

        const tmp = val1.value;
        val1.value = val2.value;
        val2.value = tmp;
    }
}

class Node {
    value: any;
    next: Node | null;

    constructor(value: any) {
        this.value = value;
        this.next = null;
    }
}
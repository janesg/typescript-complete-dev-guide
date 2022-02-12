import { AbstractSortable } from './AbstractSortable';

export class SortableArray extends AbstractSortable {
    constructor(public data: any[]) {
        super();
    }

    get length(): number {
        return this.data.length;
    }

    compare(idx1: number, idx2: number) {
        if (this.data[idx1] > this.data[idx2]){
            return 1
        } else if (this.data[idx1] < this.data[idx2]) {
            return -1
        } else {
            return 0;
        }
    }

    swap(idx1: number, idx2: number) {
        const tmp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = tmp;
    }
}
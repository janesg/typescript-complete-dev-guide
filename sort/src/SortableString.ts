import { AbstractSortable } from './AbstractSortable';

export class SortableString extends AbstractSortable {
    private caseless: boolean;
    data: string;

    constructor(data: string, caseless: boolean = false) {
        super();
        this.data = data;
        this.caseless = caseless;
    };

    get length() {
        return this.data.length;
    }

    compare(idx1: number, idx2: number) {
        const char1 = this.caseless ? 
            this.data.charAt(idx1).toLowerCase() : this.data.charAt(idx1);
        const char2 = this.caseless ?
            this.data.charAt(idx2).toLowerCase() : this.data.charAt(idx2);
        if (char1 > char2) {
            return 1;
        } else if (char1 < char2) {
            return -1;
        } else {
            return 0;
        }
    }

    // swap(idx1: number, idx2: number) {
    //     const tmpChar = this.data.charAt(idx1);
    //     let tmpStr = this.data.substring(0, idx2) + tmpChar
    //     if (idx2 != this.length) {
    //         tmpStr = tmpStr + this.data.substring(idx2 + 1);
    //     }
    //     this.data = tmpStr.substring(0, idx1) + 
    //                 this.data.charAt(idx2) +
    //                 tmpStr.substring(idx1 + 1);
    // }

    swap(idx1: number, idx2: number) {
        const chars = this.data.split('');
        const tmp = chars[idx1];
        chars[idx1] = chars[idx2]
        chars[idx2] = tmp;
        this.data = chars.join('');
    }
}
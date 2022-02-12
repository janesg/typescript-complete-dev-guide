import { Sortable } from './Sortable';

export class Sorter {
    static sort(sortable: Sortable): void {
        const { length: len } = sortable;

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (sortable.compare(j, j + 1) > 0) {
                    sortable.swap(j, j + 1);
                }
            }
        }
    }
}

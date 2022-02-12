import { Sortable } from './Sortable';
import { Sorter } from './Sorter';

export abstract class AbstractSortable implements Sortable {
    abstract get length(): number;
    abstract compare(idx1: number, idx2: number): number;
    abstract swap(idx1: number, idx2: number): void;
    sort(): void {
        Sorter.sort(this);
    }
}
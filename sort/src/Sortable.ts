export interface Sortable {
    length: number;
    // Return 
    //  - 0 if elements at idx1 and idx2 are equal
    //  - 1 if element at idx1 > element at idx2
    //  else -1
    compare(idx1: number, idx2: number): number;
    swap(idx1: number, idx2: number): void;
}
import { ModelAttributes } from './Model';

export class Attributes<T> implements ModelAttributes<T> {
    constructor(private data: T) {}

    // Generic key constraint means that K can only ever be one of the keys of T
    // Return type is the type of the lookup of T using key of K
    //
    // Use an arrow function so that context of 'this' is always bound to the correct object
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    }

    set = (updates: T): void => {
        // Overwrite first object with second object
        Object.assign(this.data, updates);
    }

    getData = (): T => {
        return this.data;
    }
}
import { AxiosPromise, AxiosResponse } from 'axios';

export interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    getData(): T;
    set(updates: T): void;
}

export interface SyncAware<T> {
    fetch(id : number): AxiosPromise;
    fetchAll(): AxiosPromise;
    save(data: T): AxiosPromise;
}

// Create a type alias for callback function that returns void
export interface EventAware {
    on: (eventName: string, callback: Callback) => void;
    trigger: (eventName: string) => void;
}

export type Callback = () => void;

export interface HasOptionalIdentity {
    id?: number;
}

export abstract class Model<T extends HasOptionalIdentity> {
    // Use argument default to provide a default EventAware implementation
    constructor(
        private attrs: ModelAttributes<T>, 
        private eventAware: EventAware, 
        private syncAware: SyncAware<T>) {
    }

    // Can only use this shortened syntax if we have no code in the constructor
    // because these following assignments will happen before the constructor runs.
    // If constructor has to have code then use 'getter' style instead:
    //      get on() {
    //          return this.eventAware.on;
    //      }
    on = this.eventAware.on;
    trigger = this.eventAware.trigger;
    get = this.attrs.get;

    get data() {
        return this.attrs.getData();
    }

    set(updates: T): void {
        this.attrs.set(updates);
        this.eventAware.trigger('change');
    }

    fetch(): void {
        // Get this user's id... only has one if it's been saved already
        const id = this.attrs.get('id');

        if (typeof id !== 'number') {
            throw new Error('Unable to fetch user without an id');
        }

        this.syncAware.fetch(id)
            .then((response: AxiosResponse): void => {
                // Use this class's method so that 'change' event is triggered
                this.set(response.data);
            })
            .catch(() => {
                this.eventAware.trigger('error');
            });
    }

    save(): void {
        this.syncAware.save(this.attrs.getData())
            .then((response: AxiosResponse): void => {
                this.eventAware.trigger('save');
            })
            .catch(() => {
                this.eventAware.trigger('error');
            });
    }
}
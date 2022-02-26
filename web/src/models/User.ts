import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { EventManager } from './EventManager';
import { SyncManager, HasOptionalIdentity } from './SyncManager';

interface UserProps extends HasOptionalIdentity {
    id?: number;
    name?: string;
    age?: number;
}

const baseUrl = 'http://localhost:3000/users';

export class User {
    private attrs: Attributes<UserProps>;
    private syncManager = new SyncManager<UserProps>(baseUrl);

    // Use argument default to provide a default EventAware implementation
    constructor(data: UserProps, private eventAware = new EventManager()) {
        this.attrs = new Attributes<UserProps>(data);
    }

    // Rather than using a passthrough of params to call the target function, 
    // we instead use a getter to return the target function itself
    get on() {
        return this.eventAware.on;
    }

    get trigger() {
        return this.eventAware.trigger;
    }

    get get() {
        return this.attrs.get;
    }

    set(updates: UserProps): void {
        this.attrs.set(updates);
        this.eventAware.trigger('change');
    }

    fetch(): void {
        // Get this user's id... has to have been saved already
        const id = this.attrs.get('id');

        if (typeof id !== 'number') {
            throw new Error('Unable to fetch user without an id');
        }

        this.syncManager.fetch(id)
            .then((response: AxiosResponse): void => {
                // Use this class's method so that 'change' event is triggered
                this.set(response.data);
            })
            .catch(() => {
                this.eventAware.trigger('error');
            });
    }

    save(): void {
        this.syncManager.save(this.attrs.getAll())
            .then((response: AxiosResponse): void => {
                this.eventAware.trigger('save');
            })
            .catch(() => {
                this.eventAware.trigger('error');
            });
    }
}
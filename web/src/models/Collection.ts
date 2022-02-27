import { AxiosResponse } from 'axios';
import { EventAware, Model, SyncAware } from './Model';

export class Collection<E extends Model<T>, T> {
    private models: E[] = [];

    constructor(
        private eventAware: EventAware, 
        private syncAware: SyncAware<T>,
        private mapper: (json: T) => E) {
    }

    // Have to use getter style because assignment during constructor
    get on() { 
        return this.eventAware.on;
    }
    
    get trigger() {
        return this.eventAware.trigger;
    }

    fetch(): void {
        this.syncAware.fetchAll()
            .then((response: AxiosResponse) => {
                response.data.forEach((dataItem: T) => {
                    this.models.push(this.mapper(dataItem));
                });

                this.eventAware.trigger('change');
            });
    }

    get data(): E[] {
        return this.models;
    }
}
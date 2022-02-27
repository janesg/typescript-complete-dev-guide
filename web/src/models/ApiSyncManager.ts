import axios, { AxiosPromise } from 'axios';
import { HasOptionalIdentity, SyncAware } from './Model';

export class ApiSyncManager<T extends HasOptionalIdentity> implements SyncAware<T> {
    constructor(private baseUrl: string) {}

    fetch(id : number): AxiosPromise {
        return axios.get(`${this.baseUrl}/${id}`);
    }

    fetchAll(): AxiosPromise {
        return axios.get(`${this.baseUrl}`);
    }

    save(data: T): AxiosPromise {
        // Destructure the id from the data
        const { id } = data;

        if (id) {
            return axios.put(`${this.baseUrl}/${id}`, data);
        } else {
            return axios.post(this.baseUrl, data);
        }
    }
}
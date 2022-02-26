import axios, { AxiosPromise } from 'axios';

export interface HasOptionalIdentity {
    id?: number;
}

export class SyncManager<T extends HasOptionalIdentity> {
    constructor(private baseUrl: string) {}

    fetch(id : number): AxiosPromise {
        return axios.get(`${this.baseUrl}/${id}`);
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
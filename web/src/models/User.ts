import axios, { AxiosResponse } from 'axios';

const baseUrl = 'http://localhost:3000';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

// Create a type alias for callback function that returns void
type Callback = () => void;

export class User {
    private eventMap = new Map<string, Callback[]>();

    constructor(private data: UserProps) {}

    get(propName: string): (string | number) {
        return this.data[propName];
    }

    set(updates: UserProps): void {
        // Overwrite first object with second object
        Object.assign(this.data, updates);
    }

    on(eventName: string, callback: Callback): void {
        const callbacks = this.eventMap.get(eventName) || [];
        this.eventMap.set(eventName, [...callbacks, callback]);
    }

    trigger(eventName: string): void {
        const callbacks = this.eventMap.get(eventName) || [];
        callbacks.forEach(cb => cb());
    }

    fetch(): void {
        axios.get(`${baseUrl}/users/${this.get('id')}`)
            .then((response: AxiosResponse): void => {
                this.set(response.data);
            }
        );
    }

    save(): void {
        const id = this.get('id');

        if (id) {
            axios.put(`${baseUrl}/users/${id}`, this.data)
                .then((response: AxiosResponse): void => {
                    this.set(response.data);
                }
            );
        } else {
            axios.post(`${baseUrl}/users`, this.data)
                .then((response: AxiosResponse): void => {
                    this.set(response.data);
                }
            );
        }
    }
}
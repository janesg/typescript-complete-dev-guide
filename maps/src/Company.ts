import faker from '@faker-js/faker';
import { Mappable } from './CustomMap';

export class Company implements Mappable {
    name: string;
    catchPhrase: string;
    location: {
        lat: number;
        lng: number;
    };

    constructor() {
        this.name = faker.company.companyName();
        this.catchPhrase = faker.company.catchPhrase();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
    }

    content(): string {
        return `
            <div>
                <h2>Company : ${this.name}</h2>
                <h3>Catch phrase : ${this.catchPhrase}</h3>
            </div>
        `;
    }
}

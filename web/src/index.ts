import { ApiSyncManager } from './models/ApiSyncManager';
import { Collection } from './models/Collection';
import { EventManager } from './models/EventManager';
import { User, UserData } from './models/User';

const populateUsers = (): void => {
    const gary = new User({ name: 'Gary', age: 56 });
    console.log(`User: ${JSON.stringify(gary)}`);
    gary.set({ name: 'Big G' });
    console.log(`User: ${JSON.stringify(gary)}`);

    gary.on('click', () => console.log("I got a click event"));
    gary.on('click', () => console.log("I got another click event"));
    gary.trigger('click');
    gary.trigger('dummy');
    gary.save();
    console.log(`User: ${JSON.stringify(gary)}`);

    const enid = new User({ name: 'Enid', age: 27 });
    console.log(`User: ${JSON.stringify(enid)}`);
    enid.save();
    console.log(`User: ${JSON.stringify(enid)}`);
}

// populateUsers();

const eventAware = new EventManager();
const userSyncAware = new ApiSyncManager<UserData>(User.baseUrl);
const userMapper = (userData: UserData) => new User(userData, eventAware, userSyncAware);
const users = new Collection<User, UserData>(eventAware, userSyncAware, userMapper);

users.on('change', () => {
    console.log('Received notification that user collection has changed');
    users.data.forEach((user: User) => {
        const { id, name, age } = user.data;
        console.log(`User - id: ${id}, name: ${name}, age: ${age}\n`)
    });
})
console.log('Fetching users...');
users.fetch();
console.log('Users fetched');

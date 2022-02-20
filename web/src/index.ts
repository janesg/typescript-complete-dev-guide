import { User } from './models/User';

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


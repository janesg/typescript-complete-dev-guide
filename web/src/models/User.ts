import { ApiSyncManager } from './ApiSyncManager';
import { Attributes } from './Attributes';
import { EventManager } from './EventManager';
import { EventAware, Model, SyncAware } from './Model';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const baseUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
    // Use parameter defaults to create default implementations if none provided
    constructor(
        data: UserProps, 
        eventAware: EventAware = new EventManager(), 
        syncAware: SyncAware<UserProps> = new ApiSyncManager<UserProps>(baseUrl)) {

        super(new Attributes<UserProps>(data), eventAware, syncAware);
    }
}
import { ApiSyncManager } from './ApiSyncManager';
import { Attributes } from './Attributes';
import { EventManager } from './EventManager';
import { EventAware, Model, SyncAware } from './Model';

export interface UserData {
    id?: number;
    name?: string;
    age?: number;
}

export class User extends Model<UserData> {
    public static baseUrl = 'http://localhost:3000/users';

    // Use parameter defaults to create default implementations if none provided
    constructor(
        data: UserData, 
        eventAware: EventAware = new EventManager(), 
        syncAware: SyncAware<UserData> = new ApiSyncManager<UserData>(User.baseUrl)) {

        super(new Attributes<UserData>(data), eventAware, syncAware);
    }
}
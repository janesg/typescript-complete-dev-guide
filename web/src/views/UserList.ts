import { User, UserData } from '../models/User';
import { CollectionView } from './CollectionView'
import { UserDetail } from './UserDetail';

export class UserList extends CollectionView<User, UserData> {

    renderItem(model: User, itemParent: Element): void {
        new UserDetail(itemParent, model).render();
    }
}
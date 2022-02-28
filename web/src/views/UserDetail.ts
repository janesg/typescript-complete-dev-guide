import { View } from './View';
import { User } from '../models/User';

export class UserDetail extends View<User> {

    template = (): string => {
        return `
            <div>
                <div>"Id : "${this.model.get('id')}" - Name : ${this.model.get('name')}" - Age : "${this.model.get('age')}"</div>
            </div>
        `;
    }
}
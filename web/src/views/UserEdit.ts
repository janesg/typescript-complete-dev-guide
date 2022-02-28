import { View } from './View';
import { User } from '../models/User';
import { UserShow } from './UserShow';
import { UserForm } from './UserForm';

export class UserEdit extends View<User> {

    regionSelectorMap(): Map<string, string> {
        return new Map<string, string>([
            ['userShow', '#user-show'],
            ['userForm', '#user-form']
        ]);
    }

    onRender(): void {
        // Nested view rendering
        const showElem = this.regionMap.get('userShow');
        if (showElem) {
            new UserShow(showElem, this.model).render();
        }

        const formElem = this.regionMap.get('userForm');
        if (formElem) {
            new UserForm(formElem, this.model).render();
        }
    }

    template = (): string => {
        return `
            <div>
                <div id="user-show"></div>
                <div id="user-form"></div>
            </div>
        `;
    }
}
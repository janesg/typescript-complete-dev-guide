import { View } from './View';
import { User } from '../models/User';

export class UserForm extends View<User> {
    
    eventCallbackMap = (): Map<string, () => void> => {
        return new Map<string, () => void>([
            ['click:#set-name', this.onSetNameClick],
            ['click:#set-age', this.onSetAgeClick],
            ['click:#save-model', this.onSaveModelClick]
        ]);
    }

    onSetNameClick = (): void => {
        // Find the input element under the parent
        const input = this.parent.querySelector('input');

        if (input) {
            const newName = input.value;
            this.model.set({ 'name': newName });
        }
    }

    onSetAgeClick = (): void => {
        const newAge = Math.floor(Math.random() * 100) + 1;
        this.model.set({ 'age': newAge });
    }

    onSaveModelClick = (): void => {
        this.model.save();
    }

    template = (): string => {
        return `
            <div>
                <input placeholder="${this.model.get('name')}"/>
                <button id="set-name">Set Name</button>
                <button id="set-age">Set Random Age</button>
                <button id="save-model">Save</button>
            </div>
        `;
    }
}
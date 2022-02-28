import { User } from '../models/User';

export class UserForm {
    constructor(private parent: HTMLElement, private model: User) {
        this.bindModel();
    };

    bindModel() {
        this.model.on('change', () => this.render())
    }

    eventMap = (): Map<string, () => void> => {
        return new Map<string, () => void>([
            ['click:button', this.onButtonClick],
            ['mouseenter:h1', this.onHeaderHover],
            ['click:#set-name', this.onSetNameClick],
            ['click:#set-age', this.onSetAgeClick],
        ]);
    }

    onButtonClick = (): void => {
        console.log('You clicked a button');
    }

    onHeaderHover = (): void => {
        console.log('You hovered on the H1 header');
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

    template = (): string => {
        return `
            <div>
                <h1>User Form</h1>
                <div>User: ${this.model.get('name')}</div>
                <div>Age: ${this.model.get('age')}</div>
                <input />
                <button id="set-name">Set Name</button>
                <button id="set-age">Set Random Age</button>
            </div>
        `;
    }

    bindEvents = (fragment: DocumentFragment): void => {
        this.eventMap().forEach((value, key) => {
            // Destructuring the returned array
            const [eventName, selector] = key.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, value);
            });
        });
    }

    render = (): void => {
        // Clear any existing content...simplistic approach to updating view
        this.parent.innerHTML = '';

        const templateElem = document.createElement('template');
        templateElem.innerHTML = this.template();
        this.bindEvents(templateElem.content);
        this.parent.append(templateElem.content);
    }
}
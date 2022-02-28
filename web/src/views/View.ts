import { EventAware } from '../models/Model';

export abstract class View<T extends EventAware> {

    protected regionMap: Map<string, Element> = new Map();

    constructor(protected parent: Element, protected model: T) {
        this.bindModel();
    };

    bindModel() {
        this.model.on('change', () => this.render())
    }

    // Map of event v callback function - default empty implementation
    protected eventCallbackMap(): Map<string, () => void> {
        return new Map();
    };

    // Map of region v selector - default empty implementation
    protected regionSelectorMap(): Map<string, string> {
        return new Map();
    }

    protected onRender(): void {}

    abstract template(): string;

    mapRegions(fragment: DocumentFragment): void {
        this.regionSelectorMap().forEach((value, key) => {
            const regionElement = fragment.querySelector(value);
            if (regionElement) {
                this.regionMap.set(key, regionElement);
            }
        });
    }

    bindEvents = (fragment: DocumentFragment): void => {
        this.eventCallbackMap().forEach((value, key) => {
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
        this.mapRegions(templateElem.content);

        this.onRender();

        this.parent.append(templateElem.content);
    }
}
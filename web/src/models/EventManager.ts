import { Callback, EventAware } from './Model';

export class EventManager implements EventAware {
    private eventMap = new Map<string, Callback[]>();

    // Use a bound function (i.e. an arrow function) so that context of 'this' 
    // is always bound to the correct object
    on = (eventName: string, callback: Callback): void => {
        const callbacks = this.eventMap.get(eventName) || [];
        this.eventMap.set(eventName, [...callbacks, callback]);
    }

    trigger = (eventName: string): void => {
        const callbacks = this.eventMap.get(eventName) || [];
        callbacks.forEach(cb => cb());
    }
}
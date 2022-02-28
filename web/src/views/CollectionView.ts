import { Collection } from '../models/Collection';
import { Model } from '../models/Model';

export abstract class CollectionView<T extends Model<S>, S> {

    constructor(
        protected parent: Element, protected collection: Collection<T, S>) {
    };

    abstract renderItem(model: T, itemParent: Element): void;

    render = (): void => {
        // Clear any existing content...simplistic approach to updating view
        this.parent.innerHTML = '';

        const templateElem = document.createElement('template');
        this.collection.data.forEach(item => {
            const itemParentElem = document.createElement('div');
            this.renderItem(item, itemParentElem);
            templateElem.content.append(itemParentElem);
        })

        this.parent.append(templateElem.content);
    }
}
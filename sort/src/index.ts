import { SortableArray } from './SortableArray';
import { SortableLinkedList } from './SortableLinkedList';
import { SortableString } from './SortableString';
import { Sorter } from './Sorter';

const numberCollection = new SortableArray([2, -1, 7, 9, 3]);
console.log(`Pre-sort : ${numberCollection.data}`);
numberCollection.sort();
console.log(`Sorted   : ${numberCollection.data}`);

const stringCollection = new SortableArray(['cat', 'can', 'due', 'bob', 'Cod', 'cod']);
console.log(`Pre-sort : ${stringCollection.data}`);
stringCollection.sort();
console.log(`Sorted   : ${stringCollection.data}`);

const string = new SortableString('fEdCbA');
console.log(`Pre-sort : ${string.data}`);
string.sort();
console.log(`Sorted   : ${string.data}`);

const caselessString = new SortableString('fEdCbA', true);
console.log(`Pre-sort : ${caselessString.data}`);
caselessString.sort();
console.log(`Sorted   : ${caselessString.data}`);

const sll = new SortableLinkedList();
sll.add('ghi');
sll.add('def');
sll.add('abc');
console.log(sll.get(1));
console.log(sll.getAll());
console.log(`Pre-sort : ${sll.getAll()}`);
sll.sort();
console.log(`Sorted   : ${sll.getAll()}`);

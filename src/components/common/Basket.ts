import { View } from "../base/View";
import { ensureElement, createElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";



interface IBasketView {
    items: HTMLElement[];
    total: number;
}

export class Basket extends View<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

        
            this._button.addEventListener('click', () => {    // вешаем обработчик, открываем окно оформления заказа
                events.emit('order:open');
            });
        

        this.items = []; //чтобы корзина была пуста при открытии приложения
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
                this._button.removeAttribute('disabled');
               
            
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Тут так пусто...'
            }));
                this._button.setAttribute('disabled', '');
            
        }
    }

    set total(total: number) {
        this.setText(this._total, total + ' синапсов');
    }
}
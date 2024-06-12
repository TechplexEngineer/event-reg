import type { Action } from 'svelte/action';

type listenerCb = (this: HTMLElement, ev: MouseEvent | KeyboardEvent) => any

export const click: Action<HTMLElement, listenerCb> = ((node, callback) => {
    node.addEventListener('click', callback)
    node.addEventListener('keypress', callback)

    return {
        destroy() {
            node.removeEventListener('click', callback)
            node.removeEventListener('keypress', callback)
        }
    }
});
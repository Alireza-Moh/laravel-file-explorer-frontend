import {defineStore} from "pinia";

export const useSelectedItemsStore = defineStore("selectedItems", {
    state: () => ({
        items: [],
    }),
    getters: {
        getSelectedItems: (state) => {
            return state.items;
        },
        getSelectedItemByName(state) {
            return (itemName) => state.items.find((item) => item.name === itemName);
        }
    },
    actions: {
        addItem(item) {
            this.items.push(item);
        },
        removeItemFromList(itemToDelete) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].name === itemToDelete.name) {
                    this.items.splice(i, 1);
                    break;
                }
            }
        },
        uncheckItems() {
            this.items = [];
        }
    }
});
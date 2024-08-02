export default function searchAndUpdate(items, updatedItem, oldName) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].parent === updatedItem.parent && items[i].name === oldName) {
            items[i] = updatedItem;
        }

        if (items[i].subDir.length) {
            searchAndUpdate(items[i].subDir, updatedItem, oldName);
        }
    }
}
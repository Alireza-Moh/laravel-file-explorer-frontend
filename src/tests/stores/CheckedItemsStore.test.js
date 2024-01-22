import {createPinia, setActivePinia} from "pinia";
import {useCheckedItemsStore} from "@/stores/checkedItemsStore.js";

describe('useCheckedItemsStore', () => {
    let store;
    const targetItem =   {
        "diskName": "tests",
        "dirName": "android",
        "name": "4665_001v.png",
        "size": 64.61,
        "lastModified": "2024-01-10 05:31:56",
        "type": "file",
        "path": "android/4665_001v.png",
        "url": "http://localhost:8084/storage/tests/android/4665_001v.png",
        "extension": "png"
    };

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useCheckedItemsStore();
    });

    test("should initialize with correct values", () => {
        expect(store.items).toHaveLength(0);
    });

    test('should add an item to the list', () => {
        store.addItem(targetItem);

        expect(store.items[0]).toEqual(targetItem);
    });

    test('should remove an item from the list', async () => {
        store.addItem(targetItem);
        store.removeItemFromList(targetItem);

        expect(store.items).toHaveLength(0);
    });
});
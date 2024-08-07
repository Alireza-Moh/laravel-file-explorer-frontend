import {createPinia, setActivePinia} from "pinia";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import randomItems from "@/tests/testData/randomItems.json";

describe('useDirItemsStore', () => {
    let store;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useDirItemsStore();
    });

    test("should initialize with correct values", () => {
        expect(store.data).toHaveLength(0);
    });

    test('should add an dir to the list', () => {
        store.addNewDirWithItems(
            dirItemsStoreTestData.diskName,
            dirItemsStoreTestData.parent,
            dirItemsStoreTestData.selectedDirPath,
            dirItemsStoreTestData.dirItems
        );

       expect(store.data).toEqual([dirItemsStoreTestData]);
    });


    test('should update items for dir', async () => {
        store.addNewDirWithItems(
            dirItemsStoreTestData.diskName,
            dirItemsStoreTestData.parent,
            dirItemsStoreTestData.selectedDirPath,
            dirItemsStoreTestData.dirItems
        );

        store.replaceItemsInDir(randomItems, "tests", "android");

        expect(store.data[0].dirItems).toHaveLength(randomItems.length);
    });

    test('should get directory items using getters', () => {
        const diskName = 'tests';
        const dirName = 'android';
        store.addNewDirWithItems(
            dirItemsStoreTestData.diskName,
            dirItemsStoreTestData.parent,
            dirItemsStoreTestData.selectedDirPath,
            dirItemsStoreTestData.dirItems
        );

        const retrievedDir = store.getDirItems(diskName, dirName);

        expect(retrievedDir.diskName).toBe(diskName);
        expect(retrievedDir.parent).toBe(dirName);
    });
});
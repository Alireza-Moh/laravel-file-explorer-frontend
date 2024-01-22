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
        const dir = dirItemsStoreTestData.data[0];
        store.addNewDirWithItems(dir.diskName, dir.dirName, dir.selectedDirPath, dir.dirItems);

       expect(store.data[0]).toEqual(dir);
    });


    test('should update items for dir', async () => {
        const dir = dirItemsStoreTestData.data[0];
        store.addNewDirWithItems(dir.diskName, dir.dirName, dir.selectedDirPath, dir.dirItems);
        store.updateDir(randomItems, "tests", "android");

        expect(store.data[0].dirItems).toHaveLength(randomItems.length);
    });

    test('should get directory items using getters', () => {
        const diskName = 'tests';
        const dirName = 'android';
        const dir = dirItemsStoreTestData.data[0];
        store.addNewDirWithItems(dir.diskName, dir.dirName, dir.selectedDirPath, dir.dirItems);

        const retrievedDir = store.getDirItems(diskName, dirName);

        expect(retrievedDir).toBeTruthy();
        expect(retrievedDir.diskName).toBe(diskName);
        expect(retrievedDir.dirName).toBe(dirName);
    });
});
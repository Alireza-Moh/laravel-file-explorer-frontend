import {createPinia, setActivePinia} from "pinia";
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json"

describe('useDirItemsStore', () => {
    let store;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useDiskDirsStore();
    });

    test("should initialize with correct values", () => {
        expect(store.dirs).toHaveLength(0);
    });

    test('should add a disk to the list', () => {
        store.addDiskDirs(diskDirsStoreTestData.dirs[0]);

        expect(store.dirs).toHaveLength(1);
    });


    test('should replace directories of disk with new directories', async () => {
        const dirs = [
            {
                "diskName": "tests",
                "dirName": "android",
                "name": "bbb",
                "size": "-",
                "lastModified": "-",
                "type": "dir",
                "path": "android/aa",
                "extension": null
            },
            {
                "diskName": "tests",
                "dirName": "android",
                "name": "ccc",
                "size": "-",
                "lastModified": "-",
                "type": "dir",
                "path": "android/aa",
                "extension": null
            }
        ];
        store.addDiskDirs(diskDirsStoreTestData.dirs[0]);
        store.replaceDirsForDisk("tests", dirs);

        expect(store.dirs[0].dirs).toEqual(expect.arrayContaining(dirs));
    });

    test('should get directory items using getters', () => {
        store.addDiskDirs(diskDirsStoreTestData.dirs[0]);

        const disk = store.getDiskDirs("tests");

        expect(disk.diskName).toBe("tests");
    });
});
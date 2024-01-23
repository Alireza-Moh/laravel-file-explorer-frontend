import {createPinia, setActivePinia} from "pinia";
import {useSettingsStore} from "@/stores/settingsStore.js";

describe('useSettingsStore', () => {
    let store;
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
    const items = [
        {
            "diskName": "tests",
            "dirName": "android",
            "name": "4665_001v.png",
            "size": 85.39,
            "lastModified": "2024-01-11 00:31:03",
            "type": "file",
            "path": "android/4665_001v.png",
            "url": "http://localhost:8084/storage/tests/android/4665_001v.png",
            "extension": "png"
        },
        {
            "diskName": "tests",
            "dirName": "android",
            "name": "4665_001v.png",
            "size": 61.23,
            "lastModified": "2024-01-03 20:21:46",
            "type": "file",
            "path": "android/4665_001v.png",
            "url": "http://localhost:8084/storage/tests/android/4665_001v.png",
            "extension": "png"
        },
        {
            "diskName": "tests",
            "dirName": "android",
            "name": "4665_001v.png",
            "size": 9.77,
            "lastModified": "2024-01-05 23:57:07",
            "type": "file",
            "path": "android/4665_001v.png",
            "url": "http://localhost:8084/storage/tests/android/4665_001v.png",
            "extension": "png"
        }
    ];

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useSettingsStore();
    });

    test("should initialize with correct values", () => {
        expect(store.baseUrl).toBe("");
        expect(store.defaultFileExplorerViewData).toEqual({});
    });

    test('should set the baseUrl', () => {
        const url = "http://localhost:8787/my-website/cms";

        store.setBaseUrl(url);

        expect(store.baseUrl).toBe(url);
    });

    test('should set the defaultFileExplorerViewData', () => {
        const defaultSetting = {
            selectedDisk: "tests",
            selectedDir: "android",
            selectedDirPath: "android",
            dirsForSelectedDisk: dirs,
            selectedDirItems: items,
        }

        store.setDefaultFileExplorerViewData("tests", "android", "android", dirs, items);

        expect(store.defaultFileExplorerViewData).toEqual(defaultSetting);
    });

    test('should replace selected items with new items for the specified directory', () => {
        store.setDefaultFileExplorerViewData("tests", "android", "android", [], []);

        store.replaceItemsForSelectedDir("tests", "android", items);

        expect(store.defaultFileExplorerViewData.selectedDirItems).toEqual(expect.arrayContaining(items));
    });

    test('should replace selected directories with new directories for the specified disk', () => {
        store.setDefaultFileExplorerViewData("tests", "android", "android", [], []);

        store.replaceDirsForSelectedDisk("tests", "android", dirs);

        expect(store.defaultFileExplorerViewData.dirsForSelectedDisk).toEqual(expect.arrayContaining(dirs));
    });
});
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import TreeContainer from "@/components/dirTree/TreeContainer.vue";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import DirTree from "@/components/dirTree/components/DirTree.vue";
import {useSettingsStore} from "@/stores/settingsStore.js";

describe.concurrent("TreeContainer component", () => {
    let wrapper, settingsStore;

    beforeEach(() => {
        wrapper = mount(TreeContainer, {
            global: {
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings:settingsStoreTestData,
                        }
                    })
                ]
            }
        });

        settingsStore = useSettingsStore();
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render DiskList component", () => {
        expect(TreeContainer).toBeTruthy();
    });

    test("should contain all expected directories in the component's 'dirs' data", () => {
        const expectedDirs = settingsStoreTestData.defaultFileExplorerViewData.dirsForSelectedDisk;

        expect(wrapper.vm.dirs).toEqual(expect.arrayContaining(expectedDirs));
    });

    test("should validate the structure and data of the first directory and its subdirectory", () => {
        const firstDir = wrapper.vm.dirs[0];

        expect(firstDir.diskName).toBe('tests');
        expect(firstDir.label).toBe('android');
        expect(firstDir.path).toBe('android');
        expect(firstDir.subDir.length).toBe(1);

        const subDir = firstDir.subDir[0];
        expect(subDir.diskName).toBe('tests');
        expect(subDir.label).toBe('forTesting');
        expect(subDir.path).toBe('android/forTesting');
        expect(subDir.subDir).toEqual([]);
    });

    test("should render the DirTree component", () => {
        const dirTree =  wrapper.findComponent(DirTree);

        expect(dirTree.exists()).toBe(true);
    });

    it('should update selectedDir when the settingsStore state changes', async () => {
        const newDirsForSelectedDisk = [
            {
                "diskName": "tests",
                "label": "android",
                "path": "android",
                "subDir": [
                    {
                        "diskName": "tests",
                        "label": "all",
                        "path": "android/all",
                        "subDir": []
                    }
                ]
            },
            {
                "diskName": "tests",
                "label": "ios",
                "path": "ios",
                "subDir": [
                    {
                        "diskName": "tests",
                        "label": "aaassss",
                        "path": "ios/aaassss",
                        "subDir": [
                            {
                                "diskName": "tests",
                                "label": "inOmB",
                                "path": "ios/aaassss/inOmB",
                                "subDir": []
                            }
                        ]
                    }
                ]
            }
        ];

        settingsStore.$patch((state) => {
            state.defaultFileExplorerViewData.dirsForSelectedDisk = newDirsForSelectedDisk;
        })


        await wrapper.vm.$nextTick();

        expect(wrapper.vm.dirs).toEqual(newDirsForSelectedDisk);
    });
});
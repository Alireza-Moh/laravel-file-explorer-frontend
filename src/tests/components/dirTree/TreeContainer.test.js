import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import TreeContainer from "@/components/dirTree/TreeContainer.vue";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import DirTree from "@/components/dirTree/components/DirTree.vue";
import {useSettingsStore} from "@/stores/settingsStore.js";
import mitt from "mitt";
import DirLink from "@/components/dirTree/components/DirLink.vue";

describe.concurrent("TreeContainer component", () => {
    let wrapper, settingsStore, $emitter;

    beforeEach(() => {
        $emitter = mitt();

        wrapper = mount(TreeContainer, {
            global: {
                mocks: {
                    $emitter
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings: settingsStoreTestData,
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
        expect(firstDir.name).toBe('android');
        expect(firstDir.path).toBe('android');
        expect(firstDir.subDir.length).toBe(1);

        const subDir = firstDir.subDir[0];
        expect(subDir.diskName).toBe('tests');
        expect(subDir.name).toBe('forTesting');
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
                "name": "android",
                "path": "android",
                "type": "dir",
                "subDir": [
                    {
                        "diskName": "tests",
                        "name": "all",
                        "path": "android/all",
                        "type": "dir",
                        "subDir": []
                    }
                ]
            },
            {
                "diskName": "tests",
                "name": "ios",
                "path": "ios",
                "type": "dir",
                "subDir": [
                    {
                        "diskName": "tests",
                        "name": "aaassss",
                        "path": "ios/aaassss",
                        "type": "dir",
                        "subDir": [
                            {
                                "diskName": "tests",
                                "name": "inOmB",
                                "path": "ios/aaassss/inOmB",
                                "type": "dir",
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

    test("should show message when directory list is empty", async () => {
        wrapper.setData({dirs: null});
        await wrapper.vm.$nextTick();

        const emptyDirLink = wrapper.findComponent(DirLink);

        expect(emptyDirLink.exists()).toBe(true);
        expect(emptyDirLink.text()).toContain("No directories found");
    });
});
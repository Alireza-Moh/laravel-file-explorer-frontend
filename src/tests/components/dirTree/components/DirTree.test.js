import {mount} from "@vue/test-utils";
import DirTree from "@/components/dirTree/components/DirTree.vue";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import DirLink from "@/components/dirTree/components/DirLink.vue";
import {createTestingPinia} from "@pinia/testing";
import disksStoreTestData from "@/tests/testData/stores/disksStoreTestData.json";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import {useSettingsStore} from "@/stores/settingsStore.js";


describe.concurrent("DirTree component", () => {
    let wrapper, settingsStore;

    beforeEach(() => {
        const expectedDirs = settingsStoreTestData.defaultFileExplorerViewData.dirsForSelectedDisk;
        wrapper = mount(DirTree, {
            plugins: [
                createTestingPinia({
                    initialState: {
                        disks: disksStoreTestData,
                        settings:settingsStoreTestData,
                        diskDirs: diskDirsStoreTestData,
                        dirItems: dirItemsStoreTestData
                    }
                })
            ],
            props: {
                dirs: expectedDirs,
            },
        });


        settingsStore = useSettingsStore();
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render DirTree component", () => {
        expect(DirTree).toBeTruthy();
    });

    it('should render 6 DirLink components', () => {
        const dirLinkComponents = wrapper.findAllComponents(DirLink);

        expect(dirLinkComponents.length).toBe(6);
    });

    it('should render 4 nav__dropdown nav__link-with-dropdown nav__dropdown_nested', () => {
        const allSubDivs = wrapper.findAll(".nav__dropdown.nav__link-with-dropdown.nav__dropdown_nested");

        expect(allSubDivs.length).toBe(4);
    });

    it('should update selectedDir when the settingsStore state changes', () => {
        const newSelectedDir = "forTesting";

        settingsStore.$patch((state) => {
            state.defaultFileExplorerViewData.selectedDir = newSelectedDir;
        })

        expect(wrapper.vm.selectedDir).toBe(newSelectedDir);
    });
});

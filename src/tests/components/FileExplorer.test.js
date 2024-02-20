import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {useDisksStore} from "@/stores/disksStore.js";
import loadFileExplorerApiResponseTestData from "@/tests/testData/loadFileExplorerApiResponseTestData.json";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import disksStoreTestData from "@/tests/testData/stores/disksStoreTestData.json";
import FileExplorer from "@/FileExplorer.vue";
import Loader from "@/components/_baseComponents/Loader.vue";
import mitt from "mitt";
import TreeContainer from "@/components/dirTree/TreeContainer.vue";
import DiskList from "@/components/DiskList.vue";
import ItemActionList from "@/components/dirContent/itemActions/ItemActionList.vue";
import DirContentTable from "@/components/dirContent/DirContentTable.vue";
import ImageViewer from "@/components/dirContent/components/ImageViewer.vue";
import VideoPlayerViewer from "@/components/dirContent/components/VideoPlayerViewer.vue";
import Notify from "@/components/_baseComponents/Notify.vue";
import TopMenu from "@/components/_baseComponents/TopMenu.vue";

describe("FileExplorer", () => {
    let wrapper, disksStore, $http, mediaQueryList, $emitter;

    beforeEach(() => {
        mediaQueryList = {
            matches: "(prefers-color-scheme: light)",
            media: "",
            onchange: null,
        };
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            configurable: true,
            value: () => mediaQueryList,
        });
        $http = {
            get: vi.fn().mockImplementation(() => {
                return Promise.resolve(loadFileExplorerApiResponseTestData);
            })
        };
        $emitter = mitt();

        wrapper = mount(FileExplorer, {
            global: {
                mocks: {
                    $http,
                    $emitter
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            disks: disksStoreTestData,
                            settings:settingsStoreTestData,
                            diskDirs: diskDirsStoreTestData,
                            dirItems: dirItemsStoreTestData
                        }
                    })
                ]
            }
        });

        disksStore = useDisksStore();
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render DiskList component", () => {
        expect(FileExplorer).toBeTruthy();
    });

    test("should render Notify component on initialization", async () => {
        const component = wrapper.findComponent(Notify);

        expect(component.exists()).toBe(true);
    });

    test("should render TopMenu component on initialization", async () => {
        const component = wrapper.findComponent(TopMenu);

        expect(component.exists()).toBe(true);
    });

    test("should not show Loader component when data is loaded", async () => {
        wrapper.setData({isLoading: false});
        await wrapper.vm.$nextTick();

        const component = wrapper.findComponent(Loader);

        expect(component.exists()).toBe(false);
    });

    test("should render TreeContainer component when data is loaded", async () => {
        wrapper.setData({isLoading: false});
        await wrapper.vm.$nextTick();

        const component = wrapper.findComponent(TreeContainer);

        expect(component.exists()).toBe(true);
    });

    test("should render DiskList component when data is loaded", async () => {
        wrapper.setData({isLoading: false});
        await wrapper.vm.$nextTick();

        const component = wrapper.findComponent(DiskList);

        expect(component.exists()).toBe(true);
    });

    test("should render ItemActionList component when data is loaded", async () => {
        wrapper.setData({isLoading: false});
        await wrapper.vm.$nextTick();

        const component = wrapper.findComponent(ItemActionList);

        expect(component.exists()).toBe(true);
    });

    test("should render DirContentTable component when data is loaded", async () => {
        wrapper.setData({isLoading: false});
        await wrapper.vm.$nextTick();

        const component = wrapper.findComponent(DirContentTable);

        expect(component.exists()).toBe(true);
    });

    test("should load ImageViewer component when data is loaded", async () => {
        wrapper.setData({isLoading: false});
        await wrapper.vm.$nextTick();

        const component = wrapper.findComponent(ImageViewer);

        expect(component.exists()).toBe(true);
    });

    test("should load VideoPlayerViewer component when data is loaded", async () => {
        wrapper.setData({isLoading: false});
        await wrapper.vm.$nextTick();

        const component = wrapper.findComponent(VideoPlayerViewer);

        expect(component.exists()).toBe(true);
    });
});
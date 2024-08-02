import { mount } from '@vue/test-utils';
import mitt from "mitt";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import dirItemsApiResponseTestData from "@/tests/testData/dirItemsApiResponseTestData.json";
import ItemActionList from "@/components/dirContent/itemActions/ItemActionList.vue";
import CreateFileButton from "@/components/dirContent/itemActions/buttons/CreateFileButton.vue";
import CreateDirButton from "@/components/dirContent/itemActions/buttons/CreateDirButton.vue";
import UploadFilesButton from "@/components/dirContent/itemActions/buttons/UploadFilesButton.vue";
import {useSelectedItemsStore} from "@/stores/selectedtemsStore.js";
import DownloadButton from "@/components/dirContent/itemActions/buttons/DownloadButton.vue";
import DeleteButton from "@/components/dirContent/itemActions/buttons/DeleteButton.vue";
import RenameButton from "@/components/dirContent/itemActions/buttons/RenameButton.vue";
import randomItems from "@/tests/testData/randomItems.json";
import Api from "@/services/Api.js";

vi.mock('@/services/Api.js', () => {
    return {
        default: {
            get: vi.fn().mockResolvedValue({
                data: {
                    result: [] // mock response data as needed
                }
            }),
            post: vi.fn().mockResolvedValue({
                data: {
                    result: [] // mock response data as needed
                }
            }),
            fetchCsrfToken: vi.fn().mockResolvedValue({
                data: {
                    data: {
                        csrfToken: 'mockCsrfToken'
                    }
                }
            })
        }
    };
});

describe('ItemActionList', () => {
    let wrapper, $emitter,$API;

    beforeEach(() => {
        $API = Api;
        $emitter = mitt();

        wrapper = mount(ItemActionList, {
            global: {
                mocks: {
                    $API,
                    $emitter
                },
            },
            plugins: [
                createTestingPinia({
                    initialState: {
                        settingsStore: settingsStoreTestData,
                    }
                })
            ]
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render ItemActionList component", () => {
        expect(ItemActionList).toBeTruthy();
    });


    test('should render CreateFileButton component', () => {
        const btn = wrapper.findComponent(CreateFileButton);

        expect(btn.exists()).toBe(true);
    });

    test('should render CreateDirButton component', () => {
        const btn = wrapper.findComponent(CreateDirButton);

        expect(btn.exists()).toBe(true);
    });

    test('should render UploadFilesButton component', () => {
        const btn = wrapper.findComponent(UploadFilesButton);

        expect(btn.exists()).toBe(true);
    });

    test('should not show item related action buttons on init', () => {
        const relatedButtonActionsWrapper = wrapper.find(".related-item-action-wrapper");

        expect(relatedButtonActionsWrapper.exists()).toBe(false);
    });

    test('should show item related action buttons when checked-items-store state changes', async () => {
        useSelectedItemsStore().$patch((state) => {
            state.items = randomItems
        });
        await wrapper.vm.$nextTick();
        const relatedButtonActionsWrapper = wrapper.find(".related-item-action-wrapper");

        expect(relatedButtonActionsWrapper.exists()).toBe(true);
    });

    test('should render DownloadButton component with correct props', async () => {
        wrapper.setData({showItemActions: true, items: randomItems});
        await wrapper.vm.$nextTick();

        const btn = wrapper.findComponent(DownloadButton)

        expect(btn.exists()).toBe(true);
        expect(btn.props().items).toEqual(expect.arrayContaining(randomItems));
    });

    test('should render DeleteButton component with correct props', async () => {
        wrapper.setData({showItemActions: true, items: randomItems});
        await wrapper.vm.$nextTick();

        const btn = wrapper.findComponent(DeleteButton)

        expect(btn.exists()).toBe(true);
        expect(btn.props().items).toEqual(expect.arrayContaining(randomItems));
    });

    test('should render RenameButton component with correct props', async () => {
        wrapper.setData({showItemActions: true, items: randomItems});
        await wrapper.vm.$nextTick();

        const btn = wrapper.findComponent(RenameButton)

        expect(btn.exists()).toBe(true);
        expect(btn.props().items).toEqual(expect.arrayContaining(randomItems));
    });

    test("should hide related action buttons and emit 'hideRenameInput' event when no item is selected", async () => {
        const emitSpy = vi.spyOn($emitter, "emit");
        useSelectedItemsStore().$patch((state) => {
            state.items = []
        });
        await wrapper.vm.$nextTick();
        const relatedButtonActionsWrapper = wrapper.find(".related-item-action-wrapper");

        expect(emitSpy).toHaveBeenCalledWith("hideRenameInput");
        expect(relatedButtonActionsWrapper.exists()).toBe(false);
    });
});
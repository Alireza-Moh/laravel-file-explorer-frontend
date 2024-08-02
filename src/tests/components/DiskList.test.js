import {flushPromises, mount} from "@vue/test-utils";
import DiskList from "@/components/DiskList.vue";
import {createTestingPinia} from "@pinia/testing";
import {useDisksStore} from "@/stores/disksStore.js";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import disksStoreTestData from "@/tests/testData/stores/disksStoreTestData.json";
import Api from "@/services/Api.js";

vi.mock('@/services/Api.js', () => {
    return {
        default: {
            get: vi.fn().mockResolvedValue({
                data: {
                    result: [] // mock response data as needed
                }
            })
        }
    };
});

describe.concurrent("DiskList component", () => {
    let wrapper, disksStore, $API;

    beforeEach(() => {
        $API = Api;

        wrapper = mount(DiskList, {
            global: {
                mocks: {
                    $API
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
    })

    test("should render DiskList component", () => {
        expect(DiskList).toBeTruthy();
    });

    test('should render 3 disk buttons', () => {
        const actionButtons = wrapper.findAll('.action-btn');

        expect(actionButtons.length).toBe(3);
    });

    test("should set 'tests' disk as the selected disk", () => {
        const selectedDiskButton = wrapper.find('.action-btn.selected');

        expect(selectedDiskButton.exists()).toBe(true);
        expect(selectedDiskButton.text()).toBe('tests');
    })

    test("should set 'tests' disk button to disabled", () => {
        const selectedDiskButton = wrapper.find('.action-btn.selected');

        expect(selectedDiskButton.isDisabled()).toBe(true);
    });

    test("should set the 'web' disk as the selected disk upon clicking the web disk button", async () => {
        const webDiskButton = wrapper.findAll('.action-btn').filter(button => button.text() === 'web')[0];

        webDiskButton.trigger('click');
        await flushPromises();

        expect(webDiskButton.element.classList).toContain('selected');
        expect(webDiskButton.isDisabled()).toBe(true);
    });

    test("should not make an API request upon clicking the web disk button if the web-disk data already exist", async () => {
        const buySpy = vi.spyOn($API, 'get')
        const webDiskButton = wrapper.findAll('.action-btn').filter(button => button.text() === 'tests')[0];

        webDiskButton.trigger('click');

        expect(buySpy).not.toHaveBeenCalled();
    });

    test("should make an API request upon clicking the web disk button if the images-disk data already exist", async () => {
        const targetDisk = "images";
        const buySpy = vi.spyOn($API, 'get')
        const webDiskButton = wrapper.findAll('.action-btn').filter(button => button.text() === targetDisk)[0];

        webDiskButton.trigger('click');
        expect(buySpy).toHaveBeenCalledWith("disks/" + targetDisk);
    });

    test("should show message when disk list is empty", async () => {
        wrapper.setData({disks: []});
        await wrapper.vm.$nextTick();

        const emptyDiskBox = wrapper.find("#empty-disk");

        expect(emptyDiskBox.exists()).toBe(true);
        expect(emptyDiskBox.text()).toBe("No disks found");
    });
});
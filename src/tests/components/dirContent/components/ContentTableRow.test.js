import { mount } from '@vue/test-utils';
import mitt from "mitt";
import ContentTableRow from "@/components/dirContent/components/ContentTableRow.vue";
import {createTestingPinia} from "@pinia/testing";
import checkedItemsStoreTestData from "@/tests/testData/stores/checkedItemsStoreTestData.json";
import ItemPreviewCellWithRenameInput from "@/components/dirContent/components/ItemPreviewCellWithRenameInput.vue";
import ItemIcon from "@/components/dirContent/components/ItemIcon.vue";
import ItemImageCell from "@/components/dirContent/components/ItemImageCell.vue";
import ItemVideoCell from "@/components/dirContent/components/ItemVideoCell.vue";
import {getTestImage, getTestVideo} from "@/tests/helpers/functions.js";
import {useCheckedItemsStore} from "@/stores/checkedItemsStore.js";
import dirItemsApiResponseTestData from "@/tests/testData/dirItemsApiResponseTestData.json";

describe('ContentTableRow', () => {
    let wrapper, $emitter, checkedItemsStore,$http;
    const targetItem = getTestImage();

    beforeEach(() => {
        $http = {
            post: vi.fn().mockImplementation(() => {
                return Promise.resolve(dirItemsApiResponseTestData);
            })
        }

        $emitter = mitt();
        wrapper = mount(ContentTableRow, {
            global: {
                mocks: {
                    $http,
                    $emitter
                },
            },
            plugins: [
                createTestingPinia({
                    initialState: {
                        checkedItemsStore: checkedItemsStoreTestData,
                    }
                })
            ],
            props: {
                item: targetItem
            }
        });

        checkedItemsStore = useCheckedItemsStore();
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render ContentTableRow component", () => {
        expect(ContentTableRow).toBeTruthy();
    });


    test('should render ItemIcon component with the correct props', () => {
        const itemIcon = wrapper.findComponent(ItemIcon);

        expect(itemIcon.exists()).toBe(true);
        expect(itemIcon.props().type).toBe(targetItem.type);
    });

    test('should render ItemPreviewCellWithRenameInput component with the correct props when previewView is disabled', () => {
        const itemRenameInput = wrapper.findComponent(ItemPreviewCellWithRenameInput);

        expect(itemRenameInput.exists()).toBe(true);
        expect(itemRenameInput.props().item).toEqual(targetItem);
        expect(itemRenameInput.props().showRenameInput).toEqual(false);
    });

    test('should render ItemImageCell component with the correct props when previewView is enabled', async () => {
        wrapper.setData({ showPreviewView: true});
        await wrapper.vm.$nextTick();

        const itemImageCell = wrapper.findComponent(ItemImageCell);

        expect(itemImageCell.exists()).toBe(true);
        expect(itemImageCell.props('item')).toEqual(targetItem);
        expect(itemImageCell.props().showRenameInput).toEqual(false);
    });

    test('should render ItemVideoCell component with the correct props when previewView is enabled and the passed item is a video', async () => {
        const testVideoItem = getTestVideo();
        wrapper.setProps({item: testVideoItem});
        wrapper.setData({ showPreviewView: true});
        await wrapper.vm.$nextTick();

        const itemVideoCell = wrapper.findComponent(ItemVideoCell);

        expect(itemVideoCell.exists()).toBe(true);
        expect(itemVideoCell.props('item')).toEqual(testVideoItem);
        expect(itemVideoCell.props().showRenameInput).toEqual(false);
        expect(itemVideoCell.props().videoType).toEqual("video/mp4");
    });

    test('should render show-image icon when the passed item is an image', () => {
        const imageElement = wrapper.find('.show-cell img');

        expect(imageElement.exists()).toBe(true);
        expect(imageElement.attributes('src').endsWith("eye.svg")).toBe(true);
    });


    test('should render show-video icon when the passed item is a video', async () => {
        wrapper.setProps({item: getTestVideo()});
        await wrapper.vm.$nextTick();

        const imageElement = wrapper.find('.show-cell img');

        expect(imageElement.exists()).toBe(true);
        expect(imageElement.attributes('src').includes("play-circle.svg")).toBe(true);
    });

    test('should show image when show-image icon is clicked and it is an image', async () => {
        const emitSpy = vi.spyOn($emitter, "emit");
        const imageElement = wrapper.find('.show-cell');

        imageElement.trigger("click");

        expect(emitSpy).toHaveBeenCalledWith('showImageViewer', targetItem.url);
    });

    test('should show video when show-video icon is clicked and it is a video', async () => {
        const testVideoItem = getTestVideo();
        wrapper.setProps({item: testVideoItem});
        await wrapper.vm.$nextTick();
        const emitSpy = vi.spyOn($emitter, "emit");
        const imageElement = wrapper.find('.show-cell');

        imageElement.trigger("click");

        expect(emitSpy).toHaveBeenCalledWith('showVideoPlayer', testVideoItem);
    });

    test("should emit 'showSelectedItemUrl' event with correct item when checkBox is selected", async () => {
        wrapper.setData({ isChecked: true });
        wrapper.vm.$options.watch.isChecked.call(wrapper.vm, true);

        expect(wrapper.emitted("showSelectedItemUrl")).toBeTruthy();
        expect(wrapper.emitted()['showSelectedItemUrl'][0][0]).toEqual(targetItem);
        expect(checkedItemsStore.addItem).toHaveBeenCalledWith(targetItem);
    });

    test("should emit 'showSelectedItemUrl' with null event when checkBox gets unchecked", async () => {
        wrapper.setData({ isChecked: true });
        wrapper.vm.$options.watch.isChecked.call(wrapper.vm, false);

        expect(wrapper.emitted("showSelectedItemUrl")).toBeTruthy();
        expect(wrapper.emitted()['showSelectedItemUrl'][0][0]).toEqual(null);
        expect(checkedItemsStore.removeItemFromList).toHaveBeenCalledWith(targetItem);
    });

    test('should open directory on dbClick ', async () => {
        const openDirSpy = vi.spyOn(wrapper.vm, "openDir");
        const targetDir = {
            "diskName": "tests",
            "name": "ios",
            "path": "ios",
            "type": "dir",
            "subDir": [
                {
                    "diskName": "tests",
                    "name": "my-dir",
                    "path": "ios/my-dir",
                    "type": "dir",
                    "subDir": []
                }
            ]
        };
        wrapper.setProps({
            item: targetDir
        });
        await wrapper.vm.$nextTick();
        const dir = wrapper.find('.item');

        dir.trigger("dblclick");
        await wrapper.vm.$nextTick();

        expect(openDirSpy).toHaveBeenCalledWith(targetDir);
    });
});
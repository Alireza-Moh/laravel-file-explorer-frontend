import { mount } from '@vue/test-utils';
import mitt from "mitt";
import ContentTableRow from "@/components/dirContent/components/ContentTableRow.vue";
import {createTestingPinia} from "@pinia/testing";
import selectedItemsStoreTestData from "@/tests/testData/stores/selectedItemsStoreTestData.json";
import ItemIcon from "@/components/dirContent/components/ItemIcon.vue";
import {getTestImage, getTestVideo} from "@/tests/helpers/functions.js";
import {useSelectedItemsStore} from "@/stores/selectedtemsStore.js";
import dirItemsApiResponseTestData from "@/tests/testData/dirItemsApiResponseTestData.json";
import PreviewView from "@/components/dirContent/components/PreviewView.vue";

describe('ContentTableRow', () => {
    let wrapper, $emitter, selectedItemsStore,$http;
    const targetItem = getTestImage();

    beforeEach(() => {
        $http = {
            get: vi.fn().mockImplementation(() => {
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
                        checkedItemsStore: selectedItemsStoreTestData,
                    }
                })
            ],
            props: {
                item: targetItem,
                showPreviewView: false
            }
        });

        selectedItemsStore = useSelectedItemsStore();
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

    test('should render ItemVideoCell component with the correct props when previewView is enabled and the passed item is a video', async () => {
        wrapper.setProps({item: targetItem, showPreviewView: true});
        await wrapper.vm.$nextTick();

        const previewView = wrapper.findComponent(PreviewView);

        expect(previewView.exists()).toBe(true);
        expect(previewView.props('item')).toEqual(targetItem);
    });

    test('should show image when show-image icon is clicked and it is an image', async () => {
        const emitSpy = vi.spyOn($emitter, "emit");
        const imageElement = wrapper.find('.item');

        imageElement.trigger("dblclick");

        expect(emitSpy).toHaveBeenCalledWith('showImageViewer', targetItem.url);
    });

    test('should show video when show-video icon is clicked and it is a video', async () => {
        const testVideoItem = getTestVideo();
        wrapper.setProps({item: testVideoItem});
        await wrapper.vm.$nextTick();
        const emitSpy = vi.spyOn($emitter, "emit");
        const imageElement = wrapper.find('.item');

        imageElement.trigger("dblclick");

        expect(emitSpy).toHaveBeenCalledWith('showVideoPlayer', testVideoItem);
    });

    test("should add the correct item to the 'selectedItemsStore' when item is checked", async () => {
        const checkBox = wrapper.find('.folder-item-checkbox');

        checkBox.setValue(true);

        expect(selectedItemsStore.addItem).toHaveBeenCalledWith(targetItem);
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
import { mount } from '@vue/test-utils';
import ItemImageCell from "@/components/dirContent/components/ItemImageCell.vue";
import PreviewView from "@/components/dirContent/components/PreviewView.vue";
import {getTestImage, getTestVideo} from "@/tests/helpers/functions.js";
import ItemVideoCell from "@/components/dirContent/components/ItemVideoCell.vue";
describe('PreviewView', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(PreviewView, {
            props: {
                item: {},
                isImage: true,
                isVideo: false,
                videoType: ""
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should render PreviewView component', () => {
        expect(PreviewView).toBeTruthy();
    });

    test('should render ItemImageCell component with the correct props when previewView is enabled', async () => {
        const imgItem = getTestImage();
        wrapper.setProps(
            {
                item: imgItem,
            }
        );
        await wrapper.vm.$nextTick();
        const itemImageCell = wrapper.findComponent(ItemImageCell);

        expect(itemImageCell.exists()).toBe(true);
        expect(itemImageCell.props('itemUrl')).toEqual(imgItem.url);
    });

    test('should render ItemVideoCell component with the correct props when previewView is enabled', async () => {
        const videItem = getTestVideo();
        wrapper.setProps(
            {
                item: videItem,
                isVideo: true,
                videoType: 'video/mp4'
            }
        );
        await wrapper.vm.$nextTick();
        const itemVideoCell = wrapper.findComponent(ItemVideoCell);

        expect(itemVideoCell.exists()).toBe(true);
        expect(itemVideoCell.props('itemUrl')).toEqual(videItem.url);
    });

});
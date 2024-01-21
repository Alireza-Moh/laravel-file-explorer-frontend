import { mount } from '@vue/test-utils';
import ItemPreviewCellWithRenameInput from "@/components/dirContent/components/ItemPreviewCellWithRenameInput.vue";
import ItemVideoCell from "@/components/dirContent/components/ItemVideoCell.vue";
import {getTestVideo} from "@/tests/helpers/functions.js";

describe('ItemVideoCell', () => {
    let wrapper;
    const targetItem = getTestVideo();
    const videoType = 'video/mp4';

    beforeEach(() => {
        wrapper = mount(ItemVideoCell, {
            props: {
                item: targetItem,
                videoType: videoType,
                showRenameInput: false
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should render ItemVideoCell component', () => {
        expect(ItemVideoCell).toBeTruthy();
    });

    test('should create thumbnail with correct URL', () => {
        const videoSrc = wrapper.find('.video-src');

        expect(videoSrc.attributes('src')).toBe(targetItem.url);
        expect(videoSrc.attributes('type')).toBe(videoType);
    });

    test('should render ItemPreviewCellWithRenameInput with correct props', () => {
        const inputCell = wrapper.findComponent(ItemPreviewCellWithRenameInput);

        expect(inputCell.exists()).toBe(true);
        expect(wrapper.props().item).toEqual(targetItem);
        expect(wrapper.props().showRenameInput).toBe(false);
    });
});
import { mount } from '@vue/test-utils';
import ItemVideoCell from "@/components/dirContent/components/ItemVideoCell.vue";
import {getTestVideo} from "@/tests/helpers/functions.js";

describe('ItemVideoCell', () => {
    let wrapper;
    const targetItem = getTestVideo();
    const videoType = 'video/mp4';

    beforeEach(() => {
        wrapper = mount(ItemVideoCell, {
            props: {
                itemUrl: targetItem.url,
                videoType: videoType
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
});
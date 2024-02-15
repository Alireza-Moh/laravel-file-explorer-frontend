import { mount } from '@vue/test-utils';
import ItemImageCell from "@/components/dirContent/components/ItemImageCell.vue";
import {getTestImage} from "@/tests/helpers/functions.js";

describe('ItemImageCell', () => {
    let wrapper;
    const targetItem = getTestImage();

    beforeEach(() => {
        wrapper = mount(ItemImageCell, {
            props: {
                itemUrl: targetItem.url
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should render ItemImageCell component', () => {
        expect(ItemImageCell).toBeTruthy();
    });

    test('should create thumbnail with correct URL', () => {
        const image = wrapper.find('.thumbnail');

        expect(image.attributes('src')).toBe(targetItem.url);
    });
});
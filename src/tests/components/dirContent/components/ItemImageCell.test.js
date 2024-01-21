import { mount } from '@vue/test-utils';
import ItemImageCell from "@/components/dirContent/components/ItemImageCell.vue";
import ItemPreviewCellWithRenameInput from "@/components/dirContent/components/ItemPreviewCellWithRenameInput.vue";
import {getTestImage} from "@/tests/helpers/functions.js";

describe('ItemImageCell', () => {
    let wrapper;
    const targetItem = getTestImage();

    beforeEach(() => {
        wrapper = mount(ItemImageCell, {
            props: {
                item: targetItem,
                showRenameInput: false
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

    test('should render ItemPreviewCellWithRenameInput with correct props', () => {
        const inputCell = wrapper.findComponent(ItemPreviewCellWithRenameInput);

        expect(inputCell.exists()).toBe(true);
        expect(wrapper.props().item).toEqual(targetItem);
        expect(wrapper.props().showRenameInput).toBe(false);
    });
});
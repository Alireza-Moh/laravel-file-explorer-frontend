import { mount } from '@vue/test-utils';
import ItemPreviewCellWithRenameInput from "@/components/dirContent/components/ItemPreviewCellWithRenameInput.vue";
import {getTestImage} from "@/tests/helpers/functions.js";

describe('ItemPreviewCellWithRenameInput', () => {
    let wrapper;
    const targetItem = getTestImage();

    beforeEach(() => {
        wrapper = mount(ItemPreviewCellWithRenameInput, {
            props: {
                item: targetItem,
                showRenameInput: false
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should render ItemPreviewCellWithRenameInput component', () => {
        expect(ItemPreviewCellWithRenameInput).toBeTruthy();
    });

    test('should not show input name when showRenameInput is false', () => {
        const input = wrapper.find('.rename-input');
        const itemName = wrapper.find('.item-name');

        expect(input.exists()).toBe(false);
        expect(itemName.exists()).toBe(true);
    });

    test('should show input name when showRenameInput is true', async () => {
        wrapper.setProps({ showRenameInput: true });
        await wrapper.vm.$nextTick();

        const input = wrapper.find('.rename-input');
        const itemName = wrapper.find('.item-name');

        expect(input.exists()).toBe(true);
        expect(itemName.exists()).toBe(false);
    });
});
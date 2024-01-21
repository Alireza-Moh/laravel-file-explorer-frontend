import { mount } from '@vue/test-utils';
import ItemIcon from "@/components/dirContent/components/ItemIcon.vue";

describe('ItemIcon', () => {
    test('should render ItemIcon component', () => {
        const wrapper = mount(ItemIcon, {
            props: {
                type: "dir"
            }
        });

        expect(ItemIcon).toBeTruthy()
    });

    test('should show correct icon if file type is file', () => {
        const wrapper = mount(ItemIcon, {
            props: {
                type: "file"
            }
        });

        const img = wrapper.find('img');

        expect(img.attributes("src").endsWith("file-earmark-fill.svg")).toBe(true);
    });

    test('should show correct icon if file type is directory', async () => {
        const wrapper = mount(ItemIcon, {
            props: {
                type: "dir"
            }
        });

        const img = wrapper.find('img');

        expect(img.attributes("src").endsWith("folder-fill.svg")).toBe(true);
    });
});
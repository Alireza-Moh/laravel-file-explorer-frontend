import {mount} from "@vue/test-utils";
import Notify from "@/components/_baseComponents/Notify.vue";

describe("Notify component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Notify);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render Notify component", () => {
        expect(Notify).toBeTruthy();
    });

    test('should render notify with success message', async () => {
        window.showAlert('success', 'Success Message', 3000);
        await wrapper.vm.$nextTick();

        const messageBox = wrapper.find('.message-box.success');
        const message = wrapper.find('.text');

        expect(messageBox.exists()).toBe(true);
        expect(message.text()).toBe('Success Message');
    });

    test('should render notify with failed message', async () => {
        window.showAlert('failed', 'Failed Message');
        await wrapper.vm.$nextTick();

        const messageBox = wrapper.find('.message-box.failed');
        const message = wrapper.find('.text');

        expect(messageBox.exists()).toBe(true);
        expect(message.text()).toBe('Failed Message');
    });

    test('should hide notify after specified time', async () => {
        window.showAlert('warning', 'Warning Message', 2000);
        await wrapper.vm.$nextTick();

        await new Promise(resolve => setTimeout(resolve, 2500));
        const messageBox = wrapper.find('.message-box.warning');

        expect(messageBox.exists()).toBe(false);
    });

    test('should show correct icon on failure', async () => {
        window.showAlert('failed', 'Failed Message', 2000);
        await wrapper.vm.$nextTick();

        const iconSrc = wrapper.find('.message-box img').attributes('src');

        expect(iconSrc).toBe('/src/assets/img/failed.svg');
    });

    test('should show correct icon on success', async () => {
        window.showAlert('success', 'Failed Message', 2000);
        await wrapper.vm.$nextTick();

        const iconSrc = wrapper.find('.message-box img').attributes('src');

        expect(iconSrc).toBe('/src/assets/img/done.svg');
    });
});
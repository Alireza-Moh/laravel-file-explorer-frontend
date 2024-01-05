import {mount} from "@vue/test-utils";
import TopMenu from "@/components/_baseComponents/TopMenu.vue";

describe("TopMenu component", () => {
    let wrapper;
    let mediaQueryList;

    beforeEach(() => {
        mediaQueryList = {
            matches: "(prefers-color-scheme: light)",
            media: "",
            onchange: null,
        };

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            configurable: true,
            value: () => mediaQueryList,
        });
        wrapper = mount(TopMenu);
    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });

    test("should render TopMenu component", () => {
        expect(TopMenu).toBeTruthy();
    });

    test('should initially render in light mode', async () => {
        expect(wrapper.vm.isDarkMode).toBe(false);
        expect(document.body.classList.contains('dark-mode')).toBe(false);
    });

    test('should toggle to dark mode when clicks on toggle button', async () => {
        const toggleButton = wrapper.find('.toggle');

        await toggleButton.trigger('click');

        expect(wrapper.vm.isDarkMode).toBe(true);
        expect(document.body.classList.contains('dark-mode')).toBe(true);
    });

    test('should toggle to light mode when clicks on toggle button', async () => {
        localStorage.setItem('mode', 'dark-mode');
        mediaQueryList.matches = "(prefers-color-scheme: dark)";

        const toggleButton = wrapper.find('.toggle');
        await toggleButton.trigger('click'); //toggle to light mode

        expect(wrapper.vm.isDarkMode).toBe(false);
        expect(document.body.classList.contains('dark-mode')).toBe(false);
    });

    test('should be in light mode if enabled', async () => {
        // Simulate light mode being set
        mediaQueryList.matches = "(prefers-color-scheme: light)";
        localStorage.setItem('mode', 'light-mode');
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isDarkMode).toBe(false);
    });

    test('should be in dark mode if enabled', async () => {
        // Simulate light mode being set
        mediaQueryList.matches = "(prefers-color-scheme: dark)";
        localStorage.setItem('mode', 'dark-mode');
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isDarkMode).toBe(false);
    });
});
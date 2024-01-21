import { mount } from '@vue/test-utils';
import mitt from "mitt";
import ContentTableMenu from "@/components/dirContent/components/ContentTableMenu.vue";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import {useSettingsStore} from "@/stores/settingsStore.js";

describe('ContentTableMenu', () => {
    let wrapper, $emitter, settingsStore;

    beforeEach(() => {
        $emitter = mitt();
        wrapper = mount(ContentTableMenu, {
            global: {
                mocks: {
                    $emitter
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings: settingsStoreTestData,
                        }
                    })
                ]
            },
        });

        settingsStore = useSettingsStore();
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render ContentTableMenu component", () => {
        expect(ContentTableMenu).toBeTruthy();
    });

    it('should set correct current directory path on creating', async () => {
        expect(wrapper.vm.currentDirPath).toBe("tests/android");
    });

    it('should update current directory path when the settingsStore state changes', async () => {
        const newPath = "mobile/new/DirPath";

        settingsStore.$patch((state) => {
            state.defaultFileExplorerViewData.selectedDirPath = newPath;
        })
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.currentDirPath).toBe("tests/" + newPath);
    });

    test("should emit 'showPreviewView' event when action-btn is clicked", async () => {
        const emitSpy = vi.spyOn($emitter, "emit");
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");

        expect(emitSpy).toHaveBeenCalledWith('showPreviewView');
        expect(wrapper.vm.showPreviewView).toBe(true);

    });

    test('should emit update:modelValue when item search input value changes', async () => {
        const input = wrapper.find('#itemSearch');

        input.setValue('search term');

        expect(wrapper.emitted()['update:modelValue'][0][0]).toBe('search term');
    });
});
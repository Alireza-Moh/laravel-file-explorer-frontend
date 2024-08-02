import {flushPromises, mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import DeleteButton from "@/components/dirContent/itemActions/buttons/DeleteButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import randomItemsWithDirs from "@/tests/testData/randomItemsWithDirs.json";
import mitt from "mitt";
import selectedItemsStoreTestData from "@/tests/testData/stores/selectedItemsStoreTestData.json";
import Api from "@/services/Api.js";

vi.mock('@/services/Api.js', () => {
    return {
        default: {
            get: vi.fn().mockResolvedValue({
                data: {
                    result: [] // mock response data as needed
                }
            }),
            post: vi.fn().mockResolvedValue({
                data: {
                    result: [] // mock response data as needed
                }
            }),
            fetchCsrfToken: vi.fn().mockResolvedValue({
                data: {
                    data: {
                        csrfToken: 'mockCsrfToken'
                    }
                }
            })
        }
    };
});

describe("DeleteButton", () => {
    let wrapper, $emitter, $API;

    beforeEach(() => {
        $emitter = mitt();
        $API = Api

        wrapper = mount(DeleteButton, {
            global: {
                mocks: {
                    $API,
                    $emitter
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings: settingsStoreTestData,
                            dirItems: dirItemsStoreTestData,
                            checkedItemsStore: selectedItemsStoreTestData,
                        }
                    })
                ]
            },
            props: {
                items: randomItemsWithDirs
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render DeleteButton component", () => {
        expect(DeleteButton).toBeTruthy();
    });

    test("should show confirm modal when action-btn is clicked", async () => {
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");
        await wrapper.vm.$nextTick();

        const modal = wrapper.findComponent(ConfirmModal);
        const modalQuestionBox = modal.find(".confirm-message-box");
        expect(modal.exists()).toBe(true);
        expect(modalQuestionBox.text()
            .startsWith('You are about to delete "' + randomItemsWithDirs.length + '"'))
            .toBe(true);
    });

    test("should hide confirm modal when cancel-btn is clicked", async () => {
        const emitSpy = vi.spyOn($emitter, "emit");
        wrapper.setData({showConfirmModal: true});
        await wrapper.vm.$nextTick();
        const closeBtn = wrapper.find(".no");

        closeBtn.trigger("click");
        await wrapper.vm.$nextTick();

        const modal = wrapper.findComponent(ConfirmModal);
        expect(modal.exists()).toBe(false);
        expect(emitSpy).toHaveBeenCalledWith('uncheckInput');
    });

    test("should delete items when user confirm operation", async () => {
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });
        const deleteHttpSpy = vi.spyOn($API, "post");
        wrapper.setData({showConfirmModal: true});
        await wrapper.vm.$nextTick();
        const closeBtn = wrapper.find(".yes");

        closeBtn.trigger("click");
        await wrapper.vm.$nextTick();
        await flushPromises();

        expect(deleteHttpSpy).toHaveBeenCalledTimes(1);
        expect(deleteHttpSpy).toHaveBeenCalledWith(
            "disks/tests/all/items/delete",
            {
                items: [
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file'},
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file'},
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: '4665_001v.png', path: 'android/4665_001v.png', type: 'file' },
                    { name: 'aa', path: 'android/aa', type: 'dir' },
                    { name: 'bbb', path: 'android/bbb', type: 'dir' },
                    { name: 'ccc', path: 'android/ccc', type: 'dir' }
                ]
            }
        );
    });
});
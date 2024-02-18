import {flushPromises, mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import DeleteButton from "@/components/dirContent/itemActions/buttons/DeleteButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import randomItemsWithDirs from "@/tests/testData/randomItemsWithDirs.json";
import mitt from "mitt";
import checkedItemsStoreTestData from "@/tests/testData/stores/checkedItemsStoreTestData.json";

describe("DeleteButton", () => {
    let wrapper, $emitter, $http;

    beforeEach(() => {
        $emitter = mitt();
        $http = {
            delete: vi.fn().mockImplementation(() => {
                return Promise.resolve({
                    "result": {
                        "status": "success",
                        "message": "File deleted successfully"
                    }
                });
            })
        };

        wrapper = mount(DeleteButton, {
            global: {
                mocks: {
                    $http,
                    $emitter
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings: settingsStoreTestData,
                            dirItems: dirItemsStoreTestData,
                            checkedItemsStore: checkedItemsStoreTestData,
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
        expect(modalQuestionBox.text().startsWith('You are about to delete "' + randomItemsWithDirs.length + '"')).toBe(true);
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
        const deleteHttpSpy = vi.spyOn($http, "delete");
        wrapper.setData({showConfirmModal: true});
        await wrapper.vm.$nextTick();
        const closeBtn = wrapper.find(".yes");

        closeBtn.trigger("click");
        await wrapper.vm.$nextTick();
        await flushPromises();

        expect(deleteHttpSpy).toHaveBeenCalledTimes(2);
        expect(deleteHttpSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/items/delete",
            {
                body: JSON.stringify({
                    items: [
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' },
                        { name: '4665_001v.png', path: 'android/4665_001v.png' }
                    ]
                })
            }
        );
        expect(deleteHttpSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/dirs/delete",
            {
                body: JSON.stringify({
                    items: [
                        { name: 'aa', path: 'android/aa' },
                        { name: 'bbb', path: 'android/aa' },
                        { name: 'ccc', path: 'android/aa' }
                    ]
                })
            }
        );
    });
});
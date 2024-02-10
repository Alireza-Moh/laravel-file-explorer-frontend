import {mount} from "@vue/test-utils";
import mitt from "mitt";
import SaveButton from "@/components/dirContent/itemActions/buttons/SaveButton.vue";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";

describe("SaveButton", () => {
    let wrapper, $emitter, $http;
    const targetItem =   {
        "diskName": "tests",
        "dirName": "android",
        "name": "4665_001v.png",
        "size": 64.61,
        "lastModified": "2024-01-10 05:31:56",
        "type": "file",
        "path": "android/oldItemName.png",
        "url": "http://localhost:8084/storage/tests/android/oldItemName.png",
        "extension": "png"
    };

    beforeEach(() => {
        $emitter = mitt();
        $http = {
            put: vi.fn().mockImplementation(() => {
                return Promise.resolve({
                    "result": {
                        "status": "success",
                        "message": "File renamed successfully"
                    }
                })
            })
        }
        wrapper = mount(SaveButton, {
            global: {
                mocks: {
                    $emitter,
                    $http
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings: settingsStoreTestData,
                        }
                    })
                ]
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render SaveButton component", () => {
        expect(SaveButton).toBeTruthy();
    });

    test("should make api response when there is an item to save changes", async () => {
        wrapper.setData({
            item: targetItem,
            oldItemName: "oldItemName.png"
        });
        await wrapper.vm.$nextTick();
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });
        const postHttpSpy = vi.spyOn($http, "put");
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");

        expect(postHttpSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/items/oldItemName",
            {
                body: '{"oldName":"oldItemName.png","newName":"4665_001v.png","oldPath":"android/oldItemName.png","newPath":"android/4665_001v.png"}'
            }
        );

    });

    test("should not show save-btn when there is no item is to save", async () => {
        const actionBtn = wrapper.find(".action-btn");

        expect(actionBtn.exists()).toBe(false);
    });
});
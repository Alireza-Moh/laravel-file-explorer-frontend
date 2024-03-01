import {mount} from "@vue/test-utils";
import randomItems from "@/tests/testData/randomItems.json";
import mitt from "mitt";
import RenameButton from "@/components/dirContent/itemActions/buttons/RenameButton.vue";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";

describe("RenameButton", () => {
    let wrapper, $emitter, $http;
    const targetItem =   {
        "diskName": "tests",
        "dirName": "android",
        "name": "oldItemName.png",
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
            post: vi.fn().mockImplementation(() => {
                return Promise.resolve({
                    "result": {
                        "status": "success",
                        "message": "File renamed successfully"
                    }
                })
            })
        }
        wrapper = mount(RenameButton, {
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
            },
            props: {
                items: [targetItem]
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render RenameButton component", () => {
        expect(RenameButton).toBeTruthy();
    });

    test("should show error message when items length is < 0", async () => {
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });
        wrapper.setProps({items: randomItems});
        await wrapper.vm.$nextTick();
        const showAlertSpy = vi.spyOn(window, "showAlert");
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");

        expect(showAlertSpy).toHaveBeenCalledWith("warning", "Multiple item renaming is not supported");
    });

    test("should make api response when there is an item to save changes", async () => {
        wrapper.setData({
            item: targetItem
        });
        await wrapper.vm.$nextTick();
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });
        const postHttpSpy = vi.spyOn($http, "post");

        wrapper.vm.saveNewItemName("newItemName.png");

        expect(postHttpSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/items/rename",
            {
                body: '{"oldName":"oldItemName.png","newName":"newItemName.png","oldPath":"android/oldItemName.png","newPath":"android/newItemName.png","type":"file","dirName":"android"}'
            }
        );

    });
});
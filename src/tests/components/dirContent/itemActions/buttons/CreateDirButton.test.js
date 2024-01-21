import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import createFileApiResponseTestData from "@/tests/testData/createFileApiResponseTestData.json";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import ItemActionModal from "@/components/modals/ItemActionModal.vue";
import CreateDirButton from "@/components/dirContent/itemActions/buttons/CreateDirButton.vue";

describe("CreateDirButton", () => {
    let wrapper, $http;

    beforeEach(() => {
        $http = {
            post: vi.fn().mockImplementation(() => {
                return Promise.resolve(createFileApiResponseTestData);
            })
        }

        wrapper = mount(CreateDirButton, {
            global: {
                mocks: {
                    $http
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings: settingsStoreTestData,
                            diskDirs: diskDirsStoreTestData,
                            dirItems: dirItemsStoreTestData
                        }
                    })
                ]
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render CreateDirButton component", () => {
        expect(CreateDirButton).toBeTruthy();
    });

    test("should show item-action-modal when action button is clicked", async () => {
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");
        await wrapper.vm.$nextTick();

        const modal = wrapper.findComponent(ItemActionModal);
        expect(modal.exists()).toBe(true);
    });

    test("should close modal when close button is clicked in the modal", async () => {
        const closeMethodSpy = vi.spyOn(wrapper.vm, "closeModal");
        wrapper.setData({showModal: true});
        await wrapper.vm.$nextTick();

        const closeBtn = wrapper.find("#cancel-btn");
        closeBtn.trigger("click");
        await wrapper.vm.$nextTick();

        const modal = wrapper.findComponent(ItemActionModal);
        expect(closeMethodSpy).toHaveBeenCalledTimes(1);
        expect(modal.exists()).toBe(false);
    });

    test("should create file when create button is clicked in the modal", async () => {
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });
        const targetFileName = "testFileName";
        const createFileMethodSpy = vi.spyOn(wrapper.vm, "createDir");
        const createItemMethodSpy = vi.spyOn(wrapper.vm, "createItem");
        const postHttpSpy = vi.spyOn($http, "post");
        wrapper.setData({showModal: true});
        await wrapper.vm.$nextTick();
        const modal = wrapper.findComponent(ItemActionModal);
        modal.find("#itemName").setValue(targetFileName);

        const closeBtn = wrapper.find("#save-btn");
        closeBtn.trigger("click");

        expect(createFileMethodSpy).toHaveBeenCalledWith(targetFileName);
        expect(createItemMethodSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/dirs/android/new-dir",
            "android/" + targetFileName,
            "dir",
            "android"
        );
        expect(postHttpSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/dirs/android/new-dir",
            {
                body: JSON.stringify({
                    path: "android/" + targetFileName,
                    type: "dir",
                    dirPath: "android"
                })
            }
        );
        expect(wrapper.vm.errors).toEqual({});
    });
});
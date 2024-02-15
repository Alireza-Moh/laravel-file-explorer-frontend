import {mount, shallowMount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import createFileApiResponseTestData from "@/tests/testData/createFileApiResponseTestData.json";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import CreateFileButton from "@/components/dirContent/itemActions/buttons/CreateFileButton.vue";
import mitt from "mitt";
describe("CreateFileButton", () => {
    let wrapper, $http, $emitter;

    beforeEach(() => {
        $emitter = new mitt()
        $http = {
            post: vi.fn().mockImplementation(() => {
                return Promise.resolve(createFileApiResponseTestData);
            })
        };

        wrapper = mount(CreateFileButton, {
            global: {
                mocks: {
                    $http,
                    $emitter
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

    test("should render CreateFileButton component", () => {
        expect(CreateFileButton).toBeTruthy();
    });

    test("should emit showRenameModal when action button is clicked", async () => {
        const emitSpy = vi.spyOn($emitter, "emit");
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");
        await wrapper.vm.$nextTick();

        expect(emitSpy).toHaveBeenCalledWith(
            'showRenameModal',
            {
                label: "Enter file name:",
                functionOnSave: wrapper.vm.createFile,
                itemName: ""
            }
        );
    });

    test("should create file when create button is clicked in the modal", async () => {
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });
        const targetFileName = "testFileName.txt";
        const createFileMethodSpy = vi.spyOn(wrapper.vm, "createFile");
        const createItemMethodSpy = vi.spyOn(wrapper.vm, "createItem");
        const postHttpSpy = vi.spyOn($http, "post");

        wrapper.vm.createFile(targetFileName);

        expect(createFileMethodSpy).toHaveBeenCalledWith(targetFileName);
        expect(createItemMethodSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/dirs/android/new-file",
            "android/" + targetFileName,
            "android"
        );
        expect(postHttpSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/dirs/android/new-file",
            {
                body: JSON.stringify({
                    path: "android/" + targetFileName,
                    destination: "android"
                })
            }
        );
        expect(wrapper.vm.errors).toEqual({});
    });

    test("should not make a request when disk or dir is empty", async () => {
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });
        const showAlertSpy = vi.spyOn(window, "showAlert");
        wrapper.setData({diskName: "", dirName: null});
        await wrapper.vm.$nextTick();

        wrapper.vm.createFile("");

        expect(showAlertSpy).toHaveBeenCalledWith("failed", "Disk or directory not found");
    });
});
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import CreateDirButton from "@/components/dirContent/itemActions/buttons/CreateDirButton.vue";
import mitt from "mitt";
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

describe("CreateDirButton", () => {
    let wrapper, $API, $emitter;

    beforeEach(() => {
        $emitter = mitt();
        $API = Api;

        wrapper = mount(CreateDirButton, {
            global: {
                mocks: {
                    $API,
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

    test("should render CreateDirButton component", () => {
        expect(CreateDirButton).toBeTruthy();
    });

    test("should show item-action-modal when action button is clicked", async () => {
        const emitSpy = vi.spyOn($emitter, "emit");
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");
        await wrapper.vm.$nextTick();

        expect(emitSpy).toHaveBeenCalledWith(
            'showRenameModal',
            {
                label: "Enter directory name:",
                functionOnSave: wrapper.vm.createDir,
                itemName: ""
            }
        );
    });

    test("should create directory when create button is clicked in the modal", async () => {
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });

        wrapper.setData({diskName: "tests", dirName: 'android'});
        const targetDirName = "testDirName";
        const createFileMethodSpy = vi.spyOn(wrapper.vm, "createDir");
        const createItemMethodSpy = vi.spyOn(wrapper.vm, "createItem");

        wrapper.vm.createDir(targetDirName);

        expect(createFileMethodSpy).toHaveBeenCalledWith(targetDirName);
        expect(createItemMethodSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/new-dir",
            "android/" + targetDirName,
            "android"
        );
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

        wrapper.vm.createDir("");

        expect(showAlertSpy).toHaveBeenCalledWith("failed", "Disk or directory not found");

    });
});
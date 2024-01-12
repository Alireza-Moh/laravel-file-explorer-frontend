import RenameInput from "@/components/dirTree/components/RenameInput.vue";
import renameDirApiResponseTestData from "@/tests/testData/renameDirApiResponseTestData.json";
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";

describe('RenameInput', () => {
    let wrapper, $http;

    beforeEach(() => {
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });

        $http = {
            put: vi.fn().mockImplementation(() => {
                return Promise.resolve(renameDirApiResponseTestData);
            })
        }

        wrapper = mount(RenameInput, {
            global: {
                mocks: {
                    $http,
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings:settingsStoreTestData
                        }
                    })
                ]
            },
            props: {
                dir: {
                    "diskName": "tests",
                    "label": "android",
                    "path": "android",
                    "subDir": [
                        {
                            "diskName": "tests",
                            "label": "forTesting",
                            "path": "android/forTesting",
                            "subDir": []
                        }
                    ]
                }
            }
        })
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should render without errors', () => {
        expect(RenameInput).toBeTruthy();
    });

    test('should make an put request when save-icon is clicked', async () => {
        const putRequestSpy = vi.spyOn($http, 'put');
        wrapper.find("input").setValue("newDirName");

        await wrapper.find(".svg-img").trigger("click");

        expect(putRequestSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/files/android",
            {
                body: JSON.stringify({
                    oldPath: "android",
                    newPath: "newDirName"
                })
            }
        );
    });

    test("should emit hideRenameInput event when there is a result in api response", async () => {
        wrapper.find("input").setValue("newDirName");

        await wrapper.find(".svg-img").trigger("click");

        expect(wrapper.emitted("hideRenameInput")).toBeTruthy();
        expect(wrapper.emitted("hideRenameInput")[0][0]).toBe("success");
        expect(wrapper.emitted("hideRenameInput")[0][1]).toBe("newDirName");
        expect(wrapper.emitted("hideRenameInput")[0][2]).toBe("newDirName");
    });
});
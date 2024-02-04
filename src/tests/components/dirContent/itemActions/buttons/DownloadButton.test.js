import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import randomItems from "@/tests/testData/randomItems.json";
import mitt from "mitt";
import DownloadButton from "@/components/dirContent/itemActions/buttons/DownloadButton.vue";
describe("DownloadButton", () => {
    let wrapper, $emitter, $http;
    const mockBlob = new Blob(['mock file content'], { type: 'text/plain' });

    beforeEach(() => {
        $emitter = mitt();
        $http = {
            postBlob: vi.fn().mockResolvedValue(mockBlob)
        };

        wrapper = mount(DownloadButton, {
            global: {
                mocks: {
                    $http,
                    $emitter
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings: settingsStoreTestData
                        }
                    })
                ]
            },
            props: {
                items: [
                    {
                        "diskName": "tests",
                        "name": "4665_s001v.png",
                        "size": 64.61,
                        "lastModified": "2024-01-10 05:31:56",
                        "type": "file",
                        "path": "android/4665_s001v.png",
                        "url": "http://localhost:8084/storage/tests/android/4665_s001v.png",
                        "extension": "png"
                    },
                    {
                        "diskName": "tests",
                        "name": "4665_001v.png",
                        "size": 26.16,
                        "lastModified": "2024-01-13 15:55:19",
                        "type": "file",
                        "path": "android/4665_001v.png",
                        "url": "http://localhost:8084/storage/tests/android/4665_001v.png",
                        "extension": "png"
                    },
                ]
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render DownloadButton component", () => {
        expect(DownloadButton).toBeTruthy();
    });

    test("should download selected files when action-btn is clicked", async () => {
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: vi.fn()
        });
        Object.defineProperty(window.URL, 'createObjectURL', {
            writable: true,
            configurable: true,
            value: vi.fn()
        });
        HTMLAnchorElement.prototype.click = vi.fn(); //mock the click on a-tag to avoid navigation error
        const postBlobHttpSpy = vi.spyOn($http, "postBlob");
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");
        await wrapper.vm.$nextTick();

        expect(postBlobHttpSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/files/download",
            {
                body: JSON.stringify({
                    items: [
                        { name: "4665_s001v", path: 'android/4665_s001v.png', type: 'file' },
                        { name: "4665_001v", path: 'android/4665_001v.png', type: 'file' },
                    ]
                })
            }
        );
    });
});
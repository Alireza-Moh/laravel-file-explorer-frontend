import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import mitt from "mitt";
import DownloadButton from "@/components/dirContent/itemActions/buttons/DownloadButton.vue";
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


describe("DownloadButton", () => {
    let wrapper, $emitter, $API;

    beforeEach(() => {
        $emitter = mitt();
        $API = Api;

        wrapper = mount(DownloadButton, {
            global: {
                mocks: {
                    $API,
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
        const postBlobHttpSpy = vi.spyOn($API, "post");
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");
        await wrapper.vm.$nextTick();

        expect(postBlobHttpSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/items/download",
            {
                items: [
                    { name: "4665_s001v", path: 'android/4665_s001v.png', type: 'file' },
                    { name: "4665_001v", path: 'android/4665_001v.png', type: 'file' },
                ]
            },
            {
                "responseType": "blob"
            }
        );
    });
});
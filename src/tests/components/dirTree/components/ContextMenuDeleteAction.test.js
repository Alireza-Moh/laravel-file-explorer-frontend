import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import RightClickContextMenu from "@/components/dirTree/components/RightClickContextMenu.vue";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json";
import mitt from "mitt";
import ContextMenuDeleteAction from "@/components/dirTree/components/ContextMenuDeleteAction.vue";
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

describe('ContextMenuDeleteAction', () => {
    let wrapper, $API, $emitter;

    beforeEach(() => {
        $emitter = new mitt();
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });

        $API = Api;

        wrapper = mount(RightClickContextMenu, {
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
                        }
                    })
                ]
            },
            props: {
                left: 100,
                top: 100,
                dir: {
                    "diskName": "tests",
                    "name": "android",
                    "path": "android",
                    "type": "dir",
                    "subDir": [
                        {
                            "diskName": "tests",
                            "name": "forTesting",
                            "path": "android/forTesting",
                            "type": "dir",
                            "subDir": []
                        }
                    ]
                },
                directoryIndex: 0,
            }
        })
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should render ContextMenuDeleteAction component', () => {
        expect(ContextMenuDeleteAction).toBeTruthy();
    });

    test("should delete the subdirectory when the delete link is clicked", async () => {
        const deleteSpy = vi.spyOn($API, 'post');
        wrapper.setProps({
            dir: {
                "diskName": "tests",
                "name": "forTesting",
                "path": "android/forTesting",
                "type": "dir",
                "subDir": []
            }
        });
        await wrapper.vm.$nextTick();
        const deleteLink = wrapper.find('#delete-link');

        deleteLink.trigger("click");

        expect(deleteSpy).toHaveBeenCalledWith(
            "disks/tests/all/items/delete",
            {
                items: [
                    {
                        name: "forTesting",
                        path: "android/forTesting",
                        type: "dir",
                    }
                ]
            }
        );
    });

    test("should send delete request to the server when the delete link is clicked", async () => {
        const deleteSpy = vi.spyOn($API, 'post');
        const deleteLink = wrapper.find('#delete-link');

        deleteLink.trigger("click");

        expect(deleteSpy).toHaveBeenCalledWith(
            "disks/tests/all/items/delete",
            {
                items: [
                    {
                        name: "android",
                        path: "android",
                        type: "dir",
                    }
                ]
            }
        );
    });
});
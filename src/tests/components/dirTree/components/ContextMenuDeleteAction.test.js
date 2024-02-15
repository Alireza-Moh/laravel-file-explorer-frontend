import deleteDirApiResponseTestData from "@/tests/testData/deleteDirApiResponseTestData.json";
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import RightClickContextMenu from "@/components/dirTree/components/RightClickContextMenu.vue";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json";
import mitt from "mitt";
import ContextMenuRenameAction from "@/components/dirTree/components/ContextMenuRenameAction.vue";
import ContextMenuDeleteAction from "@/components/dirTree/components/ContextMenuDeleteAction.vue";

describe('ContextMenuDeleteAction', () => {
    let wrapper, $http, $emitter;

    beforeEach(() => {
        $emitter = new mitt();
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });

        $http = {
            delete: vi.fn().mockImplementation(() => {
                return Promise.resolve(deleteDirApiResponseTestData);
            })
        };

        wrapper = mount(RightClickContextMenu, {
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
        const deleteSpy = vi.spyOn($http, 'delete');
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
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/dirs/delete",
            {
                body: JSON.stringify({
                    items: [
                        {
                            name: "forTesting",
                            path: "android/forTesting"
                        }
                    ]
                })
            }
        );
    });

    test("should send a delete request to the server when the delete link is clicked", async () => {
        const deleteSpy = vi.spyOn($http, 'delete');
        const deleteLink = wrapper.find('#delete-link');

        deleteLink.trigger("click");

        expect(deleteSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/dirs/delete",
            {
                body: JSON.stringify({
                    items: [
                        {
                            name: "android",
                            path: "android"
                        }
                    ]
                })
            }
        );
    });
});
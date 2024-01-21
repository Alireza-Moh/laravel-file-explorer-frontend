import deleteDirApiResponseTestData from "@/tests/testData/deleteDirApiResponseTestData.json";
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import RightClickContextMenu from "@/components/dirTree/components/RightClickContextMenu.vue";
import disksStoreTestData from "@/tests/testData/stores/disksStoreTestData.json";
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json";

describe('RightClickContextMenu', () => {
    let wrapper, $http;

    beforeEach(() => {
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
        }

        wrapper = mount(RightClickContextMenu, {
            global: {
                mocks: {
                    $http,
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

    test('should render RightClickContextMenu component', () => {
        expect(RightClickContextMenu).toBeTruthy();
    });

    test('should have correct styles for "content" div', async () => {
        const contentDiv = wrapper.find('.content').element;

        expect(contentDiv.style.left).toBe('100px');
        expect(contentDiv.style.top).toBe('100px');
    });

    test("should emit 'rename-dir' event when rename link is clicked", async () => {
        const renameLink = wrapper.find('#rename-link');

        renameLink.trigger("click");

        expect(wrapper.emitted()).toHaveProperty("renameDir");
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
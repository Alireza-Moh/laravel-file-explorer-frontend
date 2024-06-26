import deleteDirApiResponseTestData from "@/tests/testData/deleteDirApiResponseTestData.json";
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import RightClickContextMenu from "@/components/dirTree/components/RightClickContextMenu.vue";
import diskDirsStoreTestData from "@/tests/testData/stores/diskDirsStoreTestData.json";
import mitt from "mitt";
import ContextMenuRenameAction from "@/components/dirTree/components/ContextMenuRenameAction.vue";
import ContextMenuDeleteAction from "@/components/dirTree/components/ContextMenuDeleteAction.vue";

describe('RightClickContextMenu', () => {
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
                }
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
        const contentDiv = wrapper.find('.context-menu-content').element;

        expect(contentDiv.style.left).toBe('100px');
        expect(contentDiv.style.top).toBe('100px');
    });

    test("should render ContextMenuRenameAction component on initialization", async () => {
        const component = wrapper.findComponent(ContextMenuRenameAction);

        expect(component.exists()).toBe(true);
    });

    test("should render ContextMenuDeleteAction component on initialization", async () => {
        const component = wrapper.findComponent(ContextMenuDeleteAction);

        expect(component.exists()).toBe(true);
    });
});
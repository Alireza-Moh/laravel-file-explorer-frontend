import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import mitt from "mitt";
import ContextMenuRenameAction from "@/components/dirTree/components/ContextMenuRenameAction.vue";

describe('ContextMenuRenameAction', () => {
    test('should render ContextMenuRenameAction component', () => {
        expect(ContextMenuRenameAction).toBeTruthy();
    });

    test("should emit 'showRenameModal' event and 'closeRightContext' even when rename button is clicked", () => {
        const $emitter = new mitt();
        const wrapper = mount(ContextMenuRenameAction, {
            global: {
                mocks: {
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
                item: {
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
        const emitSpy = vi.spyOn($emitter, "emit");
        const renameButton = wrapper.find(".context-menu-item");

        renameButton.trigger("click");

        expect(emitSpy).toHaveBeenCalledWith("closeRightContext");
        expect(emitSpy).toHaveBeenCalledWith(
            'showRenameModal',
            {
                label: "New directory name:",
                functionOnSave: wrapper.vm.saveNewItemName,
                errors: {},
                itemName: "android"
            }
        );
    });
});
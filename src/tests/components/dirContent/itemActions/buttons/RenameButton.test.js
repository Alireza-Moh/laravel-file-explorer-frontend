import {mount} from "@vue/test-utils";
import randomItems from "@/tests/testData/randomItems.json";
import mitt from "mitt";
import RenameButton from "@/components/dirContent/itemActions/buttons/RenameButton.vue";

describe("RenameButton", () => {
    let wrapper, $emitter;
    const targetItem =   {
        "diskName": "tests",
        "dirName": "android",
        "name": "4665_001v.png",
        "size": 64.61,
        "lastModified": "2024-01-10 05:31:56",
        "type": "file",
        "path": "android/4665_001v.png",
        "url": "http://localhost:8084/storage/tests/android/4665_001v.png",
        "extension": "png"
    };

    beforeEach(() => {
        $emitter = mitt();
        wrapper = mount(RenameButton, {
            global: {
                mocks: {
                    $emitter
                }
            },
            props: {
                items: [targetItem]
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render RenameButton component", () => {
        expect(RenameButton).toBeTruthy();
    });

    test("should emit events for showing rename input when items length is > 0", async () => {
        const emitSpy = vi.spyOn($emitter, "emit");
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");

        expect(emitSpy).toHaveBeenCalledWith('showRenameInputForItem', targetItem.name);
        expect(emitSpy).toHaveBeenCalledWith('sendItemToSave', targetItem);
    });

    test("should show error message when items length is < 0", async () => {
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });
        wrapper.setProps({items: randomItems});
        await wrapper.vm.$nextTick();
        const showAlertSpy = vi.spyOn(window, "showAlert");
        const actionBtn = wrapper.find(".action-btn");

        actionBtn.trigger("click");

        expect(showAlertSpy).toHaveBeenCalledWith("warning", "Multiple item renaming is not supported");
    });
});
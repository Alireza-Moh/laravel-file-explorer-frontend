import {mount} from "@vue/test-utils";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import mitt from "mitt";

describe("ConfirmModal component", () => {
    let wrapper, confirmMethodOnYes, confirmMethodOnNo, $emitter;

    beforeEach(() => {
        $emitter = mitt();
        confirmMethodOnYes = vi.fn();
        confirmMethodOnNo = vi.fn();
        wrapper = mount(ConfirmModal, {
            global: {
                mocks: {
                    $emitter
                }
            },
            props: {
                confirmMethodOnYes,
                confirmMethodOnNo
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render ConfirmModal component", () => {
        expect(ConfirmModal).toBeTruthy();
    });

    test("should trigger the confirmMethodOnYes when 'Yes' button is clicked", async () => {
        const emitSpy = vi.spyOn($emitter, "emit");
        const yesBtn = wrapper.find("#save-btn");

        await yesBtn.trigger("click");

        expect(emitSpy).toHaveBeenCalledWith('setButtonAnimation');
        expect(confirmMethodOnYes).toHaveBeenCalled();
    });

    test("should trigger the confirmMethodOnNo when 'No' button is clicked", async () => {
        const emitSpy = vi.spyOn($emitter, "emit");
        const noBtn = wrapper.find("#cancel-btn");

        await noBtn.trigger("click");

        expect(emitSpy).toHaveBeenCalledWith('resetButtonAnimation');
        expect(confirmMethodOnNo).toHaveBeenCalled();
    });
});
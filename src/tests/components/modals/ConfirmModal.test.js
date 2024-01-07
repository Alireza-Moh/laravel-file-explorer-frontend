import {mount} from "@vue/test-utils";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";

describe("ConfirmModal component", () => {
    let wrapper, confirmMethodOnYes, confirmMethodOnNo;

    beforeEach(() => {
        confirmMethodOnYes = vi.fn();
        confirmMethodOnNo = vi.fn();
        wrapper = mount(ConfirmModal, {
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
        await wrapper.find(".yes").trigger("click");

        expect(confirmMethodOnYes).toHaveBeenCalled();
    });

    test("should trigger the confirmMethodOnNo when 'No' button is clicked", async () => {
        await wrapper.find(".no").trigger("click");

        expect(confirmMethodOnNo).toHaveBeenCalled();
    });
});
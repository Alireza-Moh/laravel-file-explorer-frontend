import { mount } from "@vue/test-utils";
import RenameModal from "@/components/modals/RenameModal.vue";
import mitt from "mitt";

describe("ItemActionModal component", () => {
    let wrapper, $emitter;

    beforeEach(() => {
        $emitter = new mitt()

        wrapper = mount(RenameModal, {
            global: {
                mocks: {
                    $emitter
                }
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });
    test("should render RenameModal component", () => {
        expect(RenameModal).toBeTruthy();
    });

    test("should trigger the functionOnSave when 'Save' button is clicked", async () => {
        const functionOnSaveMethodSpy = vi.spyOn(wrapper.vm, "functionOnSave");
        await wrapper.setData({showRenameModal: true, enteredName: "Test Item", functionOnSave: vi.fn()});
        await wrapper.vm.$nextTick();

        const input = wrapper.find("#itemName");
        await wrapper.find("#save-btn").trigger("click");

        expect(functionOnSaveMethodSpy).toHaveBeenCalledWith( "Test Item");
    });

    test("should trigger the functionOnCancel when 'Cancel' button is clicked", async () => {
        await wrapper.setData({showRenameModal: true});
        await wrapper.vm.$nextTick();

        await wrapper.find("#cancel-btn").trigger("click");

        expect(wrapper.vm.showRenameModal).toBe(false);
    });

    test("should render the label text correctly", async () => {
        const label = "Enter file name";
        await wrapper.setData({label: label, showRenameModal: true, enteredName: label, functionOnSave: vi.fn()});
        await wrapper.vm.$nextTick();

        const labelElement = wrapper.find("label");
        expect(labelElement.text()).toBe(label);
    });
});

import { mount } from "@vue/test-utils";
import ItemActionModal from "@/components/modals/ItemActionModal.vue";

describe("ItemActionModal component", () => {
    test("should render ItemActionModal component", () => {
        expect(ItemActionModal).toBeTruthy();
    });

    test("should trigger the functionOnSave when 'Save' button is clicked", async () => {
        const functionOnSave = vi.fn();
        const wrapper = mount(ItemActionModal, {
            props: {
                functionOnSave
            }
        });


        const input = wrapper.find("#itemName");
        await input.setValue("Test Item");
        await wrapper.find("#save-btn").trigger("click");

        expect(functionOnSave).toHaveBeenCalledWith("Test Item");
    });

    test("should trigger the functionOnCancel when 'Cancel' button is clicked", async () => {
        const functionOnCancel = vi.fn();
        const wrapper = mount(ItemActionModal, {
            props: {
                functionOnCancel
            }
        });

        await wrapper.find("#cancel-btn").trigger("click");

        expect(functionOnCancel).toHaveBeenCalled();
    });

    test("should render the label text correctly", () => {
        const label = "Item Name";
        const wrapper = mount(ItemActionModal, {
            props: {
                label
            }
        });

        const labelElement = wrapper.find("label");

        expect(labelElement.text()).toBe(label);
    });

    test("should display errors when errors object is provided", async () => {
        const errors = {
            path: ["Item name is required."]
        };
        const wrapper = mount(ItemActionModal, {
            props: {
                errors
            }
        });

        const errorElement = wrapper.find(".error");

        expect(errorElement.exists()).toBe(true);
        expect(errorElement.text()).toBe(errors.path[0]);
    });

    test("should not display errors when errors object is not provided", () => {
        const wrapper = mount(ItemActionModal);
        const errorElement = wrapper.find(".error");

        expect(errorElement.exists()).toBe(false);
    });
});

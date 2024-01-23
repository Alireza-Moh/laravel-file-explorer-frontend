import {mount} from "@vue/test-utils";
import Alert from "@/components/_baseComponents/Alert.vue";

test("should render Alert component", () => {
    expect(Alert).toBeTruthy();
});

describe.concurrent("Alert component", () => {
    test("should receive 'type' and 'message' props with correct values", () => {
        const wrapper = mount(Alert, {
            props: {
                type: "warning",
                message: "This is a test message"
            }
        });

        expect(wrapper.props().type).toBe("warning");
        expect(wrapper.props().message).toBe("This is a test message");
    });

    test("should contain 'message' prop in html", () => {
        const wrapper = mount(Alert, {
            props: {
                type: "warning",
                message: "This is a test message"
            }
        });

        expect(wrapper.text()).contains("This is a test message");
    });

    test("should apply 'type' prop to the class", () => {
        const type = "warning";

        const wrapper = mount(Alert, {
            props: {
                type: type,
                message: "This is a test message"
            }
        });

        expect(wrapper.classes()).toContain(type);
    });

    test('should render alert with success message', async () => {
        const wrapper = mount(Alert, {
            props: {
                type: "success",
                message: "This is a success message"
            }
        });


        expect(wrapper.props().type).toBe("success");
        expect(wrapper.props().message).toBe("This is a success message");
    });

    test('should render alert with success message', async () => {
        const wrapper = mount(Alert, {
            props: {
                type: "failed",
                message: "This is a failed message"
            }
        });


        expect(wrapper.props().type).toBe("failed");
        expect(wrapper.props().message).toBe("This is a failed message");
    });
});
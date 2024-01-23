import { mount } from '@vue/test-utils';
import mitt from "mitt";
import ImageViewer from "@/components/dirContent/components/ImageViewer.vue";

describe('ImageViewer', () => {
    let wrapper, $emitter;

    beforeEach(() => {
        $emitter = mitt();
        wrapper = mount(ImageViewer, {
            global: {
                mocks: {
                    $emitter
                },
            },
            data() {
                return {
                    url: "",
                    showModal: false
                };
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render ImageViewer component", () => {
        expect(ImageViewer).toBeTruthy();
    });

    test("should not show modal when false", () => {
        const modal = wrapper.find(".modal-wrapper");

        expect(modal.exists()).toBe(false);
    });

    test("should not show modal when false", () => {
        const modal = wrapper.find(".modal-wrapper");

        expect(modal.exists()).toBe(false);
    });

    test("should show modal when event showImageViewer is emitted", async () => {
        $emitter.emit("showImageViewer", "http://localhost:8084/storage/mobile/ios/63962_001i.jpg");
        await wrapper.vm.$nextTick();

        const modal = wrapper.find(".modal-wrapper");
        const img = wrapper.find("img");

        expect(modal.exists()).toBe(true);
        expect(img.exists()).toBe(true);
        expect(img.attributes("src")).toBe("http://localhost:8084/storage/mobile/ios/63962_001i.jpg");
    });

    test("should hide modal when close icon is clicked", async () => {
        wrapper.setData({showModal: true})
        await wrapper.vm.$nextTick();
        const closeIcon = wrapper.find(".close");

        closeIcon.trigger("click");

        expect(wrapper.vm.showModal).toBe(false);
    });
});
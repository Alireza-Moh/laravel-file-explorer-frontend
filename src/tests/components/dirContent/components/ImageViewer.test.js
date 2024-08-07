import { mount } from '@vue/test-utils';
import mitt from "mitt";
import ImageViewer from "@/components/dirContent/components/ImageViewer.vue";
import Api from "@/services/Api.js";

vi.mock('@/services/Api.js', () => {
    return {
        default: {
            get: vi.fn().mockResolvedValue({
                data: {
                    result: []
                }
            })
        }
    };
});

describe('ImageViewer', () => {
    let wrapper, $emitter, $API;

    beforeEach(() => {
        $emitter = mitt();
        $API = Api;

        wrapper = mount(ImageViewer, {
            global: {
                mocks: {
                    $API: $API,
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
        $emitter.emit("showImageViewer", {});
        wrapper.setData({ showModal: true });
        await wrapper.vm.$nextTick();

        const modal = wrapper.find(".modal-wrapper");
        const img = wrapper.find("img");

        expect(modal.exists()).toBe(true);
        expect(img.exists()).toBe(true);
    });

    test("should hide modal when close icon is clicked", async () => {
        wrapper.setData({showModal: true})
        await wrapper.vm.$nextTick();
        const closeIcon = wrapper.find(".close");

        closeIcon.trigger("click");

        expect(wrapper.vm.showModal).toBe(false);
    });
});
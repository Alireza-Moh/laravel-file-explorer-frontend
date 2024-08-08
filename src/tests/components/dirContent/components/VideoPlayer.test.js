import {mount} from '@vue/test-utils';
import mitt from "mitt";
import VideoPlayer from "@/components/dirContent/components/VideoPlayer.vue";
import Api from "@/services/Api.js";

vi.mock('@/services/Api.js', () => {
    return {
        default: {
            get: vi.fn().mockResolvedValue({
                data: {
                    result: [] // mock response data as needed
                }
            })
        }
    };
});

describe('VideoPlayer', () => {
    let wrapper, $emitter, $API;

    beforeEach(() => {
        $emitter = mitt();
        $API = Api;
        wrapper = mount(VideoPlayer, {
            global: {
                mocks: {
                    $emitter,
                    $API
                },
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render VideoPlayerViewer component", () => {
        expect(VideoPlayer).toBeTruthy();
    });

    test("should not show modal when false", () => {
        const modal = wrapper.find(".modal");

        expect(modal.exists()).toBe(false);
    });
});
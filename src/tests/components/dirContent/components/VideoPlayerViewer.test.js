import { mount } from '@vue/test-utils';
import mitt from "mitt";
import VideoPlayer from "@/components/dirContent/components/VideoPlayer.vue";
import {getTestVideo} from "@/tests/helpers/functions.js";

describe('VideoPlayerViewer', () => {
    let wrapper, $emitter;

    beforeEach(() => {
        $emitter = mitt();
        wrapper = mount(VideoPlayer, {
            global: {
                mocks: {
                    $emitter
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

    test("should show modal when event showImageViewer is emitted", async () => {
        const targetItem = getTestVideo();
        targetItem["videoType"] = 'video/mp4';
        $emitter.emit("showVideoPlayer", targetItem);
        await wrapper.vm.$nextTick();

        const modal = wrapper.find(".modal");
        const videoSrc = wrapper.find(".video-src");

        expect(wrapper.vm.showPlayer).toBe(true);
        expect(modal.exists()).toBe(true);
        expect(videoSrc.exists()).toBe(true);
        expect(wrapper.vm.item).toEqual(targetItem);
        expect(videoSrc.attributes("src")).toBe(targetItem.url);
    });

    test("should hide modal when close icon is clicked", async () => {
        const targetItem = getTestVideo();
        targetItem["videoType"] = 'video/mp4';
        $emitter.emit("showVideoPlayer", targetItem);
        await wrapper.vm.$nextTick();
        const closeIcon = wrapper.find(".close");
        const modal = wrapper.find(".modal");

        closeIcon.trigger("click");

        expect(modal.exists()).toBe(true);
        expect(wrapper.vm.showPlayer).toBe(false);
    });
});
import {flushPromises, mount} from '@vue/test-utils';
import DirLink from "@/components/dirTree/components/DirLink.vue";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import RightClickContextMenu from "@/components/dirTree/components/RightClickContextMenu.vue";
import dirItemsApiResponseTestData from "@/tests/testData/dirItemsApiResponseTestData.json";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import RenameInput from "@/components/dirTree/components/RenameInput.vue";

const getIosDirectoryItems = () => {
    return {
        dir: {
            "diskName": "tests",
            "label": "ios",
            "path": "ios",
            "subDir": [
                {
                    "diskName": "tests",
                    "label": "forRealse",
                    "path": "ios/forRealse",
                    "subDir": []
                }
            ]
        }
    };
};

describe('DirLink component', () => {
    let wrapper, $http;

    beforeEach(() => {
        $http = {
            post: vi.fn().mockImplementation(() => {
                return Promise.resolve(dirItemsApiResponseTestData);
            })
        }

        wrapper = mount(DirLink, {
            global: {
                mocks: {
                    $http,
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings:settingsStoreTestData,
                            dirItems: dirItemsStoreTestData
                        }
                    })
                ]
            },
            props: {
                dir: {
                    "diskName": "tests",
                    "label": "android",
                    "path": "android",
                    "subDir": [
                        {
                            "diskName": "tests",
                            "label": "forTesting",
                            "path": "android/forTesting",
                            "subDir": []
                        }
                    ]
                },
                showCartIcon: true
            }
        })
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should render DirLink component', () => {
        expect(DirLink).toBeTruthy();
    });

    test("should contain 'android' as dirname", () => {
        const dirNameSpan = wrapper.find('.nav__name');

        expect(dirNameSpan.text()).toContain('android');
    });

    test("should show folder icon", () => {
        const folderIcon = wrapper.find('.dir-folder-icon');

        expect(folderIcon.exists()).toBe(true);
    });

    test("should show cart icon", () => {
        const cartIcon = wrapper.find('.cheven_link.svg-img');

        expect(cartIcon.exists()).toBe(true);
    });

    test("should display the context menu on right-click on the folder link", async () => {
        await wrapper.find(".nav__link").trigger("contextmenu");

        expect(wrapper.findComponent(RightClickContextMenu).exists()).toBe(true);
    });

    test("should hide/close the context menu on click on the context menu overlay", async () => {
        wrapper.vm.showRightContext = true;
        await wrapper.vm.$nextTick();

        await wrapper.find(".context-overlay").trigger("click");

        expect(wrapper.findComponent(RightClickContextMenu).exists()).toBe(false);
    });

    test("should apply 'opened-sub-dir' class to cart icon on click", async () => {
        const cartIcon = wrapper.find('.cheven_link.svg-img');

        await cartIcon.trigger("click");

        expect(cartIcon.classes()).toContain("opened-sub-dir");
    });

    test("should emit event when cart is clicked", async () => {
        const cartIcon = wrapper.find('.cheven_link.svg-img');

        await cartIcon.trigger("click");

        expect(wrapper.emitted()).toHaveProperty("openSubNav");
    });

    test("should fetch items for 'ios' directory on nav__link-wrapper click with a POST request", async () => {
        const postRequestSpy = vi.spyOn($http, 'post')
        wrapper.setProps(getIosDirectoryItems());
        await wrapper.vm.$nextTick();

        const linkWrapper = wrapper.find(".nav__link-wrapper");
        await linkWrapper.trigger("click");

        expect(postRequestSpy).toHaveBeenCalledWith(
            "http://localhost:8080/my-project/api/laravel-file-explorer/disks/tests/dirs/ios",
            {
                body: JSON.stringify({
                    path: "ios"
                })
            }
        );
    });

    test("should not make a POST request for 'ios' directory to the backend if the items of the directory already exists in the store", async () => {
        const postRequestSpy = vi.spyOn($http, 'post')
        wrapper.setProps(getIosDirectoryItems());
        const items = [
            {
                "diskName": "tests",
                "dirName": "ios",
                "name": "file1.txt",
                "size": 123.45,
                "lastModified": "2022-01-11 08:30:00",
                "type": "file",
                "path": "android/file1.txt",
                "url": "http://localhost:8084/storage/tests/ios/file1.txt",
                "extension": "txt"
            },
            {
                "diskName": "tests",
                "dirName": "ios",
                "name": "document.pdf",
                "size": 1024.75,
                "lastModified": "2022-01-11 09:15:45",
                "type": "file",
                "path": "ios/document.pdf",
                "url": "http://localhost:8084/storage/mobile/ios/document.pdf",
                "extension": "pdf"
            },
            {
                "diskName": "tests",
                "dirName": "ios",
                "name": "image.jpg",
                "size": 512.89,
                "lastModified": "2022-01-11 10:45:20",
                "type": "file",
                "path": "android/image.jpg",
                "url": "http://localhost:8084/storage/tests/ios/image.jpg",
                "extension": "jpg"
            },
            {
                "diskName": "tests",
                "dirName": "ios",
                "name": "spreadsheet.pdf",
                "size": 2048.33,
                "lastModified": "2022-01-11 12:00:01",
                "type": "file",
                "path": "ios/spreadsheet.pdf",
                "url": "http://localhost:8084/storage/mobile/ios/spreadsheet.pdf",
                "extension": "pdf"
            },
            {
                "diskName": "tests",
                "dirName": "ios",
                "name": "code.js",
                "size": 76.5,
                "lastModified": "2022-01-11 13:30:45",
                "type": "file",
                "path": "android/code.js",
                "url": "http://localhost:8084/storage/tests/ios/code.js",
                "extension": "js"
            },
            {
                "diskName": "tests",
                "dirName": "ios",
                "name": "presentation.pdf",
                "size": 1536.22,
                "lastModified": "2022-01-11 15:20:00",
                "type": "file",
                "path": "ios/presentation.pdf",
                "url": "http://localhost:8084/storage/mobile/ios/presentation.pdf",
                "extension": "pdf"
            },
            {
                "diskName": "tests",
                "dirName": "ios",
                "name": "video.mp4",
                "size": 4096.75,
                "lastModified": "2022-01-11 17:10:30",
                "type": "file",
                "path": "android/video.mp4",
                "url": "http://localhost:8084/storage/tests/ios/video.mp4",
                "extension": "mp4"
            },
            {
                "diskName": "tests",
                "dirName": "ios",
                "name": "archive.pdf",
                "size": 8192.5,
                "lastModified": "2022-01-11 19:00:15",
                "type": "file",
                "path": "ios/archive.pdf",
                "url": "http://localhost:8084/storage/mobile/ios/archive.pdf",
                "extension": "pdf"
            },
            {
                "diskName": "tests",
                "dirName": "ios",
                "name": "document.docx",
                "size": 2048.88,
                "lastModified": "2022-01-11 20:45:50",
                "type": "file",
                "path": "android/document.docx",
                "url": "http://localhost:8084/storage/tests/ios/document.docx",
                "extension": "docx"
            },
            {
                "diskName": "tests",
                "dirName": "ios",
                "name": "image.png",
                "size": 512.5,
                "lastModified": "2022-01-11 22:30:25",
                "type": "file",
                "path": "ios/image.png",
                "url": "http://localhost:8084/storage/mobile/ios/image.png",
                "extension": "png"
            }
        ];
        useDirItemsStore().data.push({
            diskName: "tests",
            dirName: "ios",
            items: items,
            selectedDirPath: "ios",
        });
        await wrapper.vm.$nextTick();

        const linkWrapper = wrapper.find(".nav__link-wrapper");
        await linkWrapper.trigger("click");

        expect(postRequestSpy).not.toHaveBeenCalled();
    });

    test("should show RightClickContextMenu component when user right clicks on dir link", async () => {
        const navLink = wrapper.find(".nav__link");

        navLink.trigger("contextmenu");
        await wrapper.vm.$nextTick();

        const rightClickContextMenu = wrapper.findComponent(RightClickContextMenu);
        expect(rightClickContextMenu.exists()).toBe(true);
    });

    test("should show rename input component when rename button in RightClickContextMenu is clicked", async () => {
        const navLink = wrapper.find(".nav__link");
        navLink.trigger("contextmenu");
        await wrapper.vm.$nextTick();
        const rightClickContextMenu = wrapper.findComponent(RightClickContextMenu);

        rightClickContextMenu.vm.$emit('rename-dir');
        await wrapper.vm.$nextTick();

        const renameInput = wrapper.findComponent(RenameInput);
        expect(renameInput.exists()).toBe(true);
    });

    test("should hide the RenameInput component when the 'hide-rename-input' event is emitted", async () => {
        wrapper.find(".nav__link").trigger("contextmenu");
        await wrapper.vm.$nextTick();
        const rightClickContextMenu = wrapper.findComponent(RightClickContextMenu);
        rightClickContextMenu.vm.$emit('rename-dir');
        await wrapper.vm.$nextTick();

        wrapper.findComponent(RenameInput).vm.$emit("hide-rename-input");
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showRenameInput).toBe(false);
        expect(wrapper.findComponent(RenameInput).exists()).toBe(false);
    });

    test("should change directory label to 'changedDir' and the path to 'changedDir' when the status is 'success' on 'hide-rename-input' event emit", async () => {
        wrapper.find(".nav__link").trigger("contextmenu");
        await wrapper.vm.$nextTick();
        const rightClickContextMenu = wrapper.findComponent(RightClickContextMenu);
        rightClickContextMenu.vm.$emit('rename-dir');
        await wrapper.vm.$nextTick();

        wrapper.findComponent(RenameInput).vm.$emit("hide-rename-input", "success", "changedDir", "changedDir");
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.dir.label).toBe("changedDir");
        expect(wrapper.vm.dir.path).toBe("changedDir");
    });
});
import {mount} from '@vue/test-utils';
import DirLink from "@/components/dirTree/components/DirLink.vue";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import RightClickContextMenu from "@/components/dirTree/components/RightClickContextMenu.vue";
import dirItemsApiResponseTestData from "@/tests/testData/dirItemsApiResponseTestData.json";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import mitt from "mitt";
import Api from "@/services/Api.js";

vi.mock('@/services/Api.js', () => {
    return {
        default: {
            get: vi.fn().mockResolvedValue({
                data: {
                    result: [] // mock response data as needed
                }
            }),
            post: vi.fn().mockResolvedValue({
                data: {
                    result: [] // mock response data as needed
                }
            }),
            fetchCsrfToken: vi.fn().mockResolvedValue({
                data: {
                    data: {
                        csrfToken: 'mockCsrfToken'
                    }
                }
            })
        }
    };
});

const getIosDirectoryItems = () => {
    return {
        dir: {
            "diskName": "tests",
            "name": "ios",
            "path": "ios",
            "type": "dir",
            "subDir": [
                {
                    "diskName": "tests",
                    "name": "forRealse",
                    "path": "ios/forRealse",
                    "type": "dir",
                    "subDir": []
                }
            ]
        }
    };
};

describe('DirLink component', () => {
    let wrapper, $API, $emitter;

    beforeEach(() => {
        $API = Api;

        $emitter = mitt();

        wrapper = mount(DirLink, {
            global: {
                mocks: {
                    $API,
                    $emitter
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
                    "name": "android",
                    "path": "android",
                    "type": "dir",
                    "subDir": [
                        {
                            "diskName": "tests",
                            "name": "forTesting",
                            "path": "android/forTesting",
                            "type": "dir",
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

    test("should contain 'android' as parent", () => {
        const parentSpan = wrapper.find('.nav__name');

        expect(parentSpan.text()).toContain('android');
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

    test("should fetch items for 'ios' directory on nav__link-wrapper click for opening directory with a POST request", async () => {
        const postRequestSpy = vi.spyOn($API, 'get')
        wrapper.setProps(getIosDirectoryItems());
        await wrapper.vm.$nextTick();

        const linkWrapper = wrapper.find(".nav__link-wrapper");
        await linkWrapper.trigger("click");

        expect(postRequestSpy).toHaveBeenCalledWith(
            "disks/tests/dirs/ios?path=ios",
        );
    });

    test("should not make a POST request for 'ios' directory to the backend if the items of the directory already exists in the store", async () => {
        const postRequestSpy = vi.spyOn($API, 'get')
        wrapper.setProps(getIosDirectoryItems());
        const items = [
            {
                "diskName": "tests",
                "parent": "ios",
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
                "parent": "ios",
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
                "parent": "ios",
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
                "parent": "ios",
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
                "parent": "ios",
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
                "parent": "ios",
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
                "parent": "ios",
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
                "parent": "ios",
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
                "parent": "ios",
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
                "parent": "ios",
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
            parent: "ios",
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
});
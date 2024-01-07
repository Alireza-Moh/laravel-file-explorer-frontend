import {flushPromises, mount} from "@vue/test-utils";
import DiskList from "@/components/DiskList.vue";
import {createTestingPinia} from "@pinia/testing";
import {useDisksStore} from "@/stores/disksStore.js";

describe.concurrent("DiskList component", () => {
    let wrapper, disksStore, $http;

    beforeEach(() => {
        $http = {
            get: vi.fn().mockImplementation(() => {
                return Promise.resolve({
                    result: {}
               /*     result: {
                        dirs: [
                            {
                                diskName: "web",
                                label: "android",
                                path: "android",
                                subDir: [
                                    {
                                        diskName: "web",
                                        label: "forTesting",
                                        path: "android/forTesting",
                                        subDir: []
                                    }
                                ]
                            },
                            {
                                diskName: "web",
                                label: "ios",
                                path: "ios",
                                subDir: [
                                    {
                                        diskName: "web",
                                        label: "forRealse",
                                        path: "ios/forRealse",
                                        subDir: [
                                            {
                                                diskName: "web",
                                                label: "DB IMAGES",
                                                path: "ios/forRealse/DB IMAGES",
                                                subDir: [
                                                    {
                                                        diskName: "web",
                                                        label: "svgs",
                                                        path: "ios/forRealse/DB IMAGES/svgs",
                                                        subDir: []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        selectedDir: "android",
                        selectedDirPath: "android",
                        selectedDirItems: [
                            {
                                diskName: "mobile",
                                dirName: "android",
                                name: "4576_001ss.jpg",
                                size: 87.91,
                                lastModified: "2018-11-27 21:19:34",
                                type: "file",
                                path: "android/4576_001 (2021_08_10 13_17_28 UTC).jpg",
                                url: "http://localhost:8084/storage/mobile/android/4576_001ss.jpg",
                                extension: "jpg"
                            },
                            {
                                diskName: "mobile",
                                dirName: "android",
                                name: "45A13B56photo.jpg",
                                size: 263.98,
                                lastModified: "2020-10-30 23:54:32",
                                type: "file",
                                path: "android/45A13B56photo.jpg",
                                url: "http://localhost:8084/storage/mobile/android/45A13B56photo.jpg",
                                extension: "jpg"
                            }
                        ]
                    }*/
                });
            })
        }

        wrapper = mount(DiskList, {
            global: {
                mocks: {
                    $http
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            disks: {
                                disks: [
                                    "tests",
                                    "images",
                                    "web"
                                ]
                            },
                            settings: {
                                defaultFileExplorerViewData: {
                                    selectedDisk: "tests",
                                    selectedDir: "android",
                                    selectedDirPath: "android",
                                    dirsForSelectedDisk: [
                                        {
                                            diskName: "web",
                                            label: "android",
                                            path: "android",
                                            subDir: [
                                                {
                                                    diskName: "web",
                                                    label: "forTesting",
                                                    path: "android/forTesting",
                                                    subDir: []
                                                }
                                            ]
                                        },
                                        {
                                            diskName: "web",
                                            label: "ios",
                                            path: "ios",
                                            subDir: [
                                                {
                                                    diskName: "web",
                                                    label: "forRealse",
                                                    path: "ios/forRealse",
                                                    subDir: [
                                                        {
                                                            diskName: "web",
                                                            label: "DB IMAGES",
                                                            path: "ios/forRealse/DB IMAGES",
                                                            subDir: [
                                                                {
                                                                    diskName: "web",
                                                                    label: "svgs",
                                                                    path: "ios/forRealse/DB IMAGES/svgs",
                                                                    subDir: []
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    selectedDirItems: [
                                        {
                                            diskName: "mobile",
                                            dirName: "android",
                                            name: "4576_001ss.jpg",
                                            size: 87.91,
                                            lastModified: "2018-11-27 21:19:34",
                                            type: "file",
                                            path: "android/4576_001 (2021_08_10 13_17_28 UTC).jpg",
                                            url: "http://localhost:8084/storage/mobile/android/4576_001ss.jpg",
                                            extension: "jpg"
                                        },
                                        {
                                            diskName: "mobile",
                                            dirName: "android",
                                            name: "45A13B56photo.jpg",
                                            size: 263.98,
                                            lastModified: "2020-10-30 23:54:32",
                                            type: "file",
                                            path: "android/45A13B56photo.jpg",
                                            url: "http://localhost:8084/storage/mobile/android/45A13B56photo.jpg",
                                            extension: "jpg"
                                        }
                                    ]
                                }
                            },
                            diskDirs: {
                                dirs: [
                                    {
                                        dirs: [
                                            {
                                                diskName: "web",
                                                label: "android",
                                                path: "android",
                                                subDir: [
                                                    {
                                                        diskName: "web",
                                                        label: "forTesting",
                                                        path: "android/forTesting",
                                                        subDir: []
                                                    }
                                                ]
                                            },
                                            {
                                                diskName: "web",
                                                label: "ios",
                                                path: "ios",
                                                subDir: [
                                                    {
                                                        diskName: "web",
                                                        label: "forRealse",
                                                        path: "ios/forRealse",
                                                        subDir: [
                                                            {
                                                                diskName: "web",
                                                                label: "DB IMAGES",
                                                                path: "ios/forRealse/DB IMAGES",
                                                                subDir: [
                                                                    {
                                                                        diskName: "web",
                                                                        label: "svgs",
                                                                        path: "ios/forRealse/DB IMAGES/svgs",
                                                                        subDir: []
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        diskName: "web",
                                        selectedDir: "ios"
                                    }
                                ]
                            },
                            dirItems: {
                                data: [
                                    {
                                        dirItems: [
                                            {
                                                diskName: "mobile",
                                                dirName: "android",
                                                name: "4576_001ss.jpg",
                                                size: 87.91,
                                                lastModified: "2018-11-27 21:19:34",
                                                type: "file",
                                                path: "android/4576_001 (2021_08_10 13_17_28 UTC).jpg",
                                                url: "http://localhost:8084/storage/mobile/android/4576_001ss.jpg",
                                                extension: "jpg"
                                            },
                                            {
                                                diskName: "mobile",
                                                dirName: "android",
                                                name: "45A13B56photo.jpg",
                                                size: 263.98,
                                                lastModified: "2020-10-30 23:54:32",
                                                type: "file",
                                                path: "android/45A13B56photo.jpg",
                                                url: "http://localhost:8084/storage/mobile/android/45A13B56photo.jpg",
                                                extension: "jpg"
                                            }
                                        ],
                                        diskName: "web",
                                        dirName: "ios",
                                    }
                                ]
                            }
                        }
                    })
                ]
            }
        });

        disksStore = useDisksStore();
    })

    test("should render DiskList component", () => {
        expect(DiskList).toBeTruthy();
    });

    test('should render 3 disk buttons', () => {
        const actionButtons = wrapper.findAll('.action-btn');

        expect(actionButtons.length).toBe(3);
    });

    test("should set 'tests' disk as the selected disk", () => {
        const selectedDiskButton = wrapper.find('.action-btn.selected');

        expect(selectedDiskButton.exists()).toBeTruthy();
        expect(selectedDiskButton.text()).toBe('tests');
    })

    test("should set 'tests' disk button to disabled", () => {
        const selectedDiskButton = wrapper.find('.action-btn.selected');

        expect(selectedDiskButton.isDisabled()).toBeTruthy();
    });

    test("should set the 'web' disk as the selected disk upon clicking the web disk button", async () => {
        const webDiskButton = wrapper.findAll('.action-btn').filter(button => button.text() === 'web')[0];

        webDiskButton.trigger('click');
        await flushPromises();

        expect(webDiskButton.element.classList).toContain('selected');
        expect(webDiskButton.isDisabled()).toBeTruthy();
    });

    test("should not make an API request upon clicking the web disk button if the web-disk data already exist", async () => {
        const buySpy = vi.spyOn($http, 'get')
        const webDiskButton = wrapper.findAll('.action-btn').filter(button => button.text() === 'web')[0];

        webDiskButton.trigger('click');

        expect(buySpy).not.toHaveBeenCalled();
    });

    test("should make an API request upon clicking the web disk button if the images-disk data already exist", async () => {
        const buySpy = vi.spyOn($http, 'get')
        const webDiskButton = wrapper.findAll('.action-btn').filter(button => button.text() === 'images')[0];

        webDiskButton.trigger('click');
        expect(buySpy).toHaveBeenCalled();
    });
});
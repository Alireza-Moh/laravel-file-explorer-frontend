import { mount } from '@vue/test-utils';
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
import randomItems from "@/tests/testData/randomItems.json";
import {useSettingsStore} from "@/stores/settingsStore.js";
import DirContentTable from "@/components/dirContent/DirContentTable.vue";
import ContentTableMenu from "@/components/dirContent/components/ContentTableMenu.vue";
import dirItemsStoreTestData from "@/tests/testData/stores/dirItemsStoreTestData.json";
import mitt from "mitt";

describe('DirContentTable Component', () => {
    let wrapper, settingsStore, $emitter;

    beforeEach(() => {
        $emitter = mitt();
        wrapper = mount(DirContentTable, {
            global: {
                mocks: {
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
            }
        });

        settingsStore = useSettingsStore();
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("should render DirContentTable component", () => {
        expect(DirContentTable).toBeTruthy();
    });

    test('should calculate fullHeight based on itemHeight and number of items in the list', () => {
        expect(wrapper.vm.fullHeight).toBe(160);
    });

    test('should render ContentTableMenu component with the correct props', () => {
        const contentTableMenu = wrapper.findComponent(ContentTableMenu);

        expect(contentTableMenu.exists()).toBe(true);
    });

    test('should update items list when new items are pushed to the store', async () => {
        const updateFunctionSpy = vi.spyOn(wrapper.vm, 'updateVisibleItems');
        settingsStore.$patch((state) => {
            state.defaultFileExplorerViewData.selectedDirItems = randomItems;
        });
        await wrapper.vm.$nextTick();

        expect(updateFunctionSpy).toHaveBeenCalled();
    });

    test('should render ContentTableRow component for each item in the list', async () => {
        wrapper.vm.items = [
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 48.11,
                "lastModified": "2024-01-10 06:01:56",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 92.29,
                "lastModified": "2024-01-13 05:22:58",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 12.14,
                "lastModified": "2024-01-07 05:53:06",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 57.54,
                "lastModified": "2024-01-13 22:57:34",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 40.76,
                "lastModified": "2024-01-07 16:15:05",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 98.72,
                "lastModified": "2024-01-04 00:24:59",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 23.58,
                "lastModified": "2024-01-11 10:06:31",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 66.55,
                "lastModified": "2024-01-09 16:32:19",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 15.83,
                "lastModified": "2024-01-12 13:02:37",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 72.93,
                "lastModified": "2024-01-06 08:54:13",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 44.13,
                "lastModified": "2024-01-11 21:24:03",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 24.1,
                "lastModified": "2024-01-05 21:49:00",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 5.38,
                "lastModified": "2024-01-02 09:31:41",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 78.21,
                "lastModified": "2024-01-05 15:17:57",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 65.85,
                "lastModified": "2024-01-11 02:03:21",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 13.82,
                "lastModified": "2024-01-11 20:14:28",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 43.52,
                "lastModified": "2024-01-03 12:36:54",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 45.36,
                "lastModified": "2024-01-12 11:57:00",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 95.42,
                "lastModified": "2024-01-10 05:06:00",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 87.44,
                "lastModified": "2024-01-07 22:46:11",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 36.11,
                "lastModified": "2024-01-11 19:45:06",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 11.65,
                "lastModified": "2024-01-05 15:33:44",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 89.66,
                "lastModified": "2024-01-07 09:54:38",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 11.86,
                "lastModified": "2024-01-14 08:34:25",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 80.3,
                "lastModified": "2024-01-08 17:16:40",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 20.15,
                "lastModified": "2024-01-04 21:38:45",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 56.77,
                "lastModified": "2024-01-14 11:55:15",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 2.71,
                "lastModified": "2024-01-07 11:54:47",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
            {
                "diskName": "mobile",
                "parent": "ios",
                "name": "63962_001i.img",
                "size": 58.45,
                "lastModified": "2024-01-11 00:03:21",
                "type": "file",
                "path": "ios/63962_001i.img",
                "url": "http://localhost:8084/storage/mobile/ios/63962_001i.img",
                "extension": "img"
            },
        ];
        const updateFunctionSpy = vi.spyOn(wrapper.vm, 'updateVisibleItems');
        wrapper.find(".viewport").trigger('scroll');

        expect(updateFunctionSpy).toHaveBeenCalled();
    });
});
import { mount } from "@vue/test-utils";
import FileUploadModal from "@/components/modals/FileUploadModal.vue";
import {createTestingPinia} from "@pinia/testing";

describe("FileUploadModal component", () => {
    let wrapper, fileInput, $http;

    beforeEach(async () => {
        $http = {
            post: vi.fn().mockImplementation(() => {
                return Promise.resolve({
                    "result": {
                        "status": "success",
                        "message": "File uploaded successfully",
                        "items": [
                            {
                                "diskName": "mobile",
                                "dirName": "android",
                                "name": "4576_001ss.jpg",
                                "size": 87.91,
                                "lastModified": "2018-11-27 21:19:34",
                                "type": "file",
                                "path": "android/4576_001 (2021_08_10 13_17_28 UTC).jpg",
                                "url": "http://localhost:8084/storage/mobile/android/4576_001ss.jpg",
                                "extension": "jpg"
                            },
                            {
                                "diskName": "mobile",
                                "dirName": "android",
                                "name": "45A13B56photo.jpg",
                                "size": 263.98,
                                "lastModified": "2020-10-30 23:54:32",
                                "type": "file",
                                "path": "android/45A13B56photo.jpg",
                                "url": "http://localhost:8084/storage/mobile/android/45A13B56photo.jpg",
                                "extension": "jpg"
                            },
                            {
                                "diskName": "mobile",
                                "dirName": "ios",
                                "name": "file1.txt",
                                "size": 120.51,
                                "lastModified": "2024-01-04 21:24:29",
                                "type": "file",
                                "path": "ios\/file1.txt",
                                "url": "http:\/\/localhost:8084\/storage\/mobile\/ios\/file1.txt",
                                "extension": "txt"
                            },
                            {
                                "diskName": "mobile",
                                "dirName": "ios",
                                "name": "file2.txt",
                                "size": 120.51,
                                "lastModified": "2024-01-04 21:24:29",
                                "type": "file",
                                "path": "ios\/file1.txt",
                                "url": "http:\/\/localhost:8084\/storage\/mobile\/ios\/file2.txt",
                                "extension": "txt"
                            },
                        ]
                    }
                })
            })
        }
        wrapper = mount(FileUploadModal, {
            global: {
                mocks: {
                    $http
                },
                plugins: [
                    createTestingPinia({
                        settings: {
                            defaultFileExplorerViewData: {
                                selectedDisk: "tests",
                                selectedDir: "android",
                                selectedDirPath: "android"
                            }
                        },
                    })
                ]
            }
        });

        const selectButton = wrapper.find(".select-btn");
        await selectButton.trigger("click");
        fileInput = wrapper.find(".file-input");
    });
    test("should render FileUploadModal component", () => {
        expect(FileUploadModal).toBeTruthy();
    });

    test("should select files when 'Browse Files' button is clicked", async () => {
        const files = [
            new File(["file1 contents"], "file1.txt", { type: "text/plain" }),
            new File(["file2 contents"], "file2.txt", { type: "text/plain" }),
        ];
        const fileList = {
            length: files.length,
            item: (index) => files[index],
            ...files,
        };
        Object.defineProperty(fileInput.element, "files", {
            value: fileList,
        });

        await fileInput.trigger("change");

        expect(wrapper.vm.files).toHaveLength(2);
        expect(wrapper.vm.files[0].name).toBe("file1.txt");
        expect(wrapper.vm.files[1].name).toBe("file2.txt");
    });

    test("should display a warning message when the maximum file upload limit is exceeded", async () => {
        const files = [
            new File(["file1 contents"], "file1.txt", { type: "text/plain" }),
            new File(["file2 contents"], "file2.txt", { type: "text/plain" }),
            new File(["file3 contents"], "file3.txt", { type: "text/plain" }),
            new File(["file4 contents"], "file4.txt", { type: "text/plain" }),
            new File(["file5 contents"], "file5.txt", { type: "text/plain" }),
            new File(["file6 contents"], "file6.txt", { type: "text/plain" }),
            new File(["file7 contents"], "file7.txt", { type: "text/plain" }),
            new File(["pdf8 contents"], "file8.pdf", { type: "application/pdf" }),
            new File(["pdf9 contents"], "file9.pdf", { type: "application/pdf" }),
            new File(["pdf10 contents"], "file10.pdf", { type: "application/pdf" }),
            new File(["pdf11 contents"], "file11.pdf", { type: "application/pdf" }),
            new File(["file12 contents"], "file12.txt", { type: "text/plain" }),
        ];
        const fileList = {
            length: files.length,
            item: (index) => files[index],
            ...files,
        };
        Object.defineProperty(fileInput.element, "files", {
            value: fileList,
        });

        await fileInput.trigger("change");

        const alertComponent = wrapper.findComponent({ name: "Alert" });
        expect(alertComponent.exists()).toBe(true);
        expect(alertComponent.text()).toContain("Limit: Maximum of 10 files per upload");
        expect(wrapper.vm.maxUploadFilesReached).toBeTruthy();
    });

    test("should remove a file when the delete icon is clicked", async () => {
        const wrapper = mount(FileUploadModal, {
            data() {
                return {
                    files: [
                        { name: "file1.txt" },
                        { name: "file2.jpg" },
                        { name: "file3.pdf" },
                    ],
                };
            },
        });
        const deleteIcons = wrapper.findAll(".delete-icon");

        await deleteIcons[1].trigger("click");

        expect(wrapper.vm.files).toHaveLength(2);
        expect(wrapper.vm.files[1].name).toBe("file3.pdf");
    });

    test("should send the files to the backend when the save button is clicked", async () => {
        const buySpy = vi.spyOn($http, 'post');
        const showAlert = vi.fn();
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: showAlert
        });
        const files = [
            new File(["file1 contents"], "file1.txt", { type: "text/plain" }),
            new File(["file2 contents"], "file2.txt", { type: "text/plain" }),
        ];
        const fileList = {
            length: files.length,
            item: (index) => files[index],
            ...files,
        };
        Object.defineProperty(fileInput.element, "files", {
            value: fileList,
        });
        const saveButton = wrapper.find("#save-btn");

        await fileInput.trigger("change");
        await saveButton.trigger("click");

        expect(buySpy).toHaveBeenCalled();
    });
});

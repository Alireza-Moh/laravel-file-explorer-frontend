import { mount } from "@vue/test-utils";
import FileUploadModal from "@/components/modals/ItemUploadModal.vue";
import {createTestingPinia} from "@pinia/testing";
import settingsStoreTestData from "@/tests/testData/stores/settingsStoreTestData.json";
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

describe("FileUploadModal component", () => {
    let wrapper, fileInput, $API, $emitter;

    beforeEach(async () => {
        $API = Api;
        $emitter = mitt();
        wrapper = mount(FileUploadModal, {
            global: {
                mocks: {
                    $API,
                    $emitter
                },
                plugins: [
                    createTestingPinia({
                        initialState: {
                            settings: settingsStoreTestData,
                        }
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

        expect(wrapper.vm.items).toHaveLength(2);
        expect(wrapper.vm.items[0].name).toBe("file1.txt");
        expect(wrapper.vm.items[1].name).toBe("file2.txt");
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
        expect(wrapper.vm.maxUploadItemsReached).toBe(true);
    });

    test("should remove a item when the delete icon is clicked", async () => {
        const wrapper = mount(FileUploadModal, {
            data() {
                return {
                    items: [
                        { name: "file1.txt" },
                        { name: "file2.jpg" },
                        { name: "file3.pdf" },
                    ],
                };
            },
        });
        const deleteIcons = wrapper.findAll(".delete-icon");

        await deleteIcons[1].trigger("click");

        expect(wrapper.vm.items).toHaveLength(2);
        expect(wrapper.vm.items[1].name).toBe("file3.pdf");
    });

    test("should send the files to the backend when the save button is clicked", async () => {
        const postSpy = vi.spyOn($API, 'post');
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

        expect(postSpy).toHaveBeenCalled();
    });


    test("should set the value of radio buttons by name", async () => {
        const fileExist = wrapper.findAll('input[name="fileExist"]');

        await fileExist[1].setChecked();

        expect(wrapper.vm.ifItemExist).toBe(1);
    });

    test("should send form data to backend", async () => {
        const postSpy = vi.spyOn($API, 'post');
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

        const fileExist = wrapper.findAll('input[name="fileExist"]');
        await fileExist[1].setChecked();

        const formData = new FormData();
        formData.append("ifItemExist", 1);
        formData.append("destination", "android");
        for (let i = 0; i < files.length; i++) {
            formData.append("items[]", files[i]);
        }

        await saveButton.trigger("click");

        expect(postSpy).toHaveBeenCalledWith(
            "disks/tests/items/upload",
            formData
        );
    });
});

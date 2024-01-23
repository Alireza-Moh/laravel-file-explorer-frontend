import {createPinia, setActivePinia} from "pinia";
import {useDisksStore} from "@/stores/disksStore.js";

describe('useDisksStore', () => {
    let store;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useDisksStore();
    });

    test("should initialize with correct values", () => {
        expect(store.disks).toHaveLength(0);
    });

    test('should add a disk to the list', () => {
        const disks = ["tests", "all", "images"];

        store.setDisks(disks);

        expect(store.disks).toEqual(expect.arrayContaining(disks));
    });
});
export default {
    props: {
        selectedDir: String
    },
    data() {
        return {
            isSubNavOpen: false,
        }
    },
    methods: {
        isSelectedDir(dirName) {
            return dirName === this.selectedDir;
        }
    }
}
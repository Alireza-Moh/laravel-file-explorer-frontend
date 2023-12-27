export default {
    methods: {
        getFileNameWithoutExtension(name) {
            const lastDotIndex = name.lastIndexOf('.');

            if (lastDotIndex === -1) {
                return name;
            } else {
                return name.substring(0, lastDotIndex);
            }
        }
    }
}
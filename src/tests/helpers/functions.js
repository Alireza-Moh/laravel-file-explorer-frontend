const getTestVideo= () => {
    return {
        diskName:"tests",
        dirName:"android",
        name:"test-video.mp4",
        size:608.45,
        lastModified:"2020-10-30 23:54:50",
        type:"file",
        path:"android/test-video.mp4",
        url:"http://localhost:8084/storage/mobile/android/test-video.mp4",
        extension:"mp4",
        isChecked: false
    };
};

const getTestImage= () => {
    return {
        diskName: "mobile",
        dirName: "ios",
        name: "63962_001i.img",
        size: 48.11,
        lastModified: "2024-01-10 06:01:56",
        type: "file",
        path: "ios/63962_001i.jpg",
        url: "http://localhost:8084/storage/mobile/ios/63962_001i.jpg",
        extension: "jpg",
        isChecked: false
    };
};

export {getTestVideo, getTestImage};


const loadJSON = async () => {
    try {
        const response = await fetch("./json/channel1.json");
        const data = await response.json();
        videoData(data["video"]);
        shortsData(data["shorts"]);
        channelData(data["channel"]);
        addCommentsSection(data["comments"]);
        addOtherVideos(data["allvideos"]);
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
};

loadJSON();

const addCommentsSection = (data) => {
    const commentsBody = document.querySelector(".comments-body");
    commentsBody.innerHTML = "";

    let commentPara = data["commentspara"];
    let commentsCount = data["commentcount"];

    let commentsCountTag = document.getElementById("commentsCountTag");
    commentsCountTag.innerText = commentsCount;

    Object.entries(commentPara).forEach(([username, comment]) => {

        const commentsParent = document.createElement("div");
        commentsParent.className = "comments-parent";

        const commentsParentLeft = document.createElement("div");
        commentsParentLeft.className = "comments-parent-left";

        const commentsParentRight = document.createElement("div");
        commentsParentRight.className = "comments-parent-right";

        const userParent = document.createElement("div");
        userParent.className = "user-parent";

        const userIcon = document.createElement("i");
        userIcon.className = "fa-regular fa-user user-icon";

        const userName = document.createElement("h1");
        userName.className = "user-name";
        userName.innerText = username;

        const userComments = document.createElement("p");
        userComments.className = "user-comments";
        userComments.innerText = comment;

        commentsParent.appendChild(commentsParentLeft);
        commentsParent.appendChild(commentsParentRight);

        commentsParentLeft.appendChild(userParent);
        userParent.appendChild(userIcon);

        commentsParentRight.appendChild(userName);
        commentsParentRight.appendChild(userComments);

        commentsBody.appendChild(commentsParent);
    });
};


const videos = document.querySelectorAll(".video-item-left-video");

videos.forEach((video) => {
    video.muted = true;
    video.preload = "metadata";

    video.addEventListener("mouseenter", () => {
        video.play();
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
    });
});

const shortsVideo = document.querySelectorAll(".shorts-item-video");

shortsVideo.forEach((video) => {
    video.muted = true;
    video.preload = "metadata";

    video.addEventListener("mouseenter", () => {
        video.play();
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
    });
});

const videoData = (data) => {
    let videoplayerHeadline = document.getElementById("videoplayerHeadline");
    let videoUrl = document.getElementById("mainVideo");
    let tag = document.getElementById("tag");
    let likeCount = document.getElementById("likeCount");
    let dislikeCount = document.getElementById("dislikeCount");
    let videPeriod = document.getElementById("videPeriod");
    let descriptionPara = document.getElementById("descriptionPara");
    let descriptionTag = document.getElementById("descriptionTag");


    videoplayerHeadline.innerText = data.title;
    tag.innerText = data.tag;
    videoUrl.src = data.videourl;
    videoUrl.poster = data.videoposter;
    likeCount.innerText = data.likecount;
    dislikeCount.innerText = data.dislikecount;
    videPeriod.innerText = data.viewsperiod;
    descriptionPara.innerHTML = data.description;
    descriptionTag.innerText = data.descriptiontags;
}

const shortsData = (data) => {
    const shortsItems = document.querySelectorAll(".shorts-item");

    shortsItems.forEach((item, index) => {
        // Get the video element and text elements
        const video = item.querySelector(".shorts-item-video");
        const titlePara = item.querySelector(".shorts-bot-left-para");
        const viewsPara = item.querySelector(".shorts-bot-left-views");

        // Get the corresponding shorts data (shorts1, shorts2, shorts3)
        const shortsKey = `shorts${index + 1}`;
        const shortsItemData = data[shortsKey];

        if (shortsItemData) {
            // Set video source and title
            video.src = shortsItemData.shortsurl;
            video.title = shortsItemData.title;

            // Set the text content
            if (titlePara) {
                titlePara.textContent = shortsItemData.title;
            }

            if (viewsPara) {
                viewsPara.textContent = shortsItemData.shortsviews;
            }
        }
    });
}


const channelData = (data) => {
    let cName = document.getElementById("cName");
    let cImg = document.getElementById("cImg");
    let cSubCount = document.getElementById("cSubCount");

    cName.innerText = data.cname;
    cImg.src = data.cimg;
    cSubCount.innerText = data.subcount;
}

const addOtherVideos = (data) => {
    let videoItem = document.querySelectorAll(".video-item");

    videoItem.forEach((item, index) => {
        let videoTag = item.querySelector(".video-item-left-video");
        let videoTimer = item.querySelector(".video-item-time");
        let videoTitle = item.querySelector(".video-bot-left-para");
        let videoChannelName = item.querySelector(".video-bot-left-views");
        let videoChannelViews = item.querySelector("#allVideoViews");

        let videoKey = `video${index + 1}`;
        videoTag.poster = data.videoposter;

        let videoData = data[videoKey];

        videoTag.poster = videoData.videoposter;
        videoTag.src = videoData.videourl;
        videoTimer.innerText = videoData.videotime;
        videoTitle.innerText = videoData.videotitle;
        videoChannelName.innerText = videoData.videocname;
        videoChannelViews.innerText = videoData.videoviews;
    })


}




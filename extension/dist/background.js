/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/background.ts":
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/***/ (function() {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "LIKE_VIDEO") {
        const { videoId, accessToken } = message.payload;
        fetch("https://www.googleapis.com/youtube/v3/videos/rate", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: videoId,
                rating: "like",
            }),
        })
            .then((response) => {
            return true;
        })
            .then(() => {
            sendResponse({ success: true, videoId });
        })
            .catch((error) => {
            console.error("Error in liking the video:", error);
            sendResponse({ success: false, error: error.message });
        });
        return true;
    }
    if (message.type === "COMMENT_VIDEO") {
        const { videoId, commentText, accessToken } = message.payload;
        const url = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet";
        const body = {
            snippet: {
                topLevelComment: {
                    snippet: {
                        textOriginal: commentText,
                    },
                },
                videoId,
            },
        };
        fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
            .then((data) => {
            sendResponse({ success: true, data });
        })
            .catch((error) => {
            console.error("Error posting comment:", error);
            sendResponse({ success: false, error: error.message });
        });
        return true;
    }
    // channel
    if (message.type === "FETCH_CHANNEL_ID_AND_SUBSCRIBE") {
        const { handle, accessToken } = message.payload;
        fetchChannelIdAndSubscribe(handle, accessToken)
            .then((data) => {
            sendResponse({ success: true, data });
        })
            .catch((error) => {
            sendResponse({ success: false, error: error.message });
        });
        return true;
    }
});
function fetchChannelIdAndSubscribe(handle, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = "AIzaSyBjUc6_XRFUCZqQpxzUyC26rnznsJQYTfo";
        const fetchChannelIdResponse = yield fetchChannelId(handle, apiKey);
        if (!fetchChannelIdResponse) {
            throw new Error(`Channel ID not found for handle: ${handle}`);
        }
        return yield subscribeToChannel(fetchChannelIdResponse, apiKey, accessToken);
    });
}
function fetchChannelId(handle, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${handle}&key=${apiKey}`;
        const response = yield fetch(apiUrl);
        const data = yield response.json();
        if (data.items && data.items.length > 0) {
            return data.items[0].id;
        }
        else {
            throw new Error(`No channel found for handle: ${handle}`);
        }
    });
}
function subscribeToChannel(channelId, apiKey, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet";
        const response = yield fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                snippet: {
                    resourceId: {
                        channelId: channelId,
                    },
                },
            }),
        });
        if (!response.ok) {
            const errorData = yield response.json();
            throw new Error(`Subscription API failed: ${errorData.error.message}`);
        }
        return yield response.json();
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/background/background.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=background.js.map
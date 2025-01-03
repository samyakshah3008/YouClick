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
    const url =
      "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet";
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

async function fetchChannelIdAndSubscribe(handle, accessToken) {
  const apiKey = "AIzaSyBjUc6_XRFUCZqQpxzUyC26rnznsJQYTfo";

  const fetchChannelIdResponse = await fetchChannelId(handle, apiKey);
  if (!fetchChannelIdResponse) {
    throw new Error(`Channel ID not found for handle: ${handle}`);
  }

  return await subscribeToChannel(fetchChannelIdResponse, apiKey, accessToken);
}

async function fetchChannelId(handle, apiKey) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${handle}&key=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    return data.items[0].id;
  } else {
    throw new Error(`No channel found for handle: ${handle}`);
  }
}

async function subscribeToChannel(channelId, apiKey, accessToken) {
  const apiUrl =
    "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet";
  const response = await fetch(apiUrl, {
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
    const errorData = await response.json();
    throw new Error(`Subscription API failed: ${errorData.error.message}`);
  }

  return await response.json();
}

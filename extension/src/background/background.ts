chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "API_CALL") {
    const { url, method, headers, body } = message.payload;

    fetch(url, {
      method: method || "GET",
      headers: headers || {},
      body: body ? JSON.stringify(body) : null,
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
        console.error("Error in API call:");
        sendResponse({ success: false, error: error?.message || "" });
      });

    // Return true to indicate an asynchronous response
    return true;
  }

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
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        // return response.json();
        return true;
      })
      .then(() => {
        sendResponse({ success: true, videoId });
      })
      .catch((error) => {
        console.error("Error in liking the video:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true; // Indicates asynchronous response
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

    return true; // Keep the channel open for async response
  }

  // channel temp

  if (message.type === "FETCH_CHANNEL_ID_AND_SUBSCRIBE_TEMP") {
    const { handle, accessToken } = message.payload;
    const apiKey = "AIzaSyBjUc6_XRFUCZqQpxzUyC26rnznsJQYTfo"; // Replace with your YouTube API key

    const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${handle}&key=${apiKey}`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

    //   const response = await fetch(apiUrl);
    //   const data = await response.json();

    //   if (data.items && data.items.length > 0) {
    //     return data.items[0].id; // Extract the channelId
    //   } else {
    //     throw new Error(`No channel found for handle: ${handle}`);
    //   }
  }

  // channel final

  if (message.type === "FETCH_CHANNEL_ID_AND_SUBSCRIBE") {
    const { handle, accessToken } = message.payload;

    fetchChannelIdAndSubscribe(handle, accessToken)
      .then((data) => {
        sendResponse({ success: true, data });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });

    return true; // Indicate an asynchronous response
  }
});

async function fetchChannelIdAndSubscribe(handle, accessToken) {
  const apiKey = "AIzaSyBjUc6_XRFUCZqQpxzUyC26rnznsJQYTfo"; // Replace with your YouTube API key

  // Step 1: Fetch the channel ID using the handle
  const fetchChannelIdResponse = await fetchChannelId(handle, apiKey);
  if (!fetchChannelIdResponse) {
    throw new Error(`Channel ID not found for handle: ${handle}`);
  }

  console.log("Fetched Channel ID:", fetchChannelIdResponse);

  //   return channelId;

  // Step 2: Call the subscription API
  return await subscribeToChannel(fetchChannelIdResponse, apiKey, accessToken);
}

// Helper to fetch the channel ID
async function fetchChannelId(handle, apiKey) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${handle}&key=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log(data, "dataaa from minalalmedj");

  if (data.items && data.items.length > 0) {
    return data.items[0].id; // Extract the channelId
  } else {
    throw new Error(`No channel found for handle: ${handle}`);
  }
}

// Helper to subscribe to the channel
async function subscribeToChannel(channelId, apiKey, accessToken) {
  console.log(channelId, "from subscribe to channel bg js");
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

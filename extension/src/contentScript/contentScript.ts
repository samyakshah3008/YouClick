chrome.runtime.sendMessage("I am loading content script", (response) => {
  console.log(response);
  console.log("I am content script");
});

window.onload = () => {
  console.log("loaded on load script");

  // makeApiCall();
  checkAndShowPopup();
};

function makeApiCall() {
  chrome.runtime.sendMessage(
    {
      type: "API_CALL",
      payload: {
        url: "http://localhost:4500/api/v1/auth/hello",
        method: "GET",
        headers: {
          // Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
        },
      },
    },
    (response) => {
      console.log(response, "response main");
      if (response.success) {
        console.log("API Response:", response.data);
        alert(`${response?.data} success from content`);
      } else {
        // alert("failure from content");
        console.error("API Error:");
      }
    }
  );
}

// Function to observe URL changes in SPAs
function observeUrlChanges() {
  let lastUrl = window.location.href;

  const observer = new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      console.log("URL changed to:", currentUrl);
      checkAndShowPopup();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Function to handle the popup logic
function checkAndShowPopup() {
  if (window.location.search.includes("?v=")) {
    showPopup();
    // getChannelId();
  }
}

function extractChannelHandle() {
  const linkElements = document.querySelectorAll(
    'span[itemprop="author"] a[itemprop="url"]'
  );
  for (const link of linkElements) {
    const href = link.getAttribute("href");
    if (href && href.startsWith("http://www.youtube.com/@")) {
      return href.split("/@")[1]; // Extract the handle, e.g., 'ChandnaRecords'
    }
  }
  return null;
}

function getChannelId() {
  // Check if the URL contains "/channel/"
  // if (window.location.href.includes("/channel/")) {
  //   const match = window.location.href.match(/\/channel\/([^/?]+)/);
  //   if (match) {
  //     console.log("Extracted Channel ID from URL:", match[1]);
  //     return match[1];
  //   }
  // }

  // AIzaSyBjUc6_XRFUCZqQpxzUyC26rnznsJQYTfo

  // Check for channel ID metadata on video pages

  // const metaElement: any = document.querySelector('span[itemprop="author"]');
  // console.log(metaElement, "meta element");
  // if (metaElement) {
  //   console.log("Extracted Channel ID from Metadata:", metaElement.content);
  //   return metaElement.content;
  // }

  // console.warn("Channel ID not found on the current page.");
  // return null;

  const authorSpan = document.querySelector('span[itemprop="author"]');
  if (authorSpan) {
    const linkElement: any = authorSpan.querySelector('link[itemprop="url"]');
    if (linkElement && linkElement.href) {
      const username = linkElement.href.split("@")[1];
      console.log("Extracted Username:", username);
      return username;
      // Fetch the channel ID using YouTube API
      // const channelId = await fetchChannelIdFromUsername(username);
      // return channelId;
    }
  }

  console.warn("Channel username not found on the current page.");
  return null;
}

function subscribeToChannelLogic() {
  const channelHandle = getChannelId(); // Extract the handle, e.g., '@ChandnaRecords'

  if (!channelHandle) {
    console.error("Channel handle not found on the page.");
    return;
  }

  chrome.storage.local.get("accessToken", (data) => {
    console.log(data, "dataaa from content script");
    if (data.accessToken) {
      chrome.runtime.sendMessage(
        {
          type: "FETCH_CHANNEL_ID_AND_SUBSCRIBE",
          payload: {
            handle: channelHandle,
            accessToken: data.accessToken,
          },
        },
        (response) => {
          console.log(response, "response of subscription.");
          alert(response);
          if (response.success) {
            alert("Successfully subscribed to the channel!");
            console.log("Subscription successful:", response.data);
          } else {
            console.error("Subscription failed:", response.error);
            alert("Failed to subscribe. Check console for details.");
          }
        }
      );
    }
  });
}

// Function to create and display a popup
function showPopup() {
  if (document.getElementById("youtube-extension-popup")) return; // Avoid duplicate popups

  const popup = document.createElement("div");
  popup.id = "youtube-extension-popup";
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.width = "300px";
  popup.style.padding = "20px";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "1px solid #ccc";
  popup.style.borderRadius = "5px";
  popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
  popup.style.zIndex = "9999";

  popup.innerHTML = `
          <h3>Video Started</h3>
          <p>This is a dummy popup for now. Add your features here.</p>
          <button id="like-video-btn">Like Video</button>
            <button id="comment-video-btn">Comment on Video</button>
                      <button id="subscribe-btn">Subscribe</button>
          <button id="close-popup-btn">Close</button>
      `;

  document.body.appendChild(popup);

  // Add event listener to like video button
  document.getElementById("like-video-btn").addEventListener("click", () => {
    likeVideo();
  });

  document.getElementById("comment-video-btn").addEventListener("click", () => {
    commentVideo();
  });

  document.getElementById("subscribe-btn").addEventListener("click", () => {
    // console.log("Triggering Subscribe action for Channel:", channelId);
    subscribeToChannelLogic();
  });

  // Add event listener to close button
  document.getElementById("close-popup-btn").addEventListener("click", () => {
    popup.remove();
  });
}

function commentVideo() {
  const commentText = "Amazing video!";
  if (commentText) {
    const videoId = new URLSearchParams(window.location.search).get("v");

    chrome.storage.local.get("accessToken", (data) => {
      if (data.accessToken) {
        chrome.runtime.sendMessage(
          {
            type: "COMMENT_VIDEO",
            payload: { videoId, commentText, accessToken: data.accessToken },
          },
          (response) => {
            if (response.success) {
              alert("Comment posted successfully!");
            } else {
              console.error("Failed to post comment:", response.error);
              alert("Failed to post comment.");
            }
          }
        );
      }
    });
  }
}

function likeVideo() {
  const videoId = new URLSearchParams(window.location.search).get("v"); // Extract video ID from URL

  chrome.storage.local.get("accessToken", (data) => {
    console.log(data, "data from like video");
    if (data.accessToken) {
      chrome.runtime.sendMessage(
        {
          type: "LIKE_VIDEO",
          payload: {
            videoId: videoId,
            accessToken: data.accessToken,
          },
        },
        (response) => {
          console.log(response, "response from content script");
          // alert(response);
          if (response.success) {
            alert(`Video liked successfully! ${response?.videoId}`);
          } else {
            console.error("Failed to like the video:", response.error);
            alert("Error liking the video.");
          }
        }
      );
    } else {
      alert("No access token found. Please authenticate first.");
    }
  });
}

// Start observing URL changes
observeUrlChanges();

window.onload = () => {
  checkAndShowPopup();
};

function observeUrlChanges() {
  let lastUrl = window.location.href;

  const observer = new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      checkAndShowPopup();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function checkAndShowPopup() {
  if (window.location.search.includes("?v=")) {
    chrome.storage.local.get("accessToken", (data) => {
      if (data.accessToken) {
        showPopup();
      } else {
        showSessionExpiredPopup();
      }
    });
  }
}

function getChannelId() {
  const authorSpan = document.querySelector('span[itemprop="author"]');
  if (authorSpan) {
    const linkElement: any = authorSpan.querySelector('link[itemprop="url"]');
    if (linkElement && linkElement.href) {
      const username = linkElement.href.split("@")[1];
      return username;
    }
  }
  return null;
}

function showSessionExpiredPopup() {
  if (document.getElementById("session-expired-popup")) return;

  const popup = document.createElement("div");
  popup.id = "session-expired-popup";
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
      <h3>YouClick Session Expired</h3>
      <p>Your YouClick session has expired. Please log in to continue.</p>
      <button id="login-link" style="color: red; text-decoration: underline;">Log in</button>
      <button id="close-session-popup-btn" style="margin-top: 10px;">Close</button>
  `;

  document.body.appendChild(popup);

  // Close button
  document
    .getElementById("close-session-popup-btn")
    .addEventListener("click", () => {
      popup.remove();
    });

  document.getElementById("login-link").addEventListener("click", () => {
    popup.remove();
    window.open("https://you-click-dashboard.vercel.app/", "_blank");
  });
}

function showPopup() {
  if (document.getElementById("youtube-extension-popup")) return;

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
      <h3>Video Actions</h3>
      <div>
          <input type="checkbox" id="like-checkbox"> Like<br>
          <input type="checkbox" id="comment-checkbox"> Comment<br>
          <input type="text" id="comment-input" placeholder="Enter your comment" value="Amazing video!" style="width: 100%; margin-top: 5px;" disabled><br>
          <input type="checkbox" id="subscribe-checkbox"> Subscribe<br>
      </div>
      <button id="execute-actions-btn" disabled style="margin-top: 10px;">Execute</button>
      <button id="close-popup-btn" style="margin-top: 10px;">Close</button>
  `;

  document.body.appendChild(popup);

  const likeCheckbox = document.getElementById(
    "like-checkbox"
  ) as HTMLInputElement;
  const commentCheckbox = document.getElementById(
    "comment-checkbox"
  ) as HTMLInputElement;
  const subscribeCheckbox = document.getElementById(
    "subscribe-checkbox"
  ) as HTMLInputElement;
  const commentInput = document.getElementById(
    "comment-input"
  ) as HTMLInputElement;
  const executeBtn = document.getElementById(
    "execute-actions-btn"
  ) as HTMLButtonElement;

  commentCheckbox.addEventListener("change", () => {
    commentInput.disabled = !commentCheckbox.checked;
    updateExecuteButtonState();
  });

  [likeCheckbox, commentCheckbox, subscribeCheckbox].forEach((checkbox) =>
    checkbox.addEventListener("change", updateExecuteButtonState)
  );

  function updateExecuteButtonState() {
    executeBtn.disabled = !(
      likeCheckbox.checked ||
      commentCheckbox.checked ||
      subscribeCheckbox.checked
    );
  }

  executeBtn.addEventListener("click", () => {
    executeSelectedActions(commentInput.value);
    popup.remove();
  });

  document.getElementById("close-popup-btn").addEventListener("click", () => {
    popup.remove();
  });
}

function executeSelectedActions(commentText) {
  const likeChecked = (
    document.getElementById("like-checkbox") as HTMLInputElement
  ).checked;
  const commentChecked = (
    document.getElementById("comment-checkbox") as HTMLInputElement
  ).checked;
  const subscribeChecked = (
    document.getElementById("subscribe-checkbox") as HTMLInputElement
  ).checked;

  if (likeChecked) {
    likeVideo();
  }
  if (commentChecked) {
    commentVideo(commentText);
  }
  if (subscribeChecked) {
    subscribeToChannelLogic();
  }
}

function commentVideo(commentText = "Amazing video!") {
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
              alert(
                "Comment posted successfully! To see the comment, please refresh your browser and if you still don't see the comment, please wait for some time as youtube apis take some time to reflect."
              );
            } else {
              console.error("Failed to post comment:", response.error);
              alert(`Failed to post comment. ${response?.error} `);
            }
          }
        );
      } else {
        alert("No access token found. Please authenticate first.");
      }
    });
  }
}

function likeVideo() {
  const videoId = new URLSearchParams(window.location.search).get("v");

  chrome.storage.local.get("accessToken", (data) => {
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
          if (response.success) {
            alert(
              `Video liked successfully! To see liked video, please refresh your browser and if you still don't see the video liked, please wait for some time as youtube apis take some time to reflect."`
            );
          } else {
            console.error("Failed to like the video:", response.error);
            alert(`Error liking the video. ${response.error}`);
          }
        }
      );
    } else {
      alert("No access token found. Please authenticate first.");
    }
  });
}

function subscribeToChannelLogic() {
  const channelHandle = getChannelId();

  if (!channelHandle) {
    console.error("Channel handle not found on the page.");
    return;
  }

  chrome.storage.local.get("accessToken", (data) => {
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
          if (response.success) {
            alert(
              "Successfully subscribed to the channel! To see the subscribed status, please refresh your browser and if you still don't see channel subscribed, please wait for some time as youtube apis take some time to reflect."
            );
          } else {
            alert(`Failed to subscribe. ${response?.error} `);
          }
        }
      );
    } else {
      alert("No access token found. Please authenticate first.");
    }
  });
}

observeUrlChanges();

const videoContaienr = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = document.querySelector("textarea");
const commentBtn = document.getElementById("addComment");

const addComment = (event) => {
  //preventDefault()?
  event.preventDefault();
  const video = videoContaienr.dataset.id;
  let text = textarea.value;
};

commentBtn.addEventListener("click", addComment);

const videoContaienr = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const commentBtn = form.getElementById("addComment");

const addComment = (event) => {
  //preventDefault()?
  event.preventDefault();
  const video = videoContaienr.dataset.id;
  let text = textarea.value;
};

commentBtn.addEventListener("click", addComment);

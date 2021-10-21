const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const totalTime = document.getElementById("totalTime");
const currenTime = document.getElementById("currenTime");
const timeline = document.getElementById("timeline");
const fullScreen = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
console.log(videoContainer);
//비디오 볼륨 기본값 설정
video.volume = 0.5;
let id = null;
let controls = null;

//비디오 재생시 멈추게아니면 재생
const handelPlayClick = (e) => {
  let pause = video.paused;
  if (pause) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = pause ? "Pause" : "Play";
};

const handelMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "unmute" : "mute";
  volumeRange.value = video.muted ? 0 : 0.5;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  video.volume = value;
};

//시간 관련 함수
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 9);

const handelMetaData = () => {
  const time = Math.floor(video.duration);
  timeline.max = time;
  totalTime.innerText = formatTime(time);
};

const updateTime = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handelTimeChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const hideContrtol = () => videoControls.classList.remove("showing");

const handelfullScreen = () => {
  //이게 어떤걸 return해주는 지 다시 확인해줘야할것같음 이렇게되는이유는 알겟는데 fullecreen이  null인지 아닌지가 조금 혼동옴
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreen.innerText = "FullScreen";
  } else {
    videoContainer.requestFullscreen();
    fullScreen.innerText = "Exit FullScreen";
  }
};

const handleMousemove = () => {
  if (id) {
    clearTimeout(id);
    id = null;
  }
  if (controls) {
    clearTimeout(controls);
    controls = null;
    0;
  }
  videoControls.classList.add("showing");
  //마우스가 움직일때마다 타임아웃 값을 받아줌
  controls = setTimeout(hideContrtol, 3000);
};
const handleMouseleave = () => {
  //setTimeout은 특정 값을 return해주기 때문에, 그값을 null 이었던 값에서  특정 값으로 받아준 후에, 있는경우 clear~ㅇ 로 멈춰주고id를 다시  null로 바꿔주는
  //방식으로 진행
  id = setTimeout(hideContrtol, 3000);
};

playBtn.addEventListener("click", handelPlayClick);
muteBtn.addEventListener("click", handelMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handelMetaData);
video.addEventListener("timeupdate", updateTime);
timeline.addEventListener("input", handelTimeChange);
fullScreen.addEventListener("click", handelfullScreen);
video.addEventListener("mousemove", handleMousemove);
video.addEventListener("mouseleave", handleMouseleave);

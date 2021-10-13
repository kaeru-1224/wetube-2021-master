
// 버튼--> 사용자에게 카메라 접근 권한 
const startBtn = document.getElementById("startBtn")
const previewVideo= document.getElementById("preview")
let stream;
let recorder;
let videoFile;


const fileDownload=()=>{
    const a = document.createElement("a")
    a.href=videoFile;
    a.download="MyRecording.webm"
    document.body.appendChild(a);
    a.click();

}


const handelStop=()=>{

    startBtn.innerText="Download recoridng"
    startBtn.removeEventListener('click',handelStop)
    startBtn.addEventListener('click',fileDownload)
    recorder.stop()

}
//record
const handelStart =()=>{

    startBtn.innerText="Stop recoridng"
    startBtn.removeEventListener('click',handelStart)
    startBtn.addEventListener('click',handelStop)
    recorder = new MediaRecorder(stream)
    recorder.ondataavailable=(e)=>{  
        //createObjectURL():브라우저 메모리에서만 가능한 url을 만들어줌
        //그런데 여기서 url은 브라우저내의 데이터를 가르키는 역할을 해줄뿐 
        //그자체는 아니다(일종의 파일위치 같은거?)
    videoFile = URL.createObjectURL(e.data)
    previewVideo.srcObject=null;
    previewVideo.src=videoFile
    previewVideo.play()}
  
    recorder.start();



};


const init =async()=>{
     stream = await navigator.mediaDevices.getDisplayMedia(
     {  audio:false,video:{width:300,height:300}})
     //사용자가 촬영한 비디오 스트림을 받아서, 소스 객체에 넣어줌
     previewVideo.srcObject=stream
     //srcObject?
     previewVideo.play()}

init();
startBtn.addEventListener('click',handelStart)

//녹화된 비디오 미리 볼수있게 


// 미리보기 비디오 저장(mediarecorded)
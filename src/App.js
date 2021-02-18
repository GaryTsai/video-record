import React, {Component} from 'react';
import utils from "./utils/format";
import settings from "./settings/settings";
import "./index.css";

let mediaRecorder;
let recordedBlobs = [];
var intervalID;
var times = false;
var TheStream = null;
var recordLoadingID = '';

const initialState={
  inputTimeState: false,
  inputLengthState: false,
  height: window.innerHeight,
  recordLoading: false,
};
export default class APP extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    document.addEventListener('resize', () => this.windowSize());
    this.startCheckTime();
  }

  startCheckTime = () =>{
    intervalID = window.setInterval(() => this.checkRecordTime(), 250);
  }

  windowSize = () => {
    this.setState({height:window.innerHeight})
  };

  checkRecordTime = () => {
    if (this.compareTime() && !times) {
      times = true;
      clearInterval(intervalID)
      console.log("時間到 開起相機");
      this.startButton.disabled = true;
      setTimeout(() => this.handleStartCamera(), 100);
    }
  };

  compareTime = () => {
    if(!!(this.setUpLength && this.setUpLength.value)){
      this.setState({inputLengthState:true})
    }
    if(!!(this.setUpTime && this.setUpTime.value)){
      this.setState({inputTimeState:true})
    }
    if (utils.getCurTime() === (!!this.setUpTime &&this.setUpTime.value)) {
      return true;
    } else if (utils.getCurTime() === settings.DEFAULT_RECORD_TIME) {
      return true;
    }
    return false;
  };

  handleStartCamera = () => {
    const thisRef = this;
    const constraints = {
      video: {
        width: 1280,
        height: 720
      }
    };
    this.recordButton.disabled = false;
    if (null === TheStream) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (mediaStream) {
          TheStream = mediaStream;
          thisRef.init(mediaStream);
        })
        .catch(function (err) {
          console.log("Unable to access camera: " + err);
        });
    } else {
      alert("Your browser does not support media devices.");

      return;
    }
  };

  startRecordVideo = () => {
    console.log("開始錄製");
    this.setUpTime.disabled = true;
    this.setUpLength.disabled = true;
    setTimeout(() => this.handleOpenCamera("Start Recording"), 1000);
  };

  stopCameraRedDot = () => {
    this.setUpTime.disabled = false;
    this.setUpLength.disabled = false;
    this.stopCamera.disabled = true;
    if (null != TheStream) {
      TheStream.getTracks().map((track) => track.stop());
      this.gumVideo.srcObject = null;
      TheStream = null;
      times = false;
      this.setUpTime.value = '';
      this.setUpLength.value = '';
      this.setState({inputLengthState:false, inputTimeState:false});
      this.startCheckTime();
    }
  };

  handleOpenCamera = (e) => {
    if (e === "Start Recording") {
      this.startRecording();
      this.gumVideo.style.display = 'block'
    }
    if (this.setUpLength.value !== "" && Math.sign(parseInt(this.setUpLength.value) === 1 && parseInt(this.setUpLength.value) >= 1)) {
      settings.RECORD_LENGTH = parseInt(this.setUpLength.value) * 60000;
    }
    setTimeout(() => this.stopRecording(), settings.RECORD_LENGTH);
  };

  handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  };

  handlePlayButton = (e) => {
    const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
    this.recordVideo.src = null;
    this.recordVideo.srcObject = null;
    this.recordVideo.src = window.URL.createObjectURL(superBuffer);
    this.recordVideo.controls = true;
    this.recordVideo.play();
  };

  handleDownloadButton = () => {
    const blob = new Blob(recordedBlobs, { type: "video/webm" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    this.gumVideo.style.display = 'none';
    a.style.display = "none";
    a.href = url;
    a.download = "video-record.webm";
    document.body.appendChild(a);
    a.click();
    this.downloadButton.disabled = true;
    this.playButton.disabled = true;
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  handleSuccess = async (stream) => {
    this.recordButton.disabled = false;
    window.stream = stream;
    TheStream = stream;
    this.gumVideo.srcObject = stream;
    console.log("一秒後，開始錄製 ");
    setTimeout(() => this.startRecordVideo("Start Recording"), 1000);
  };

  stopRecording = () => {
    mediaRecorder.stop();
    this.recordButton.textContent = "Start Recording";
    this.recordButton.disabled = true;
    this.playButton.disabled = false;
    this.downloadButton.disabled = false;
    console.log("關閉相機");
    clearInterval(recordLoadingID);
    setTimeout(() => this.stopCameraRedDot(), 500);
    console.log("一秒後，下載影片");
    setTimeout(() => this.handleDownloadButton(), 1000);
  };

  startRecording = () => {
    let options = { mimeType: "video/webm;codecs=vp9,opus" };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not supported`);
      options = { mimeType: "video/webm;codecs=vp8,opus" };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        options = { mimeType: "video/webm" };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error(`${options.mimeType} is not supported`);
          options = { mimeType: "" };
        }
      }
    }

    try {
      mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
      console.error("Exception while creating MediaRecorder:", e);
      return;
    }

    console.log(
      "Created MediaRecorder",
      mediaRecorder,
      "with options",
      options
    );
    this.recordButton.textContent = "Recording...";
    let thisRecordLoadingID_Ref = this.recordButton;
    recordLoadingID = setInterval(()=>{thisRecordLoadingID_Ref.disabled = !thisRecordLoadingID_Ref.disabled},250)
    this.playButton.disabled = true;
    this.downloadButton.disabled = true;
    mediaRecorder.onstop = (event) => {
      console.log("Recorder stopped: ", event);
      console.log("Recorded Blobs: ", recordedBlobs);
    };
    mediaRecorder.ondataavailable = this.handleDataAvailable;
    mediaRecorder.start();
  };

  init = async (mediaStream) => {
    const thisRef = this;
    thisRef.handleSuccess(mediaStream);
  };

  render() {
    return (
      <div style={{backgroundColor: '#ffffff'}}>
        <div style={{backgroundColor: 'darkcyan',color: '#000000', width:'50%',minWidth: '330px' ,fontSize:'32px', margin:'0px auto'}} >Video Record</div>
        <div id="container" style={{backgroundColor: '#e0e0e0',width:'50%',minWidth: '330px',height: this.state.height, margin:'0px auto'}}>
          <div style={{borderRadius:'5px', display: 'flex',border: '1px solid #2371FA' ,backgroundColor: this.state.inputTimeState ? '#87cefa' :'#b7bbbc'}}>
            <label>請選擇錄製時間(default 19:40:00): </label>
            <input type="time" id="appt" ref={(time) => (this.setUpTime = time)} name="appt" step="1" style={{verticalAlign: 'text-bottom'}}/>
            {this.state.inputTimeState && <img src={require('./images/checked.png')}  style={{padding:' 3px', width:'20px',zIndex: 100, verticalAlign: 'bottom'}} alt="Background"/>}
          </div>
          <div style={{margin:'2.5px 0px', display: 'flex' ,borderRadius:'5px',border: '1px solid #2371FA' ,backgroundColor: this.state.inputLengthState? '#87cefa' :'#b7bbbc'}}>
            <label>請選擇錄製長度(default 20min): </label>
            <input type="number" id="appt" ref={(length) => (this.setUpLength = length)} name="appt" style={{verticalAlign: 'text-bottom'}} step="1" min="1"/>
            {this.state.inputLengthState && <img src={require('./images/checked.png')} style={{padding:' 3px', width:'20px', zIndex: 100, verticalAlign: 'bottom'}} alt="Background"/>}
          </div>
          <video id="gum" ref={(gum) => (this.gumVideo = gum)} autoPlay={true} muted download={"video-record"} style={{ transform: 'scaleX(-1)',display: "none", width:'50%', margin:'0 auto' }}/>
          <video id="recorded" ref={(record) => (this.recordVideo = record)} style={{ display: "none", width:'50%', margin:'0 auto' }}/>
          <div>
            <button id="start" ref={(start) => (this.startButton = start)} disabled>Start camera</button>
            <button id="record" ref={(button) => (this.recordButton = button)} disabled>
              Start Recording
            </button>
            <button id="play" ref={(play) => (this.playButton = play)} disabled>Play</button>
            <button id="download" ref={(download) => (this.downloadButton = download)} disabled>Download</button>
            <button id="stop" ref={(stop) => (this.stopCamera = stop)} onClick={this.stopCamera} disabled>Stop Camera</button>
          </div>
          <div>
            <span id="errorMsg" ref={(error) => (this.errorMsgElement = error)}/>
          </div>
        </div>
      </div>
    );
  }
}

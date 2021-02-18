(this["webpackJsonpvideo-record"]=this["webpackJsonpvideo-record"]||[]).push([[0],{12:function(e,t,n){e.exports=n(18)},18:function(e,t,n){"use strict";n.r(t);var r,o,i=n(0),a=n.n(i),d=n(7),c=n.n(d),s=(n(5),n(2)),u=n.n(s),l=n(3),g=n(8),m=n(9),p=n(1),C=n(11),b=n(10),v={getCurTime:function(){var e=new Date;return v.fillZero(e.getHours())+":"+v.fillZero(e.getMinutes())+":"+v.fillZero(e.getSeconds())},fillZero:function(e){return e<=9?"0"+e:e}},E=v,f={RECORD_LENGTH:12e5,DEFAULT_RECORD_TIME:"19:40:00"},h=[],B=!1,A=null,I="",w={inputTimeState:!1,inputLengthState:!1,height:window.innerHeight,recordLoading:!1},Q=function(e){Object(C.a)(i,e);var t=Object(b.a)(i);function i(e){var n;return Object(g.a)(this,i),(n=t.call(this,e)).startCheckTime=function(){o=window.setInterval((function(){return n.checkRecordTime()}),250)},n.windowSize=function(){n.setState({height:window.innerHeight})},n.checkRecordTime=function(){console.log("39"),n.compareTime()&&!B&&(B=!0,clearInterval(o),console.log("\u6642\u9593\u5230 \u958b\u8d77\u76f8\u6a5f"),n.startButton.disabled=!0,setTimeout((function(){return n.handleStartCamera()}),100))},n.compareTime=function(){return n.setUpLength&&n.setUpLength.value&&n.setState({inputLengthState:!0}),n.setUpTime&&n.setUpTime.value&&n.setState({inputTimeState:!0}),E.getCurTime()===(!!n.setUpTime&&n.setUpTime.value)||E.getCurTime()===f.DEFAULT_RECORD_TIME},n.handleStartCamera=function(){var e=Object(p.a)(n);n.recordButton.disabled=!1,null===A?navigator.mediaDevices.getUserMedia({video:{width:1280,height:720}}).then((function(t){A=t,e.init(t)})).catch((function(e){console.log("Unable to access camera: "+e)})):alert("Your browser does not support media devices.")},n.startRecordVideo=function(){console.log("\u958b\u59cb\u9304\u88fd"),n.setUpTime.disabled=!0,n.setUpLength.disabled=!0,setTimeout((function(){return n.handleOpenCamera("Start Recording")}),1e3)},n.stopCameraRedDot=function(){n.setUpTime.disabled=!1,n.setUpLength.disabled=!1,n.stopCamera.disabled=!0,null!=A&&(A.getTracks().map((function(e){return e.stop()})),n.gumVideo.srcObject=null,A=null,B=!1,n.setUpTime.value="",n.setUpLength.value="",n.setState({inputLengthState:!1,inputTimeState:!1}),n.startCheckTime())},n.handleOpenCamera=function(e){"Start Recording"===e&&(n.startRecording(),n.gumVideo.style.display="block"),""!==n.setUpLength.value&&Math.sign(1===parseInt(n.setUpLength.value)&&parseInt(n.setUpLength.value)>=1)&&(f.RECORD_LENGTH=6e4*parseInt(n.setUpLength.value)),setTimeout((function(){return n.stopRecording()}),f.RECORD_LENGTH)},n.handleDataAvailable=function(e){e.data&&e.data.size>0&&h.push(e.data)},n.handlePlayButton=function(e){var t=new Blob(h,{type:"video/webm"});n.recordVideo.src=null,n.recordVideo.srcObject=null,n.recordVideo.src=window.URL.createObjectURL(t),n.recordVideo.controls=!0,n.recordVideo.play()},n.handleDownloadButton=function(){var e=new Blob(h,{type:"video/webm"}),t=window.URL.createObjectURL(e),r=document.createElement("a");n.gumVideo.style.display="none",r.style.display="none",r.href=t,r.download="video-record.webm",document.body.appendChild(r),r.click(),n.downloadButton.disabled=!0,n.playButton.disabled=!0,setTimeout((function(){document.body.removeChild(r),window.URL.revokeObjectURL(t)}),100)},n.handleSuccess=function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.recordButton.disabled=!1,window.stream=t,A=t,n.gumVideo.srcObject=t,console.log("\u4e00\u79d2\u5f8c\uff0c\u958b\u59cb\u9304\u88fd "),setTimeout((function(){return n.startRecordVideo("Start Recording")}),1e3);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.stopRecording=function(){r.stop(),n.recordButton.textContent="Start Recording",n.recordButton.disabled=!0,n.playButton.disabled=!1,n.downloadButton.disabled=!1,console.log("\u95dc\u9589\u76f8\u6a5f"),clearInterval(I),setTimeout((function(){return n.stopCameraRedDot()}),500),console.log("\u4e00\u79d2\u5f8c\uff0c\u4e0b\u8f09\u5f71\u7247"),setTimeout((function(){return n.handleDownloadButton()}),1e3)},n.startRecording=function(){var e={mimeType:"video/webm;codecs=vp9,opus"};MediaRecorder.isTypeSupported(e.mimeType)||(console.error("".concat(e.mimeType," is not supported")),e={mimeType:"video/webm;codecs=vp8,opus"},MediaRecorder.isTypeSupported(e.mimeType)||(console.error("".concat(e.mimeType," is not supported")),e={mimeType:"video/webm"},MediaRecorder.isTypeSupported(e.mimeType)||(console.error("".concat(e.mimeType," is not supported")),e={mimeType:""})));try{r=new MediaRecorder(window.stream,e)}catch(o){return void console.error("Exception while creating MediaRecorder:",o)}console.log("Created MediaRecorder",r,"with options",e),n.recordButton.textContent="Recording...";var t=n.recordButton;I=setInterval((function(){t.disabled=!t.disabled}),250),n.playButton.disabled=!0,n.downloadButton.disabled=!0,r.onstop=function(e){console.log("Recorder stopped: ",e),console.log("Recorded Blobs: ",h)},r.ondataavailable=n.handleDataAvailable,r.start()},n.init=function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(p.a)(n).handleSuccess(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state=w,n}return Object(m.a)(i,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("resize",(function(){return e.windowSize()})),this.startCheckTime()}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{style:{backgroundColor:"#ffffff"}},a.a.createElement("div",{style:{backgroundColor:"darkcyan",color:"#000000",width:"50%",minWidth:"330px",fontSize:"32px",margin:"0px auto"}},"Video Record"),a.a.createElement("div",{id:"container",style:{backgroundColor:"#e0e0e0",width:"50%",minWidth:"330px",height:this.state.height,margin:"0px auto"}},a.a.createElement("div",{style:{borderRadius:"5px",display:"flex",border:"1px solid #2371FA",backgroundColor:this.state.inputTimeState?"#87cefa":"#b7bbbc"}},a.a.createElement("label",null,"\u8acb\u9078\u64c7\u9304\u88fd\u6642\u9593(default 19:40:00): "),a.a.createElement("input",{type:"time",id:"appt",ref:function(t){return e.setUpTime=t},name:"appt",step:"1",style:{verticalAlign:"text-bottom"}}),this.state.inputTimeState&&a.a.createElement("img",{src:n(6),style:{padding:" 3px",width:"20px",zIndex:100,verticalAlign:"bottom"},alt:"Background"})),a.a.createElement("div",{style:{margin:"2.5px 0px",display:"flex",borderRadius:"5px",border:"1px solid #2371FA",backgroundColor:this.state.inputLengthState?"#87cefa":"#b7bbbc"}},a.a.createElement("label",null,"\u8acb\u9078\u64c7\u9304\u88fd\u9577\u5ea6(default 20min): "),a.a.createElement("input",{type:"number",id:"appt",ref:function(t){return e.setUpLength=t},name:"appt",style:{verticalAlign:"text-bottom"},step:"1",min:"1"}),this.state.inputLengthState&&a.a.createElement("img",{src:n(6),style:{padding:" 3px",width:"20px",zIndex:100,verticalAlign:"bottom"},alt:"Background"})),a.a.createElement("video",{id:"gum",ref:function(t){return e.gumVideo=t},autoPlay:!0,muted:!0,download:"video-record",style:{transform:"scaleX(-1)",display:"none",width:"50%",margin:"0 auto"}}),a.a.createElement("video",{id:"recorded",ref:function(t){return e.recordVideo=t},style:{display:"none",width:"50%",margin:"0 auto"}}),a.a.createElement("div",null,a.a.createElement("button",{id:"start",ref:function(t){return e.startButton=t},disabled:!0},"Start camera"),a.a.createElement("button",{id:"record",ref:function(t){return e.recordButton=t},disabled:!0},"Start Recording"),a.a.createElement("button",{id:"play",ref:function(t){return e.playButton=t},disabled:!0},"Play"),a.a.createElement("button",{id:"download",ref:function(t){return e.downloadButton=t},disabled:!0},"Download"),a.a.createElement("button",{id:"stop",ref:function(t){return e.stopCamera=t},onClick:this.stopCamera,disabled:!0},"Stop Camera")),a.a.createElement("div",null,a.a.createElement("span",{id:"errorMsg",ref:function(t){return e.errorMsgElement=t}}))))}}]),i}(a.a.Component),y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),r(e),o(e),i(e),a(e)}))};c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(Q,null)),document.getElementById("root")),y()},5:function(e,t,n){},6:function(e,t){e.exports="data:image/png;base64,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"}},[[12,1,2]]]);
//# sourceMappingURL=main.8bf288c2.chunk.js.map
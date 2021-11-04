import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

@Component({
  selector: 'app-pose-detection',
  templateUrl: './pose-detection.component.html',
  styleUrls: ['./pose-detection.component.scss']
})
export class PoseDetectionComponent implements OnInit, AfterViewInit {
  WIDTH = 640;
  HEIGHT = 480;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  ctx: any;
  captures: string[] = [];
  error: any;
  isCaptured: boolean = true;
  isLoadedData: boolean = false;
  isReady: boolean = false;

  detector: any;
  model: any;

  constructor() { }

  ngOnInit(): void {
  }

  async ngAfterViewInit(){
    await this.setDetector().then(r =>
      this.setupDevices()
    )
  }

  async setupDevices(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      try{
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        if(stream){
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "no video device"

        }
      }catch (e){
        this.error = e
      }
    }

  }

  // モデルの読み込み
  async setDetector(){
    this.model = poseDetection.SupportedModels.PoseNet;
    // MobileNet (smaller, faster, less accurate)
    // const detectorConfig: poseDetection.PosenetModelConfig = {
    //   architecture: 'MobileNetV1',
    //   outputStride: 16,
    //   inputResolution: { width: 640, height: 480 },
    //   multiplier: 0.75
    // };

    // ResNet (larger, slower, more accurate) **new!**
    const detectorConfig: poseDetection.PosenetModelConfig = {
      architecture: 'ResNet50',
      outputStride: 16,
      inputResolution: { width: 257, height: 200 },
      // multiplier: 0.75,
      quantBytes: 2
    };
    // ポーズ検出器の生成
    this.detector = await poseDetection.createDetector(this.model, detectorConfig);
  }

  async drawCtx() {
    this.canvas.nativeElement.getContext("2d").drawImage(
        this.video.nativeElement, 0, 0, this.WIDTH, this.HEIGHT);
  }

  async clearCtx() {
    this.canvas.nativeElement.getContext("2d").clearRect(0, 0, this.WIDTH, this.HEIGHT);
  }


  async onLoadedData(){
    this.isLoadedData = true;
    await this.detectPose()

  }

  async detectPose(){
    if (this.video.nativeElement){
      const pose = await this.detector.estimatePoses(this.video.nativeElement)

      await this.drawCtx()
      if(pose) await this.drawResult(pose[0])

      const rafId =  requestAnimationFrame(this.detectPose.bind(this));
    }
  }

    /**
   * Draw the keypoints and skeleton on the video.
   * @param pose A pose with keypoints to render.
   */
  async drawResult(pose:any) {
    console.log('res')
    if (pose.keypoints != null) {
      this.drawKeypoints(pose.keypoints);

    }
  }

    /**
   * Draw the keypoints on the video.
   * @param keypoints A list of keypoints.
   */
     drawKeypoints(keypoints: any) {
      const keypointInd =
          poseDetection.util.getKeypointIndexBySide(this.model);
      this.canvas.nativeElement.getContext("2d").fillStyle = 'Red';
      this.canvas.nativeElement.getContext("2d").strokeStyle = 'White';
      this.canvas.nativeElement.getContext("2d").lineWidth = 2;

      for (const i of keypointInd.middle) {
        this.drawKeypoint(keypoints[i]);
      }

      this.canvas.nativeElement.getContext("2d").fillStyle = 'Green';
      for (const i of keypointInd.left) {
        this.drawKeypoint(keypoints[i]);
      }

      this.canvas.nativeElement.getContext("2d").fillStyle = 'Orange';
      for (const i of keypointInd.right) {
        this.drawKeypoint(keypoints[i]);
      }
    }

  drawKeypoint(keypoint:any) {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    // const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;
    const scoreThreshold = 0.1;

    if (score >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(keypoint.x, keypoint.y, 10, 0, 2 * Math.PI);
      this.canvas.nativeElement.getContext("2d").fill(circle);
      this.canvas.nativeElement.getContext("2d").stroke(circle);
    }
  }

}

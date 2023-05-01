import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  public isReady = false;
  private ffmpeg;

  constructor() {
    this.ffmpeg = createFFmpeg({ log: true });
  }

  async init() {
    if (this.isReady) {
      return;
    }
    await this.ffmpeg.load();
    this.isReady = true;
  }

  async getScreenshots(file: File) {
    const data = await fetchFile(file);
    this.ffmpeg.FS('writeFile', file.name, data);
    await this.ffmpeg.run(
      // Input
      '-i',
      file.name, //grab the file name from the file system
      // Output options
      '-ss',
      '00:00:01', //change the current timestamp
      '-frames:v',
      '1', //grab one frame
      '-filter:v',
      'scale=510:-1', //rescale the screenshot. need filter flag
      // Output
      'output_01.png' //output file
    );
  }
}

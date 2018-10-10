export const hadrEmmisiveWorker = () => {
  // You can't push Uint8Array, so i made a class to do that
  class ByteData {
    constructor(size) {
      this.binaryData = new Uint8Array(size);
      this._cIndex = 0;
      this.push = this.push.bind(this);
    }
    push(...bytes) {
      for (var i = 0; i < arguments.length; i++) {
        this.binaryData[this._cIndex] = arguments[i];
        this._cIndex++;
      }
    }
  }
  self.addEventListener('message', event => {
    const width = event.data.width;
    const height = event.data.height;
    const rgbeBuffer = event.data.rgbeBuffer;
    const fromBottom = event.data.fromBottom;
    // pixel data starts at lower left corner, but we are writing hdr from upper left one,
    // this function gives me upper left pixel row based on y, where y = 0 -> top row 
    const topIndex = y => fromBottom ?
      (width * height * 4) - (width * 4) - (width * y * 4)
      : width * y * 4;
    // calculates repetitions in line for given channel
    const getLine = (y = 0, channel = 0) => {
      const array = [];
      let localVal = 0, localLength = 0;
      const lengthConstant = 128;
      for (var i = 0; i < width * 4; i += 4) {
        if (localLength === 0) {
          localVal = rgbeBuffer[topIndex(y) + i + channel];
          localLength++;
        } else if (localVal === rgbeBuffer[topIndex(y) + i + channel] && localLength < 127) {
          localLength++;
        } else {
          array.push({ value: localVal, length: localLength + lengthConstant });
          localVal = rgbeBuffer[topIndex(y) + i + channel];
          localLength = 1;
        }
      }
      array.push({ value: localVal, length: localLength + lengthConstant });
      return array;
    }

    const compressed = [];
    let fileSize = 0;
    for (var i = 0; i < height; i++) {
      const lineReds = getLine(i, 0);
      const lineGreens = getLine(i, 1);
      const lineBlues = getLine(i, 2);
      const lineEmissive = getLine(i, 3);
      const lineInitiator = 4;
      // multiplied channels by 2, because they contain value and length if that value
      fileSize += lineInitiator + lineReds.length * 2 + lineGreens.length * 2 + lineBlues.length * 2 + lineEmissive.length * 2;
      compressed.push([lineReds, lineGreens, lineBlues, lineEmissive]);
    }
    console.log(`Worker, hdr file size = ${(fileSize / 1024).toFixed(2)}kb`);
    const lineSize = new Uint8Array(new Uint16Array([width]).buffer);
    const byteData = new ByteData(fileSize);

    for (var i = 0; i < height; i++) {
      // Each line starts the same
      byteData.push(2, 2, lineSize[1], lineSize[0]);//line iniciators // no idea why but linesize is flipped
      for (var k = 0; k < 4; k++) {
        compressed[i][k].map(channel => { byteData.push(channel.length, channel.value); })
      }
    }
    self.postMessage({ binary: byteData.binaryData });
  });
}
const fs = require('fs/promises');
const { startStream, endStream, closeLostStreams } = require('./model');

async function getStreamPathName(currStream) {
  const mfs = (str, length) => `00000000${str}`.slice(-length);
  const kuk = [];
  kuk.push(mfs(currStream.start.getFullYear(), 4));
  kuk.push(mfs(currStream.start.getMonth() + 1, 2));
  kuk.push(mfs(currStream.start.getDate(), 2));
  kuk.push(mfs(currStream.start.getHours(), 2));
  kuk.push(mfs(currStream.start.getMinutes(), 2));
  kuk.push(mfs(currStream.start.getSeconds(), 2));

  let filePath = `./streams/media/live/${currStream.stream_key}/${kuk.join(
    '-',
  )}.mp4`;
  try {
    await fs.stat(filePath);
  } catch (err) {
    filePath = null;
  }
  return filePath;
}

class ActiveStreams {
  constructor(streams = new Map()) {
    this.streams = streams;
  }

  async startStream(broadcastId, stream) {
    try {
      if (!this.streams.size) {
        await closeLostStreams(getStreamPathName);
      }
      const updatedStream = await startStream(broadcastId, stream);
      this.streams.set(broadcastId, updatedStream);
    } catch (err) {
      console.error(err);
    }
  }

  async endStream(broadcastId) {
    let filePath;
    const currStream = this.streams.get(broadcastId);
    if (currStream) {
      this.streams.delete(broadcastId);
      filePath = await getStreamPathName(currStream);
    }
    try {
      endStream(broadcastId, filePath);
      if (!this.streams.size) {
        await closeLostStreams(getStreamPathName);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ActiveStreams;

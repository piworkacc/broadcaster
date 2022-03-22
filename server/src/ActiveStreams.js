const fs = require('fs');
const path = require('path');
const { startStream, endStream, closeLostStreams } = require('./model');

async function getStreamPathName(currStream) {
  if (!currStream.start) {
    return null;
  }
  const mfs = (str, length) => `00000000${str}`.slice(-length);
  const { start } = currStream;

  const times = [-1, 0, 1].map((el) => {
    const res = new Date(start);
    res.setSeconds(res.getSeconds() + el);
    return res;
  });

  const paths = times.map((el) => {
    const kuk = [];
    kuk.push(mfs(el.getFullYear(), 4));
    kuk.push(mfs(el.getMonth() + 1, 2));
    kuk.push(mfs(el.getDate(), 2));
    kuk.push(mfs(el.getHours(), 2));
    kuk.push(mfs(el.getMinutes(), 2));
    kuk.push(mfs(el.getSeconds(), 2));

    return path.join(
      process.env.PWD,
      'streams',
      'media',
      'live',
      currStream.stream_key,
      `${kuk.join('-')}.mp4`,
    );
  });
  const prms = paths.map(
    (el) =>
      new Promise((resolve) => {
        fs.stat(el, (err) => {
          if (err) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }),
  );
  const res = await Promise.allSettled(prms);
  const ind = res.findIndex((el) => el.value);

  if (ind >= 0) {
    return paths[ind];
  }
  return null;
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

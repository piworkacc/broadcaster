const {
  startStream,
  endStream,
  closeLostStreams,
  getAllUserStreams,
} = require('./model');

class ActiveStreams {
  constructor(streams = new Map()) {
    this.streams = streams;
  }

  async startStream(broadcastId, user) {
    try {
      if (!this.streams.size) {
        await closeLostStreams();
      }
      const newStream = await startStream(user, broadcastId);
      this.streams.set(broadcastId, {
        user,
        start: newStream.start,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async endStream(broadcastId) {
    let filePath;
    const currStream = this.streams.get(broadcastId);
    if (currStream) {
      this.streams.delete(broadcastId);
      const mfs = (str, length) => `00000000${str}`.slice(-length);
      const kuk = [];
      kuk.push(mfs(currStream.start.getFullYear(), 4));
      kuk.push(mfs(currStream.start.getMonth() + 1, 2));
      kuk.push(mfs(currStream.start.getDate(), 2));
      kuk.push(mfs(currStream.start.getHours(), 2));
      kuk.push(mfs(currStream.start.getMinutes(), 2));
      kuk.push(mfs(currStream.start.getSeconds(), 2));

      filePath = `./streams/media/live/${currStream.user.streamKey}/${kuk.join(
        '-',
      )}.mp4`;
    }
    try {
      endStream(broadcastId, filePath);
      if (!this.streams.size) {
        await closeLostStreams();
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ActiveStreams;

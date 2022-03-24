require('dotenv').config();

const ffmpegPath = process.env.FFMPEG_PATH;
const config = {
  server: {
    secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
  },
  logType: 3,
  rtmp_server: {
    rtmp: {
      port: 1935,
      chunk_size: 65536,
      gop_cache: false,
      ping: 60,
      ping_timeout: 30,
    },
    http: {
      port: 8000,
      mediaroot: './streams/media',
      allow_origin: '*',
    },
    trans: {
      ffmpeg: ffmpegPath || '/usr/bin/ffmpeg',
      tasks: [
        {
          app: 'live',
          mp4: true,
          mp4Flags: '[movflags=frag_keyframe+empty_moov]',
        },
        {
          app: 'live',
          ac: 'aac',
          acParam: ['-ab', '64k', '-ac', '1', '-ar', '44100'],
          vcParam: [
            '-c:v',
            'libx264',
            '-vf',
            '-b:v',
            '2800k',
            '-bufsize',
            '4200k',
            '-preset',
            'fast',
          ],
          mp4: true,
          mp4Flags: '[movflags=faststart]',
        },
      ],
    },
  },
};

module.exports = config;

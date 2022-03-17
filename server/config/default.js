const config = {
  server: {
    secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
  },
  logType: 3,
  rtmp_server: {
    rtmp: {
      port: 1935,
      chunk_size: 500,
      gop_cache: false,
      ping: 60,
      ping_timeout: 30,
    },
    http: {
      port: 8000,
      mediaroot: './server/media',
      allow_origin: '*',
    },
    trans: {
      ffmpeg: '/usr/bin/ffmpeg',
      //   tasks: [
      //     {
      //       app: 'live',
      //       vcParam: [
      //         '-c:v',
      //         'libx264',
      //         '-vf',
      //         '-b:v',
      //         '2800k',
      //         '-bufsize',
      //         '4200k',
      //         '-preset',
      //         'fast',
      //       ],
      //       ac: 'aac',
      //       acParam: ['-b:a', '128k', '-ar', 48000],
      //       mp4: true,
      //       mp4Flags: '[movflags=faststart]',
      //     },
      //   ],
    },
  },
};

module.exports = config;

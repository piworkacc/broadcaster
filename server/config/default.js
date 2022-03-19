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
      ffmpeg: ffmpegPath || '/usr/bin/ffmpeg',
      tasks: [
        {
          app: 'live',
          vc: 'copy',
          vcParam: [],
          ac: 'aac',
          acParam: ['-ab', '64k', '-ac', '1', '-ar', '44100'],
          rtmp: true,
          rtmpApp: 'live2',
          hls: true,
          hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
          dash: true,
          dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
        },
        {
          app: 'live',
          mp4: true,
          mp4Flags: '[movflags=frag_keyframe+empty_moov]',
        },
      ], // tasks: [
      //   {
      //     app: 'live',
      //     hls: true,
      //     hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
      //     dash: true,
      //     dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
      //   },
      // ],
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

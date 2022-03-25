const { randomString, randomArrayElement } = require('../../src/miscellaneous');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'select * from "Users"',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    const seedingData = [
      {
        title: '10 часов смотрим в стену челлендж',
        preview: 'https://avatarko.ru/img/kartinka/2/zhivotnye_kot_1902.jpg',
        path: 'https://www.youtube.com/watch?v=HUgMWJKn2YY',
      },
      {
        title: 'едим картоху',
        preview:
          'https://www.restoran.ru/upload/resize_cache/editor/151/870_580_01a88371ca9e7ba72ce6f5767ba9eff1a/mg_54723b6.webp',
        path: 'https://www.youtube.com/watch?v=Pj8qAG_d324',
      },
      {
        title: 'душный кс',
        preview:
          'https://img.championat.com/news/big/y/f/v-cs-go-startovala-novaya-operaciya-riptide-chto-novogo_16322983754024851.jpg',
        path: 'https://www.youtube.com/watch?v=O8KkJvpz2xc',
      },
      {
        title: 'воскресная дотка',
        preview:
          'https://static.mvideo.ru/media/Promotions/Promo_Page/2020/November/obzor-dota-2-shahmaty-sovremennogo-mira/obzor-dota-2-shahmaty-sovremennogo-mira-top1-m-2.png',
        path: 'https://www.youtube.com/watch?v=ryEUr-q9kU0',
      },
      {
        title: 'нюхаю ковёр на камеру',
        preview:
          'https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/1/16/756110001262161.jpg',
        path: 'https://www.youtube.com/watch?v=LbpfuITq80I',
      },
      {
        title: 'разматываю мобов в GOW',
        preview:
          'https://img.championat.com/s/735x490/news/big/o/n/fanaty-god-of-war-predstavili-kak-by-igra-vyglyadela-na-ps1_16393249931843342024.jpg',
        path: 'https://www.youtube.com/watch?v=EE-4GvjKcfs',
      },
      {
        title: 'готовим пирожки с капусткой',
        preview: 'https://25.img.avito.st/640x480/9504165325.jpg',
        path: 'https://www.youtube.com/watch?v=bkjzC5tORJU',
      },
      {
        title: 'PGL Major Stockholm 2021',
        preview:
          'https://img.championat.com/c/1350x759/news/big/y/z/eto-kak-the-international-no-po-cs-go-priblizhaetsya-pgl-major-stockholm-2021_1634914896353367573.jpg',
        path: 'https://www.youtube.com/watch?v=dcov59mpYbQ',
      },
      {
        title: 'Dota 2 ONE Esports Singapore Major 2021',
        preview: 'https://pic.sport.ua/images/news/0/13/54/orig_530944.jpg',
        path: 'https://www.youtube.com/watch?v=mMmyH_YjpJ8',
      },
      {
        title: 'Ежиный беспредел',
        preview:
          'https://100-faktov.ru/wp-content/uploads/2017/04/a181675572f8a180085a.jpg',
        path: 'https://www.youtube.com/watch?v=2_GcdUPLjfM',
      },
      {
        title: 'Чилим с чатом',
        preview:
          'https://slovzapas.net/images/d45724ab13466f164a2e42ab1f23865a.jpg',
        path: 'https://www.youtube.com/watch?v=YaeNcvt4g6U',
      },
      {
        title: 'ароматы микрофона',
        preview:
          'https://avatars.mds.yandex.net/get-zen_doc/125920/pub_5bf439dfba19d900aa1802f6_5bf5e7f8d238aa00aac52dec/scale_1200',
        path: 'https://www.youtube.com/watch?v=91cBBI6eejM',
      },
      {
        title: 'АСМР',
        preview:
          'https://i0.wp.com/un-sci.com/wp-content/uploads/2019/05/00002-lekarstvo-ot-zhizni-ili-pilyulya-neo-nauki.jpg?fit=1280%2C720&ssl=1',
        path: 'https://www.youtube.com/watch?v=ux4j8tBED7c',
      },
      {
        title: 'А чего бы не поесть',
        preview:
          'https://www.gastronom.ru/binfiles/images/20200320/b2c62606.jpg',
        path: 'https://www.youtube.com/watch?v=RKDeR61NoEI',
      },
      {
        title: 'обзор на новую машину',
        preview:
          'https://content.onliner.by/news/2016/05/original_size/1e887f3785ab1226f21e013079a73672.jpg',
        path: 'https://www.youtube.com/watch?v=yOzONh0bGxM',
      },
      {
        title: 'разваливаем челядь в GTA',
        preview:
          'https://www.digiseller.ru/preview/664298/p1_2865221_4d0d2de7.jpg',
        path: 'https://www.youtube.com/watch?v=pK-t9fozT8E',
      },
      {
        title: 'математика для самых маленьких',
        preview:
          'https://www.sechenov.ru/upload/medialibrary/7af/foto-matematika.jpeg',
        path: 'https://www.youtube.com/watch?v=EYsr0DZWMCg',
      },
      {
        title: 'поясняю за политику',
        preview:
          'https://cdn5.vedomosti.ru/crop/image/2018/3m/1eqwc4/original-1tro.jpg?height=609&width=1082',
        path: 'https://www.youtube.com/watch?v=7kD0x4YYAmw',
      },
      {
        title: 'league of legends',
        preview: 'https://cdn.shazoo.ru/c1400x625/165852_OMi5hc4hvb_lol.jpg',
        path: 'https://www.youtube.com/watch?v=tEnsqpThaFg',
      },
      {
        title: 'dark souls',
        preview:
          'https://3dnews.ru/assets/external/illustrations/2016/05/11/932735/dark%20souls%203%2002.jpg',
        path: 'https://www.youtube.com/watch?v=o1780AqAa20',
      },
      {
        title: 'sekiro',
        preview:
          'https://cdn.igromania.ru/mnt/games/5/7/3/c/9/7/30825/05fd663550a00be3_1200xH.jpg',
        path: 'https://www.youtube.com/watch?v=rXMX4YJ7Lks',
      },
      {
        title: 'ghost of tsushima',
        preview:
          'https://hb.bizmrg.com/cybersportru-media/28/28dfdfbfd8c8b0fcf24d4aec79a7f371.jpg',
        path: 'https://www.youtube.com/watch?v=MUz539AeC5Y',
      },
      {
        title: 'ghost runner',
        preview:
          'https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_GhostrunnerNeonPack_OneMoreLevel3DRealms_DLC_S1_2560x1440-ccf75491dc97a803241541bce020baec',
        path: 'https://www.youtube.com/watch?v=Vt8yOLn8vmo',
      },
      {
        title: 'cyberpunk 2077',
        preview:
          'https://itndaily.ru/wp-content/uploads/2021/10/1609169448-41-411308-cyberpunk-girl-sci-fi-4k-cyberpunk-2077-wallpaper.jpg',
        path: 'https://www.youtube.com/watch?v=qIcTM8WXFjk',
      },
      {
        title: 'monster hunter',
        preview:
          'https://cdn.akamai.steamstatic.com/steam/apps/582010/capsule_616x353.jpg?t=1644281885',
        path: 'https://www.youtube.com/watch?v=3od-kQMTZ9M',
      },
      {
        title: 'horizon zero dawn',
        preview:
          'https://cdn.igromania.ru/mnt/news/8/9/2/a/0/1/111594/cb214632cae86c63_1920xH.jpg',
        path: 'https://www.youtube.com/watch?v=u4-FCsiF5x4',
      },
      {
        title: 'пятничный разнос',
        preview:
          'https://i05.fotocdn.net/s122/5f72a1f23f1f2116/public_pin_l/2783716645.jpg',
        path: 'https://www.youtube.com/watch?v=5tPHqdJRElE',
      },
    ];

    await queryInterface.bulkInsert(
      'Streams',
      seedingData.map((el) => ({
        ...el,
        user_id: randomArrayElement(users).id,
        start: new Date(),
        end: new Date(),
        stream_key: randomString() + randomString(),
        broadcast_id: randomString().toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Streams', null, {});
  },
};

import _0x491038 from "axios";
let handler = async (_0x1c0815, {
  conn: _0x476ac1,
  text: _0xd7f520,
  args: _0x579e32,
  command: _0x14f58f,
  usedPrefix: _0x514cbd
}) => {
  let _0x18be6a = _0x579e32[0];
  if (!_0x18be6a) {
    await _0x476ac1.sendMessage(_0x1c0815.chat, {
      text: "[!] *تحميل الفيديوهات من المنصات الاربع : اليوتوب و الفيسبوك و الانستغرام و التيكتوك*\nنكتب الامر ثم نتبعه رابط الفيديو من المنصة التي تريد اختيار التحميل منها مثال :\n\n " + (_0x514cbd + _0x14f58f) + " https://www.facebook.com/100063533185520/videos/1177527700278287"
    }, {
      quoted: _0x1c0815
    });
    return;
  }
  let _0x8baaa3;
  if (_0x18be6a.includes("youtube.com")) {
    _0x8baaa3 = "YT";
  } else if (_0x18be6a.includes("vt.tiktok.com")) {
    _0x8baaa3 = "TT";
  } else if (_0x18be6a.includes("instagram.com")) {
    _0x8baaa3 = "IG";
  } else if (_0x18be6a.includes("facebook.com")) {
    _0x8baaa3 = "FB";
  } else {
    return;
  }
  try {
    let _0x45c32c = await _0x491038.get("https://vkrdownloader.vercel.app/server?vkr=" + _0x18be6a);
    let _0x2ec902 = _0x45c32c.data.data;
    let _0x31ad21 = "Title: " + _0x2ec902.title + "\nSource: " + _0x2ec902.source;
    const _0x30288b = {
      text: "Please wait...\nType " + _0x8baaa3
    };
    await _0x476ac1.sendMessage(_0x1c0815.chat, _0x30288b, {
      quoted: _0x1c0815
    });
    let _0x4b10f6 = _0x2ec902.downloads.map(_0x47cf7b => _0x47cf7b.url);
    for (let _0x124546 of _0x4b10f6) {
      const _0x3dbaa9 = {
        url: _0x124546
      };
      const _0x34b8a3 = {
        video: _0x3dbaa9,
        caption: _0x2ec902.title
      };
      await _0x476ac1.sendMessage(_0x1c0815.chat, _0x34b8a3, {
        quoted: _0x1c0815
      });
    }
  } catch (_0x55afa4) {
    console.error(_0x55afa4);
  }
};
handler.all = async (m) => { handler(m, { text: m.text, conn: m.conn });
};

export default handler;

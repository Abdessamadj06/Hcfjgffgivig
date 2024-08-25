import axios from "axios";

let handler = async (_0x1c0815, { conn, text }) => {
  let url = text;
  if (!url) {
    await conn.sendMessage(_0x1c0815.chat, {
      text: "[!] *تحميل الفيديوهات من المنصات الأربع: يوتيوب، فيسبوك، إنستغرام، تيكتوك*\nأرسل رابط الفيديو مباشرةً من المنصة التي تريد التحميل منها."
    }, {
      quoted: _0x1c0815
    });
    return;
  }

  let platform;
  if (url.includes("youtube.com")) {
    platform = "YT";
  } else if (url.includes("vt.tiktok.com")) {
    platform = "TT";
  } else if (url.includes("instagram.com")) {
    platform = "IG";
  } else if (url.includes("facebook.com")) {
    platform = "FB";
  } else {
    await conn.sendMessage(_0x1c0815.chat, {
      text: "[!] الرابط غير مدعوم."
    }, {
      quoted: _0x1c0815
    });
    return;
  }

  try {
    let response = await axios.get(`https://vkrdownloader.vercel.app/server?vkr=${url}`);
    let videoData = response.data.data;

    await conn.sendMessage(_0x1c0815.chat, {
      text: "Please wait...\nType " + platform
    }, {
      quoted: _0x1c0815
    });

    for (let download of videoData.downloads) {
      await conn.sendMessage(_0x1c0815.chat, {
        video: { url: download.url },
        caption: videoData.title
      }, {
        quoted: _0x1c0815
      });
    }
  } catch (error) {
    console.error(error);
    await conn.sendMessage(_0x1c0815.chat, {
      text: "[!] حدث خطأ أثناء تحميل الفيديو."
    }, {
      quoted: _0x1c0815
    });
  }
};

handler.all = async (m) => { handler(m, { text: m.text, conn: m.conn }); };

export default handler;

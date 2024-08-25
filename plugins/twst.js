import axios from "axios";

let handler = async (message, { conn, text, args, command, usedPrefix }) => {
  const videoUrl = args[0];
  
  if (!videoUrl) {
    await conn.sendMessage(message.chat, {
      text: `[!] *تحميل الفيديوهات من المنصات الاربع : اليوتوب و الفيسبوك و الانستغرام و التيكتوك*\n` +
            `نكتب الامر ثم نتبعه رابط الفيديو من المنصة التي تريد اختيار التحميل منها مثال :\n\n` +
            `${usedPrefix}${command} https://www.facebook.com/100063533185520/videos/1177527700278287`
    }, { quoted: message });
    return;
  }

  let platform;
  if (videoUrl.includes("youtube.com")) {
    platform = "YT";
  } else if (videoUrl.includes("vt.tiktok.com")) {
    platform = "TT";
  } else if (videoUrl.includes("instagram.com")) {
    platform = "IG";
  } else if (videoUrl.includes("facebook.com")) {
    platform = "FB";
  } else {
    await conn.sendMessage(message.chat, { text: "Unsupported platform!" }, { quoted: message });
    return;
  }

  try {
    let response = await axios.get(`https://vkrdownloader.vercel.app/server?vkr=${videoUrl}`);
    let videoData = response.data.data;

    await conn.sendMessage(message.chat, { text: `Please wait...\nType ${platform}` }, { quoted: message });

    let downloadUrls = videoData.downloads.map(download => download.url);

    for (let url of downloadUrls) {
      await conn.sendMessage(message.chat, {
        video: { url },
        caption: videoData.title
      }, { quoted: message });
    }
  } catch (error) {
    console.error(error);
    await conn.sendMessage(message.chat, { text: "An error occurred while downloading the video." }, { quoted: message });
  }
};

// Optional: Listen to all messages if needed.
handler.all = async (message) => {
  handler(message, { text: message.text, conn: message.conn });
};

export default handler;

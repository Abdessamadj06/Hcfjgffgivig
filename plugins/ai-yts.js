import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) {
        conn.reply(m.chat, `Please provide the name of a YouTube video or channel.`, m);
        return;
    }
    try {
        let result = await yts(text);
        let ytres = result.videos;
        let teskd = `Search results for *${text}*`;

        let listSections = [];
        for (let index in ytres) {
            let v = ytres[index];
            
            // إعداد الصورة المصغرة
            let messa = await prepareWAMessageMedia({ image: { url: v.thumbnail } }, { upload: conn.waUploadToServer });

            // إنشاء الرسالة التفاعلية
            listSections.push({
                title: `Results`,
                rows: [
                    {
                        header: 'Audio',
                        title: v.title,
                        description: `${v.title} | ${v.timestamp}\n`,
                        id: `${usedPrefix}ytmp3 ${v.url}`,
                        image: messa.imageMessage
                    },
                    {
                        header: "Video",
                        title: v.title,
                        description: `${v.title} | ${v.timestamp}\n`,
                        id: `${usedPrefix}ytmp4 ${v.url}`,
                        image: messa.imageMessage
                    }
                ]
            });
        }
        await conn.sendList(m.chat, `*Results*\n`, `Search results for: ${text}`, `Search`, listSections, m);
    } catch (e) {
        m.reply(`Please try again.`);
        console.log(e);
    }
};

handler.command = /^playlist|ytbuscar|yts(earch)?$/i;
handler.help = yts;
handler.tags = download;

export default handler;
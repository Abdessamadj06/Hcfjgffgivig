import yts from 'yt-search';
import { prepareWAMessageMedia, generateWAMessageFromContent } from 'baileys';

let handler = async (m, { conn, usedPrefix, text }) => {
    if (!text) {
        conn.reply(m.chat, `Please provide the name of a YouTube video or channel.`, m);
        return;
    }
    try {
        let result = await yts(text);
        let ytres = result.videos;
        let teskd = `Search results for *${text}*`;

        for (let index in ytres) {
            let v = ytres[index];
            var messa = await prepareWAMessageMedia({ image: { url: v.thumbnail } }, { upload: conn.waUploadToServer });
            const interactiveMessage = {
                body: { text: `*${v.title}*\nDuration: ${v.timestamp}\nAuthor: ${v.author.name}\nViews: ${v.views}\n\n` },
                footer: { text: `Results` },
                header: {
                    title: `*< YouTube Search Results />*`,
                    hasMediaAttachment: true,
                    imageMessage: messa.imageMessage,
                },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: 'single_select',
                            buttonParamsJson: JSON.stringify({
                                title: 'OPTIONS',
                                sections: [
                                    {
                                        title: 'Download Options',
                                        rows: [
                                            {
                                                header: 'Audio',
                                                title: 'Download MP3',
                                                description: `${v.title} | ${v.timestamp}`,
                                                id: `${usedPrefix}ytmp3 ${v.url}`
                                            },
                                            {
                                                header: "Video",
                                                title: 'Download MP4',
                                                description: `${v.title} | ${v.timestamp}`,
                                                id: `${usedPrefix}ytmp4 ${v.url}`
                                            }
                                        ]
                                    }
                                ]
                            })
                        }
                    ],
                    messageParamsJson: ''
                }
            };

            let msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage,
                    },
                },
            }, { userJid: conn.user.jid, quoted: m });

            conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        }
    } catch (e) {
        m.reply(`Please try again.`);
        console.log(e);
    }
};

handler.command = /^playlist|ytbuscar|yts(earch)?$/i;

export default handler;
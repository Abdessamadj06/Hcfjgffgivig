import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';
import can from 'knights-canvas'; // Assuming 'knights-canvas' is the correct module name

const handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let name = conn.getName(m.sender);
  let whoPP = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let ppBot = await conn.profilePictureUrl(whoPP, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
  
  let image = await new can.Rank()
    .setAvatar(ppBot)
    .setUsername(name ? name.replaceAll('\n','') : '-')
    .setBg('https://telegra.ph/file/fde739f66f1b81a43fe54.jpg')
    .setNeedxp(wm) // Assuming 'wm' is defined somewhere in your code
    .setCurrxp(`${user.exp}`)
    .setLevel(`${user.level}`)
    .setRank('https://i.ibb.co/Wn9cvnv/FABLED.png')
    .toAttachment();
  
  let data = image.toBuffer();
  let { role } = global.db.data.users[m.sender];
  
  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    let le = `*Name*: ${name}\n\nLevel : *${user.level}* 📊\nXP : *${user.exp - min} / ${xp}*\n\nNot enough XP *${max - user.exp}* Again! ✨`;
    await conn.sendMessage(m.chat, { image: data, caption: le }, { quoted: m });
  }
  
  let before = user.level * 1;
  
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
  
  if (before !== user.level) {
    let str = `*🥳 New level 🥳*\n\n• 🧬 Previous level : ${before}\n• 🧬 New levels : ${user.level}\n• 📅 Date : ${new Date().toLocaleString('id-ID')}\n\n*Note:* _Chont more often interact with the bot, the greater your level_`;
    
    try {
      await conn.sendMessage(m.chat, { image: data, caption: str }, { quoted: m });
    } catch (e) {
      m.reply(str);
    }
  }
};

handler.help = ['levelup'];
handler.tags = ['rg'];
handler.command = ['nivel|levelup|level'];
handler.register = true;

export default handler;

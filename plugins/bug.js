import { WAConnection } from '@adiwajshing/baileys';

let handler = async (m, { conn, usedPrefix, args }) => {
    // التحقق من إدخال الرقم وعدد الرسائل
    if (args.length < 2) throw `استخدام الأمر كالتالي: ${usedPrefix}bug <رقم_الهاتف> <عدد_الرسائل>`;
    
    let phoneNumber = args[0];
    let messageCount = parseInt(args[1]);

    if (isNaN(messageCount) || messageCount <= 0) throw 'الرجاء إدخال عدد صحيح من الرسائل.';

    let sections = [
        {
            title: "Example List",
            rows: [
                { title: "Item 1", rowId: "item1" },
                { title: "Item 2", rowId: "item2" },
                { title: "Item 3", rowId: "item3" }
            ]
        }
    ];

    let listMessage = {
        text: 'This is your list message.',
        footer: 'Please choose one of the options.',
        title: 'List Title',
        buttonText: 'Select Option',
        sections
    };

    // وظيفة لإرسال الرسالة
    const sendList = async (index) => {
        try {
            await conn.sendMessage(phoneNumber + '@s.whatsapp.net', listMessage);
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

const HelloWords = ["hello", "hi", "hey", "你好", "嗨"];
const ByeWords = ["bye", "goodbye", "see you", "掰", "再見", "拜拜", "掰"];
const DogWords = ["狗", "dog", "汪", "旺", "旺旺", "狗狗", "小", "威", "基"];

const getRandomEmoji = (emojiIdAmount: number) => {
    return Math.floor(Math.random() * emojiIdAmount).toString().padStart(3, '0');
}

export const handleReplyText = (message: string) => {
    const messageText = message.toLowerCase();

    const isSaidHello = HelloWords.some(word => messageText.includes(word));
    const isSaidBye = ByeWords.some(word => messageText.includes(word));
    const isSaidDog = DogWords.some(word => messageText.includes(word));


    if (isSaidHello) {
        return {
            text: '汪! $', emojis: [{
                index: 3,
                productId: '5ac21184040ab15980c9b43a',
                emojiId: '018'
            }]
        };
    }
    if (isSaidBye) {
        return {
            text: '汪嗚 $', emojis: [{
                index: 3,
                productId: '5ac21184040ab15980c9b43a',
                emojiId: '020'
            }]
        };
    }
    if (isSaidDog) {
        return {
            text: '汪 $',
            emojis: [{
                index: 2,
                productId: '670e0cce840a8236ddd4ee4c',
                emojiId: '165'
            }]
        };
    }

    return {
        text: '蛤 $',
        emojis: [{
            index: 2,
            productId: '5ac1de17040ab15980c9b438',
            emojiId: getRandomEmoji(194)
        }]
    };
};
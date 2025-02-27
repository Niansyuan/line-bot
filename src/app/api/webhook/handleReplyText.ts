
const HelloWords = ["hello", "hi", "hey", "你好", "嗨"];
const ByeWords = ["bye", "goodbye", "see you", "掰", "再見", "拜拜", "掰"];
const DogWords = ["狗", "dog", "汪", "旺", "旺旺", "狗狗", "小", "威", "基"];
const HungryWords = ["餓", "口水", "吃", "hungry", "eat", "food", "hungry"];

const getRandomEmoji = (emojiIdAmount: number) => {
    return Math.floor(Math.random() * emojiIdAmount).toString().padStart(3, '0');
}

export const handleReplyText = (message: string) => {
    const messageText = message.toLowerCase();

    const isSaidHello = HelloWords.some(word => messageText.includes(word));
    const isSaidBye = ByeWords.some(word => messageText.includes(word));
    const isSaidDog = DogWords.some(word => messageText.includes(word));
    const isSaidHungry = HungryWords.some(word => messageText.includes(word));


    if (isSaidHello) {
        return {
            text: '汪! {emoji}',
            substitution: {
                emoji: {
                    type: "emoji",
                    productId: '5ac21184040ab15980c9b43a',
                    emojiId: '020'
                }
            }
        };
    }
    if (isSaidBye) {
        return {
            text: '汪嗚 {emoji}',
            substitution: {
                emoji: {
                    type: "emoji",
                    productId: '5ac21184040ab15980c9b43a',
                    emojiId: '018'
                }
            }
        };
    }
    if (isSaidDog) {
        return {
            text: '汪 {emoji}',
            substitution: {
                emoji: {
                    type: "emoji",
                    productId: '670e0cce840a8236ddd4ee4c',
                    emojiId: '165'
                }
            }
        };
    }
    if (isSaidHungry) {
        return {
            text: '汪汪 {emoji1} {emoji2}',
            substitution: {
                emoji1: {
                    type: "emoji",
                    productId: '5ac1de17040ab15980c9b438',
                    emojiId: getRandomEmoji(102)
                },
                emoji2: {
                    type: "emoji",
                    productId: '5ac21184040ab15980c9b43a',
                    emojiId: '013'
                }
            }
        };
    }

    return {
        text: '蛤 {emoji}',
        substitution: {
            emoji: {
                type: "emoji",
                productId: '670e0cce840a8236ddd4ee4c',
                emojiId: getRandomEmoji(163)
            }
        }
    };
};
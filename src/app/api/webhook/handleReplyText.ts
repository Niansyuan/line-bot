const HelloWords = ["hello", "hi", "hey", "你好", "嗨", "哈囉", "要"];
const ByeWords = ["bye", "goodbye", "see you", "掰", "再見", "拜拜", "掰"];
const DogWords = ["狗", "dog", "汪", "旺", "旺旺", "狗狗", "小", "威", "基", "嗷"];
const HungryWords = ["餓", "口水", "吃", "hungry", "eat", "food", "hungry"];
const CanDoWords = ["做", "can", "do", "做做", "做做看", "做做看看", "什麼", "還有"];
const ThingsICanDo = ["坐下", "握手", "流口水", "咬襪子", "吃大便"];
const LoveWords = ["最愛", "愛", "love", "喜歡", "最喜歡"];

const getRandomEmoji = (emojiIdAmount: number) => {
    return Math.floor(Math.random() * emojiIdAmount).toString().padStart(3, '0');
}

const handleRandomCanDoWordsText = () => {
    const randomIndex = Math.floor(Math.random() * ThingsICanDo.length);
    return ThingsICanDo[randomIndex];
}

export const handleReplyText = (message: string) => {
    const messageText = message.toLowerCase();

    const isSaidHello = HelloWords.some(word => messageText.includes(word));
    const isSaidBye = ByeWords.some(word => messageText.includes(word));
    const isSaidDog = DogWords.some(word => messageText.includes(word));
    const isSaidHungry = HungryWords.some(word => messageText.includes(word));
    const isSaidCanDo = CanDoWords.some(word => messageText.includes(word));
    const isSaidLove = LoveWords.some(word => messageText.includes(word));

    if (isSaidHello) {
        if (messageText.includes("要")) {
            return {
                text: '要 {emoji}',
                substitution: {
                    emoji: {
                        type: "emoji",
                        productId: '5ac22e85040ab15980c9b44f',
                        emojiId: '208'
                    }
                }
            };
        }
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
        if (messageText.includes("嗷")) {
            return {
                text: '嗷嗷嗷嗷!'
            };
        }
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
    if (isSaidCanDo) {
        return {
            text: `我會${handleRandomCanDoWordsText()} {emoji}`,
            substitution: {
                emoji: {
                    type: "emoji",
                    productId: '5ac21184040ab15980c9b43a',
                    emojiId: '016'
                }
            }
        };
    }
    if (isSaidLove) {
        const theLoveWord = LoveWords.find(word => messageText.includes(word));
        return {
            text: `我${theLoveWord}你 {emoji}`,
            substitution: {
                emoji: {
                    type: "emoji",
                    productId: '5ac1bfd5040ab15980c9b435',
                    emojiId: '003'
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
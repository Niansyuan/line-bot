
export type Emojis = { index: number; productId: string; emojiId: string }[]

export interface BotReply {
    text: string;
    emojis?: Emojis;
}
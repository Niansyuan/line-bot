
export type Emojis = { type: string; productId: string; emojiId: string }

export interface BotReply {
    text: string;
    substitution?: {
        emoji?: Emojis;
    };
}
import { GameUrl } from "@/const/app";
import { storageGet } from "@/lib/storage";
import { getShareUrl } from "@/lib/tma";
import { useUtils } from "@tma.js/sdk-react";

const ShareText = `
🥳 Join to play lottery game in TON-LOTTO! Have fun and win airdrop!
🎁  1000 Chips as a first-time gift
🎁🎁  2000 Chips if you have Telegram Premium
`;

export const useInvite = () => {
    const utils = useUtils();

    const invite = () => {
        utils.openTelegramLink(
            getShareUrl(
                `${GameUrl}?startapp=referral_${storageGet("invitation_code")}`,
                ShareText
            )
        );
    };

    return { invite }
}
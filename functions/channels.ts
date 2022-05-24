import type { SlackFunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import type { BaseResponse } from "deno-slack-api/types.ts";
import type { ChannelsFunction } from "../manifest.ts";

interface ListCallResult extends BaseResponse {
    channels: {
        id: string;
        //name: string;
        //is_private: boolean;
    }[];
}

interface MembersCallResult extends BaseResponse {
    members: string[];
}

const channels: SlackFunctionHandler<typeof ChannelsFunction.definition> = async ({ inputs, token }) => {
    const client = SlackAPI(token, {});

    const result1 = await client.conversations.list({
        exclude_archived: true,
        types: "public_channel,private_channel",
    }) as ListCallResult;

    const list: string[] = [];
    if (result1.ok) {
        result1.channels.forEach(async (channel) => {
            const result2 = await client.conversations.members({
                channel: channel.id,
            }) as MembersCallResult;

            if (result2.ok && result2.members.includes(inputs.account)) {
                list.push(channel.id);
            }
        });
    }

    return { outputs: { list } };
};

export default channels;

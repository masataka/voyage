import { DefineFunction, Manifest, Schema } from "deno-slack-sdk/mod.ts";

export const EmailFunction = DefineFunction({
    callback_id: "email",
    title: "Email account",
    source_file: "functions/email.ts",
    input_parameters: {
        properties: {
            account: {
                type: Schema.slack.types.user_id,
            },
        },
        required: ["account"],
    },
    output_parameters: {
        properties: {
            email: {
                type: Schema.types.string,
            },
        },
        required: ["email"],
    },
});

export const ChannelsFunction = DefineFunction({
    callback_id: "channels",
    title: "Channel list",
    source_file: "functions/channels.ts",
    input_parameters: {
        properties: {
            account: {
                type: Schema.slack.types.user_id,
            },
        },
        required: ["account"],
    },
    output_parameters: {
        properties: {
            list: {
                type: Schema.types.array,
                items: Schema.types.string,
            },
        },
        required: ["list"],
    },
});

export default Manifest({
    name: "voyage",
    description: "Slack future platform PoC",
    icon: "assets/icon.png",
    functions: [
        EmailFunction,
        // ChannelsFunction,
    ],
    outgoingDomains: [],
    botScopes: [
        "commands",
        "users:read",
        "users:read.email",
        "channels:read",
    ],
});

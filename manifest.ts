import { DefineFunction, Manifest, Schema } from "deno-slack-sdk/mod.ts";

export const EmailFunction = DefineFunction({
    callback_id: "email",
    title: "Email account",
    description: "Show an user's email account",
    source_file: "functions/email.ts",
    input_parameters: {
        properties: {
            account: {
                type: Schema.slack.types.user_id,
                description: "Target account",
            },
        },
        required: ["account"],
    },
    output_parameters: {
        properties: {
            email: {
                type: Schema.types.string,
                description: "Email address",
            },
        },
        required: ["email"],
    },
});

export default Manifest({
    name: "voyage",
    description: "Slack future platform PoC",
    icon: "assets/icon.png",
    functions: [EmailFunction],
    outgoingDomains: [],
    botScopes: [
        "commands",
        "users:read",
        "users:read.email",
    ],
});

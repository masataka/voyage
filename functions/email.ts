import type { SlackFunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import type { BaseResponse } from "deno-slack-api/types.ts";
import type { EmailFunction } from "../manifest.ts";

interface InfoCallResult extends BaseResponse {
    user: {
        profile: {
            email: string;
        };
    };
}

const email: SlackFunctionHandler<typeof EmailFunction.definition> = async ({ inputs, token }) => {
    const client = SlackAPI(token, {});
    const result = await client.users.info({ user: inputs.account }) as InfoCallResult;
    return { outputs: { email: result.ok ? result.user.profile.email : "n/a" } };
};

export default email;

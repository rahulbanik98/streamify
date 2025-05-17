import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STEAM_API_KEY;
const apiSceret = process.env.STEAM_API_KEY_SECRET;

if (!apiKey || !apiSceret) {
  console.error("Stream key is messing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSceret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("error in upsertStreamUser", error);
  }
};

export const generateStreamToken = () => {};

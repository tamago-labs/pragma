import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

import 'dotenv/config'

const main = async () => {

    const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });

    // const res = await model.call(
    //     "What would be a good company name a company that makes colorful socks?"
    // );
    // console.log(res);

    const memory = new BufferMemory();
    const chain = new ConversationChain({ llm: model, memory: memory });

    const res1 = await chain.call({ input: "Hi! I'm Jim." });

    console.log(res1);

    const res2 = await chain.call({ input: "What's my name?" });
    console.log(res2);

}

main()
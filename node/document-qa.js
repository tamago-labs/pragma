import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain, loadQAMapReduceChain } from "langchain/chains";
import { Document } from "langchain/document";

import 'dotenv/config'

const main = async () => {

  const llmA = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });

  const chainA = loadQAStuffChain(llmA);
  const docs = [
    new Document({ pageContent: "Harrison went to Harvard." }),
    new Document({ pageContent: "Ankush went to Princeton." }),
  ];

  const resA = await chainA.call({
    input_documents: docs,
    question: "Where did Harrison go to college?",
  });
  console.log({ resA });
  // { resA: { text: ' Harrison went to Harvard.' } }

  

}

main()

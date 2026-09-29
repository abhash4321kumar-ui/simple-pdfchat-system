const fs = require('fs');
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf"); 
const { Pinecone } = require("@pinecone-database/pinecone");
const { PineconeStore } = require("@langchain/pinecone");
const { MistralAIEmbeddings } = require("@langchain/mistralai");
const { ChatOpenAI } = require('@langchain/openai');
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { Document } = require("@langchain/core/documents"); 
const { createRetrievalChain } = require("@langchain/classic/chains/retrieval");
const { createStuffDocumentsChain } = require("@langchain/classic/chains/combine_documents");

const usermodel = require('../model/user.model');
const ChatModel = require('../model/chat.model');

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const pcindex = pc.Index(process.env.PINECONE_INDEX_NAME);
const embeddings = new MistralAIEmbeddings({ apiKey: process.env.MISTRAL_API_KEY });
const llm = new ChatOpenAI({
    apiKey: process.env.OPENROUTER_KEY,
    configuration: { baseURL: "https://openrouter.ai/api/v1" },
    modelName: process.env.OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct',
    temperature: 0.7
});

function textSplitter(text, chunkSize = 100, chunkOverlap = 20, userId) {
    let words = text.split(' ');
    let chunks = [];
    let i = 0;
    while (i < words.length) {
        chunks.push(new Document({
            pageContent: words.slice(i, i + chunkSize).join(' '),
            metadata: { type: "document", userId: userId.toString() }
        }));
        i += (chunkSize - chunkOverlap);
    }
    return chunks;
}

//
async function uploadpdf(req, res, next) {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const userId = req.userId.toString();
        const loader = new PDFLoader(req.file.path);
        const loadedDocs = await loader.load();
        let pdftext = loadedDocs.map(doc => doc.pageContent).join(" ");
        let docs = textSplitter(pdftext, 100, 20, userId);

        await PineconeStore.fromDocuments(docs, embeddings, { pineconeIndex: pcindex });
        fs.unlinkSync(req.file.path);

        
        await usermodel.findByIdAndUpdate(userId, { hasUploadedPDF: true });

        res.status(200).json({ message: "PDF Successfully Stored!" });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
}


async function chatwithpdf(req, res, next) {
    try {
        let { usermessage } = req.body;
        let userId = req.userId;

        let user = await usermodel.findById(userId);
        const now = new Date();
        const oneDayMs = 24 * 60 * 60 * 1000;

        if (user.lastQuestionDate && (now - user.lastQuestionDate) > oneDayMs) {
            user.questionCount = 0; 
        }

        if (user.questionCount >= 10) {
            return res.status(429).json({ message: "Daily limit reached! You can ask 10 questions per 24 hours. Please wait or create a new account." });
        }

        const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex: pcindex });
        const retriever = vectorStore.asRetriever({ k: 3, filter: { type: "document", userId: userId.toString() } });

        const systemmessage = ChatPromptTemplate.fromTemplate(`
            Tum ek helpful AI assistant ho. Context ke ANDAR se hi jawab do. Or jabab us language me dena jis langauge me user baat kar raha ho.
            Context: {context}
            Sawaal: {input}
            Jawab:
        `);

        const combineDocsChain = await createStuffDocumentsChain({ llm: llm, prompt: systemmessage });
        const ragchain = await createRetrievalChain({ combineDocsChain, retriever });

        const response = await ragchain.invoke({ input: usermessage });
        const aiResponse = response.answer;

        
        const chatDocs = [
            new Document({ pageContent: `User said: ${usermessage}`, metadata: { type: 'chat_history', userId: userId.toString(), role: 'user' } }),
            new Document({ pageContent: `AI replied: ${aiResponse}`, metadata: { type: 'chat_history', userId: userId.toString(), role: 'ai' } })
        ];
        await PineconeStore.fromDocuments(chatDocs, embeddings, { pineconeIndex: pcindex });

        
        await ChatModel.create([
            { userId: userId, sender: 'user', text: usermessage },
            { userId: userId, sender: 'ai', text: aiResponse }
        ]);

        user.questionCount += 1;
        user.lastQuestionDate = now;
        await user.save();

        res.status(200).json({ message: 'Success', response: aiResponse, remainingQuestions: 10 - user.questionCount });

    } catch (error) {
        res.status(500).json({ message: "Chat API Failed", error: error.message });
    }
}


async function getChatHistory(req, res, next) {
    try {
        
        const chats = await ChatModel.find({ userId: req.userId }).sort({ createdAt: 1 });
        res.status(200).json({ chats });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch chat history" });
    }
}

module.exports = {
    uploadpdf,
    chatwithpdf,
    getChatHistory
}
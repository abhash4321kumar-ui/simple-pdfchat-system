import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-[#16233A] mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-gray-500 mb-8 text-center">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Your Documents (Our Core Promise)</h2>
          <p>
            Your privacy is our top priority. <strong>We do not store your PDF files.</strong> When you upload a document to DocuMind AI, it is immediately processed, converted into mathematical vectors, and the original PDF file is permanently deleted from our servers. 
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Data We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Your name and email address when you sign up (manually or via Google).</li>
            <li><strong>Chat History:</strong> We store your chat history with the AI so you can access your past conversations when you return.</li>
            <li><strong>Cookies:</strong> We use secure cookies to keep you logged in.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Third-Party Services</h2>
          <p>
            To provide our AI features, we use trusted third-party providers (like Pinecone for vector storage and OpenAI/Mistral via OpenRouter for AI generation). We only share the necessary text extracts required to generate your answers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at abhash4321kumar@gmail.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy
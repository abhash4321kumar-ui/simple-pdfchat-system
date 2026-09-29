import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-[#16233A] mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
      <p className="text-gray-500 mb-8 text-center">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>By using DocuMind AI, you agree to these terms. If you do not agree, please do not use our service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Beta Service & AI Accuracy Disclaimer</h2>
          <p>
            DocuMind AI is currently in Beta. While we strive for accuracy, AI can hallucinate or make mistakes. <strong>We do not guarantee the 100% accuracy of the answers provided by the AI.</strong> You should always verify critical information from the original document. We are not legally liable for any business or personal losses caused by relying on the AI's answers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
          <p>
            You agree NOT to upload highly sensitive, classified government documents, or illegal material. You are solely responsible for the documents you process through our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Rate Limits (Fair Use)</h2>
          <p>
            To prevent abuse, free tier users are limited to 10 questions per 24 hours. Attempting to bypass these limits via automated bots may result in account termination.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms
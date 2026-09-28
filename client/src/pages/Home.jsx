import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-[#F6F4EE] text-[#16233A]">

            <main className="max-w-5xl mx-auto px-6">
                <section className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-center pt-10 pb-24">
                    <div>
                        <p className="text-sm font-medium text-[#B9862C] mb-4">PDF Q&amp;A, without the skimming</p>
                        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] mb-6">
                            Drop in a document,<br />pull out the answer.
                        </h1>
                        <p className="text-lg text-[#16233A]/70 max-w-md mb-8 leading-relaxed">
                            Upload any PDF and ask it questions directly. No more scrolling through
                            fifty pages to find one paragraph.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#16233A] text-[#F6F4EE] font-medium hover:bg-[#0F1826] transition-colors"
                            >
                                Get started
                            </Link>
                            <span className="text-sm text-[#16233A]/50">Free to try · no card needed</span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-full h-full bg-[#F2A93B]/20 rounded-2xl" />
                        <div className="relative bg-white rounded-2xl border border-[#16233A]/10 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#16233A]/10">
                                <div className="w-8 h-8 rounded-full bg-[#16233A]/5 flex items-center justify-center text-xs">📄</div>
                                <span className="text-sm font-medium">quarterly-report.pdf</span>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-[#16233A]/5 rounded-lg rounded-tl-sm px-4 py-2.5 text-sm max-w-[85%]">
                                    What was the revenue growth in Q3?
                                </div>
                                <div className="bg-[#F2A93B]/15 rounded-lg rounded-tr-sm px-4 py-2.5 text-sm max-w-[85%] ml-auto">
                                    Revenue grew 18% quarter-over-quarter, driven mainly by the enterprise segment (page 4).
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid sm:grid-cols-3 gap-6 pb-24 border-t border-[#16233A]/10 pt-16">
                    <div>
                        <h3 className="font-serif text-lg mb-2">Upload</h3>
                        <p className="text-sm text-[#16233A]/65 leading-relaxed">
                            Drop in any PDF — reports, papers, contracts. It's indexed in seconds.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-serif text-lg mb-2">Ask</h3>
                        <p className="text-sm text-[#16233A]/65 leading-relaxed">
                            Ask questions in plain language, the same way you'd ask a colleague.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-serif text-lg mb-2">Understand</h3>
                        <p className="text-sm text-[#16233A]/65 leading-relaxed">
                            Get direct answers pulled from the document, not generic guesses.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Linkedin, Twitter } from 'lucide-react';

const BlogPost = () => {
    const { slug } = useParams();

    // Mock data for demo - normally fetched via API based on slug
    const post = {
        title: "Why PMOs Fail in 2026",
        date: "Jan 12, 2026",
        author: "Fabrice Fays",
        role: "CEO Powalyze",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200&h=600",
        content: `
            <p class="mb-6 text-lg leading-relaxed text-slate-300">The Project Management Office (PMO) has traditionally been viewed as an administrative function—the "police" of project management. But in 2026, this model is obsolete. The speed of business transformation requires a shift from control to enablement, from reporting to predictive steering.</p>
            
            <h2 class="text-2xl font-bold text-white mb-4 mt-8">1. The Trap of Administrative Heavy-Lifting</h2>
            <p class="mb-6 text-slate-400">Most PMOs spend 80% of their time chasing data. They are data aggregators, not analysts. By the time a report reaches the ExCo, the data is already 2 weeks old. In a world of agile delivery and continuous integration, this latency is unacceptable.</p>
            
            <h2 class="text-2xl font-bold text-white mb-4 mt-8">2. Data as a Strategic Asset</h2>
            <p class="mb-6 text-slate-400">Successful organizations treat project data like financial data: it must be accurate, real-time, and auditable. This requires moving away from Excel and PPT towards integrated platforms like Power BI, fed by live connectors to Jira, SAP, and Salesforce.</p>
            
            <div class="my-8 p-6 bg-[#1A1A1A] border-l-4 border-[#D4A574] italic text-slate-200">
                "The PMO of the future doesn't ask 'Is the project on time?'. It asks 'Is this investment still relevant to our strategy?'"
            </div>

            <h2 class="text-2xl font-bold text-white mb-4 mt-8">3. From Reporting to Steering</h2>
            <p class="mb-6 text-slate-400">The goal is not to report on the past, but to steer the future. This requires predictive analytics and scenario modelling. What happens if we cut the budget of Project A by 10%? What is the impact on the roadmap if Resource B leaves?</p>
        `
    };

    return (
        <div className="bg-[#0F0F0F] min-h-screen">
            <SEO title={`${post.title} | Powalyze Insights`} />
            <Header />
            
            <main className="pt-32 pb-20">
                <article className="container mx-auto max-w-4xl px-4">
                    <Link to="/blog" className="inline-flex items-center text-slate-500 hover:text-[#D4A574] mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-[Cinzel] leading-tight">{post.title}</h1>
                    
                    <div className="flex items-center justify-between border-b border-slate-800 pb-8 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-[#D4A574] font-bold text-lg">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <div className="text-white font-bold">{post.author}</div>
                                <div className="text-slate-500 text-sm">{post.role} • {post.date}</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                             <Button variant="outline" size="icon" className="border-slate-800 text-slate-400 hover:text-[#0077b5]"><Linkedin className="w-4 h-4" /></Button>
                             <Button variant="outline" size="icon" className="border-slate-800 text-slate-400 hover:text-[#1DA1F2]"><Twitter className="w-4 h-4" /></Button>
                             <Button variant="outline" size="icon" className="border-slate-800 text-slate-400 hover:text-white"><Share2 className="w-4 h-4" /></Button>
                        </div>
                    </div>

                    <img src={post.image} alt={post.title} loading="lazy" className="w-full rounded-2xl mb-12 border border-slate-800" />

                    <div className="prose prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                    <div className="mt-20 p-12 bg-[#141414] rounded-2xl border border-slate-800 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to modernize your PMO?</h3>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">See how Powalyze implements these strategies with our turnkey OS.</p>
                        <Button className="bg-[#D4A574] hover:bg-[#B58554] text-black font-bold h-12 px-8">Book a Strategy Call</Button>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPost;

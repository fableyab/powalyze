
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Blog = () => {
    const categories = ["All", "Strategy", "Technology", "Compliance", "Success Stories"];
    
    const posts = [
        {
            id: "pmo-fail-2026",
            title: "Why PMOs Fail in 2026",
            excerpt: "The shift from administrative reporting to strategic steering is no longer optional. Discover the 3 key pillars of modern PMO.",
            date: "Jan 12, 2026",
            category: "Strategy",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800&h=400"
        },
        {
            id: "powerbi-vs-tableau",
            title: "Power BI vs Tableau: The Swiss Banking Verdict",
            excerpt: "A deep dive into security features, on-premise capabilities, and TCO for regulated Swiss financial institutions.",
            date: "Jan 05, 2026",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400"
        },
        {
            id: "finma-compliance",
            title: "Navigating FINMA Circular 2023/1",
            excerpt: "How to ensure your IT operational resilience meets the new regulator standards using automated governance.",
            date: "Dec 20, 2025",
            category: "Compliance",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800&h=400"
        },
        {
            id: "ai-pmo",
            title: "AI in Project Management: Hype vs Reality",
            excerpt: "We tested 5 AI tools for resource forecasting. Here's what actually works in a corporate environment.",
            date: "Nov 15, 2025",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=400"
        }
    ];

    return (
        <div className="bg-[#0F0F0F] min-h-screen">
            <SEO title="Insights | Powalyze" />
            <Header />
            <main className="pt-32 pb-20 container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-6 font-[Cinzel]">Strategic Insights</h1>
                    <p className="text-xl text-slate-400 mb-8">Thought leadership for the modern executive.</p>
                    
                    {/* Search & Filters */}
                    <div className="max-w-xl mx-auto space-y-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            <Input placeholder="Search articles..." className="pl-10 bg-[#141414] border-slate-800 text-white" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((cat, i) => (
                                <button key={i} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-[#D4A574] text-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {posts.map((post, i) => (
                        <Link to={`/blog/${post.id}`} key={i} className="group bg-[#141414] border border-slate-800 rounded-xl overflow-hidden hover:border-[#D4A574] transition-all">
                            <div className="h-64 overflow-hidden relative">
                                <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-[#D4A574] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="text-xs text-slate-500 mb-2">{post.date}</div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4A574] transition-colors">{post.title}</h3>
                                <p className="text-slate-400 mb-6 leading-relaxed">{post.excerpt}</p>
                                <span className="text-sm text-white font-medium underline decoration-[#D4A574] decoration-2 underline-offset-4">Read Full Article</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <Newsletter />
            </main>
            <Footer />
        </div>
    );
};

export default Blog;

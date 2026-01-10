
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Calendar, Star, HelpCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DemoPage = () => {
    const [state, handleSubmit] = useForm("xeoyznlq");
    const { toast } = useToast();

    if (state.succeeded) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="bg-[#1A1A1A] border border-emerald-500/30 p-12 rounded-2xl max-w-lg text-center shadow-2xl shadow-emerald-900/20">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
                        <p className="text-slate-400 mb-8">Thank you for booking a demo. A calendar invitation has been sent to your email.</p>
                        <Button onClick={() => window.location.href = '/'} className="bg-[#4A9EFF] text-white">Return Home</Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <SEO title="Book a Demo | Powalyze" />
            <Header />
            
            <main className="pt-32 pb-20 px-4 container mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    
                    {/* Left Column: Content */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-[Cinzel]">
                                Experience the Future of <span className="text-[#4A9EFF]">Strategic Steering</span>
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                Join hundreds of executives who have transformed their decision-making process. Book a personalized 30-minute walkthrough of the Powalyze OS.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white">What you'll learn:</h3>
                            <ul className="space-y-4">
                                {[
                                    "How to automate your executive reporting in clicks.",
                                    "Real-time portfolio visibility and risk detection.",
                                    "Integrating Power BI directly into your workflow.",
                                    "AI-driven predictive analytics for budget forecasting."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-[#4A9EFF] shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-slate-800">
                            <div className="flex gap-1 mb-4">
                                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-[#FFD700] fill-current" />)}
                            </div>
                            <p className="text-slate-300 italic mb-4">"Powalyze has completely changed how we manage our strategic portfolio. The clarity we have now is unprecedented."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold">JD</div>
                                <div>
                                    <div className="font-bold text-white">Jean Dupont</div>
                                    <div className="text-xs text-slate-500">CIO, Swiss Banking Corp</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-slate-800 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Calendar className="text-[#4A9EFF]" /> Book Your Session
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Name *</label>
                                    <Input name="name" required className="bg-black border-slate-700" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Company *</label>
                                    <Input name="company" required className="bg-black border-slate-700" placeholder="Acme Inc" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Work Email *</label>
                                <Input type="email" name="email" required className="bg-black border-slate-700" placeholder="john@company.com" />
                                <ValidationError prefix="Email" field="email" errors={state.errors} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Phone</label>
                                <Input type="tel" name="phone" className="bg-black border-slate-700" placeholder="+41 ..." />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Preferred Date *</label>
                                    <Input type="date" name="date" required className="bg-black border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Time *</label>
                                    <Select name="time" required>
                                        <SelectTrigger className="bg-black border-slate-700"><SelectValue placeholder="Select time" /></SelectTrigger>
                                        <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                                            {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(t => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Specific Interests</label>
                                <textarea name="message" className="w-full bg-black border border-slate-700 rounded-md p-3 text-white h-24 text-sm" placeholder="I'm interested in..." />
                            </div>

                            <Button type="submit" disabled={state.submitting} className="w-full bg-[#4A9EFF] hover:bg-[#0052cc] text-white font-bold h-12 text-lg">
                                {state.submitting ? 'Booking...' : 'Book Demo'}
                            </Button>
                        </form>
                    </div>

                </div>

                {/* FAQ */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="grid gap-6">
                        <FAQItem q="Is the demo really free?" a="Yes, the demo is 100% free and comes with no commitment." />
                        <FAQItem q="Can I invite my team?" a="Absolutely. We recommend having key stakeholders present." />
                        <FAQItem q="How long does it take?" a="Demos typically last 30-45 minutes depending on your questions." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const FAQItem = ({ q, a }) => (
    <div className="bg-[#141414] p-6 rounded-xl border border-slate-800">
        <h4 className="font-bold text-white mb-2 flex items-center gap-2"><HelpCircle className="w-4 h-4 text-slate-500" /> {q}</h4>
        <p className="text-slate-400 text-sm ml-6">{a}</p>
    </div>
);

export default DemoPage;

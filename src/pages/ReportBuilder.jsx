import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, CheckSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { exportToPDF, exportToPPTX } from '@/lib/exportUtils';

const ReportBuilder = ({ language }) => {
    const { toast } = useToast();
    const [selectedSections, setSelectedSections] = useState({
        execSummary: true,
        financials: true,
        risks: true,
        projectList: false
    });

    const handleGenerate = (format) => {
        toast({ title: "Generating Report...", description: "This might take a few seconds." });
        setTimeout(() => {
            if (format === 'pdf') {
                exportToPDF('report-preview', 'Custom_Strategic_Report.pdf');
            } else {
                exportToPPTX({ name: 'Strategic Report' }, 'Generated via Report Builder');
            }
            toast({ title: "Success", description: "Report downloaded successfully." });
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#D4AF37]">Report Builder</h1>
                    <p className="text-slate-500">Create custom strategic reports for your stakeholders.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration Panel */}
                <div className="bg-[#0F0F0F] rounded-xl border border-slate-800 p-6 h-fit">
                    <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-[#D4AF37]" /> Configuration
                    </h3>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm text-slate-400 mb-2 block">Report Period</label>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 bg-slate-900 border-slate-700 text-white hover:bg-slate-800">Q1 2026</Button>
                                <Button variant="ghost" size="sm" className="flex-1 text-slate-500">Q2</Button>
                                <Button variant="ghost" size="sm" className="flex-1 text-slate-500">Q3</Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm text-slate-400 block">Sections to Include</label>
                            {Object.keys(selectedSections).map(key => (
                                <div key={key} className="flex items-center space-x-3 p-3 rounded bg-slate-900 border border-slate-800 cursor-pointer" onClick={() => setSelectedSections(prev => ({...prev, [key]: !prev[key]}))}>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedSections[key] ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-slate-600'}`}>
                                        {selectedSections[key] && <CheckSquare className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className="text-sm text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-slate-800 space-y-3">
                            <Button className="w-full bg-[#1E3A8A] hover:bg-[#172554] text-white" onClick={() => handleGenerate('pdf')}>
                                <Download className="w-4 h-4 mr-2" /> Export as PDF
                            </Button>
                            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800" onClick={() => handleGenerate('pptx')}>
                                <FileText className="w-4 h-4 mr-2" /> Export as PPTX
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Live Preview (Simulated) */}
                <div className="lg:col-span-2 bg-white text-black p-8 rounded-xl shadow-2xl min-h-[600px] relative overflow-hidden" id="report-preview">
                    {/* A4 Page Simulation */}
                    <div className="border-b-4 border-[#D4AF37] pb-4 mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-bold text-[#1E3A8A]">Strategic Review</h1>
                            <p className="text-slate-500 mt-1">Q1 2026 • Private Banking Division</p>
                        </div>
                        <div className="text-right">
                             <div className="text-[#D4AF37] font-bold text-xl tracking-wider">POWALYZE</div>
                             <div className="text-xs text-slate-400">CONFIDENTIAL</div>
                        </div>
                    </div>

                    {selectedSections.execSummary && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#1E3A8A] mb-4 border-l-4 border-[#1E3A8A] pl-3">Executive Summary</h2>
                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                The portfolio is currently performing within expected risk tolerances (Risk Score: 42/100). 
                                Key strategic initiatives "Digital Front" and "Core Migration" are progressing on schedule. 
                                Budget consumption is 2% below forecast, allowing for potential reallocation to acceleration tracks in Q2.
                            </p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-50 p-4 border border-slate-200">
                                    <div className="text-xs text-slate-500 uppercase">Portfolio Health</div>
                                    <div className="text-2xl font-bold text-emerald-600">94/100</div>
                                </div>
                                <div className="bg-slate-50 p-4 border border-slate-200">
                                    <div className="text-xs text-slate-500 uppercase">Budget Consumed</div>
                                    <div className="text-2xl font-bold text-[#1E3A8A]">CHF 4.2M</div>
                                </div>
                                <div className="bg-slate-50 p-4 border border-slate-200">
                                    <div className="text-xs text-slate-500 uppercase">Open Risks</div>
                                    <div className="text-2xl font-bold text-amber-600">3 High</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedSections.financials && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#1E3A8A] mb-4 border-l-4 border-[#1E3A8A] pl-3">Financial Performance</h2>
                            <div className="h-48 bg-slate-50 rounded border border-slate-200 flex items-center justify-center text-slate-400">
                                [Financial Chart Visualization Placeholder]
                            </div>
                        </div>
                    )}

                     {selectedSections.risks && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#1E3A8A] mb-4 border-l-4 border-[#1E3A8A] pl-3">Top Risks</h2>
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100 text-slate-600">
                                    <tr>
                                        <th className="p-2 text-left">Risk Description</th>
                                        <th className="p-2 text-center">Impact</th>
                                        <th className="p-2 text-left">Mitigation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="p-2">Vendor Insolvency (Supplier A)</td>
                                        <td className="p-2 text-center text-red-600 font-bold">High</td>
                                        <td className="p-2">Alternative sourcing initiated.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="absolute bottom-4 left-8 right-8 border-t border-slate-200 pt-2 flex justify-between text-xs text-slate-400">
                        <span>Generated by Powalyze OS</span>
                        <span>Page 1 of 1</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportBuilder;
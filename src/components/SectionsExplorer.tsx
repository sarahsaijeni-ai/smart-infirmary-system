import React, { useState } from 'react';
import { 
  PROPOSAL_SECTIONS, 
  ProposalSection 
} from '../data/proposalData';
import { 
  ListOrdered, 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  BookMarked 
} from 'lucide-react';

export const SectionsExplorer: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSection, setExpandedSection] = useState<number | null>(1);
  const [copiedSection, setCopiedSection] = useState<number | null>(null);

  const filtered = PROPOSAL_SECTIONS.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                          s.fullText.toLowerCase().includes(search.toLowerCase()) ||
                          s.summary.toLowerCase().includes(search.toLowerCase()) ||
                          String(s.number).includes(search);
    return matchesCat && matchesSearch;
  });

  const handleCopySection = (sec: ProposalSection) => {
    const text = `SECTION ${sec.number}: ${sec.title}\n[Category: ${sec.category}]\n\n${sec.fullText}`;
    navigator.clipboard.writeText(text);
    setCopiedSection(sec.number);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <ListOrdered className="w-6 h-6 text-emerald-400" />
          <span>Full Proposal Directory (All 33 Sections)</span>
        </h1>
        <p className="text-xs text-slate-400">
          Complete, verbatim-faithful breakdown of every section from the BioSphere AI Project Proposal document.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
          {['All', 'Strategic', 'Technical', 'Educational', 'Operational', 'Security'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search all 33 sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Sections Accordion List */}
      <div className="space-y-3">
        {filtered.map((sec) => {
          const isExpanded = expandedSection === sec.number;

          return (
            <div
              key={sec.number}
              className={`border rounded-2xl transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900/90 border-emerald-600/60 shadow-xl'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div
                onClick={() => setExpandedSection(isExpanded ? null : sec.number)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-emerald-400 shrink-0">
                    {sec.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">
                        {sec.title}
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        sec.category === 'Security' ? 'bg-red-950/80 text-red-300 border border-red-800/40' :
                        sec.category === 'Technical' ? 'bg-blue-950/80 text-blue-300 border border-blue-800/40' :
                        sec.category === 'Educational' ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40' :
                        sec.category === 'Operational' ? 'bg-purple-950/80 text-purple-300 border border-purple-800/40' :
                        'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                      }`}>
                        {sec.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {sec.summary}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isExpanded ? 'rotate-90 text-emerald-400' : ''
                  }`}
                />
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800 space-y-3 text-xs animate-fadeIn">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line font-mono text-xs">
                    {sec.fullText}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 italic">
                      Document Source: BioSphere AI Project Proposal • Section {sec.number}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopySection(sec);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
                    >
                      {copiedSection === sec.number ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied Section</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Section</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

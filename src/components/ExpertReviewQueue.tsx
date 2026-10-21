import React, { useState } from 'react';
import { 
  HeartHandshake, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Sparkles, 
  Filter, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  ThumbsUp
} from 'lucide-react';

interface ReviewItem {
  id: string;
  contributor: string;
  speciesCandidate: string;
  scientificCandidate: string;
  category: string;
  confidenceAI: number;
  location: string;
  timestamp: string;
  userRemarks: string;
  expertVotes: { expertName: string; agreed: boolean; comment: string }[];
  isVerified: boolean;
  uncertaintyReason: string;
}

export const ExpertReviewQueue: React.FC = () => {
  const [items, setItems] = useState<ReviewItem[]>([
    {
      id: 'rev-101',
      contributor: 'Jane Doe (Citizen Scientist)',
      speciesCandidate: 'Death Cap Mushroom vs Agaricus Lookalike',
      scientificCandidate: 'Amanita phalloides',
      category: 'Fungi',
      confidenceAI: 79,
      location: 'Suburban Park Oak Copse',
      timestamp: '2 hours ago',
      userRemarks: 'Found under oak tree. Stem has a ring, but base was partly buried. Want to verify whether gills are white or pink.',
      expertVotes: [
        {
          expertName: 'Dr. Kwame Osei (Mycologist, National Herbarium)',
          agreed: true,
          comment: 'Confirmed Amanita phalloides. The universal veil volva is unmistakable at the stipe base. High toxicity warning issued.'
        }
      ],
      isVerified: true,
      uncertaintyReason: 'Medium AI confidence (79%) due to partially buried volva in leaf litter.'
    },
    {
      id: 'rev-102',
      contributor: 'Samuel K. (Extension Agronomist)',
      speciesCandidate: 'Fall Armyworm vs African Armyworm',
      scientificCandidate: 'Spodoptera frugiperda',
      category: 'Insect',
      confidenceAI: 74,
      location: 'Kitale Maize Experimental Plots',
      timestamp: '5 hours ago',
      userRemarks: 'Severe leaf whorl chewing. Head has faint inverted Y mark, need confirmation of the 4 square pinacula on segment 8.',
      expertVotes: [
        {
          expertName: 'Dr. Sarah Wanjiku (Entomologist)',
          agreed: true,
          comment: 'Clearly Spodoptera frugiperda. Macro crop photo shows the 4 elevated dark dots in a square. Recommend immediate IPM push-pull.'
        }
      ],
      isVerified: true,
      uncertaintyReason: 'Lookalike ambiguity with native Spodoptera exempta.'
    },
    {
      id: 'rev-103',
      contributor: 'Marcus Miller (Birdwatcher)',
      speciesCandidate: 'Crowned Crane Subspecies Inquiry',
      scientificCandidate: 'Balearica regulorum',
      category: 'Bird',
      confidenceAI: 68,
      location: 'Rift Valley Wetland Buffer',
      timestamp: '1 day ago',
      userRemarks: 'Distant flight photograph. Facial patch appears partially red and white.',
      expertVotes: [],
      isVerified: false,
      uncertaintyReason: 'Distant photo resolution. Requires secondary photo of cheek wattles.'
    }
  ]);

  const [selectedReviewId, setSelectedReviewId] = useState<string>('rev-103');
  const [newComment, setNewComment] = useState<string>('');

  const selectedItem = items.find(i => i.id === selectedReviewId) || items[0];

  const handleCastVote = (agreed: boolean) => {
    if (!newComment.trim()) {
      alert("Please enter a taxonomic verification note.");
      return;
    }

    const updated = items.map(item => {
      if (item.id === selectedReviewId) {
        const newVotes = [
          ...item.expertVotes,
          {
            expertName: 'You (Certified Taxonomist / Reviewer)',
            agreed,
            comment: newComment
          }
        ];
        return {
          ...item,
          expertVotes: newVotes,
          isVerified: agreed || item.isVerified
        };
      }
      return item;
    });

    setItems(updated);
    setNewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Taxonomic Expert Verification Queue
              </h1>
              <p className="text-xs text-slate-400">
                Section 13: Workflow: AI Prediction → User Submission → Expert Review → Verified Identification (Research Grade).
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-700/60 font-semibold">
            {items.filter(i => !i.isVerified).length} Awaiting Verification
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-semibold">
            {items.filter(i => i.isVerified).length} Research-Grade Verified
          </span>
        </div>
      </div>

      {/* Main Review Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Submissions List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Pending & Verified Observations:
            </span>

            <div className="space-y-2.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedReviewId(item.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedReviewId === item.id
                      ? 'bg-purple-950/70 border-purple-500 shadow-md ring-1 ring-purple-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white truncate max-w-[200px]">
                      {item.speciesCandidate}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      item.isVerified ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-amber-950 text-amber-300 border border-amber-700'
                    }`}>
                      {item.isVerified ? 'Research Grade' : 'In Review'}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-purple-300 italic">
                    {item.scientificCandidate}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                    <span>By: {item.contributor}</span>
                    <span className="font-mono">AI Conf: {item.confidenceAI}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Specimen Review & Taxonomic Voting */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            
            <div className="border-b border-slate-800 pb-3 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">
                  Observation #{selectedItem.id}
                </span>
                <h2 className="text-lg font-extrabold text-white">
                  {selectedItem.speciesCandidate}
                </h2>
                <p className="text-xs font-mono text-emerald-400 italic">
                  Candidate: {selectedItem.scientificCandidate} ({selectedItem.category})
                </p>
              </div>

              <div className="text-right text-xs">
                <span className="text-slate-400 block">{selectedItem.location}</span>
                <span className="text-[11px] text-slate-500">{selectedItem.timestamp}</span>
              </div>
            </div>

            {/* Field Notes & Uncertainty Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-400 block">Contributor Field Notes:</span>
                <p className="text-slate-200 italic">"{selectedItem.userRemarks}"</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-semibold text-amber-400 block">AI Uncertainty Trigger:</span>
                <p className="text-slate-300">{selectedItem.uncertaintyReason}</p>
              </div>
            </div>

            {/* Expert Consensus Votes */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Taxonomist Review & Consensus History</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedItem.expertVotes.length} Review(s)
                </span>
              </div>

              <div className="space-y-2">
                {selectedItem.expertVotes.length === 0 ? (
                  <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 italic">
                    No expert reviews logged yet. Be the first certified botanist/zoologist to examine this specimen!
                  </p>
                ) : (
                  selectedItem.expertVotes.map((v, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          {v.expertName}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {v.agreed ? 'Agreed' : 'Disputed'}
                        </span>
                      </div>
                      <p className="text-slate-300 pl-4">{v.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Vote & Confirm Action Form */}
            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <label className="font-semibold text-slate-300 block">
                Add Expert Review / Taxonomic Evaluation:
              </label>
              <textarea
                rows={2}
                placeholder="Explain diagnostic features observed (e.g. leaf venation, volva sack, wing bars)..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 text-xs"
              />

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => handleCastVote(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors border border-slate-700"
                >
                  Dispute / Request More Photos
                </button>
                <button
                  onClick={() => handleCastVote(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-600/20"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Confirm as Research Grade</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

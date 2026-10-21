import React, { useState } from 'react';
import { 
  SAMPLE_QUIZZES, 
  QuizQuestion 
} from '../data/proposalData';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Award,
  HelpCircle
} from 'lucide-react';

export const QuizzesSection: React.FC = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentQuestion = SAMPLE_QUIZZES[currentQuizIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < SAMPLE_QUIZZES.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">
            Interactive Biodiversity Quizzes & Challenges
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          Section 10: All 6 challenge activities (Identify Species, Taxonomy, Habitat, Conservation, Biodiversity, and Similar Species).
        </p>
      </div>

      {!completed ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                Challenge Mode: {currentQuestion.type}
              </span>
              <span className="text-xs text-slate-400">
                Question {currentQuizIndex + 1} of {SAMPLE_QUIZZES.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300">Score:</span>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-bold font-mono">
                {score} / {SAMPLE_QUIZZES.length}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
              {currentQuestion.question}
            </h2>
            <p className="text-xs text-slate-400 italic">
              Context: {currentQuestion.context}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctAnswer;

              let optionStyle = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200';
              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50';
                } else if (isSelected) {
                  optionStyle = 'bg-red-950/80 border-red-500 text-red-200';
                } else {
                  optionStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-all ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn text-xs">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Scientific Diagnostic Rationale:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <span>{currentQuizIndex < SAMPLE_QUIZZES.length - 1 ? 'Next Question' : 'Complete Challenge'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Complete Summary */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
            <Award className="w-8 h-8 text-slate-950" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">
              Biodiversity Challenge Completed!
            </h2>
            <p className="text-xs text-slate-400">
              Personalized learning progress updated in your citizen scientist profile (Section 11).
            </p>
          </div>

          <div className="text-4xl font-extrabold text-emerald-400 font-mono">
            {score} / {SAMPLE_QUIZZES.length}
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {score === SAMPLE_QUIZZES.length
              ? "Flawless score! You have mastered species differentiation, safety protocols, and conservation guidelines."
              : "Great effort! BioSphere AI adapts future quizzes according to your learning progress."}
          </p>

          <button
            onClick={handleResetQuiz}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Challenge</span>
          </button>
        </div>
      )}

      {/* Challenge Modes Reference Cards (Section 10) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="font-bold text-emerald-300 block">1. Identify Species</span>
          <span className="text-[11px] text-slate-400">Flashcard recognition from photos</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="font-bold text-teal-300 block">2. Taxonomy</span>
          <span className="text-[11px] text-slate-400">Orders, families & evolutionary traits</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="font-bold text-cyan-300 block">3. Habitat</span>
          <span className="text-[11px] text-slate-400">Biomes, elevations & ecosystems</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="font-bold text-blue-300 block">4. Conservation</span>
          <span className="text-[11px] text-slate-400">IUCN statuses & threat mitigation</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="font-bold text-purple-300 block">5. Biodiversity</span>
          <span className="text-[11px] text-slate-400">Food webs & keystone roles</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="font-bold text-amber-300 block">6. Similar Species</span>
          <span className="text-[11px] text-slate-400">Spotting subtle lookalike differences</span>
        </div>
      </div>

    </div>
  );
};

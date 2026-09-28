import React, { useRef } from 'react';
import { Certificate } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Download,
  Printer,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const { awardPoints } = useApp();
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}

    window.print();
    awardPoints(15, 'Downloaded official event certificate');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        
        {/* Header Action Bar */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Official Verified Credential
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div className="p-6 sm:p-12 overflow-x-auto flex justify-center bg-slate-100 dark:bg-slate-950/80">
          <div
            ref={certRef}
            className="w-full max-w-2xl bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-xl border-8 border-double border-indigo-900/30 relative overflow-hidden"
          >
            {/* Corner Ornamental Accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-600" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-600" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-600" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-600" />

            {/* Inner certificate content */}
            <div className="text-center space-y-4">
              
              {/* Seal & Logo */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md border-2 border-amber-200">
                  ES
                </div>
              </div>

              <div className="uppercase tracking-[0.25em] text-[11px] font-bold text-slate-500">
                EVENTSPHERE COLLEGIATE CONSORTIUM
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 uppercase">
                Certificate of Completion
              </h1>

              <p className="text-xs text-slate-500 uppercase tracking-widest">
                THIS OFFICIAL RECORD IS PRESENTED TO
              </p>

              {/* Recipient Name in Display Font */}
              <div className="py-2">
                <h2 className="text-2xl sm:text-3xl font-black font-display text-indigo-900 border-b-2 border-indigo-950/20 inline-block px-8 pb-1">
                  {certificate.recipientName}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                For successful participation, active collaboration, and technical achievement in the official collegiate program:
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {certificate.eventName}
              </h3>

              {/* Signatures & Seal Row */}
              <div className="pt-8 grid grid-cols-3 items-end text-center text-xs">
                <div className="border-t border-slate-300 pt-2 mx-4">
                  <span className="font-bold text-slate-900 block font-serif italic text-sm">
                    {certificate.organizer}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Authorized Organizer
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500/60 flex items-center justify-center text-amber-600">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <span className="text-[9px] font-bold text-amber-700 tracking-wider mt-1 uppercase">
                    Official Gold Seal
                  </span>
                </div>

                <div className="border-t border-slate-300 pt-2 mx-4">
                  <span className="font-bold text-slate-900 block font-mono text-xs">
                    {certificate.issueDate}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Date of Certification
                  </span>
                </div>
              </div>

              {/* Verification Credential Footer */}
              <div className="pt-6 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span>Verification ID: {certificate.credentialId}</span>
                <span>eventsphere.edu/verify</span>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Official verifiable credential linked to your Event Passport.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

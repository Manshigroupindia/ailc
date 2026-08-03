import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';
import { membershipBenefitsData } from '@/data/mockData';
import { useModal } from '@/context/ModalContext';

const iconMap = {
  ShieldCheck: ShieldCheck,
  BookOpen: BookOpen,
  Calendar: Calendar,
};

export const MembershipSection = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const { openModal } = useModal();

  const handleStartApplication = (e) => {
    e.preventDefault();
    if (!fullName || !email || !enrollmentNo) return;

    openModal({
      title: 'Application Initiated',
      content: (
        <div className="space-y-4 text-center py-4">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
          <h3 className="font-headline-sm text-primary text-xl font-bold">Thank you, {fullName}!</h3>
          <p className="text-body-md text-on-surface-variant">
            Your membership application (Enrollment: <strong>{enrollmentNo}</strong>) has been recorded. Verification email sent to <strong className="text-primary">{email}</strong>.
          </p>
        </div>
      ),
    });
    setFullName('');
    setEmail('');
    setEnrollmentNo('');
  };

  return (
    <section id="membership" className="py-xl bg-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-[#000d25] text-white rounded-3xl p-6 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-xl shadow-2xl items-center">
          {/* Left Column: Member Benefits */}
          <div>
            <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest block mb-2">
              MEMBER BENEFITS
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
              Join a Network of 50,000+ Legal Professionals
            </h2>

            <div className="space-y-6 mb-8 sm:mb-10">
              {membershipBenefitsData.map((b) => {
                const IconComp = iconMap[b.icon] || ShieldCheck;
                return (
                  <div key={b.id} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#ffe08d]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-white mb-1">{b.title}</h4>
                      <p className="text-xs text-white/70 leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Translucent Quote Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white/80 italic mb-6 lg:mb-0">
              "AILC membership connects you with top legal minds across India, facilitating career growth, advocacy, and nationwide professional support."
            </div>
          </div>

          {/* Right Column: White Application Card */}
          <div className="bg-white text-on-surface rounded-2xl p-6 sm:p-10 shadow-xl border border-surface-variant">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-1">JOIN TODAY</h3>
            <p className="text-xs text-outline mb-6">Start your membership application today.</p>

            <form onSubmit={handleStartApplication} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name as per Bar Council"
                  className="w-full bg-[#f8f9fb] border border-outline-variant rounded-xl p-3.5 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary text-on-surface"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-[#f8f9fb] border border-outline-variant rounded-xl p-3.5 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary text-on-surface"
                />
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={enrollmentNo}
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  placeholder="State Bar Council Enrollment No. (e.g. D/1234/2015)"
                  className="w-full bg-[#f8f9fb] border border-outline-variant rounded-xl p-3.5 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary text-on-surface"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#000d25] text-white hover:bg-opacity-90 font-semibold rounded-full py-3.5 text-xs uppercase tracking-wider transition-all shadow-md mt-2"
              >
                START APPLICATION
              </button>
            </form>

            <p className="text-[11px] text-center text-outline mt-4">
              Annual Fee: ₹1500 • Verification: 7-10 Days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

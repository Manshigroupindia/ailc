import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, BookOpen, Calendar, CheckCircle2, X, Sparkles } from 'lucide-react';
import { membershipBenefitsData } from '@/data/mockData';
import { db, collection, addDoc, serverTimestamp } from '@/services/firebase';

const iconMap = {
  ShieldCheck: ShieldCheck,
  BookOpen: BookOpen,
  Calendar: Calendar,
};

export const MembershipSection = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');

  // Inline Validation State
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success Modal & Confetti State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auto-close modal after 6 seconds
  useEffect(() => {
    let timer;
    if (showSuccessModal) {
      timer = setTimeout(() => {
        handleCloseSuccessModal();
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessModal]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setFullName('');
    setEmail('');
    setEnrollmentNo('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!enrollmentNo.trim()) newErrors.enrollmentNo = 'Bar Council Enrollment Number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartApplication = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Save application to Firestore
      await addDoc(collection(db, 'membership_applications'), {
        fullName: fullName.trim(),
        email: email.trim(),
        enrollmentNo: enrollmentNo.trim(),
        submittedAt: serverTimestamp(),
        status: 'New',
      });
    } catch (err) {
      console.warn('Firestore fallback timestamp used for membership application:', err);
      try {
        await addDoc(collection(db, 'membership_applications'), {
          fullName: fullName.trim(),
          email: email.trim(),
          enrollmentNo: enrollmentNo.trim(),
          submittedAt: new Date().toISOString(),
          status: 'New',
        });
      } catch (e) {
        console.error('Membership submission error:', e);
      }
    } finally {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }
  };

  return (
    <section id="membership" className="py-xl bg-white font-body">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-[#000d25] text-white rounded-3xl p-6 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-xl shadow-2xl items-center relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffe08d]/10 rounded-full blur-3xl pointer-events-none" />

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
          <div className="bg-white text-on-surface rounded-3xl p-6 sm:p-10 shadow-xl border border-surface-variant relative z-10">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-1">JOIN TODAY</h3>
            <p className="text-xs text-outline mb-6">Start your membership application today.</p>

            <form onSubmit={handleStartApplication} className="space-y-4" noValidate>
              {/* Full Name Field */}
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: null });
                  }}
                  placeholder="Full Name as per Bar Council"
                  className={`w-full bg-[#f8f9fb] border ${
                    errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant focus:ring-[#000d25]'
                  } rounded-xl p-3.5 text-xs sm:text-sm outline-none focus:ring-2 transition-all text-on-surface`}
                />
                {errors.fullName && (
                  <p className="text-[11px] font-medium text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Address Field */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  placeholder="Email Address"
                  className={`w-full bg-[#f8f9fb] border ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant focus:ring-[#000d25]'
                  } rounded-xl p-3.5 text-xs sm:text-sm outline-none focus:ring-2 transition-all text-on-surface`}
                />
                {errors.email && (
                  <p className="text-[11px] font-medium text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Enrollment Number Field */}
              <div>
                <input
                  type="text"
                  value={enrollmentNo}
                  onChange={(e) => {
                    setEnrollmentNo(e.target.value);
                    if (errors.enrollmentNo) setErrors({ ...errors, enrollmentNo: null });
                  }}
                  placeholder="State Bar Council Enrollment No. (e.g. D/1234/2015)"
                  className={`w-full bg-[#f8f9fb] border ${
                    errors.enrollmentNo ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant focus:ring-[#000d25]'
                  } rounded-xl p-3.5 text-xs sm:text-sm outline-none focus:ring-2 transition-all text-on-surface`}
                />
                {errors.enrollmentNo && (
                  <p className="text-[11px] font-medium text-red-500 mt-1">{errors.enrollmentNo}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#000d25] hover:bg-[#002256] text-white disabled:opacity-60 font-semibold rounded-full py-3.5 text-xs uppercase tracking-wider transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? 'SUBMITTING APPLICATION...' : 'START APPLICATION'}
              </button>
            </form>

            <div className="text-[11px] text-center text-outline mt-5 pt-3 border-t border-surface-variant space-y-0.5">
              <span className="font-semibold text-primary block">Application Review Time:</span>
              <span className="text-outline block">Approximately 7–10 Working Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM SUCCESS MODAL WITH CONFETTI ANIMATION */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseSuccessModal}
              className="fixed inset-0 bg-[#000d25]/80 backdrop-blur-md"
            />

            {/* Confetti Particles Container */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * (window.innerWidth || 800),
                    y: -20,
                    scale: Math.random() * 0.8 + 0.4,
                    rotate: 0,
                  }}
                  animate={{
                    y: window.innerHeight || 800,
                    rotate: 360,
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2.5,
                    ease: 'linear',
                    repeat: Infinity,
                    delay: Math.random() * 1.5,
                  }}
                  className="absolute w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: ['#ffe08d', '#000d25', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'][i % 6],
                  }}
                />
              ))}
            </div>

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-surface-variant max-w-lg w-full p-6 sm:p-8 text-center z-50 overflow-hidden font-body space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseSuccessModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-surface-container hover:bg-surface-variant text-primary transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Animated Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-[#000d25] text-[#ffe08d] flex items-center justify-center mx-auto shadow-xl border-4 border-[#ffe08d]/30"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              {/* Heading & Content */}
              <div className="space-y-3">
                <h2 className="font-display text-3xl font-bold text-primary flex items-center justify-center gap-2">
                  <span>Thank You!</span>
                  <Sparkles className="w-6 h-6 text-[#ffe08d]" />
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Your membership application has been successfully submitted.
                </p>
                <p className="text-xs text-outline leading-relaxed">
                  Our AILC Membership Team will review your application and contact you shortly.
                </p>
              </div>

              {/* Legal Fraternity Quote */}
              <div className="p-4 rounded-2xl bg-[#f8f9fb] border border-surface-variant italic text-xs text-primary font-serif">
                "We appreciate your commitment to strengthening justice and the legal fraternity."
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={handleCloseSuccessModal}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#000d25] text-white hover:bg-secondary hover:text-[#000d25] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MembershipSection;

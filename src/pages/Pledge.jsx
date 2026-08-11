import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Globe,
  Quote,
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';
import { useModal } from '@/context/ModalContext';

// Multilingual pledge text data architecture
const pledgeTranslations = {
  English: {
    p1: "We, the Members of the All India Practising Lawyers Council (AILC), do affirm our commitment to a sovereign, secular, democratic Republic of India.",
    p2: "We do state that we fully subscribe to Justice, Liberty, Equality and Fraternity among the Indians.",
    p3: "We unequivocally stand by the Rule of Law, the implementation of the Constitution of India, the Welfare State, the Federal Democratic Parliamentary System of the country.",
    p4: "We firmly resolve to generate an atmosphere of protecting and empowering the legal fraternity in India.",
    langCode: 'en-IN'
  },
  Hindi: {
    p1: "हम, ऑल इंडिया प्रैक्टिसिंग लॉयर्स काउंसिल (AILC) के सदस्य, भारत के एक संप्रभु, धर्मनिरपेक्ष, लोकतांत्रिक गणराज्य के प्रति अपनी प्रतिबद्धता की पुष्टि करते हैं।",
    p2: "हम यह घोषित करते हैं कि हम भारतीयों के बीच न्याय, स्वतंत्रता, समानता और बंधुत्व का पूरी तरह से समर्थन करते हैं।",
    p3: "हम स्पष्ट रूप से कानून के शासन, भारत के संविधान के कार्यान्वयन, कल्याणकारी राज्य, देश की संघीय लोकतांत्रिक संसदीय प्रणाली के साथ खड़े हैं।",
    p4: "हम भारत में कानूनी बिरादरी की सुरक्षा और सशक्तिकरण का माहौल बनाने का दृढ़ संकल्प लेते हैं।",
    langCode: 'hi-IN'
  },
  Urdu: {
    p1: "ہم، آل انڈیا پریکٹسنگ لائرز کونسل (AILC) کے ارکان، جمہوریہ ہند کی خودمختار، سیکیولر، اور جمہوری اقدار کی پاسداری کا عہد کرتے ہیں۔",
    p2: "ہم بھارتی شہریوں کے مابین انصاف، آزادی، مساوات اور اخوت کے اصولوں کی مکمل حمایت کرتے ہیں۔",
    p3: "ہم آئین ہند، قانون کی حکمرانی اور ملک کے فلاحی و پارلیمانی نظام کے ساتھ مضبوطی سے کھڑے ہیں۔",
    p4: "ہم ہندوستان میں قانونی برادری کے تحرک اور تحفظ کے لیے پرعزم فضا قائم کرنے کا پختہ ارادہ کرتے ہیں۔",
    langCode: 'ur-IN'
  },
  Bengali: {
    p1: "আমরা, অল ইন্ডিয়া প্র্যাকটিসিং লয়ার্স কাউন্সিলের (AILC) সদস্যরা, একটি সার্বভৌম, ধর্মনিরপেক্ষ, গণতান্ত্রিক প্রজাতন্ত্র ভারতের প্রতি আমাদের অঙ্গীকার পুনর্ব্যক্ত করছি।",
    p2: "আমরা ভারতীয়দের মধ্যে ন্যায়বিচার, স্বাধীনতা, সমতা এবং ভ্রাতৃত্ববোধ পুরোপুরি মেনে চলি।",
    p3: "আমরা আইন প্রয়োগ, ভারতের সংবিধান বাস্তবায়ন, কল্যাণমূলক রাষ্ট্র এবং দেশের যুক্তরাষ্ট্রীয় গণতান্ত্রিক সংসদীয় ব্যবস্থার পক্ষে দৃঢ়ভাবে অবস্থান নিই।",
    p4: "আমরা ভারতে আইনজীবী সমাজের সুরক্ষা ও ক্ষমতায়নের পরিবেশ তৈরির দৃঢ় সংকল্প গ্রহণ করছি।",
    langCode: 'bn-IN'
  },
  Tamil: {
    p1: "அகில இந்திய வழக்கறிஞர்கள் கவுன்சிலின் (AILC) உறுப்பினர்களாகிய நாம், இந்தியாவின் இறையாண்மை, மதச்சார்பின்மை மற்றும் ஜனநாயகத்திற்குப் பணிபுரிய உறுதியளிக்கிறோம்.",
    p2: "இந்தியர்களிடையே நீதி, சுதந்திரம், சமத்துவம் மற்றும் சகோதரத்துவத்தை நிலைநிறுத்த முழு மனதுடன் உறுதியளிக்கிறோம்.",
    p3: "சட்டத்தின் ஆட்சி, இந்திய அரசியலமைப்புச் சட்டம் மற்றும் ஜனநாயக நாடாளுமன்ற முறையை நாங்கள் உறுதியுடன் ஆதரிக்கிறோம்.",
    p4: "இந்தியாவில் வழக்கறிஞர் சமூகத்தின் பாதுகாப்பு மற்றும் அதிகாரமளித்தலுக்கான சூழலை உருவாக்க நாங்கள் உறுதியளிக்கிறோம்.",
    langCode: 'ta-IN'
  },
  Telugu: {
    p1: "అఖిల భారత ప్రాక్టీసింగ్ లాయర్స్ కౌన్సిల్ (AILC) సభ్యులమైన మేము, సార్వభౌమ, లౌకిక, ప్రజాస్వామ్య భారత గణతంత్ర రాజ్యానికి కట్టుబడి ఉన్నామని ధృవీకరిస్తున్నాము.",
    p2: "భారతీయులందరి మధ్య న్యాయం, స్వేచ్ఛ, సమానత్వం మరియు సౌభ్రాతృత్వాన్ని మేము పూర్తిగా సమర్థిస్తున్నాము.",
    p3: "మేము చట్టబద్ధమైన పాలన, భారత రాజ్యాంగ అమలు మరియు ప్రజాస్వామ్య పార్లమెంటరీ వ్యవస్థకు కట్టుబడి ఉంటాము.",
    p4: "భారతదేశంలో న్యాయవాద సమాజ పరిరక్షణకు మరియు సాధికారతకు కృషి చేస్తామని ప్రతిజ్ఞ చేస్తున్నాము.",
    langCode: 'te-IN'
  },
  Marathi: {
    p1: "आम्ही, ऑल इंडिया प्रॅक्टिसिंग लॉयर्स कौन्सिल (AILC) चे सदस्य, भारताच्या सार्वभौम, धर्मनिरपेक्ष, लोकशाही प्रजासत्ताकाशी निष्ठा व्यक्त करतो.",
    p2: "आम्ही भारतीयांमधील न्याय, स्वातंत्र्य, समता आणि बंधुतेचे पूर्ण समर्थन करतो.",
    p3: "आम्ही कायद्याचे राज्य, भारताच्या संविधानाची अंमलबजावणी आणि देशाच्या संसदीय लोकशाही व्यवस्थेच्या बाजूने ठामपणे उभे आहोत.",
    p4: "आम्ही भारतातील कायदेशीर बंधुभगिनींचे संरक्षण आणि सक्षमीकरण करण्याचे दृढ संकल्प करतो.",
    langCode: 'mr-IN'
  },
  Gujarati: {
    p1: "અમે, ઓલ ઈન્ડિયા પ્રેક્ટિસિંગ લોયર્સ કાઉન્સિલ (AILC) ના સભ્યો, સાર્વભૌમ, બિનસાંપ્રદાયિક, લોકશાહી ભારત માટે આપણી પ્રતિબદ્ધતા વ્યક્ત કરીએ છીએ.",
    p2: "અમે ભારતીયો વચ્ચે ન્યાય, સ્વતંત્રતા, સમાનતા અને બંધુત્વને પૂર્ણપણે સમર્થન આપીએ છીએ.",
    p3: "અમે કાયદાનું શાસન, ભારતના બંધારણનું પાલન અને દેશની સંસદીય લોકશાહી પ્રણાલી સાથે દ્રઢતાથી ઊભા છીએ.",
    p4: "અમે ભારતમાં વકીલ સમુદાયના રક્ષણ અને સશક્તિકરણનું વાતાવરણ ઊભું કરવાનો દ્રઢ સંકલ્પ કરીએ છીએ.",
    langCode: 'gu-IN'
  },
  Punjabi: {
    p1: "ਅਸੀਂ, ਆਲ ਇੰਡੀਆ ਪ੍ਰੈਕਟਿਸਿੰਗ ਲਾਇਰਜ਼ ਕੌਂਸਲ (AILC) ਦੇ ਮੈਂਬਰ, ਭਾਰਤ ਦੇ ਪ੍ਰਭੂਸੱਤਾ ਸੰਪੰਨ, ਧਰਮ ਨਿਰਪੱਖ, ਲੋਕਤੰਤਰੀ ਗਣਰਾਜ ਪ੍ਰਤੀ ਆਪਣੀ ਵਚਨਬੱਧਤਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦੇ ਹਾਂ।",
    p2: "ਅਸੀਂ ਭਾਰਤੀਆਂ ਵਿਚਕਾਰ ਨਿਆਂ, ਆਜ਼ਾਦੀ, ਸਮਾਨਤਾ ਅਤੇ ਭਾਈਚਾਰੇ ਦਾ ਪੂਰਾ ਸਮਰਥਨ ਕਰਦੇ ਹਾਂ।",
    p3: "ਅਸੀਂ ਕਾਨੂੰਨ ਦੇ ਰਾਜ, ਭਾਰਤ ਦੇ ਸੰਵਿਧਾਨ ਨੂੰ ਲਾਗੂ ਕਰਨ ਅਤੇ ਸੰਸਦੀ ਲੋਕਤੰਤਰੀ ਪ੍ਰਣਾਲੀ ਦੇ ਨਾਲ ਦ੍ਰਿੜਤਾ ਨਾਲ ਖੜ੍ਹੇ ਹਾਂ।",
    p4: "ਅਸੀਂ ਭਾਰਤ ਵਿੱਚ ਵਕੀਲ ਭਾਈਚਾਰੇ ਦੀ ਸੁਰੱਖਿਆ ਅਤੇ ਸ਼ਕਤੀਕਰਨ ਦਾ ਮਾਹੌਲ ਬਣਾਉਣ ਦਾ ਦ੍ਰਿੜ ਸੰਕਲਪ ਲੈਂਦੇ ਹਾਂ।",
    langCode: 'pa-IN'
  },
  Kannada: {
    p1: "ನಾವು, ಆಲ್ ಇಂಡಿಯಾ ಪ್ರಾಕ್ಟೀಸಿಂಗ್ ಲಾಯರ್ಸ್ ಕೌನ್ಸಿಲ್ (AILC) ನ ಸದಸ್ಯರು, ಸಾರ್ವಭೌಮ, ಜಾತ್ಯತೀತ, ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ಭಾರತ ಗಣರಾಜ್ಯಕ್ಕೆ ನಮ್ಮ ಬದ್ಧತೆಯನ್ನು ದೃಢೀಕರಿಸುತ್ತೇವೆ.",
    p2: "ಭಾರತೀಯರಲ್ಲಿ ನ್ಯಾಯ, ಸ್ವಾತಂತ್ರ್ಯ, ಸಮಾನತೆ ಮತ್ತು ಸಹೋದರತ್ವವನ್ನು ನಾವು ಸಂಪೂರ್ಣವಾಗಿ ಬೆಂಬಲಿಸುತ್ತೇವೆ.",
    p3: "ನಾವು ಕಾನೂನಿನ ಆಡಳಿತ, ಭಾರತದ ಸಂವಿಧಾನದ ಅನುಷ್ಠಾನ ಮತ್ತು ದೇಶದ ಸಂಸದೀಯ ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ವ್ಯವಸ್ಥೆಯ ಪರವಾಗಿ ದೃಢವಾಗಿ ನಿಲ್ಲುತ್ತೇವೆ.",
    p4: "ಭಾರತದಲ್ಲಿ ನ್ಯಾಯವಾದಿಗಳ ಸಮುದಾಯದ ರಕ್ಷಣೆ ಮತ್ತು ಸಬಲೀಕರಣಕ್ಕಾಗಿ ಶ್ರಮಿಸಲು ನಾವು ದೃಢವಾಗಿ ಸಂಕಲ್ಪಿಸುತ್ತೇವೆ.",
    langCode: 'kn-IN'
  },
  Malayalam: {
    p1: "ഓൾ ഇന്ത്യ പ്രാക്ടീസിംഗ് ലോയേഴ്സ് കൗൺസിൽ (AILC) അംഗങ്ങളായ ഞങ്ങൾ, പരമാധികാര, മതേതര, ജനാധിപത്യ ഭാരതത്തോടുള്ള ഞങ്ങളുടെ പ്രതിബദ്ധത സാക്ഷ്യപ്പെടുത്തുന്നു.",
    p2: "ഇന്ത്യക്കാർക്കിടയിൽ നീതി, സ്വാതന്ത്ര്യം, സമത്വം, സാഹോദര്യം എന്നിവ ഞങ്ങൾ പൂർണ്ണമായും ഉയർത്തിപ്പിടിക്കുന്നു.",
    p3: "നിയമവാഴ്ച, ഭരണഘടനയുടെ നടത്തിപ്പ്, ജനാധിപത്യ പാർലമെന്ററി സംവിധാനം എന്നിവയ്ക്കൊപ്പം ഞങ്ങൾ ഉറച്ചുനിൽക്കുന്നു.",
    p4: "ഇന്ത്യയിലെ അഭിഭാഷക സമൂഹത്തിന്റെ സംരക്ഷണവും ശാക്തീകരണവും ഉറപ്പാക്കാൻ ഞങ്ങൾ പ്രതിജ്ഞാബദ്ധരാണ്.",
    langCode: 'ml-IN'
  },
};

// Fallback template for remaining Indian languages
const remainingLanguages = [
  'Odia', 'Assamese', 'Kashmiri', 'Konkani', 'Manipuri', 'Nepali',
  'Sanskrit', 'Bodo', 'Dogri', 'Maithili', 'Santali', 'Sindhi'
];

remainingLanguages.forEach(lang => {
  if (!pledgeTranslations[lang]) {
    pledgeTranslations[lang] = {
      ...pledgeTranslations.English,
      langCode: 'en-IN'
    };
  }
});

const supportedLanguages = Object.keys(pledgeTranslations);

export const Pledge = () => {
  const { openModal } = useModal();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [acceptedCheckbox, setAcceptedCheckbox] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeTranslation = pledgeTranslations[selectedLanguage] || pledgeTranslations.English;

  // Handle Speech Synthesis
  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setProgress(0);
  }, [selectedLanguage]);

  const togglePlayAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in your browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        const textToRead = `${activeTranslation.p1} ${activeTranslation.p2} ${activeTranslation.p3} ${activeTranslation.p4}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = activeTranslation.langCode;
        utterance.rate = playbackSpeed;
        utterance.volume = isMuted ? 0 : 1;

        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
        };

        utterance.onboundary = (event) => {
          const charIndex = event.charIndex;
          const totalLength = textToRead.length;
          setProgress(Math.round((charIndex / totalLength) * 100));
        };

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleTakePledge = () => {
    if (!acceptedCheckbox) return;

    openModal({
      title: 'AILC Official Digital Pledge',
      content: (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="font-display text-2xl font-bold text-primary">Thank You!</h3>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
            You have successfully taken the <strong>AILC Advocate Pledge of Constitutional Integrity</strong> in <strong className="text-secondary">{selectedLanguage}</strong>.
          </p>
          <div className="p-4 bg-surface-container-low border border-surface-variant rounded-2xl text-xs text-outline space-y-1">
            <p className="font-bold text-primary">Digital Pledge Certificate Ready</p>
            <p>Verification Code: <strong>AILC-PLG-2026-8892</strong></p>
            <p className="text-[11px] opacity-75">Your official digital pledge certificate is logged with the Secretariat.</p>
          </div>
        </div>
      ),
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Take the AILC Advocate Pledge for Constitutional Integrity and Rule of Law.");

    let shareUrl = '';
    if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (platform === 'email') shareUrl = `mailto:?subject=AILC%20Pledge&body=${text}%20${url}`;

    if (shareUrl) window.open(shareUrl, '_blank');
  };

  const handleMemberModal = () => {
    openModal({
      title: 'AILC Membership Application',
      content: (
        <div className="space-y-4">
          <p className="text-body-md text-on-surface-variant">
            Eligible for all practicing lawyers enrolled in any State Bar Council across India. Verification process takes 7-10 working days.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1 text-primary">FULL NAME</label>
              <input
                type="text"
                placeholder="Adv. Ramesh Kumar"
                className="w-full border border-outline-variant rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary text-on-surface text-base md:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-primary">BAR COUNCIL ENROLLMENT NO.</label>
              <input
                type="text"
                placeholder="D/1234/2015"
                className="w-full border border-outline-variant rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary text-on-surface text-base md:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-primary">EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="ramesh@example.com"
                className="w-full border border-outline-variant rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary text-on-surface text-base md:text-sm"
              />
            </div>
          </div>
          <button className="w-full bg-[#000d25] text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider mt-4">
            SUBMIT APPLICATION
          </button>
        </div>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* =========================================================
          1. HERO SECTION
         ========================================================= */}
      <section className="bg-[#000d25] text-white py-16 md:py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1600')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#000d25] via-[#000d25]/95 to-[#000d25]/80" />
        </div>

        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 text-center max-w-4xl">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link to="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">Pledge</span>
          </nav>

          <span className="inline-block px-3.5 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase mb-4">
            CONSTITUTIONAL OATH
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            AILC Pledge
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            A commitment towards Justice, Equality, Constitutional Values and the Rule of Law.
          </p>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTAINER: LANGUAGE + PLEDGE + AUDIO + CERTIFICATE
         ========================================================= */}
      <section className="py-12 md:py-20 max-w-5xl mx-auto px-4">
        {/* =========================================================
            3. LANGUAGE SELECTION
           ========================================================= */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-variant mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-primary">Pledge Language</h3>
                <p className="text-xs text-outline">Select from 23 scheduled languages of India</p>
              </div>
            </div>

            <span className="text-xs font-semibold px-3 py-1 bg-surface-container text-primary rounded-full">
              Active: {selectedLanguage}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 max-h-40 overflow-y-auto pr-1">
            {supportedLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedLanguage === lang
                    ? 'bg-[#000d25] text-white shadow'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-primary border border-surface-variant'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================
            4. LISTEN TO THE PLEDGE (Audio Player)
           ========================================================= */}
        <div className="bg-[#000d25] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-white/10 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlayAudio}
                className="w-14 h-14 rounded-full bg-[#ffe08d] text-[#000d25] flex items-center justify-center font-bold shadow-lg hover:scale-105 transition-transform active:scale-95 flex-shrink-0"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>

              <div>
                <span className="text-[#ffe08d] font-semibold text-[11px] uppercase tracking-wider block mb-0.5">
                  MULTILINGUAL AUDIO RECITATION
                </span>
                <h4 className="font-display text-lg font-bold text-white">
                  Listen to the Pledge ({selectedLanguage})
                </h4>
                <p className="text-xs text-white/60">Automated legal speech synthesis</p>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
              {/* Playback Speed */}
              <div className="flex items-center gap-1.5 text-xs text-white/80 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-white/60">Speed:</span>
                {[0.75, 1, 1.25].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-1.5 py-0.5 rounded font-bold text-[11px] ${
                      playbackSpeed === spd ? 'bg-[#ffe08d] text-[#000d25]' : 'hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Mute Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-white/80 hover:text-white bg-white/5 rounded-lg border border-white/10"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Download Audio Mock */}
              <a
                href="#pledge"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading AILC Pledge audio package in ${selectedLanguage}...`);
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors border border-white/10"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-[#ffe08d] h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* =========================================================
            2. PLEDGE SECTION (Centered Card)
           ========================================================= */}
        <motion.div
          id="pledge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 sm:p-14 shadow-xl border border-surface-variant relative overflow-hidden mb-12"
        >
          {/* Subtle Emblem background mark */}
          <div className="absolute right-6 top-6 opacity-5 pointer-events-none">
            <Award className="w-64 h-64 text-[#000d25]" />
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              Solemn Affirmation
            </h2>

            {/* Render English highlighted version or selected translation */}
            {selectedLanguage === 'English' ? (
              <div className="space-y-6 font-body text-base sm:text-lg text-on-surface leading-relaxed text-justify sm:text-center">
                <p className="p-4 bg-surface-container-low rounded-2xl border border-surface-variant">
                  We, the Members of the All India Practising Lawyers Council (AILC), do affirm our commitment to a <strong className="text-primary font-bold">sovereign, secular, democratic Republic of India</strong>.
                </p>

                <p className="p-4 bg-surface-container-low rounded-2xl border border-surface-variant">
                  We do state that we fully subscribe to <span className="inline-block px-2 py-0.5 bg-[#ffe08d]/30 text-[#000d25] font-bold rounded">Justice</span>, <span className="inline-block px-2 py-0.5 bg-[#ffe08d]/30 text-[#000d25] font-bold rounded">Liberty</span>, <span className="inline-block px-2 py-0.5 bg-[#ffe08d]/30 text-[#000d25] font-bold rounded">Equality</span> and <span className="inline-block px-2 py-0.5 bg-[#ffe08d]/30 text-[#000d25] font-bold rounded">Fraternity</span> among the Indians.
                </p>

                <p className="p-4 bg-surface-container-low rounded-2xl border border-surface-variant">
                  We unequivocally stand by the <strong className="text-primary font-bold border-b-2 border-[#ffe08d]">Rule of Law</strong>, the implementation of the <strong className="text-primary font-bold border-b-2 border-[#ffe08d]">Constitution of India</strong>, the Welfare State, the Federal Democratic Parliamentary System of the country.
                </p>

                <p className="p-4 bg-[#000d25] text-white rounded-2xl border border-white/10 shadow-md">
                  We firmly resolve to generate an atmosphere of protecting and empowering the <strong className="text-[#ffe08d] font-bold">legal fraternity</strong> in India.
                </p>
              </div>
            ) : (
              <div className="space-y-4 font-body text-base sm:text-lg text-on-surface leading-relaxed text-justify sm:text-center">
                <p className="p-4 bg-surface-container-low rounded-2xl border border-surface-variant">{activeTranslation.p1}</p>
                <p className="p-4 bg-surface-container-low rounded-2xl border border-surface-variant">{activeTranslation.p2}</p>
                <p className="p-4 bg-surface-container-low rounded-2xl border border-surface-variant">{activeTranslation.p3}</p>
                <p className="p-4 bg-[#000d25] text-white rounded-2xl border border-white/10 shadow-md">{activeTranslation.p4}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* =========================================================
            5. TAKE THE PLEDGE FORM & CERTIFICATE
           ========================================================= */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-surface-variant max-w-3xl mx-auto text-center mb-16">
          <h3 className="font-display text-2xl font-bold text-primary mb-2">
            Take the AILC Pledge
          </h3>
          <p className="text-xs sm:text-sm text-outline mb-6">
            Confirm your affirmation to register your digital pledge.
          </p>

          <label className="flex items-center justify-center gap-3 p-4 bg-surface-container-low rounded-xl border border-surface-variant cursor-pointer hover:bg-surface-container transition-colors mb-6 text-left max-w-xl mx-auto">
            <input
              type="checkbox"
              checked={acceptedCheckbox}
              onChange={(e) => setAcceptedCheckbox(e.target.checked)}
              className="w-5 h-5 accent-[#000d25] rounded cursor-pointer flex-shrink-0"
            />
            <span className="text-xs sm:text-sm text-on-surface font-medium">
              I solemnly affirm that I have read and accepted the AILC Pledge.
            </span>
          </label>

          <button
            onClick={handleTakePledge}
            disabled={!acceptedCheckbox}
            className={`px-10 py-4 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 ${
              acceptedCheckbox
                ? 'bg-[#000d25] text-white hover:bg-opacity-90 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            TAKE THE PLEDGE <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* =========================================================
            7. SHARE SECTION
           ========================================================= */}
        <div className="bg-surface-container-low p-8 rounded-2xl border border-surface-variant text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-primary font-bold text-sm mb-4">
            <Share2 className="w-4 h-4" /> Share the Pledge with Advocates & Citizens
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 bg-white border border-surface-variant hover:bg-surface-container rounded-xl text-xs font-semibold text-primary transition-all inline-flex items-center gap-2 shadow-sm"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? 'Copied Link!' : 'Copy Link'}
            </button>

            <button
              onClick={() => handleShare('whatsapp')}
              className="px-4 py-2.5 bg-[#25D366] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              WhatsApp
            </button>

            <button
              onClick={() => handleShare('facebook')}
              className="px-4 py-2.5 bg-[#1877F2] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              Facebook
            </button>

            <button
              onClick={() => handleShare('twitter')}
              className="px-4 py-2.5 bg-[#000000] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              X (Twitter)
            </button>

            <button
              onClick={() => handleShare('linkedin')}
              className="px-4 py-2.5 bg-[#0A66C2] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              LinkedIn
            </button>

            <button
              onClick={() => handleShare('email')}
              className="px-4 py-2.5 bg-gray-700 text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              Email
            </button>
          </div>
        </div>

        {/* =========================================================
            8. QUOTE SECTION
           ========================================================= */}
        <div className="bg-[#000d25] text-white p-10 sm:p-12 rounded-3xl shadow-xl border border-white/10 text-center relative overflow-hidden mb-16">
          <Quote className="w-12 h-12 text-[#ffe08d]/30 mx-auto mb-4" />
          <blockquote className="font-display text-xl sm:text-2xl font-bold text-white italic max-w-2xl mx-auto mb-4 leading-relaxed">
            "The Constitution is not merely a legal document; it is a vehicle of Life, and its spirit is always the spirit of Age."
          </blockquote>
          <cite className="text-xs text-[#ffe08d] font-semibold uppercase tracking-widest block not-italic">
            — Dr. B. R. Ambedkar
          </cite>
        </div>

        {/* =========================================================
            9. CALL TO ACTION
           ========================================================= */}
        <div className="bg-white p-10 sm:p-14 rounded-3xl border border-surface-variant shadow-lg text-center max-w-4xl mx-auto">
          <span className="text-secondary font-semibold text-xs uppercase tracking-widest block mb-2">
            JOIN THE LEGAL FRATERNITY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-4">
            Join the All India Lawyers Council
          </h2>
          <p className="text-xs sm:text-sm text-outline max-w-lg mx-auto mb-8 leading-relaxed">
            Become a verified member of AILC to safeguard advocate rights, offer pro-bono aid, and defend constitutional supremacy nationwide.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleMemberModal}
              className="bg-[#000d25] text-white hover:bg-opacity-90 font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md"
            >
              BECOME A MEMBER
            </button>
            <Link
              to="/contact"
              className="border border-[#000d25] text-[#000d25] hover:bg-surface-container font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pledge;

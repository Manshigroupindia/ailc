import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, doc, onSnapshot, setDoc } from '@/services/firebase';
import {
  contactInfoData,
  OFFICIAL_GOOGLE_MAP_URL,
} from '@/data/mockData';

const CmsContext = createContext();

// Initial Default Fallbacks
const defaultContact = {
  phone: '011-46068472',
  altPhone: '',
  whatsapp: '',
  email: 'allindiapractisinglawyers@gmail.com',
  altEmail: '',
  address: 'A-15, (BACK SIDE, GROUND FLOOR), HAZRAT NIZAMUDDIN WEST, NEW DELHI',
  googleMapsUrl: OFFICIAL_GOOGLE_MAP_URL,
  facebook: 'https://www.facebook.com/people/AILC/100090439854062/?mibextid=ZbWKwL',
  instagram: 'https://www.instagram.com/ailc_2023/?igshid=YmMyMTA2M2Y%3D',
  twitter: '',
  linkedin: '',
  youtube: '',
  website: 'https://ailcindia.org',
};

const defaultBranding = {
  logoUrl: '',
  darkLogoUrl: '',
  lightLogoUrl: '',
  faviconUrl: '',
  footerLogoUrl: '',
  organizationTitle: 'ALL INDIA LAWYERS COUNCIL',
};

const defaultSeo = {
  siteTitle: 'All India Lawyers Council (AILC) | Official National Secretariat',
  metaDescription: 'Autonomous Pan-India organization of advocate professionals, former judges, intellectuals, and academicians dedicated to constitutional integrity.',
  keywords: 'All India Lawyers Council, AILC, Indian Advocates, Supreme Court Bar, Legal Aid, Pro Bono Lawyers India',
  ogImageUrl: '',
};

const defaultPeople = [
  {
    id: 'p-1',
    name: 'Hon\'ble Justice Mr. Debasish Kar Gupta',
    designation: 'Former Chief Justice, Calcutta High Court',
    category: 'Leadership',
    state: 'Kolkata, West Bengal',
    description: 'National President, All India Lawyers Council.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752200/Hon_ble_Justice_Mr_Debasish_Kar_Gupta_tprkwv.jpg',
    usedIn: ['About Page', 'Home Hero', 'Patrons Page'],
    displayOrder: 1,
    active: true,
  },
  {
    id: 'p-2',
    name: 'Hon\'ble Justice Mr BG Kolse Patil',
    designation: 'Former Judge, Bombay High Court',
    category: 'Patrons',
    state: 'Maharashtra',
    description: 'Distinguished Constitutional Patron.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752358/Hon_ble_justice_Mr_BG_Kolse_patil_gv24iw.png',
    usedIn: ['Patrons Page'],
    displayOrder: 2,
    active: true,
  },
  {
    id: 'p-3',
    name: 'Dr Pawan Kumar Arya Advocate',
    designation: 'Senior Counsel',
    category: 'Committee',
    state: 'Punjab & Haryana High Court',
    description: 'Senior Legal Faculty & Executive Member.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752356/Dr_Pawan_Kumar_Arya_Advocat_ujuzzj.png',
    usedIn: ['National Conference', 'Executive Committee'],
    displayOrder: 3,
    active: true,
  },
  {
    id: 'p-4',
    name: 'Adv P Chandrashekhar',
    designation: 'Senior Advocate',
    category: 'Committee',
    state: 'Telangana / AP',
    description: 'State Committee Senior Executive.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752354/Adv_P_Chandrashekhar_wbklqc.png',
    usedIn: ['Executive Committee'],
    displayOrder: 4,
    active: true,
  },
  {
    id: 'p-5',
    name: 'Adv R. Sevvilam Parithi',
    designation: 'Senior Counsel',
    category: 'Committee',
    state: 'Tamil Nadu',
    description: 'Madras High Court Senior Practitioner.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752352/Adv_R._Sevvilam_Parithi_ehmrvr.png',
    usedIn: ['Executive Committee'],
    displayOrder: 5,
    active: true,
  },
  {
    id: 'p-6',
    name: 'Adv Khwaja Jaweed Yusuf',
    designation: 'Senior Advocate',
    category: 'Committee',
    state: 'West Bengal',
    description: 'Calcutta High Court Practitioner.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752351/Adv_Khwaja_Jaweed_Yusuf_nyy9vn.png',
    usedIn: ['Executive Committee'],
    displayOrder: 6,
    active: true,
  },
  {
    id: 'p-7',
    name: 'Adv Sharfuddin Ahmad',
    designation: 'Secretary General',
    category: 'Leadership',
    state: 'Delhi / National',
    description: 'Pioneer of Pan-India advocate welfare and human rights litigation.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752458/Adv_Sharfuddin_Ahmad_smncrz.jpg',
    usedIn: ['Home Hero', 'About Page', 'Executive Committee', 'National Conference', 'Patrons Page'],
    displayOrder: 7,
    active: true,
  },
  {
    id: 'p-8',
    name: 'Adv PK Ibrahim',
    designation: 'Senior Advocate',
    category: 'Committee',
    state: 'Kerala',
    description: 'Kerala High Court Senior Practitioner.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752499/Adv_PK_Ibrahim_okmwss.png',
    usedIn: ['Executive Committee'],
    displayOrder: 8,
    active: true,
  },
  {
    id: 'p-9',
    name: 'Adv Santosh Laxman Jadhav',
    designation: 'National Secretary',
    category: 'Leadership',
    state: 'Maharashtra',
    description: 'National Executive Secretary, AILC.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752665/Adv_Santosh_Laxman_Jadhav_eto8ug.png',
    usedIn: ['Executive Committee', 'Leadership Page'],
    displayOrder: 9,
    active: true,
  },
  {
    id: 'p-10',
    name: 'Adv Bhupendra D. Nishad',
    designation: 'Advocate',
    category: 'Committee',
    state: 'Uttar Pradesh',
    description: 'Executive Committee Member.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752665/Adv_Bhupendra_D._Nishad_tnkjej.png',
    usedIn: ['Executive Committee'],
    displayOrder: 10,
    active: true,
  },
  {
    id: 'p-11',
    name: 'Adv. Haider Ali',
    designation: 'Advocate',
    category: 'Committee',
    state: 'Delhi',
    description: 'Legal Secretariat Member.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752663/Adv._Haider_Ali_d85i9h.png',
    usedIn: ['Executive Committee'],
    displayOrder: 11,
    active: true,
  },
  {
    id: 'p-12',
    name: 'Adv. Lakshmi Raj',
    designation: 'National Secretary',
    category: 'Leadership',
    state: 'Tamil Nadu (Chennai)',
    description: 'Anchored National Conference 2023 at IIC New Delhi.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752618/Adv._Lakshmi_Raj_jgshxw.png',
    usedIn: ['National Conference', 'Executive Committee'],
    displayOrder: 12,
    active: true,
  },
  {
    id: 'p-13',
    name: 'Adv. Amir Khan',
    designation: 'Advocate',
    category: 'Committee',
    state: 'Rajasthan',
    description: 'State Executive Member.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752618/Adv._Amir_Khan_eujy10.png',
    usedIn: ['Executive Committee'],
    displayOrder: 13,
    active: true,
  },
  {
    id: 'p-14',
    name: 'Adv. Najma Akhtar',
    designation: 'Advocate',
    category: 'Committee',
    state: 'Delhi',
    description: 'Executive Committee Member.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752617/Adv._Najma_Akhtar_onlqto.png',
    usedIn: ['Executive Committee'],
    displayOrder: 14,
    active: true,
  },
  {
    id: 'p-15',
    name: 'Hon\'ble Justice Mr Ravindra Singh',
    designation: 'Former Justice, Allahabad High Court',
    category: 'Patrons',
    state: 'Uttar Pradesh',
    description: 'Distinguished Patron.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752797/Hon_ble_Justice_Mr._Ravindra_Singh_nuxxyg.jpg',
    usedIn: ['Patrons Page'],
    displayOrder: 15,
    active: true,
  },
  {
    id: 'p-16',
    name: 'Adv KM Ashraf',
    designation: 'Senior Advocate',
    category: 'Committee',
    state: 'Bihar',
    description: 'Patna High Court Senior Practitioner.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785752972/Adv_KM_Ashraf_uwabhr.png',
    usedIn: ['Executive Committee'],
    displayOrder: 16,
    active: true,
  },
  {
    id: 'p-17',
    name: 'Adv Huma Yuns',
    designation: 'Advocate',
    category: 'Committee',
    state: 'Delhi',
    description: 'Supreme Court & High Court Advocate.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785753062/Adv_Huma_Yuns_juvf65.jpg',
    usedIn: ['Executive Committee'],
    displayOrder: 17,
    active: true,
  },
  {
    id: 'p-18',
    name: 'Adv Raja Mohammad',
    designation: 'Advocate',
    category: 'Committee',
    state: 'Telangana',
    description: 'High Court Advocate & State Committee Member.',
    photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785753087/Adv_Raja_Mohammad_s7uuni.png',
    usedIn: ['Executive Committee'],
    displayOrder: 18,
    active: true,
  }
];

const defaultActivityReports = {
  commonReportTitle: 'Common Manipur Mission & Fact-Finding Report',
  commonReportText: 'The All India Lawyers Council (AILC) conducted an independent Pan-India fact-finding mission examining ground realities, displaced families, and constitutional rights in Manipur.',
  visitsTitle: 'Official Delegations & Fact-Finding Visits',
  visitsText: 'Delegation of senior advocates visited affected territories across 19 states to record testimonies and present reports to relevant statutory commissions.',
  locations: {
    Malegaon: 'Legal aid camp and advocate orientation session held in Malegaon.',
    Adharpur: 'Human rights legal awareness workshop conducted in Adharpur.',
    Jharkhand: 'State Bar Council delegation meeting on advocate protection in Ranchi.',
    Delhi: 'National Headquarters assembly and press briefing at Press Club of India.',
    Karnataka: 'High Court advocate welfare summit hosted in Bengaluru.',
    'Tamil Nadu': 'State chapter convention on pro-bono aid in Chennai.',
    Rajasthan: 'District bar council coordination conference in Jaipur.',
    Haryana: 'Constitutional rights awareness forum held in Gurgaon.',
    Manipur: 'Delegation visit assessing legal aid for affected families.',
  }
};

const defaultConference = {
  title: 'National Conference on 26th November 2023',
  subtitle: 'All India Practising Lawyers Council (AILC)',
  badge: 'National Conference • New Delhi • 26 November 2023',
  venue: 'India International Centre, New Delhi',
  presidedBy: 'Hon’ble Justice Mr. Abhay M. Thipsay (Former Justice, Bombay High Court)',
  anchoredBy: 'Adv. Lakshmi Raja (Chennai High Court)',
  summaryText: 'AILC held a successful National Conference on 26th November 2023 at India International Centre, New Delhi, presided over by Hon\'ble Justice Mr. Abhay M. Thipsay, Former Justice of the Bombay High Court.',
};

const defaultHomePage = {
  heroMainHeading: 'ALL INDIA LAWYERS COUNCIL',
  heroHighlightText: 'AUTONOMOUS & SELF-HELP',
  heroSubHeading: 'Pan-India Organization of Advocates',
  heroDescription: 'Uniting advocates, judges, academicians, and legal professionals across 19+ states to protect constitutional integrity and advocate welfare.',
  heroPrimaryBtnText: 'Join Movement',
  heroPrimaryBtnLink: '/membership',
  heroSecondaryBtnText: 'Explore Activities',
  heroSecondaryBtnLink: '/activity-report',
  heroBgImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1600',
  heroMainImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800',
  introTitle: 'About All India Lawyers Council',
  introSubtitle: 'REGISTERED NGO IN DELHI SINCE 2020',
  introDescription: 'The Retired Judges, Former Bureaucrats, Ex Police Officers, Prominent Intellectuals, Academicians, Noted Social and Political Activists of India have also been subscribing and patronising. AILC is an autonomous, self-help and Pan India Organisation of lawyers.',
  introBullets: [
    'Autonomous Pan-India Advocate Network',
    'Free Legal Aid & Fact-Finding Missions',
    'Constitutional Awareness Seminars',
    'Advocate Protection & Welfare Funds'
  ],
  introCtaText: 'Read Full History',
  introCtaLink: '/about',
  introImage: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&q=80&w=800',
  orgTitle: 'Organizational Hierarchy & Governance',
  orgSubtitle: 'DEMOCRATIC & CONSTITUTIONAL STRUCTURE',
  orgDescription: 'Governed by the Central Secretariat, Patrons Council, State Committees, and District Bar Desks across 19 Indian states.',
  orgChartImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1000',
  legalTitle: 'Legal Activities & Fact-Finding',
  legalDescription: 'AILC deploys emergency fact-finding delegations and legal aid teams across India.',
  legalCards: [
    { id: '1', icon: 'Scale', title: 'Fact Finding Missions', description: 'Deploying high-level advocate teams to investigate ground realities.', image: '' },
    { id: '2', icon: 'ShieldCheck', title: 'Advocate Protection', description: 'Defending practicing advocates against harassment and illegal arrests.', image: '' },
    { id: '3', icon: 'Award', title: 'Pro-Bono Legal Aid', description: 'Providing free legal defense to underprivileged victims.', image: '' }
  ],
  eventTitle: 'National Conference on 26th November 2023',
  eventSubtitle: 'ANNUAL SUPREME & HIGH COURT CONVENTION',
  eventDescription: 'Presided over by Hon\'ble Justice Mr. Abhay M. Thipsay at India International Centre, New Delhi.',
  eventDate: '26th November 2023',
  eventTime: '10:00 AM - 05:00 PM',
  eventVenue: 'India International Centre, New Delhi',
  eventBtnText: 'View Conference Details',
  eventBtnLink: '/national-conference-2023',
  eventBannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
  faqTitle: 'Frequently Asked Questions',
  faqDescription: 'Learn more about AILC membership, registration, and legal aid.',
  faqItems: [
    { id: '1', question: 'What is All India Lawyers Council (AILC)?', answer: 'AILC is an autonomous, self-help Pan-India organization of advocates registered under NGO nomenclature in Delhi in 2020.' },
    { id: '2', question: 'How can an advocate join AILC?', answer: 'Advocates practicing in any High Court or District Court of India can apply through the Membership portal or contact state secretaries.' }
  ],
  contactTitle: 'Get in Touch with AILC Secretariat',
  contactDescription: 'Reach out to the Central Secretariat in New Delhi for inquiries, legal aid requests, or membership support.',
  contactFormHeading: 'Send Us a Message',
  contactFormDescription: 'Fill out the form below and our legal secretariat will respond within 24 hours.',
  contactMapImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800',
};

const defaultAboutPage = {
  title: 'About Us',
  subtitle: 'Self-help autonomous Pan-India legal body registered under NGO nomenclature.',
  historyTitle: 'Our History & Registration',
  historyText: 'AILC is an autonomous, self-help and Pan India Organisation of lawyers. It has been registered in the year 2020 as NGO under the nomenclature of "All India Practising Lawyers Council" in Delhi.',
  missionTitle: 'Our Mission',
  missionText: 'To unite legal practitioners across all High Courts and District Courts of India in defense of advocate welfare, human rights, and constitutional values.',
  visionTitle: 'Our Vision',
  visionText: 'A transparent, independent, and resilient legal fraternity capable of providing pro-bono justice to underprivileged citizens without fear or favor.',
  objectivesTitle: 'Objectives of AILC',
  objectivesList: [
    'Protect rights and dignity of practicing advocates across India.',
    'Provide legal aid and fact-finding support for vulnerable communities.',
    'Organize national seminars, judicial awareness camps, and advocate conventions.',
    'Formulate welfare schemes for advocate security and medical assistance.'
  ]
};

const defaultNavigation = {
  footerDescription: 'The Retired Judges, Former Bureaucrats, Ex Police Officers, Prominent Intellectuals, Academicians, Noted Social and Political Activists of India have also been subscribing and patronising. AILC is an autonomous, self-help and Pan India Organisation of lawyers.',
  copyrightNotice: 'Copyright © 2023–2024 All India Lawyers Council. All Rights Reserved.',
  designerText: 'Design by Manshi Group of Services',
  designerUrl: 'https://manshigroup.in',
};

export const CmsProvider = ({ children }) => {
  const [contact, setContact] = useState(defaultContact);
  const [branding, setBranding] = useState(defaultBranding);
  const [seo, setSeo] = useState(defaultSeo);
  const [mediaList, setMediaList] = useState([]);
  const [people, setPeople] = useState(defaultPeople);
  const [patrons, setPatrons] = useState([]);
  const [executiveCommittee, setExecutiveCommittee] = useState([]);
  const [activityReports, setActivityReports] = useState(defaultActivityReports);
  const [conference, setConference] = useState(defaultConference);
  const [homePage, setHomePage] = useState(defaultHomePage);
  const [aboutPage, setAboutPage] = useState(defaultAboutPage);
  const [navigation, setNavigation] = useState(defaultNavigation);
  const [loading, setLoading] = useState(true);

  // Dynamic Browser Favicon Live Updater with Timestamp Cache Busting
  useEffect(() => {
    if (branding?.faviconUrl) {
      const cacheBustedFavicon = `${branding.faviconUrl}${branding.faviconUrl.includes('?') ? '&' : '?'}v=${Date.now()}`;
      
      let linkIcon = document.querySelector("link[rel='icon']");
      let linkShortcut = document.querySelector("link[rel='shortcut icon']");

      if (!linkIcon) {
        linkIcon = document.createElement('link');
        linkIcon.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(linkIcon);
      }
      linkIcon.href = cacheBustedFavicon;

      if (!linkShortcut) {
        linkShortcut = document.createElement('link');
        linkShortcut.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(linkShortcut);
      }
      linkShortcut.href = cacheBustedFavicon;
    }
  }, [branding?.faviconUrl]);

  // Firestore Realtime Snapshots with graceful error handling
  useEffect(() => {
    const handleErr = (name) => (err) => console.warn(`Firestore snapshot warning [${name}]:`, err?.message);

    const unsubContact = onSnapshot(doc(db, 'settings', 'contact'), (d) => d.exists() && setContact({ ...defaultContact, ...d.data() }), handleErr('contact'));
    const unsubBranding = onSnapshot(doc(db, 'settings', 'branding'), (d) => d.exists() && setBranding({ ...defaultBranding, ...d.data() }), handleErr('branding'));
    const unsubSeo = onSnapshot(doc(db, 'settings', 'seo'), (d) => d.exists() && setSeo({ ...defaultSeo, ...d.data() }), handleErr('seo'));
    const unsubMedia = onSnapshot(doc(db, 'media', 'gallery'), (d) => d.exists() && setMediaList(d.data()?.items || []), handleErr('media'));
    const unsubPeople = onSnapshot(doc(db, 'people', 'master'), (d) => d.exists() && setPeople(d.data()?.items || defaultPeople), handleErr('people'));
    const unsubReports = onSnapshot(doc(db, 'activityReports', 'data'), (d) => d.exists() && setActivityReports({ ...defaultActivityReports, ...d.data() }), handleErr('activityReports'));
    const unsubConf = onSnapshot(doc(db, 'conference', 'data'), (d) => d.exists() && setConference({ ...defaultConference, ...d.data() }), handleErr('conference'));
    const unsubHome = onSnapshot(doc(db, 'pages', 'home'), (d) => d.exists() && setHomePage({ ...defaultHomePage, ...d.data() }), handleErr('homePage'));
    const unsubAbout = onSnapshot(doc(db, 'pages', 'about'), (d) => d.exists() && setAboutPage({ ...defaultAboutPage, ...d.data() }), handleErr('aboutPage'));
    const unsubNav = onSnapshot(doc(db, 'pages', 'navigation'), (d) => d.exists() && setNavigation({ ...defaultNavigation, ...d.data() }), handleErr('navigation'));

    setLoading(false);

    return () => {
      unsubContact();
      unsubBranding();
      unsubSeo();
      unsubMedia();
      unsubPeople();
      unsubReports();
      unsubConf();
      unsubHome();
      unsubAbout();
      unsubNav();
    };
  }, []);

  // Sync patrons & executive committee dynamically from People Master
  useEffect(() => {
    if (people && people.length > 0) {
      const activePeople = people.filter((p) => p.active !== false);

      const computedPatrons = activePeople
        .filter((p) => p.category === 'Patrons' || p.usedIn?.includes('Patrons Page'))
        .map((p) => ({
          id: p.id,
          name: p.name,
          role: p.designation,
          description: p.description,
          photoUrl: p.photoUrl,
        }));

      const computedExecutive = activePeople
        .filter((p) => p.category === 'Committee' || p.usedIn?.includes('Executive Committee') || p.category === 'Leadership')
        .map((p) => ({
          id: p.id,
          name: p.name,
          role: p.designation,
          state: p.state || 'National',
          description: p.description,
          photoUrl: p.photoUrl,
        }));

      setPatrons(computedPatrons);
      setExecutiveCommittee(computedExecutive);
    }
  }, [people]);

  // Update Handlers
  const updatePeopleCollection = async (items) => {
    setPeople(items);
    await setDoc(doc(db, 'people', 'master'), { items }, { merge: true });
  };

  const updateContactSettings = async (data) => {
    setContact((prev) => ({ ...prev, ...data }));
    await setDoc(doc(db, 'settings', 'contact'), data, { merge: true });
  };

  const updateBrandingSettings = async (data) => {
    setBranding((prev) => ({ ...prev, ...data }));
    await setDoc(doc(db, 'settings', 'branding'), data, { merge: true });
  };

  const updateSeoSettings = async (data) => {
    setSeo((prev) => ({ ...prev, ...data }));
    await setDoc(doc(db, 'settings', 'seo'), data, { merge: true });
  };

  const updateMediaCollection = async (items) => {
    setMediaList(items);
    await setDoc(doc(db, 'media', 'gallery'), { items }, { merge: true });
  };

  const updatePatronsData = async (items) => {
    setPatrons(items);
    await setDoc(doc(db, 'patrons', 'list'), { items }, { merge: true });
  };

  const updateExecutiveCommittee = async (items) => {
    setExecutiveCommittee(items);
    await setDoc(doc(db, 'executive', 'committee'), { items }, { merge: true });
  };

  const updateActivityReportsData = async (data) => {
    setActivityReports((prev) => ({ ...prev, ...data }));
    await setDoc(doc(db, 'activityReports', 'data'), data, { merge: true });
  };

  const updateConferenceData = async (data) => {
    setConference((prev) => ({ ...prev, ...data }));
    await setDoc(doc(db, 'conference', 'data'), data, { merge: true });
  };

  const updateHomePageData = async (data) => {
    setHomePage((prev) => ({ ...prev, ...data }));
    await setDoc(doc(db, 'pages', 'home'), data, { merge: true });
  };

  const updateAboutPageData = async (data) => {
    setAboutPage((prev) => ({ ...prev, ...data }));
    await setDoc(doc(db, 'pages', 'about'), data, { merge: true });
  };

  const updateNavigationData = async (data) => {
    setNavigation((prev) => ({ ...prev, ...data }));
    await setDoc(doc(db, 'pages', 'navigation'), data, { merge: true });
  };

  return (
    <CmsContext.Provider
      value={{
        contact,
        branding,
        seo,
        mediaList,
        people,
        patrons,
        executiveCommittee,
        activityReports,
        conference,
        homePage,
        aboutPage,
        navigation,
        loading,
        updatePeopleCollection,
        updateContactSettings,
        updateBrandingSettings,
        updateSeoSettings,
        updateMediaCollection,
        updatePatronsData,
        updateExecutiveCommittee,
        updateActivityReportsData,
        updateConferenceData,
        updateHomePageData,
        updateAboutPageData,
        updateNavigationData,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export default CmsProvider;

export const useCmsData = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCmsData must be used within a CmsProvider');
  }
  return context;
};

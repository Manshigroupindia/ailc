// Search indexing service that compiles search documents dynamically from static pages and CMS context data.

export const buildSearchIndex = (cmsData = {}) => {
  const {
    homePage = {},
    aboutPage = {},
    activityReports = {},
    conference = {},
    people = [],
    mediaList = [],
    contact = {},
  } = cmsData;

  const documents = [
    // Static & Core Pages
    {
      id: 'page-home',
      title: 'Home Page',
      category: 'Home',
      path: '/',
      description: homePage.heroDescription || 'Pan-India Organization of Advocates uniting judges, academicians, and legal professionals across 19+ states.',
      keywords: 'home main hero ailc council advocates lawyers India autonomous national leadership',
      content: `${homePage.heroMainHeading || ''} ${homePage.heroHighlightText || ''} ${homePage.heroSubHeading || ''} ${homePage.heroDescription || ''} ${homePage.introTitle || ''} ${homePage.introDescription || ''} ${homePage.orgTitle || ''} ${homePage.legalTitle || ''} ${homePage.eventTitle || ''}`,
    },
    {
      id: 'page-about',
      title: 'About Us - All India Lawyers Council',
      category: 'Page',
      path: '/about',
      description: aboutPage.subtitle || 'Self-help autonomous Pan-India legal body registered under NGO nomenclature since 2020.',
      keywords: 'about history mission vision objectives NGO registration 2020 Delhi lawyer council',
      content: `${aboutPage.title || ''} ${aboutPage.historyText || ''} ${aboutPage.missionText || ''} ${aboutPage.visionText || ''} ${(aboutPage.objectivesList || []).join(' ')}`,
    },
    {
      id: 'page-pledge',
      title: 'Pledge of Commitment',
      category: 'Page',
      path: '/about/pledge',
      description: 'The solemn oath and constitutional commitment taken by all members of the All India Lawyers Council.',
      keywords: 'pledge oath commitment constitution justice human rights advocate welfare integrity bar',
      content: 'Pledge of commitment to uphold the Constitution of India, defend advocate rights, provide pro-bono legal assistance, and protect rule of law without fear or favor.',
    },
    {
      id: 'page-launching',
      title: 'Launching Session (8 Feb 2020)',
      category: 'Event',
      path: '/about/launching-session',
      description: 'Historical inaugural assembly of AILC held at India International Centre, New Delhi.',
      keywords: 'launching session convention founding New Delhi 2020 India International Centre IIC delegates',
      content: 'Launching session of All India Lawyers Council at India International Centre New Delhi on 8th February 2020 with 100+ advocates from 15 states passing resolutions for advocate protection and pre-trial defense.',
    },
    {
      id: 'page-keynote',
      title: 'Key Note Address',
      category: 'Page',
      path: '/about/key-note-address',
      description: 'Inaugural addresses by eminent jurists, former judges, and senior advocates on constitutional integrity.',
      keywords: 'keynote address speech jurists retired judges supreme court high court speech legal reform',
      content: 'Keynote address by retired judges and senior advocates emphasizing constitutional supremacy, advocate safety, police accountability, and judicial accessibility.',
    },
    {
      id: 'page-rules',
      title: 'Rules & Regulations',
      category: 'Governance',
      path: '/rules-regulation',
      description: 'Official constitution, membership eligibility, electoral rules, and governance structure of AILC.',
      keywords: 'rules regulation constitution bylaws elections membership eligibility state committees executive body',
      content: 'Official rules and regulations governing membership criteria, bar council enrollment requirements, central secretariat powers, state convenor appointments, and disciplinary procedures.',
    },
    {
      id: 'page-activity',
      title: 'Activity Report & Fact-Finding Missions',
      category: 'Activity',
      path: '/activity-report',
      description: activityReports.commonReportText || 'Fact-finding delegations, Manipur mission, advocate protection summits, and pro-bono legal aid camps.',
      keywords: 'activity report fact-finding mission Manipur legal aid camp Ranchi Malegaon Delhi Bengaluru Chennai Jaipur',
      content: `${activityReports.commonReportTitle || ''} ${activityReports.commonReportText || ''} ${activityReports.visitsTitle || ''} ${activityReports.visitsText || ''} ${Object.values(activityReports.locations || {}).join(' ')}`,
    },
    {
      id: 'page-media',
      title: 'Media & Photo Gallery',
      category: 'Media',
      path: '/media',
      description: 'High-resolution photo archives, video broadcasts, press releases, and national convention media coverage.',
      keywords: 'media photo gallery press release news video broadcast pictures photos events',
      content: mediaList.map((m) => `${m.title || ''} ${m.caption || ''} ${m.category || ''}`).join(' ') || 'Photo gallery and video media archives of AILC national conventions and legal aid programs.',
    },
    {
      id: 'page-patrons',
      title: 'Honorary Patrons & Advisory Board',
      category: 'Patrons',
      path: '/patrons',
      description: 'Distinguished guidance from former Supreme Court & High Court judges, DGPs, and university chancellors.',
      keywords: 'patrons AK Ganguly Kolse Patil Sharfuddin Ahmad PA Inamdar Wazir Ansari SM Mushrif Kamal Faroqui judges DGP',
      content: 'Patrons of All India Lawyers Council including Hon’ble Justice Mr. AK Ganguly, Hon’ble Justice Mr. BG Kolse Patil, Sharfuddin Ahmad, Dr. PA Inamdar, Mohammad Wazir Ansari, SM Mushrif, and Kamal Faroqui.',
    },
    {
      id: 'page-[#national-conference]',
      title: 'National Conference 2023',
      category: 'Conference',
      path: '/national-conference-2023',
      description: conference.summaryText || 'National Assembly at India International Centre, New Delhi presided over by Hon’ble Justice Mr. Abhay M. Thipsay.',
      keywords: 'national conference 2023 26 november New Delhi India International Centre Abhay Thipsay Lakshmi Raja',
      content: `${conference.title || ''} ${conference.subtitle || ''} ${conference.venue || ''} ${conference.presidedBy || ''} ${conference.anchoredBy || ''} ${conference.summaryText || ''}`,
    },
    {
      id: 'page-[#convention]',
      title: 'AILC National Convention',
      category: 'Conference',
      path: '/ailc-convention',
      description: 'Official Convention Documents, Constitution & Organizational Guidelines of All India Practising Lawyers Council.',
      keywords: 'convention national meeting bar council advocates practitioners assembly summit constitution guidelines charter',
      content: 'AILC Pan-India convention document bringing together senior counsels and state delegates to discuss constitutional framework, advocate welfare funds, safety acts, and pro-bono aid.',
    },
    {
      id: 'page-booklet',
      title: 'AILC Official Booklet',
      category: 'Publication',
      path: '/ailc',
      description: 'Read and download the official AILC booklet online. Explore important initiatives, objectives, and official records.',
      keywords: 'booklet publication PDF download read online official records initiatives manshi group AILC',
      content: 'Official AILC booklet publication containing organizational history, bar council rules, advocate rights initiatives, and central secretariat records.',
    },
    {
      id: 'page-contact',
      title: 'Contact Us & Secretariat HQ',
      category: 'Contact',
      path: '/contact',
      description: `Central Secretariat in Hazrat Nizamuddin West, New Delhi. Phone: ${contact.phone || '011-46068472'}.`,
      keywords: 'contact phone email address location New Delhi Nizamuddin map helpline office',
      content: `Central Secretariat address: ${contact.address || ''}. Phone: ${contact.phone || ''}. Email: ${contact.email || ''}. Contact for legal aid, membership inquiry, and media coverage.`,
    },
    {
      id: 'page-leadership',
      title: 'Leadership & Executive Committee',
      category: 'Leadership',
      path: '/leadership',
      description: 'Central Secretariats, National President, General Secretary, and State Executive Members.',
      keywords: 'leadership executive committee national president debasish kar gupta sharfuddin ahmad state convenors',
      content: 'Leadership council of AILC including National President Justice Debasish Kar Gupta, Secretary General Sharfuddin Ahmad, and executive committee members across 19 states.',
    },
    {
      id: 'page-membership',
      title: 'Membership Application Portal',
      category: 'Service',
      path: '/membership',
      description: 'Online membership portal for practicing advocates enrolled in any State Bar Council in India.',
      keywords: 'membership apply enrollment state bar council practicing advocate join application',
      content: 'Apply for AILC membership. Open to all practicing advocates in India with valid Bar Council enrollment number.',
    },
    {
      id: 'page-privacy',
      title: 'Privacy Policy',
      category: 'Policy',
      path: '/privacy-policy',
      description: 'Comprehensive privacy policy, data security practices, cookies, analytics, and user rights.',
      keywords: 'privacy policy data security cookies google firebase analytics user rights privacy manshi group',
      content: 'Privacy policy detailing personal information collection, cookies, third-party services like Google, Firebase, Cloudinary, data security, and user rights for AILC portal.',
    },
    {
      id: 'page-copyright',
      title: 'Copyright & Intellectual Property',
      category: 'Policy',
      path: '/copyright',
      description: 'Copyright terms, content ownership, trademark protection, DMCA reporting, and licensing.',
      keywords: 'copyright IP intellectual property ownership content code logo trademark DMCA licensing manshi group',
      content: 'Copyright notice and intellectual property policy for text, images, videos, source code, logos, and graphics on AILC digital portal.',
    },
  ];

  // Dynamically index People Profiles from CMS
  if (Array.isArray(people)) {
    people.forEach((p) => {
      if (p.name) {
        documents.push({
          id: `person-${p.id || p.name}`,
          title: `${p.name} - ${p.designation || 'Member'}`,
          category: p.category || 'People',
          path: p.category === 'Patrons' ? '/patrons' : '/leadership',
          description: `${p.designation || ''} ${p.state ? `(${p.state})` : ''}. ${p.description || ''}`,
          keywords: `${p.name} ${p.designation || ''} ${p.state || ''} ${p.category || ''} ${(p.usedIn || []).join(' ')}`,
          content: `${p.name} ${p.designation || ''} ${p.state || ''} ${p.description || ''}`,
        });
      }
    });
  }

  return documents;
};

// Search Matcher function
export const searchDocuments = (documents, query) => {
  if (!query || !query.trim()) return [];

  const rawTokens = query.toLowerCase().trim().split(/\s+/);
  const normalizedQuery = query.toLowerCase().trim();

  return documents
    .map((doc) => {
      const searchTarget = `${doc.title} ${doc.category} ${doc.description} ${doc.keywords} ${doc.content}`.toLowerCase();

      // Calculate matching score
      let score = 0;

      // Exact title match bonus
      if (doc.title.toLowerCase().includes(normalizedQuery)) {
        score += 50;
      }

      // Exact category match bonus
      if (doc.category.toLowerCase().includes(normalizedQuery)) {
        score += 30;
      }

      // Keyword match bonus
      if (doc.keywords && doc.keywords.toLowerCase().includes(normalizedQuery)) {
        score += 20;
      }

      // Token matches
      let matchedTokens = 0;
      rawTokens.forEach((token) => {
        if (searchTarget.includes(token)) {
          matchedTokens++;
          score += 10;
        }
      });

      const isMatch = matchedTokens > 0 || score > 0;

      return {
        ...doc,
        score,
        isMatch,
      };
    })
    .filter((doc) => doc.isMatch)
    .sort((a, b) => b.score - a.score);
};

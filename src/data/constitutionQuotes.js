export const constitutionQuotes = [
  {
    quote: "The Constitution is not a mere lawyer's document; it is a vehicle of life, and its spirit is always the spirit of age.",
    author: "Dr. B. R. Ambedkar",
    role: "Father of Indian Constitution & Jurist"
  },
  {
    quote: "Constitutional morality is not a natural sentiment. It has to be cultivated.",
    author: "Dr. B. R. Ambedkar",
    role: "Father of Indian Constitution"
  },
  {
    quote: "Justice, Liberty, Equality and Fraternity are the foundation of our democracy.",
    author: "Preamble of Constitution of India",
    role: "Fundamental Principles"
  },
  {
    quote: "Every citizen is equal before the law and entitled to equal protection of the law.",
    author: "Article 14, Constitution of India",
    role: "Right to Equality"
  },
  {
    quote: "The rule of law is the strongest pillar of a sovereign democratic republic.",
    author: "Supreme Court of India",
    role: "Constitutional Bench Guidelines"
  },
  {
    quote: "Rights are protected only when citizens remain vigilant and courageous.",
    author: "Dr. B. R. Ambedkar",
    role: "Jurist & Reformer"
  },
  {
    quote: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    author: "Article 21, Constitution of India",
    role: "Fundamental Right to Life"
  },
  {
    quote: "No person is above the Constitution, and no authority is immune from judicial review.",
    author: "Constitutional Doctrine of India",
    role: "Judicial Precedent"
  },
  {
    quote: "Justice delayed is justice denied; speedy trial is an essential fundamental right.",
    author: "Legal Maxims & Indian Jurisprudence",
    role: "Judicial Heritage"
  },
  {
    quote: "The Constitution protects every citizen without discrimination on grounds of religion, race, caste, sex or place of birth.",
    author: "Article 15, Constitution of India",
    role: "Prohibition of Discrimination"
  },
  {
    quote: "Liberty and equality must always walk together; one cannot exist without the other.",
    author: "Dr. B. R. Ambedkar",
    role: "Constitutional Debates (1949)"
  },
  {
    quote: "An independent judiciary is the ultimate guardian of fundamental rights.",
    author: "Supreme Court of India",
    role: "Basic Structure Doctrine"
  },
  {
    quote: "Cultivation of mind should be the ultimate aim of human existence.",
    author: "Dr. B. R. Ambedkar",
    role: "Scholarly Legacy"
  },
  {
    quote: "In a democracy, dissent is the safety valve of society.",
    author: "Indian Constitutional Jurisprudence",
    role: "Democratic Values"
  },
  {
    quote: "Educate, Agitate, Organise — Stand united for justice and human dignity.",
    author: "Dr. B. R. Ambedkar",
    role: "Message to the Nation"
  },
  {
    quote: "Law and order are the medicine of the body politic, and when the body politic gets sick, medicine must be administered.",
    author: "Dr. B. R. Ambedkar",
    role: "Constitutional Thought"
  },
  {
    quote: "The strength of the legal profession lies in its unshakeable commitment to truth and fairness.",
    author: "All India Lawyers Council",
    role: "Ethical Charter"
  },
  {
    quote: "We are Indians, firstly and lastly.",
    author: "Dr. B. R. Ambedkar",
    role: "National Integration"
  },
  {
    quote: "Freedom of speech and expression is the cornerstone of democratic governance.",
    author: "Article 19(1)(a), Constitution of India",
    role: "Fundamental Freedom"
  },
  {
    quote: "Legal aid to the poor and vulnerable is not a charity, but a fundamental constitutional duty.",
    author: "Article 39A, Constitution of India",
    role: "Equal Justice & Free Legal Aid"
  },
  {
    quote: "Democracy is not merely a form of government; it is primarily a mode of associated living.",
    author: "Dr. B. R. Ambedkar",
    role: "Social Democracy"
  },
  {
    quote: "However good a Constitution may be, if those who are implementing it are not good, it will prove to be bad.",
    author: "Dr. B. R. Ambedkar",
    role: "Constitutional Assembly Address (1949)"
  },
  {
    quote: "The supremacy of law ensures that the highest officer and the humblest citizen are judged by the same yardstick.",
    author: "Rule of Law Principle",
    role: "Indian Legal Heritage"
  },
  {
    quote: "Pro-bono legal service is the noble tradition of the legal fraternity in upholding constitutional promises.",
    author: "Bar Council Guidelines",
    role: "Professional Ethics"
  },
  {
    quote: "Political democracy cannot last unless there lies at the base of it social democracy.",
    author: "Dr. B. R. Ambedkar",
    role: "Visionary Address"
  },
  {
    quote: "Writs under Article 32 are the heart and soul of the Indian Constitution.",
    author: "Dr. B. R. Ambedkar",
    role: "Right to Constitutional Remedies"
  },
  {
    quote: "Public interest litigation is a strategic arm of the legal movement for bringing justice to the underprivileged.",
    author: "Supreme Court of India",
    role: "Public Interest Jurisprudence"
  },
  {
    quote: "Sovereignty rests with the people, exercised through the Constitution.",
    author: "Constitutional Law of India",
    role: "Democratic Foundation"
  },
  {
    quote: "Equality of opportunity in matters of public employment is guaranteed to all citizens.",
    author: "Article 16, Constitution of India",
    role: "Fundamental Right"
  },
  {
    quote: "To maintain democracy not merely in form, but also in fact, we must hold fast to constitutional methods.",
    author: "Dr. B. R. Ambedkar",
    role: "Constitutional Assembly Speech"
  },
  {
    quote: "Advocates are officers of the Court whose primary loyalty is to justice and the Rule of Law.",
    author: "Advocates Act 1961",
    role: "Legal Ethics Code"
  }
];

export const getRandomConstitutionQuote = () => {
  const randomIndex = Math.floor(Math.random() * constitutionQuotes.length);
  return constitutionQuotes[randomIndex];
};

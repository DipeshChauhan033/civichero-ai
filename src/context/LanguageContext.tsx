import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'English' | 'Hindi' | 'Marathi' | 'Gujarati';

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  'app.name': {
    English: 'CivicHero AI',
    Hindi: 'CivicHero AI',
    Marathi: 'CivicHero AI',
    Gujarati: 'CivicHero AI'
  },
  'nav.explore': {
    English: 'Explore Feed',
    Hindi: 'फ़ीड खोजें',
    Marathi: 'फीड एक्सप्लोर करा',
    Gujarati: 'ફીડ શોધો'
  },
  'nav.report': {
    English: 'Report Issue',
    Hindi: 'समस्या दर्ज करें',
    Marathi: 'समस्या नोंदवा',
    Gujarati: 'સમસ્યા નોંધાવો'
  },
  'nav.nearby': {
    English: 'Near Me',
    Hindi: 'मेरे आसपास',
    Marathi: 'माझ्या जवळ',
    Gujarati: 'મારી નજીક'
  },
  'nav.complaints': {
    English: 'My Complaints',
    Hindi: 'मेरी शिकायतें',
    Marathi: 'माझ्या तक्रारी',
    Gujarati: 'મારી ફરિયાદો'
  },
  'nav.leaderboard': {
    English: 'Leaderboard',
    Hindi: 'लीडरबोर्ड',
    Marathi: 'लीडरबोर्ड',
    Gujarati: 'લીડરબોર્ડ'
  },
  'btn.requester': {
    English: 'User Requester',
    Hindi: 'नागरिक लॉगिन',
    Marathi: 'नागरिक लॉगिन',
    Gujarati: 'નાગરિક લૉગિન'
  },
  'btn.solver': {
    English: 'Problem Solver',
    Hindi: 'अधिकारी पोर्टल',
    Marathi: 'अधिकारी पोर्टल',
    Gujarati: 'અધિકારી પોર્ટલ'
  },
  'btn.logout': {
    English: 'Logout',
    Hindi: 'लॉगआउट',
    Marathi: 'लॉगआउट',
    Gujarati: 'લૉગઆઉટ'
  },
  'hero.badge': {
    English: 'AI-Powered Civic Redressal',
    Hindi: 'AI संचालित नागरिक समाधान',
    Marathi: 'AI संचलित नागरी समाधान',
    Gujarati: 'AI સંચાલિત નાગરિક નિવારણ'
  },
  'hero.title': {
    English: 'Report Civic Issues. Get Fast AI Action.',
    Hindi: 'नागरिक समस्याएं दर्ज करें। त्वरित AI समाधान पाएं।',
    Marathi: 'नागरी समस्या नोंदवा. त्वरित AI कृती मिळवा.',
    Gujarati: 'નાગરિક સમસ્યાઓ નોંધાવો. ઝડપી AI ઉકેલ મેળવો.'
  },
  'hero.sub': {
    English: 'Snap a photo of garbage, potholes, or water leaks. Our AI instantly routes your report to the right municipal department.',
    Hindi: 'कचरा, गड्ढे या पानी के रिसाव की फोटो लें। हमारा AI तुरंत आपकी शिकायत सही नगर निगम विभाग को भेजता है।',
    Marathi: 'कचरा, खड्डे किंवा पाणी गळतीचा फोटो काढा. आमचे AI त्वरित तुमची तक्रार योग्य विभागाला पाठवते.',
    Gujarati: 'કચરો, ખાડા કે પાણીના લીકેજનો ફોટો લો. અમારું AI તરત જ તમારી ફરિયાદ યોગ્ય વિભાગને મોકલે છે.'
  },
  'hero.cta': {
    English: 'Report New Issue Now',
    Hindi: 'नई समस्या दर्ज करें',
    Marathi: 'नवीन समस्या नोंदवा',
    Gujarati: 'નવી સમસ્યા નોંધાવો'
  },
  'login.title': {
    English: 'Welcome to CivicHero',
    Hindi: 'CivicHero में आपका स्वागत है',
    Marathi: 'CivicHero मध्ये आपले स्वागत आहे',
    Gujarati: 'CivicHero માં સ્વાગત છે'
  },
  'login.sub': {
    English: 'Enter your mobile number to access real-time civic services',
    Hindi: 'नागरिक सेवाओं के लिए अपना मोबाइल नंबर दर्ज करें',
    Marathi: 'नागरी सेवांसाठी आपला मोबाईल नंबर टाका',
    Gujarati: 'નાગરિક સેવાઓ માટે તમારો મોબાઇલ નંબર દાખલ કરો'
  },
  'login.nameLabel': {
    English: 'FULL NAME',
    Hindi: 'पूरा नाम',
    Marathi: 'पूर्ण नाव',
    Gujarati: 'પૂરું નામ'
  },
  'login.mobileLabel': {
    English: '10-DIGIT MOBILE NUMBER',
    Hindi: '10 अंकों का मोबाइल नंबर',
    Marathi: '10 अंकी मोबाईल नंबर',
    Gujarati: '10 અંકનો મોબાઇલ નંબર'
  },
  'login.getOtp': {
    English: 'Get Verification OTP',
    Hindi: 'सत्यापन OTP प्राप्त करें',
    Marathi: 'पडताळणी OTP मिळवा',
    Gujarati: 'ચકાસણી OTP મેળવો'
  },
  'login.verifyTitle': {
    English: 'Verify OTP',
    Hindi: 'OTP सत्यापित करें',
    Marathi: 'OTP पडताळा',
    Gujarati: 'OTP ચકાસો'
  },
  'login.verifySub': {
    English: 'Enter the 6-digit code sent via SMS to your phone',
    Hindi: 'आपके फोन पर SMS द्वारा भेजा गया 6 अंकों का कोड दर्ज करें',
    Marathi: 'तुमच्या फोनवर SMS द्वारे पाठवलेला 6 अंकी कोड टाका',
    Gujarati: 'તમારા ફોન પર SMS દ્વારા મોકલેલ 6 અંકનો કોડ દાખલ કરો'
  },
  'login.verifyBtn': {
    English: 'Verify & Login',
    Hindi: 'सत्यापित करें और प्रवेश करें',
    Marathi: 'पडताळा आणि प्रवेश करा',
    Gujarati: 'ચકાસો અને પ્રવેશ કરો'
  },
  'login.guestBtn': {
    English: 'Explore Public Feed as Guest',
    Hindi: 'अतिथि के रूप में फ़ीड देखें',
    Marathi: 'पाहुणे म्हणून फीड पहा',
    Gujarati: 'મહેમાન તરીકે ફીડ જુઓ'
  },
  'login.officerBtn': {
    English: 'Problem Solver (Officer Login)',
    Hindi: 'अधिकारी पोर्टल (समस्या समाधान)',
    Marathi: 'अधिकारी पोर्टल (समस्या निवारक)',
    Gujarati: 'અધિકારી પોર્ટલ (સમસ્યા ઉકેલનાર)'
  },
  'nearby.title': {
    English: 'Citizen Grievance Feed',
    Hindi: 'नागरिक शिकायत फ़ीड',
    Marathi: 'नागरी तक्रार फीड',
    Gujarati: 'નાગરિક ફરિયાદ ફીડ'
  },
  'nearby.subtitle': {
    English: 'Real-time municipal issues tracked on GIS map with citizen votes',
    Hindi: 'नागरिकों के वोटों के साथ जीआईएस मानचित्र पर ट्रैक की गई वास्तविक समय की नगर पालिका समस्याएं',
    Marathi: 'नागरिकांच्या मतांसह जीआयएस नकाशावर ट्रॅक केलेल्या रिअल-टाइम महानगरपालिका समस्या',
    Gujarati: 'નાગરિકોના મતો સાથે જીઆઇએસ નકશા પર ટ્રેક કરવામાં આવેલી રીઅલ-ટાઇમ મ્યુનિસિપલ સમસ્યાઓ'
  },
  'nearby.votes': {
    English: 'Votes',
    Hindi: 'वोट',
    Marathi: 'मते',
    Gujarati: 'મતો'
  },
  'nearby.comments': {
    English: 'Comments',
    Hindi: 'टिप्पणियाँ',
    Marathi: 'प्रतिक्रिया',
    Gujarati: 'ટિપ્પણીઓ'
  },
  'nearby.track': {
    English: 'Track Status',
    Hindi: 'स्थिति ट्रैक करें',
    Marathi: 'स्थितीचा मागोवा घ्या',
    Gujarati: 'સ્થિતિ ટ્રેક કરો'
  },
  'nearby.viewMap': {
    English: 'View Live Map',
    Hindi: 'लाइव नक्शा देखें',
    Marathi: 'थेट नकाशा पहा',
    Gujarati: 'લાઇવ નકશો જુઓ'
  },
  'nearby.addComment': {
    English: 'Write a comment...',
    Hindi: 'एक टिप्पणी लिखें...',
    Marathi: 'एक प्रतिक्रिया लिहा...',
    Gujarati: 'ટિપ્પણી લખો...'
  },
  'nearby.commentBtn': {
    English: 'Post',
    Hindi: 'पोस्ट करें',
    Marathi: 'पोस्ट करा',
    Gujarati: 'પોસ્ટ કરો'
  },
  'post.title': {
    English: 'Report New Grievance',
    Hindi: 'नई शिकायत दर्ज करें',
    Marathi: 'नवीन तक्रार नोंदवा',
    Gujarati: 'નવી સમસ્યા નોંધાવો'
  },
  'post.subtitle': {
    English: 'Instantly classify and dispatch your issue to municipal officers using Gemini AI',
    Hindi: 'जेमिनी एआई का उपयोग करके अपनी समस्या को तुरंत वर्गीकृत करें और अधिकारियों को भेजें',
    Marathi: 'जेमिनी एआय वापरून तुमची समस्या त्वरित वर्गीकृत करा आणि अधिकार्‍यांकडे पाठवा',
    Gujarati: 'જેમિनी એઆઇનો ઉપયોગ કરીને તમારી સમસ્યાનું ઝડપથી વર્ગીકરણ કરો અને અધિકારીઓને મોકલો'
  },
  'post.labelTitle': {
    English: 'Grievance Title / Headline',
    Hindi: 'शिकायत का शीर्षक / हेडलाइन',
    Marathi: 'तक्रार शीर्षक / हेडलाईन',
    Gujarati: 'ફરિયાદનું શીર્ષક / હેડલાઇન'
  },
  'post.labelDesc': {
    English: 'Detailed Description',
    Hindi: 'विस्तृत विवरण',
    Marathi: 'सविस्तर वर्णन',
    Gujarati: 'વિગતવાર વર્ણન'
  },
  'post.labelCat': {
    English: 'Municipal Category',
    Hindi: 'नगर पालिका श्रेणी',
    Marathi: 'महानगरपालिका श्रेणी',
    Gujarati: 'મ્યુનિસિપલ કેટેગરી'
  },
  'post.labelPriority': {
    English: 'Priority',
    Hindi: 'प्राथमिकता',
    Marathi: 'प्राधान्यक्रम',
    Gujarati: 'પ્રાથમિકતા'
  },
  'post.labelAddress': {
    English: 'Address Location',
    Hindi: 'पता / स्थान',
    Marathi: 'पत्ता / ठिकाण',
    Gujarati: 'સરનામું / સ્થળ'
  },
  'post.anonymous': {
    English: 'Report Anonymously',
    Hindi: 'गुमनाम रूप से रिपोर्ट करें',
    Marathi: 'अनामिकपणे तक्रार नोंदवा',
    Gujarati: 'અનામી રીતે ફરિયાદ કરો'
  },
  'post.submit': {
    English: 'File Official Grievance',
    Hindi: 'आधिकारिक शिकायत दर्ज करें',
    Marathi: 'अधिकृत तक्रार दाखल करा',
    Gujarati: 'સત્તાવાર ફરિયાદ દાખલ કરો'
  },
  'post.dragDrop': {
    English: 'Drag and drop or click to upload photos/videos',
    Hindi: 'फ़ोटो/वीडियो अपलोड करने के लिए खींचें और छोड़ें या क्लिक करें',
    Marathi: 'फोटो/व्हिडिओ अपलोड करण्यासाठी ड्रॅग करा किंवा क्लिक करा',
    Gujarati: 'ફોટો/વિડિયો અપલોડ કરવા માટે ખેંચો અને છોડો અથવા ક્લિક કરો'
  },
  'my.title': {
    English: 'My Registered Grievances',
    Hindi: 'मेरी पंजीकृत शिकायतें',
    Marathi: 'माझ्या नोंदणीकृत तक्रारी',
    Gujarati: 'મારી નોંધાયેલી ફરિયાદો'
  },
  'my.subtitle': {
    English: 'Track active progress status and official work proof of your filed complaints',
    Hindi: 'अपनी दर्ज की गई शिकायतों की सक्रिय प्रगति और आधिकारिक कार्य प्रमाण को ट्रैक करें',
    Marathi: 'तुमच्या दाखल केलेल्या तक्रारींची सक्रिय प्रगती आणि अधिकृत काम पुरावा ट्रॅक करा',
    Gujarati: 'તમારી નોંધાયેલી ફરિયાદોની સક્રિય પ્રગતિ અને સત્તાવાર કામગીરીના પુરાવા ટ્રેક કરો'
  },
  'my.filter': {
    English: 'Filter Status',
    Hindi: 'स्थिति फ़िल्टर करें',
    Marathi: 'स्थिती फिल्टर करा',
    Gujarati: 'સ્થિતિ ફિલ્ટર કરો'
  },
  'my.noGrievance': {
    English: 'No grievances found under your mobile number',
    Hindi: 'आपके मोबाइल नंबर के अंतर्गत कोई शिकायत नहीं मिली',
    Marathi: 'तुमच्या मोबाईल नंबर अंतर्गत कोणतीही तक्रार आढळली नाही',
    Gujarati: 'તમારા મોબાઇલ નંબર હેઠળ કોઈ ફરિયાદ મળી નથી'
  },
  'leader.title': {
    English: 'Civic Leaderboard',
    Hindi: 'नागरिक लीडरबोर्ड',
    Marathi: 'नागरी लीडरबोर्ड',
    Gujarati: 'નાગરિક લીડરબોર્ડ'
  },
  'leader.subtitle': {
    English: 'Our community heroes scoring top vigilant points in solving hyperlocal issues',
    Hindi: 'हाइपरलोकल समस्याओं को हल करने में शीर्ष अंक प्राप्त करने वाले हमारे सामुदायिक नायक',
    Marathi: 'हायपरलोकल समस्या सोडवण्यात अव्वल गुण मिळवणारे आमचे समुदाय नायक',
    Gujarati: 'હાયપરલોકલ સમસ્યાઓ ઉકેલવામાં ટોચના પોઇન્ટ મેળવનાર આપણા સમુદાયના નાયકો'
  },
  'leader.points': {
    English: 'Hero Points',
    Hindi: 'हीरो पॉइंट्स',
    Marathi: 'हिरो पॉईंट्स',
    Gujarati: 'હીરો પોઇન્ટ્સ'
  },
  'leader.resolved': {
    English: 'Resolved',
    Hindi: 'हल किया गया',
    Marathi: 'निवारण केले',
    Gujarati: 'ઉકેલાયેલ'
  },
  'officer.title': {
    English: 'Municipal Problem Solver Dashboard',
    Hindi: 'नगर पालिका अधिकारी डैशबोर्ड',
    Marathi: 'महानगरपालिका अधिकारी डॅशबोर्ड',
    Gujarati: 'મ્યુનિસિપલ અધિકારી ડેશબોર્ડ'
  },
  'officer.subtitle': {
    English: 'Review AI bifurcated grievances, verify confidence scores, and upload completion work proof',
    Hindi: 'AI द्वारा वर्गीकृत शिकायतों की समीक्षा करें, और काम पूरा होने का प्रमाण अपलोड करें',
    Marathi: 'AI वर्गीकृत तक्रारींचे पुनरावलोकन करा, आणि काम पूर्ण झाल्याचा पुरावा अपलोड करा',
    Gujarati: 'AI વર્ગીકૃત ફરિયાદોની સમીક્ષા કરો, અને કામ પૂર્ણ થયાનો પુરોવો અપલોડ કરો'
  },
  'officer.triage': {
    English: 'AI Triage Queue',
    Hindi: 'AI वर्गीकरण कतार',
    Marathi: 'AI वर्गीकरण रांग',
    Gujarati: 'AI વર્ગીકરણ કતાર'
  },
  'officer.assigned': {
    English: 'My Assigned Tasks',
    Hindi: 'मुझे सौंपे गए कार्य',
    Marathi: 'मला सोपवलेली कामे',
    Gujarati: 'મને સોંપવામાં આવેલ કાર્યો'
  },
  'officer.updateStatus': {
    English: 'Update Progress Status',
    Hindi: 'प्रगति स्थिति अपडेट करें',
    Marathi: 'प्रगती स्थिती अपडेट करा',
    Gujarati: 'પ્રગતિ સ્થિતિ અપડेत કરો'
  },
  'officer.proofBtn': {
    English: 'Upload Work Completion Proof',
    Hindi: 'कार्य पूरा होने का प्रमाण अपलोड करें',
    Marathi: 'काम पूर्ण झाल्याचा पुरावा अपलोड करा',
    Gujarati: 'કામ પૂર્ણ થયાનો પુરાવો અપલોડ કરો'
  },
  'admin.title': {
    English: 'Root Administration Command Center',
    Hindi: 'मुख्य प्रशासनिक कमान केंद्र',
    Marathi: 'मुख्य प्रशासकीय नियंत्रण केंद्र',
    Gujarati: 'મુખ્ય વહીવટી કમાન્ડ સેન્ટર'
  },
  'admin.subtitle': {
    English: 'Hyperlocal municipal GIS heat maps, department analytics, and SLA resolution tracking',
    Hindi: 'हाइपरलोकल जीआईएस हीट मैप, विभाग विश्लेषण, और एसएलए ट्रैकिंग',
    Marathi: 'हायपरलोकल जीआयएस हीट मॅप, विभाग विश्लेषण आणि एसएलए ट्रॅकिंग',
    Gujarati: 'હાયપરલોકલ જીઆઇએસ હીટ મેપ, વિભાગીય વિશ્લેષણ અને એસએલએ ટ્રેકિંગ'
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'English',
  setLang: () => {},
  t: (key) => key
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('English');

  const t = (key: string): string => {
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    return translations[key]?.English || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

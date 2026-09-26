import { Hadith, DivineName, PropheticTitle } from '../types';

export const COMPENDIUMS = [
  { id: 'bukhari', title: 'Sahih al-Bukhari', count: '7,563 Hadith', icon: 'menu_book' },
  { id: 'muslim', title: 'Sahih Muslim', count: '7,500 Hadith', icon: 'import_contacts' },
  { id: 'abudawud', title: 'Sunan Abi Dawud', count: '5,274 Hadith', icon: 'local_library' },
  { id: 'tirmidhi', title: 'Jami` at-Tirmidhi', count: '3,956 Hadith', icon: 'bookmark_heart' },
  { id: 'nasai', title: "Sunan an-Nasa'i", count: '5,758 Hadith', icon: 'collections_bookmark' },
  { id: 'riyad', title: 'Riyad as-Salihin', count: '1,896 Hadith', icon: 'workspace_premium' }
];

export const HADITH_LIST: Hadith[] = [
  {
    id: 'bukhari-13',
    collection: 'Sahih al-Bukhari',
    bookName: 'Book of Faith',
    hadithNumber: '13 (Book 2, Hadith 6)',
    grade: 'Sahih (Authentic)',
    arabicText: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    englishText: 'None of you truly believes until he loves for his brother what he loves for himself.',
    narrator: 'Narrated by Anas ibn Malik (رضي الله عنه)',
    topic: 'Character (Akhlaq)',
    commentary: 'Scholars agree that this Hadith forms one quarter of the core foundations of Islam, cultivating profound altruism and genuine communal fraternity.'
  },
  {
    id: 'bukhari-1',
    collection: 'Sahih al-Bukhari & Sahih Muslim',
    bookName: 'Intention & Sincerity',
    hadithNumber: 'Bukhari 1, Muslim 1907',
    grade: "Muttafaqun 'Alayh",
    arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    englishText: 'Actions are but by intentions, and every person will have only what they intended.',
    narrator: 'Narrated by Umar ibn al-Khattab (رضي الله عنه)',
    topic: 'Patience & Dua',
    commentary: 'Imam An-Nawawi highlighted that sincerity forms the cornerstone of every righteous deed and spiritual purification.'
  },
  {
    id: 'bukhari-5027',
    collection: 'Sahih al-Bukhari',
    bookName: 'Virtues of the Quran',
    hadithNumber: '5027',
    grade: 'Sahih (Authentic)',
    arabicText: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    englishText: 'The best among you (Muslims) are those who learn the Quran and teach it to others.',
    narrator: 'Narrated by Uthman bin Affan (رضي الله عنه)',
    topic: 'Quran Study',
    commentary: 'The pinnacle of knowledge and transmission in Islam is the study and preservation of the Divine revelation.'
  },
  {
    id: 'tirmidhi-2317',
    collection: 'Jami` at-Tirmidhi',
    bookName: 'Patience & Trust (Tawakkul)',
    hadithNumber: '2317',
    grade: 'Hasan Sahih',
    arabicText: 'قَالَ رَجُلٌ: يَا رَسُولَ اللَّهِ، أَعْقِلُهَا وَأَتَوَكَّلُ، أَوْ أُطْلِقُهَا وَأَتَوَكَّلُ؟ قَالَ: «اعْقِلْهَا وَتَوَكَّلْ»',
    englishText: 'A man said: "O Messenger of Allah! Shall I tie my camel and trust in Allah, or leave it untied and trust?" He replied: "Tie it and trust."',
    narrator: 'Narrated by Anas bin Malik (رضي الله عنه)',
    topic: 'Patience & Dua',
    commentary: 'True Islamic reliance on God (Tawakkul) mandates taking full practical precaution before leaving the outcome in Allah\'s hands.'
  },
  {
    id: 'muslim-223',
    collection: 'Sahih Muslim',
    bookName: 'Purification (Taharah)',
    hadithNumber: '223',
    grade: 'Sahih (Authentic)',
    arabicText: 'الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ مَا بَيْنَ السَّمَاءِ وَالأَرْضِ',
    englishText: 'Purity is half of faith and "Al-hamdu lillah" (praise be to Allah) fills the scale, and "Subhan Allah" and "Al-hamdu lillah" fill that which is between heaven and earth.',
    narrator: 'Narrated by Abu Malik al-Ash\'ari (رضي الله عنه)',
    topic: 'Prayer (Salah)',
    commentary: 'Spiritual and physical purity mirror each other, unlocking cosmic reward for concise invocations of gratitude.'
  },
  {
    id: 'bukhari-2442',
    collection: 'Sahih al-Bukhari',
    bookName: 'Charity & Kindness',
    hadithNumber: '2442',
    grade: 'Sahih (Authentic)',
    arabicText: 'كُلُّ سُلاَمَى مِنَ النَّاسِ عَلَيْهِ صَدَقَةٌ... وَتَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    englishText: 'A charity is due for every joint each day... and smiling in the face of your brother is charity for you.',
    narrator: 'Narrated by Abu Hurairah (رضي الله عنه)',
    topic: 'Zakat & Charity',
    commentary: 'Islam universalizes charity so that no believer is deprived of generating divine reward through mere gentle character.'
  }
];

export const NAMES_OF_ALLAH: DivineName[] = [
  { id: 1, arabic: 'الرَّحْمَٰنُ', transliteration: 'Ar-Rahmān', meaning: 'The Entirely Merciful, All-Beneficent', quranRef: 'Quran 55:1', category: 'Mercy', explanation: 'The One who showers boundless and unconditioned grace upon all of creation in this world.' },
  { id: 2, arabic: 'الرَّحِيمُ', transliteration: 'Ar-Raheem', meaning: 'The Especially Merciful, Bestower of Grace', quranRef: 'Quran 1:3', category: 'Mercy', explanation: 'The One who bestows continuous, specialized mercy upon believers in this life and the hereafter.' },
  { id: 3, arabic: 'الْمَلِكُ', transliteration: 'Al-Malik', meaning: 'The Absolute Sovereign, The King Supreme', quranRef: 'Quran 59:23', category: 'Power', explanation: 'The undisputed ruler of all existence, possessing absolute authority over all kingdoms.' },
  { id: 4, arabic: 'الْقُدُّوسُ', transliteration: 'Al-Quddūs', meaning: 'The Most Sacred, Pure and Flawless', quranRef: 'Quran 62:1', category: 'Majesty', explanation: 'The entirely holy entity far elevated above any blemish, weakness, or human attribute.' },
  { id: 5, arabic: 'السَّلَامُ', transliteration: 'As-Salām', meaning: 'The Source of Peace and Safety', quranRef: 'Quran 59:23', category: 'Peace', explanation: 'The author of eternal tranquility who grants safety from calamity and injustice.' },
  { id: 6, arabic: 'الْمُؤْمِنُ', transliteration: 'Al-Mu\'min', meaning: 'The Granter of Security and Faith', quranRef: 'Quran 59:23', category: 'Peace', explanation: 'The One who fulfills His promises and guarantees security to His sincere worshipers.' },
  { id: 7, arabic: 'الْمُهَيْمِنُ', transliteration: 'Al-Muhaymin', meaning: 'The Ever-Watching Guardian and Overseer', quranRef: 'Quran 59:23', category: 'Power', explanation: 'The One who supervises, guards, and preserves everything in perfect order.' },
  { id: 8, arabic: 'الْعَزِيزُ', transliteration: 'Al-\'Azeez', meaning: 'The All-Mighty, The Invincible', quranRef: 'Quran 3:6', category: 'Power', explanation: 'The One whose strength is unyielding, overcoming all opposition effortlessly.' },
  { id: 9, arabic: 'الْجَبَّارُ', transliteration: 'Al-Jabbār', meaning: 'The Restorer, Compeller of Hearts', quranRef: 'Quran 59:23', category: 'Power', explanation: 'The One who repairs the brokenhearted, rectifies deficiencies, and enacts His supreme decree.' },
  { id: 10, arabic: 'الْمُتَكَبِّرُ', transliteration: 'Al-Mutakabbir', meaning: 'The Supremely Great, Sovereign in Glory', quranRef: 'Quran 59:23', category: 'Majesty', explanation: 'The possessor of authentic greatness and majesty that belongs exclusively to Him.' },
  { id: 11, arabic: 'الْخَالِقُ', transliteration: 'Al-Khāliq', meaning: 'The Creator and Determiner', quranRef: 'Quran 6:102', category: 'Creation', explanation: 'The One who brings things into existence from nonexistence with deliberate design.' },
  { id: 12, arabic: 'الْبَارِئُ', transliteration: 'Al-Bāri\'', meaning: 'The Originator and Evolver', quranRef: 'Quran 59:24', category: 'Creation', explanation: 'The One who crafts diverse forms without any pre-existing model or template.' },
  { id: 13, arabic: 'الْمُصَوِّرُ', transliteration: 'Al-Musawwir', meaning: 'The Fashioner of Unique Forms', quranRef: 'Quran 59:24', category: 'Creation', explanation: 'The supreme artist giving every creature its distinctive shape, hue, and beauty.' },
  { id: 14, arabic: 'الْغَفَّارُ', transliteration: 'Al-Ghaffār', meaning: 'The All-Forgiving, Repeated Eraser of Sins', quranRef: 'Quran 20:82', category: 'Mercy', explanation: 'The One who pardons repetitively and veils mistakes from public disgrace.' },
  { id: 15, arabic: 'الْقَهَّارُ', transliteration: 'Al-Qahhār', meaning: 'The Subduer, The All-Dominant', quranRef: 'Quran 12:39', category: 'Power', explanation: 'The One to whose command all created forces inevitably submit.' },
  { id: 16, arabic: 'الْوَهَّابُ', transliteration: 'Al-Wahhāb', meaning: 'The Supreme Bestower of Gifts', quranRef: 'Quran 3:8', category: 'Mercy', explanation: 'The One who freely gives bounties with no expectation of return.' },
  { id: 17, arabic: 'الرَّزَّاقُ', transliteration: 'Ar-Razzāq', meaning: 'The Total Provider of Sustenance', quranRef: 'Quran 51:58', category: 'Mercy', explanation: 'The provider who guarantees nourishment and provisions to every creature.' },
  { id: 18, arabic: 'الْفَتَّاحُ', transliteration: 'Al-Fattāh', meaning: 'The Supreme Opener of Doors and Knots', quranRef: 'Quran 34:26', category: 'Knowledge', explanation: 'The One who unlocks closed horizons, opens gates of guidance, and resolves all dilemmas.' },
  { id: 19, arabic: 'الْعَلِيمُ', transliteration: 'Al-\'Aleem', meaning: 'The All-Knowing, Omniscient', quranRef: 'Quran 2:29', category: 'Knowledge', explanation: 'The One whose comprehensive knowledge encompasses every hidden thought and cosmic atom.' },
  { id: 20, arabic: 'الْقَابِضُ', transliteration: 'Al-Qābid', meaning: 'The Withholder and Constrainer', quranRef: 'Quran 2:245', category: 'Power', explanation: 'The One who withholds provisions or trials souls according to divine wisdom.' },
  { id: 21, arabic: 'الْبَاسِطُ', transliteration: 'Al-Bāsit', meaning: 'The Expander and Magnanimous Enlarger', quranRef: 'Quran 2:245', category: 'Mercy', explanation: 'The One who expands hearts with joy, faith, and abundant fortune.' },
  { id: 22, arabic: 'الْخَافِضُ', transliteration: 'Al-Khāfid', meaning: 'The Abaser of the Arrogant', quranRef: 'Quran 56:3', category: 'Power', explanation: 'The One who brings down tyrants and humbles arrogant transgressors.' },
  { id: 23, arabic: 'الرَّافِعُ', transliteration: 'Ar-Rāfi\'', meaning: 'The Exalter of the Humble', quranRef: 'Quran 56:3', category: 'Majesty', explanation: 'The One who elevates sincere servants in stature, rank, and spiritual light.' },
  { id: 24, arabic: 'الْمُعِزُّ', transliteration: 'Al-Mu\'izz', meaning: 'The Bestower of Honor and Dignity', quranRef: 'Quran 3:26', category: 'Power', explanation: 'The One who clothes righteous hearts in true nobility and unshakeable honor.' },
  { id: 25, arabic: 'الْمُذِلُّ', transliteration: 'Al-Muthill', meaning: 'The Dishonorer of the Corrupt', quranRef: 'Quran 3:26', category: 'Power', explanation: 'The One who strips power from oppressors and exposes falsehood.' },
  { id: 26, arabic: 'السَّمِيعُ', transliteration: 'As-Samee\'', meaning: 'The All-Hearing', quranRef: 'Quran 2:127', category: 'Knowledge', explanation: 'The One who hears every whispered prayer, inward sigh, and cosmic vibration.' },
  { id: 27, arabic: 'الْبَصِيرُ', transliteration: 'Al-Baseer', meaning: 'The All-Seeing', quranRef: 'Quran 4:58', category: 'Knowledge', explanation: 'The One who perceives the deepest depths of oceans and the black ant on dark stones.' },
  { id: 28, arabic: 'الْحَكَمُ', transliteration: 'Al-Hakam', meaning: 'The Supreme Judge and Arbiter', quranRef: 'Quran 6:114', category: 'Justice', explanation: 'The One whose judgment is final and immune to bias, deceit, or appeals.' },
  { id: 29, arabic: 'الْعَدْلُ', transliteration: 'Al-\'Adl', meaning: 'The Absolutely Just', quranRef: 'Quran 6:115', category: 'Justice', explanation: 'The One who acts with consummate equity, never perpetrating a shred of injustice.' },
  { id: 30, arabic: 'اللَّطِيفُ', transliteration: 'Al-Lateef', meaning: 'The Subtle, The Gracious Connoisseur', quranRef: 'Quran 6:103', category: 'Mercy', explanation: 'The One who operates through delicate unseen mysteries to deliver relief.' },
  { id: 31, arabic: 'الْخَبِيرُ', transliteration: 'Al-Khabeer', meaning: 'The Fully Acquainted and Aware', quranRef: 'Quran 6:18', category: 'Knowledge', explanation: 'The One aware of internal motives, latent secrets, and hidden truths.' },
  { id: 32, arabic: 'الْحَلِيمُ', transliteration: 'Al-Haleem', meaning: 'The Forbearing, Patient Supreme', quranRef: 'Quran 2:225', category: 'Mercy', explanation: 'The One who never hastens retribution, affording servants ample time to turn back.' },
  { id: 33, arabic: 'الْعَظِيمُ', transliteration: 'Al-\'Azeem', meaning: 'The Infinite in Greatness', quranRef: 'Quran 2:255', category: 'Majesty', explanation: 'The One beyond mental grasp whose splendor transcends physical magnitude.' }
];

export const PROPHETIC_TITLES: PropheticTitle[] = [
  { id: 1, arabic: 'مُحَمَّدٌ', title: 'Muhammad ﷺ', meaning: 'The Praised One', explanation: 'Praised incessantly in both the Heavens and the Earth for pristine nobility and moral perfection.', source: 'Quran 33:40' },
  { id: 2, arabic: 'أَحْمَدُ', title: 'Ahmad ﷺ', meaning: 'The Most Praiseworthy', explanation: 'The singular name foretold by Prophet \'Isa (Jesus, peace be upon him) in the Gospel.', source: 'Quran 61:6' },
  { id: 3, arabic: 'الْمُصْطَفَى', title: 'Al-Mustafā ﷺ', meaning: 'The Chosen One', explanation: 'Selected by the Almighty above all created beings to deliver the universal seal of prophethood.', source: 'Ash-Shifa (Qadi Iyad)' },
  { id: 4, arabic: 'الصَّادِقُ الْأَمِينُ', title: 'As-Sādiq Al-Amīn ﷺ', meaning: 'The Truthful, The Trustworthy', explanation: 'The revered honorific bestowed unanimously upon him by the Quraysh before revelation.', source: 'Sirat Ibn Hisham' },
  { id: 5, arabic: 'رَحْمَةٌ لِّلْعَالَمِينَ', title: 'Rahmatan lil-\'Ālamīn ﷺ', meaning: 'Mercy unto the Worlds', explanation: 'Sent as divine compassion personified for mankind, the jinn, and all universal creation.', source: 'Quran 21:107' },
  { id: 6, arabic: 'خَاتَمُ النَّبِيِّينَ', title: 'Khātam an-Nabiyyīn ﷺ', meaning: 'The Seal of the Prophets', explanation: 'The final messenger completing the noble prophetic chain until the Day of Resurrection.', source: 'Quran 33:40' },
  { id: 7, arabic: 'الشَّفِيعُ', title: 'Ash-Shafī\' ﷺ', meaning: 'The Great Intercessor', explanation: 'The prophet granted the station of Maqam Mahmud to intercede on the Day of Judgment.', source: 'Sahih al-Bukhari 4712' },
  { id: 8, arabic: 'سِرَاجٌ مُنِيرٌ', title: 'Sirājan Munīran ﷺ', meaning: 'An Illuminating Lamp', explanation: 'The beacon dispersing the shadows of ignorance and spiritual bewilderment.', source: 'Quran 33:46' },
  { id: 9, arabic: 'الْحَبِيبُ', title: 'Al-Habīb ﷺ', meaning: 'The Beloved of Allah', explanation: 'Held in the highest sanctuary of divine affection and intimacy.', source: 'Jami` at-Tirmidhi 3616' },
  { id: 10, arabic: 'صَاحِبُ الْكَوْثَرِ', title: 'Sāhib al-Kawthar ﷺ', meaning: 'Possessor of the Heavenly River', explanation: 'Gifted the celestial lake Kawthar whose waters quench thirst forever.', source: 'Quran 108:1' }
];

export const INITIAL_ADS = [
  {
    id: 'ad-1',
    title: 'Noor Islamic Academy',
    description: 'Master Tajweed and Arabic online with certified teachers from Al-Azhar University. 50% Ramadan Discount.',
    type: 'banner' as const,
    mediaUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    linkUrl: 'https://deenwar.netlify.app',
    sponsorName: 'Noor Global Institute',
    days: 30,
    frequency: 60,
    status: 'active' as const
  },
  {
    id: 'ad-2',
    title: 'Halal Travel & Umrah 2026',
    description: 'Experience VIP 5-Star Umrah packages with Haram-view hotels and dedicated spiritual guides.',
    type: 'banner' as const,
    mediaUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    linkUrl: 'https://deenwar.netlify.app',
    sponsorName: 'Al-Safa Tours',
    days: 15,
    frequency: 60,
    status: 'active' as const
  },
  {
    id: 'ad-3',
    title: 'Zakat & Water Relief Foundation',
    description: 'Provide fresh drinking water wells in arid communities. 100% donation policy with verified proof.',
    type: 'banner' as const,
    mediaUrl: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80',
    linkUrl: 'https://deenwar.netlify.app',
    sponsorName: 'Global Sadaqah Fund',
    days: 20,
    frequency: 60,
    status: 'active' as const
  }
];

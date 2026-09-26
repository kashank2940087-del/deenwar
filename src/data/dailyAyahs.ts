export interface DailyAyahItem {
  id: string;
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  ayahNumber: number;
  arabicText: string;
  transliteration: string;
  translation: string;
  revelationType: 'Meccan' | 'Medinan';
  juz: number;
  theme: string;
  reflection: string;
}

export const DAILY_AYAHS_POOL: DailyAyahItem[] = [
  {
    id: 'ayah-94-5-6',
    surahNumber: 94,
    surahNameArabic: 'الشرح',
    surahNameEnglish: 'Ash-Sharh',
    ayahNumber: 5,
    arabicText: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    transliteration: "Fa inna ma'al-'usri yusra. Inna ma'al-'usri yusra.",
    translation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
    revelationType: 'Meccan',
    juz: 30,
    theme: 'Hope & Relief',
    reflection: 'A divine guarantee that no trial exists without an accompanying relief designed by the Almighty.'
  },
  {
    id: 'ayah-2-286',
    surahNumber: 2,
    surahNameArabic: 'البقرة',
    surahNameEnglish: 'Al-Baqarah',
    ayahNumber: 286,
    arabicText: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ',
    transliteration: "La yukallifullahu nafsan illa wus'aha, laha ma kasabat wa 'alayha maktasabat.",
    translation: 'Allah does not burden a soul beyond that it can bear. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned.',
    revelationType: 'Medinan',
    juz: 3,
    theme: 'Divine Mercy',
    reflection: 'Whatever challenges you face today, Allah has already equipped your soul with the capacity to overcome them.'
  },
  {
    id: 'ayah-2-152',
    surahNumber: 2,
    surahNameArabic: 'البقرة',
    surahNameEnglish: 'Al-Baqarah',
    ayahNumber: 152,
    arabicText: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    transliteration: "Fathkuroonee athkurkum washkuroo lee wala takfuroon.",
    translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
    revelationType: 'Medinan',
    juz: 2,
    theme: 'Remembrance & Gratitude',
    reflection: 'The Creator of the cosmos remembers you intimately whenever your tongue and heart engage in His remembrance.'
  },
  {
    id: 'ayah-65-3',
    surahNumber: 65,
    surahNameArabic: 'الطلاق',
    surahNameEnglish: 'At-Talaq',
    ayahNumber: 3,
    arabicText: 'وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    transliteration: "Wa yarzuqhu min haythu la yahtasib, wa man yatawakkal 'alallahi fahuwa hasbuh.",
    translation: 'And He will provide for him from where he does not expect. And whoever relies upon Allah - then He is sufficient for him.',
    revelationType: 'Medinan',
    juz: 28,
    theme: 'Tawakkul & Sustenance',
    reflection: 'When you place your full trust in Allah, His divine provision arrives from avenues human intellect cannot forecast.'
  },
  {
    id: 'ayah-3-139',
    surahNumber: 3,
    surahNameArabic: 'آل عمران',
    surahNameEnglish: "Ali 'Imran",
    ayahNumber: 139,
    arabicText: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ',
    transliteration: "Wa la tahinoo wa la tahzanoo wa antumul-a'lawna in kuntum mu'mineen.",
    translation: 'So do not weaken and do not grieve, and you will be superior if you are [true] believers.',
    revelationType: 'Medinan',
    juz: 4,
    theme: 'Courage & Resilience',
    reflection: 'Faith elevates the believer above despair. Stand steadfast with unyielding dignity.'
  },
  {
    id: 'ayah-14-7',
    surahNumber: 14,
    surahNameArabic: 'إبراهيم',
    surahNameEnglish: 'Ibrahim',
    ayahNumber: 7,
    arabicText: 'وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ',
    transliteration: "Wa ith ta-aththana rabbukum la-in shakartum la-azeedannakum.",
    translation: 'And [remember] when your Lord proclaimed, "If you are grateful, I will surely increase you [in favor]..."',
    revelationType: 'Meccan',
    juz: 13,
    theme: 'Abundance in Gratitude',
    reflection: 'Gratitude is the direct spiritual catalyst that unlocks boundless divine expansion in your life.'
  },
  {
    id: 'ayah-93-3-4',
    surahNumber: 93,
    surahNameArabic: 'الضحى',
    surahNameEnglish: 'Ad-Duha',
    ayahNumber: 3,
    arabicText: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ',
    transliteration: "Ma wadda'aka rabbuka wa ma qala. Wa lal-akhiratu khayrul laka minal-oola.",
    translation: 'Your Lord has not taken leave of you, [O Muhammad], nor has He detested [you]. And the Hereafter is better for you than the first [life].',
    revelationType: 'Meccan',
    juz: 30,
    theme: 'Comfort in Solitude',
    reflection: 'You are never abandoned by your Lord. Better days, higher light, and eternal peace lie ahead.'
  },
  {
    id: 'ayah-50-16',
    surahNumber: 50,
    surahNameArabic: 'ق',
    surahNameEnglish: 'Qaf',
    ayahNumber: 16,
    arabicText: 'وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ',
    transliteration: "Wa nahnu aqrabu ilayhi min hablil-wareed.",
    translation: 'And We are closer to him than [his] jugular vein.',
    revelationType: 'Meccan',
    juz: 26,
    theme: 'Closeness to Allah',
    reflection: 'Allah is nearer to your innermost thoughts, silent cries, and whispered prayers than your very own pulse.'
  },
  {
    id: 'ayah-67-14',
    surahNumber: 67,
    surahNameArabic: 'الملك',
    surahNameEnglish: 'Al-Mulk',
    ayahNumber: 14,
    arabicText: 'أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ',
    transliteration: "Ala ya'lamu man khalaqa wa huwal-Lateeful-Khabeer.",
    translation: 'Does He not know that which He created, while He is the Subtle, the Acquainted?',
    revelationType: 'Meccan',
    juz: 29,
    theme: 'Omniscience',
    reflection: 'The Maker of your intricate soul understands every unspoken burden and provides with delicate grace.'
  }
];

export function getDailyAyahForToday(seedOffset = 0): DailyAyahItem {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = (now.getTime() - startOfYear.getTime()) + ((startOfYear.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = Math.abs((dayOfYear + seedOffset) % DAILY_AYAHS_POOL.length);
  return DAILY_AYAHS_POOL[index];
}

import { useState } from 'react';
import { Img, Modal, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, Tabs } from '../components/ui.jsx';
import { SRC } from '../data/sources.js';

const NO_PORTRAIT = 'No contemporary portrait survives. We show no invented likeness.';
const GROUPS = {
  rulers: {
    label: 'Historical rulers & leaders',
    intro: 'None of these rulers governed “Karnataka” as a single state — each ruled a different territory in a different century. They are presented in chronological order with their own historical context.',
    people: [
      { name: 'Mayurasharma (Mayuravarma)', when: 'c. 4th century CE', role: 'Founder of the Kadamba dynasty, Banavasi · Title: “Shadanana”', img: 'mayurasharmaPortrait', cap: 'Mayurasharma — artistic depiction (no contemporary portrait survives)',
        body: 'Known chiefly from the Talagunda inscription composed generations later, which describes a scholar who turned to arms and founded a kingdom in the forested west of the Deccan. He stands at the start of Karnataka’s recorded political history.' },
      { name: 'Pulakeshin II (Immadi Pulikeshi)', when: 'r. c. 610–642', role: 'Badami Chalukya emperor · Title: “Dakshinapatheshwara”', img: 'pulakeshin', cap: 'Modern statue of Pulakeshin II, Badami',
        body: 'United much of the Deccan, repulsed the north Indian emperor Harshavardhana and was visited by Xuanzang. His career is known from the Aihole inscription of 634 and other records.' },
      { name: 'Krishna I', when: 'r. c. 756–774', role: 'Rashtrakuta ruler · Title: “Shrivallabha”', img: 'illKrishnaI', cap: 'Illustration of the Kailasa Temple (no portrait of Krishna I survives)',
        body: 'Consolidated the Rashtrakuta kingdom; the Kailasa Temple at Ellora (Maharashtra) is associated with his patronage on the evidence of later Rashtrakuta grants.' },
      { name: 'Sri Krishnadevaraya', when: 'r. 1509–1529', role: 'Karnata (Vijayanagara) emperor · Title: “Kannada Rajya Rama Ramana”', img: 'krishnadevaraya', cap: 'Statues of Sri Krishnadevaraya with queens Chinnadevi and Tirumaladevi, Chandragiri Museum',
        body: 'A period of military success and generous patronage of Kannada, Telugu, Sanskrit and Tamil literature; himself the author of the Telugu poem Amuktamalyada. His rule extended far beyond today’s Karnataka.' },
      { name: 'Kempegowda I', when: 'c. 1510–1569', role: 'Chieftain of Yelahanka; founder of Bengaluru · Title: “Nadaprabhu”', img: 'kempegowdaHead', cap: 'Modern statue of Kempegowda, Kempegowda International Airport',
        body: 'A Nadaprabhu (local chief) under the Karnata (Vijayanagara) empire, he founded the fort-town of Bengaluru in 1537 (the traditional date), laid out its market quarters (petes) and encouraged tanks for water.' },
      { name: 'Madakari Nayaka V', when: 'r. 1758–1779', role: 'Last Nayaka ruler of Chitradurga · Title: “Eppatelu Palegarara Ganda”', img: 'madakari', cap: 'Modern statue of Madakari Nayaka',
        body: 'Held Chitradurga until it fell after a long siege in 1779. The fort was built in several phases; individual walls and structures are attributed variously to him, his predecessors and later rulers, so we avoid crediting him with the whole fort.' },
      { name: 'Nalwadi Krishnaraja Wadiyar (Krishnaraja Wadiyar IV)', when: 'r. 1894–1940', role: 'Maharaja of Mysore · Title: “Rajarshi”', img: 'nalwadi', cap: 'Krishnaraja Wadiyar IV',
        body: 'Under his rule Mysore established the University of Mysore (1916), the Krishna Raja Sagara dam, the Mysore Iron Works at Bhadravati, the Government Soap Factory and the Bank of Mysore, and appointed the Miller Committee (1918) on representation for backward communities. He is popularly remembered by the title “Rajarshi” (saint-king). His reforms are traced year by year in the Banks, Industries and Modern Contributions chapter.' },
      { name: 'The Wadiyar family today', when: '2015 – present', role: 'Former royal family of Mysore · Custodians of the palace’s Dasara traditions', img: 'wadiyarFamily', group: true,
        cap: 'Yaduveer Krishnadatta Chamaraja Wadiyar and Trishika Kumari Wadiyar with Pramoda Devi Wadiyar and their two sons, Aadyaveer and Yugadhyaksh, at Mysore Palace',
        body: 'After Srikantadatta Narasimharaja Wadiyar died in 2013, his widow Pramoda Devi Wadiyar adopted Yaduveer Krishnadatta Chamaraja Wadiyar in 2015; he was installed as head of the family at Mysore Palace on 28 May that year. Princely titles and privy purses were abolished in 1971, so the family’s role today is ceremonial and cultural, seen most clearly in the private Navaratri rituals and the Khasagi Durbar during Dasara. Yaduveer married Trishika Kumari of the Dungarpur family in 2016; they have two sons, Aadyaveer (b. 2017) and Yugadhyaksh (b. 2024). In 2024 Yaduveer was elected to the Lok Sabha from Mysore.' },
      { name: 'The Anegundi family today', when: 'Anegundi, Koppal district', role: 'Descendants of the Aravidu rulers of the Karnata (Vijayanagara) empire', img: 'anegundiFamily', group: true,
        cap: 'Members of the Anegundi family, descendants of the Vijayanagara rulers, at the family home',
        body: 'Anegundi, on the north bank of the Tungabhadra opposite Hampi, was an early seat of the Karnata (Vijayanagara) empire before its capital moved across the river; tradition links its beginnings to the brothers Harihara and Bukka, and identifies Anegundi with Kishkindha of the Ramayana. The family, known locally as the Anegundi royal family, traces its descent from the Aravidu rulers, the empire’s last dynasty. Krishna Devaraya, who describes himself as the 19th descendant, has restored the family’s ancestral mansion, the Heere Deewan, where the family’s trust held a Vijayanagara Utsava in 2024 displaying family textiles, weapons and documents; family members also take part in temple festivals around Hampi.' },
    ],
  },
  builders: {
    label: 'Engineers, scientists & entrepreneurs',
    intro: 'Builders of institutions and industries — distinguished here by what each personally did.',
    people: [
      { name: 'Sir M. Visvesvaraya', when: '1861–1962', role: 'Engineer and statesman · Bharat Ratna 1955', img: 'visvesvaraya', cap: 'M. Visvesvaraya in his thirties',
        body: 'As chief engineer he led the Krishna Raja Sagara dam project on the Kaveri; he designed automatic sluice gates, advised on flood protection for Hyderabad after the 1908 floods, and as Diwan of Mysore (1912–1918) promoted industries, banking and technical education. His birthday, 15 September, is celebrated as Engineers’ Day not only in India but also in Sri Lanka and Tanzania. Many public works of his era were the work of large teams; we credit him with the roles he actually held.' },
      { name: 'C. N. R. Rao', when: 'b. 1934', role: 'Chemist · Bharat Ratna 2014', img: 'cnrRao', cap: 'C. N. R. Rao',
        body: 'Bengaluru-born scientist known for solid-state and materials chemistry, long associated with the Indian Institute of Science and the Jawaharlal Nehru Centre for Advanced Scientific Research.' },
      { name: 'K. Kasturirangan', when: '1940–2025', role: 'Space scientist, ISRO chairman 1994–2003 · Padma Vibhushan 2000', img: 'kasturirangan', cap: 'K. Kasturirangan at the Indian Institute of Science, 2010',
        body: 'Born in Ernakulam, Kerala, he spent most of his career in Bengaluru, directing the ISRO Satellite Centre and the Bhaskara satellite projects before leading ISRO from 1994 to 2003. He later directed the National Institute of Advanced Studies in Bengaluru and chaired the committee that drafted the National Education Policy 2020. He also received the Padma Shri (1982) and the Padma Bhushan (1992).' },
      { name: 'N. R. Narayana Murthy', when: 'b. 1946', role: 'Co-founder, Infosys · Padma Vibhushan 2008', img: 'narayanaMurthy', cap: 'N. R. Narayana Murthy',
        body: 'Co-founded Infosys in 1981 with six colleagues and led it as chief executive until 2002, helping define India’s software-services industry from Bengaluru.' },
      { name: 'Sudha Murty', when: 'b. 1950', role: 'Engineer, author, philanthropist · Padma Bhushan 2023', img: 'sudhaMurty', cap: 'Sudha Murty',
        body: 'Became the first woman engineer hired by TELCO; later chaired the Infosys Foundation, supporting education, health and libraries. A prolific author in Kannada and English, she was nominated to the Rajya Sabha in 2024. Her work is distinct from her husband’s role at Infosys.' },
      { name: 'Kiran Mazumdar-Shaw', when: 'b. 1953, Bengaluru', role: 'Founder, Biocon · Padma Shri 1989 · Padma Bhushan 2005', img: 'kiranMazumdar', cap: 'Kiran Mazumdar-Shaw, 2014',
        body: 'Trained as a brewer in Australia, she founded Biocon in Bengaluru in 1978, starting in a rented garage. It grew from an enzymes maker into a major biopharmaceutical company, and in 2004 became the first Indian biotechnology company to offer its shares to the public. Through the Biocon Foundation and the Mazumdar-Shaw Medical Foundation she has supported low-cost clinics and cancer care.' },
      { name: 'Vijay Sankeshwar', when: 'b. 1950, Betageri (Gadag)', role: 'Founder, VRL Logistics and Vijayavani · Padma Shri 2020', img: 'sankeshwarPortrait', cap: 'Vijay Sankeshwar',
        body: 'He started a transport business in Gadag in 1976 with a single truck and built it into VRL Logistics, based in Hubballi, one of India’s largest private fleets of commercial vehicles. He also founded the Kannada dailies Vijaya Karnataka (1999, later sold) and Vijayavani (2012), and represented Dharwad North in the Lok Sabha from 1996 to 2004.' },
      { name: 'V. G. Siddhartha', when: 'c. 1959–2019', role: 'Founder, Café Coffee Day', img: 'siddharthaPortrait', cap: 'V. G. Siddhartha',
        body: 'From a coffee-growing family in Chikkamagaluru district, he began trading coffee in the early 1990s and opened the first Café Coffee Day on Brigade Road, Bengaluru, in 1996. The chain took café culture to towns and cities across India, serving coffee grown in Karnataka. He also invested in technology companies, including Mindtree. He died in July 2019.' },
      { name: 'Nithin Kamath & Nikhil Kamath', when: 'Zerodha, founded 2010', role: 'Fintech entrepreneurs, Bengaluru', img: 'nithinKamath', cap: 'Nithin Kamath', img2: 'nikhilKamath', cap2: 'Nikhil Kamath',
        body: 'The brothers co-founded Zerodha, a Bengaluru-based brokerage that brought low-cost online investing to millions, and the Rainmatter initiatives supporting fintech and climate start-ups.' },
      { name: 'Saalumarada Thimmakka', when: 'Hulikal, Ramanagara district', role: 'Environmentalist · Padma Shri 2019', img: 'thimmakka', cap: 'Saalumarada Thimmakka, 2011',
        body: 'With her husband Bikkala Chikkaiah, she planted and nurtured hundreds of banyan saplings along the road between Hulikal and Kudur, carrying water to them over years. “Saalumarada” means “of the row of trees” — a name the public gave her.' },
      { name: 'Anke Gowda', when: 'b. c. 1947, Pandavapura (Mandya district)', role: 'Book collector, founder of Pustaka Mane · Padma Shri 2026', img: 'ankeGowda', cap: 'Anke Gowda with an 1838 Kannada–English dictionary at Pustaka Mane, 2012',
        body: 'A former bus conductor and sugar-factory timekeeper, he spent much of his income over five decades buying books. His collection, reported at about two million volumes, is open free of charge in Pustaka Mane (“House of Books”) at Pandavapura. He was named for the Padma Shri in 2026 for promoting literacy and learning.' },
    ],
  },
  arts: {
    label: 'Arts, music & letters',
    intro: 'A few of the many artists who carried Karnataka’s culture to the world.',
    people: [
      { name: 'Dr. Rajkumar', when: '1929–2006', role: 'Actor and singer · Dadasaheb Phalke Award 1995', img: 'rajkumar', cap: 'Rajkumar on a 2009 Indian postage stamp',
        body: 'The defining star of Kannada cinema, with more than two hundred films. He received the Padma Bhushan (1983), a National Film Award for playback singing, and led the 1982 Gokak agitation for Kannada in education.' },
      { name: 'Arun Yogiraj', when: 'Mysuru', role: 'Sculptor', img: 'arunYogirajPortrait', cap: 'Arun Yogiraj with one of his sculptures',
        body: 'From a family of sculptors in Mysuru, he carved the Ram Lalla idol consecrated at the Ram temple in Ayodhya in January 2024, as well as the statue of Netaji Subhas Chandra Bose at India Gate, New Delhi.' },
      { name: 'Bhimsen Joshi & Gangubai Hangal', when: '20th century', role: 'Hindustani vocalists from North Karnataka', img: 'bhimsenPortrait', cap: 'Bhimsen Joshi', img2: 'gangubaiPortrait', cap2: 'Gangubai Hangal',
        body: 'Dharwad, Hubballi and Gadag gave Hindustani music some of its greatest voices — Bhimsen Joshi (Bharat Ratna 2008), Gangubai Hangal, Mallikarjun Mansur and Basavaraj Rajguru — a reminder that Karnataka lives in both Carnatic and Hindustani traditions.' },
      { name: 'R. K. Laxman', when: '1921–2015', role: 'Cartoonist, born in Mysuru', img: 'rkLaxmanPortrait', cap: 'R. K. Laxman',
        body: 'Creator of “The Common Man”, whose daily cartoon observed Indian public life for more than five decades.' },
      { name: 'Jakanachari', when: 'Legendary · c. 11th–12th century by tradition', role: '“Amarashilpi” — the legendary master sculptor', img: 'jakanachariPortrait', cap: 'Jakanachari — artistic depiction (no contemporary likeness exists)',
        body: 'Kannada tradition credits Jakanachari with many temples of the Kalyani Chalukya and Hoysala periods, though no inscription confirms him as a historical person; the sculptors actually named in Hoysala inscriptions include Mallitamma and Dasoja. Legend says his lost hand was restored after he built the Chennakeshava temple at his native Kridapura, renamed Kaidala (“kai” means hand). Karnataka’s Jakanachari Award for sculptors and craftsmen is named after him.' },
      { name: 'T. Chowdiah', when: '1895–1967', role: 'Carnatic violinist · Sangita Kalanidhi 1957', img: 'chowdiahPortrait', cap: 'T. Chowdiah playing the violin',
        body: 'Born at Tirumakudalu Narasipura near Mysuru, he was a leading accompanist to the great Carnatic vocalists before becoming a soloist and a court musician in Mysore. He devised a seven-string violin to carry sound in large halls before amplification, and composed under the name “Trimakuta”. He founded the Ayyanar College of Music in Bangalore in 1952; the violin-shaped Chowdiah Memorial Hall is named after him.' },
      { name: 'Puttanna Kanagal', when: '1933–1985', role: 'Film director · National Film Awards for Gejje Pooje and Sharapanjara', img: 'puttannaPortrait', cap: 'Puttanna Kanagal',
        body: 'After assisting B. R. Panthulu, he directed his first Kannada film, Belli Moda, in 1967. Gejje Pooje won National Film Awards for the best Kannada film and for its screenplay, and Sharapanjara also won the best Kannada film award. His films, often centred on women and adapted from Kannada novels, include Naagarahaavu and Ranganayaki, and gave early roles to actors such as Vishnuvardhan and Ambareesh.' },
      { name: 'P. Lankesh', when: '1935–2000', role: 'Writer, film-maker and editor · Sahitya Akademi Award 1993', img: 'lankeshPortrait', cap: 'P. Lankesh',
        body: 'A short-story writer, novelist, playwright and poet from Shivamogga district, he won the Sahitya Akademi Award for the story collection Kallu Karaguva Samaya. His film Pallavi (1976) won the National Film Award for Best Direction. In 1980 he left teaching English at Bangalore University to found Lankesh Patrike, an advertisement-free weekly he edited until his death.' },
      { name: 'M. V. Kamath', when: '1921–2014', role: 'Journalist and author · Padma Bhushan 2004', img: 'kamathPortrait', cap: 'M. V. Kamath',
        body: 'Born in Udupi, he was Washington correspondent of The Times of India, edited The Illustrated Weekly of India and later chaired Prasar Bharati, India’s public broadcaster. He wrote more than 50 books, and from 1997 was honorary director of the School of Communication at Manipal.' },
      { name: 'Anant Nag', when: 'b. 1948, Shirali (Uttara Kannada)', role: 'Actor and former minister · Dadasaheb Phalke Award for 2024 (presented 2026) · Padma Bhushan 2025', img: 'anantNagPortrait', cap: 'Anant Nag at the 72nd National Film Awards, Kevadia, 2026',
        body: 'He began in films with Sankalpa (1973) and Shyam Benegal’s Ankur (1974), going on to six Benegal films including Nishant, Manthan and Bhumika, and has acted in more than 300 films, most of them in Kannada — among them Bayalu Daari, Naa Ninna Bidalaare, Gauri Ganesha and Godhi Banna Sadharana Mykattu. He served as MLA for Malleshwaram and as Minister for Bangalore Development (1996–99). The elder brother of Shankar Nag, he also acted in Malgudi Days; in September 2026 the President presented him the Dadasaheb Phalke Award for 2024.' },
      { name: 'Shankar Nag', when: '1954–1990, born Honnavar', role: 'Actor, director and theatre-maker · Best Actor (Silver Peacock), IFFI 1979 · Director of Malgudi Days', img: 'shankarNagPortrait', cap: 'Shankar Nag',
        body: 'His debut in Girish Karnad’s Ondanondu Kaladalli (1978) made him the first recipient of the Best Actor award at the International Film Festival of India. He directed the Doordarshan series Malgudi Days, from R. K. Narayan’s stories and filmed largely at Agumbe, and founded the Sanket theatre group with his brother Anant Nag; Ranga Shankara theatre in Bengaluru (2004) was built in his memory. He died in a road accident near Davanagere in 1990, aged 35.' },
      { name: 'Puneeth Rajkumar', when: '1975–2021', role: 'Actor, singer and producer · National Film Award (Best Child Artist) · Karnataka Ratna (posthumous, 2022)', img: 'puneethPortrait', cap: 'Puneeth Rajkumar in 2019',
        body: 'The youngest son of Dr. Rajkumar, he won the National Film Award for Best Child Artist for Bettada Hoovu (1985) and went on to lead more than 30 Kannada films, also singing and producing. He died of a heart attack in 2021, aged 46; his donated eyes restored sight to four people, and eye-donation pledges in Karnataka rose sharply afterwards. The Karnataka Ratna was conferred on him posthumously in 2022.' },
    ],
  },
  sport: {
    label: 'Sport',
    intro: 'Champions who learned their game in Karnataka.',
    people: [
      { name: 'Anil Kumble', when: 'b. 1970, Bengaluru', role: 'Cricketer, captain and coach', img: 'kumble', cap: 'Anil Kumble',
        body: 'India’s highest Test wicket-taker with 619 wickets. In 1999 at Delhi he took all ten wickets in a Test innings against Pakistan — only the second bowler ever to do so.' },
      { name: 'E. A. S. Prasanna', when: 'b. 1940, Bengaluru', role: 'Off-spin bowler · Padma Shri 1970', img: 'prasanna', cap: 'E. A. S. Prasanna',
        body: 'One of India’s famous spin quartet, he took 189 wickets in 49 Tests. When he was picked for the 1962 tour of the West Indies, his father was reluctant to let him go; Maharaja Jayachamarajendra Wadiyar of Mysore encouraged him and helped make the trip possible. He later finished his engineering degree at the National Institute of Engineering, Mysuru, and in 2004 received the BCCI’s C. K. Nayudu Lifetime Achievement Award.' },
      { name: 'Prakash Padukone', when: 'b. 1955', role: 'Badminton player', img: 'padukone', cap: 'Prakash Padukone',
        body: 'Won the All England Championships in 1980, the first Indian to do so, and later co-founded a leading badminton academy in Bengaluru.' },
      { name: 'Ashwini Ponnappa', when: 'b. 1989, Bengaluru', role: 'Badminton doubles player · Arjuna Award 2012', img: 'ashwiniPonnappa', cap: 'Ashwini Ponnappa at the 2010 Commonwealth Games, New Delhi',
        body: 'With Jwala Gutta she won women’s doubles gold at the 2010 Commonwealth Games in Delhi, and in 2011 the pair took bronze at the World Championships in London, becoming the first Indian pair to win a World Championships medal. She has played at three Olympic Games: 2012, 2016 and 2024.' },
      { name: 'M. R. Poovamma', when: 'b. 1990, Gonikoppal (Kodagu)', role: 'Sprinter (400 m) · Arjuna Award 2015', img: 'poovamma', cap: 'M. R. Poovamma at the 2017 Asian Athletics Championships, Bhubaneswar',
        body: 'She won 4×400 m relay gold at the Asian Games in 2014 (Incheon) and 2018 (Jakarta), along with individual 400 m bronze in 2014. She also won relay gold at the Asian Athletics Championships in 2013 and 2017, and ran in India’s women’s relay team at the 2016 Rio Olympics.' },
      { name: 'Shreyanka Patil', when: 'b. 2002, Bengaluru', role: 'Cricketer (off-spinning all-rounder) · WPL Purple Cap and Emerging Player of the Season 2024', img: 'shreyankaPortrait', cap: 'Shreyanka Patil with the Women’s Premier League trophy',
        body: 'She has played for Karnataka since 2019 and for Royal Challengers Bengaluru in the Women’s Premier League since its first season in 2023. In 2024 she was the league’s leading wicket-taker with 13 wickets, including 4/12 in the final, as the team won its first title; it won again in 2026. She made her debut for India in December 2023, played at the 2024 and 2026 Women’s T20 World Cups, and was in the India squad that won gold at the 2026 Asian Games.' },
      { name: 'Rahul Dravid', when: 'b. 1973, Indore; raised in Bengaluru', role: 'India batsman, captain and head coach · Arjuna 1998 · Padma Shri 2004 · Padma Bhushan 2013 · ICC Hall of Fame 2018', img: 'dravidPortrait', cap: 'Rahul Dravid in 2009',
        body: 'Known as “The Wall” for his defensive technique, he played 164 Tests (1996–2012), scoring 13,288 runs with 36 centuries, and 10,889 runs in 344 ODIs, and captained India in both formats in 2005–07. As India’s head coach from November 2021, he guided the team to victory in the 2024 ICC Men’s T20 World Cup.' },
    ],
  },
  reform: {
    label: 'Reformers & resistance',
    intro: 'People who fought injustice — colonial rule, caste prejudice, exclusion.',
    people: [
      { name: 'Rani Abbakka Chowta', when: '16th century', role: 'Queen of Ullal', img: 'abbakka', cap: 'Rani Abbakka on a 2023 Indian postage stamp',
        body: 'Led resistance against Portuguese attempts to control the coastal trade around Mangaluru.' },
      { name: 'Rani Chennabhairadevi', when: 'r. c. 1552–1606 (traditional dates)', role: 'Queen of Gerusoppa · Called “Rainha da Pimenta” (Pepper Queen) by the Portuguese', img: 'chennabhairadeviPortrait', cap: 'Rani Chennabhairadevi — artistic depiction (no contemporary portrait survives)',
        body: 'A Jain queen of the Saluva line, she governed Gerusoppa (Nagire) under the Karnata (Vijayanagara) empire. Its ports, among them Honnavar and Bhatkal, shipped pepper to Arab and European merchants, and she clashed with the Portuguese in 1559 and 1570. Tradition holds that she was finally defeated by the chiefs of Keladi and Bilgi and died a prisoner at Keladi.' },
      { name: 'Keladi Chennamma', when: 'r. 1672–1697 (some sources end her reign in 1696)', role: 'Queen of the Keladi (Ikkeri) Nayaka kingdom', img: 'keladiChennammaPortrait', cap: 'Keladi Chennamma — artistic depiction (no contemporary portrait survives)',
        body: 'After her husband Somashekhara Nayaka died in 1672 she ruled from Bidanur for about 25 years, and adopted Basavappa Nayaka, who succeeded her. In 1689 she gave the Maratha prince Rajaram safe passage as he fled the Mughals towards Jinji, and withstood the Mughal forces sent against her kingdom afterwards.' },
      { name: 'Kittur Rani Chennamma', when: '1778–1829', role: 'Queen of Kittur', img: 'chennamma', cap: 'Kittur Rani Chennamma (statue)',
        body: 'In 1824 she took up arms when the East India Company refused to recognise her adopted son. She died in captivity at Bailhongal; her lieutenant Sangolli Rayanna continued the fight.' },
      { name: 'Sangolli Rayanna', when: '1798–1831', role: 'Commander of Kittur’s forces', img: 'rayannaPortrait', cap: 'Sangolli Rayanna — artistic depiction (no contemporary portrait survives)',
        body: 'Born at Sangolli in Belagavi district, he fought for Kittur in 1824. From 1829 he led a guerrilla campaign against Company rule, seeking to place Chennamma’s adopted son on the throne. Captured in 1830, he was hanged near Nandagad on 26 January 1831. Bengaluru’s main railway station is named after him.' },
      { name: 'Kudmul Ranga Rao', when: '1859–1928', role: 'Social reformer, Mangaluru', img: 'kudmulPortrait', cap: 'Kudmul Ranga Rao (portrait painting)',
        body: 'Founded the Depressed Classes Mission in Mangaluru (1897), opening schools and hostels for children of oppressed castes.' },
      { name: 'Kamaladevi Chattopadhyay', when: '1903–1988, born Mangaluru', role: 'Freedom fighter and champion of Indian crafts · Padma Bhushan 1955 · Ramon Magsaysay Award 1966 · Padma Vibhushan 1987', img: 'kamaladeviPortrait', cap: 'Kamaladevi Chattopadhyay in later life',
        body: 'Jailed for her part in civil disobedience, she became in 1926 the first woman in India to stand for a legislative seat, in the Madras Presidency. After Independence she founded the Indian Cooperative Union (1948) to resettle refugees, headed the All India Handicrafts Board and helped found the Crafts Council of India, reviving the country’s craft and handloom traditions; she also headed the Sangeet Natak Akademi.' },
    ],
  },
  medicine: {
    label: 'Medicine',
    intro: 'Doctors who made specialist heart care affordable for ordinary patients.',
    people: [
      { name: 'Dr. Devi Shetty', when: 'b. 1953, Kinnigoli (Dakshina Kannada)', role: 'Cardiac surgeon, founder of Narayana Health · Padma Shri 2004 · Padma Bhushan 2012', img: 'deviShetty', cap: 'Dr. Devi Shetty, 2013',
        body: 'Trained at Kasturba Medical College, Mangaluru, and in England, he founded Narayana Hrudayalaya (now Narayana Health) in Bengaluru in 2001. Its high-volume approach to heart surgery became known worldwide for bringing down costs. He also received the Karnataka Ratna (2001) and the Dr. B. C. Roy Award (2003).' },
      { name: 'Dr. C. N. Manjunath', when: 'b. 1957, Hassan district', role: 'Cardiologist, former director of the Jayadeva Institute · Padma Shri 2007', img: 'manjunathPortrait', cap: 'Dr. C. N. Manjunath',
        body: 'Cholenahalli Nanjappa Manjunath joined the state-run Sri Jayadeva Institute of Cardiovascular Sciences and Research in Bengaluru in 1988 and was its director from 2006 for about 18 years, a period in which it grew substantially and opened branches in Mysuru and Kalaburagi. The institute became known for affordable cardiac care. In 2024 he was elected to the Lok Sabha from Bangalore Rural.' },
    ],
  },
  forces: {
    label: 'Armed forces',
    intro: 'Officers from Karnataka, several of them from the Kodava community of Kodagu, who reached the highest ranks of India’s armed forces.',
    people: [
      { name: 'Field Marshal K. M. Cariappa', when: '1899–1993', role: 'First Indian Commander-in-Chief of the Indian Army · Field Marshal 1986', img: 'cariappa', cap: 'General K. M. Cariappa (official portrait)',
        body: 'Born in Kodagu and commissioned in 1919, he was among the first Indian officers of the Indian Army and the first Indian to command a battalion; he was appointed OBE in 1945. He commanded Indian forces on the Western Front in 1947–48, and on 15 January 1949 took over as Commander-in-Chief, the date India now marks as Army Day. He was later High Commissioner to Australia and New Zealand, and was made a Field Marshal in 1986.' },
      { name: 'General K. S. Thimayya', when: '1906–1965', role: 'Chief of the Army Staff 1957–61 · DSO 1945 · Padma Bhushan 1954', img: 'thimayya', cap: 'General K. S. Thimayya (official portrait)',
        body: 'Born in Madikeri, he was the only Indian to command an infantry brigade in battle in the Second World War, in Burma, and led the 19th Infantry Division in Jammu and Kashmir in 1948. In 1953 he chaired the Neutral Nations Repatriation Commission in Korea. After serving as Chief of the Army Staff he commanded the UN peacekeeping force in Cyprus from 1964 until his death there in 1965.' },
      { name: 'Air Marshal C. D. Subbaiah', when: 'b. 1924', role: 'Fighter pilot · Vir Chakra (1948 operations) · PVSM 1972', img: 'subbaiahPortrait', cap: 'Air Marshal C. D. Subbaiah',
        body: 'Cheppudira Devaiah Subbaiah (spelt “Subia” in official records) was commissioned in the Indian Air Force in 1942 and flew in the Second World War. In the 1947–48 Kashmir operations he flew more than 70 sorties in about six weeks in support of the capture of Gurais, earning the Vir Chakra. He was Senior Air Staff Officer of Western Air Command during the 1971 war, and retired as an Air Marshal after heading Maintenance Command (1977–78).' },
      { name: 'Lt. Gen. B. C. Nanda', when: '1931–2018', role: 'GOC-in-C, Northern Command 1987–89 · PVSM 1987 · AVSM 1982', img: 'nandaPortrait', cap: 'Lt. Gen. B. C. Nanda',
        body: 'Biddanda Chengappa Nanda, a nephew of Field Marshal Cariappa, was commissioned into the Mahar Regiment in 1951 and served in the Goa (1961) and Bangladesh (1971) operations. He commanded II Corps and then the Army’s Northern Command. Retiring to Madikeri, he led the Coorg Wildlife Society and worked for conservation in the Western Ghats.' },
      { name: 'Haifa Day: the Mysore Lancers at Haifa', when: '23 September 1918 · marked every 23 September', role: 'The Mysore Lancers, state forces of the Kingdom of Mysore · Battle honour “Megiddo”', group: true,
        img: 'haifa1918', cap: 'Jodhpur and Mysore Lancers passing through Haifa after its capture, 23 September 1918 (Imperial War Museums, Q 12335)',
        img2: 'mysoreLancersMemorial', cap2: 'Mysore Lancers Memorial, J. C. Nagar, Bengaluru',
        body: 'In the First World War campaign in Sinai and Palestine, the Jodhpur Lancers and the Mysore Lancers of the 15th (Imperial Service) Cavalry Brigade captured the port of Haifa on 23 September 1918. A squadron of the Mysore Lancers stormed an Austrian battery on the slopes of Mount Carmel while the Jodhpur Lancers made the main mounted charge, and the Mysore Lancers followed them into the town. The Lancers’ roll of honour is kept at the Mysore Lancers Memorial in J. C. Nagar, Bengaluru, where a wreath is laid each year, and the Indian Army’s 61st Cavalry, which carries on both regiments, marks 23 September as Haifa Day. In 2018 New Delhi’s Teen Murti Chowk, the memorial to the brigade, was renamed Teen Murti Haifa Chowk.' },
    ],
  },
  saints: {
    label: 'Saints, seers & philosophers',
    intro: 'Teachers whose ideas and institutions shaped religious and social life in Karnataka and far beyond. Dates for medieval figures are often traditional.',
    people: [
      { name: 'Madhvacharya', when: 'c. 1238–1317 (another chronology: 1199–1278)', role: 'Philosopher; founder of the Dvaita school of Vedanta', img: 'madhvaPortrait', cap: 'Madhvacharya — artistic depiction (no contemporary likeness exists)',
        body: 'Born, by tradition, at Pajaka near Udupi, he wrote commentaries on the Upanishads, the Bhagavad Gita and the Brahma Sutras; tradition credits him with 37 works. He taught that the individual soul and Brahman are eternally distinct, and founded the Krishna Matha at Udupi, still the centre of the Madhva tradition.' },
      { name: 'Vidyaranya', when: 'd. 1386', role: 'Head of the Sringeri Sharada Peetham; Advaita scholar', img: 'vidyaranyaPortrait', cap: 'Vidyaranya — artistic depiction (no contemporary likeness exists)',
        body: 'Head of the Sringeri matha in the late 14th century, he is credited with the Panchadashi, an important Advaita text. Tradition holds that he guided Harihara and Bukka in founding the Karnata (Vijayanagara) empire around 1336; historians debate how much of this story is later legend.' },
      { name: 'Sri Sri Sri Shivakumara Swamiji', when: '1907–2019', role: 'Head of Siddaganga Matha, Tumakuru · Karnataka Ratna 2007 · Padma Bhushan 2015', img: 'shivakumaraSwami', cap: 'Sri Shivakumara Swamiji at Siddaganga Matha, 2007',
        body: 'Born at Veerapura near Magadi, he led the Siddaganga Matha from 1941 until his death at the reported age of 111. The matha’s education society runs more than a hundred institutions, and its residential school has given thousands of children free food, schooling and shelter regardless of caste or creed, the tradition of trividha dasoha. Devotees called him “Nadedaaduva Devaru”, the walking god.' },
    ],
  },
  law: {
    label: 'Law & justice',
    intro: 'A father and daughter from Karnataka at the summit of India’s judiciary.',
    people: [
      { name: 'Justice E. S. Venkataramiah', when: '1924–1997', role: '19th Chief Justice of India, 1989', img: 'esVenkataramiah', cap: 'Justice E. S. Venkataramiah (official portrait)',
        body: 'Schooled at Pandavapura and Mysore, he practised in Bangalore, became Advocate General of Mysore and joined the Karnataka High Court in 1970. Appointed to the Supreme Court in 1979, he was Chief Justice of India from June to December 1989, the first from Karnataka to hold the office.' },
      { name: 'Justice B. V. Nagarathna', when: 'b. 1962, Bengaluru', role: 'Judge of the Supreme Court of India since 2021', img: 'bvNagarathna', cap: 'Justice B. V. Nagarathna (official portrait)',
        body: 'Daughter of Justice Venkataramiah, she practised law in Bengaluru from 1987 and served on the Karnataka High Court from 2008. Raised to the Supreme Court in 2021, she was the lone dissenting judge when a five-judge bench upheld the 2016 demonetisation in 2023. By seniority she is in line to become India’s first woman Chief Justice in September 2027, for about five weeks before she retires.' },
    ],
  },
};

function Person({ p, onOpen }) {
  return (
    <Reveal className="person">
      <div className="stack">
        <button className="img-open" onClick={() => onOpen({ p, k: p.img, cap: p.cap })} aria-label={`${p.name}: open enlarged image and details`}>
          <Img k={p.img} ratio="ratio-1" credit={false} alt={p.cap || p.name} placeholderNote={p.note} />
        </button>
        {p.img2 && (
          <button className="img-open" onClick={() => onOpen({ p, k: p.img2, cap: p.cap2 })} aria-label={`${p.cap2}: open enlarged image and details`}>
            <Img k={p.img2} ratio="ratio-1" credit={false} alt={p.cap2} />
          </button>
        )}
      </div>
      <div>
        <div className="tiny muted" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.when}</div>
        <h3 className="h4">{p.name}</h3>
        <div className="role">{p.role}</div>
        <p>{p.body}</p>
        {p.cap && <p className="tiny muted mt-1" style={{ margin: '8px 0 0' }}>Image: {p.cap}{p.cap2 ? `; ${p.cap2}` : ''} — credits on the Sources page.</p>}
        {!p.cap && p.note && <p className="tiny muted mt-1" style={{ margin: '8px 0 0' }}>Image: {p.note}</p>}
      </div>
    </Reveal>
  );
}

export default function People() {
  const [g, setG] = useState('rulers');
  const [open, setOpen] = useState(null);
  const group = GROUPS[g];
  return (
    <>
      <PageHero path="/people" image="krs" alt="Krishna Raja Sagara dam on the Kaveri"
        lede="Rulers, engineers, saints, scientists, artists, athletes and ordinary citizens with extraordinary persistence. Biographies are brief and factual; we do not attach quotations we cannot verify." />
      <section className="section">
        <div className="wrap">
          <Tabs label="People by field" value={g} onChange={setG} tabs={Object.entries(GROUPS).map(([id, x]) => ({ id, label: x.label }))} />
          <div className="split top">
            <div className="stack" style={{ position: 'sticky', top: 110 }}>
              <SectionHead eyebrow={`${group.people.length} people`} title={group.label} lede={group.intro} />
              {g === 'rulers' && <Note kind="interpretation" title="Context">Kingdoms overlapped and borders moved. See the timeline chapter to compare their periods.</Note>}
            </div>
            <div>{group.people.map((p) => <Person key={p.name} p={p} onOpen={setOpen} />)}</div>
          </div>
          <div className="mt-5"><Sources items={[SRC.padma, SRC.dff, SRC.pib, SRC.kamath, SRC.W('M. Visvesvaraya'), SRC.W('Saalumarada Thimmakka'), SRC.W('Arun Yogiraj'), SRC.W('Krishna Raja Wadiyar IV'), SRC.W('Anil Kumble'), SRC.W('E. A. S. Prasanna'), SRC.W('Jayachamarajendra Wadiyar'),
            SRC.W('Rani Chennabhairadevi'), SRC.W('Keladi Chennamma'), SRC.W('Sangolli Rayanna'), SRC.W('Madhvacharya'), SRC.W('Vidyaranya'), SRC.W('Jakanachari'), SRC.W('Shivakumara Swami'),
            SRC.W('K. M. Cariappa'), SRC.W('Kodandera Subayya Thimayya'), SRC.W('C. D. Subbaiah'), SRC.W('Biddanda Chengappa Nanda'),
            SRC.W('Kiran Mazumdar-Shaw'), SRC.W('K. Kasturirangan'), SRC.W('Anke Gowda'), SRC.W('Devi Shetty'), SRC.W('C. N. Manjunath'),
            SRC.W('E. S. Venkataramiah'), SRC.W('B. V. Nagarathna'), SRC.W('Puttanna Kanagal'), SRC.W('P. Lankesh'), SRC.W('M. V. Kamath'), SRC.W('Chowdiah'),
            SRC.W('Ashwini Ponnappa'), SRC.W('Poovamma Machettira'), SRC.W('Shreyanka Patil'), SRC.W('Vijay Sankeshwar'), SRC.W('V. G. Siddhartha'), SRC.W('Yaduveer Krishnadatta Chamaraja Wadiyar'), SRC.W('Twenty-sixth Amendment of the Constitution of India'), SRC.W('Anegundi'), SRC.W('Aravidu dynasty'), SRC.W('Shankar Nag'), SRC.W('Puneeth Rajkumar'), SRC.W('Rahul Dravid'), SRC.W('Kamaladevi Chattopadhyay'), SRC.W('Anant Nag'), SRC.W('Battle of Haifa (1918)'), SRC.W('15th (Imperial Service) Cavalry Brigade'), SRC.W('61st Cavalry (India)'),
            { label: 'Frontline — Remembering the Mysore Lancers and their heroic charge (2022)', url: 'https://frontline.thehindu.com/arts-and-culture/heritage/remembering-the-mysore-lancers-and-their-heroic-charge-in-the-first-world-war/article65996291.ece', kind: 'Reference (secondary)' },
            { label: 'PIB — 72nd National Film Awards and Dadasaheb Phalke Award (22 Sep 2026)', url: 'https://www.pib.gov.in/ShowAlbum.aspx?albumid=230092&reg=48&lang=1', kind: 'Official' },
            { label: 'Ramon Magsaysay Award Foundation — Kamaladevi Chattopadhyay', url: 'https://www.rmaward.asia/awardees/chattopadhyay-kamaladevi', kind: 'Official' },
            { label: 'ESPNcricinfo Statsguru — Rahul Dravid, Test batting', url: 'https://stats.espncricinfo.com/ci/engine/player/28114.html?class=1;template=results;type=batting', kind: 'Reference (secondary)' },
            { label: 'The Hindu — Krishna Devaraya’s descendant on the Vijayanagara Utsava (16 Feb 2024)', url: 'https://www.thehindu.com/news/national/karnataka/emperor-krishna-devarayas-descendent-throws-light-on-multiculturalism-thriving-in-vijayanagara-empire/article67849575.ece', kind: 'Reference (secondary)' }]} /></div>
        </div>
      </section>
      {open && (
        <Modal onClose={() => setOpen(null)} label={open.p.name}>
          <div className="modal-grid">
            <Img k={open.k} ratio="" caption={open.cap} full placeholderNote={open.p.note} className={open.p.group ? 'pop-group' : 'pop-portrait'} />
            <div className="modal-body stack">
              <div className="eyebrow">{group.label}</div>
              <h2 className="h2">{open.p.name}</h2>
              <div className="tiny muted" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>{open.p.when}</div>
              <div className="role">{open.p.role}</div>
              <p>{open.p.body}</p>
            </div>
          </div>
        </Modal>
      )}
      <NextChapter path="/people" />
    </>
  );
}

import { Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, ZoomImg } from '../components/ui.jsx';
import { useLang } from '../i18n.jsx';
import { SRC } from '../data/sources.js';

const THREE = [
  { t: 'Devotion', kn: 'ಭಕ್ತಿ', d: 'In Shakta tradition Bhuvaneshvari — “sovereign of the worlds” — is a form of the Goddess, one of the ten Mahavidyas. A temple to Bhuvaneshwari at Bhuvanagiri in Siddapura taluk (Uttara Kannada), associated with the Keladi rulers, is popularly described as a temple to Kannada Thayi.', kind: 'tradition' },
  { t: 'Literary symbol', kn: 'ಸಾಹಿತ್ಯ ಸಂಕೇತ', d: 'Poets of the Navodaya era and the unification movement addressed the Kannada land and language as a mother — Kannada Thayi, Kannadambe, Karnataka Mate — in songs sung at schools and gatherings.', kind: 'fact' },
  { t: 'Civic identity', kn: 'ನಾಗರಿಕ ಅಸ್ಮಿತೆ', d: 'On Rajyotsava, an image of Bhuvaneshwari holding the red-and-yellow flag is decorated in offices, schools and streets. For many people of every faith — and none — it is a cultural emblem of belonging rather than an act of worship.', kind: 'fact' },
];

export default function Bhuvaneshwari() {
  const { t } = useLang();
  return (
    <>
      <PageHero path="/bhuvaneshwari" image="kodagu" alt="Mist over the Tadiandamol valley, Western Ghats, Kodagu"
        lede="Why do people speak of a land as a mother? Because it feeds us, gives us a language, holds our memories — and asks something of us in return." />

      <section className="section">
        <div className="wrap split">
          <div className="stack">
            <SectionHead eyebrow="Kannada Thayi · ಕನ್ನಡ ತಾಯಿ" title="Mother Kannada" kn="ತಾಯಿ ಭುವನೇಶ್ವರಿ"
              lede="Bhuvaneshwari is often depicted as Kannada Thayi — the personification of the Kannada language and land. The image unites three different things that are worth keeping distinct: religious devotion, literary symbolism and civic identity." />
          </div>
          <Reveal>
            <ZoomImg k="kannadaThayi" ratio="ratio-3x4" alt="Kannada Thayi (Bhuvaneshwari) seated on a throne holding the red-and-yellow Kannada flag"
              caption="Kannada Thayi — Bhuvaneshwari with the Kannada flag (contemporary illustration)" portrait
              title="Kannada Thayi" eyebrow="ಕನ್ನಡ ತಾಯಿ · Mother Kannada"
              info={<p>Bhuvaneshwari is often depicted as Kannada Thayi — the personification of the Kannada language and land. The image unites three different things that are worth keeping distinct: religious devotion, literary symbolism and civic identity.</p>} />
          </Reveal>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap">
          <div className="grid g3">
            {THREE.map((x, i) => (
              <Reveal key={x.t} delay={i} className="panel white stack">
                <div className="kn-serif" style={{ color: 'var(--copper)', fontSize: '1.4rem' }}>{x.kn}</div>
                <h3 className="h3">{x.t}</h3>
                <p className="muted" style={{ margin: 0 }}>{x.d}</p>
                <Note kind={x.kind} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-indigo">
        <div className="wrap split top">
          <div className="stack">
            <SectionHead eyebrow="The state anthem · ನಾಡಗೀತೆ" title="Jaya Bharata Jananiya Tanujate" />
            <p className="kn-serif" style={{ fontSize: 'clamp(1.5rem,3vw,2.3rem)', color: 'var(--yellow)', lineHeight: 1.5, margin: 0 }} lang="kn">ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ<br />ಜಯ ಹೇ ಕರ್ನಾಟಕ ಮಾತೆ</p>
            <p className="it" style={{ fontSize: '1.15rem' }}>“Victory to you, Mother Karnataka, daughter of Mother India.”</p>
            <p className="tiny muted">Opening lines quoted for reference. Lyrics © the estate of Kuvempu.</p>
          </div>
          <div className="stack prose muted">
            <p>Written by <b style={{ color: 'var(--cream)' }}>Kuvempu</b>, the song was declared Karnataka’s official state song (naadageete) in 2004 and is sung at state functions, schools and Rajyotsava celebrations. Its imagery is inclusive: it names rivers, poets, saints, musicians and faiths of the land, and presents Karnataka as a daughter of India — local belonging within a national one.</p>
            <p>Kuvempu’s idea of <i>Vishwa Manava</i>, the “universal human”, asked people to grow beyond the narrow identities they are born with. For a celebration that includes colleagues from all over India, that is a fitting place to start.</p>
            <Note kind="fact" title="How it is sung">In 2022 the state government standardised the version sung at official events, set to music by Mysore Ananthaswamy.</Note>
          </div>
        </div>
      </section>

      <section className="section theme-night grain center">
        <div className="wrap-narrow stack">
          <Reveal>
            <p className="quote">{t({ en: 'A source of language, memory and nourishment — and a shared responsibility to care for it, whoever we are and wherever we come from.', kn: 'ಭಾಷೆ, ನೆನಪು ಮತ್ತು ಪೋಷಣೆಯ ಮೂಲ — ನಾವು ಯಾರೇ ಆಗಿರಲಿ, ಎಲ್ಲಿಂದಲೇ ಬಂದಿರಲಿ, ಅದನ್ನು ಕಾಪಾಡುವ ಹೊಣೆ ನಮ್ಮೆಲ್ಲರದು.' })}</p>
          </Reveal>
        </div>
      </section>
      <section className="section tight"><div className="wrap"><Sources items={[SRC.kaGov, SRC.culture, SRC.W('Jaya Bharata Jananiya Tanujate'), SRC.W('Bhuvaneshvari'), SRC.W('Kuvempu')]} /></div></section>
      <NextChapter path="/bhuvaneshwari" />
    </>
  );
}

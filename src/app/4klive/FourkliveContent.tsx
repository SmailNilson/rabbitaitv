'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

/* ──────────────────────────────────────────────────────────────────────────
   4Klive — product / landing page for the native TV player app.
   The player is sold separately from the IPTV subscription: a 7-day free
   trial, then a one-time Lifetime licence or a Yearly plan.

   ⚠️ PLACEHOLDER PRICES — confirm the real 4Klive licence prices, then update
   the PRICING constant below (single source of truth on this page).
   ────────────────────────────────────────────────────────────────────────── */

const TRIAL_DAYS = 7;

const PRICING = {
  lifetime: { price: 24.99, period: 'one-time', blurb: 'Pay once. Yours forever.' },
  yearly: { price: 9.99, period: '/year', blurb: 'Billed once a year.' },
};

const waPhone = siteConfig.contact.whatsapp.replace(/\D/g, '');
// When the buyer scans the QR on their TV's lock screen, they land here with ?device=<key>.
// We pass that Device Key through to the purchase so the licence is bound to the right TV.
const buyLink = (plan: string, device?: string | null) =>
  `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(
    `Hi! I'd like to buy the 4Klive ${plan} licence for my TV.` +
      (device ? `\nDevice Key: ${device}` : ''),
  )}`;

// A lowercase UUIDv4 — the exact shape the TV apps generate as the Device Key.
const DEVICE_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/* Download / install. The APK is served from the site's public folder.
   downloaderCode is the aftv.news (AFTVnews URL Shortener) code for
   https://www.rabbitaitv.com/downloads/4klive.apk — entered in the Downloader app on
   Fire TV / Android TV. The code maps to the URL (not the file), so swapping in a signed
   release APK at the SAME path keeps this code valid — no need to re-register. */
const DOWNLOAD = {
  apkUrl: '/downloads/4klive.apk',
  version: '1.0.0',
  downloaderCode: '9234307',
};

const platforms = [
  {
    name: 'Android TV & Fire TV',
    detail: 'Android TV, Google TV, Fire Stick, Fire TV Cube, Nvidia Shield',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    name: 'Samsung Smart TV',
    detail: 'Tizen 5.5 and newer',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <path d="M7 21h10" />
      </svg>
    ),
  },
  {
    name: 'LG Smart TV',
    detail: 'webOS 4.x and newer',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
        <path d="M9 20.5h6M12 16.5v4" />
      </svg>
    ),
  },
];

const features = [
  {
    title: '4K UHD, hardware-decoded',
    body: 'True 4K/HDR with hardware-first decoding on every box — smooth playback, no overheating, no buffering.',
    icon: 'M12 2l2.4 5.6L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.4z',
  },
  {
    title: 'Live TV with full EPG',
    body: 'A real now/next programme guide, mini-guide while watching, favourites, last-channel toggle and numeric zap.',
    icon: 'M4 5h16v12H4zM2 21h20',
  },
  {
    title: 'Catch-up & timeshift',
    body: 'Rewind live TV and replay past programmes where your provider keeps an archive.',
    icon: 'M3 12a9 9 0 1 0 9-9 9 9 0 0 0-7 3.3M3 4v4h4',
  },
  {
    title: 'Movies & series',
    body: 'Poster library, rich detail pages, season/episode navigation, per-episode progress and a Continue Watching rail.',
    icon: 'M4 4h16v16H4zM4 9h16M9 4v16',
  },
  {
    title: 'Sub-second zapping',
    body: 'Tight live buffers tuned for instant channel changes — it feels like a real TV, not a stream.',
    icon: 'M13 2L3 14h7l-1 8 10-12h-7z',
  },
  {
    title: 'Profiles & parental PIN',
    body: 'Multiple profiles, PIN-locked categories and adult content gated behind a code.',
    icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  },
  {
    title: 'Multi-audio & subtitles',
    body: 'Switch audio tracks and styled subtitles (SRT, embedded, WebVTT) on the fly.',
    icon: 'M3 5h18v14H3zM7 15h6M7 11h10',
  },
  {
    title: 'Built for the remote',
    body: 'A true 10-foot interface: fast D-pad focus, big readable type and zero clutter.',
    icon: 'M9 2h6v20H9zM12 6v.01M12 10v4',
  },
];

const steps = [
  {
    n: '1',
    title: 'Install 4Klive on your TV',
    body: 'Get it on your Android TV / Fire TV, Samsung or LG in a couple of minutes.',
  },
  {
    n: '2',
    title: 'It shows a Device Key + PIN',
    body: 'Open the app — it displays a short code on screen. Nothing long to type on the remote.',
  },
  {
    n: '3',
    title: 'Activate with your subscription',
    body: 'Enter the code on the activation page with your RabbitAI TV login. Your channels appear instantly.',
  },
];

const faqs = [
  {
    q: 'Is my subscription included in the app?',
    a: 'No — 4Klive is the player. Your channels, movies and series come from your RabbitAI TV subscription. The app licence and the subscription are billed separately.',
  },
  {
    q: `What happens after the ${TRIAL_DAYS}-day free trial?`,
    a: `You can keep using 4Klive by buying a one-time Lifetime licence or a Yearly plan. If you do nothing, the app simply locks until you activate — your subscription is unaffected.`,
  },
  {
    q: 'Which devices are supported?',
    a: 'Android TV & Fire TV (Fire Stick, Fire TV Cube, Nvidia Shield, Google TV), Samsung Smart TVs on Tizen 5.5+, and LG Smart TVs on webOS 4.x+.',
  },
  {
    q: 'Is the licence tied to one device?',
    a: 'Yes. A licence activates one TV. If you replace your TV or factory-reset it, a new licence is needed — so pick the device you watch on most.',
  },
  {
    q: 'Can I use 4Klive with my own playlist?',
    a: 'Yes. 4Klive is a standard player and works with any Xtream Codes or M3U playlist, so you are never locked in.',
  },
];

export default function FourkliveContent() {
  // Device Key arriving from the TV lock-screen QR (?device=<key>). Read AFTER mount from the
  // browser URL — not via useSearchParams, which would force this whole marketing page behind a
  // Suspense boundary and drop its server-rendered HTML for SEO. The one-shot setState is the
  // canonical way to hydrate a browser-only value, and starting at null matches the server render
  // (no hydration mismatch).
  const [device, setDevice] = useState<string | null>(null);
  useEffect(() => {
    const raw = (new URLSearchParams(window.location.search).get('device') ?? '').trim().toLowerCase();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydrate of a browser-only value post-mount
    if (DEVICE_RE.test(raw)) setDevice(raw);
  }, []);

  return (
    <div className="fk">
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">The RabbitAI TV app · for your TV</span>
            <h1>
              <span className="wordmark"><span className="wm-4k">4K</span>live</span>
              <br />
              Your TV, in stunning 4K.
            </h1>
            <p className="lead">
              A premium native player for <strong>Android TV, Fire TV, Samsung &amp; LG</strong>.
              Live TV, movies &amp; series, full EPG and catch-up — hardware-decoded, with
              zero buffering. Try it free for {TRIAL_DAYS} days.
            </p>
            <div className="hero-actions">
              <Link href="/free-trial" className="btn-trial">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                Start {TRIAL_DAYS}-day free trial
              </Link>
              <a href="#pricing" className="btn-ghost">See pricing</a>
            </div>
            <div className="hero-meta">
              <span className="pill">No card needed</span>
              <span className="pill">Works on your current TV</span>
              <span className="pill">4K · HDR</span>
            </div>
          </div>

          {/* CSS mock of the 10-foot UI — no copyrighted artwork, pure CSS. */}
          <div className="device" aria-hidden="true">
            <div className="screen">
              <div className="ui-top">
                <span className="ui-wordmark"><span className="wm-4k">4K</span>live</span>
                <span className="ui-live"><span className="dot" /> LIVE</span>
              </div>
              <div className="ui-body">
                <div className="ui-rail">
                  <span className="ui-ico is-on" /><span className="ui-ico" /><span className="ui-ico" /><span className="ui-ico" />
                </div>
                <div className="ui-main">
                  <div className="ui-hero">
                    <div className="ui-hero-tag">Live now · Sports</div>
                    <div className="ui-hero-title">Champions League — Final</div>
                    <div className="ui-play"><svg width="18" height="18" viewBox="0 0 24 24" fill="#0A0A0B"><path d="M8 5v14l11-7z" /></svg></div>
                  </div>
                  <div className="ui-rowlabel">Continue watching</div>
                  <div className="ui-posters">
                    <span className="poster p1" /><span className="poster p2" /><span className="poster p3" /><span className="poster p4" /><span className="poster p5" />
                  </div>
                </div>
              </div>
            </div>
            <div className="device-foot" />
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ──────────────────────────────────────── */}
      <section className="section platforms">
        <div className="container">
          <span className="eyebrow center">Built for the living room</span>
          <h2 className="section-title">Runs natively on your TV</h2>
          <p className="section-subtitle">
            Three native apps, one polished experience — each reaching straight for the TV&apos;s
            own hardware decoder for the smoothest 4K possible.
          </p>
          <div className="plat-grid">
            {platforms.map((p) => (
              <div key={p.name} className="plat-card">
                <span className="plat-icon">{p.icon}</span>
                <h3>{p.name}</h3>
                <p>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD / INSTALL ─────────────────────────────── */}
      <section className="section download" id="download">
        <div className="container">
          <span className="eyebrow center">Get it on your TV</span>
          <h2 className="section-title">Install in 2 minutes</h2>
          <p className="section-subtitle">
            On Android TV &amp; Fire TV, install with the free <strong>Downloader</strong> app — no computer needed.
          </p>
          <div className="dl-grid">
            <div className="dl-card dl-card--main">
              <div className="dl-head">
                <span className="plat-icon">{platforms[0].icon}</span>
                <div>
                  <h3>Fire TV &amp; Android TV</h3>
                  <p>Fire Stick · Fire TV Cube · Android / Google TV · Nvidia Shield</p>
                </div>
              </div>
              <ol className="dl-steps">
                <li>Install the free <strong>Downloader</strong> app from your TV&apos;s app store.</li>
                <li>Open it and enter this code:</li>
              </ol>
              <div className="dl-code" aria-label="Downloader code">{DOWNLOAD.downloaderCode}</div>
              <ol className="dl-steps" start={3}>
                <li>Press <strong>Go</strong>, then <strong>Install</strong> when 4Klive downloads.</li>
              </ol>
              <a href={DOWNLOAD.apkUrl} className="btn-ghost dl-apk" download>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
                Or download the APK (v{DOWNLOAD.version})
              </a>
            </div>

            <div className="dl-card">
              <div className="dl-head">
                <span className="plat-icon">{platforms[1].icon}</span>
                <div>
                  <h3>Samsung &amp; LG</h3>
                  <p>Tizen 5.5+ · webOS 4.x+</p>
                </div>
              </div>
              <p className="dl-soon">
                Coming to the Samsung &amp; LG stores. Start your free trial and our support helps
                you install it on your TV in minutes.
              </p>
              <Link href="/free-trial" className="btn-primary dl-apk">Start free trial</Link>
            </div>
          </div>

          <p className="price-note">
            <span className="note-ico" aria-hidden="true">i</span>
            <span className="note-text">
              After installing, open 4Klive — it shows a <strong>Device Key &amp; PIN</strong>. Activate it
              with your <Link href="/pricing" className="ilink">RabbitAI TV subscription</Link> and start
              watching. The app is free for {TRIAL_DAYS} days, then a one-time or yearly licence (see pricing).
            </span>
          </p>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section className="section features">
        <div className="container">
          <span className="eyebrow center">Everything, done right</span>
          <h2 className="section-title">A player that feels premium</h2>
          <p className="section-subtitle">
            Performance is the whole point — every screen is tuned for fast, fluid 4K on real TV hardware.
          </p>
          <div className="feat-grid">
            {features.map((f) => (
              <div key={f.title} className="feat-card">
                <span className="feat-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon} />
                  </svg>
                </span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section className="section how">
        <div className="container">
          <span className="eyebrow center">Up and running in minutes</span>
          <h2 className="section-title">How activation works</h2>
          <p className="section-subtitle">
            No long URLs typed on a remote. The TV shows a short code; you confirm it once.
          </p>
          <div className="steps">
            {steps.map((s) => (
              <div key={s.n} className="step">
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────── */}
      <section className="section pricing" id="pricing">
        <div className="container">
          <span className="eyebrow center">Simple, honest pricing</span>
          <h2 className="section-title">Try free, then own it</h2>
          <p className="section-subtitle">
            Start with a {TRIAL_DAYS}-day free trial. Keep the app with a one-time licence or a yearly plan.
          </p>

          {device && (
            <div className="device-detected" role="status">
              <span className="dd-check" aria-hidden="true">✓</span>
              <span className="dd-text">
                <strong>This TV is detected</strong> — Device Key ending <code>…{device.slice(-6)}</code>.
                Pick a plan below and we&apos;ll activate <strong>this device</strong>.
              </span>
            </div>
          )}

          <div className="price-grid">
            <div className="price-card trial">
              <div className="price-tag">Free trial</div>
              <div className="price-amount">{TRIAL_DAYS} days<span className="price-unit">free</span></div>
              <p className="price-blurb">Full app, every feature. No card required.</p>
              <Link href="/free-trial" className="btn-primary price-cta">Start free trial</Link>
            </div>

            <div className="price-card featured">
              <div className="ribbon">Best value</div>
              <div className="price-tag">Lifetime</div>
              <div className="price-amount">${PRICING.lifetime.price}<span className="price-unit">{PRICING.lifetime.period}</span></div>
              <p className="price-blurb">{PRICING.lifetime.blurb}</p>
              <a href={buyLink('Lifetime', device)} target="_blank" rel="noopener noreferrer" className="btn-trial price-cta">Buy lifetime</a>
            </div>

            <div className="price-card">
              <div className="price-tag">Yearly</div>
              <div className="price-amount">${PRICING.yearly.price}<span className="price-unit">{PRICING.yearly.period}</span></div>
              <p className="price-blurb">{PRICING.yearly.blurb}</p>
              <a href={buyLink('Yearly', device)} target="_blank" rel="noopener noreferrer" className="btn-secondary price-cta">Choose yearly</a>
            </div>
          </div>

          <p className="price-note">
            <span className="note-ico" aria-hidden="true">i</span>
            <span className="note-text">
              The 4Klive licence unlocks the <strong>player</strong>. Channels, movies &amp; series come from your{' '}
              <Link href="/pricing" className="ilink">RabbitAI TV subscription</Link> — billed separately. Each licence activates one TV.
            </span>
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="section faq">
        <div className="container narrow">
          <span className="eyebrow center">Good to know</span>
          <h2 className="section-title">Frequently asked</h2>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>
                  {f.q}
                  <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className="section cta-band">
        <div className="container">
          <div className="cta-inner">
            <h2>Put RabbitAI TV on the big screen.</h2>
            <p>Install 4Klive and start your {TRIAL_DAYS}-day free trial — on the TV you already own.</p>
            <div className="cta-actions">
              <Link href="/free-trial" className="btn-trial">Start free trial</Link>
              <a href={siteConfig.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask us anything</a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .fk { background: var(--background); }
        .container { max-width: var(--container-max); margin: 0 auto; padding: 0 1.5rem; }
        .container.narrow { max-width: 780px; }
        .eyebrow.center { display: flex; justify-content: center; margin-bottom: 0.85rem; }
        .wordmark { font-family: var(--font-heading); font-weight: 800; }
        .wm-4k {
          background: linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }

        /* HERO */
        .hero {
          position: relative;
          padding: 3.5rem 0 4rem;
          background:
            radial-gradient(1100px 520px at 78% -8%, rgba(242, 7, 50, 0.12), transparent 60%),
            radial-gradient(800px 400px at 10% 120%, rgba(232, 177, 76, 0.08), transparent 60%),
            var(--background);
          overflow: hidden;
        }
        .hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 3rem; align-items: center; }
        .hero-copy h1 {
          font-size: clamp(2.1rem, 5vw, 3.3rem); font-weight: 800; color: #fff; margin: 1rem 0 0; line-height: 1.08;
        }
        .hero-copy h1 .wordmark { font-size: 1.06em; }
        .lead { font-size: 1.08rem; color: var(--text-muted); margin-top: 1.1rem; max-width: 46ch; line-height: 1.65; }
        .hero-actions { display: flex; gap: 0.85rem; margin-top: 1.8rem; flex-wrap: wrap; }
        .hero-meta { display: flex; gap: 0.5rem; margin-top: 1.5rem; flex-wrap: wrap; }

        /* DEVICE MOCK */
        .device { width: 100%; }
        .screen {
          position: relative; aspect-ratio: 16 / 10; border-radius: 16px; overflow: hidden;
          background: linear-gradient(160deg, #161620, #0d0d12);
          border: 1px solid var(--border-strong);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
          padding: 0.9rem;
        }
        .device-foot {
          width: 30%; height: 10px; margin: 0 auto; border-radius: 0 0 8px 8px;
          background: linear-gradient(180deg, #26262e, #15151a);
        }
        .ui-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.7rem; }
        .ui-wordmark { font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; color: #fff; }
        .ui-live {
          display: inline-flex; align-items: center; gap: 5px; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.04em;
          color: #fff; background: rgba(242, 7, 50, 0.9); padding: 3px 8px; border-radius: 6px;
        }
        .ui-live .dot { width: 5px; height: 5px; border-radius: 50%; background: #fff; }
        .ui-body { display: grid; grid-template-columns: 34px 1fr; gap: 0.7rem; height: calc(100% - 2rem); }
        .ui-rail { display: flex; flex-direction: column; gap: 0.6rem; padding-top: 0.3rem; }
        .ui-ico { width: 26px; height: 26px; border-radius: 8px; background: rgba(255, 255, 255, 0.07); }
        .ui-ico.is-on { background: var(--primary); }
        .ui-main { min-width: 0; }
        .ui-hero {
          position: relative; height: 56%; border-radius: 12px; padding: 0.8rem; overflow: hidden;
          background: linear-gradient(135deg, #2a1030 0%, #101a30 60%, #0c2230 100%);
          display: flex; flex-direction: column; justify-content: flex-end;
        }
        .ui-hero-tag { font-size: 0.58rem; color: var(--gold); font-weight: 700; letter-spacing: 0.03em; }
        .ui-hero-title { font-size: 0.92rem; font-weight: 700; color: #fff; margin-top: 2px; }
        .ui-play {
          position: absolute; top: 0.8rem; right: 0.8rem; width: 30px; height: 30px; border-radius: 50%;
          background: #fff; display: flex; align-items: center; justify-content: center;
        }
        .ui-rowlabel { font-size: 0.62rem; color: var(--text-muted); margin: 0.6rem 0 0.4rem; font-weight: 600; }
        .ui-posters { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.4rem; }
        .poster { aspect-ratio: 2 / 3; border-radius: 7px; }
        .p1 { background: linear-gradient(160deg, #3b2a55, #1b1430); }
        .p2 { background: linear-gradient(160deg, #123a44, #0c2030); }
        .p3 { background: linear-gradient(160deg, #4a2330, #241019); }
        .p4 { background: linear-gradient(160deg, #2d3a18, #16210d); }
        .p5 { background: linear-gradient(160deg, #15314f, #0a1a2c); }

        /* PLATFORMS */
        .plat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }
        .plat-card {
          background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 1.8rem 1.5rem; text-align: center; transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .plat-card:hover { transform: translateY(-4px); border-color: var(--border-strong); }
        .plat-icon {
          display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px;
          border-radius: 14px; background: var(--primary-soft); color: var(--primary); margin-bottom: 1rem;
        }
        .plat-card h3 { font-size: 1.05rem; color: #fff; margin-bottom: 0.35rem; }
        .plat-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }

        /* DOWNLOAD */
        .dl-grid { display: grid; grid-template-columns: 1.25fr 1fr; gap: 1.1rem; align-items: stretch; }
        .dl-card {
          background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg);
          padding: 1.8rem; display: flex; flex-direction: column;
        }
        .dl-card--main { border-color: var(--primary-border); background: linear-gradient(180deg, rgba(242, 7, 50, 0.05), var(--card)); }
        .dl-head { display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.1rem; }
        .dl-head h3 { font-size: 1.1rem; color: #fff; }
        .dl-head p { font-size: 0.8rem; color: var(--text-muted); margin-top: 2px; }
        .dl-steps { margin: 0; padding-left: 1.2rem; color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; }
        .dl-steps li { margin: 0.15rem 0; }
        .dl-code {
          font-family: var(--font-heading); font-weight: 800; font-size: 2rem; letter-spacing: 0.14em;
          color: var(--gold); text-align: center; background: #0e0e10; border: 1px dashed var(--border-strong);
          border-radius: var(--radius); padding: 0.7rem 1rem; margin: 0.7rem 0;
        }
        .dl-soon { font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; flex: 1; margin-bottom: 1.2rem; }
        .download .price-note { margin-top: 1.6rem; }
        @media (max-width: 760px) { .dl-grid { grid-template-columns: 1fr; } }

        /* FEATURES */
        .features { background: var(--surface); }
        .feat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .feat-card {
          background: var(--background); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.4rem;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .feat-card:hover { transform: translateY(-4px); border-color: var(--border-strong); }
        .feat-icon {
          display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px;
          border-radius: 12px; background: var(--gold-soft); color: var(--gold); margin-bottom: 0.9rem;
        }
        .feat-card h3 { font-size: 1rem; color: #fff; margin-bottom: 0.4rem; line-height: 1.25; }
        .feat-card p { font-size: 0.86rem; color: var(--text-muted); line-height: 1.55; }

        /* HOW */
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }
        .step {
          position: relative; background: var(--card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 1.8rem 1.5rem;
        }
        .step-n {
          display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px;
          border-radius: 12px; font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem;
          color: #fff; background: linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%); margin-bottom: 1rem;
        }
        .step h3 { font-size: 1.05rem; color: #fff; margin-bottom: 0.4rem; }
        .step p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.55; }

        /* PRICING */
        .price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; align-items: stretch; }
        .price-card {
          position: relative; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg);
          padding: 2rem 1.6rem; display: flex; flex-direction: column; text-align: center;
        }
        .price-card.featured { border-color: var(--primary-border); background: linear-gradient(180deg, rgba(242, 7, 50, 0.06), var(--card)); }
        .ribbon {
          position: absolute; top: -11px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, var(--gold), var(--primary)); color: #fff;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.03em; padding: 4px 12px; border-radius: 999px; white-space: nowrap;
        }
        .price-tag { font-size: 0.95rem; font-weight: 700; color: var(--text-muted); }
        .price-amount {
          font-family: var(--font-heading); font-weight: 800; font-size: 2.4rem; color: #fff;
          margin: 0.4rem 0 0.1rem; display: flex; align-items: baseline; justify-content: center; gap: 0.35rem;
        }
        .price-unit { font-size: 0.85rem; font-weight: 600; color: var(--text-dim); }
        .price-blurb { font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.4rem; min-height: 2.4em; }
        .price-cta { margin-top: auto; width: 100%; }
        .price-note {
          display: flex; align-items: flex-start; gap: 0.6rem; max-width: 720px; margin: 2rem auto 0;
          font-size: 0.88rem; color: var(--text-muted); background: var(--surface);
          border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem 1.2rem; line-height: 1.55;
        }
        .note-ico {
          flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; background: var(--primary-soft);
          color: var(--primary); font-weight: 700; font-size: 0.75rem; font-style: italic;
          display: inline-flex; align-items: center; justify-content: center; margin-top: 1px;
        }
        .note-text { flex: 1; min-width: 0; }

        /* DEVICE DETECTED (from the TV lock-screen QR ?device=) */
        .device-detected {
          display: flex; align-items: flex-start; gap: 0.7rem; max-width: 720px; margin: 0 auto 1.7rem;
          padding: 0.9rem 1.2rem; border-radius: var(--radius);
          background: var(--gold-soft); border: 1px solid rgba(232, 177, 76, 0.35);
          color: var(--text-muted); font-size: 0.9rem; line-height: 1.55;
        }
        .device-detected strong { color: #fff; }
        .device-detected code {
          font-family: var(--font-mono, ui-monospace, monospace); color: var(--gold);
          background: rgba(0, 0, 0, 0.28); padding: 1px 6px; border-radius: 5px; letter-spacing: 0.5px;
        }
        .dd-check {
          flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; margin-top: 1px;
          background: linear-gradient(135deg, var(--gold), var(--primary)); color: #fff;
          font-size: 0.8rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center;
        }
        .dd-text { flex: 1; min-width: 0; }

        /* FAQ */
        .faq-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .faq-item {
          background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 0 1.25rem;
          transition: border-color 0.2s ease;
        }
        .faq-item[open] { border-color: var(--border-strong); }
        .faq-item summary {
          display: flex; align-items: center; justify-content: space-between; gap: 1rem; cursor: pointer;
          list-style: none; padding: 1.15rem 0; font-weight: 600; color: #fff; font-size: 0.98rem;
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .chev { color: var(--text-muted); transition: transform 0.25s ease; flex-shrink: 0; }
        .faq-item[open] .chev { transform: rotate(180deg); }
        .faq-item p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; padding: 0 0 1.15rem; margin: 0; }

        /* CTA BAND */
        .cta-band { padding-top: 1rem; }
        .cta-inner {
          text-align: center; border-radius: var(--radius-lg); padding: 3rem 1.5rem;
          background: radial-gradient(700px 320px at 50% -20%, rgba(242, 7, 50, 0.16), transparent 60%), var(--surface);
          border: 1px solid var(--border);
        }
        .cta-inner h2 { font-size: clamp(1.6rem, 3.5vw, 2.3rem); font-weight: 800; color: #fff; }
        .cta-inner p { color: var(--text-muted); margin-top: 0.7rem; font-size: 1.02rem; }
        .cta-actions { display: flex; gap: 0.85rem; justify-content: center; margin-top: 1.6rem; flex-wrap: wrap; }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr; gap: 2.2rem; }
          .device { max-width: 520px; margin: 0 auto; }
          .feat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 760px) {
          .plat-grid, .steps, .price-grid { grid-template-columns: 1fr; }
          .lead { max-width: none; }
        }
        @media (max-width: 460px) {
          .feat-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Buttons that are Next <Link>/<a> use the GLOBAL utility classes
          (.btn-primary/.btn-trial/.btn-ghost/.btn-secondary) from globals.css,
          which apply regardless of styled-jsx scoping. The :global block below
          only sizes the in-card CTAs and the inline link. */}
      <style jsx>{`
        :global(.price-cta) { width: 100%; }
        :global(.dl-apk) { width: 100%; margin-top: auto; }
        :global(.ilink) { color: #fff; text-decoration: underline; text-underline-offset: 2px; }
      `}</style>
    </div>
  );
}

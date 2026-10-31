/* Indian Basketball Pro League — site behaviour */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- data ---------------- */
  const TEAMS = [
    { id: "MUM", name: "Mumbai Monsoon", city: "Mumbai", c1: "#1E4FA8", c2: "#7FD3F7", arena: "Worli Dome", coach: "Farhan Merchant", founded: 2024,
      roster: [["4", "Kabir Shetty", "PG"], ["11", "Rohan D'Souza", "SG"], ["23", "Aditya Rane", "SF"], ["31", "Vikram Patil", "PF"], ["50", "Siddharth Jadhav", "C"]] },
    { id: "DEL", name: "Delhi Thunder", city: "New Delhi", c1: "#B91C2E", c2: "#F5C542", arena: "Indraprastha Arena", coach: "Meera Kapoor", founded: 2024,
      roster: [["7", "Arjun Sandhu", "PG"], ["3", "Karan Malhotra", "SG"], ["15", "Yash Rathi", "SF"], ["22", "Nikhil Chauhan", "PF"], ["44", "Harpreet Gill", "C"]] },
    { id: "BLR", name: "Bengaluru Blaze", city: "Bengaluru", c1: "#2B2B2B", c2: "#FF6A3D", arena: "Kanteerava Court", coach: "Prakash Gowda", founded: 2024,
      roster: [["1", "Tejas Hegde", "PG"], ["9", "Anirudh Rao", "SG"], ["14", "Darshan Kumar", "SF"], ["33", "Mohan Reddy", "PF"], ["55", "Suhas Murthy", "C"]] },
    { id: "CHE", name: "Chennai Tide", city: "Chennai", c1: "#0E6E6D", c2: "#F7D046", arena: "Marina Hall", coach: "Lakshmi Narayanan", founded: 2024,
      roster: [["5", "Vignesh Iyer", "PG"], ["12", "Karthik Subramani", "SG"], ["21", "Arvind Raja", "SF"], ["30", "Sathish Kumar", "PF"], ["42", "Pranav Venkat", "C"]] },
    { id: "KOL", name: "Kolkata Tigers", city: "Kolkata", c1: "#5B2A91", c2: "#F2B134", arena: "Salt Lake Pavilion", coach: "Debashish Roy", founded: 2024,
      roster: [["2", "Sourav Banerjee", "PG"], ["8", "Ayan Chatterjee", "SG"], ["17", "Rahul Ghosh", "SF"], ["24", "Indranil Sen", "PF"], ["40", "Abhijit Das", "C"]] },
    { id: "HYD", name: "Hyderabad Hawks", city: "Hyderabad", c1: "#1C2A5A", c2: "#F2B705", arena: "Gachibowli Arena", coach: "Imran Siddiqui", founded: 2025,
      roster: [["6", "Sai Teja", "PG"], ["10", "Faisal Ahmed", "SG"], ["19", "Varun Reddy", "SF"], ["27", "Rakesh Naidu", "PF"], ["34", "Zaid Hussain", "C"]] },
    { id: "PUN", name: "Pune Peshwas", city: "Pune", c1: "#7E1D3B", c2: "#F4A261", arena: "Balewadi Centre", coach: "Neha Kulkarni", founded: 2025,
      roster: [["0", "Omkar Deshpande", "PG"], ["13", "Ishaan Joshi", "SG"], ["20", "Mihir Gokhale", "SF"], ["32", "Shreyas Pawar", "PF"], ["45", "Amey Bhosale", "C"]] },
    { id: "JAI", name: "Jaipur Jaguars", city: "Jaipur", c1: "#C2366F", c2: "#2C2C54", arena: "Pink City Arena", coach: "Vikramaditya Singh", founded: 2025,
      roster: [["3", "Raghav Shekhawat", "PG"], ["18", "Devendra Meena", "SG"], ["25", "Kunal Agarwal", "SF"], ["29", "Mahendra Choudhary", "PF"], ["52", "Ajay Rathore", "C"]] }
  ];
  const team = id => TEAMS.find(t => t.id === id);

  // Season 2 standings
  const STANDINGS = [
    { id: "DEL", w: 11, l: 3, ppg: 88.4, diff: 7.9 },
    { id: "MUM", w: 10, l: 4, ppg: 86.1, diff: 5.2 },
    { id: "BLR", w: 9, l: 5, ppg: 90.2, diff: 3.6 },
    { id: "KOL", w: 8, l: 6, ppg: 82.7, diff: 1.4 },
    { id: "CHE", w: 6, l: 8, ppg: 80.9, diff: -1.8 },
    { id: "HYD", w: 5, l: 9, ppg: 79.3, diff: -3.5 },
    { id: "JAI", w: 4, l: 10, ppg: 78.0, diff: -5.6 },
    { id: "PUN", w: 3, l: 11, ppg: 76.5, diff: -7.2 }
  ].map(r => ({ ...r, pct: r.w / (r.w + r.l) }));

  const LEADERS = {
    pts: [["Arjun Sandhu", "DEL", 24.8], ["Tejas Hegde", "BLR", 22.1], ["Kabir Shetty", "MUM", 20.6], ["Sourav Banerjee", "KOL", 19.4], ["Vignesh Iyer", "CHE", 18.9]],
    reb: [["Harpreet Gill", "DEL", 12.3], ["Siddharth Jadhav", "MUM", 11.0], ["Abhijit Das", "KOL", 10.2], ["Zaid Hussain", "HYD", 9.6], ["Suhas Murthy", "BLR", 9.1]],
    ast: [["Kabir Shetty", "MUM", 8.7], ["Arjun Sandhu", "DEL", 7.9], ["Omkar Deshpande", "PUN", 7.1], ["Sai Teja", "HYD", 6.8], ["Tejas Hegde", "BLR", 6.4]]
  };

  // Season 3 opening fixtures
  const FIXTURES = [
    { week: 1, games: [
      ["2026-12-12", "19:30", "DEL", "MUM"], ["2026-12-12", "21:30", "BLR", "CHE"],
      ["2026-12-13", "19:30", "KOL", "HYD"], ["2026-12-13", "21:30", "PUN", "JAI"] ] },
    { week: 2, games: [
      ["2026-12-19", "19:30", "MUM", "BLR"], ["2026-12-19", "21:30", "CHE", "KOL"],
      ["2026-12-20", "19:30", "HYD", "PUN"], ["2026-12-20", "21:30", "JAI", "DEL"] ] },
    { week: 3, games: [
      ["2026-12-26", "18:00", "KOL", "MUM"], ["2026-12-26", "20:30", "DEL", "BLR"],
      ["2026-12-27", "19:30", "JAI", "CHE"], ["2026-12-27", "21:30", "PUN", "HYD"] ] },
    { week: 4, games: [
      ["2027-01-02", "19:30", "MUM", "JAI"], ["2027-01-02", "21:30", "HYD", "DEL"],
      ["2027-01-03", "19:30", "CHE", "PUN"], ["2027-01-03", "21:30", "BLR", "KOL"] ] }
  ];

  const GALLERY = [
    { kind: "dunk", team: "DEL", size: "tall", cap: "Arjun Sandhu's game-winner in the Season 2 final" },
    { kind: "crowd", team: "MUM", size: "wide", cap: "A sold-out Worli Dome on opening night" },
    { kind: "trophy", team: "DEL", size: "", cap: "Delhi Thunder lift the IBPL trophy" },
    { kind: "court", team: "BLR", size: "", cap: "Kanteerava Court from the rafters" },
    { kind: "ball", team: "CHE", size: "", cap: "Warm-ups at Marina Hall" },
    { kind: "huddle", team: "KOL", size: "wide", cap: "Kolkata Tigers huddle before the semi-final" },
    { kind: "dunk", team: "JAI", size: "", cap: "Raghav Shekhawat on the fast break" },
    { kind: "crowd", team: "PUN", size: "", cap: "Pune fans at Balewadi Centre" }
  ];

  /* ---------------- helpers ---------------- */
  const crest = t => `<span class="team__crest" aria-hidden="true">${t.id}</span>`;
  const fmtDate = iso => {
    const d = new Date(iso + "T00:00:00");
    return { day: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }), wk: d.toLocaleDateString("en-IN", { weekday: "short" }) };
  };
  const vars = t => `--c1:${t.c1};--c2:${t.c2}`;

  /* ---------------- nav ---------------- */
  document.documentElement.classList.add("js");
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = open => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("open", open);
    nav.classList.toggle("menu-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  // active section highlight
  const navAnchors = $$(".nav__links a:not(.btn)");
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navAnchors.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => sectionObs.observe(s));

  /* ---------------- countdown ---------------- */
  const tipOff = new Date("2026-12-12T19:30:00+05:30").getTime();
  const pad = n => String(n).padStart(2, "0");
  const tick = () => {
    let s = Math.max(0, Math.floor((tipOff - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s -= d * 86400;
    const h = Math.floor(s / 3600); s -= h * 3600;
    const m = Math.floor(s / 60); s -= m * 60;
    $("#cdD").textContent = pad(d); $("#cdH").textContent = pad(h);
    $("#cdM").textContent = pad(m); $("#cdS").textContent = pad(s);
  };
  tick();
  setInterval(tick, 1000);

  /* ---------------- hero shot ---------------- */
  const ball = $("#ball"), spin = $("#ballSpin"), shadow = $("#ballShadow");
  const net = $("#net"), hoop = $("#hoop"), btn = $("#shootBtn");
  const youEl = $("#scoreYou"), rimEl = $("#scoreRim"), msgEl = $("#scoreMsg");
  const FLOOR = 638;
  let score = { you: 0, rim: 0 }, shots = 0, busy = false;
  let pos = { x: 80, y: 620 }, angle = 0;

  // on phones, crop the empty run-up on the left of the court so the hoop reads larger
  const narrow = window.matchMedia("(max-width: 560px)");
  const shotStart = () => narrow.matches ? 230 + Math.random() * 40 : 60 + Math.random() * 70;
  const fitCourt = () => {
    hoop.setAttribute("viewBox", narrow.matches ? "200 60 400 640" : "0 0 600 700");
    if (!busy) place(narrow.matches ? 250 : 80, 620, 0);
  };

  const place = (x, y, a = angle) => {
    pos = { x, y }; angle = a;
    ball.setAttribute("transform", `translate(${x} ${y})`);
    spin.setAttribute("transform", `rotate(${a})`);
    const h = Math.max(0, FLOOR - y);
    shadow.setAttribute("cx", x);
    shadow.setAttribute("rx", Math.max(10, 28 - h / 22));
    shadow.setAttribute("opacity", Math.max(.06, .3 - h / 1800));
  };
  const ease = {
    lin: t => t,
    in: t => t * t,
    out: t => 1 - (1 - t) * (1 - t)
  };
  const quad = (a, c, b, t) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b;

  // a segment = { dur, at(t) -> [x, y], spin, onStart }
  const run = segs => new Promise(resolve => {
    let i = 0, start = null, a0 = angle;
    const step = now => {
      const seg = segs[i];
      if (start === null) { start = now; a0 = angle; seg.onStart && seg.onStart(); }
      const t = Math.min(1, (now - start) / seg.dur);
      const [x, y] = seg.at(t);
      place(x, y, a0 + (seg.spin || 0) * t);
      if (t >= 1) { i++; start = null; if (i >= segs.length) return resolve(); }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  const bounce = (x0, x1, peak, dur, spinDeg) => ({
    dur, spin: spinDeg,
    at: t => [x0 + (x1 - x0) * t, FLOOR - 4 * peak * t * (1 - t)]
  });

  const setMsg = (m) => { msgEl.textContent = m; };
  const bump = el => { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); };

  async function shoot(forceMake) {
    if (busy) return;
    busy = true; btn.disabled = true;
    shots++;
    const make = forceMake ?? Math.random() < 0.72;
    const sx = shotStart();

    if (reduceMotion) {
      place(470, 300, 0);
      finish(make);
      setTimeout(() => { place(sx, 620, 0); busy = false; btn.disabled = false; }, 700);
      return;
    }

    // reset to shooter's hand
    ball.style.transition = "opacity .2s"; ball.style.opacity = 0;
    await new Promise(r => setTimeout(r, 200));
    place(sx, 620, 0);
    ball.style.opacity = 1;
    setMsg("Shooting…");

    // gather: small dip
    await run([{ dur: 220, at: t => [sx, 620 + Math.sin(t * Math.PI) * 14] }]);

    if (make) {
      await run([
        { dur: 1050, spin: -540, at: t => { const e = ease.lin(t); return [quad(sx, (sx + 470) / 2, 470, e), quad(600, -80, 236, e)]; } },
        { dur: 300, spin: -90, onStart: () => { net.classList.remove("swish"); void net.getBBox(); net.classList.add("swish"); finish(true); },
          at: t => [470, 236 + 110 * ease.in(t)] },
        { dur: 340, spin: -60, at: t => [470 - 10 * t, 346 + (FLOOR - 346) * ease.in(t)] },
        bounce(460, 400, 120, 520, -200),
        bounce(400, 360, 42, 320, -120),
        { dur: 400, spin: -110, at: t => [360 - 34 * ease.out(t), FLOOR] }
      ]);
    } else {
      await run([
        { dur: 1000, spin: -500, at: t => [quad(sx, (sx + 514) / 2, 514, t), quad(600, -60, 236, t)] },
        { dur: 520, spin: 260, onStart: () => { hoop.classList.remove("rattle"); void hoop.getBBox(); hoop.classList.add("rattle"); finish(false); },
          at: t => [514 + 40 * t, 236 - 110 * Math.sin(t * Math.PI * .5) + 180 * t * t] },
        { dur: 420, spin: 160, at: t => [554 + 20 * t, 306 + (FLOOR - 306) * ease.in(t)] },
        bounce(574, 640, 90, 480, 180)
      ]);
    }
    busy = false; btn.disabled = false;
  }

  function finish(make) {
    if (make) { score.you += 2; youEl.textContent = score.you; bump(youEl); setMsg(["Swish!", "Nothing but net", "Bucket!", "Money"][shots % 4]); }
    else { score.rim += 1; rimEl.textContent = score.rim; bump(rimEl); setMsg(["Rimmed out", "So close", "Off the iron"][shots % 3]); }
  }

  fitCourt();
  narrow.addEventListener("change", fitCourt);
  btn.addEventListener("click", () => shoot());

  // page-load sequence: headline rises, then the opening shot drops
  /* ---------------- loading screen: shot clock runs down while the page loads ---------------- */
  const loader = $("#loader");
  const pageReady = Promise.race([
    Promise.all([
      document.readyState === "complete" ? Promise.resolve() : new Promise(r => window.addEventListener("load", r, { once: true })),
      document.fonts ? document.fonts.ready : Promise.resolve()
    ]),
    new Promise(r => setTimeout(r, 8000)) // never hold the site hostage to a slow asset
  ]);

  const runLoader = () => new Promise(resolve => {
    const num = $("#shotclockNum"), bar = $("#shotclockBar"), clock = $("#shotclock"), hint = $("#loaderHint");
    let t = 24, ready = false;
    pageReady.then(() => { ready = true; });
    const lines = { 18: "Lacing up", 10: "Checking the hoops", 4: "Tip-off" };

    const finish = () => {
      $("#loaderStatus").textContent = "Loaded";
      document.documentElement.classList.remove("is-loading");
      loader.classList.add("is-done");
      loader.addEventListener("transitionend", e => { if (e.target === loader) loader.remove(); });
      setTimeout(() => loader.isConnected && loader.remove(), 1200);
      resolve();
    };

    if (reduceMotion) { pageReady.then(finish); return; }

    const step = () => {
      // tick steadily down to 4, hold there until the page is ready, then run out the clock
      if (t > 4 || ready) t--;
      num.textContent = String(Math.max(t, 0)).padStart(2, "0");
      bar.style.width = ((24 - Math.max(t, 0)) / 24) * 100 + "%";
      if (lines[t]) hint.textContent = lines[t];
      if (t <= 0) {
        clock.classList.add("buzz");
        setTimeout(finish, 650);
        return;
      }
      setTimeout(step, ready ? 45 : 70);
    };
    setTimeout(step, 250);
  });

  runLoader().then(() => {
    document.body.classList.add("is-loaded");
    if (reduceMotion) return;
    // take the opening shot once the hoop is actually on screen (below the fold on phones)
    new IntersectionObserver((en, obs) => {
      if (!en[0].isIntersecting) return;
      obs.disconnect();
      setTimeout(() => shoot(true), 900);
    }, { threshold: .6 }).observe(hoop);
  });

  /* ---------------- teams ---------------- */
  const grid = $("#teamsGrid");
  grid.innerHTML = TEAMS.map(t => {
    const s = STANDINGS.find(r => r.id === t.id);
    return `<button class="team" style="${vars(t)}" data-team="${t.id}" aria-haspopup="dialog">
      ${crest(t)}
      <span class="team__city">${t.city}</span>
      <span class="team__name">${t.name.replace(t.city === "New Delhi" ? "Delhi" : t.city, "").trim()}</span>
      <span class="team__rec">Season 2: ${s.w}–${s.l}</span>
    </button>`;
  }).join("");

  const teamModal = $("#teamModal");
  grid.addEventListener("click", e => {
    const b = e.target.closest(".team"); if (!b) return;
    const t = team(b.dataset.team);
    teamModal.setAttribute("style", vars(t));
    $("#teamModalBody").innerHTML = `
      <div class="tm__head">${crest(t)}<div><h2 id="teamModalTitle">${t.name}</h2><p>${t.city}</p></div></div>
      <div class="tm__body">
        <dl class="tm__meta">
          <div><dt>Home arena</dt><dd>${t.arena}</dd></div>
          <div><dt>Head coach</dt><dd>${t.coach}</dd></div>
          <div><dt>Joined</dt><dd>${t.founded}</dd></div>
        </dl>
        <h3 class="h3">Starting five</h3>
        <ul class="roster">${t.roster.map(([n, name, p]) => `<li><span class="roster__no">${n}</span><span>${name}</span><span class="roster__pos">${p}</span></li>`).join("")}</ul>
      </div>`;
    teamModal.showModal();
  });

  // close dialogs on button or backdrop click
  $$("dialog").forEach(d => {
    d.addEventListener("click", e => {
      if (e.target.closest("[data-close]") || e.target === d) d.close();
    });
  });

  /* ---------------- fixtures ---------------- */
  const weekTabs = $("#weekTabs"), list = $("#fixturesList");
  weekTabs.innerHTML = FIXTURES.map((w, i) =>
    `<button role="tab" aria-selected="${i === 0}" data-week="${w.week}">Week ${w.week}</button>`).join("");

  const renderWeek = n => {
    const w = FIXTURES.find(x => x.week === n);
    list.innerHTML = w.games.map(([date, time, h, a], i) => {
      const H = team(h), A = team(a), d = fmtDate(date);
      return `<article class="fixture enter" style="animation-delay:${i * 60}ms">
        <div class="fixture__date"><span class="fixture__day">${d.day}</span><span class="fixture__time">${d.wk} · ${time} IST</span></div>
        <div class="fixture__team" style="${vars(H)}">${crest(H)}<span>${H.name}</span></div>
        <span class="fixture__vs" aria-label="versus">VS</span>
        <div class="fixture__team fixture__team--away" style="${vars(A)}">${crest(A)}<span>${A.name}</span></div>
        <div class="fixture__venue"><strong>${H.arena}</strong>${H.city}</div>
      </article>`;
    }).join("");
    $$("button", weekTabs).forEach(b => b.setAttribute("aria-selected", String(+b.dataset.week === n)));
  };
  weekTabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) renderWeek(+b.dataset.week); });
  renderWeek(1);

  /* ---------------- standings ---------------- */
  const tbody = $("#standings tbody");
  let rows = [...STANDINGS];
  const renderTable = () => {
    tbody.innerHTML = rows.map((r, i) => {
      const t = team(r.id);
      return `<tr>
        <td>${i + 1}</td>
        <td><span class="tteam" style="${vars(t)}"><i></i>${t.name}</span></td>
        <td>${r.w}</td><td>${r.l}</td>
        <td>${r.pct.toFixed(3).replace(/^0/, "")}</td>
        <td>${r.ppg.toFixed(1)}</td>
        <td class="${r.diff >= 0 ? "pos" : "neg"}">${r.diff > 0 ? "+" : ""}${r.diff.toFixed(1)}</td>
      </tr>`;
    }).join("");
  };
  $$("#standings thead button").forEach(b => b.addEventListener("click", () => {
    const key = b.dataset.sort;
    const dir = b.dataset.dir === "desc" ? "asc" : "desc";
    $$("#standings thead button").forEach(x => { delete x.dataset.dir; x.closest("th").removeAttribute("aria-sort"); });
    b.dataset.dir = dir;
    b.closest("th").setAttribute("aria-sort", dir === "desc" ? "descending" : "ascending");
    rows.sort((a, c) => dir === "desc" ? c[key] - a[key] : a[key] - c[key]);
    renderTable();
  }));
  renderTable();

  /* ---------------- leaders ---------------- */
  const leadersList = $("#leadersList"), leadersBox = $(".leaders");
  const renderLeaders = stat => {
    const data = LEADERS[stat], max = data[0][2];
    leadersList.innerHTML = data.map(([name, id, v]) => {
      const t = team(id);
      return `<li class="leader" style="${vars(t)}">
        <span class="leader__name">${name}<span class="leader__team">${t.name}</span></span>
        <span class="leader__val">${v.toFixed(1)}</span>
        <span class="leader__bar"><span style="--w:${(v / max) * 100}%"></span></span>
      </li>`;
    }).join("");
    if (leadersBox.classList.contains("in-view")) {
      leadersBox.classList.remove("in-view"); void leadersBox.offsetWidth;
      requestAnimationFrame(() => leadersBox.classList.add("in-view"));
    }
    $$("#leaderTabs button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.stat === stat)));
  };
  $("#leaderTabs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) renderLeaders(b.dataset.stat); });
  renderLeaders("pts");
  new IntersectionObserver((en, obs) => {
    if (en[0].isIntersecting) { leadersBox.classList.add("in-view"); obs.disconnect(); }
  }, { threshold: .35 }).observe(leadersBox);

  /* ---------------- gallery (illustrated placeholders) ---------------- */
  const BG = `<defs><radialGradient id="sp{u}" cx="50%" cy="0%" r="90%"><stop offset="0" stop-color="#FFE7B8" stop-opacity=".45"/><stop offset="1" stop-color="#FFE7B8" stop-opacity="0"/></radialGradient></defs>`;
  const ballSvg = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#F2801F"/><g fill="none" stroke="#3B1A06" stroke-width="${r / 10}"><path d="M-${r} 0h${2 * r}M0 -${r}v${2 * r}"/><path d="M-${r * .7} -${r * .7}c${r * .3} ${r * .3} ${r * .3} ${r * 1.1} 0 ${r * 1.4}M${r * .7} -${r * .7}c-${r * .3} ${r * .3} -${r * .3} ${r * 1.1} 0 ${r * 1.4}"/></g></g>`;

  const art = (g, u) => {
    const t = team(g.team);
    const bg = BG.replace("{u}", u);
    const wrap = inner => `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${bg}${inner}</svg>`;
    switch (g.kind) {
      case "dunk": return wrap(`
        <rect width="400" height="300" fill="${t.c1}"/><rect width="400" height="300" fill="url(#sp${u})"/>
        <rect y="235" width="400" height="65" fill="#C8924F"/><rect y="235" width="400" height="4" fill="#FBF6EE" opacity=".6"/>
        <rect x="285" y="40" width="90" height="62" fill="none" stroke="#FBF6EE" stroke-width="4"/>
        <ellipse cx="318" cy="112" rx="26" ry="5" fill="none" stroke="${t.c2}" stroke-width="5"/>
        <g stroke="#FBF6EE" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M205 120 L230 185"/><path d="M212 135 L262 100 L300 96"/><path d="M212 140 L180 112"/>
          <path d="M230 185 L205 220 L180 215"/><path d="M230 185 L262 212 L258 238"/>
        </g>
        <circle cx="198" cy="98" r="15" fill="#FBF6EE"/>
        ${ballSvg(308, 90, 14)}
        <ellipse cx="225" cy="262" rx="50" ry="6" fill="#000" opacity=".2"/>`);
      case "crowd": {
        let heads = "";
        const cols = ["#FBF6EE", t.c2, "#F2801F", "#DDA86A", "#7FD3F7"];
        for (let r = 0; r < 6; r++) for (let c = 0; c < 22; c++) {
          const x = c * 19 + (r % 2) * 9 + 4, y = 120 + r * 30;
          heads += `<circle cx="${x}" cy="${y}" r="${7 + r}" fill="${cols[(r * 7 + c * 3) % 5]}" opacity="${.35 + r * .1}"/>`;
        }
        return wrap(`<rect width="400" height="300" fill="#0F1330"/><rect width="400" height="300" fill="url(#sp${u})"/>
          ${[60, 160, 260, 360].map(x => `<circle cx="${x}" cy="28" r="6" fill="#FFF3D6"/><path d="M${x} 28 L${x - 50} 300 L${x + 50} 300Z" fill="#FFF3D6" opacity=".06"/>`).join("")}
          <rect x="120" y="58" width="160" height="38" rx="4" fill="#0B0E24" stroke="${t.c2}" stroke-width="2"/>
          <text x="200" y="85" text-anchor="middle" font-family="Big Shoulders Display" font-weight="800" font-size="24" fill="#F2801F">${t.id} 84 – 79</text>
          ${heads}`);
      }
      case "trophy": {
        let conf = "";
        for (let i = 0; i < 40; i++) conf += `<rect x="${(i * 53) % 400}" y="${(i * 37) % 260}" width="6" height="12" fill="${[t.c2, "#F2801F", "#FBF6EE", "#13865A"][i % 4]}" transform="rotate(${i * 29} ${(i * 53) % 400} ${(i * 37) % 260})" opacity=".85"/>`;
        return wrap(`<rect width="400" height="300" fill="${t.c1}"/><rect width="400" height="300" fill="url(#sp${u})"/>${conf}
          <g transform="translate(200 160)">
            <path d="M-50 -90 h100 v30 a50 50 0 0 1 -100 0z" fill="#F5C542"/>
            <path d="M-50 -80 h-22 a22 22 0 0 0 22 40 M50 -80 h22 a22 22 0 0 1 -22 40" fill="none" stroke="#F5C542" stroke-width="8"/>
            <rect x="-10" y="-12" width="20" height="40" fill="#D9A62E"/><rect x="-40" y="28" width="80" height="22" rx="3" fill="#D9A62E"/>
            ${ballSvg(0, -100, 20)}
          </g>`);
      }
      case "court": return wrap(`
        <rect width="400" height="300" fill="#DDA86A"/>
        ${Array.from({ length: 14 }, (_, i) => `<rect x="${i * 30}" width="30" height="300" fill="${i % 3 ? "#D39C5C" : "#E2B27A"}" opacity=".7"/>`).join("")}
        <g fill="none" stroke="#FBF6EE" stroke-width="4">
          <rect x="20" y="20" width="360" height="260"/><line x1="200" y1="20" x2="200" y2="280"/><circle cx="200" cy="150" r="36"/>
          <path d="M20 60 h50 a90 90 0 0 1 0 180 h-50"/><path d="M380 60 h-50 a90 90 0 0 0 0 180 h50"/>
        </g>
        <rect x="20" y="115" width="70" height="70" fill="${t.c1}" opacity=".8"/><rect x="310" y="115" width="70" height="70" fill="${t.c1}" opacity=".8"/>
        <circle cx="200" cy="150" r="14" fill="${t.c2}"/>`);
      case "ball": return wrap(`
        <rect width="400" height="300" fill="${t.c1}"/><rect width="400" height="300" fill="url(#sp${u})"/>
        <path d="M0 200 L400 170 L400 300 L0 300Z" fill="#C8924F"/>
        <path d="M0 230 L400 200" stroke="#FBF6EE" stroke-width="4" opacity=".7"/>
        <ellipse cx="200" cy="222" rx="70" ry="12" fill="#000" opacity=".3"/>
        ${ballSvg(200, 160, 62)}`);
      case "huddle": {
        let ring = "";
        for (let i = 0; i < 9; i++) {
          const a = (i / 9) * Math.PI * 2, x = 200 + Math.cos(a) * 80, y = 150 + Math.sin(a) * 80;
          ring += `<line x1="${x}" y1="${y}" x2="${200 + Math.cos(a) * 30}" y2="${150 + Math.sin(a) * 30}" stroke="${t.c2}" stroke-width="14" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="22" fill="${i % 2 ? "#FBF6EE" : t.c2}"/>`;
        }
        return wrap(`<rect width="400" height="300" fill="#C8924F"/>
          ${Array.from({ length: 14 }, (_, i) => `<rect x="${i * 30}" width="30" height="300" fill="${i % 3 ? "#D39C5C" : "#B97C3F"}" opacity=".6"/>`).join("")}
          <circle cx="200" cy="150" r="120" fill="${t.c1}" opacity=".85"/>${ring}<circle cx="200" cy="150" r="18" fill="#F2801F"/>`);
      }
    }
  };

  const gGrid = $("#galleryGrid");
  gGrid.innerHTML = GALLERY.map((g, i) => `
    <figure class="g-item ${g.size ? "g-item--" + g.size : ""}">
      <button class="g-btn" data-i="${i}" aria-label="View: ${g.cap}">${art(g, "g" + i)}</button>
      <figcaption>${g.cap}</figcaption>
    </figure>`).join("");

  const lb = $("#lightbox");
  let cur = 0;
  const showLb = i => {
    cur = (i + GALLERY.length) % GALLERY.length;
    $("#lbArt").innerHTML = art(GALLERY[cur], "lb");
    $("#lbCap").textContent = `${GALLERY[cur].cap} (${cur + 1} of ${GALLERY.length})`;
  };
  gGrid.addEventListener("click", e => {
    const b = e.target.closest("button[data-i]"); if (!b) return;
    showLb(+b.dataset.i); lb.showModal();
  });
  $("#lbPrev").addEventListener("click", () => showLb(cur - 1));
  $("#lbNext").addEventListener("click", () => showLb(cur + 1));
  lb.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") showLb(cur - 1);
    if (e.key === "ArrowRight") showLb(cur + 1);
  });

  /* ---------------- forms ---------------- */
  const age = v => {
    const d = new Date(v), n = new Date();
    let a = n.getFullYear() - d.getFullYear();
    if (n < new Date(n.getFullYear(), d.getMonth(), d.getDate())) a--;
    return a;
  };
  const validateField = el => {
    const field = el.closest(".field"); if (!field) return true;
    let ok = el.checkValidity();
    if (ok && el.type === "date" && el.value) ok = age(el.value) >= 17;
    if (ok && el.type === "tel") ok = el.value.replace(/\D/g, "").length >= 10;
    field.classList.toggle("invalid", !ok);
    el.setAttribute("aria-invalid", String(!ok));
    return ok;
  };
  const validateForm = form => {
    const els = $$("input, select, textarea", form).filter(el => el.type !== "radio" || el.required);
    let first = null;
    els.forEach(el => { if (!validateField(el) && !first) first = el; });
    if (first) first.focus();
    return !first;
  };
  $$(".form").forEach(form => {
    form.addEventListener("input", e => {
      const f = e.target.closest(".field");
      if (f && f.classList.contains("invalid")) validateField(e.target.type === "radio" ? $("input[required]", f) : e.target);
    });
    form.addEventListener("change", e => {
      if (e.target.type === "radio") validateField($("input[required]", e.target.closest(".field")));
    });
  });

  // registration tabs
  const regTabs = $$("#regTabs button");
  const pForm = $("#playerForm"), tForm = $("#teamForm"), success = $("#regSuccess");
  const showReg = which => {
    regTabs.forEach(b => b.setAttribute("aria-selected", String(b.id === which)));
    pForm.hidden = which !== "tabPlayer";
    tForm.hidden = which !== "tabTeam";
    success.hidden = true;
  };
  regTabs.forEach(b => b.addEventListener("click", () => showReg(b.id)));

  const regDone = (form, title, text) => {
    form.hidden = true;
    $("#regSuccessTitle").textContent = title;
    $("#regSuccessText").textContent = text;
    success.hidden = false;
    success.focus();
  };
  pForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm(pForm)) return;
    const f = new FormData(pForm);
    regDone(pForm, "You're registered",
      `Thanks, ${f.get("name").split(" ")[0]}. We'll email your ${f.get("city")} trial slot to ${f.get("email")} within three days.`);
    pForm.reset();
  });
  tForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm(tForm)) return;
    const f = new FormData(tForm);
    regDone(tForm, "Team entered",
      `${f.get("team")} is entered in the Development Cup. We'll send fixtures and kit rules to ${f.get("email")}.`);
    tForm.reset();
  });
  $("#regAgain").addEventListener("click", () => showReg($$("#regTabs button").find(b => b.getAttribute("aria-selected") === "true").id));

  // contact
  const cForm = $("#contactForm");
  cForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm(cForm)) return;
    const email = new FormData(cForm).get("email");
    cForm.reset();
    $("#contactNote").textContent = `Message sent. We'll reply to ${email} within two working days.`;
  });
})();

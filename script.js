// ===== Helper House Crisis Committee — shared script =====
const $ = id => document.getElementById(id);

// ---------- Countdown (Missing page) ----------
// SET THE RETURN DATE HERE. Default: 7 days after the page is opened.
// For a fixed date use e.g.: new Date("2026-11-24T18:00:00")
const RETURN_DATE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

if ($("countdown")) {
  const START = Date.now();
  const pad = n => String(n).padStart(2, "0");
  const labels = [
    [0,   "Mildly concerning."],
    [70,  "Gym staff placed on alert."],
    [80,  "Protein supplies running low."],
    [90,  "Seismologists have been notified."],
    [97,  "UNPRECEDENTED."],
    [100, "MAXIMUM FREAK ACHIEVED."]
  ];
  const setFreak = p => {
    $("freakFill").style.width = p + "%";
    $("freakPct").textContent = p;
    $("freakLabel").textContent = labels.filter(([t]) => p >= t).pop()[1];
  };
  const tick = () => {
    const left = RETURN_DATE - Date.now();
    if (left <= 0) {
      $("countdown").style.display = "none";
      $("returned").style.display = "block";
      setFreak(100);
      return;
    }
    $("d").textContent = Math.floor(left / 86400000);
    $("h").textContent = pad(Math.floor(left / 3600000) % 24);
    $("m").textContent = pad(Math.floor(left / 60000) % 60);
    $("s").textContent = pad(Math.floor(left / 1000) % 60);
    // Freakiness only goes up. It cannot be stopped.
    const progress = (Date.now() - START) / (RETURN_DATE - START);
    setFreak(Math.min(99, Math.round(70 + progress * 29 + (Date.now() / 1000) % 3)));
  };
  tick();
  setInterval(tick, 1000);
}

// ---------- Tip button ----------
if ($("tipBtn")) {
  const tips = [
    "Tip received. Unfortunately it was just a picture of a protein bar.",
    "A witness reports a light-blue blur near the squat rack. Investigating.",
    "Someone heard grunting in the distance. Could be him. Could be anyone.",
    "Credible sighting: an unattended quarter-zip on a bench. The trail is warm.",
    "Your tip has been forwarded to the Committee, who responded with '😭'.",
    "Anonymous source claims he 'is simply on his phone.' Treated as highly plausible."
  ];
  let i = 0;
  $("tipBtn").addEventListener("click", () => { $("tipResponse").textContent = tips[i++ % tips.length]; });
}

// ---------- Share button ----------
if ($("shareBtn")) {
  $("shareBtn").addEventListener("click", async () => {
    const data = { title: "Helper House Is Missing", text: "This is a crisis. #BringBackHelperHouse", url: location.href };
    try {
      if (navigator.share) { await navigator.share(data); $("shareResponse").textContent = "Shared. He is one rep closer to home."; }
      else { await navigator.clipboard.writeText(location.href); $("shareResponse").textContent = "Link copied. Paste it into the group chat immediately."; }
    } catch { $("shareResponse").textContent = "The share was interrupted. Probably by him."; }
  });
}

// ---------- Candle vigil (Legacy page) ----------
if ($("candleBtn")) {
  const KEY = "hh-candles";
  let count = 0;
  try { count = parseInt(localStorage.getItem(KEY), 10) || 0; } catch {}
  $("candleCount").textContent = count;
  const lines = [
    "Your candle burns bright. So will his gym pump.",
    "A single tear rolls down a nearby dumbbell.",
    "He felt that. Somewhere, mid-set.",
    "The Committee thanks you for your service."
  ];
  $("candleBtn").addEventListener("click", () => {
    count++;
    $("candleCount").textContent = count;
    $("candleResponse").textContent = lines[(count - 1) % lines.length];
    try { localStorage.setItem(KEY, count); } catch {}
  });
}

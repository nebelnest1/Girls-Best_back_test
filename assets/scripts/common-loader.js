// common-loader.js
(() => {
  try {
    const u = new URL(window.location.href);

    // Version param: cv=1 / cv=2
    const cv = u.searchParams.get("cv") || "1";

    // Pick file
    const file = (cv === "2") ? "common.v2.js" : "common.v1.js";

    // Optional cache-bust: cb=anything
    const cb = u.searchParams.get("cb") || "";

    const s = document.createElement("script");
    s.src = `./assets/scripts/${file}` + (cb ? `?cb=${encodeURIComponent(cb)}` : "");

    // Make execution order predictable
    s.async = false;
    s.defer = true; // harmless; helps expectations even if browser ignores for dynamic scripts

    // Optional: surface which version loaded (only if you want; remove if не надо)
    // s.setAttribute("data-common-version", cv);

    document.head.appendChild(s);
  } catch (e) {
    // Hard fallback to v1 if loader fails
    try {
      const s = document.createElement("script");
      s.src = "./assets/scripts/common.v1.js";
      s.async = false;
      s.defer = true;
      document.head.appendChild(s);
    } catch {}
  }
})();

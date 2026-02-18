(() => {
  try {
    const u = new URL(window.location.href);

    // параметр версии: cv=1 / cv=2
    const cv = u.searchParams.get("cv") || "1";

    // ВАЖНО: разные имена файлов (лучше не перезаписывать)
    const file = (cv === "2") ? "common.v2.js" : "common.v1.js";

    // маленький cache-bust, чтобы CF не подсовывал старьё
    const cb = u.searchParams.get("cb") || "";

    const s = document.createElement("script");
    s.src = `./assets/scripts/${file}` + (cb ? `?cb=${encodeURIComponent(cb)}` : "");
    s.async = false;      // порядок предсказуемый
    // defer для динамического script не обязателен, но можно оставить семантически:
    // s.defer = true;

    document.head.appendChild(s);
  } catch (e) {
    // если лоадер умер — можно фоллбекнуть на v1
    const s = document.createElement("script");
    s.src = "./assets/scripts/common.v1.js";
    s.async = false;
    document.head.appendChild(s);
  }
})();

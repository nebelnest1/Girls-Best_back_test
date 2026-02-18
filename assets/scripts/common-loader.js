(() => {
  const u = new URL(location.href);

  // параметр версии: cv=1 / cv=2 (можно назвать как хочешь)
  const cv = u.searchParams.get("cv") || "1";

  // маппинг на реальные файлы
  const src =
    cv === "2"
      ? "/js/common.v2.js"
      : "/js/common.v1.js";

  const s = document.createElement("script");
  s.src = src;
  s.async = false; // важно: чтобы порядок выполнения был предсказуем
  document.head.appendChild(s);
})();

(async () => {
  if (typeof window.collectBrowserHdrCapabilities !== "function") {
    console.error("collectBrowserHdrCapabilities() is not available.");
    return;
  }

  const data = await window.collectBrowserHdrCapabilities();

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `browser-capability-dump-${timestamp}.json`;

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);

  console.log("Downloaded:", filename);
  console.log(data);
})();

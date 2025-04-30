let spese = [];
function aggiornaTotale() {
  const pos = parseFloat(document.getElementById("pos").value) || 0;
  const contante = parseFloat(document.getElementById("contante").value) || 0;
  document.getElementById("totale").innerText = `Totale Incasso: €${(pos + contante).toFixed(2)}`;
}
function aggiornaGrafico() {
  const pos = parseFloat(document.getElementById("pos").value) || 0;
  const contante = parseFloat(document.getElementById("contante").value) || 0;
  const totaleSpese = spese.reduce((acc, s) => acc + s.importo, 0);
  if (window.chart) window.chart.destroy();
  const ctx = document.getElementById("graficoIncasso").getContext("2d");
  window.chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["POS", "Contante", "Spese"],
      datasets: [{
        data: [pos, contante, totaleSpese],
        backgroundColor: ["#6ec6ca", "#4a90e2", "#f26d7d"]
      }]
    }
  });
}
function aggiungiSpesa() {
  const voce = document.getElementById("voce").value;
  const importo = parseFloat(document.getElementById("importo").value) || 0;
  if (!voce || importo <= 0) return;
  spese.push({ voce, importo });
  const ul = document.getElementById("lista-spese");
  const li = document.createElement("li");
  li.innerText = `${voce}: €${importo.toFixed(2)}`;
  ul.appendChild(li);
  document.getElementById("voce").value = "";
  document.getElementById("importo").value = "";
  aggiornaGrafico();
}
function salvaSerata() {
  const giorno = document.getElementById("giorno").value;
  const descrizione = document.getElementById("descrizione").value;
  const data = document.getElementById("data").value;
  const pos = parseFloat(document.getElementById("pos").value) || 0;
  const contante = parseFloat(document.getElementById("contante").value) || 0;
  const totale = pos + contante;
  const dettaglio = {
    data,
    giorno,
    descrizione,
    pos,
    contante,
    spese,
    incasso: totale
  };
  const archivio = JSON.parse(localStorage.getItem("archivioSpese") || "[]");
  archivio.push(dettaglio);
  localStorage.setItem("archivioSpese", JSON.stringify(archivio));
  alert("Serata archiviata!");
}
function esportaTuttiPDF() {
  window.print();
}
document.getElementById("pos").addEventListener("input", () => {
  aggiornaTotale();
  aggiornaGrafico();
});
document.getElementById("contante").addEventListener("input", () => {
  aggiornaTotale();
  aggiornaGrafico();
});

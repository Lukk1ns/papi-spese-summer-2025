const listaSpese = [];
function aggiungiSpesa() {
  const voce = document.getElementById("voce").value;
  const importo = parseFloat(document.getElementById("importo").value);
  if (voce && !isNaN(importo)) {
    listaSpese.push({ voce, importo });
    aggiornaListaSpese();
    aggiornaGrafico();
  }
}
function aggiornaListaSpese() {
  const ul = document.getElementById("lista-spese");
  ul.innerHTML = "";
  listaSpese.forEach(spesa => {
    const li = document.createElement("li");
    li.textContent = `${spesa.voce}: €${spesa.importo.toFixed(2)}`;
    ul.appendChild(li);
  });
}
function aggiornaGrafico() {
  const pos = parseFloat(document.getElementById("pos").value) || 0;
  const contante = parseFloat(document.getElementById("contante").value) || 0;
  const spese = listaSpese.reduce((sum, s) => sum + s.importo, 0);
  const totale = pos + contante;
  document.getElementById("totale-incasso").textContent = `Totale Incasso: €${totale.toFixed(2)}`;
  if (window.myChart) window.myChart.destroy();
  const ctx = document.getElementById("grafico").getContext("2d");
  window.myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["POS", "Contante", "Spese"],
      datasets: [{
        data: [pos, contante, spese],
        backgroundColor: ["#66cccc", "#3399ff", "#ff6666"]
      }]
    }
  });
}
function salvaSerata() {
  const giorno = document.getElementById("giorno").value;
  const descrizione = document.getElementById("descrizione").value;
  const data = document.getElementById("data").value;
  const pos = document.getElementById("pos").value;
  const contante = document.getElementById("contante").value;
  const serata = { giorno, descrizione, data, spese: listaSpese, pos, contante };
  const archivio = JSON.parse(localStorage.getItem("archivioSerate") || "[]");
  archivio.push(serata);
  localStorage.setItem("archivioSerate", JSON.stringify(archivio));
  alert("Serata salvata!");
  aggiornaArchivio();
}
function aggiornaArchivio() {
  const archivioDiv = document.getElementById("archivio");
  archivioDiv.innerHTML = "";
  const archivio = JSON.parse(localStorage.getItem("archivioSerate") || "[]");
  archivio.forEach((serata, index) => {
    const div = document.createElement("div");
    div.textContent = `${serata.data} - ${serata.descrizione} - Incasso: €${(+serata.pos + +serata.contante).toFixed(2)}`;
    archivioDiv.appendChild(div);
  });
}
function esportaTutti() {
  window.print();
}
document.getElementById("pos").addEventListener("input", aggiornaGrafico);
document.getElementById("contante").addEventListener("input", aggiornaGrafico);
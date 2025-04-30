
const spese = [];
const archivio = JSON.parse(localStorage.getItem("archivioSerate") || "[]");
const giorno = document.getElementById("giorno");
const descrizione = document.getElementById("descrizione");
const data = document.getElementById("data");
const voce = document.getElementById("voce");
const importo = document.getElementById("importo");
const pos = document.getElementById("pos");
const contante = document.getElementById("contante");
const listaSpese = document.getElementById("lista-spese");
const totaleDisplay = document.getElementById("totale");
const graficoCanvas = document.getElementById("grafico").getContext("2d");
const archivioTable = document.querySelector("#archivio tbody");

let chart = new Chart(graficoCanvas, {
  type: 'pie',
  data: {
    labels: ['POS', 'Contante', 'Spese'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#4bc0c0', '#36a2eb', '#ff6384']
    }]
  }
});

function aggiornaTotale() {
  const speseTot = spese.reduce((acc, s) => acc + s.importo, 0);
  const totale = parseFloat(pos.value || 0) + parseFloat(contante.value || 0);
  totaleDisplay.textContent = `Totale Incasso: ${totale.toFixed(2)} €`;
  chart.data.datasets[0].data = [
    parseFloat(pos.value || 0),
    parseFloat(contante.value || 0),
    speseTot
  ];
  chart.update();
}

document.getElementById("aggiungiSpesa").onclick = () => {
  if (voce.value && importo.value) {
    const nuova = { voce: voce.value, importo: parseFloat(importo.value) };
    spese.push(nuova);
    const li = document.createElement("li");
    li.textContent = `${nuova.voce}: €${nuova.importo.toFixed(2)}`;
    listaSpese.appendChild(li);
    voce.value = "";
    importo.value = "";
    aggiornaTotale();
  }
};

[pos, contante].forEach(el => el.addEventListener("input", aggiornaTotale));

document.getElementById("salva").onclick = () => {
  const totale = parseFloat(pos.value || 0) + parseFloat(contante.value || 0);
  const dati = {
    giorno: giorno.value,
    descrizione: descrizione.value,
    data: data.value,
    spese: [...spese],
    pos: parseFloat(pos.value || 0),
    contante: parseFloat(contante.value || 0),
    totale
  };
  archivio.push(dati);
  localStorage.setItem("archivioSerate", JSON.stringify(archivio));
  alert("Salvato!");
  location.reload();
};

function aggiornaArchivio() {
  archivioTable.innerHTML = "";
  archivio.forEach((s, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>€${s.totale.toFixed(2)}</td>
                    <td><button onclick="esportaSingolo(${i})">Esporta</button></td>`;
    archivioTable.appendChild(tr);
  });
}
window.esportaSingolo = (index) => {
  const s = archivio[index];
  const w = window.open("", "_blank");
  w.document.write(`<h1>Serata ${s.giorno} - ${s.data}</h1>`);
  w.document.write(`<p>${s.descrizione}</p>`);
  w.document.write(`<ul>${s.spese.map(sp => `<li>${sp.voce}: €${sp.importo}</li>`).join("")}</ul>`);
  w.document.write(`<p><strong>POS:</strong> €${s.pos}</p>`);
  w.document.write(`<p><strong>Contante:</strong> €${s.contante}</p>`);
  w.document.write(`<p><strong>Totale:</strong> €${s.totale}</p>`);
  w.print();
  w.close();
};

document.getElementById("esportaTutti").onclick = () => {
  archivio.forEach((_, i) => esportaSingolo(i));
};

aggiornaTotale();
aggiornaArchivio();

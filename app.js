const voceInput = document.getElementById('voce');
const importoInput = document.getElementById('importo');
const posInput = document.getElementById('pos');
const contanteInput = document.getElementById('contante');
const totaleEl = document.getElementById('totale');
const listaSpese = document.getElementById('lista-spese');
const grafico = new Chart(document.getElementById('grafico'), {
    type: 'pie',
    data: {
        labels: ['POS', 'Contante', 'Spese'],
        datasets: [{
            data: [0, 0, 0],
            backgroundColor: ['#4dc9f6', '#36a2eb', '#ff6384']
        }]
    }
});

let spese = [];

function aggiornaTotale() {
    const pos = parseFloat(posInput.value) || 0;
    const contante = parseFloat(contanteInput.value) || 0;
    const totaleSpese = spese.reduce((sum, s) => sum + s.importo, 0);
    const totale = pos + contante;
    totaleEl.textContent = totale.toFixed(2) + ' €';

    grafico.data.datasets[0].data = [pos, contante, totaleSpese];
    grafico.update();
}

function aggiungiSpesa() {
    const voce = voceInput.value.trim();
    const importo = parseFloat(importoInput.value);
    if (!voce || isNaN(importo)) return;
    spese.push({ voce, importo });
    voceInput.value = '';
    importoInput.value = '';
    renderSpese();
    aggiornaTotale();
}

function renderSpese() {
    listaSpese.innerHTML = '';
    spese.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `${s.voce}: €${s.importo.toFixed(2)}`;
        listaSpese.appendChild(li);
    });
}

function salvaSerata() {
    alert('Salvato (simulazione)!');
}
const CHORDS = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'];
const chordDiagramPath = 'chord-diagrams';
function generateChords() {
  const key = document.getElementById("keySelect").value;
  const chords = getChordsForKey(key);
  const textArea = document.getElementById("lyricsInput");
  textArea.value += "\n\n" + chords.join(" ");
}
function getChordsForKey(key) {
  const KEYS = {
    C: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
    G: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
    D: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
    A: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
    E: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
    F: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
    Bb: ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim']
  };
  return KEYS[key] || CHORDS;
}
function renderSong() {
  const input = document.getElementById("lyricsInput").value;
  const output = document.getElementById("renderedSong");
  const diagramContainer = document.getElementById("chordDiagrams");
  diagramContainer.innerHTML = '';
  const usedChords = new Set();
  const rendered = input.replace(/\[([A-G][#b]?m?(maj7|7|sus4|sus2)?)\]/g, (match, chord) => {
    usedChords.add(chord);
    return `<span class="chord">[${chord}]</span>`;
  });
  output.innerHTML = rendered;
  usedChords.forEach(chord => {
    const img = document.createElement('img');
    img.src = `${chordDiagramPath}/${chord}.png`;
    img.className = 'chord-diagram';
    img.alt = chord;
    diagramContainer.appendChild(img);
  });
}
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(document.getElementById("lyricsInput").value, 10, 10);
  doc.save("song-sheet.pdf");
}
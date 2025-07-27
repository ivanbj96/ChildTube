document.addEventListener('DOMContentLoaded', () => {
  const bibleContent = document.getElementById('bibleContent');
  const bookSelect = document.getElementById('bookSelect');
  const chapterSelect = document.getElementById('chapterSelect');
  const searchInput = document.getElementById('searchInput');

  const books = [
    { name: 'Génesis', abbr: 'gen', chapters: 50 },
    { name: 'Éxodo', abbr: 'exo', chapters: 40 },
    { name: 'Levítico', abbr: 'lev', chapters: 27 },
    { name: 'Números', abbr: 'num', chapters: 36 },
    { name: 'Deuteronomio', abbr: 'deu', chapters: 34 },
    { name: 'Josué', abbr: 'jos', chapters: 24 },
    { name: 'Jueces', abbr: 'jue', chapters: 21 },
    { name: 'Rut', abbr: 'rut', chapters: 4 },
    { name: '1 Samuel', abbr: '1sa', chapters: 31 },
    { name: '2 Samuel', abbr: '2sa', chapters: 24 },
    { name: '1 Reyes', abbr: '1re', chapters: 22 },
    { name: '2 Reyes', abbr: '2re', chapters: 25 },
    { name: '1 Crónicas', abbr: '1cr', chapters: 29 },
    { name: '2 Crónicas', abbr: '2cr', chapters: 36 },
    { name: 'Esdras', abbr: 'esd', chapters: 10 },
    { name: 'Nehemías', abbr: 'neh', chapters: 13 },
    { name: 'Ester', abbr: 'est', chapters: 10 },
    { name: 'Job', abbr: 'job', chapters: 42 },
    { name: 'Salmos', abbr: 'sal', chapters: 150 },
    { name: 'Proverbios', abbr: 'pro', chapters: 31 },
    { name: 'Eclesiastés', abbr: 'ecc', chapters: 12 },
    { name: 'Cantares', abbr: 'cnt', chapters: 8 },
    { name: 'Isaías', abbr: 'isa', chapters: 66 },
    { name: 'Jeremías', abbr: 'jer', chapters: 52 },
    { name: 'Lamentaciones', abbr: 'lam', chapters: 5 },
    { name: 'Ezequiel', abbr: 'eze', chapters: 48 },
    { name: 'Daniel', abbr: 'dan', chapters: 12 },
    { name: 'Oseas', abbr: 'ose', chapters: 14 },
    { name: 'Joel', abbr: 'joe', chapters: 3 },
    { name: 'Amós', abbr: 'amo', chapters: 9 },
    { name: 'Abdías', abbr: 'abd', chapters: 1 },
    { name: 'Jonás', abbr: 'jon', chapters: 4 },
    { name: 'Miqueas', abbr: 'mic', chapters: 7 },
    { name: 'Nahúm', abbr: 'nah', chapters: 3 },
    { name: 'Habacuc', abbr: 'hab', chapters: 3 },
    { name: 'Sofonías', abbr: 'sof', chapters: 3 },
    { name: 'Hageo', abbr: 'hag', chapters: 2 },
    { name: 'Zacarías', abbr: 'zac', chapters: 14 },
    { name: 'Malaquías', abbr: 'mal', chapters: 4 },
    { name: 'Mateo', abbr: 'mat', chapters: 28 },
    { name: 'Marcos', abbr: 'mar', chapters: 16 },
    { name: 'Lucas', abbr: 'luc', chapters: 24 },
    { name: 'Juan', abbr: 'jua', chapters: 21 },
    { name: 'Hechos', abbr: 'hec', chapters: 28 },
    { name: 'Romanos', abbr: 'rom', chapters: 16 },
    { name: '1 Corintios', abbr: '1co', chapters: 16 },
    { name: '2 Corintios', abbr: '2co', chapters: 13 },
    { name: 'Gálatas', abbr: 'gal', chapters: 6 },
    { name: 'Efesios', abbr: 'efe', chapters: 6 },
    { name: 'Filipenses', abbr: 'fil', chapters: 4 },
    { name: 'Colosenses', abbr: 'col', chapters: 4 },
    { name: '1 Tesalonicenses', abbr: '1ts', chapters: 5 },
    { name: '2 Tesalonicenses', abbr: '2ts', chapters: 3 },
    { name: '1 Timoteo', abbr: '1ti', chapters: 6 },
    { name: '2 Timoteo', abbr: '2ti', chapters: 4 },
    { name: 'Tito', abbr: 'tit', chapters: 3 },
    { name: 'Filemón', abbr: 'flm', chapters: 1 },
    { name: 'Hebreos', abbr: 'heb', chapters: 13 },
    { name: 'Santiago', abbr: 'snt', chapters: 5 },
    { name: '1 Pedro', abbr: '1pe', chapters: 5 },
    { name: '2 Pedro', abbr: '2pe', chapters: 3 },
    { name: '1 Juan', abbr: '1jn', chapters: 5 },
    { name: '2 Juan', abbr: '2jn', chapters: 1 },
    { name: '3 Juan', abbr: '3jn', chapters: 1 },
    { name: 'Judas', abbr: 'jud', chapters: 1 },
    { name: 'Apocalipsis', abbr: 'apo', chapters: 22 },
  ];

  // Cargar lista de libros
  books.forEach((book, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = book.name;
    bookSelect.appendChild(option);
  });

  // Al cambiar libro
  bookSelect.addEventListener('change', () => {
    const selectedBook = books[parseInt(bookSelect.value)];
    updateChapters(selectedBook);
  });

  // Al cambiar capítulo
  chapterSelect.addEventListener('change', () => {
    loadChapter();
  });

  // Actualizar lista de capítulos
  function updateChapters(book) {
    chapterSelect.innerHTML = '';
    for (let i = 1; i <= book.chapters; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `Capítulo ${i}`;
      chapterSelect.appendChild(option);
    }
    chapterSelect.value = 1;
    loadChapter();
  }

  // Cargar el capítulo desde la API
  function loadChapter() {
    const book = books[parseInt(bookSelect.value)];
    const chapter = chapterSelect.value;
    const url = `https://bolls.life/api/v1/bible/Reina-Valera_1960/${book.abbr}/${chapter}`;

    bibleContent.innerHTML = `<p>Cargando ${book.name} ${chapter}...</p>`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        bibleContent.innerHTML = '';
        data.verses.forEach(v => {
          const p = document.createElement('p');
          p.setAttribute('data-verse', `${v.verse}`);
          p.innerHTML = `<strong>${v.verse}.</strong> ${v.text}`;
          bibleContent.appendChild(p);
        });
      })
      .catch(err => {
        console.error(err);
        bibleContent.innerHTML = '<p>Error al cargar el capítulo</p>';
      });
  }

  // Búsqueda por palabra clave
  window.searchVerses = function () {
    const keyword = searchInput.value.toLowerCase().trim();
    const verses = document.querySelectorAll('#bibleContent p');
    let found = false;

    verses.forEach(p => {
      const match = p.textContent.toLowerCase().includes(keyword);
      p.style.display = match || keyword === '' ? '' : 'none';
      if (match) found = true;
    });

    if (!found && keyword !== '') {
      bibleContent.innerHTML = `<p>No se encontraron versículos que coincidan con "<strong>${keyword}</strong>".</p>`;
    } else if (keyword === '') {
      loadChapter(); // Restaurar si se borra la búsqueda
    }
  };

  // Inicializar con Génesis 1
  bookSelect.value = "0";
  updateChapters(books[0]);
});
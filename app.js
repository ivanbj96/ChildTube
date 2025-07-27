document.addEventListener('DOMContentLoaded', () => {
  const bibleContent = document.getElementById('bibleContent');
  const bookSelect = document.getElementById('bookSelect');
  const chapterSelect = document.getElementById('chapterSelect');
  const searchInput = document.getElementById('searchInput');

  // 📘 Lista de libros
  const books = [ /* ... igual que antes, sin cambios ... */ ];

  // 🔽 Cargar lista de libros
  books.forEach((book, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = book.name;
    bookSelect.appendChild(option);
  });

  // ⛪ Al cambiar libro
  bookSelect.addEventListener('change', () => {
    const selectedBook = books[bookSelect.value];
    updateChapters(selectedBook);
  });

  // 📖 Al cambiar capítulo
  chapterSelect.addEventListener('change', () => {
    loadChapter();
  });

  // 🔄 Actualizar capítulos
  function updateChapters(book) {
    chapterSelect.innerHTML = '';
    for (let i = 1; i <= book.chapters; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `Capítulo ${i}`;
      chapterSelect.appendChild(option);
    }
    chapterSelect.value = 1;
    loadChapter(); // cargar capítulo inicial
  }

  // 📥 Cargar capítulo desde API
  function loadChapter() {
    const book = books[bookSelect.value];
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

  // 🔍 Búsqueda simple por palabra clave
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
      loadChapter(); // Restaurar capítulo completo
    }
  };

  // 🚀 Inicializar con Génesis 1
  bookSelect.value = 0;
  updateChapters(books[0]);
});
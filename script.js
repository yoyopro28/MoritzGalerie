let imageCount = 0;

function createFrame(index, dataUrl = null) {
  const gallery = document.getElementById('gallery');

  const frame = document.createElement('div');
  frame.className = 'frame';
  frame.onclick = () => document.getElementById('file' + index).click();

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.id = 'file' + index;
  input.onchange = () => loadImage(input, index);

  const img = document.createElement('img');
  img.id = 'img' + index;
  img.alt = 'Bild ' + index;
  if (dataUrl) img.src = dataUrl;

  frame.appendChild(input);
  frame.appendChild(img);
  gallery.appendChild(frame);
}

function loadImage(input, index) {
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target.result;
    document.getElementById('img' + index).src = dataUrl;
    localStorage.setItem('img' + index, dataUrl);

    // Wenn es der letzte Frame war → neuen leeren Frame hinzufügen
    if (index === imageCount - 1) {
      createFrame(imageCount);
      imageCount++;
    }
  };
  if (file) {
    reader.readAsDataURL(file);
  }
}

window.onload = function () {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('img')).sort();

  // Alle gespeicherten Bilder laden
  keys.forEach((key, i) => {
    const dataUrl = localStorage.getItem(key);
    createFrame(i, dataUrl);
    imageCount++;
  });

  // Immer einen leeren Rahmen hinten hinzufügen
  createFrame(imageCount);
  imageCount++;
};

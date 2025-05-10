let imageCount = 0;
let msnry;

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

  frame.appendChild(input);
  frame.appendChild(img);
  gallery.appendChild(frame);

  if (dataUrl) {
    img.src = dataUrl;
    frame.classList.remove('empty');
  } else {
    frame.classList.add('empty');
  }

  if (msnry) {
    msnry.appended(frame);
    msnry.layout();
  }
}

function loadImage(input, index) {
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target.result;
    const img = document.getElementById('img' + index);
    img.src = dataUrl;
    localStorage.setItem('img' + index, dataUrl);

    const frame = img.parentElement;
    frame.classList.remove('empty');

    if (index === imageCount - 1) {
      createFrame(imageCount);
      imageCount++;
    }

    if (msnry) msnry.layout();
  };
  if (file) reader.readAsDataURL(file);
}

window.onload = function () {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('img')).sort();

  keys.forEach((key, i) => {
    const dataUrl = localStorage.getItem(key);
    createFrame(i, dataUrl);
    imageCount++;
  });

  createFrame(imageCount);
  imageCount++;

  msnry = new Masonry('#gallery', {
    itemSelector: '.frame',
    columnWidth: 300,
    gutter: 20,
    fitWidth: true
  });
};

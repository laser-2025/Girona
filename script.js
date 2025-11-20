let works = JSON.parse(localStorage.getItem('laserWorks')) || [];

function render() {
  const photosDiv = document.getElementById('photos');
  const videosDiv = document.getElementById('videos');
  photosDiv.innerHTML = '';
  videosDiv.innerHTML = '';

  works.forEach((w, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      ${w.type==='video' ? `<video src="${w.url}"></video><div class="play">▶</div>` : `<img src="${w.url}">`}
      <div class="price">${w.price}</div>
      <div class="date">${w.date}</div>
    `;
    div.onclick = () => openModal(i);
    if (w.type === 'video') videosDiv.appendChild(div);
    else photosDiv.appendChild(div);
  });
}

function openModal(i) {
  const w = works[i];
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">×</span>
      ${w.type==='video' ? `<video src="${w.url}" controls autoplay style="max-width:100%;border-radius:15px;"></video>` 
        : `<img src="${w.url}" style="max-width:100%;border-radius:15px;">`}
      <h2>الثمن: ${w.price}</h2>
      <p>${w.date}</p>
      <a href="https://wa.me/212661234567?text=سلام عليكم%20عجبني%20الشغل%20رقم%20${i+1}%20(${w.price})%20بغيت%20التفاصيل" 
         class="whatsapp" target="_blank">اطلب عبر واتساب</a>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';
}

function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
  document.getElementById(tab).style.display = 'grid';
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

render();

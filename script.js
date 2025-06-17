const magnifier = document.getElementById('magnifier');
const zoomImage = document.getElementById('zoomImage');
const mainImage = document.getElementById('mainImage');

const zoom = 2; // 拡大倍率

function updateMagnifier(clientX, clientY) {
  const rect = mainImage.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
    magnifier.style.display = 'none';
    return;
  } else {
    magnifier.style.display = 'block';
  }

  magnifier.style.left = clientX + 'px';
  magnifier.style.top = clientY + 'px';

  zoomImage.style.left = -x * zoom + magnifier.offsetWidth / 2 + 'px';
  zoomImage.style.top = -y * zoom + magnifier.offsetHeight / 2 + 'px';
}

// マウス操作
document.addEventListener('mousemove', (e) => {
  updateMagnifier(e.clientX, e.clientY);
});

// タッチ操作
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    updateMagnifier(touch.clientX, touch.clientY);
    e.preventDefault(); // 必要に応じてスクロール防止
  }
}, { passive: false }); // ← これがないと preventDefault() が効かないブラウザあり

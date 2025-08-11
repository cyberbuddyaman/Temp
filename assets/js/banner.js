const speed = 2; // 2 pixels per frame at 60 frames per second
const banner = document.getElementsByClassName('photobanner')[0];
// build images array
let images = [
...banner.getElementsByTagName('img')
];

// initialize images positions
let rects = images.map((img, index) => {
  const style = getComputedStyle(img);
  const rect = {
    left: index * (350 + 50),
    top: 0,
    width: 350,
    height: parseInt(style.height, 10)
  };
  return rect;
});

function animate() {
  const l = images.length;
  for (let i = 0; i < l; i++) {
    const img = images[i];
    const rect = rects[i];
    rect.left -= speed;
    if (rect.left + rect.width < 0) {
        // this image if fully overflowing left, put it at the end of the image list both in position and in images and rects
        const lastRect = rects[rects.length - 1];
        rect.left = lastRect.left + lastRect.width + 50;
        images = images.slice(1, l);
        images.push(img);
        rects = rects.slice(1, l);
        rects.push(rect);
        i--;
    }
    // change the actual image style according to new rect value
    img.style.left = rect.left + 'px';
  };
  requestAnimationFrame(animate);
}

animate();
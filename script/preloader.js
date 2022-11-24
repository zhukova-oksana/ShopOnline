'use strict';

let opacity = 1;

const overlay = document.createElement('div');
overlay.style.cssText = `
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  opacity: ${opacity};
`;

document.body.append(overlay);

const hideOverlay = () => {
  opacity -= 0.3;
  overlay.style.opacity = opacity;

  if (opacity > 0) {
    requestAnimationFrame(hideOverlay);
  } else {
    overlay.remove();
  }
}

requestAnimationFrame(hideOverlay);

'use strict';

{
  let opacity = 1;

  const overlay = document.createElement('div');
  overlay.style.cssText = `
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #F6F6F6;
  opacity: ${opacity};
`;

  const overlayInner = document.createElement('div');
  overlayInner.classList.add('overlay__inner')

  overlay.append(overlayInner);

  document.body.append(overlay);


  console.log(document.body);

  const hideOverlay = () => {
    opacity -= 0.2;
    overlay.style.opacity = opacity;

    if (opacity > 0) {
      console.log(opacity);
      setTimeout(hideOverlay, 200);
    } else {
      overlay.remove();
    }
  }

  setTimeout(hideOverlay, 600);
}

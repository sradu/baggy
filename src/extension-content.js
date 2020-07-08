window.baggy = new Baggy();

window.onload = async () => {
  setTimeout(async () => {
    await window.baggy.start();
  }, 3000);
}

document.addEventListener('pjax:end', async () => {
  setTimeout(async () => {
    await window.baggy.start();
  }, 3000);
});

document.addEventListener('turbolinks:load', async () => {
  setTimeout(async () => {
    await window.baggy.start();
  }, 3000);
});

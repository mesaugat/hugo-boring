function enableMasonry() {
  window.onload = resizeAllGridItems();
  window.addEventListener('resize', resizeAllGridItems);
  var imgs = document.getElementsByTagName('img');
  for (let img of imgs) {
    imgLoad(img, resizeAllGridItems());
  }
}

function imgLoad(img, callback) {
  var timer = setInterval(function () {
    if (img.complete) {
      resizeAllGridItems();
      clearInterval(timer);
    }
  }, 50);
}

function resizeGridItem(item) {
  grid = document.getElementsByClassName('masonry')[0];
  rowHeight = 0;
  rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  rowSpan = Math.ceil(item.querySelector('.grid-content').getBoundingClientRect().height / rowGap);
  item.style.gridRowEnd = 'span ' + rowSpan;
}

function resizeAllGridItems() {
  allItems = document.getElementsByClassName('item');
  for (x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}

function resizeInstance(instance) {
  item = instance.elements[0];
  resizeGridItem(item);
}

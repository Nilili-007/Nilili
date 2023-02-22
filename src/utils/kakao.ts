export const displayPagination = (pagination: any) => {
  var paginationEl = document.getElementById("pagination"),
    fragment = document.createDocumentFragment(),
    i;

  // @ts-ignore
  while (paginationEl.hasChildNodes()) {
    // @ts-ignore
    paginationEl.removeChild(paginationEl.lastChild);
  }

  for (i = 1; i <= pagination.last; i++) {
    var el = document.createElement("a");
    el.href = "#";
    // @ts-ignore
    el.innerHTML = i;

    if (i === pagination.current) {
      el.className = "on";
    } else {
      el.onclick = (function (i) {
        return function () {
          pagination.gotoPage(i);
        };
      })(i);
    }

    fragment.appendChild(el);
  }
  // @ts-ignore
  paginationEl.appendChild(fragment);
};

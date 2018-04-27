(function () {

/*
| render html for each node
*/
const renderNode = (key, val, indent) => {
  const displayVal = val ? `... ${val}` : '';
  return `
    <div style='margin-left:${indent}em;'>
      ${key} ${displayVal}
    </div>
  `;
}

/*
| recursively run the object tree
*/
const renderObjectRecurse = function(notification, indent) {
  const n = notification;
  let render = "";

  for (const prop in n) {
    if (!n.hasOwnProperty(prop)) continue;

    const key = prop;
    const val = n[prop];

    /*
      if the value is an object, render the key only and do recursion.
      otherwise render leaf properties.
    */
    if (typeof val === "object") {
      render += renderNode(key, false, indent);
      render += renderObjectRecurse(val, indent + 1);
    } else {
      render += renderNode(key, val, indent);
    }
  }

  return render;
};

/*
| render html from object
*/
const renderHtml = obj => renderObjectRecurse(obj, 0);

window.renderHtml = renderHtml;

}());

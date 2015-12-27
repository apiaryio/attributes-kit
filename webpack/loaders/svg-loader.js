import Svgo from 'svgo';
const svgo = new Svgo();

export default function(source) {
  var callback = this.async();
  this.cacheable();

  svgo.optimize(source, function(result) {
    var content = "'data:image/svg+xml;utf8," + result.data + "'";

    // Character ‘#’ must be encoded with ‘%23’ otherwise Firefox (and IE) are
    // not able to properly display the SVG icon (inlined via Data URI);
    // see https://github.com/apiaryio/apiary/pull/2642#issuecomment-113080908.
    content = content.replace(/\#/g, '%23');

    callback(null, 'module.exports = ' + JSON.stringify(content));
  });
};

var d = JSON.parse(require('fs').readFileSync('src/data/games.json','utf8'));
var required = ['slug','title','description','category','year','creator','archiveUrl','swfUrl','thumbnail','tags'];
var ok = true;
d.forEach(function(g,i) {
  var missing = required.filter(function(f){ return !g[f]; });
  if (missing.length) { console.log('Game ' + (i+1) + ' (' + g.slug + ') missing: ' + missing.join(', ')); ok = false; }
});
if (ok) console.log('All ' + d.length + ' games have all required fields.');
var cats = [...new Set(d.map(function(g){ return g.category; }))];
console.log('Categories: ' + cats.join(', '));

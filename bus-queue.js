var Bacon = require('baconjs');

var bus = new Bacon.Bus()

function timeout(ms) {
    return new Promise(resolve => setTimeout(() => resolve("duration: "+ms), ms));
}

// change between flatMap and flatMapConcat
bus.changes().flatMap(function([v, p]){
  console.log("processing... ", v)
  return Bacon.fromPromise(p())
}).log()

var a = [0, 1, 2, 3, 4, 5, 6, 7, 8 ,9].map(( v ) => {
    return [v, () => timeout(v*1000)]
}).forEach(pair => bus.push(pair));

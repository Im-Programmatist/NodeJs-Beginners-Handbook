process.on('message', function(m) {
  console.log('Child fork process received :', m);
});
  
process.send({ hello: 'from child fork process ' });
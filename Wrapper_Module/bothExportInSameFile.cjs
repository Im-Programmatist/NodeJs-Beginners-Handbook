module.exports = {
    print: function() {
      console.log('print from module exports ');
    },
};

//module.exports = {p: 1}; //this will replace entire module export object(previous things get vanish only this line attached to it.)

// This will not exported. and not run until above module is present in same file 
exports.print = function() {
    console.log('printfrom simple exports');
};
exports = {p: 1}; //Here we are reassigning export variable so it will not work.

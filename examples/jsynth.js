"use strict"

var master = new webkitAudioContext();

var jsynth = require('jsynth')
  , tau = Math.PI * 2
  , frequency = 220
;

var synth = jsynth(master, function (time, index, input){
  return Math.sin(Math.sin(time*2) * tau * frequency)
}).connect(master.destination);

var synth = jsynth(master, function (time, index, input){
  return Math.sin(Math.sin(time) * tau * frequency/2)
});

synth.connect(master.destination)

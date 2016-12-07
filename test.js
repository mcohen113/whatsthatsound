//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();
var song = { "type": "success", "value": { "id": 268, "joke": "Time waits for no man. Unless that man is Chuck Norris." } }
//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");

//play a note every quarter-note
var loop = new Tone.Loop(function(time){
    synth.triggerAttackRelease("C2", "8n", time);
}, "4n");

//loop between the first and fourth measures of the Transport's timeline
loop.start("1m").stop("4m");

Tone.Transport.start();

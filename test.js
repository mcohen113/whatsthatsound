//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();
var song = { "type": "success", "value": { "id": 268, "joke": "Time waits for no man. Unless that man is Chuck Norris." } }


//play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");

// //play a note every quarter-note
// var loop = new Tone.Loop(function(time){
//     synth.triggerAttackRelease("C2", "8n", time);
// }, "4n");

// //loop between the first and fourth measures of the Transport's timeline
// loop.start("1m").stop("4m");



//a-z c4++
//0-9 diatonic triads starting from 0 = c e g, (c major) 1 = D F A (d minor)
var notes = {A: 'A4', B: 'B4', C: 'C4', D: 'D4', E: 'E4', F: 'F4', G: 'G4', H: 'A5', I: 'B5', J: 'C5', K: 'D5', L: 'E5', M: 'F5', N: 'G5', O: 'A6', P: 'B6', Q:'C6', R: 'D6', S: 'E6', T: 'F6', U: 'G6', V: 'A7', W: 'B7', X: 'C7', Y: 'D7', Z: 'E7'}
function play(song) {
  if (typeof song !== 'string') {
    song = JSON.stringify(song);
  }
  song = song.toUpperCase()
  // split turns string into separate characters
  var songNotes = song.split('').map(function (c) {
    return notes[c] || 'A3'
  })
  var seq = new Tone.Sequence(function(time, note) {

    synth.triggerAttackRelease(note, "4n", time)
  }, songNotes)

  seq.start("1m")
  Tone.Transport.start();

}
play(song)

// define a mapping of which input character becomes which sound/note ie notes = {'A: 'C4', B: D4}

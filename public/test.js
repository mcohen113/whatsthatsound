function getContent() {
  return document.getElementById('songData').value
}

function getTitle() {
  return document.getElementById('songTitle').value
}
    //https://github.com/github/fetch#json

function addSongToList(song) {
  // get the song container to put the songs into
  var theSongContainer = document.getElementById('savedSongs');
  // create a new li for the song
  var newSong = document.createElement('li');
  newSong.innerText = song.title;
  // add the new song to the Song Container
  theSongContainer.appendChild(newSong);
}

function loadSongs() {
  fetch('/songs/')
    .then(function(res) {
      return res.json()
    })
    .then(function(json) {
      json.songs.forEach(addSongToList)
      console.log('json parsed', json)
    })
    .catch(function(ex) {
      console.log('parsing failed', ex)
    })
}
loadSongs();

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();
// var song = 'cdefgabcbagfedc'
document.getElementById('songform').addEventListener('submit', function(event) {
  event.preventDefault()
  var song = getContent()
  play(song)//play input from form, invoke
})
// stop button stops play AND clears last input
document.getElementById('stop').addEventListener('click', function(event) {
  Tone.Transport.cancel().stop()
})
document.getElementById('add').addEventListener('click', function(event) {
  fetch('/songs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: getTitle(),
      content: getContent()
    })
  })
    .then(function (response) {
      if (response.ok) {
        // do stuff to add song
        alert('song rocks added it');
      } else {
        alert('song suckage');
      }
    })
    .catch(function (error) {
      alert('song sucks but not because the server deemed it so');
    })
})

// { "type": "success", "value": { "id": 268, "joke": "Time waits for no man. Unless that man is Chuck Norris." } }

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
var subDivision = '4n'
var notes = {A: 'A4', B: 'B4', C: 'C4', D: 'D4', E: 'E4', F: 'F4', G: 'G4', H: 'A5', I: 'B5', J: 'C5', K: 'D5', L: 'E5', M: 'F5', N: 'G5', O: 'A6', P: 'B6', Q:'C6', R: 'D6', S: 'E6', T: 'F6', U: 'G6', V: 'A7', W: 'B7', X: 'C7', Y: 'D7', Z: 'E7', '.': false}
function play(song) {
  if (typeof song !== 'string') {
    song = JSON.stringify(song);
  }
  song = song.toUpperCase()
  // split turns string into separate characters
  var songNotes = song.split('').map(function (c) {
    if (c in notes) {
      return notes[c];
    }
    return 'A4';
  })
    // return  notes[c] || 'A4'
  var seq = new Tone.Sequence(function(time, note) {
    if (note) {
      synth.triggerAttackRelease(note, subDivision, time)
    } else {
      // play a rest
    }

  }, songNotes, subDivision)

  seq.start("1m")
  Tone.Transport.start();
}

// when add function is used, title songs
// define a mapping of which input character becomes which sound/note ie notes = {'A: 'C4', B: D4}

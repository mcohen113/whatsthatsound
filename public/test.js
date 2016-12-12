function getContent() {
  return document.getElementById('songData').value
}

function getTitle() {
  return document.getElementById('songTitle').value
}

function getTempo() {
  return document.getElementById('tempoSlider').value;
}

    //https://github.com/github/fetch#json

// function deleteSong(id) {
//   return fetch()
//     .then()
//     .catch()
// }
// sliderFunction
function addSongToList(song) {
  // button to play saved song
  //
  var playAgainButton = document.createElement('button');
  playAgainButton.addEventListener('click', function() {
    play(song.content)
  })
  playAgainButton.innerText = 'play'

  // deleteButton.addEventListener('click', function () {
  //   deleteSong(song.id)
  //     .then(function () {
  //       newSong.remove();
  //     });
  // })

  // create a new li for the song
  var newSong = document.createElement('li');
  newSong.innerText = song.title;

  // play button for songs in container
  newSong.appendChild(playAgainButton);
  // get the song container to put the songs into
  var theSongContainer = document.getElementById('savedSongs');
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
  play(song) //play input from form, invoke
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
      content: getContent(),
      // bpm: getTempo()
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

//a-z A4++
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

document.getElementById('tempoSlider').addEventListener('change', function() {
  setTempo(this.value);
});

function setTempo(bpm) {
  // update the slider value
  document.getElementById('tempoSlider').value = bpm;
  // update the transport
  Tone.Transport.bpm.value = bpm;
  // update the label element
  document.getElementById('sliderLabel').innerText = bpm;
}

setTempo(160);

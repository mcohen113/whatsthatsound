function getContent() {
  return document.getElementById('songData').value
}

function getTitle() {
  return document.getElementById('songTitle').value
}

function getTempo() {
  return document.getElementById('tempoSlider').value;
}


function deleteSong(id) {
  return fetch('/songs/' + id, { method: 'DELETE' })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('server didnt delete');
      }
    })
    .catch(function (error) {
      console.log('delete song failed', error);
      alert('problem!! song still there');
      throw error;
    })
}

function addSongToList(song) {

  // button to play saved song
  //
  // play button for songs in container
  var playAgainButton = document.createElement('button');
  playAgainButton.addEventListener('click', function() {
    play(song.content)
  })
  playAgainButton.innerText = 'play'
  playAgainButton.style.cssText = "color: green", "padding: 5px";

  var deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', function () {
    deleteSong(song.id)
      .then(function () {
        newSong.remove();
      })
  })
  deleteButton.innerText = 'delete'
  deleteButton.style.setAttribute = "color: red", "padding: 5px", "float: right";

  // create a new li for the song
  var newSong = document.createElement('li');
  newSong.innerText = song.title;
  newSong.appendChild(playAgainButton);
  newSong.appendChild(deleteButton)

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

function handlePlaySong(event) {
  event.preventDefault()
  var song = getContent()
  play(song) //play input from form, invoke
}

function handleStopSong(event) {
   Tone.Transport.cancel().stop()
}


function handleAddSong(event) {

  event.preventDefault()

  var postedSong = {
    title: getTitle(),
    content: getContent()
    // bpm: getTempo()
  };

  fetch('/songs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postedSong)
  })
    .then(function (response) {
      if (response.ok) {
       addSongToList(postedSong)
      } else {
        throw new Error('server rejected song');
      }
    })
    .catch(function (error) {
      console.log('adding song failed', error);
      alert('problem!! song not added');
    })
}

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();
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

function setTempo(bpm) {
  // update the slider value
  document.getElementById('tempoSlider').value = bpm;
  // update the transport
  Tone.Transport.bpm.value = bpm;
  // update the label element
  document.getElementById('sliderLabel').innerText = bpm;
}

loadSongs();
document.getElementById('songform').addEventListener('submit', handlePlaySong);
document.getElementById('stop').addEventListener('click', handleStopSong);
document.getElementById('add').addEventListener('click', handleAddSong);
document.getElementById('tempoSlider').addEventListener('change', function() {
  setTempo(this.value);
});
setTempo(160);

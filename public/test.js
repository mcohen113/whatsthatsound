function getContent(elementid) {
  return document.getElementById(elementid).value
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
  playAgainButton.innerText = 'play it!';
  playAgainButton.setAttribute("class", "cont-button-play");


  var deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', function () {
    deleteSong(song.id)
      .then(function () {
        newSong.remove();
      });
  });
  deleteButton.innerText = 'wipe it';
  deleteButton.setAttribute("class", "cont-button-delete");


  // create a new li for the song
  var newSong = document.createElement('li');
  newSong.innerText = song.title;
  newSong.appendChild(playAgainButton);
  newSong.appendChild(deleteButton);

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

function handlePlaySong(event, elementid) {
  event.preventDefault()
  var song = getContent(elementid)
  play(song) //play input from form, invoke
}

function handleStopSong(event) {
   Tone.Transport.cancel().stop()
}


function handleAddSong(event) {

  event.preventDefault()

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
       return response.json()// loadSongs()
      } else {
        throw new Error('server rejected song');
      }
    })
    .then(function (json) {
      addSongToList(json.song)
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
var notes = {A: 'A4', B: 'B4', C: 'C4', D: 'D4', E: 'E4', F: 'F4', G: 'G4', H: 'A5', I: 'B5', J: 'C5', K: 'D5', L: 'E5', M: 'F5', N: 'G5', O: 'A6', P: 'B6', Q:'C6', R: 'D6', S: 'E6', T: 'F6', U: 'G6', V: 'A7', W: 'B7', X: 'C7', Y: 'D7', Z: 'E7', '.': false, '1': 'C#4','2': 'D#4', '3': 'F#4', '4': 'G#4', '5': 'A#4', '6': 'C#5', '7': 'D#5', '8': 'F#5', '9': 'G#5', '0': 'A#5'}
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
    return 'A2';
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
document.getElementById('previewform').addEventListener('submit', function(event) {
  handlePlaySong(event, 'previewData');
});
document.getElementById('songform').addEventListener('submit', function(event) {
  handlePlaySong(event, 'songData');
});
var stopButtons = document.getElementsByClassName('stopbutton');
for(var i = 0; i < stopButtons.length; i++) {
  stopButtons[i].addEventListener('click', handleStopSong);
}
document.getElementById('add').addEventListener('click', handleAddSong);
document.getElementById('tempoSlider').addEventListener('change', function() {
  setTempo(this.value);
});
setTempo(300);

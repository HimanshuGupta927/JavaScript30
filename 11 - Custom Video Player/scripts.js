// Getting all the required elements in the variables
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// function to play and pause
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// function to update play and pause icon
function updateIcon(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

// function to skip by getting "data-skip" custom attribute's value
function handleSkip(){
    let skip = this.dataset.skip;
    video.currentTime += parseFloat(skip);
}

// function to increase or decrease volume or playback rate(video speed)
function handleRangeUpdate(){
    video[this.name] = this.value;
}

// function to update progress bar according to the video's current time
function handleProgressBar(){
    let percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// function to update video's current time with progress bar
function scrub(e){
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

// toggle play when we click on video
video.addEventListener('click', togglePlay);
// updates icon of play/pause button
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
// updates progress bar according to the current time of the video 
video.addEventListener('timeupdate', handleProgressBar)

// toggle play by clicking on the toggle(play/pause) button
toggle.addEventListener('click', togglePlay);

// adding event listenters to skip button
skipButtons.forEach((skipButton)=> skipButton.addEventListener('click', handleSkip));

ranges.forEach((range)=>{
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
})

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=> mouseDown && scrub(e));
progress.addEventListener('mousedown', ()=> mouseDown = true);
progress.addEventListener('mouseup', ()=> mouseDown = false);


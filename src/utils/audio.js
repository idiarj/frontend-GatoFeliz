
let globalPurringAudio = null;
export function playSoundOnce(audioUrl) {
  if (globalPurringAudio) {
    globalPurringAudio.pause();
    globalPurringAudio.currentTime = 0;
  }
  globalPurringAudio = new window.Audio(audioUrl);
  globalPurringAudio.play();
  return globalPurringAudio;
}
export function stopAllPurring() {
  if (globalPurringAudio) {
    globalPurringAudio.pause();
    globalPurringAudio.currentTime = 0;
    globalPurringAudio = null;
  }
}

export function stopSound(audioInstance) {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
  }
}

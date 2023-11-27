export function playSound(sound: string, volume: number = 0.25) {
  const audio = new Audio(`/sounds/${sound}.mp3`);
  audio.volume = volume;
  audio.play();
}

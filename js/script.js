const textarea = document.querySelector("#text")
let voiceList = document.querySelector("#voice")
let speechBtn = document.querySelector(".submit")

let synth = speechSynthesis
let isSpeaking = true

function voiceSpeech() {
   for (let voice of synth.getVoices()) {
      let option = document.createElement("option")
      option.text = voice.name
      voiceList.add(option)
      console.log(option);
   }
}

synth.addEventListener('voiceschanged', voiceSpeech)

function textToSpeech(text) {
   let utternance = new SpeechSynthesisUtterance(text)
   for (let voice of synth.getVoices()) {
      if (voice.name === voiceList.value) {
         utternance.voice = voice
      }
   }
   speechSynthesis.speak(utternance)
}

speechBtn.addEventListener('click', (event) => {
   event.preventDefault()
   if (textarea.value != "") {
      if (!synth.speaking) {
         textToSpeech(textarea.value)
      }
      if (textarea.value.length > 80) {
         if (isSpeaking) {
            synth.resume()
            isSpeaking = false
         } else {
            synth.pause()
            isSpeaking = true
         }
         setInterval(() => {
            if (!synth.speaking && !isSpeaking) {
               isSpeaking = true
               speechBtn.innerHTML = "Convert To Speech"
            }
         })
      } else {
         speechBtn.innerHTML = "Convert To Speech"
      }
   }
})
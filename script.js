const languages = {
    "am": "Amharic",
    "ar": "Arabic",
    "be": "Bielarus",
    "bem": "Bemba",
    "bi": "Bislama",
    "bjs": "Bajan",
    "bn": "Bengali",
    "bo": "Tibetan",
    "br": "Breton",
    "bs": "Bosnian",
    "ca": "Catalan",
    "cop": "Coptic",
    "cs": "Czech",
    "cy": "Welsh",
    "da": "Danish",
    "dz": "Dzongkha",
    "de": "German",
    "dv": "Maldivian",
    "el": "Greek",
    "en": "English",
    "es": "Spanish",
    "et": "Estonian",
    "eu": "Basque",
    "fa": "Persian",
    "fi": "Finnish",
    "fn": "Fanagalo",
    "fo": "Faroese",
    "fr": "French",
    "gl": "Galician",
    "gu": "Gujarati",
    "ha": "Hausa",
    "he": "Hebrew",
    "hi": "Hindi",
    "hr": "Croatian",
    "hu": "Hungarian",
    "id": "Indonesian",
    "is": "Icelandic",
    "it": "Italian",
    "ja": "Japanese",
    "kk": "Kazakh",
    "km": "Khmer",
    "kn": "Kannada",
    "ko": "Korean",
    "ku": "Kurdish",
    "ky": "Kyrgyz",
    "la": "Latin",
    "lo": "Lao",
    "lv": "Latvian",
    "men": "Mende",
    "mg": "Malagasy",
    "mi": "Maori",
    "ms": "Malay",
    "mt": "Maltese",
    "my": "Burmese",
    "ne": "Nepali",
    "niu": "Niuean",
    "nl": "Dutch",
    "no": "Norwegian",
    "ny": "Nyanja",
    "ur": "Pakistani",
    "pau": "Palauan",
    "pa": "Panjabi",
    "ps": "Pashto",
    "pis": "Pijin",
    "pl": "Polish",
    "pt": "Portuguese",
    "rn": "Kirundi",
    "ro": "Romanian",
    "ru": "Russian",
    "sg": "Sango",
    "si": "Sinhala",
    "sk": "Slovak",
    "sm": "Samoan",
    "sn": "Shona",
    "so": "Somali",
    "sq": "Albanian",
    "sr": "Serbian",
    "sv": "Swedish",
    "sw": "Swahili",
    "ta": "Tamil",
    "te": "Telugu",
    "tet": "Tetum",
    "tg": "Tajik",
    "th": "Thai",
    "ti": "Tigrinya",
    "tk": "Turkmen",
    "tl": "Tagalog",
    "tn": "Tswana",
    "to": "Tongan",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "wo": "Wolof",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "zu": "Zulu"
};



let selectel = document.querySelectorAll("select");
let translatebtn = document.querySelector("#translate");
let entertextel = document.querySelector("#entertext");
let transtextel = document.querySelector("#transtext");
let mikefromel = document.querySelector("#mikefrom");
let miketoel = document.querySelector("#miketo");
let copyfromel = document.querySelector("#copyfrom");
let copytoel = document.querySelector("#copyto");


selectel.forEach((sel,i) => {
    for (let lang in languages) {
        let selected;
    if (i==0 && lang=="en") {
        selected = "selected";
    }
    if (i==1 && lang=="hi") {
        selected = "selected";
    }
        let opt = ` <option value="${lang}" ${selected}>${languages[lang]}</option>`;
        sel.insertAdjacentHTML("beforeend", opt);
    }
});

translatebtn.addEventListener("click", () => {
    translateIt();
});

const translateIt =  async() => {
    const sourceLang = selectel[0].value;
    const targetLang = selectel[1].value;
    let texts = entertextel.value;
    const url = `https://api.mymemory.translated.net/get?q=${texts}&langpair=${sourceLang}|${targetLang}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        if (data && data.responseData && data.responseData.translatedText) {
            transtextel.value = data.responseData.translatedText;
            data.matches.forEach(data => {
                        if (data.id === 0) {
                            transtextel.value = data.translation;
                        }
                    });
        }

        else{
            alert("Translation failed, please try again.");
        }
    } catch (error) {
        console.error("Error during translation:", error);
        alert("An error occurred during translation.");
    }
};


copyfromel.addEventListener("click", () => {
    if (entertextel.value != "") {
        navigator.clipboard.writeText(entertextel.value);
    }
}); 

copytoel.addEventListener("click", () => {
    if (transtextel.value != "") {
        navigator.clipboard.writeText(transtextel.value);
    }
}); 

mikefromel.addEventListener("click", () => {
    let voice = new SpeechSynthesisUtterance(entertextel.value);
    voice.lang = selectel[0].value;
    window.speechSynthesis.speak(voice);
    
});

miketoel.addEventListener("click", () => {
    let voice = new SpeechSynthesisUtterance(transtextel.value);
    voice.lang = selectel[1].value;
    window.speechSynthesis.speak(voice);
    
});


const from_text = document.querySelector(".from_text");
to_text = document.querySelector(".to_text");

selectTag = document.querySelectorAll("select");

const textarea = document.getElementById('message');
exchangeIcon = document.querySelector(".exchange");
translateBtn = document.querySelector("button");
icons = document.querySelectorAll(".icons i");



// customize  select tag 

selectTag.forEach((tag, id) => {
    // console.log(tag)
    // key= country_code 
    // object = countries
    for (const country_code in countries) {
        // console.log(countries[country_code]); // show lang. count.
        // selecting English by default as From language and bangladesh as to language
        let selected;
        // == value id and 0 vlue true then  0 && country_Code true then Country_conde == "en-G8" true 

        if (id == 0 && country_code == "en-G8") {
            selected = "selected";
        }
        else if (id == 1 && country_code == "bn-BGD") {
            selected = "selected";
        }
        let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;

        tag.insertAdjacentHTML("beforeend", option); // adding option tag inside select tag


    }
});
// customize select tag

// exchange text area and select text value 

exchangeIcon.addEventListener("click", () => {
    let tempText = from_text.value,
        tempLang = selectTag[0].value;       // exchange language
    from_text.value = to_text.value;
    selectTag[0].value = selectTag[1].value;
    to_text.value = tempText;
    selectTag[1].value = tempLang;
});

// exchange text area and select text value

// translation 

translateBtn.addEventListener("click", () => {
    let text = from_text.value;
    translateFrom = selectTag[0].value,  // getting freomSelect tag value
        translateto = selectTag[1].value;    // getting toSelect tag value
    // console.log(text, translateFrom ,translateto);
    //link api url
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateto}it`;

    // fetching api response and returning it with parsing into js boj
    // and in another then method receiving that object
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        to_text.value = data.responseData.translatedText;

    });
});
// complete translation 

// clear value

textarea.value = "";
const btn = document.getElementById('btn');
btn.addEventListener("click", function handleClick() {
    textarea.value = "";
    // console.log(textarea.value)
});
// clear value

// icons 

icons.forEach(icons => {
    icons.addEventListener("click", ({ target }) => {
        // console.log(target);
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(from_text.value);
            } else {
                navigator.clickboard.writeText(to_text.value);
            }
        } else {
            console.log("Speech icon clicked");
        }
        

    });
})


// $(".fa-copy").click(function () {
//     $("#message").select();
//     document.execCommand('copy');
// })
// $(".to-copy").click(function () {
//     $("#to-text").select();
//     document.execCommand('copy')
// })
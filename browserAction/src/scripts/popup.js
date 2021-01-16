function isFrogHidden() {
    const frog = document.getElementById('frog')
    const style = window.getComputedStyle(frog)
    frog.style.display = (style.display === 'none') ? 'block' : 'none'
}

function fireContentScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { fireContentScript: true, type: 'fireContentScript' })
    })
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('clickMe').addEventListener("click", isFrogHidden)
    document.getElementById('fireContentScript').addEventListener("click", fireContentScript)
    document.getElementById('button').addEventListener("click", addImages)
    document.getElementBtId('qbutton').addEventListener("click", changeQuote)
})

function getRandomInt(){
    return Math.floor(Math.random() * Math.floor(max)); 
}

function changeQuote() {
    if (!document.getElementById) return;
    var quotes = ["Enjoy the little things!", "You can & you will", "Drink some water!", "Go grab a snack!", "Send a text to a friend!",
        "Rest your eyes for 10 seconds!", "Go for a walk and enjoy some sunlight!", "Today's a good day! :)", "Listen to your favourite song!", "Take a break from the screen!"];
    var newquote = quotes[getRandomInt(9)];
    var quote = document.getElementById("quote");
    quote.firstChild.nodeValue=newquote;
}

function addImages() {
    var url = "https://source.unsplash.com/150x150?";
    // var img = document.createElement("img");
    // img.src = url;
    // document.body.appendChild(img);
    var input = document.getElementById("forPhoto").value;
    console.log(input);

    console.log(url+input)
    

    var imgSrc = url + input;
    

    let img = document.getElementById('newPhoto');

    img.src = imgSrc;
}
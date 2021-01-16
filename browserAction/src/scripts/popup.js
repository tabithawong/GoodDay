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
    document.getElementById("checkboxImg").addEventListener('click', checkCheckbox)
    document.getElementById('button').addEventListener("click", addImages)
    // document.getElementById('qbutton').addEventListener("click", changeQuote)
})

// function getRandomInt() {
//     return Math.floor(Math.random() * Math.floor(max)); 
//   }
  var quotes = ["Enjoy the little things!", "You can & you will", "Drink some water!", "Go grab a snack!", "Send a text to a friend!",
      "Rest your eyes for 10 seconds!", "Go for a walk and enjoy some sunlight!", "Today's a good day! :)", "Listen to your favourite song!", "Take a break from the screen!"];
//   var newquote = quotes[getRandomInt(9)];
//   var quote = document.getElementById("quote");
//   quote.textContent = newquote; 
//   console.log(newquote)

// random quote index
const quotes_i = Math.floor(Math.random() * quotes.length);
// set a quote
document.getElementById("quote").innerHTML = quotes[quotes_i];


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




    var checkboxes = document.querySelectorAll("input[type=checkbox][name=settings]");
    let enabledSettings = []
    
    function checkCheckbox() {
        // checkboxes.forEach(function(checkbox) {
            enabledSettings = 
                Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
                
              console.log(enabledSettings)
        //   });
    }
   

function newItem() {
    var item = document.getElementById("input").value;
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    ul.appendChild(li);
    document.getElementById("input").value = ""; 
    li.onclick = removeItem; 
}

document.body.onkeyup = function(e) {
  if (e.keyCode == 13) {
    console.log("enter clicked!");
    newItem();
  }
};

function removeItem(e) {
    e.target.remove()
  }
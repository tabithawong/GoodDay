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
})



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
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
    // document.getElementById('button').addEventListener("click", addImages)
    document.getElementById("buttonPreference").addEventListener("click", openForm)
})

// array of quotes
  var quotes = ["Enjoy the little things!", "You can & you will", "Drink some water!", "Go grab a snack!", "Send a text to a friend!",
      "Rest your eyes for 10 seconds!", "Go for a walk and enjoy some sunlight!", "Today's a good day! :)", "Listen to your favourite song!", "Take a break from the screen!"];

// random quote index
const quotes_i = Math.floor(Math.random() * quotes.length);
// set a quote
document.getElementById("quote").innerHTML = quotes[quotes_i];


// function addImages() {
//     var url = "https://source.unsplash.com/150x150?";
//     // var img = document.createElement("img");
//     // img.src = url;
//     // document.body.appendChild(img);
//     var input = document.getElementById("forPhoto").value;
//     console.log(input);

//     console.log(url+input)
    

//     var imgSrc = url + input;
    

//     let img = document.getElementById('newPhoto');

//     img.src = imgSrc;
// }

document.body.onload = function() {
    chrome.storage.sync.get("userCheckbox", function(items) {
      if (!chrome.runtime.error) {
    
        if (items.userCheckbox.length > 0) {
            console.log(items.userCheckbox);
            generateImages(items.userCheckbox);
        } else {
            console.log("sorry bud")
        }
        // console.log(items);
        document.getElementById("data").innerText = items.data;

      }
    });

    chrome.storage.sync.get("disappearCheckbox", function(items) {

        const toggleCheckbox = items.disappearCheckbox;
        console.log(toggleCheckbox)
        if (toggleCheckbox) {
            document.getElementById("formForPhotos").style.display = "none";
            document.getElementById("buttonPreference").style.display = "block";
        }
    })

    chrome.storage.sync.get("userNotes", function(items) {
        console.log(items);
        generateNotes(items.userNotes);
    })
  }

  function openForm() {
    document.getElementById("formForPhotos").style.display = "block";
    document.getElementById("buttonPreference").style.display = "none";
  }


    var checkboxes = document.querySelectorAll("input[type=checkbox][name=settings]");
    let enabledSettings = []
    const img1 = document.getElementById("checkboxImg1");
    const img2 = document.getElementById("checkboxImg2");
    const img3 = document.getElementById("checkboxImg3");

    function checkCheckbox() {
        // checkboxes.forEach(function(checkbox) {
            enabledSettings = 
                Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
                
              console.log(enabledSettings)
           

              generateImages(enabledSettings);
          
           
        //   });

        chrome.storage.sync.set({'userCheckbox': enabledSettings}, function() {
            // Notify that we saved.
            console.log('Settings saved');
          });
          chrome.storage.sync.set({'disappearCheckbox': true}, function() {
            // Notify that we saved.
            console.log('toggleCheckbox saved');
          });
    }


    function generateImages(userPreference) {

        console.log(userPreference + "this is it")
    
        const numbers = [0, 1, 2, 3, 4];
  
        // Getting random numbers
        const positionNum = Math.floor(Math.random() * numbers.length)
        const randomNum = numbers[positionNum];
        numbers.splice(positionNum, 1)
   
        const postitionNum1 = Math.floor(Math.random() * numbers.length);
        const randomNum1 = numbers[postitionNum1];
        numbers.splice(postitionNum1, 1)

        const positionNum2 = Math.floor(Math.random() * numbers.length)
        const randomNum2 = numbers[positionNum2];
        numbers.splice(positionNum2, 1);

        if (userPreference.length == 3) {
     
           
            img1.src = "./images/animals/a" + randomNum + ".jpg";
            img2.src = "./images/nature/n" + randomNum + ".jpg";
            img3.src = "./images/study/s" + randomNum + ".jpg";
        } else if (userPreference.length == 2) {
          
            if (userPreference.includes("animals") && userPreference.includes("nature")){
                img1.src = "./images/animals/a" + randomNum + ".jpg";
                img2.src = "./images/nature/n" + randomNum + ".jpg";
                img3.src =  "./images/animals/a" + randomNum1 + ".jpg";
            } else if (userPreference.includes("animals") && userPreference.includes("study")){
                img1.src = "./images/animals/a" + randomNum + ".jpg";
                img2.src = "./images/study/s" + randomNum1 + ".jpg";
                img3.src = "./images/animals/a" + randomNum1 + ".jpg";
            } else {
                img1.src = "./images/animals/a" + randomNum + ".jpg";
                img2.src = "./images/study/s" + randomNum1 + ".jpg";
                img3.src = "./images/animals/a" + randomNum1 + ".jpg";
            }
         
        } else {
            if (userPreference.includes("animals")) {
                img1.src = "./images/animals/a" + randomNum + ".jpg";
                img2.src = "./images/animals/a" + randomNum1 + ".jpg";
                img3.src = "./images/animals/a" + randomNum2 + ".jpg";
            } else if (userPreference.includes("nature")) {
                img1.src = "./images/nature/n"+ randomNum + ".jpg";
                img2.src = "./images/nature/n" + randomNum1 + ".jpg";
                img3.src = "./images/nature/n" + randomNum2 + ".jpg";
            } else {
                img1.src = "./images/study/s" + randomNum + ".jpg";
                img2.src = "./images/study/s" + randomNum1 + ".jpg";
                img3.src = "./images/study/s" + randomNum2 + ".jpg";
            }
        }

    }

    var notesList = []

function newItem() {
    var item = document.getElementById("todo").value;
    notesList.push(item);
    console.log(notesList)
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    ul.appendChild(li);
    document.getElementById("todo").value = ""; 
    li.onclick = removeItem;

}

document.body.onkeyup = function(e) {
  if (e.keyCode == 13) {
    console.log("enter clicked!");
    newItem();

//   const bulletPoints = document.getElementById("list")
//   console.log(bulletPoints);
//   chrome.storage.sync.set({'userNotes': notesList}, function() {
//     // Notify that we saved.
//     console.log('Notes saved');
//     console.log(notesList)
//   });
  }
  console.log(notesList)
  chrome.storage.sync.set({'userNotes': notesList}, function() {
    // Notify that we saved.
    console.log('Notes saved');
    console.log(notesList)
  });
};


document.getElementById("list").addEventListener('click', removeItem)


function generateNotes(notes) {
    var ul = document.getElementById("list");
    console.log(notes)

    notes.map(note => {
        var li = document.createElement("li");
        li.innerHTML = note
        // li.appendChild(document.createTextNode(note))
        ul.appendChild(li);

        notesList.unshift(note);
        console.log(notesList)
    })

    // li.appendChild(document.createTextNode(item))
    // li.appendChild(document.createTextNode(item));
    // ul.appendChild(li);

}

function removeItem(e) {
    e.target.remove()
    notesList.splice(e.target.value, 1)
    console.log(notesList);
    
  }


//   document.body.onbeforeunload = function() {
//     // chrome.storage.sync.set({'userNotes': notesList}, function() {
//     //     // Notify that we saved.
//     //     console.log('Notes saved');
//     //     console.log(notesList)
//     //   });
//   }
    

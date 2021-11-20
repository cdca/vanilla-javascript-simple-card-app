const card = document.getElementById("card");
const buttonAsc = document.getElementById("button-asc");
const buttonDsc = document.getElementById("button-dsc");
const send = document.getElementById("send");
const showRealName = document.getElementById("show-real-name");
const showPlayerName = document.getElementById("show-player-name");
const showAsset = document.getElementById("show-asset");

loadPlayers();

async function loadPlayers() {
  const response = await fetch("./api/players.json");
  const players = await response.json();

  let cardGrid = document.querySelector(".card");

  let nodes = players.map((player, key) => {
    let card = document.createElement("div");

    //Create unique id for each card, maybe in other use cases it can be used
    // let id = document.createAttribute("id");
    // id.value = key;
    // card.setAttributeNode(id);

    card.innerHTML = `<div class=card-wrapper> 
    <div class="card-row"> <div class="real-name">${player.realName}</div> <div>...</div> </div>
    <div class="card-row"> <div class="player-name">${player.playerName} </div> <div>...</div> </div>
    <div class="card-row"> <div class="asset">${player.asset}</div> <div>...</div></div>
    </div>`;

    //Check if trext fits to the card, then decide which class to show
    for (let i = 0; i < card.firstElementChild.children.length; i++) {
      if (
        card.firstElementChild.children[i].children[0].innerText.length < 19
      ) {
        card.firstElementChild.children[i].children[1].style.display = "none";
        
        card.firstElementChild.children[i].children[0].style.display = "block";
      } else {
        card.firstElementChild.children[i].children[1].innerText = card.firstElementChild.children[i].children[0].innerText.slice(0,13).concat("...")
        card.firstElementChild.children[i].children[1].style.display = "block";
        card.firstElementChild.children[i].children[0].style.display = "none";
      }
    }
    return card;
  });

  cardGrid.append(...nodes);
}

//Show player info
function click(e) {
  if (e.target.className !== "card") {
    //can do it as whole card to show up
    showRealName.innerText = e.target.children[0].children[0].innerText;
    showPlayerName.innerText = e.target.children[1].children[0].innerText;
    showAsset.innerText = e.target.children[2].children[0].innerText;
  }
}

//Can make those 2 sort functions with less code
function sortAsc() {
  var list = document.querySelector(".card");
  [...list.children]
    .sort((a, b) => (a.innerText > b.innerText ? 1 : -1))
    .forEach((node) => list.appendChild(node));
}
function sortDsc() {
  var list = document.querySelector(".card");
  [...list.children]
    .sort((a, b) => (a.innerText > b.innerText ? -1 : 1))
    .forEach((node) => list.appendChild(node));
}

// Post with XMLHttpRequest
function submit() {
  if (showRealName.innerText) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://reqbin.com/echo/post/json", true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
      }
    };

    var data = `{
  "realName":${showRealName.innerText},
  "playerName": ${showPlayerName.innerText},
  "asset": ${showAsset.innerText},
   }`;

    xhr.send(data);
  } else {
    console.log("No player");
  }
}

// Post with fetch API

// async function submit() {
//   if (showRealName.innerText) {
//     const response = await fetch("https://reqbin.com/echo/post/json", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: `{
//        "realName":${showRealName.innerText},
//        "playerName": ${showPlayerName.innerText},
//        "asset": ${showAsset.innerText},
//    }`,
//     });

//     response.json().then((data) => {
//       console.log(data);
//     });
//   } else {
//     console.log("No player");
//   }
// }

// Event listeners
card.addEventListener("click", click);
buttonAsc.addEventListener("click", sortAsc);
buttonDsc.addEventListener("click", sortDsc);
send.addEventListener("click", submit);

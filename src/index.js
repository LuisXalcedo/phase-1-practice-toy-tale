let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const form = toyFormContainer.querySelector(".add-toy-form");
  form.addEventListener("submit", handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();
    let toyObj = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0,
    };
    renderOneToy(toyObj);
    addOneToy(toyObj);
  }

  getAllToys();
});

function renderOneToy(toy) {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id=${toy.id}>Like ❤️</button>
  `;

  card.querySelector(".like-btn").addEventListener("click", () => {
    // toy.likes += 1;
    // card.querySelector("p").textContent = toy.likes;
    updateLike(toy);
  });

  document.querySelector("#toy-collection").appendChild(card);
}

function getAllToys() {
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((toyData) => toyData.forEach((toy) => renderOneToy(toy)));
}

function addOneToy(toyObject) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyObject),
  });
}

function updateLike(toyObject) {
  const newNumberOfLikes = (toyObject.likes += 1);
  fetch(`http://localhost:3000/toys/${toyObject.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: newNumberOfLikes,
    }),
  }).then((res) => {
    if (res.ok) {
      const card = document.querySelector(".card");
      const p = (card.querySelector(
        "p"
      ).innerText = `${newNumberOfLikes} Likes`);
      // newNumberOfLikes + " Likes");
    }
  });
}

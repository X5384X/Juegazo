const prevButtons = document.querySelectorAll("#prev");
const nextButtons = document.querySelectorAll("#next");
const carousels = document.querySelectorAll(".carousel");

// Track the current image index for each carousel (both players)
let currentIndex = [0, 0]; // Start with the first image for both carousels

// Total number of images in each carousel
const totalImages = 3; // Set this to the total number of images

// Track the character names corresponding to the images for both players
const characters = [
  ["commando", "marco", "tarma"], // Characters for Player 1
  ["commando2", "marco2", "tarma2"], // Characters for Player 2
];

prevButtons.forEach((prevButton, index) => {
  prevButton.addEventListener("click", () => {
    // Move to the previous image, or wrap around to the last one if at the start
    currentIndex[index] =
      currentIndex[index] > 0 ? currentIndex[index] - 1 : totalImages - 1;
    updateCarousel(index);
  });
});

nextButtons.forEach((nextButton, index) => {
  nextButton.addEventListener("click", () => {
    // Move to the next image, or wrap around to the first one if at the end
    currentIndex[index] =
      currentIndex[index] < totalImages - 1 ? currentIndex[index] + 1 : 0;
    updateCarousel(index);
  });
});

function updateCarousel(carouselIndex) {
  const imageWidth = 200; // The width of each image in pixels
  const translateValue = currentIndex[carouselIndex] * -imageWidth; // Shift based on the current image index
  carousels[carouselIndex].style.transform = `translateX(${translateValue}px)`; // Apply the transformation
}

// Function to get player data when the "Start playing!" button is clicked
document.querySelector("button").addEventListener("click", () => {
  // Get player names from input fields
  const player1Name = document.getElementById("player1-name").value;
  const player2Name = document.getElementById("player2-name").value;

  // Get selected characters based on the current index for each player
  const player1Character = characters[0][currentIndex[0]];
  const player2Character = characters[1][currentIndex[1]];

  // Store the names and characters in local storage
  localStorage.setItem("player1Name", player1Name);
  localStorage.setItem("player2Name", player2Name);
  localStorage.setItem("player1Character", player1Character);
  localStorage.setItem("player2Character", player2Character);

  // Redirect to the game page (juego.html)
  window.location.href = "juego.html";
});

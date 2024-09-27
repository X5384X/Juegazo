const player1Prev = document.querySelector(".player1 #prev");
const player1Next = document.querySelector(".player1 #next");
const player2Prev = document.querySelector(".player2 #prev");
const player2Next = document.querySelector(".player2 #next");

const player1Carousel = document.querySelector(".player1 .carousel");
const player2Carousel = document.querySelector(".player2 .carousel");

let player1Index = 0;
let player2Index = 0;

function updateCarousel(carousel, index) {
  const totalImages = carousel.children.length;
  const newPosition = -(index * 100); // Move by 100% for each image
  carousel.style.transform = `translateX(${newPosition}%)`;
}

player1Prev.addEventListener("click", () => {
  player1Index =
    player1Index > 0 ? player1Index - 1 : player1Carousel.children.length - 1;
  updateCarousel(player1Carousel, player1Index);
});

player1Next.addEventListener("click", () => {
  player1Index =
    player1Index < player1Carousel.children.length - 1 ? player1Index + 1 : 0;
  updateCarousel(player1Carousel, player1Index);
});

player2Prev.addEventListener("click", () => {
  player2Index =
    player2Index > 0 ? player2Index - 1 : player2Carousel.children.length - 1;
  updateCarousel(player2Carousel, player2Index);
});

player2Next.addEventListener("click", () => {
  player2Index =
    player2Index < player2Carousel.children.length - 1 ? player2Index + 1 : 0;
  updateCarousel(player2Carousel, player2Index);
});

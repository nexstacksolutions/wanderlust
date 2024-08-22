const stars = document.querySelectorAll(".rating-star");
const ratingInput = document.getElementById("rating");
stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    const rating = index + 1;
    ratingInput.value = rating;
    // Remove "filled" class from all stars
    stars.forEach((s) => s.classList.remove("filled"));
    // Add "filled" class to clicked star and previous stars
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("filled");
    }
  });
});

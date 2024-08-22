const delForm = document.querySelector(".delForm");

const handleFormSubmit = (event) => {
  event.preventDefault();

  const confirmation = confirm("Are you sure you want to delete this listing?");

  if (confirmation) {
    event.target.submit();
  } else {
    console.log("Deleting cancelled");
    return false;
  }
};

if (delForm) {
  delForm.addEventListener("submit", handleFormSubmit);
}

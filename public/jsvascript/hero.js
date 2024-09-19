let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");

let slider = document.querySelector(".slider");
let sliderList = slider.querySelector(".slider .list");
let thumbnail = document.querySelector(".slider .thumbnail");
let thumbnailItems = thumbnail.querySelectorAll(".item");

thumbnail.appendChild(thumbnailItems[0]);

// Function for next button
nextBtn.onclick = function () {
  moveSlider("next");
};

// Function for prev button
prevBtn.onclick = function () {
  moveSlider("prev");
};

function moveSlider(direction) {
  let sliderItems = sliderList.querySelectorAll(".item");
  let thumbnailItems = document.querySelectorAll(".thumbnail .item");

  if (direction === "next") {
    sliderList.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
    slider.classList.add("next");
  } else {
    sliderList.prepend(sliderItems[sliderItems.length - 1]);
    thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
    slider.classList.add("prev");
  }

  slider.addEventListener(
    "animationend",
    function () {
      if (direction === "next") {
        slider.classList.remove("next");
      } else {
        slider.classList.remove("prev");
      }
    },
    { once: true }
  ); // Remove the event listener after it's triggered once
}

//about section
let freeSwag = document.querySelector("#heading1");
let uniqueEx = document.querySelector("#heading2");
let content = document.querySelector("#content1");

let content1 =
  "<p> At CollegeFest we bring together brands and college students to create unforgettable experiences. Our large lifestyle events allow students to explore their cities and get rewarded just for being students, while the vendors & brands are able to market  effectively to thousands of college students. Our goal is to  create unique experiences for both students and vendors. <br /><br />  CollegeFest has been around over 35 years, and started at the Boston University Armory. Our Flagship event will be taking place at Citizens House of Blues Boston in 2024 and attracts over 10,000 students. </p>";

let content2 =
  "<p>CollegeFest is all about bringing students together to create an unforgettable experience. We hold our events at the coolest venues and bring in the best brands and bands to give college students  the opportunity to explore their cities and their new found freedom. It’s everything you’re looking for, right in one place.  freedom. It’s everything you’re looking for, right in one place. Keep checking back, as CollegeFest expands around the country. Or  sign up to become a CollegeFest Insider, to ensure you’re always  in the know.</p>";

freeSwag.addEventListener("click", () => {
  content.innerHTML = `${content1}`;
});

uniqueEx.addEventListener("click", () => {
  content.innerHTML = `${content2}`;
});

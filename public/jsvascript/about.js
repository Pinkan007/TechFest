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

/***********************
 * Treehouse Techdegree:
 * FSJS Project 2 - Data Pagination and Filtering
 * by Steven Abaco
 */
const header = document.querySelector("header");
const h2 = document.querySelector("h2");
const studentList = document.querySelector(".student-list");
/**
 * This function will create a search component to filter through students.
 * @param {*} list
 * @param {*} page
 */

function attachSearch() {
	let searchHTML = `
  <label for="search" class="student-search">
  	<span>Search by name</span>
  		<input id="search" placeholder="Search by name...">
 		 <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
	</label>
  `;

	// Attach search input to DOM next to heading
	h2.insertAdjacentHTML("afterend", searchHTML);

	// Add Click lister to input to input to activate search logic
	const search = document.querySelector(".student-search");

	search.addEventListener("click", e => {
		const input = e.target;

		input.addEventListener("keyup", () => {
			let newData = [];

			for (let i = 0; i < data.length; i++) {
				let title = data[i].name.title.toLowerCase();
				let firstName = data[i].name.first.toLowerCase();
				let lastName = data[i].name.last.toLowerCase();
				let userInput = input.value.toLowerCase();
				let fullName = `${title} ${firstName} ${lastName}`;
				if (fullName.includes(userInput)) {
					newData.push(data[i]);
				}
			}
			showPage(newData, 1);
			pagination(newData);
		});
	});
}
attachSearch();

/**
 *This function will create and insert/append the elements needed to display a "page" of nine students
 *@param {array} list Student Data that will be passed as an arguement when the function is called
 *@param {number} page Page number that will be passed as an arguement when the function is called
 */

function showPage(list, page) {
	const itemsPerPage = 9;
	let startIndex = page * itemsPerPage - itemsPerPage;
	let endIndex = page * itemsPerPage;

	studentList.innerHTML = "";

	for (let i = 0; i < list.length; i++) {
		if (i >= startIndex && i < endIndex) {
			let html = `  
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
               <h3>
               ${list[i].name.title}
               ${list[i].name.first}
               ${list[i].name.last}
               </h3>
               <span class="email">${list[i].email}</span>
    </div>
    <div class="joined-details">
      <span class="date">Joined : ${list[i].registered.date}</span>
    </div>
  </li>`;
			studentList.insertAdjacentHTML("beforeend", html);
		}
	}
	// If search has no results display an message to let user know
	if (list.length === 0) {
		studentList.innerHTML = "There are no students matching your search";
		studentList.style.textAlign = "center";
		studentList.style.color = "darkred";
		studentList.style.fontSize = "1.5rem";
	}
}

/** This function creates and appends functioning pagination buttons.
 *@param {array} list Student data that will be passed as an argument when the function is called.
 */

function pagination(list) {
	//Calculate how many pagination numbers are needed

	const numPaginationBtns = Math.round(list.length / 9);
	const linkList = document.querySelector(".link-list");

	//Remove any previously displayed buttons

	linkList.innerHTML = "";

	//Loop through pages needed and create html template

	for (let i = 0; i < numPaginationBtns; i++) {
		let html = `
      <li>
        <button type="button">${i + 1}</button>
      </li>
    `;

		//Render elements in DOM with first button set as Active
		linkList.insertAdjacentHTML("beforeend", html);
		linkList.firstElementChild.firstElementChild.classList = "active";

		//Add event listener to pagination buttons
		linkList.addEventListener("click", e => {
			const buttons = document.querySelectorAll("button[type=button]");

			// Remove active class for any buttons
			if (e.target.type == "button") {
				for (let i = 0; i < buttons.length; i++) {
					buttons[i].classList = "";
				}

				// Set active class on clicked button
				e.target.classList = "active";

				// Render the selected page items to DOM
				let page = e.target.innerHTML;
				showPage(list, page);
			}
		});
	}
}

// Call functions with required arguements

showPage(data, 1);
pagination(data);

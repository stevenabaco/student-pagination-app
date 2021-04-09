/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
by Steven Abaco
*/

/**
 *This function will create and insert/append the elements needed to display a "page" of nine students
 *@param {array} list Student Data that will be passed as an arguement when the function is called
 *@param {number} page Page number that will be passed as an arguement when the function is called
 */

function showPage(list, page) {
	const itemsPerPage = 9;
	let startIndex = page * itemsPerPage - itemsPerPage;
	let endIndex = page * itemsPerPage;

	const studentList = document.querySelector(".student-list");
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
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

// Call functions
showPage(data, 1);

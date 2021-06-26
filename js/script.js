/*
Treehouse Techdegree 2021
My Homework Project 2 - Data Pagination and Filtering
*/


/*****    CREATE ELEMENT OPERATİONS    *****/
/*
       This method creates an element with the given element type,
       attribute and value of the attribute
   */
const createElement = (type,property,value) => {
    const newElement = document.createElement(type);
    newElement[property] = value;
    return newElement;
}

const createImg = (src) => {
    const img = createElement("img","className","avatar");
    img.src= src;
    img.alt="Profile Picture";
    return img;
}

const createStudentDetails = (student) => {
    const studentDetails = createElement("div","className","student-details");
    const heading = `${student.name.first} ${student.name.last}`;
    const email = student.email;
    const img = createImg(student.picture.thumbnail);
    const h3 = createElement("h3","textContent",heading);
    const span = createElement("span","className","email");
    span.textContent = email;
    studentDetails.appendChild(img);
    studentDetails.appendChild(h3);
    studentDetails.appendChild(span);
    return studentDetails;
}

const createJoinDetails = (student) => {
    const join = `Joined ${student.registered.date}`
    const joinDetails = createElement("div","className","join-details");
    const span = createElement("span","className","date");
    span.textContent = join;
    joinDetails.appendChild(span);
    return joinDetails;
}

const createLI = (student) => {
    const newLi = createElement("li","className","student-item cf");
    const studentDetails = createStudentDetails(student);
    const joinDetails = createJoinDetails(student);
    newLi.appendChild(studentDetails);
    newLi.appendChild(joinDetails);
    return newLi;
}

const createSearchComponent = () => {
    return `<label for="search" class="student-search">
                        <span>Search by name</span>
                        <input id="search" placeholder="Search by name...">
                        <button type="button">
                            <img src="./img/icn-search.svg" alt="Search icon">
                        </button>
             </label>`;
}

/*****    PAGE VİEW OPERATİONS    ****/

//Search component placed on page
const ul = document.querySelector(".student-list");
const searchComponent = createSearchComponent();
ul.insertAdjacentHTML("beforebegin",searchComponent);

/*
    This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list,page) => {
    const itemsPerPage = 9;
    const startIndex = (page - 1) * itemsPerPage ;
    const endIndex = page * itemsPerPage;
    const ul = document.querySelector(".student-list");
    ul.innerHTML = "";
    for(let i=0; i<list.length; i++){
        if(i>=startIndex && i<endIndex){
           const student = list[i];
           const li = createLI(student);
           ul.appendChild(li);
        }
    }
}


/*
    This function finds the number of pages based on the number of elements in the array
 */
const findPageCount = (length) => {
    let pageCount;
    length % 9 === 0 ? pageCount = length/9 : pageCount = Math.ceil( length/9);
    return pageCount;
}

/*
    This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = (list) => {
    let pageCount = findPageCount(list.length)
    const ul = document.querySelector(".link-list");
    ul.innerHTML = "";
    for(let i=0; i<pageCount; i++){
        ul.insertAdjacentHTML("beforeend",
            `<li>
                 <button type="button">${i+1}</button>
            </li>`);
        //First button element is default active
        ul.firstElementChild.firstElementChild.className = "active";
    }

    ul.addEventListener("click", (event)=>{
        if(event.target.tagName === "BUTTON"){
            const buttonList = ul.children;
            for(let i=0; i<buttonList.length; i++){
                const button = buttonList[i].firstElementChild;
                button.className = "";
            }
            //Only clicked button is activated
            event.target.className = "active";
            const activePageNumber = parseInt(event.target.textContent);
            showPage(list,activePageNumber);
        }
    });
}

/*
    This method stores the data containing the value in
    the search bar in an array and returns this array
 */
const findSearchResult = () => {
    let searchResults = [];
    for(let i=0; i<data.length; i++){
        let student = data[i];
        let search = input.value.toLowerCase();
        const firstname = student.name.first.toLowerCase();
        const lastname = student.name.last.toLowerCase();
        if(firstname.indexOf(search) !== -1 || lastname.indexOf(search) !== -1){
            searchResults.push(student);
        }
    }
    return searchResults;
}

const displaySearchResultPages = () =>{
    let searchResults = findSearchResult();
    if(searchResults.length > 0){
        document.querySelector(".link-list").style.display = "";
        showPage(searchResults,1);
        addPagination(searchResults);
    }
    else {
        const studentList =  document.querySelector(".student-list");
        studentList.innerHTML = `<div>
                                     <h1>Not search found!</h1>
                                </div>`;
        studentList.style.textAlign="center";
        studentList.firstElementChild.style.marginTop = "40px";
        studentList.style.fontWeight = "bolder";
        document.querySelector(".link-list").style.display = "none";
    }
}

const input = document.querySelector('#search');
input.addEventListener("change",()=>{
    displaySearchResultPages();
});

//Call functions
showPage(data,1);
addPagination(data);





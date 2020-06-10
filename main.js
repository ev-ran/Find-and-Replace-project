// You should NOT change the HTML or CSS in this project (at least until you reach
// the bonus objectives). Focus on the JavaScript.

const findInput = document.querySelector(".find-input");
const refreshButton = document.querySelector("#refresh");
const checkbox_Element = document.querySelector("#myCheck");
const findAllButton = document.querySelector(".find-all-button");
const findOneByOne_Button = document.querySelector("#find_one_by_one");
const search_result_Element = document.querySelector("#search_result");
const findToReplace_Input = document.querySelector(".find_toReplace_input");
const replaceInput = document.querySelector(".replace_input");
const refreshButton1 = document.querySelector("#refresh1");
const replace_result_Element = document.querySelector("#replace_result");
const replaceAllButton = document.querySelector(".replace_all_button");
const replaceFirst_Button = document.querySelector("#replace_one_by_one");
const replaceNext_Button = document.querySelector("#replace_next");

let find_str;
let replace_str;
let i = 1;
let str_array = [];
let elem;
let counter;
let case_insensitive;
let span_identifyer;
let number_of_string;
let select_array = [];
replaceNext_Button.disabled = true;


// The following variable holds your OUTER ARRAY of row elements.
// Later you will need an OUTER LOOP to loop over the individual elements within
// this array.
// let rowElements_arr = document.querySelectorAll(".row");// array with table rows

// When you call the function belwo, it will get and return an INNER ARRAY
// containing the cell elements for a given row.
// Call this function from WITHIN your row elements loop. Then you will, in turn,
// need to loop over the resulting cell elements. But where should this whole
// NESTED LOOP go? Think through the user's experience: when should WHAT happen? 

// function getCellElements(currentRowElement) {

//     return currentRowElement.querySelectorAll(".cell")
// }


let rowElements_arr = document.querySelectorAll(".row");

//Refresh buttons ----------------------------------------

refreshButton.addEventListener("click", function () {
    location.reload();
    return false;
})

refreshButton1.addEventListener("click", function () {
    location.reload();
    return false;
})

// Replace all button --------------------------------

replaceAllButton.addEventListener("click", function () {

    find_str = findToReplace_Input.value;

    replace_str = replaceInput.value;

    if (find_str !== "" && replace_str !== "") {


        replace_all(rowElements_arr, find_str, replace_str);

        replaceAllButton.disabled = true;
        findOneByOne_Button.disabled = true;
        findAllButton.disabled = true;
        replaceFirst_Button.disabled = true;
        replaceNext_Button.disabled = true;
        findInput.disabled = true;
        findToReplace_Input.disabled = true;
        replaceInput.disabled = true;
        checkbox_Element.disabled = true;
    }

    else if (find_str === "" || replace_str === "") {

        replace_result_Element.innerHTML = "Please click the \"Refresh\" button then enter information in \"Find\" and in  \"Replace With\" fields.";

        replaceAllButton.disabled = true;
        findOneByOne_Button.disabled = true;
        findAllButton.disabled = true;
        replaceFirst_Button.disabled = true;
        replaceNext_Button.disabled = true;
        findInput.disabled = true;
        findToReplace_Input.disabled = true;
        replaceInput.disabled = true;
        checkbox_Element.disabled = true;

    }

})

// Find All button -------------------------
findAllButton.addEventListener("click", function () {
    find_str = findInput.value;

    replace_str = replaceInput.value;

    if (find_str !== "") {

        console.log("*******");
        find_all(rowElements_arr, find_str, replace_str);

        replaceAllButton.disabled = true;
        findOneByOne_Button.disabled = true;
        findAllButton.disabled = true;
        replaceFirst_Button.disabled = true;
        replaceNext_Button.disabled = true;
        findInput.disabled = true;
        findToReplace_Input.disabled = true;
        replaceInput.disabled = true;
        checkbox_Element.disabled = true;

    } else if (find_str === "") {

        search_result_Element.innerHTML = "Please click the \"Refresh\" button then enter information in \"Find\" field.";

        replaceAllButton.disabled = true;
        findOneByOne_Button.disabled = true;
        findAllButton.disabled = true;
        replaceFirst_Button.disabled = true;
        replaceNext_Button.disabled = true;
        findInput.disabled = true;
        findToReplace_Input.disabled = true;
        replaceInput.disabled = true;
        checkbox_Element.disabled = true;

    }
})

// Find First / Find Next button ----------------------------------
// Two functions on one button: Find One and Find Next
onload = init;
function init() {

    var onclick = clickUpdates();

    findOneByOne_Button.addEventListener("click", onclick, false);
}

function clickUpdates() {
    let count = 0;
    let next = function () {
        switch (count) {

            case 0:
                find_str = findInput.value;

                if (find_str === "") {
                    find_str = ".";
                    search_result_Element.innerHTML = "You forget to enter some value to * Find * field"
                }

                replace_str = replaceInput.value;

                find_one(rowElements_arr, find_str, replace_str)

                let str_number = 0;

                let first_finded_element = document.querySelector(".highlight_find");

                if (first_finded_element) {

                    first_finded_element.className = "active";

                    search_result_Element.innerHTML = " 1 element found";

                } else {
                    search_result_Element.innerHTML = "No such string in document"
                }


                console.log("First Click: Find all entries.");
                counter = 2;
                findOneByOne_Button.innerHTML = "Find NEXT";
                findOneByOne_Button.setAttribute("style", "color:red");

                replaceAllButton.disabled = true;
                findAllButton.disabled = true;
                replaceFirst_Button.disabled = true;
                replaceNext_Button.disabled = true;
                findInput.disabled = true;
                findToReplace_Input.disabled = true;
                replaceInput.disabled = true;
                checkbox_Element.disabled = true;

                break;
            case 1:

                find_next();
                search_result_Element.innerHTML = " " + counter + " elements found";
                counter++;
                console.log("Find one by one");
                break;
            default:
                find_next();
                console.log("Going find one by one");
                break;

        }
        count = count < 1 ? count + 1 : 1;
    }
    return next;
}

//-Replace First button --------------------------------------

replaceFirst_Button.addEventListener("click", function () {

    find_str = findToReplace_Input.value;

    replace_str = replaceInput.value;

    if (find_str !== "" && replace_str !== "") {

        replace_one(rowElements_arr, find_str, replace_str);

        replaceAllButton.disabled = true;
        findOneByOne_Button.disabled = true;
        findAllButton.disabled = true;
        replaceFirst_Button.disabled = true;
        replaceNext_Button.disabled = false;
        findInput.disabled = true;
        findToReplace_Input.disabled = true;
        replaceInput.disabled = true;
        checkbox_Element.disabled = true;

    } else {

        replace_result_Element.innerHTML = "Please click the \"Refresh\" button and enter information in \"Find\" and \"Replace With\" fields.";

        replaceAllButton.disabled = true;
        findOneByOne_Button.disabled = true;
        findAllButton.disabled = true;
        replaceFirst_Button.disabled = true;
        replaceNext_Button.disabled = true;
        findInput.disabled = true;
        findToReplace_Input.disabled = true;
        replaceInput.disabled = true;
        checkbox_Element.disabled = true;
    }

})

//-Replace Next  button --------------------------------------

replaceNext_Button.addEventListener("click", function () {
    replace_next();

})


// -------------------------------------------
function find_next() {
    console.log("NEXT ::");

    select_array = document.querySelectorAll(".highlight_find");

    select_array[0].className = "active";

}

//-------------------------------------------
function find_one(RowElements_arr, find_str, replace_str) {

    let number_of_search_entries = 0;

    str_array = [];
    Loop1:
    for (let num_of_row = 0; num_of_row < rowElements_arr.length; num_of_row++) {  //iterate throw array with rows

        let currentRowElement = rowElements_arr[num_of_row];  // get one row

        let cellElements_arr = currentRowElement.querySelectorAll(".cell"); //create array with cells

        Loop2:
        for (let num_of_cell = 0; num_of_cell < cellElements_arr.length; num_of_cell++) {

            let currentCellElement = cellElements_arr[num_of_cell];

            let str = currentCellElement.innerHTML;


            // console.log(str);

            if (checkbox_Element.checked === false) {
                case_insensitive = false;

                if (str.includes(find_str)) {

                    str = replaceAll(str, find_str, '<span class = "highlight_find">' + find_str + '</span>');

                }
            }
            if (checkbox_Element.checked === true) {

                case_insensitive = true;

                span_identifyer = "highlight_find";

                if (str.toLowerCase().includes(find_str.toLowerCase())) {
                    str = replaceAll_case_insensitive(str, find_str, span_identifyer);
                }

            }

            currentCellElement.innerHTML = str;

            number_of_search_entries += number_of_search_entries_in_string(str, find_str, case_insensitive); //return
        }

    }


    for (let num_of_row = 0; num_of_row < rowElements_arr.length; num_of_row++) {  //iterate throw array with rows

        let currentRowElement = rowElements_arr[num_of_row];  // get one row

        let cellElements_arr = currentRowElement.querySelectorAll(".cell"); //create array with cells

        Loop2:
        for (let num_of_cell = 0; num_of_cell < cellElements_arr.length; num_of_cell++) {

            let currentCellElement = cellElements_arr[num_of_cell];

            let str_W_class = currentCellElement.innerHTML.class;

            console.log(str_W_class);

        }
    }
}

//-------------------------------------------
function find_all(RowElements_arr, find_str, replace_str) {

    let number_of_search_entries = 0;

    for (let num_of_row = 0; num_of_row < rowElements_arr.length; num_of_row++) {  //iterate throw array with rows

        let currentRowElement = rowElements_arr[num_of_row];  // get one row

        let cellElements_arr = currentRowElement.querySelectorAll(".cell"); //create array with cells

        for (let num_of_cell = 0; num_of_cell < cellElements_arr.length; num_of_cell++) {

            let currentCellElement = cellElements_arr[num_of_cell];

            let str = currentCellElement.innerHTML;

            if (checkbox_Element.checked === false) {

                case_insensitive = false;

                if (str.includes(find_str)) {
                    str = replaceAll(str, find_str, '<span class = "highlight">' + find_str + '</span>');
                }

            }

            if (checkbox_Element.checked === true) {

                case_insensitive = true;

                span_identifyer = "z";

                if (str.toLowerCase().includes(find_str.toLowerCase())) {
                    str = replaceAll_case_insensitive(str, find_str, span_identifyer);
                }

            }

            currentCellElement.innerHTML = str;

            number_of_search_entries += number_of_search_entries_in_string(str, find_str, case_insensitive); //return the number of found elements


        }
    }

    if (number_of_search_entries === 0) {

        search_result_Element.innerHTML = "Can not find *" + find_str + "* in this text";
    } else if (number_of_search_entries === 1) {

        search_result_Element.innerHTML = "Found *" + number_of_search_entries + "* entry of  *" + find_str + "* in this text";
    } else {

        search_result_Element.innerHTML = "Found *" + number_of_search_entries + "*  entries of  *" + find_str + "* in this text";
    }
}
//---------------------------------------------------------------
function replaceAll(some_string, search, replace) {

    some_string = some_string.split(search).join(replace);

    return some_string;
}

//---------------------------------------------------------------
function replaceAll_case_insensitive(some_string, search, span_identifyer) {

    // replace = search;

    some_string_01 = some_string.toLowerCase();
    search_01 = search.toLowerCase();

    let i = 0.1;
    arr = [];


    while (i >= 0) {
        i = some_string_01.indexOf(search_01);

        if (i >= 0) {
            arr.push(i);
            some_string_01 = some_string_01.slice(i + search_01.length);
            // console.log(str3);
        } else {
            break;
        }
    } /// get array arr with indexes of search


    let arr_index = [];
    let sum = arr[0];
    arr_index.push(sum);
    for (let j = 1; j < arr.length; j++) {
        sum += arr[j] + 1;
        arr_index.push(sum);
    } /// get array arr with indexes of [search] from ZERO position in [some_string]

    /// create a string [some_string_new] like [some_string] but with every [search] in it - in LOW CASE

    let some_string_new = ""
    let substring_start = 0;

    for (let k = 0; k < arr_index.length; k++) {
        some_string_new = some_string_new + some_string.substring(substring_start, arr_index[k]) + '<span class = "' + span_identifyer + '">' + some_string.substring(arr_index[k], arr_index[k] + search.length) + '</span>';

        substring_start = arr_index[k] + search.length;
    }
    some_string_new = some_string_new + some_string.substring(substring_start);

    some_string = some_string_new;

    return some_string;
}

//---------------------------------------------------------------
function replace_all(RowElements_arr, find_str, replace_str) {

    let number_of_search_entries = 0;

    for (let num_of_row = 0; num_of_row < rowElements_arr.length; num_of_row++) {  //iterate throw array with rows

        let currentRowElement = rowElements_arr[num_of_row];  // get one row

        let cellElements_arr = currentRowElement.querySelectorAll(".cell"); //create array with cells

        for (let num_of_cell = 0; num_of_cell < cellElements_arr.length; num_of_cell++) {

            let currentCellElement = cellElements_arr[num_of_cell];

            let str = currentCellElement.innerHTML;

            // console.log(str);

            if (str.includes(find_str)) {
                console.log(currentCellElement.innerHTML);

                str = replaceAll(str, find_str, '<span class = "highlight">' + replace_str + '</span>');

                currentCellElement.innerHTML = str;

                case_insensitive = false;

                number_of_search_entries += number_of_search_entries_in_string(str, replace_str, case_insensitive); //return the number of replaced elements

                console.log("number_of_search_entries" + number_of_search_entries)

            }

        }

        if (number_of_search_entries === 0) {

            replace_result_Element.innerHTML = "Can not find *" + find_str + "* in this text.";
        } else if (number_of_search_entries === 1) {

            replace_result_Element.innerHTML = "Replaced *" + number_of_search_entries + "* entry of  *" + find_str + "* to *" + replace_str + "* in this text.";
        } else {

            replace_result_Element.innerHTML = "Replaced *" + number_of_search_entries + "* entries of  *" + find_str + "* to *" + replace_str + "* in this text.";
        }



    }
    // return currentRowElement.querySelectorAll(".cell")
}

//---------------------------------------------------------------
function number_of_search_entries_in_string(str, find_str, case_insensitive) {
    counter = 0;
    let num = 0;
    if (case_insensitive === true) {
        str = str.toLowerCase();
        find_str = find_str.toLowerCase();
    }
    while (num <= str.length - find_str.length + 1) {

        num = str.indexOf(find_str);
        if (num >= 0) {
            counter++;

        } else {
            break;
        }

        str = str.substring(num + find_str.length)
    }
    return counter;
}

//---------------------------------------------------------------
function replace_next() {
    console.log("NEXT NEXT NEXT NEXT NEXT NEXT NEXT");

    let select_array = document.querySelectorAll(".highlight_find");

    console.log(select_array.length);

    let replaced_element = select_array[0];
    if (replaced_element) {
        let str = replaced_element.innerHTML;
        str = str.replace(find_str, replace_str);
        replaced_element.innerHTML = str;

    }

    select_array[0].className = "active";

    replace_result_Element.innerHTML = " " + counter + " elements replaced";
    counter++;

}

//-------------------------------------------
function replace_one(RowElements_arr, find_str, replace_str) {

    console.log("Hi from replace");
    let number_of_search_entries = 0;

    str_array = [];
    Loop1:
    for (let num_of_row = 0; num_of_row < rowElements_arr.length; num_of_row++) {  //iterate throw array with rows

        let currentRowElement = rowElements_arr[num_of_row];  // get one row

        let cellElements_arr = currentRowElement.querySelectorAll(".cell"); //create array with cells

        Loop2:
        for (let num_of_cell = 0; num_of_cell < cellElements_arr.length; num_of_cell++) {

            let currentCellElement = cellElements_arr[num_of_cell];

            let str = currentCellElement.innerHTML;

            // console.log(str);

            if (str.includes(find_str)) {

                str = replaceAll(str, find_str, '<span class = "highlight_find">' + find_str + '</span>');

            }

            currentCellElement.innerHTML = str;

            number_of_search_entries += number_of_search_entries_in_string(str, find_str, case_insensitive); //return
        }

    }


    for (let num_of_row = 0; num_of_row < rowElements_arr.length; num_of_row++) {  //iterate throw array with rows

        let currentRowElement = rowElements_arr[num_of_row];  // get one row

        let cellElements_arr = currentRowElement.querySelectorAll(".cell"); //create array with cells

        Loop2:
        for (let num_of_cell = 0; num_of_cell < cellElements_arr.length; num_of_cell++) {

            let currentCellElement = cellElements_arr[num_of_cell];

            let str_W_class = currentCellElement.innerHTML.class;

            console.log(str_W_class);

        }
    }

    let first_replaced_element = document.querySelector(".highlight_find");
    if (first_replaced_element) {
        let str = first_replaced_element.innerHTML;
        str = str.replace(find_str, replace_str);
        first_replaced_element.innerHTML = str;

        first_replaced_element.className = "active";

        replace_result_Element.innerHTML = " 1 element replaced.";

        counter = 2; //counter for 'Replace NEXT' button clicks
    }
}


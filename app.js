/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to...\n1. See their Info\n2. See their Family\n3. See Their Descendants\n4. Restart Search\n5. Quit Search\n\nEnter Corresponding Number`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "1":
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "2":
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "3":
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "4":
            // Restart app() from the very beginning
            app(people);
            break;
        case "5":
            // Stop application execution
            break;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName.toLowerCase() === firstName.toLocaleLowerCase() && person.lastName.toLocaleLowerCase() === lastName.toLocaleLowerCase()) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
   confirmWindow(personInfo,person);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
function maleFemale(input){
return input.toLowerCase() === "male" || input.toLowerCase() === "female";
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁


function findPersonFamily(person,people){
    
    let spouse = findPersonSpouse(person,people);
    let parents = findPersonParents(person,people);
    let siblings = findPersonSiblings(person,people);
    
    let personFamily ='';
    personFamily = addNamesToString(spouse,personFamily,'Spouse');
    personFamily = addNamesToString(parents,personFamily,'Parents');
    personFamily = addNamesToString(siblings,personFamily,'Siblings');

    confirmWindow(personFamily,person);
}

function findPersonSiblings(person,people){
    let siblings = people.filter(function(pers){
        return pers.parents.includes(person.parents[0]) && pers.id != person.id || 
        pers.parents.includes(person.parents[1]) && pers.id != person.id})
    return siblings;  
}
function findPersonSpouse(person,people){
    let spouse = people.filter(function(pers){return person.currentSpouse == pers.id});
    return spouse;
}
function findPersonParents(person,people){
    let parents = people.filter(function(pers){return pers.id == person.parents[0] || pers.id == person.parents[1]})
    return parents;
}

/**
 * This takes an array of people and adds their names to a string,underneath the groupName in a column
 * so it can be displayed in a Confrim window.
 * @param {array} people  array of people.
 * @param {string} string  a string that the results are stored in
 * @param {string} groupName a string that is listed above the names of the people (Siblings, Spouse....)
 * @returns {string}          
 */
function addNamesToString(people,string,groupName){
    string += `${groupName}:\n`
    if(people.length != 0){ for(let person of people){string += `${person.firstName} ${person.lastName}\n`}}
    else{string += `None\n`}
    string += `\n`;
    return string
}
function confirmWindow(string,person){
    if (confirm(`${string}\n Select 'OK' to go back to person or 'Cancel' to start a new search`)){
        let personArray = [person];
        mainMenu(personArray, data);
    }
    else {
        app(data);
    }
}

function findPersonDescendants(person,people){
    let descendants = people.filter(function(pers){return pers.parents.includes(person.id)})
    let personsDescendants = '';
    personsDescendants = addNamesToString(descendants,personsDescendants,'Decendants');
    confirmWindow(personsDescendants,person);
}


function continueSearch(people){
    let results = '';
    results = addNamesToString(people,results,"Search Results", maleFemale);
    if (confirm(`${results}\n Select 'Ok' to filter these results by another trait or 'Cancel' to start a new Search`)){
        searchByTraits(people);
    }
    else{
        app(data);
    }
}
function searchByGender(people){
    let choice = prompt("Search by 'male' or 'female'?");
    // change to promptFor later
    let results = people.filter(function(pers){return pers.gender === choice});
    return results;
}

function searchByDob(people){
    let choice = prompt("Select a decade to search by (1950, 1970....)");
    // VALLLIDATTTTEEEEE
    let results = people.filter(function(pers){return pers.dob.charAt(5) ==  choice.charAt(0) && pers.dob.charAt(6) == choice.charAt(1) && pers.dob.charAt(7) == choice.charAt(2)});
    return results
}

function searchByHeight(people){
    let minchoice = prompt("What should the minimum Height be? (in inches)");
    let maxchoice = prompt("what should the maximum Height be? (in inches)");
    // VALIDATE promptFor
    let results = people.filter(function(pers){return pers.height > minchoice && pers.height < maxchoice})
    return results;
    
}
function searchByWeight(people){
    let minchoice = prompt("What should the minimum Weight be? (in lbs)");
    let maxchoice = prompt("what should the maximum Weight be? (in lbs)");
    // VALIDATE promptFor
    let results = people.filter(function(pers){return pers.weight > minchoice && pers.weight < maxchoice})
    return results;
}
/**
 * This takes an array of strings and adds them to a string,underneath the groupName in a column
 * so it can be displayed in a Confrim window.
 * @param {array} array  array of strings.
 * @param {string} string  a string that the results are stored in
 * @param {string} groupName a string that is listed above the strings
 * @returns {string}          
 */
function addItemToString(array,string,groupName){
    string +=`${groupName}`;
    for (let item of array){
        string +=`${item} \n`;
    }
    string += `\n`;
    return string;
}

function searchByEyeColor(people){
    let options = people.map(function(pers){return pers.eyeColor})
    let uniqueOptions = options.filter(function(option,index,array){return array.indexOf(option) == index})
    let string;
    string = addItemToString(uniqueOptions,string, `Eye Colors in this List:\n`)
    let choice = prompt(`${string} Which Eye Color would you like to search by?`)
    // VALIDATION
    let results = people.filter(function(pers){return pers.eyeColor==choice});
    return results;
}

function searchByOccupation(people){
    let options = people.map(function(pers){return pers.occupation})
    let uniqueOptions = options.filter(function(option,index,array){return array.indexOf(option) == index})
    let string;
    string = addItemToString(uniqueOptions,string, `Occupations in this List:\n`)
    let choice = prompt(`${string} Which Occupation would you like to search by?`)
    // VALIDATION
    let results = people.filter(function(pers){return pers.occupation==choice});
    return results;
}
function searchByTraits(people){
let choice = prompt("Which trait would you like to search by? \n1. Gender\n2. Date of Birth\n3. Height\n4. Weight\n5. Eye Color\n6. Occupation\n7. Quit Search\n\nEnter the Corresponding Number");
//  Change promptFor later
let results;
switch(choice){
    case '1':
        results = searchByGender(people);
        continueSearch(results);
        break;
    case '2':
        results = searchByDob(people);
        continueSearch(results);
        break;
    case '3':
        results = searchByHeight(people);
        continueSearch(results);
        break;
    case '4':
        results = searchByWeight(people);
        continueSearch(results);
        break;
    case '5':
        results = searchByEyeColor(people);
        continueSearch(results);
        break;
    case '6':
        results = searchByOccupation(people);
        continueSearch(results);
        break;
    case '7':
        break;
    default:
        return searchByTraits(people);
}
}
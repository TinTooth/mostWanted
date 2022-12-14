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
            confirmPersonWindow(personInfo,person[0],"Select 'OK' to go back to person or 'Cancel' to start a new search");
            break;
        case "2":
            let personFamily = findPersonFamily(person[0], people);
            confirmPersonWindow(personFamily,person[0],"Select 'OK' to go back to person or 'Cancel' to start a new search");
            
            break;
        case "3":
            // HINT: Review recursion lecture + demo for bonus user story
            let personsDescendants = ``;
            let personDescendants = findPersonDescendants(person[0], people,personsDescendants);
            confirmPersonWindow(personDescendants,person[0],"Select 'OK' to go back to person or 'Cancel' to start a new search");
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

function searchByTrait(people){
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

    return personInfo;
   
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
function promptFor(question, valid,options =[]) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response,options));
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
// VALIDATE FUNCTIONS
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
function DOB(input){
    return input.length == 4;
}
function inOptions(input,options){
    return options.includes(input.toLowerCase());
}
function commasThere(input){
    let commaTrue = true;
    for(let i = 0; i+1 < input.length; i += 2){
        commaTrue = input[i+1] ==','
    }
    return commaTrue;
} 

function findPersonFamily(person,people){
    
    let spouse = findPersonSpouse(person,people);
    let parents = findPersonParents(person,people);
    let siblings = findPersonSiblings(person,people);
    
    let personFamily ='';
    personFamily = addNamesToString(spouse,personFamily,'Spouse');
    personFamily = addNamesToString(parents,personFamily,'Parents');
    personFamily = addNamesToString(siblings,personFamily,'Siblings');
    return personFamily;
    
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
function findPersonDescendants(person,people,personsDescendants){
    let descendants = people.filter(function(pers){return pers.parents.includes(person.id)})
    personsDescendants = addNamesToString(descendants,personsDescendants,`${person.firstName} ${person.lastName}'s Children`);
    if (descendants.length != 0){
        for(let dec of descendants){personsDescendants = findPersonDescendants(dec,people,personsDescendants)}
    }
    return personsDescendants;
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
    // string += `\n`;
    return string
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
function confirmPersonWindow(string,person,confirmString){
    if (confirm(`${string}\n ${confirmString}`)){
        let personArray = [person];
        mainMenu(personArray, data);
    }
    else {
        app(data);
    }
}
function continueSearch(people){
    let results =`Number of Results: ${people.length}\n`;
    results = addNamesToString(people,results,"Search Results");
    if (confirm(`${results}\nSelect 'Ok' to filter these results by another trait or 'Cancel' to start a new Search`)){
        searchByTraits(people);
    }
    else{
        app(data);
    }
}
function searchByGender(people){
    let choice = promptFor(`Current Number of People: ${people.length}\nSearch by 'male' or 'female'?`,maleFemale);
    
    let results = people.filter(function(pers){return pers.gender === choice});
    return results;
}
function searchByDob(people){
    let choice = promptFor("Select a decade to search by (1950, 1970....)",DOB);
    let results = people.filter(function(pers){return pers.dob.charAt(5) ==  choice.charAt(0) && pers.dob.charAt(6) == choice.charAt(1) && pers.dob.charAt(7) == choice.charAt(2)});
    return results
}
function searchByTraitByRange(people,key,measurement){
    let minchoice = promptFor(`Current Number of People: ${people.length}\nWhat should the minimum ${key} be? (in ${measurement})`,chars);
    let maxchoice = promptFor(`what should the maximum ${key} be? (in ${measurement})`,chars);
    let results = people.filter(function(pers){return pers[key.toLocaleLowerCase()] > minchoice && pers[key.toLocaleLowerCase()] < maxchoice})
    return results;
}
function searchByTraitWithManyOptions(people,key,displayString){
    let options = people.map(function(pers){return pers[key]});
    let uniqueOptions = options.filter(function(option,index,array){return array.indexOf(option) == index});
    let optionsString ='';
    optionsString = addItemToString(uniqueOptions,optionsString, `${displayString} in this List:\n`);
    let choice = promptFor(`Current Number of People: ${people.length}\n${optionsString} Which ${displayString} would you like to search by?`,inOptions,uniqueOptions);
    let results = people.filter(function(pers){return pers[key]==choice.toLowerCase()});
    return results;
}
function searchByTraits(people){
    let input = promptFor(`Current Number of People: ${people.length}\nWhich Trait or Traits would you like to search by? \n1. Gender\n2. Date of Birth\n3. Height\n4. Weight\n5. Eye Color\n6. Occupation\n7. RESTART\n8. QUIT\nEnter the Corresponding Numbers Seperated by Commas\n(1,4,3) The searches will be executed in that order`,commasThere);
    let choices = input.split(',');
    let results = people;
    for(let choice of choices){
        switch(choice){
            case '1':
                results = searchByGender(results);
                break;
            case '2':
                results = searchByDob(results);
                break;
            case '3':
                results = searchByTraitByRange(results,"Height","inches");
                break;
            case '4':
                results = searchByTraitByRange(results,"Weight","lbs");
                break;
            case '5':
                results = searchByTraitWithManyOptions(results,"eyeColor","Eye Color");
                break;
            case '6':
                results = searchByTraitWithManyOptions(results,"occupation", "Occupations");
                break;
            case '7':
                app(data); 
                break;   
            case '8':
                return;
            default:
                alert(`${choice} is Not a Valid Choice`);
                continue;
        }
    }
    continueSearch(results);
}

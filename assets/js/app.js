// regex for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
}

// user inputs elements
let firstnameElem = mainForm.firstname,
    middlenameElem = mainForm.middlename,
    lastnameElem = mainForm.lastname,
    imageElem = document.getElementById('image'), 
    addressElem = mainForm.address,
    emailElem = mainForm.email,
    phonenoElem = mainForm.phoneno,
    summaryElem = mainForm.summary;

// display elements
let nameDsp = document.getElementById('fullname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    phonenoDsp = document.getElementById('phoneno_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    addressDsp = document.getElementById('address_dsp'),
    designationDsp = document.getElementById('designation_dsp'),
    summaryDsp = document.getElementById('summary_dsp'),
    projectsDsp = document.getElementById('projects_dsp'),
    achievementsDsp = document.getElementById('achievements_dsp'),
    skillsDsp = document.getElementById('skills_dsp'),
    educationsDsp = document.getElementById('educations_dsp'),
    experiencesDsp = document.getElementById('experiences_dsp');

    // Add your image handling code here
    if(imageElem) {
        imageElem.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if(imageDsp) {
                        imageDsp.src = e.target.result;
                    } else {
                        console.error('Image display element not found');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    } else {
        console.error('Image input element not found');
    }

// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr = [];

    // first loop deals with the no of repeaters value
    for(let i = 0; i < elemsDataCount; i++){
        let dataObj = {}; // creating an empty object to fill the data
        // second loop fetches the data for each repeaters value or attributes 
        for(let j = 0; j < elemsAttrsCount; j++){
            // setting the key name for the object and fill it with data
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
}

const getUserInputs = () => {

    // achivements 
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
    achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // experiences
    let expTitleElem = document.querySelectorAll('.exp_title'),
    expOrganizationElem = document.querySelectorAll('.exp_organization'),
    expLocationElem = document.querySelectorAll('.exp_location'),
    expStartDateElem = document.querySelectorAll('.exp_start_date'),
    expEndDateElem = document.querySelectorAll('.exp_end_date'),
    expDescriptionElem = document.querySelectorAll('.exp_description');

    // education
    let eduSchoolElem = document.querySelectorAll('.edu_school'),
    eduDegreeElem = document.querySelectorAll('.edu_degree'),
    eduCityElem = document.querySelectorAll('.edu_city'),
    eduStartDateElem = document.querySelectorAll('.edu_start_date'),
    eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
    eduDescriptionElem = document.querySelectorAll('.edu_description');

    let projTitleElem = document.querySelectorAll('.proj_title'),
    projLinkElem = document.querySelectorAll('.proj_link'),
    projDescriptionElem = document.querySelectorAll('.proj_description');

    let skillElem = document.querySelectorAll('.skill');

    // event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));

    const imageElem = document.getElementById('image');
    imageElem.addEventListener('change', (e) => validateImage(e.target));
    return {
        
            firstname: firstnameElem.value,
            middlename: middlenameElem.value,
            lastname: lastnameElem.value,
            email: emailElem.value,
            phoneno: phonenoElem.value,
            address: addressElem.value,
        
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    }
};

function validateFormData(elem, elemType, elemName){
    // checking for text string and non empty string
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only text string
    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for email
    if(elemType == validType.EMAIL){
        if(!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for phone number
    if(elemType == validType.PHONENO){
        if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only empty
    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

// adding the invalid text
function addErrMsg(formElem, formElemName){
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text 
function removeErrMsg(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

// show the list data
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for(const key in listItem){
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    })
}

const displayCV = (userData) => {
    

    nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
}
function storeImage() {
    const imageElem = document.getElementById('image');
    if(imageElem && imageElem.files && imageElem.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Store the image data in localStorage
            localStorage.setItem('resumeImage', e.target.result);
        }
        reader.readAsDataURL(imageElem.files[0]);
    }
}
// generate CV
const generateCV = () => {
    let userData = getUserInputs();
    storeImage(); // Add this line to store the image
    displayCV(userData);
}

// Add this event listener at the bottom of your file
if(imageElem) {
    imageElem.addEventListener('change', previewImage);
}
document.getElementById('image').addEventListener('change', previewImage);

function previewImage() {
    const imageElem = document.getElementById('image');
    const imageDsp = document.getElementById('image_dsp');
    
    if(imageElem && imageDsp) {
        if(imageElem.files && imageElem.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageDsp.src = e.target.result;
            }
            reader.readAsDataURL(imageElem.files[0]);
        }
    }
}

// Add single event listener for image input
const imageInput = document.getElementById('image');
if(imageInput) {
    imageInput.addEventListener('change', previewImage);
}




// print CV
function printCV(){
    window.print();
}
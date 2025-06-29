// Regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // Only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
};

// User input elements
let firstnameElem = mainForm.firstname,
    middlenameElem = mainForm.middlename,
    lastnameElem = mainForm.lastname,
    imageElem = document.getElementById('image'),
    addressElem = mainForm.address,
    emailElem = mainForm.email,
    phonenoElem = mainForm.phoneno,
    summaryElem = mainForm.summary,
    designationElem = mainForm.designation;

// Display elements
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

// Image preview
if (imageElem) {
    imageElem.addEventListener('change', previewImage);
}

function previewImage() {
    if (imageElem && imageDsp && imageElem.files && imageElem.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageDsp.src = e.target.result;
        };
        reader.readAsDataURL(imageElem.files[0]);
    }
}

// Store image to localStorage
function storeImage() {
    if (imageElem && imageElem.files && imageElem.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('resumeImage', e.target.result);
        };
        reader.readAsDataURL(imageElem.files[0]);
    }
}

// Fetch values
const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr = [];

    for (let i = 0; i < elemsDataCount; i++) {
        let dataObj = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
};

const addValidationListener = (elements, type, name) => {
    elements.forEach(el => el.addEventListener('keyup', e => validateFormData(e.target, type, name)));
};

const getUserInputs = () => {
    // Repeated form elements
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
        achievementsDescriptionElem = document.querySelectorAll('.achieve_description'),
        expTitleElem = document.querySelectorAll('.exp_title'),
        expOrganizationElem = document.querySelectorAll('.exp_organization'),
        expLocationElem = document.querySelectorAll('.exp_location'),
        expStartDateElem = document.querySelectorAll('.exp_start_date'),
        expEndDateElem = document.querySelectorAll('.exp_end_date'),
        expDescriptionElem = document.querySelectorAll('.exp_description'),
        eduSchoolElem = document.querySelectorAll('.edu_school'),
        eduDegreeElem = document.querySelectorAll('.edu_degree'),
        eduCityElem = document.querySelectorAll('.edu_city'),
        eduStartDateElem = document.querySelectorAll('.edu_start_date'),
        eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
        eduDescriptionElem = document.querySelectorAll('.edu_description'),
        projTitleElem = document.querySelectorAll('.proj_title'),
        projLinkElem = document.querySelectorAll('.proj_link'),
        projDescriptionElem = document.querySelectorAll('.proj_description'),
        skillElem = document.querySelectorAll('.skill');

    // Validation events
    firstnameElem.addEventListener('keyup', e => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', e => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', e => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', e => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', e => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', e => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', e => validateFormData(e.target, validType.TEXT, 'Designation'));

    addValidationListener(achievementsTitleElem, validType.ANY, 'Title');
    addValidationListener(achievementsDescriptionElem, validType.ANY, 'Description');
    addValidationListener(expTitleElem, validType.ANY, 'Title');
    addValidationListener(expOrganizationElem, validType.ANY, 'Organization');
    addValidationListener(expLocationElem, validType.ANY, 'Location');
    addValidationListener(expDescriptionElem, validType.ANY, 'Description');
    addValidationListener(projTitleElem, validType.ANY, 'Title');
    addValidationListener(projLinkElem, validType.ANY, 'Link');
    addValidationListener(projDescriptionElem, validType.ANY, 'Description');
    addValidationListener(skillElem, validType.ANY, 'Skill');

    expStartDateElem.forEach(item => item.addEventListener('blur', e => validateFormData(e.target, validType.ANY, 'Start Date')));
    expEndDateElem.forEach(item => item.addEventListener('blur', e => validateFormData(e.target, validType.ANY, 'End Date')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', e => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', e => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    addValidationListener(eduSchoolElem, validType.ANY, 'School');
    addValidationListener(eduDegreeElem, validType.ANY, 'Degree');
    addValidationListener(eduCityElem, validType.ANY, 'City');
    addValidationListener(eduDescriptionElem, validType.ANY, 'Description');

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        address: addressElem.value,
        designation: designationElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    };
};

function validateFormData(elem, elemType, elemName) {
    if (elemType === validType.TEXT) {
        if (!strRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType === validType.TEXT_EMP) {
        if (!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType === validType.EMAIL) {
        if (!emailRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType === validType.PHONENO) {
        if (!phoneRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType === validType.ANY) {
        if (elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

function addErrMsg(formElem, formElemName) {
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

function removeErrMsg(formElem) {
    formElem.nextElementSibling.innerHTML = "";
}

const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        for (const key in listItem) {
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }
        listContainer.appendChild(itemElem);
    });
};

const displayCV = (userData) => {
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
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
};

const generateCV = () => {
    let userData = getUserInputs();
    storeImage();
    displayCV(userData);
};

function printCV() {
    window.print();
} 

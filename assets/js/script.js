// Keep your existing form repeater code
$(document).ready(function(){
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show:function(){
            $(this).slideDown();
        },
        hide: function(deleteElement){
            $(this).slideUp(deleteElement);
        },
        isFirstItemUndeletable: true
    });

    // Add event listeners to form inputs
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('input', debounce(updatePreview, 500));
    });

    // Image change listener
    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    localStorage.setItem('resumeImage', e.target.result);
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // Auto-populate saved resume data when editing
    loadSavedData();
});

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Helper function to safely get input value
function getInputValue(className) {
    const element = document.querySelector(`.${className}`);
    return element ? element.value || '' : '';
}

// Helper function to safely set input value
function setInputValue(className, value) {
    const element = document.querySelector(`.${className}`);
    if (element && value !== undefined && value !== null) {
        element.value = value;
    }
}

function setElemValue(container, selector, value) {
    const element = container.querySelector(selector);
    if (element && value !== undefined && value !== null) {
        element.value = value;
    }
}

// Function to populate repeater arrays
function populateRepeater(groupName, dataArray, populateFn) {
    if (!dataArray || !Array.isArray(dataArray) || dataArray.length === 0) return;
    const container = document.querySelector(`[data-repeater-list="${groupName}"]`);
    if (!container) return;

    const repeaterWrapper = container.closest('.repeater');
    const addButton = repeaterWrapper ? repeaterWrapper.querySelector('[data-repeater-create]') : null;
    const existingItems = container.querySelectorAll('[data-repeater-item]');

    for (let i = existingItems.length; i < dataArray.length; i++) {
        if (addButton) addButton.click();
    }

    const currentItems = container.querySelectorAll('[data-repeater-item]');
    dataArray.forEach((data, index) => {
        if (currentItems[index]) {
            populateFn(currentItems[index], data);
        }
    });
}

// Function to load saved data into form
function loadSavedData() {
    try {
        const savedData = JSON.parse(localStorage.getItem('resumeData') || localStorage.getItem('formData'));
        if (!savedData) return;

        setInputValue('firstname', savedData.firstname);
        setInputValue('middlename', savedData.middlename);
        setInputValue('lastname', savedData.lastname);
        setInputValue('designation', savedData.designation);
        setInputValue('address', savedData.address);
        setInputValue('email', savedData.email);
        setInputValue('phoneno', savedData.phoneno);
        setInputValue('summary', savedData.summary);

        // Populate education
        const eduData = savedData.education || savedData.educations;
        populateRepeater('group-c', eduData, (item, edu) => {
            setElemValue(item, '.edu_school', edu.school || edu.edu_school);
            setElemValue(item, '.edu_degree', edu.degree || edu.edu_degree);
            setElemValue(item, '.edu_city', edu.city || edu.edu_city);
            setElemValue(item, '.edu_start_date', edu.startDate || edu.edu_start_date);
            setElemValue(item, '.edu_graduation_date', edu.endDate || edu.edu_graduation_date);
            setElemValue(item, '.edu_description', edu.description || edu.edu_description);
        });

        // Populate projects
        populateRepeater('group-d', savedData.projects, (item, proj) => {
            setElemValue(item, '.proj_title', proj.title || proj.proj_title);
            setElemValue(item, '.proj_link', proj.link || proj.proj_link);
            setElemValue(item, '.proj_description', proj.description || proj.proj_description);
        });

        // Populate skills
        populateRepeater('group-e', savedData.skills, (item, skill) => {
            const val = typeof skill === 'string' ? skill : (skill.skill || '');
            setElemValue(item, '.skill', val);
        });

        // Populate achievements
        populateRepeater('group-a', savedData.achievements, (item, ach) => {
            setElemValue(item, '.achieve_title', ach.achieve_title || ach.title);
            setElemValue(item, '.achieve_description', ach.achieve_description || ach.description);
        });

        // Populate experiences
        populateRepeater('group-b', savedData.experiences, (item, exp) => {
            setElemValue(item, '.exp_title', exp.exp_title || exp.title);
            setElemValue(item, '.exp_organization', exp.exp_organization || exp.organization);
            setElemValue(item, '.exp_location', exp.exp_location || exp.location);
            setElemValue(item, '.exp_start_date', exp.exp_start_date || exp.startDate);
            setElemValue(item, '.exp_end_date', exp.exp_end_date || exp.endDate);
            setElemValue(item, '.exp_description', exp.exp_description || exp.description);
        });

    } catch (error) {
        console.error('Error loading saved data into form:', error);
    }
}

// Function to handle form preview
function updatePreview() {
    const imageInput = document.getElementById('image');
    if (imageInput && imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            localStorage.setItem('resumeImage', imageData);
        }
        reader.readAsDataURL(imageInput.files[0]);
    }

    const formData = {
        firstname: getInputValue('firstname'),
        middlename: getInputValue('middlename'),
        lastname: getInputValue('lastname'),
        designation: getInputValue('designation'),
        address: getInputValue('address'),
        email: getInputValue('email'),
        phoneno: getInputValue('phoneno'),
        summary: getInputValue('summary'),
        education: Array.from(document.querySelectorAll('[data-repeater-list="group-c"] [data-repeater-item]')).map(item => ({
            school: item.querySelector('.edu_school')?.value || '',
            degree: item.querySelector('.edu_degree')?.value || '',
            city: item.querySelector('.edu_city')?.value || '',
            startDate: item.querySelector('.edu_start_date')?.value || '',
            endDate: item.querySelector('.edu_graduation_date')?.value || '',
            description: item.querySelector('.edu_description')?.value || ''
        })),
        projects: Array.from(document.querySelectorAll('[data-repeater-list="group-d"] [data-repeater-item]')).map(item => ({
            title: item.querySelector('.proj_title')?.value || '',
            link: item.querySelector('.proj_link')?.value || '',
            description: item.querySelector('.proj_description')?.value || ''
        })),
        skills: Array.from(document.querySelectorAll('[data-repeater-list="group-e"] [data-repeater-item]')).map(item => 
            item.querySelector('.skill')?.value || ''
        )
    };

    localStorage.setItem('formData', JSON.stringify(formData));
}

// Function to open resume preview
function openResumePreview() {
    try {
        updatePreview();
        const formData = JSON.parse(localStorage.getItem('formData'));
        localStorage.setItem('resumeData', JSON.stringify(formData));
        window.location.href = 'generated.html';
    } catch (error) {
        console.error('Error generating resume:', error);
        alert('There was an error generating your resume. Please make sure all fields are filled correctly.');
    }
}

// Function to clear form data
function clearResumeForm() {
    if (confirm('Are you sure you want to clear all form fields and start fresh?')) {
        localStorage.removeItem('resumeData');
        localStorage.removeItem('formData');
        localStorage.removeItem('resumeImage');
        window.location.reload();
    }
}

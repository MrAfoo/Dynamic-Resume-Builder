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
    const formInputs = document.querySelectorAll('.form-control');  // Changed to .form-control
    formInputs.forEach(input => {
        input.addEventListener('input', debounce(updatePreview, 500));
    });
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

// Function to handle form preview
function updatePreview() {
    const imageInput = document.getElementById('image');
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            localStorage.setItem('resumeImage', imageData);
        }
        reader.readAsDataURL(imageInput.files[0]);
    }
    // Store form data
    const formData = {
        firstname: getInputValue('firstname'),
        middlename: getInputValue('middlename'),
        lastname: getInputValue('lastname'),
        designation: getInputValue('designation'),
        address: getInputValue('address'),
        email: getInputValue('email'),
        phoneno: getInputValue('phoneno'),
        summary: getInputValue('summary'),
        // Add education data
        education: Array.from(document.querySelectorAll('[data-repeater-list="group-c"] [data-repeater-item]')).map(item => ({
            school: item.querySelector('.edu_school')?.value || '',
            degree: item.querySelector('.edu_degree')?.value || '',
            city: item.querySelector('.edu_city')?.value || '',
            startDate: item.querySelector('.edu_start_date')?.value || '',
            endDate: item.querySelector('.edu_graduation_date')?.value || '',
            description: item.querySelector('.edu_description')?.value || ''
        })),
        // Add projects data
        projects: Array.from(document.querySelectorAll('[data-repeater-list="group-d"] [data-repeater-item]')).map(item => ({
            title: item.querySelector('.proj_title')?.value || '',
            link: item.querySelector('.proj_link')?.value || '',
            description: item.querySelector('.proj_description')?.value || ''
        })),
        // Add skills data
        skills: Array.from(document.querySelectorAll('[data-repeater-list="group-e"] [data-repeater-item]')).map(item => 
            item.querySelector('.skill')?.value || ''
        )
    };
    
    // Store in localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Function to open resume preview
function openResumePreview() {
    try {
        // Update the form data one last time before preview
        updatePreview();
        
        // Get stored form data
        const formData = JSON.parse(localStorage.getItem('formData'));
        
        // Store final data for preview page
        localStorage.setItem('resumeData', JSON.stringify(formData));
        
        // Open preview in new window
        window.open('generated.html', '_blank');
    } catch (error) {
        console.error('Error generating resume:', error);
        alert('There was an error generating your resume. Please make sure all fields are filled correctly.');
    }
}

const currentDate = new Date();

const dayElement = document.getElementById('day');
const monthElement = document.getElementById('month');
const yearElement = document.getElementById('year');
const outputDays = document.getElementById('output-days-value');
const outputMonths = document.getElementById('output-months-value');
const outputYears = document.getElementById('output-years-value');
const dayErrorMessage = document.getElementById('day-error-message');
const monthErrorMessage = document.getElementById('month-error-message');
const yearErrorMessage = document.getElementById('year-error-message');
const dayLabel = document.getElementById('day-label');
const monthLabel = document.getElementById('month-label');
const yearLabel = document.getElementById('year-label');
let inputDay;
let inputMonth;
let inputYear;
let inputDate;
let allComponentsValid;

validateAllComponents = () => {
    if (inputDay == "") {
        dayElement.classList.add('invalid-input');
        dayLabel.classList.add('invalid-label');
        dayErrorMessage.innerHTML = 'This field is required';
    } else if (inputDay < 1 || inputDay > 31) {
        dayElement.classList.add('invalid-input')
        dayLabel.classList.add('invalid-label');
        dayErrorMessage.innerHTML = 'Must be a valid day'
    } else {
        dayElement.classList.remove('invalid-input')
        dayLabel.classList.remove('invalid-label');
        dayErrorMessage.innerHTML = ''
    };

    if (inputMonth == "") {
        monthElement.classList.add('invalid-input');
        monthLabel.classList.add('invalid-label');
        monthErrorMessage.innerHTML = 'This field is required';
    } else if (inputMonth < 1 || inputMonth > 12) {
        monthElement.classList.add('invalid-input')
        monthLabel.classList.add('invalid-label');
        monthErrorMessage.innerHTML = 'Must be a valid month'
    } else {
        monthElement.classList.remove('invalid-input')
        monthLabel.classList.remove('invalid-label');
        monthErrorMessage.innerHTML = ''
    };

    if (inputYear == "") {
        yearElement.classList.add('invalid-input');
        yearLabel.classList.add('invalid-label');
        yearErrorMessage.innerHTML = 'This field is required';
    } else if (inputYear < 100) {
        yearElement.classList.add('invalid-input')
        yearLabel.classList.add('invalid-label');
        yearErrorMessage.innerHTML = 'Must be greater than 99'
    } else {
        yearElement.classList.remove('invalid-input')
        yearLabel.classList.remove('invalid-label');
        yearErrorMessage.innerHTML = ''
    };

    const dateArray = [dayElement, monthElement, yearElement]

    allComponentsValid = dateArray.every((component) => !component.classList.contains('invalid-input'));
}

validDate = () => {
    if (allComponentsValid) {
        if (!isNaN(inputDate)) {
            dayElement.classList.remove('invalid-input')
            dayLabel.classList.remove('invalid-label');
            monthElement.classList.remove('invalid-input')
            monthLabel.classList.remove('invalid-label');
            yearElement.classList.remove('invalid-input')
            yearLabel.classList.remove('invalid-label');
            dayErrorMessage.innerHTML = ''
            return true 
        } else {
            dayElement.classList.add('invalid-input')
            dayLabel.classList.add('invalid-label');
            monthElement.classList.add('invalid-input')
            monthLabel.classList.add('invalid-label');
            yearElement.classList.add('invalid-input')
            yearLabel.classList.add('invalid-label');
            dayErrorMessage.innerHTML = 'Must be a valid date'
            return false
        }
    } else {
        return false
    }
}

calculate = () => {
    inputDay = dayElement.value;
    inputMonth = monthElement.value;
    inputYear = yearElement.value;
    inputDate = new Date(`${inputYear}-${inputMonth}-${inputDay}`)

    validateAllComponents();

    if (validDate()) {

        const timeDiff = currentDate - inputDate;
        const timeDiffDays = (timeDiff / (1000*60*60*24));
    
        // how many days are leftover when we subtract as many months (30.4375 days) as possible from the timeDiff (converted to days)
    
        //we multiply numerator and denominator by 10000 to make modulo operator work
        const elapsedDays = Math.floor(((timeDiffDays*10000) % 304375)/10000)
        // how many months are leftover when we subtract as many years (12 months) as possible from the timeDiff (converted to months)
        const elapsedMonths = Math.floor(timeDiffDays/30.437) % 12
        // how many whole years do we have in timeDiff (converted to years)
        const elapsedYears = Math.floor(timeDiffDays/365.25)
    
        outputDays.innerHTML = elapsedDays
        outputMonths.innerHTML = elapsedMonths
        outputYears.innerHTML = elapsedYears
    }
}


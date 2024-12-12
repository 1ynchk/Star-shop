export const checkPassword = (password_1, password_2) => {
    const container = document.getElementById('container_password')
    const password_1_field = document.getElementById('settings__password_1')
    const password_2_field = document.getElementById('settings__password_2')
    const warning_password_incorrect = document.getElementById('warning_incorrect_password')
    const warning_password_length = document.getElementById('warning_length_password')

    if (password_1_field.value == password_1 && password_2_field.value == password_2) {
        warning_password_incorrect.classList.remove('active_warning')
        container.classList.remove('active_warning')
        password_1_field.classList.remove('warning')
        password_2_field.classList.remove('warning')
        warning_password_length.classList.remove('active_warning')

        return false
    } else {
        if (password_1_field.value.length < 10 || password_2_field.value.length < 10) {
            warning_password_incorrect.classList.remove('active_warning')
            password_1_field.classList.add('warning')
            container.classList.add('active_warning')
            password_2_field.classList.add('warning')
            warning_password_length.classList.add('active_warning')
            return false
        } else {
            container.classList.remove('active_warning')
            password_1_field.classList.remove('warning')
            password_2_field.classList.remove('warning')
            warning_password_length.classList.remove('active_warning')
        }
    
        if (password_1_field.value != password_2_field.value) {
            warning_password_incorrect.classList.add('active_warning')
            password_1_field.classList.add('warning')
            container.classList.add('active_warning')
            password_2_field.classList.add('warning')
            return false
        } else {
            warning_password_incorrect.classList.remove('active_warning')
            password_1_field.classList.remove('warning')
            container.classList.remove('active_warning')
            password_2_field.classList.remove('warning')
            return true
        }
    }
}

export const checkName = (name_t) => {
    const name = document.getElementById('settings__name')
    const container = document.getElementById('container_name')
    const warning_empty_name = document.getElementById('warning_empty_name')
    const warning_length_name = document.getElementById('warning_length_name')

    if (String(name_t) == name.value) {
        warning_length_name.classList.remove('active_warning')
        name.classList.remove('warning')
        container.classList.remove('active_warning')
        warning_empty_name.classList.remove('active_warning')
        return false
    } else {
        if (name.value.length === 0) {
            warning_length_name.classList.remove('active_warning')
            container.classList.add('active_warning')
            name.classList.add('warning')
            warning_empty_name.classList.add('active_warning')
            return false
        } else {
            name.classList.remove('warning')
            container.classList.remove('active_warning')
            warning_empty_name.classList.remove('active_warning')
        }
        
        if (name.value.length < 2) {
            container.classList.add('active_warning')
            name.classList.add('warning')
            warning_length_name.classList.add('active_warning')
            return false
        } else {
            container.classList.remove('active_warning')
            warning_length_name.classList.remove('active_warning')
            name.classList.remove('warning')
            return true
        }
    }
}

export const checkSurname = (surname_t) => {
    const surname = document.getElementById('settings__surname')
    const container = document.getElementById('container_surname')
    const warning_empty_surname = document.getElementById('warning_empty_surname')
    const warning_length_name = document.getElementById('warning_length_surname')

    if (String(surname_t) == surname.value) {
        warning_length_name.classList.remove('active_warning')
        container.classList.remove('active_warning')
        surname.classList.remove('warning')
        warning_empty_surname.classList.remove('active_warning')
        return false
    } else {
        if (surname.value.length === 0) {
            warning_length_name.classList.remove('active_warning')
            container.classList.add('active_warning')
            surname.classList.add('warning')
            warning_empty_surname.classList.add('active_warning')
            return false
        } else {
            surname.classList.remove('warning')
            container.classList.remove('active_warning')
            warning_empty_surname.classList.remove('active_warning')
        }
    
        if (surname.value.length < 2) {
            surname.classList.add('warning')
            container.classList.add('active_warning')
            warning_length_name.classList.add('active_warning')
            return false
        } else {
            surname.classList.remove('warning')
            container.classList.remove('active_warning')
            warning_length_name.classList.remove('active_warning')
            return true
        }
    }
}

export const correlateEmail = (email_t) => {
    const email = document.getElementById('settings__email')
    const warning_emty_email = document.getElementById('warning_empty_email')
    const warning_incorrect_email = document.getElementById('warning_incorrect_email')

    if (email_t == email.value) {
        email.classList.remove('warning')
        warning_incorrect_email.classList.remove('active_warning')
        warning_emty_email.classList.remove('active_warning')
        return false
    } else {
        if (email.value.length === 0) {
            warning_emty_email.classList.add('active_warning')
            warning_incorrect_email.classList.remove('active_warning')
            email.classList.add('warning')
            return false
        } else {
            warning_emty_email.classList.remove('active_warning')
            email.classList.remove('warning')
        }
        
        if ((email.value.split('@').length - 1 === 1) 
            && (email.value.indexOf('.') - (email.value.indexOf('@') + 3) > 0)) {
                warning_incorrect_email.classList.remove('active_warning')
                email.classList.remove('warning')
                return true
        } else {
            warning_incorrect_email.classList.add('active_warning')
            email.classList.add('warning')
            return false
        }
    }
}
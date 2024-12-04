export const checkPassword = () => {
    const password_1_field = document.getElementById('settings__password_1')
    const password_2_field = document.getElementById('settings__password_2')

    if (password_1_field.value != password_2_field.value) {
        password_1_field.classList.add('warning')
        password_2_field.classList.add('warning')
        return false
    } else {
        password_1_field.classList.remove('warning')
        password_2_field.classList.remove('warning')
        return true
    }
}


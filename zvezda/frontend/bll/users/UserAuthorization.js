
class User {
    
    static correlateUsersPassword() {
        const pswr1 = document.getElementById('password_1')
        const pswr2 = document.getElementById('password_2')

        if (pswr1.value === pswr2.value) {
            return true
        } else {
            pswr1.classList.add('wrong')
            pswr2.classList.add('wrong')
            setTimeout(() => {
                pswr1.classList.remove('wrong')
                pswr2.classList.remove('wrong')
            }, 2000)
        }
    }

    static correlateEmail() {
        const email = document.getElementById('email_signup');
        
        if ((email.value.split('@').length - 1 === 1) 
            && (email.value.indexOf('.') - (email.value.indexOf('@') + 3) > 0)) {
            return true
        } else {
            email.classList.add('wrong')
            setTimeout(() => {
                email.classList.remove('wrong')
            }, 2000)
        }
    }
}

export default User;
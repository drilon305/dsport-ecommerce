

export default function validate(values) {


    const validators = {
        email: val => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
        phone: val => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val),
        name: val => val.length > 3,
        message: val => val.length > 3,
        password: val => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
    }

    const valid = {}

    Object.keys(values).map(field => {
        valid[field] = validators[field](values[field])
    })

    return valid

}
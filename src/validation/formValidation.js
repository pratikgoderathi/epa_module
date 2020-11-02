export const emailValidation = (value) => {
	const companyemail = /^\w+([.-]?\w+)*@rathi\.\w+$/;
	const emailregex = /^[a-z0-9._%+-]+@[a-z0-9-]{2,}\.[a-z]{2,}(\.[a-z]{2,}|$)$/;
	if (value === '') {
		return 'Enter your email';
	} else if (
		companyemail.test(value.toLocaleLowerCase()) ||
		!emailregex.test(value.toLocaleLowerCase())
	) {
		return 'Enter correct Email ID';
	} else {
		return '';
	}
};

export const passwordValidation = (value) => {
	const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
	if (value === '') {
		return 'Enter password';
	} else if (!passRegex.test(value)) {
		return 'Enter valid password';
	} else {
		return '';
	}
};

export const confirmPasswordValidation = (value, password) => {
	if (value === '') {
		return 'Enter password';
	} else if (value !== password) {
		return 'Password need to be same';
	} else {
		return '';
	}
};

export const userIdValidation = (value) => {
	const userIdRegex = /^(\d).{5,6}$/;

	if (value === '') {
		return 'Enter employee id';
	} else if (!userIdRegex.test(value)) {
		return 'Enter valid employee id';
	} else {
		return '';
	}
};

// export const validateMobile = value => {
//   if (value === "") {
//     return {
//       isValid: false,
//       errorMessage: "Enter your mobile number"
//     };
//   } else if (value.length !== 10) {
//     return {
//       isValid: false,
//       errorMessage: "Mobile number should be of 10 digits"
//     };
//   } else
//     return {
//       isValid: true,
//       errorMessage: ""
//     };
// };

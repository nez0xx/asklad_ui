import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { register } from '../../api/register';
import { Link } from 'react-router-dom';
import Input from '../../../../UI/Input/Input';
import Button from '../../../../UI/Button/Button';

import cls from './RegisterForm.module.css';

const RegisterForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const { mutate } = useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			console.log(data);
		},
	});

	function handleRegister(e) {
		e.preventDefault();
		mutate({ email, password, name: username });
	}

	return (
		<form className={cls.form} onSubmit={handleRegister}>
			<h2>Register a new account!</h2>
			<Input
				id='email'
				label='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				id='name'
				label='Name'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Input
				id='Password'
				label='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button>Register</Button>
			<Link to={'/'}>Already have an account? Sign in</Link>
		</form>
	);
};

export default RegisterForm;

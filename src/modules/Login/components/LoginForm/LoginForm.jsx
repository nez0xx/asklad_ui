import { useState } from 'react';
import Button from '../../../../UI/Button/Button';
import Input from '../../../../UI/Input/Input';

import cls from './LoginForm.module.css';
import { useMutation } from 'react-query';
import { login } from '../../api/login';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: login,
		onSuccess: (result) => {
			localStorage.setItem('token', result.data.access_token);
			navigate('/profile/orders');
		},
	});

	function handleLogin(e) {
		e.preventDefault();
		mutate({ email, password });
	}

	return (
		<form className={cls.form} onSubmit={handleLogin}>
			<h2>Login to your account!</h2>
			<Input
				id='email'
				label='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				id='Password'
				label='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button>Login</Button>
			<Link to={'/register'}>Don't have an account? Register</Link>
		</form>
	);
};

export default LoginForm;

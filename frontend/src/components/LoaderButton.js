import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './LoaderButton.css';

export default ({ isLoading, text, loadingText, className = '', disabled = false, ...props }) => (
	<Button variant="secondary" className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
		{isLoading && <Spinner animation="grow" variant="light" />}
		{!isLoading ? text : loadingText}
	</Button>
);

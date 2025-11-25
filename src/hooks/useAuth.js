//Filename: useAuth.js

import { useState, useEffect } from 'react';
import { isAuthenticated } from '../services/AuthService';

export default function useAuth()
{
	const [authorized, setAuthorized] = useState(null);
	
	useEffect(() => {
		let mounted = true;
		
		(async () => {
			const result = await isAuthenticated();
			if (mounted)
			{
				setAuthorized(result);
			}
        })();
	
		return () => {
			mounted = false;
		};
	}, []);
	
	return authorized;
}

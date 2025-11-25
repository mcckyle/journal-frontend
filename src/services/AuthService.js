//Filename: src/services/AuthService.js

//Check Token Validity.
export async function isAuthenticated()
{
  const token = localStorage.getItem('token');
  
  if (!token)
  {
	  return false;
  }
  
  try {
	  const response = await fetch('http://localhost:8080/api/auth/validate', {
		  headers: { Authorization: `Bearer ${token}` },
	  });
	  
	  if (!response.ok)
	  {
		  return false;
	  }
	  
	  const data = await response.json();
	  return data.valid === true;
  }
  catch (error)
  {
	  console.error('Token validation failed: ', error);
	  return false;
  }
}
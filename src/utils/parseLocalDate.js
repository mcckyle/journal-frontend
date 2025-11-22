//Filename: /src/utils/parseLocalDate.js

export function parseLocalDate(dateString) {
	if ( !dateString)
	{
		return "";
	}
	
	const [y, m, d] = dateString.split("-").map(Number);
	return new Date(y, m - 1, d).toLocaleDateString(); //Local date with no timezone shift.
}
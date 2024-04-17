const addUserAddress = (username, newAddress) => {
   fetch('/addAddress', {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ username, newAddress })
   })
   .then(response => {
     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }
     return response.json();
   })
   .then(data => console.log(data))
   .catch(error => console.error('Error:', error));
 }
 
import { clientCredentials } from '../client';

const getAllMenuItems = () => fetch(`${clientCredentials.databaseURL}/items`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch menu items. Status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Error fetching menu items:', error);
    throw error; // Re-throw the error to propagate it further if needed
  });

export default getAllMenuItems;

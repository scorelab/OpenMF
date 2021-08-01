/*
* Some utililty function that would be used
* in all the action generators.
*/

// Utility function to generate config header
export const createConfig = (token) => {

    // Create object
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // Return object
    return config
  }
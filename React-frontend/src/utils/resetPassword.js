import axios from '../axios';

export const sendResetPasswordMail = async email => {
  try {
    await axios.post(
      '/forgot-password',
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    throw Error(error.response.data);
  }
};

export const changePassword = async (token, password) => {
  try {
    await axios.post(
      `/reset-password/${token}`,
      { password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    throw Error(error.response.data);
  }
};

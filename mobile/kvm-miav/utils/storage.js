import { AsyncStorage } from 'react-native'

export const setUser = async (token, user) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null){
      return token
    } else {
      return '';
    }
  } catch (error) {
    console.log(error);
    return '';
  }
}

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user !== null){
      return JSON.parse(user);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

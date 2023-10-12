import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'update_user_info':
      return { ...state, userInfo: action.payload };
    case 'update_login_state':
      return { ...state, isSignedIn: action.payload };
    case 'update_login_info':
      return { ...state, userInfo: action.payload };
    case 'update_Loading_state':
      return { ...state, isLoading: action.payload };
    case 'update_signup_state':
      return { ...state, isSignedUp: action.payload };
    default:
      return state;
  }
};




const localSignIn = (dispatch) => async () => {
  dispatch({ type: 'update_login_state', payload: false });
  dispatch({ type: 'update_Loading_state', payload: false });
};

const handleSignOut = (dispatch) => async () => {
  dispatch({ type: 'update_login_state', payload: false });
  dispatch({ type: 'update_Loading_state', payload: false });
  await AsyncStorage.removeItem('user_info');
};

const updateLoginStatus = (dispatch) => async ({ email, id }) => {
  try {

    const userInfo = { email, id };

    // After successful signup, you can store the user info in AsyncStorage

    await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));
    dispatch({ type: 'update_signup_state', payload: true });
    dispatch({ type: 'update_login_state', payload: true });
    dispatch({ type: 'update_user_info', payload: userInfo })

  } catch (error) {
    throw error;
  }
};


const handleSignUp = (dispatch) => async ({ email, id }) => {
  try {

    const userInfo = { email, id };
    // After successful signup, you can store the user info in AsyncStorage
    await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));
    // Dispatch the update_signup_state action to indicate that signup is successful
    dispatch({ type: 'update_signup_state', payload: true });

    // You might want to dispatch update_login_state action as well to set the user as signed in
    dispatch({ type: 'update_login_state', payload: true });

  }
  catch (error) {
    throw error;
  }
};



export const { Provider, Context } = createDataContext(
  authReducer,
  {
    updateLoginStatus,
    localSignIn,
    handleSignOut,
    handleSignUp,
  },
  { isSignedIn: false, isSignedUp: false, isLoading: true, userInfo: {} },
);
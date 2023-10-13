// AuthContext.js
import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define your initial state with authentication-related properties
const initialState = {
  isSignedIn: false,
  isSignedUp: false,
  isLoading: true,
  userInfo: {},
};

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

const autoLogin = (dispatch) => async () => {
  try {
    const storedUserInfo = await AsyncStorage.getItem('user_info');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      dispatch({ type: 'update_login_state', payload: true });
      dispatch({ type: 'update_user_info', payload: userInfo });
    } else {
      dispatch({ type: 'update_login_state', payload: false });
    }
    dispatch({ type: 'update_Loading_state', payload: false });
  } catch (error) {
    console.error('Auto login error:', error);
  }
};

const updateLoginStatus = (dispatch) => async ({ email, id }) => {
  try {
    const userInfo = { email, id };

    // After successful signup, you can store the user info in AsyncStorage

    await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));
    dispatch({ type: 'update_signup_state', payload: true });
    dispatch({ type: 'update_login_state', payload: true });
    dispatch({ type: 'update_user_info', payload: userInfo });

  } catch (error) {
    throw error;
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

const handleSignUp = (dispatch) => async ({ email, id }) => {
  try {
    const userInfo = { email, id };
    // After successful signup, you can store the user info in AsyncStorage
    await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));
    // Dispatch the update_signup_state action to indicate that signup is successful
    dispatch({ type: 'update_signup_state', payload: true });
    dispatch({ type: 'update_login_state', payload: true });
  } catch (error) {
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
    autoLogin,
  },
  initialState // Provide the initial state
);

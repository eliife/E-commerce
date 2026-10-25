
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/services/api';
import { resetCart, fetchCart } from '@/store/cartSlice';


const getLocalUser = () => {
  if (typeof window === 'undefined') return null;

  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const getLocalToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

// Giriş işlemi
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await API.post('/auth/login', userData);
      const { token, user } = response.data;

      if (!token || !user) {
        return thunkAPI.rejectWithValue(
          'Sunucudan kullanıcı bilgileri veya token alınamadı.'
        );
      }

      // Önce yeni hesabın oturum bilgilerini kaydet.
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Önceki hesaptan kalan sepet verisini Redux'tan temizle.
      thunkAPI.dispatch(resetCart());

      // Yeni hesabın sepetini sunucudan yükle.
      // API interceptor'ı artık yeni token'ı kullanabilir.
      thunkAPI.dispatch(fetchCart());

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Giriş yapılamadı.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: getLocalUser(),
    token: getLocalToken(),
    isLoading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Giriş yapılamadı.';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

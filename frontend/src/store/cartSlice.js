
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/services/api';

const normalizeItems = (cart) => {
  const items = cart?.items || [];

  return items
    .filter((item) => item?.product && typeof item.product === 'object')
    .map((item) => ({
      ...item.product,
      id: String(item.product.id || item.product._id),
      quantity: Number(item.quantity) || 1,
    }));
};

const getCartData = (data) => ({
  items: data?.items || data?.cart?.items || [],
});

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const tokenAtStart = localStorage.getItem('token');
      const response = await API.get('/cart');

      if (localStorage.getItem('token') !== tokenAtStart) {
        return rejectWithValue({ stale: true });
      }

      return {
        ...getCartData(response.data),
        token: tokenAtStart,
      };
    } catch (error) {
      return rejectWithValue({
        message: getErrorMessage(error, 'Sepet yüklenemedi.'),
      });
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product, { rejectWithValue }) => {
    try {
      const tokenAtStart = localStorage.getItem('token');
      const productId = String(
        product?.productId || product?.id || product?._id || ''
      );

      if (!productId || productId === 'undefined') {
        return rejectWithValue('Ürün kimliği bulunamadı.');
      }

      await API.post('/cart/add', { productId, quantity: 1 });

      if (localStorage.getItem('token') !== tokenAtStart) {
        return rejectWithValue({ stale: true });
      }

      const response = await API.get('/cart');

      if (localStorage.getItem('token') !== tokenAtStart) {
        return rejectWithValue({ stale: true });
      }

      return {
        ...getCartData(response.data),
        token: tokenAtStart,
      };
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Ürün sepete eklenemedi.')
      );
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async (productId, { rejectWithValue }) => {
    try {
      const tokenAtStart = localStorage.getItem('token');
      const response = await API.get('/cart');
      const items = response.data.cart?.items || response.data.items || [];

      if (localStorage.getItem('token') !== tokenAtStart) {
        return rejectWithValue({ stale: true });
      }

      const item = items.find((entry) => {
        const id =
          typeof entry.product === 'object'
            ? entry.product.id || entry.product._id
            : entry.product;

        return String(id) === String(productId);
      });

      if (!item) {
        return rejectWithValue('Ürün sepette bulunamadı.');
      }

      if (item.quantity <= 1) {
        await API.delete(`/cart/item/${productId}`);
      } else {
        await API.patch(`/cart/item/${productId}`, {
          quantity: item.quantity - 1,
        });
      }

      if (localStorage.getItem('token') !== tokenAtStart) {
        return rejectWithValue({ stale: true });
      }

      const updated = await API.get('/cart');

      if (localStorage.getItem('token') !== tokenAtStart) {
        return rejectWithValue({ stale: true });
      }

      return {
        ...getCartData(updated.data),
        token: tokenAtStart,
      };
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Ürün adedi azaltılamadı.')
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const tokenAtStart = localStorage.getItem('token');

      await API.delete(`/cart/item/${productId}`);

      if (localStorage.getItem('token') !== tokenAtStart) {
        return rejectWithValue({ stale: true });
      }

      const response = await API.get('/cart');

      if (localStorage.getItem('token') !== tokenAtStart) {
        return rejectWithValue({ stale: true });
      }

      return {
        ...getCartData(response.data),
        token: tokenAtStart,
      };
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Ürün sepetten kaldırılamadı.')
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const tokenAtStart = localStorage.getItem('token');

      await API.delete('/cart');

      if (localStorage.getItem('token') !== tokenAtStart) {
        return rejectWithValue({ stale: true });
      }

      return { items: [], token: tokenAtStart };
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Sepet temizlenemedi.')
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  hasLoaded: false,
  error: null,
  fetchRequestId: null,
  sessionToken: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = [];
      state.loading = false;
      state.hasLoaded = false;
      state.error = null;
      state.fetchRequestId = null;
      state.sessionToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.fetchRequestId = action.meta.requestId;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (state.fetchRequestId !== action.meta.requestId) return;
        if (action.payload.token !== localStorage.getItem('token')) return;

        state.loading = false;
        state.hasLoaded = true;
        state.items = normalizeItems(action.payload);
        state.sessionToken = action.payload.token;
        state.error = null;
        state.fetchRequestId = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        if (state.fetchRequestId !== action.meta.requestId) return;

        state.loading = false;
        state.fetchRequestId = null;

        if (action.payload?.stale) return;

        state.hasLoaded = true;
        state.error =
          action.payload?.message ||
          action.payload ||
          'Sepet yüklenemedi.';
      })

      .addCase(addToCart.pending, (state) => {
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload.token !== localStorage.getItem('token')) return;

        state.items = normalizeItems(action.payload);
        state.sessionToken = action.payload.token;
        state.hasLoaded = true;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        if (action.payload?.stale) return;
        state.error =
          action.payload?.message ||
          action.payload ||
          'Ürün sepete eklenemedi.';
      })

      .addCase(decreaseQuantity.pending, (state) => {
        state.error = null;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        if (action.payload.token !== localStorage.getItem('token')) return;

        state.items = normalizeItems(action.payload);
        state.sessionToken = action.payload.token;
        state.hasLoaded = true;
        state.error = null;
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        if (action.payload?.stale) return;
        state.error =
          action.payload?.message ||
          action.payload ||
          'Ürün adedi azaltılamadı.';
      })

      .addCase(removeFromCart.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (action.payload.token !== localStorage.getItem('token')) return;

        state.items = normalizeItems(action.payload);
        state.sessionToken = action.payload.token;
        state.hasLoaded = true;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        if (action.payload?.stale) return;
        state.error =
          action.payload?.message ||
          action.payload ||
          'Ürün kaldırılamadı.';
      })

      .addCase(clearCart.pending, (state) => {
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        if (action.payload.token !== localStorage.getItem('token')) return;

        state.items = [];
        state.sessionToken = action.payload.token;
        state.hasLoaded = true;
        state.error = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        if (action.payload?.stale) return;
        state.error =
          action.payload?.message ||
          action.payload ||
          'Sepet temizlenemedi.';
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;

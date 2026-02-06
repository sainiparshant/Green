import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const getCart = createAsyncThunk(
  "/cart/getCart",
  async () => {
    const res = await API.get("/cart/all-item");
    return res.data.data.items;
  }
);

export const updateQuantity = createAsyncThunk(
  "/cart/updateQty",
  async ({ productId, quantity, variantId }) => {
    await API.post("/cart/update-qty", {
      quantity,
      productId,
      variantId
    });

    return { variantId, quantity };
  }
);

export const removeItem = createAsyncThunk(
  "/cart/removeItem",
  async ({ variantId }) => {
    await API.delete("/cart/remove-item", {
      data: { variantId }
    });
    return variantId;
  }
);

export const addItem = createAsyncThunk(
  "/cart/addItem",
  async ({ productId, quantity, variantId }) => {
    const res = await API.post("/cart/add", {
      productId,
      variantId,
      quantity
    });
    return res.data.data;
  }
);

export const priceSummary = createAsyncThunk(
  "/cart/priceSummary",
  async () => {
    const res = await API.get("/cart/price-summary");
    return res.data.data;
  }
);

const initialState = {
  items: [],
  cartloading: false,
  summaryLoading: false,
  error: null,
  summary: {
    subtotal: 0,
    tax: 0,
    shipping: 0,
    totalAmount: 0
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      
      .addCase(getCart.pending, (state) => {
        state.cartloading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartloading = false;
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.cartloading = false;
        state.error = action.error.message;
      })

      
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { variantId, quantity } = action.payload;

        const item = state.items.find(
          (i) => i.variantId._id === variantId
        );

        if (item) {
          item.quantity = quantity;
        }
      })

      
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.variantId._id !== action.payload
        );
      })

      
      .addCase(addItem.fulfilled, (state, action) => {
        const existingItem = state.items.find(
          (item) => item.variantId._id === action.payload.variantId._id
        );

        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })

      
      .addCase(priceSummary.pending, (state) => {
        state.summaryLoading = true;
      })
      .addCase(priceSummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summary = action.payload;
      })
      .addCase(priceSummary.rejected, (state, action) => {
        state.summaryLoading = false;
        state.error = action.error.message;
      });
  }
});

export default cartSlice.reducer;

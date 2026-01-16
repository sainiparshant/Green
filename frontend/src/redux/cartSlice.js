import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";


export const getCart = createAsyncThunk(
    "/cart/getCart",
    async()=>{
        const res = await API.get("/cart/all-item");
        return res.data.data.items;
    }
);

export const updateQuantity = createAsyncThunk(
    "/cart/updateQty",
    async({productId, quantity})=>{
        const res = await API.post("/cart/update-qty",{
            quantity,
            productId
        });
        return {
            productId,
            quantity,
        };
    }
);

export const removeItem = createAsyncThunk(
    "/cart/removeItem",
    async({productId}) =>{
        await API.delete("/cart/remove-item", {
            data: { productId }
        });
        return productId;
    }
)

export const addItem = createAsyncThunk(
    "/cart/addItem",
    async({productId, quantity}) => {
        const res = await API.post("/cart/add" , {
            productId,
            quantity
        });

        return res.data;
    }
)

export const selectSubTotal = (state) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
);

const initialState = {
    items:[],
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{},

    extraReducers: (builder)=> {
        builder

        .addCase(getCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCart.fulfilled, (state, action) =>{
            state.loading = false,
            state.items = action.payload
        })
        .addCase(getCart.rejected, (state, action) =>{
            state.loading = false,
            state.error = action.error.message
        })


        .addCase(updateQuantity.fulfilled, (state,action) => {
            const {productId, quantity} = action.payload;

            const item = state.items.find(
                (i) => i.productId._id === productId
            );

            if(item){
                item.quantity = quantity;
            }
        })

        .addCase(removeItem.fulfilled, (state,action) => {
            state.items = state.items.filter(
                (item) => item.productId._id !== action.payload
            );
        })

        .addCase(addItem.fulfilled, (state,action) =>{
            state.items.push(action.payload);
        });
    },
});


export default cartSlice.reducer;
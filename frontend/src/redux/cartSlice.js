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

export const priceSummary = createAsyncThunk(
    "/cart/priceSummary",
    async() => {
        const res = await API.get("/cart/price-summary");

        return res.data.data;
    }
);

const initialState = {
    items:[],
    cartloading: false,
    summaryLoading: false,
    error: null,
    summary:{
        subtotal: 0,
        tax: 0,
        shipping: 0,
        totalAmount : 0
    }
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{},

    extraReducers: (builder)=> {
        builder

        .addCase(getCart.pending, (state) => {
            state.cartloading = true;
        })
        .addCase(getCart.fulfilled, (state, action) =>{
            state.cartloading = false,
            state.items = action.payload
        })
        .addCase(getCart.rejected, (state, action) =>{
            state.cartloading = false,
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
        })
        
        .addCase(priceSummary.pending, (state) =>{
            state.summaryLoading = true;
        })
        .addCase(priceSummary.fulfilled, (state,action) =>{
            state.summaryLoading = false,
            state.summary = action.payload
        })
        .addCase(priceSummary.rejected, (state, action) =>{
            state.summaryLoading = false,
            state.error = action.error.message
        });
    },
});


export default cartSlice.reducer;
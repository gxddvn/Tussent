import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "../../axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { deleteCookie, setCookie } from "../../cookies";

export interface ObjTokenInterface {
    config: {},
    data: string,
    headers: {},
    request: {},
    status: number,
    statusText: string
}

export interface ObjDataInterface {
    id: string,
    email: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    workspaceId: string,
    exp: number,
    iat: number
}

export interface ObjDataLogin {
    email: string,
    password: string
}

export interface ObjDataReg {
    email: string,
    name: string, 
    password: string, 
}

export const fetchRegister = createAsyncThunk("/auth/fetchRegister", async (params:ObjDataReg) => {
    const data:ObjTokenInterface = await axios.post("/users/", params);
    setCookie("token", data.data, 7)
    return jwtDecode<JwtPayload>(data.data);
});

export const fetchAuth = createAsyncThunk("/auth/fetchAuth", async (params:ObjDataLogin) => {
    const data:ObjTokenInterface = await axios.post("/users/login", params);
    setCookie("token", data.data, 7)
    return jwtDecode<JwtPayload>(data.data);
});

export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
    const data:ObjTokenInterface = await axios.post("/users/auth");
    setCookie("token", data.data, 7)
    return jwtDecode<JwtPayload>(data.data);
});

export const fetchUpdateUser = createAsyncThunk("/auth/fetchUpdateUser", async (params:ObjDataInterface) => {
    const {exp, iat, ...userWithoutExpIat} = params;
    const data:ObjTokenInterface = await axios.put(`/users/${params.id}`, userWithoutExpIat);
    setCookie("token", data.data, 7)
    return jwtDecode<JwtPayload>(data.data);
});

interface StateInter {
    user: ObjDataInterface | null,
    status: "loading" | "loaded" | "error",
}

const initialState: StateInter = {
    user: null,
    status: "loading",
};

const setLoadingStatus = (state: StateInter) => {
    state.status = "loading";
};

const setLoadedStatus = (state: StateInter, action: any) => {
    state.status = "loaded";
    console.log(action.payload)
    state.user = action.payload;
};

const setErrorStatus = (state: StateInter) => {
    state.status = "error";
    state.user = null;
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            deleteCookie("token")
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchRegister.pending, setLoadingStatus)
        .addCase(fetchRegister.fulfilled, setLoadedStatus)
        .addCase(fetchRegister.rejected, setErrorStatus)
        .addCase(fetchAuth.pending, setLoadingStatus)
        .addCase(fetchAuth.fulfilled, setLoadedStatus)
        .addCase(fetchAuth.rejected, setErrorStatus)
        .addCase(fetchAuthMe.pending, setLoadingStatus)
        .addCase(fetchAuthMe.fulfilled, setLoadedStatus)
        .addCase(fetchAuthMe.rejected, setErrorStatus)
        .addCase(fetchUpdateUser.pending, setLoadingStatus)
        .addCase(fetchUpdateUser.fulfilled, setLoadedStatus)
        .addCase(fetchUpdateUser.rejected, setErrorStatus)
    },
});

export const selectIsAuth = (state: { auth: { user: ObjDataInterface | null; status: string }; }) => Boolean(state.auth.user);
export const selectAuthData = createSelector(
    (state: { auth: { user: ObjDataInterface | null; status: "loading" | "loaded" | "error" }; }) => state.auth,
    (auth) => ({
        IsAuth: Boolean(auth.user),
        user: auth.user,
        status: auth.status
    })
);

// export const selectAuthData = (state: { auth: { user: ObjDataInterface | null; status: string }; }) => ({
//     user : state.auth.user,
//     IsAuth : Boolean(state.auth.user),
//     status : state.auth.status
// })

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
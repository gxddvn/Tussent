import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { selectAuthData } from "./auth";
import { useAppSelector } from "../../components/Hooks";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getCookie, setCookie } from "../../cookies";
import axios from "../../axios";

export interface ObjTokenInterface {
    config: {},
    data: string,
    headers: {},
    request: {},
    status: number,
    statusText: string
}

export interface ObjDataInterface {
    id: number,
    email: string,
    name: string,
    created_at: string,
    update_at: string,
    // workspaceId: string
}

interface objProjectInterface {
    id: number,
    name: string,
    created_at: string,
    update_at: string,
    userId: string,
    workspaceId: string
}

interface StateInter {
    workspaceId: string,
    userWorkspace: objProjectInterface[] | null,
    status: "loading" | "loaded" | "error",
}

interface objParamFetchWorkspace {
    workspaceId: string,
    limit?: number,
}

interface ObjDataProjectCreate {
    name: string,
    user: string,
    workspace: string
}

export const fetchWorkspaceMe = createAsyncThunk("/workspace/fetchWorkspaceMe", async (params:objParamFetchWorkspace) => {
    console.log(params);
    const data:ObjTokenInterface = await axios.get(`/projects/allbyid/${params.workspaceId}?limit=${params.limit}`);
    console.log(data.data)
    return {
        workspaceId: params.workspaceId,
        userWorkspace: data.data,
    };
});

export const fetchCreateProject = createAsyncThunk("/workspace/fetchCreateProject", async (params:ObjDataProjectCreate) => {
    await axios.post("/projects/", params);
    const data:ObjTokenInterface = await axios.get(`/projects/allbyid/${params.workspace}?limit=15`);
    // setCookie("token", data.data, 7)
    return {
        workspaceId: params.workspace,
        userWorkspace: data.data,
    };
});


const initialState: StateInter = {
    workspaceId: "",
    userWorkspace: null,
    status: "loading",
}

const setLoadingStatus = (state: StateInter) => {
    state.status = "loading";
};

const setLoadedStatus = (state: StateInter, action: any) => {
    const {workspaceId, userWorkspace} = action.payload
    state.status = "loaded";
    state.workspaceId = workspaceId;
    state.userWorkspace = userWorkspace;
};

const setErrorStatus = (state: StateInter) => {
    state.status = "error";
    state.workspaceId = '';
    state.userWorkspace = null;
};

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchWorkspaceMe.pending, setLoadingStatus)
        .addCase(fetchWorkspaceMe.fulfilled, setLoadedStatus)
        .addCase(fetchWorkspaceMe.rejected, setErrorStatus)
        .addCase(fetchCreateProject.pending, setLoadingStatus)
        .addCase(fetchCreateProject.fulfilled, setLoadedStatus)
        .addCase(fetchCreateProject.rejected, setErrorStatus)
    },
})

export const selectWorkspaceData = createSelector(
    (state: { workspace: { userWorkspace: objProjectInterface[] | null; }; }) => state.workspace.userWorkspace,
    (userWorkspace) => ({
        userWorkspace,
    })
);

export const workspaceReducer = workspaceSlice.reducer;

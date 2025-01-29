import { createAsyncThunk, createSelector, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { selectAuthData } from "./auth";
import { useAppSelector } from "../../components/Hooks";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getCookie, setCookie } from "../../cookies";
import axios, { AxiosError } from "../../axios";

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
    favorite: boolean,
    created_at: string,
    update_at: string,
    userId: string,
    workspaceId: string
}

interface StateInter {
    workspaceId: string,
    userWorkspace: objProjectInterface[] | null,
    userFavorite: objProjectInterface[] | null,
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

interface ProjectInterface {
    id: string;
    name: string;
    favorite: boolean;
    createdAt: string;
    updatedAt: string;
    user: string;
    workspace: string | undefined;
}

export const fetchWorkspaceMe = createAsyncThunk("/workspace/fetchWorkspaceMe", async (params:objParamFetchWorkspace) => {
    console.log(params);
    const data:ObjTokenInterface = await axios.get(`/projects/allbyid/${params?.workspaceId}?limit=${params.limit}`);
    console.log(data.data)
    const dataFavorite:ObjTokenInterface = await axios.get(`projects/favorite/${params?.workspaceId}`)
    return {
        workspaceId: params.workspaceId,
        userWorkspace: data.data,
        userFavorite: dataFavorite.data,
    };
});

export const fetchCreateProject = createAsyncThunk("/workspace/fetchCreateProject", async (params: ObjDataProjectCreate, { rejectWithValue }) => {
    try {
        const newProject = await axios.post("/projects/", params);
        await axios.post("/project-invites/", { project: newProject.data.id, user: params.user });
        const data: ObjTokenInterface = await axios.get(`/projects/allbyid/${params?.workspace}?limit=15`);
        const dataFavorite: ObjTokenInterface = await axios.get(`projects/favorite/${params?.workspace}`);
        console.log(newProject);
        return {
            workspaceId: params.workspace,
            userWorkspace: data.data,
            userFavorite: dataFavorite.data,
        };
    } catch (e) {
        const error = e as AxiosError;
        console.error(error.response?.data);
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
    }
});

export const fetchUpdateProject = createAsyncThunk("/workspace/fetchUpdateProject", async (params: ProjectInterface, { rejectWithValue }) => {
    try {
        await axios.put(`projects/update/`, params);
        const data: ObjTokenInterface = await axios.get(`/projects/allbyid/${params?.workspace}?limit=${15}`);
        const dataFavorite: ObjTokenInterface = await axios.get(`projects/favorite/${params?.workspace}`);
        return {
            workspaceId: params.workspace,
            userWorkspace: data.data,
            userFavorite: dataFavorite.data,
        };
    } catch (e) {
        const error = e as AxiosError;
        console.error(error.response?.data);
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
    }
});

export const fetchDeleteProject = createAsyncThunk("/workspace/fetchDeleteProject", async (params: ProjectInterface, { rejectWithValue }) => {
    try {
        await axios.delete(`projects/delete/${params.id}`);
        const data: ObjTokenInterface = await axios.get(`/projects/allbyid/${params?.workspace}?limit=${15}`);
        const dataFavorite: ObjTokenInterface = await axios.get(`projects/favorite/${params?.workspace}`);
        return {
            workspaceId: params.workspace,
            userWorkspace: data.data,
            userFavorite: dataFavorite.data,
        };
    } catch (e) {
        const error = e as AxiosError;
        console.error(error.response?.data);
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
    }
});

const initialState: StateInter = {
    workspaceId: "",
    userWorkspace: null,
    userFavorite: null,
    status: "loading",
}

const setLoadingStatus = (state: StateInter) => {
    state.status = "loading";
};

const setLoadedStatus = (state: StateInter, action: any) => {
    const {workspaceId, userWorkspace, userFavorite} = action.payload;
    state.status = "loaded";
    state.workspaceId = workspaceId;
    state.userWorkspace = userWorkspace;
    state.userFavorite = userFavorite;
};

const setErrorStatus = (state: StateInter) => {
    state.status = "error";
    // Не сбрасываем значения workspaceId, userWorkspace и userFavorite
};

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        deleteWorkspace: (state) => {
            state.workspaceId = "";
            state.userWorkspace = null;
            state.userFavorite = null;
            state.status = "loading";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchWorkspaceMe.pending, setLoadingStatus)
        .addCase(fetchWorkspaceMe.fulfilled, setLoadedStatus)
        .addCase(fetchWorkspaceMe.rejected, setErrorStatus)
        .addCase(fetchCreateProject.pending, setLoadingStatus)
        .addCase(fetchCreateProject.fulfilled, setLoadedStatus)
        .addCase(fetchCreateProject.rejected, setErrorStatus)
        .addCase(fetchUpdateProject.pending, setLoadingStatus)
        .addCase(fetchUpdateProject.fulfilled, setLoadedStatus)
        .addCase(fetchUpdateProject.rejected, setErrorStatus)
        .addCase(fetchDeleteProject.pending, setLoadingStatus)
        .addCase(fetchDeleteProject.fulfilled, setLoadedStatus)
        .addCase(fetchDeleteProject.rejected, setErrorStatus);
    }
});

export const selectWorkspaceData = createSelector(
    (state: { workspace: { userWorkspace: objProjectInterface[] | null; }; }) => state.workspace.userWorkspace,
    (userWorkspace) => ({
        userWorkspace,
    })
);

export const selectFavoriteData = createSelector(
    (state: {workspace: {userFavorite: objProjectInterface[] | null;}; }) => state.workspace.userFavorite,
    (userFavorite) => ({
        userFavorite,
    })
)

export const workspaceReducer = workspaceSlice.reducer;
export const { deleteWorkspace } = workspaceSlice.actions;

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, days: number) => {
    cookies.set(name, value, { path: '/', maxAge: days * 24 * 60 * 60 });
};

export const getCookie = (name: string): string => {
    return cookies.get(name);
};

export const deleteCookie = (name: string) => {
    cookies.remove(name, { path: '/' });
};
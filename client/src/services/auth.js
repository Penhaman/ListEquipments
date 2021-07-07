export const TOKEN_KEY = '&app-token';
export const ID_USER = '&id_user';
export const USERNAME = '&username';
export const USER_LVL = '&user_lvl';

export const BRAND = '&brand';
export const MODEL = '&model';
export const CLIENT = '&client';
export const QUANTITY = '&quantity';
export const OBSERVATIONS = '&observations';
export const STATUS = '&status';

export const login = token => { localStorage.setItem(TOKEN_KEY,token); }
export const logout = () => { localStorage.clear() };

export const setIdUser = id => localStorage.setItem(ID_USER,id);
export const getIdUser = () => localStorage.getItem(ID_USER);

export const setUsername = username => localStorage.setItem(USERNAME,username);
export const getUsername = () => localStorage.getItem(USERNAME);

export const setUserLvl = userlvl => localStorage.setItem(USER_LVL,userlvl);
export const getUserLvl = () => localStorage.getItem(USER_LVL);

export const getToken = () => localStorage.getItem(TOKEN_KEY)
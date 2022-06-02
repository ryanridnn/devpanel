import { MENUS } from "../constants.js";

export const isMenuExist = (m) => {
	return Object.values(MENUS).some((menu) => menu === m) ? true : false;
};

export const isAllNotNull = (arr) => {
	return arr.every((item) => item !== null);
};

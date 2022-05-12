const regex = /^(#)((?:[A-Fa-f0-9]{3}){1,2})(?:[0-9]{2})?$/g;

const isHex = (value: string): boolean => Boolean(value.match(regex));

export default isHex;

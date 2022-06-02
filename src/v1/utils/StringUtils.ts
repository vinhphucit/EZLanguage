export function switchNull(val1: any, val2: any): any {
    return val1 ? val1 : val2;
}

export function standardizePath(val: string):string{
    if(!val) return ``
    if(!val.startsWith(`/`)) val = `/${val}`;
    if(val.endsWith(`/`)) val = val.substring(0, val.length-1);
    return val;
}
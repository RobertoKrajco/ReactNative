export const URL = "http://10.0.2.2:3000";


export const headers = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + global.access_token
    };
}

export const create = async (path, data) => {
    let res = await fetch(URL + path, {
        method: 'post',
        body: JSON.stringify(data),
        headers: headers(),
    });
    return await res.json();
};

export const update = async (path, data) => {
    console.log(path);
    let res = await fetch(URL + path, {
        method: 'put',
        body: JSON.stringify(data),
        headers: headers(),
    });
    return await res.json();
};

export const get = async (path) => {
    let res = await fetch(URL + path, {
        headers: headers(),
    });
    return await res.json();
}

export const remove = async (path) => {
    let res = await fetch(URL + path, {
        method: 'delete',
        headers: headers(),
    });
    console.log(path);
    return await res.json();
}

import { useEffect, useState } from "react";

const useToken = (user) => {
    const [token, setToken] = useState('')

    useEffect(() => {
        const email = user?.user?.email;
        const newUserInfo = {
            userName: user?.user?.displayName,
            userEmail: email,
        }
        if (email) {
            const url = `http://localhost:5000//user/${email}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUserInfo),
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }

    }, [user])

    return [token];
}

export default useToken;
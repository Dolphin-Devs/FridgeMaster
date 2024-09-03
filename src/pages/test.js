import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
    const [data, setData] = useState(null);

    const onClick = () => {
        axios.get("https://qxy7nvgd2k.execute-api.ca-central-1.amazonaws.com/FridgeMaster/test")
        .then(response => {
            console.log(response.data); // 콘솔에 가져온 데이터 로그
            setData(response.data); // 가져온 데이터를 상태에 저장
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
    }

    return (
        <div>
            <h3>Test</h3>
            <button onClick={onClick}>Test the API</button>

            {data && (
                <div>
                    <h4>Items:</h4>
                    <ul>
                        {data.items.map((item) => (
                            <li key={item.id}>
                                <strong>{item.name}</strong>: ${item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Test;
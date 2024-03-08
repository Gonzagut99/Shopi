import { useEffect, useState } from 'react';

// const fetchData = async (uri)=>{
//     try {
//         const response = await fetch(uri);
//         const data = await (response.json());
//         return data;
//       } catch (error) {
//         console.error(`Hubo un error: ${error}`);
//         return {}
//       }
// }
export const useFetch = (apiUrl) => {
	const [data, setData] = useState();

	useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await fetch(apiUrl);
                const data = await (response.json());
                setData(data);
              } catch (error) {
                console.error(`Hubo un error: ${error}`);
                setData({})
              }
        }
        fetchData()
        // const fetchDataAsync = async () => {
        //     const data = await fetchData(apiUrl);
        //     setData(data);
        //   };
        //fetchDataAsync();
        console.log(data)
    }, [apiUrl]);

	return data;
};


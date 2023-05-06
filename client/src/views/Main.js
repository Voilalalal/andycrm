import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListCompany from '../components/ListCompany';

const Main = () => {

    const [companies, setCompanies] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/company')
            .then(res=>{
                setCompanies(res.data);
                setLoaded(true);
            });
    },[])

    const removeFromDom = prodId => {
        setCompanies(companies.filter(prods => prods._id !== prodId));
    }

    return (
        <div>
             {loaded && <ListCompany companies={companies} removeFromDom={removeFromDom}/>}
        </div>
    );
};

export default Main;
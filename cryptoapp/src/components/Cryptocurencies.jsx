import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

// importing custom redux hook
import { useGetCryptosQuery } from '../services/cryptoAPI';

// importing component
import { Loader } from './';

const Cryptocurencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setCryptos(filteredData);
    }, [cryptoList, searchTerm]);

    if (isFetching) return <Loader />

    return (
        <>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurency' onChange={(event) => setSearchTerm(event.target.value)} />
                </div>
            )}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((crypto) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.id}>
                        <Link to={`/crypto/${crypto.id}`}>
                            <Card title={`${crypto.rank}. ${crypto.name}`} extra={<img src={crypto.iconUrl} className='crypto-image' alt='img' />} hoverable >
                                <p>Price: {millify(crypto.price)}</p>
                                <p>Market Cap: {millify(crypto.marketCap)}</p>
                                <p>Daily Change: {millify(crypto.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurencies;
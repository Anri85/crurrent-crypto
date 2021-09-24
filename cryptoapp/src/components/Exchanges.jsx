import React from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';

// importing custom redux hook
import { useGetCryptoExchangesQuery } from '../services/cryptoAPI';

// importing component
import { Loader } from './';

// destructuring ant design property
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetCryptoExchangesQuery();
    const exchangeList = data?.data?.exchanges;

    if (isFetching) return <Loader />

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24H Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {exchangeList.map((exchange) => (
                    <Col span={24} key={exchange.id}>
                        <Collapse>
                            <Panel
                                key={exchange.id}
                                showArrow={false}
                                header={(
                                    <Row key={exchange.id}>
                                        <Col span={6}>
                                            <Text><strong>{exchange.rank}.</strong></Text>
                                            <Avatar className='exchange-image' src={exchange.iconUrl} />
                                            <Text><strong>{exchange.name}.</strong></Text>
                                        </Col>
                                        <Col span={6}>${millify(exchange.volume)}</Col>
                                        <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                        <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                    </Row>
                                )}
                            >
                                {HTMLReactParser(exchange.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Exchanges;
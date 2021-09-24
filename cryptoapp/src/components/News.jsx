import React, { useState } from 'react';
import { Select, Typography, Col, Avatar, Row, Card } from 'antd';
import moment from 'moment';

// importing custom redux hook
import { useGetCryptoNewsQuery } from '../services/cryptoNewsAPI';
import { useGetCryptosQuery } from '../services/cryptoAPI';

// importing component
import { Loader } from './';

// image
const demoImageUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

// desctructuring ant design property
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);

    if (!cryptoNews?.value || isFetching) return <Loader />

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select A Crypto'
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name} key={coin.id}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title className='news-title' level={5}>
                                    {news.name}
                                </Title>
                                <img src={news?.image?.thumbnail?.contentUrl || demoImageUrl} alt='news' style={{ maxWidth: '150px', maxHeight: '75px' }} />
                            </div>
                            <p>
                                {news.description > 100 ? `${news.description.substring(0, 100)} ...` : news.description}
                            </p>
                            <div className='provider-container' style={{ alignItems: 'center' }}>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} alt='news' />
                                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News;
import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

// importing styles
import './App.css';
// importing components
import { Navbar, HomePage, Cryptocurencies, CryptoDetails, Exchanges, News } from './components';

// desctructuring Typography.Title
const { Title } = Typography;

const App = () => {
    return (
        <div className='app'>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Switch>
                            <Route exact path='/'>
                                <HomePage />
                            </Route>
                            <Route path='/exchanges'>
                                <Exchanges />
                            </Route>
                            <Route path='/cryptocurencies'>
                                <Cryptocurencies />
                            </Route>
                            <Route path='/crypto/:coinId'>
                                <CryptoDetails />
                            </Route>
                            <Route path='/news'>
                                <News />
                            </Route>
                        </Switch>
                    </div>
                </Layout>
                <div className='footer'>
                    <Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                        Current-Crypto <br />
                        All Rights Reserved <br />
                        <a href={'https://github.com/Anri85'} target='_blank' rel='noreferrer'>
                            <small>https://github.com/Anri85</small>
                        </a>
                    </Title>
                    <Space>
                        <Link to='/'>Home</Link>
                        <Link to='/exchanges'>Exchanges</Link>
                        <Link to='/news'>News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App;
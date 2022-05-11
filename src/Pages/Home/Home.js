import React from 'react';
import Banner from './Banner';
import GetStarted from './GetStarted';
import Info from './Info';
import Services from './Services';

const Home = () => {
    return (
        <div>
            <Banner />
            <Info />
            <Services />
            <GetStarted />
        </div>
    );
};

export default Home;
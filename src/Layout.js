import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import App from './App';
import { Layout, useLayoutNavigation } from '@react-md/layout';
import navItems from './NavItems';

const CustomLayout = () => {
const { pathname } = useLocation();
    return (
    <Layout title="React Pokedex Challenge" navHeaderTitle="Navigation" treeProps={useLayoutNavigation(navItems, pathname, Link)}>
        <App />
    </Layout>
    );
}

export default CustomLayout;
import React from 'react';
import { LayoutNavigationItem, LayoutNavigationTree } from '@react-md/layout';
import { HomeSVGIcon, SearchSVGIcon } from '@react-md/material-icons';

const createRoute = (pathname, children, leftAddOn = undefined, parentId = null) => {
    return {
        itemId: pathname,
        parentId,
        to: pathname,
        children,
        leftAddOn
    };
}

const navItems = {
    '/': createRoute('/', 'Home', <HomeSVGIcon />),
    'search': createRoute('/search', 'Search/List', <SearchSVGIcon />)
}

export default navItems;
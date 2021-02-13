import React from 'react';

import Header from '../components/header/Header'

const DefaultLayout = (ViewComponent) => {
    return class extends React.Component {
        render() {
            return (
                <>
                    <Header />
                    <ViewComponent />
                </>
            )
        }
    }
};

export default DefaultLayout; 
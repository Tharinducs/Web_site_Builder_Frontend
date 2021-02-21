import React from 'react';

import Header from '../components/header/Header'

//layout to handle home page
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
import React from 'react';

import history from '../_helpers/history';

const RequireAuth = (ViewComponent) => {
    return class extends React.Component {
        render() {
            let token = localStorage.getItem('loginToken')
            token = JSON.parse(token);
            if (token && token.accesstoken) {
                return (
                    <ViewComponent />
                )
            } else {
                history.push(`${process.env.PUBLIC_URL}/login`)
                return null;
            }

        }
    }
};

export default RequireAuth; 

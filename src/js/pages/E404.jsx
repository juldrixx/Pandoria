import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import Helmet from 'react-helmet';
import { title } from '../utils';

class E404Page extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    { title('404') }
                </Helmet>

                <div>
                    <h1>Page introuvable</h1>
                    <p>Cette page ne semble pas exister ...</p>
                    <br />
                    <Link to="/">Retour à l'accueil</Link>
                </div>
            </Fragment>
        )
    }
}

export default E404Page;

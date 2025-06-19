import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Docs = () => {
    return <SwaggerUI url="/swagger/api.json" />;
};

export default Docs;

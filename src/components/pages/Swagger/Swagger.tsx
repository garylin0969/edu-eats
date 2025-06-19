import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

// API Docs
const Swagger = () => {
    return <SwaggerUI url="/swagger/api.json" />;
};

export default Swagger;

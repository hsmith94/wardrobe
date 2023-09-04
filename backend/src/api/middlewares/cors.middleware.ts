import cors from 'cors';
import { FRONTEND_DEV_SERVER_BASE_URL } from '../../constants';
import { IS_PRODUCTION } from '../../environment';

const DevCorsOptions: cors.CorsOptions = {
    origin: [FRONTEND_DEV_SERVER_BASE_URL],
};

// TODO: Set production configuration.
const ProdCorsOptions: cors.CorsOptions = {
    origin: undefined,
};

export const CorsMiddleware = cors(IS_PRODUCTION ? ProdCorsOptions : DevCorsOptions);

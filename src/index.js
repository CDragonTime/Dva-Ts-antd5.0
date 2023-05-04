import dva from 'dva';
import globalConfig from "@src/utils/global.ts"

// 1. Initialize
const app = dva({globalConfig});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('../config/router').default);

// 5. Start
app.start('#root');

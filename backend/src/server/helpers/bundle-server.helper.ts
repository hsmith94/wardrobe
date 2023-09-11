import * as express from 'express';
import path from 'path';

export function assignBundleServer(app: express.Application, bundleDir: string): void {
    console.log('Mounting bundle directory:', bundleDir);

    // Redirect root to app
    app.get('/', (req, res) => res.redirect('/app'));

    // Serve index.html on root and all other paths
    app.use('/', express.static(path.resolve(bundleDir, 'index.html')));

    // Serve bundles app files
    app.use(express.static(bundleDir));
    app.use('/app', express.static(bundleDir));
    app.use('/app/*', express.static(bundleDir));
}

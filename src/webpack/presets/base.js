import { NoErrorsPlugin } from 'webpack'
import path from 'path'

export default {
  name: 'base',
  configure({ action, projectPath, neatoPath, plugins = [] }) {
    const projectSourcePath = path.join(projectPath, 'src')

    // Use a much faster cheap-module-eval-source-map setup when possible
    // see: http://webpack.github.io/docs/configuration.html#devtool
    const devtool = 'source-map'

    return {
      context: projectSourcePath,

      devtool,

      plugins: [new NoErrorsPlugin(), ...plugins],

      resolve: {
        modules: [
          projectSourcePath,
          path.join(projectPath, '/node_modules'),
          // Neato node_modules is required in the path to be able
          // to load the `webpack-hot-middleware`
          path.join(neatoPath, '/node_modules')
        ]
      },
      resolveLoader: {
        // Should first try to resolve loaders nested within Neato.
        // This fixes an issue in NPM v2 where webpack incorrectly
        // thinks that the package `eslint` is the `eslint-loader`
        modulesDirectories: [
          path.join(neatoPath, '/node_modules'),
          path.join(projectPath, '/node_modules')
        ]
      }
    }
  }
}

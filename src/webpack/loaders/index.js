import merge from 'webpack-merge'

import image from './image'
import javascript from './javascript'
import typescript from './typescript'
import style from './style'

const loaders = [
  image,
  javascript,
  typescript,
  style
]

export default (neatoOptions) => {
  const disabledLoaders = neatoOptions.disabledLoaders || []

  return loaders.filter((loader) => disabledLoaders.indexOf(loader.name) === -1)
    .reduce((webpackConfig, loader) => (
      merge.smart(webpackConfig, loader.configure(neatoOptions))
    ), {})
}

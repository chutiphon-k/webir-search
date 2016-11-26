import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from 'Root'

const rootEl = document.getElementById('app')

render(
	<AppContainer>
		<Root />
	</AppContainer>,
	rootEl
)

if (module.hot) {
  module.hot.accept('Root', () => {
    const NextRootApp = require('Root').default
    
    render(
      <AppContainer>
         <NextRootApp />
      </AppContainer>,
      rootEl
    );
  });
}
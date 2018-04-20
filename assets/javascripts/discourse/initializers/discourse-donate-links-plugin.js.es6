import { withPluginApi } from 'discourse/lib/plugin-api';
import { h } from 'virtual-dom';

function initializePlugin(api) {
	api.createWidget('donate-links-widget', {
		tagName: 'div.menu-container-donate-links',

		html() {
			return [
				h('hr'),
				h('div.menu-container-donate-links-text', 'Help support the site!'),
				h('a',
					{
						href:'https://www.google.ca',
						target:'_blank'
					},
					'Donate'
				),
				h('spanmenu-container-donate-links-text', ' or '),
				h('a',
					{
						href: 'https://www.google.ca'
					},
					'Become A Patron'
				)
			];
		}
	});

	api.decorateWidget('menu-links:after', (helper) => {
		if (helper.attrs.name === 'footer-links') {
			return [ helper.widget.attach('donate-links-widget') ];
		}
	});
}

export default {
	name: 'discourse-donate-links-plugin',
	initialize(container) {
		withPluginApi('0.8.18', api => { initializePlugin(api); });
	}
}
import { withPluginApi } from 'discourse/lib/plugin-api';
import { h } from 'virtual-dom';

function initializePlugin(api, siteSettings) {
	api.decorateWidget('menu-links:after', (helper) => {
		if (siteSettings.donate_links_enabled && helper.attrs.name === 'footer-links') {
			let content = [
				h('hr'),
				h('div.menu-container-donate-links-text', siteSettings.donate_links_prompt),
				h('a',
					{
						href: siteSettings.donate_links_first_url,
						target:'_blank'
					},
					siteSettings.donate_links_first_text
				)
			]

			if (siteSettings.donate_links_second_url !== "") {
				content.push(h('span.menu-container-donate-links-text', ' or '));
				content.push(
					h('a',
						{
							href: siteSettings.donate_links_second_url
						},
						siteSettings.donate_links_second_text
					)
				);
			}
			return content;
		}
	});
}

export default {
	name: 'discourse-donate-links-plugin',
	initialize(container) {
		const siteSettings = container.lookup('site-settings:main');
		withPluginApi('0.8.18', api => { initializePlugin(api, siteSettings); });
	}
}
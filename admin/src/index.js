import pluginPkg from "../../package.json";
import Wysiwyg from "./components/Wysiwyg";
import pluginId from "./pluginId";

const name = pluginPkg.strapi.name;

const myComponent = async () => {
  const component = await import(
    /* webpackChunkName: "strapi-tiptip-editor-settings-page" */ './pages/App'
    );

  return component;
};

export default {
  register(app) {
    app.createSettingSection(
      { id: 'strapi-tiptap-editor', intlLabel: { id: 'my-plugin.plugin.name', defaultMessage: 'Strapi TipTap Editor' } }, // Section to create
      [
        // links
        {
          intlLabel: { id: 'my-plugin.plugin.name', defaultMessage: 'Settings' },
          id: 'Settings',
          to: '/settings/strapi-tiptap-editor',
          Component: myComponent,
          permissions: [],
        },
      ]
    );

    app.addFields({ type: 'json', Component: Wysiwyg });

    app.customFields.register({
      name: 'tiptap',
      pluginId: 'strapi-tiptap-editor',
      type: 'json',
      intlLabel: {
        id: getTrad('strapi-tiptap-editor.label'),
        defaultMessage: 'TipTap',
      },
      intlDescription: {
        id: getTrad('strapi-tiptap-editor.description'),
        defaultMessage: 'TipTap Rich Text Editor',
      },
      components: {
        Input: Wysiwyg
      },
    });

    app.registerPlugin({
      id: pluginId,
      isReady: true,
      name,
    });
  },
  bootstrap() {},
};

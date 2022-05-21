import _ from 'lodash';
import { main } from '../store';

const getMenu = () => {
  return main.get('config.theme.menu');
};

const getMenuAplikasi = (appKey) => {
  let menu = getMenu();
  let listSubMenu = [];
  if (menu) {
    let parentMenu = menu.filter((r) => r.key_menu === '_menu');
    let aplikasiMenu = parentMenu[0].children.filter(
      (r) => r.key_menu === appKey
    )[0];
    listSubMenu = aplikasiMenu ? aplikasiMenu.children : [];
  }

  return listSubMenu;
};

const getContexts = () => {
  let menu = getMenu();
  let contexts = [];

  if (menu) {
    let parentMenu = menu.filter((r) => r.key_menu === '_menu');
    if (parentMenu[0]) {
      parentMenu[0].children.forEach((row) => {
        let context = {};
        context['nama'] = row.nama;
        context['key'] = row.key_menu;

        switch (row.key_menu) {
          case '_billing':
            context['warna'] = 'green';
            context['icon'] = 'address card';
            break;
          case '_farmasi':
            context['warna'] = 'yellow';
            context['icon'] = 'medkit';
            break;
          case '_rekam_medis':
            context['warna'] = 'red';
            context['icon'] = 'heartbeat';
            break;
          case '_system':
            context['warna'] = 'blue';
            context['icon'] = 'setting';
            break;
          default:
            context['warna'] = 'green';
            context['icon'] = 'address card';
            break;
        }
        contexts.push(context);
      });
    }
  }

  return _.orderBy(
    contexts,
    [(context) => context.nama.toLowerCase()],
    ['asc']
  );
};

export { getMenu, getMenuAplikasi, getContexts };

import { getThemeColors, generateColors } from '../../../build/config/themeConfig';

import { replaceStyleVariables } from '@rys-fe/vite-plugin-theme/es/client';
import { mixLighten, mixDarken, tinycolor } from '@rys-fe/vite-plugin-theme/es/colorUtils';

export async function changeTheme(color: string) {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color,
  });

  let res = await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors],
  });
  fixDark();
  return res;
}

// 【LOWCOD-2262】修复黑暗模式下切换皮肤无效的问题
async function fixDark() {
  let el = document.getElementById('__VITE_PLUGIN_THEME__');
  if (el) {
    el.innerHTML = el.innerHTML.replace(/\\["']dark\\["']/g, `'dark'`);
  }
}

import { useToken } from 'antd/es/theme/internal';
import { memo, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { IThemeToken } from '../theme';

export const ThemeConfig = memo(
  (props: {
    themeMode?: 'dark' | 'light';
    themeToken?: IThemeToken;
    children?: React.ReactNode;
  }) => {
    const { themeMode, children, themeToken } = props;
    const [, token] = useToken();
    const theme: { token: IThemeToken; themeMode?: 'dark' | 'light' } =
      useMemo(() => {
        return {
          token: themeToken || token,
          mode: themeMode
        };
      }, [themeMode, themeToken, token]);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
);

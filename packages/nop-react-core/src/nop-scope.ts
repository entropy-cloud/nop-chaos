import {
  ReactNode
} from 'react';

import {
  ReactDynamicComponentScopeComponent,
  ReactDynamicComponentScopeComponentProps
} from './component-scope';
import {
  ReactDynamicStoreScopeComponent,
  ReactDynamicStoreScopeComponentProps
} from './store-scope';

type ScopeProps = ReactDynamicComponentScopeComponentProps &
  ReactDynamicStoreScopeComponentProps;

export function ReactNopScopeComponent(props: ScopeProps) {
  const { componentLib, storeLib, inheritParentComponents, inheritParentStore, children } = props;
  if (!componentLib && !storeLib) return children;
  const f = compose(
    componentLib ? ReactDynamicComponentScopeComponent : undefined,
    storeLib ? ReactDynamicStoreScopeComponent : undefined
  );
  return f?.(props);
}

function compose(
  f1?: (props: any) => ReactNode,
  f2?: (props: any) => ReactNode
) {
  if (!f1) return f2;
  if (!f2) return f1;
  return (props: any) => f1({ ...props, children: f2(props) });
}

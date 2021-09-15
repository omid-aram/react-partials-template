import React, { useEffect } from 'react';
//import { useTheme } from '@material-ui/core';

import useMicrofrontend from './useMicrofrontend';

const AccountingRenderer = () => {
  const id = 'accountingModule';
  const { isLoaded, module }= useMicrofrontend(id, 'http://localhost:3000/modules/accounting/mf-accounting.js');
  //const theme = useTheme();
  useEffect(() => {
    if (!module) return;
    const { render, unMount } = module;
    render(id, {  });

    return () => unMount(id);
  }, [isLoaded]); // eslint-disable-line

  if (!isLoaded) return null;
  if (!module) return <div>Accounting module is not available' </div> ;

  return <div id={id} />;
};

export default AccountingRenderer;

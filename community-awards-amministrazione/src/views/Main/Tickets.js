import React from 'react';

import Breadcrumb from '../../components/common/Breadcrumb';

import { useTranslation } from 'react-i18next';
import TicketsForm from '../../components/main/TicketsForm';

const Tickets = (props) => {
  const { t } = useTranslation();

  return (
    <div>
      <Breadcrumb
        title="Home"
        breadcrumbItem={t('Tickets')}
        breadcrumbItemName={t('Tickets')}
      />
      <TicketsForm />
    </div>
  );
};

export default Tickets;

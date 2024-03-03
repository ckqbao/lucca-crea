import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import POAPFallback from '../../assets/icons/ribbon.svg';

import Breadcrumb from '../../components/common/Breadcrumb';
import RedemptionList from '../../components/main/RedemptionList';
import SearchBar from '../../components/main/SearchBar';

import { getRedemptionsList } from '../../redux/store/actions/redemptionActions';

import request from '../../helpers/requestHelper';

import { useTranslation } from 'react-i18next';

const Redemptions = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();

  const redemption = useSelector((state) => state.redemption);

  const [redemptionsData, setRedemptionsData] = useState([]);

  const [redemptionSearch, setRedemptionSearch] = useState();

  const [redemptionSearchData, setRedemptionSearchData] = useState([]);

  useEffect(() => {
    dispatch(getRedemptionsList());
  }, []);

  useEffect(() => {
    setRedemptionsData(redemption.redemptionsList);
    if (redemption.redemptionsList.length) {
      getImage();
    }
  }, [JSON.stringify(redemption.redemptionsList)]);

  useEffect(() => {
    if (redemptionSearch?.length) {
      getSearchImage();
    }
  }, [JSON.stringify(redemptionSearch)]);

  useEffect(() => {
    if (redemption.errorMsg?.code === 401) {
      history.go(0);
    }
  }, [redemption.errorMsg]);

  const getImage = async () => {
    let oldData = JSON.parse(JSON.stringify(redemption.redemptionsList));
    for (var i = 0; i < redemption.redemptionsList.length; i++) {
      if (redemption.redemptionsList[i].poapId.image) {
        const res = await request({
          url: `poaps/${redemption.redemptionsList[i].poapId.id}/image`,
          auth: true,
          method: 'GET',
        });
        if (!res.code) {
          var objectURL = URL.createObjectURL(res);
          oldData[i].poapId.image = objectURL;
        }
        if (res.code === 400) {
          console.log(require('../../assets/images/Logo_Lucca_Crea_2021.png'));
          oldData[i].poapId.image = POAPFallback;
        }
      }
    }
    setRedemptionsData(oldData);
  };

  const getSearchImage = async () => {
    let oldData = JSON.parse(JSON.stringify(redemptionSearch));
    for (var i = 0; i < redemptionSearch?.length; i++) {
      if (redemptionSearch[i]?.poapId.image) {
        const res = await request({
          url: `poaps/${redemptionSearch[i].poapId.id}/image`,
          auth: true,
          method: 'GET',
        });
        if (!res.code) {
          var objectURL = URL.createObjectURL(res);
          oldData[i].poapId.image = objectURL;
        }
        if (res.code === 400) {
          console.log(require('../../assets/images/Logo_Lucca_Crea_2021.png'));
          oldData[i].poapId.fallbackImage = POAPFallback;
        }
      }
    }
    //console.log(redemption.redemptionsList);
    setRedemptionSearchData(oldData);
  };

  console.log(redemptionSearchData);

  return (
    <div>
      <Breadcrumb
        title="Home"
        breadcrumbItem={t('Redemptions')}
        breadcrumbItemName={t('Last 100 redemptions')}
      />
      <SearchBar
        name="Redemptions"
        btnName="Redemption"
        redemptionSearch={redemptionSearch}
        setRedemptionSearch={setRedemptionSearch}
      />
      <RedemptionList
        redemptionsList={
          redemptionSearch ? redemptionSearchData : redemptionsData
        }
        total={redemption.total}
        loading={redemption.subLoading}
        getRedemptionsList={(pageNo) => dispatch(getRedemptionsList(pageNo))}
      />
    </div>
  );
};

export default Redemptions;

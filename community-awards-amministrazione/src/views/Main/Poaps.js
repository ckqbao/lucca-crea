import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import POAPFallback from '../../assets/icons/ribbon.svg';

import Breadcrumb from '../../components/common/Breadcrumb';
import PoapList from '../../components/main/PoapList';
import SearchBar from '../../components/main/SearchBar';
import PoapModal from '../../components/main/PoapModal';
import DeleteModal from '../../components/main/DeleteModal';
import MintLinkModal from '../../components/main/MintLinkModal';

import {
  getPoapsList,
  addPoap,
  editPoap,
  deletePoap,
} from '../../redux/store/actions/poapActions';

import request from '../../helpers/requestHelper';

import { useTranslation } from 'react-i18next';
import PoapDetailModal from '../../components/main/PopaDetailModal';

const Poaps = (props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();

  const poap = useSelector((state) => state.poap);

  const [poapsData, setPoapsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    image: '',
    fallbackImage: '',
    startDate: '',
    endDate: '',
    description: '',
    isPoap: false,
    poapId: '',
    isRedeemable: false,
    redemptionCode: '',
  });
  const [mintFormState, setMintFormState] = useState({ import: '' });
  const [deleteId, setDeleteId] = useState();
  const [poapId, setPoapId] = useState();
  const [poapSearch, setPoapSearch] = useState();
  const [previewFileUrl, setPreviewFileUrl] = useState();
  const [previewImgUrl, setPreviewImgUrl] = useState();
  const [previewFallbackImageUrl, setPreviewFallbackImageUrl] = useState();
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    image: '',
    fallbackImage: '',
    startDate: '',
    endDate: '',
    description: '',
    poapId: '',
    redemptionCode: '',
  });
  const [poapCountData, setPoapCountData] = useState({}); // {idPoap: count}
  const [poapImages, setPoapImages] = useState({}); // {idPoap: image blob}

  useEffect(() => {
    dispatch(getPoapsList(1));
  }, []);

  useEffect(() => {
    if (poap.errorMsg?.code === 401) {
      history.go(0);
    }
  }, [poap.errorMsg]);

  useEffect(() => {
    setErrorMessage({
      name: '',
      image: '',
      fallbackImage: '',
      startDate: '',
      endDate: '',
      description: '',
      poapId: '',
      redemptionCode: '',
    });
  }, [formState]);

  const getImage = async () => {
    let oldData = JSON.parse(JSON.stringify(poap.poapsList));
    for (var i = 0; i < poap.poapsList.length; i++) {
      if (poap.poapsList[i].image) {
        const res = await request({
          url: `poaps/${poap.poapsList[i].id}/image`,
          auth: true,
          method: 'GET',
        });
        if (!res.code) {
          var objectURL = URL.createObjectURL(res);
          oldData[i].image = objectURL;
        }
        if (res.code === 400) {
          console.log(require('../../assets/images/Logo_Lucca_Crea_2021.png'));
          oldData[i].image = POAPFallback;
        }
      }
    }
    setPoapsData(oldData);
  };

  const fetchImage = async () => {
    
    let images = JSON.parse(JSON.stringify(poapImages));
    
    for (var i = 0; i < poap.poapsList.length; i++) {
      
      if (poap.poapsList[i].image) {
        
        const res = await request({
          url: `poaps/${poap.poapsList[i].id}/image`,
          auth: true,
          method: 'GET',
        });
        
        if (!res.code) {
        
          var objectURL = URL.createObjectURL(res);
          images[poap.poapsList[i].id] = objectURL
          setPoapImages(images);

        }
        
        if (res.code === 400) {

          images[poap.poapsList[i].id] = POAPFallback
          setPoapImages(images);
      
        }
      
      }
    
    }
    
  };

  // const getFallbackImage = async () => {
  //   let oldData = JSON.parse(JSON.stringify(poap.poapsList));
  //   for (var i = 0; i < poap.poapsList.length; i++) {
  //     if (poap.poapsList[i].fallbackImage) {
  //       const res = await request({
  //         url: `poaps/${poap.poapsList[i].id}/fallbackimage`,
  //         auth: true,
  //         method: 'GET',
  //       });
  //       if (!res.code) {
  //         var objectURL = URL.createObjectURL(res);
  //         oldData[i].fallbackImage = objectURL;
  //       }

  //       if (res.code === 400) {
  //         console.log(require('../../assets/images/Logo_Lucca_Crea_2021.png'));
  //         oldData[i].fallbackImage = POAPFallback;
  //       }
  //     }
  //   }
  //   setPoapsData(oldData);
  // };

  const fetchMintlinkCount = async () => {

    let countData = JSON.parse(JSON.stringify(poapCountData));
    
    for (var i = 0; i < poap.poapsList.length; i++) {
        
      const res = await request({
        url: `poaps/${poap.poapsList[i].id}/mintlinkscount`,
        auth: true,
        method: 'GET',
      });
      
      if (!res.code) {
        countData[poap.poapsList[i].id] = res.count;
        setPoapCountData(countData);
        //oldData[i].count = res.count
        
        //console.log(oldData)
      } else {
        countData[poap.poapsList[i].id] = "-";
        setPoapCountData(countData);
      }
  
  }

    //setPoapsData(oldData);
  
  } 

  const onNewButtonClick = async () => {
    if (!formState.active) {
      setFormState({
        ...formState,
      });
    }
    setIsModalOpen(true);
  };

  console.log(errorMessage);
  console.log(formState);

  const onSaveClick = (e) => {
    e.preventDefault();

    let data = {};

    data.name = formState.name;
    data.image = formState.image;
    data.fallbackImage = formState.fallbackImage;
    data.startDate = formState.startDate;
    data.endDate = formState.endDate;
    data.description = formState.description;
    data.isPoap = formState.isPoap;
    data.poapId = formState.poapId;
    data.isRedeemable = formState.isRedeemable;
    data.redemptionCode = formState.redemptionCode;

    if (formState.id) {
      data.id = formState.id;
      dispatch(editPoap(data));
    } else {
      if (formState.image === '') {
        return setErrorMessage({
          ...errorMessage,
          image: 'Please enter a image',
        });
      }
      if (formState.fallbackImage === '') {
        return setErrorMessage({
          ...errorMessage,
          fallbackImage: 'Please enter a fallback image',
        });
      }
      if (formState.name === '') {
        return setErrorMessage({
          ...errorMessage,
          name: 'Please enter a name',
        });
      }

      if (formState.description === '') {
        return setErrorMessage({
          ...errorMessage,
          description: 'Please enter a description',
        });
      }

      if (formState.startDate === '') {
        return setErrorMessage({
          ...errorMessage,
          startDate: 'Please enter a start date',
        });
      }

      if (formState.endDate === '') {
        return setErrorMessage({
          ...errorMessage,
          endDate: 'Please enter an end date',
        });
      }

      if (formState.isPoap === false && formState.poapId === '') {
        return setErrorMessage({
          ...errorMessage,
          poapId: 'Please enter a poap id',
        });
      }

      if (formState.isRedeemable === false && formState.redemptionCode === '') {
        return setErrorMessage({
          ...errorMessage,
          redemptionCode: 'Please enter a redemption code',
        });
      }
    }
    dispatch(addPoap(data));

    setIsModalOpen(false);
    setFormState({
      name: '',
      image: '',
      fallbackImage: '',
      startDate: '',
      endDate: '',
      description: '',
      isPoap: false,
      poapId: '',
      isRedeemable: false,
      redemptionCode: '',
    });
  };

  const getSingleImage = async (poapId) => {
    if (poapId) {
      const res = await request({
        url: `poaps/${poapId}/image`,
        auth: true,
        method: 'GET',
      });
      if (!res.code) {
        var objectURL = URL.createObjectURL(res);
        setPreviewImgUrl(objectURL);
      }
    }
  };

  const getSingleFallbackImage = async (poapId) => {
    if (poapId) {
      const res = await request({
        url: `poaps/${poapId}/fallbackimage`,
        auth: true,
        method: 'GET',
      });
      if (!res.code) {
        var objectURL = URL.createObjectURL(res);
        setPreviewFallbackImageUrl(objectURL);
      }
    }
  };

  const onEditClick = (item) => {
    getSingleImage(item.id);
    getSingleFallbackImage(item.id);

    const startDate = item.startDate.split('T');
    const endDate = item.endDate.split('T');

    setFormState({
      id: item.id,
      name: item.name,
      image: item.image,
      fallbackImage: item.fallbackImage,
      startDate: startDate[0],
      endDate: endDate[0],
      description: item.description,
      isPoap: item.isPoap,
      poapId: item.poapId,
      isRedeemable: item.isRedeemable,
      redemptionCode: item.redemptionCode,
    });
    setIsModalOpen(true);
  };

  const onDetailShow = (item) => {
    getSingleImage(item.id);
    getSingleFallbackImage(item.id);

    const startDate = item.startDate.split('T');
    const endDate = item.endDate.split('T');

    setFormState({
      id: item.id,
      name: item.name,
      image: item.image,
      fallbackImage: item.fallbackImage,
      startDate: startDate[0],
      endDate: endDate[0],
      description: item.description,
      isPoap: item.isPoap,
      poapId: item.poapId,
      isRedeemable: item.isRedeemable,
      redemptionCode: item.redemptionCode,
    });
    setIsDetailModalOpen(true);
  };

  const onDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleDelete = () => {
    let id = deleteId;
    setDeleteId();

    dispatch(deletePoap(id));
  };

  const onAddMintLinksClick = (item) => {
    setPoapId(item.id);
    setMintFormState({
      import: '',
    });
  };

  const handleAddMintLink = async (e) => {
    setPoapId();
    e.preventDefault();
    let id = poapId;

    var data = new FormData();

    data.append('import', mintFormState.import);

    if (mintFormState.import) {
      const res = await request({
        url: `poaps/${id}/mintlinks`,
        auth: true,
        method: 'POST',
        data: data,
      });
    }
  };

  useEffect(() => {

    setPoapsData(poap.poapsList);

    if (poap.poapsList.length) {
      
      getImage();
      //fetchImage();
      fetchMintlinkCount();

    }

  }, [JSON.stringify(poap.poapsList)]);

  return (
    <div>
      <Breadcrumb
        title="Home"
        breadcrumbItem={t('Poaps')}
        breadcrumbItemName={t('Poaps')}
      />
      <SearchBar
        name="Poaps"
        btnName="Poap"
        onClick={onNewButtonClick}
        searchValue={poapSearch}
        setSearchValue={setPoapSearch}
      />
      <PoapList
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        onAddMintLinks={onAddMintLinksClick}
        onDetailShow={onDetailShow}
        poapCounData={poapCountData}
        poapImages={poapImages}
        poapsList={
          poapSearch
            ? poapsData.filter((el) =>
                el.name.toLowerCase().includes(poapSearch.toLowerCase())
              )
            : poapsData
        }
        total={poap.total}
        loading={poap.subLoading}
        getPoapsList={(pageNo) => dispatch(getPoapsList(pageNo))}
      />
      <PoapModal
        formState={formState}
        setFormState={setFormState}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        name="Poap"
        onSaveClick={onSaveClick}
        previewImgUrl={previewImgUrl}
        previewFallbackImageUrl={previewFallbackImageUrl}
        setPreviewImgUrl={setPreviewImgUrl}
        setPreviewFallbackImageUrl={setPreviewFallbackImageUrl}
        errorMessage={errorMessage}
      />
      <PoapDetailModal
        formState={formState}
        setFormState={setFormState}
        isOpen={isDetailModalOpen}
        setIsOpen={setIsDetailModalOpen}
        name="Poap"
        previewImgUrl={previewImgUrl}
        previewFallbackImageUrl={previewFallbackImageUrl}
        setPreviewImgUrl={setPreviewImgUrl}
        setPreviewFallbackImageUrl={setPreviewFallbackImageUrl}
        errorMessage={errorMessage}
      />
      <DeleteModal
        isOpen={deleteId ? true : false}
        setIsOpen={setDeleteId}
        name="Poap"
        onDelete={handleDelete}
      />
      <MintLinkModal
        mintFormState={mintFormState}
        setMintFormState={setMintFormState}
        isOpen={poapId ? true : false}
        setPoapId={setPoapId}
        poapId={poapId}
        setIsOpen={setIsModalOpen}
        name="MintLink"
        onAddMintLinks={handleAddMintLink}
        previewFileUrl={previewFileUrl}
        setPreviewFileUrl={setPreviewFileUrl}
      />
    </div>
  );
};

export default Poaps;

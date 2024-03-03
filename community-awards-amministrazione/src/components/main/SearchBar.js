import React from 'react';
import { Container, Row, Col, Button, Input, Form } from 'reactstrap';

import { useTranslation } from 'react-i18next';
import request from '../../helpers/requestHelper';
import { useState } from 'react';

const SearchBar = (props) => {
  const { t } = useTranslation();

  const [value, setValue] = useState();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (value?.length > 0) {
      const res = await request({
        url: `redemptions/manage/search?limit=100&populate=poapId&email=${value}`,
        auth: true,
        method: 'GET',
      });
      if (!res.code) {
        console.log(res.results);
        props.setRedemptionSearch(res.results);
      }
    }
  };

  return (
    <Container fluid={true}>
      <Row className="mt-4 mb-4">
        {props.name === 'Redemptions' ? (
          <Form onSubmit={handleSearch}>
            <Col className="d-flex searchbar-input">
              <div>
                <i className="bx bx-search-alt"></i>
              </div>
              <Input
                type="text"
                name={props.name.toLowerCase()}
                id={props.name.toLowerCase()}
                className="form-control form-control-login"
                placeholder={t('Search')}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Col>
          </Form>
        ) : (
          <Col className="d-flex searchbar-input">
            <div>
              <i className="bx bx-search-alt"></i>
            </div>
            <Input
              type="text"
              name={props.name.toLowerCase()}
              id={props.name.toLowerCase()}
              className="form-control form-control-login"
              placeholder={t('Search')}
              value={props.searchValue}
              onChange={(e) => props.setSearchValue(e.target.value)}
            />
          </Col>
        )}
        {props.name === 'Redemptions' ? null : (
          <Col className="ms-auto text-end">
            <Button
              onClick={props.onClick ? props.onClick : null}
              className="bg-red text-white border-0"
            >
              {t('Add')} {t(props.btnName)}
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default SearchBar;

import { useTranslation } from "react-i18next";
import { Container, Input } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import overlayFactory from "react-bootstrap-table2-overlay";
import paginationFactory from "react-bootstrap-table2-paginator";

import Button from "react-bootstrap/Button";

import { ReactComponent as EditIcon } from "../../assets/icons/pencil.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/trash.svg";

import ParticipantPreviewModal from "./ParticipantPreviewModal";

export default function ParticipantsTable(props) {
  const { data = [] } = props;

  const { t } = useTranslation();

  const columns = [
    {
      key: "name",
      dataField: "name",
      text: "Participant Name",
      headerClasses: "align-middle",
    },
    {
      key: "description",
      dataField: "description",
      text: "Description",
      headerClasses: "align-middle",
    },
    {
      key: "image",
      dataField: "image",
      text: "Imagine",
      align: "center",
      headerAlign: "center",
      headerClasses: "align-middle",
      formatter: (_rowContent, row) => {
        return (
          <ParticipantPreviewModal
            categoryColor={props.categoryColor}
            onVote={props.onVote}
            participant={row}
          />
        );
      },
    },
    {
      key: "active",
      dataField: "active",
      text: "Publish",
      align: "center",
      headerAlign: "center",
      headerClasses: "align-middle",
      formatter: (_rowContent, row) => {
        return <Input checked={row.active ?? false} readOnly type="checkbox" />;
      },
    },
    {
      key: "actions",
      dataField: "actions",
      text: t("Actions"),
      align: "center",
      headerAlign: "center",
      headerClasses: "align-middle",
      formatter: (_rowContent, row) => {
        return (
          <div className="text-primary">
            <Button
              onClick={() => props.onEditClick(row)}
              variant="warning"
              className="me-1"
            >
              <EditIcon
                style={{ height: "100%", minWidth: "15", fill: "#fff" }}
              />
            </Button>
            <Button
              onClick={() => props.onDeleteClick(row.id)}
              variant="danger"
            >
              <DeleteIcon
                style={{ height: "100%", minWidth: "15", fill: "#fff" }}
              />
            </Button>
          </div>
        );
      },
    },
  ];

  const pagination = paginationFactory({
    sizePerPage: 20,
    page: 1,
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
    hideSizePerPage: true,
    totalSize: props.total ?? 0,
  });

  const onTableChange = () => {};

  return (
    <Container fluid={true} className="table-container">
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        pagination={pagination}
        bordered={false}
        classes="table-responsive table-common user-table"
        headerClasses="header-class-dark-table"
        rowClasses={(row) => (row.active ? "" : "opacity-25")}
        overlay={overlayFactory({
          spinner: true,
          styles: {
            spinner: (base) => ({
              ...base,
              "& svg circle": { stroke: "#DA1021" },
              width: "50px",
            }),
            overlay: (base) => ({
              ...base,
              background: "rgba(255, 255, 255, 0.9)",
            }),
          },
        })}
        onTableChange={onTableChange}
        remote
        loading={false}
        noDataIndication={<></>}
      />
    </Container>
  );
}

import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Breadcrumb from "../../components/common/Breadcrumb";

import { getCategory } from "../../redux/store/actions/categoryActions";
import {
  VOTES_ENDPOINT,
  getVotesList,
} from "../../redux/store/actions/voteActions";
import { selectCategoryByIds } from "../../redux/store/reducers/categoryReducer";
import { selectVotes } from "../../redux/store/reducers/voteReducer";
import request from "../../helpers/requestHelper";
import FileSaver from "file-saver";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Votes() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState();

  const votes = useSelector(selectVotes);

  const categoryIds = useMemo(
    () => Array.from(new Set(votes.map((vote) => vote._id.category))),
    [votes]
  );

  const categories = useSelector((state) =>
    selectCategoryByIds(state, categoryIds)
  );

  const data = useMemo(
    () =>
      _.mapValues(
        _.groupBy(votes, (vote) => vote._id.category),
        (votesByCategory) => {
          return {
            labels: votesByCategory.map((vote) => vote.participantDetails.name),
            datasets: [
              {
                data: votesByCategory.map((vote) => vote.count),
                backgroundColor: "rgba(85, 110, 230, 1)",
                maxBarThickness: 13,
              },
            ],
          };
        }
      ),
    [votes]
  );

  useEffect(() => {
    dispatch(getVotesList());
  }, [dispatch]);

  useEffect(() => {
    if (!categoryIds.length) return;

    for (const categoryId of categoryIds) {
      if (
        categories.findIndex((category) => category.id === categoryId) !== -1
      ) {
        continue;
      }
      dispatch(getCategory(categoryId));
    }
  }, [categoryIds, categories, dispatch]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDownloadVotesResult = async () => {
    try {
      const blob = await request({
        url: `${VOTES_ENDPOINT}/exportResults/xls`,
        auth: true,
        method: "GET",
      });
      FileSaver.saveAs(blob, "vote-results.xlsx");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <Breadcrumb
        title={t("Votes")}
        items={[
          { link: "/", title: t("Home") },
          { active: true, title: t("Votes") },
        ]}
      />
      <div
        className="d-flex justify-content-end"
        onClick={handleDownloadVotesResult}
      >
        <Button>Download xls</Button>
      </div>
      <div className="col-6 mt-2">
        <Form.Select onChange={handleCategoryChange} value={selectedCategory}>
          <option></option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </div>
      {selectedCategory && (
        <div
          className="mt-5 p-4"
          style={{
            borderRadius: "4px",
            boxShadow: "0px 12px 24px #12263F08",
          }}
        >
          <h3 className="mb-4">
            Category -{" "}
            {
              categories.find((category) => category.id === selectedCategory)
                .name
            }
          </h3>
          <Bar
            options={{
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
              responsive: true,
              plugins: {
                legend: false,
              },
            }}
            data={data[selectedCategory]}
          />
        </div>
      )}
    </div>
  );
}

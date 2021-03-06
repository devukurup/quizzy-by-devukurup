import React, { useEffect, useState } from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { Tooltip } from "@bigbinary/neetoui/v2";
import { either, isNil, isEmpty } from "ramda";
import { Link } from "react-router-dom";

import questionsApi from "apis/questions";
import { useQuestion } from "contexts/question";

import DeleteQuestion from "./Delete";

const FetchQuestions = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const {
    setDeleteId,
    setQuestionName,
    setDeleteQuestion,
    deleteQuestion,
    setPublish,
    questionList,
    setQuestionList,
  } = useQuestion();

  const fetchQuestions = async () => {
    try {
      const response = await questionsApi.show({ id });
      setQuestionList(response.data.question);
      response.data.question.length > 0 ? setPublish(true) : setPublish(false);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [deleteQuestion]);

  if (loading) {
    return <PageLoader />;
  }

  if (either(isNil, isEmpty)(questionList)) {
    return (
      <div className="align-middle text-center pt-40">
        <Typography style="h3" weight="extralight">
          You have not added any questions.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      {questionList.map((item, index) => (
        <div
          key={index}
          className="flex flex-col p-10 m-10 bg-blue-100 space-y-5"
        >
          <div className="flex space-x-10">
            <Typography>Question</Typography>
            <Typography style="body1" weight="bold">
              {item.questn}
            </Typography>
            <div className="flex space-x-3">
              <Tooltip content="Edit" position="bottom">
                <Link
                  to={{
                    pathname: `/question/${item.id}/edit`,
                    state: { state: item, quiz_id: id },
                  }}
                >
                  <Edit color="#808080" />
                </Link>
              </Tooltip>
              <Tooltip content="Delete" position="bottom">
                <Button
                  icon={Delete}
                  style="danger"
                  onClick={() => {
                    setDeleteQuestion(true);
                    setDeleteId(item.id);
                    setQuestionName(item.questn);
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <div className="flex space-x-10">
            <Typography>Option 1</Typography>
            <Typography style="body1" weight="bold">
              {item.option1}
            </Typography>
            {item.answer === 1 && <CheckCircle color="#00ba88" size={24} />}
          </div>
          <div className="flex space-x-10">
            <Typography>Option 2</Typography>
            <Typography style="body1" weight="bold">
              {item.option2}
            </Typography>
            {item.answer === 2 && <CheckCircle color="#00ba88" size={24} />}
          </div>
          {item.option3 && (
            <div className="flex space-x-10">
              <Typography>Option 3</Typography>
              <Typography style="body1" weight="bold">
                {item.option3}
              </Typography>
              {item.answer === 3 && <CheckCircle color="#00ba88" size={24} />}
            </div>
          )}
          {item.option4 && (
            <div className="flex space-x-10">
              <Typography>Option 4</Typography>
              <Typography style="body1" weight="bold">
                {item.option4}
              </Typography>
              {item.answer === 4 && <CheckCircle color="#00ba88" size={24} />}
            </div>
          )}
        </div>
      ))}
      {deleteQuestion && <DeleteQuestion />}
    </div>
  );
};

export default FetchQuestions;

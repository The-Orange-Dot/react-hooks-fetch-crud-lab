import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [showQuestions, setShowQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((data) => {
        setShowQuestions(data);
      });
  }, []);

  const deleteQuestion = (deletedItem) => {
    const updatedQuestions = showQuestions.filter(
      (question) => question.id !== deletedItem.id
    );
    setShowQuestions(updatedQuestions);
  };

  const addQuestion = (question) => {
    const updatedQuestions = [...showQuestions, question];
    setShowQuestions(updatedQuestions);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={showQuestions}
          deleteQuestion={deleteQuestion}
        />
      )}
    </main>
  );
}

export default App;

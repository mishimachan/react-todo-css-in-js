import React, { useState } from "react";
import "./styles.css";
import { InputTodos } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");

  const [incompleteTodos, setIncompleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => {
    console.log("値は：" + event.target.value);
    return setTodoText(event.target.value);
  };

  const onClickAdd = () => {
    if (todoText === "") {
      console.log("空みたい");
      return;
    }
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    console.log("通った??");
    setTodoText("");
    console.log("通った");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // splice:削除の指定。第一引数は何番目か、第二引数は何個削除するのか
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    // splice:削除の指定。第一引数は何番目か、第二引数は何個削除するのか
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const backCompleteTodos = [...completeTodos];
    // splice:削除の指定。第一引数は何番目か、第二引数は何個削除するのか
    backCompleteTodos.splice(index, 1);

    const backIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    setIncompleteTodos(backIncompleteTodos);
    setCompleteTodos(backCompleteTodos);
  };

  return (
    <>
      <InputTodos
        todoText={todoText}
        onChangeTodoText={onChangeTodoText}
        onClickAdd={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />

      {/* <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div> */}
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録出来るTODOは５個までです。消化してください。
        </p>
      )}
      <IncompleteTodos
        incompleteTodos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      {/* <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} class="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div> */}
      <CompleteTodos completeTodos={completeTodos} onClickBack={onClickBack} />
      {/* <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} class="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div> */}
    </>
  );
};

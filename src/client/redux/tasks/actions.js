
import R from 'ramda';

import create from '../actionFactory';
import createFetch from '../fetchFactory';
import { store } from '../index';

import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAIL,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  REMOVE_TASK,
  REMOVE_TASK_SUCCESS,
  REMOVE_TASK_FAIL,
  CHANGE_TASK_TEXT
} from '../../constants/action-types';

export function changeTaskText(val) {
  return create(CHANGE_TASK_TEXT, val)
}
export function moveTask(path, task) {
  return function(dispatch) {
    // orderIndex starts at 0 to allow the backend to use 0 to move around elements
    const clone = R.clone(task);
    clone.orderIndex = (parseInt(path.split('.')[1])+1)
    return dispatch(putTask(clone)).then(() => {
      dispatch(fetchTasks());
    });
  }
}

/**
 * TASK REMOVAL
 */
export function removeTask(id) {
  return create(REMOVE_TASK, id);
}
export function removeTaskSuccess() {
  return create(REMOVE_TASK_SUCCESS);
}
export function removeTaskFail() {
  return create(REMOVE_TASK_FAIL);
}
export function deleteTask(id) {
  return createFetch({
    url: `/api/tasks/${id}`,
    method: 'DELETE',
    start: removeTask,
    success: removeTaskSuccess,
    fail: removeTaskFail
  })
}

/**
 * TASK FETCHING
 */
export function getTasks() {
  return create(GET_TASKS);
}
export function getTasksSuccess(tasks) {
  return create(GET_TASKS_SUCCESS, tasks);
}
export function getTasksFail(res) {
  return create(GET_TASKS_FAIL, res);
}
export function fetchTasks() {
  return createFetch({
    url: `/api/tasks`,
    method: 'GET',
    start: getTasks,
    success: getTasksSuccess,
    fail: getTasksFail
  });
}

/**
 * TASK ADDING
 */
export function addTask() {
  return create(ADD_TASK)
}
export function addTaskSuccess(got) {
  return create(ADD_TASK_SUCCESS, got);
}
export function addTaskFail(res) {
  return create(ADD_TASK_FAIL, res);
}
export function postNewTask(text) {
  const task = {
    text,
    orderIndex: store.getState().tasks.taskList.length + 1
  };
  return createFetch({
    url: `/api/tasks`,
    method: 'POST',
    body: task,
    start: addTask,
    success: addTaskSuccess,
    fail: addTaskFail
  });
}

/**
 * TASK UPDATING
 */
export function updateTask() {
  return create(UPDATE_TASK)
}
export function updateTaskSuccess(got) {
  return create(UPDATE_TASK_SUCCESS, got);
}
export function updateTaskFail(res) {
  return create(UPDATE_TASK_FAIL, res);
}
export function putTask(task) {
  return createFetch({
    url: `/api/tasks`,
    method: 'PUT',
    body: task,
    start: updateTask,
    success: updateTaskSuccess,
    fail: updateTaskFail
  });
}

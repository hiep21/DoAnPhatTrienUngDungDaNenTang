
// screens/Screen1.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getTaskByIdApi, updateTaskApi } from '../services/todo.service';
import { Task } from '../services/interfaces/task.interface';

const DetailTaskScreen = ({ navigation }) => {

    const taskId = navigation.getParam("taskId")

    const [task, setTask] = useState<Task>()

    const updateTask = () => {
      navigation.navigate("UpdateTaskScreen", { task })
    }

    const setDone = async() => {
      try {
        const { data } = await updateTaskApi({
          ...task,
          isDone: true
        })
        alert("Cập nhật thành công")

        setTask(data)
      } catch(err) {
        const errorMessage = err.response
        alert(errorMessage)
      }
    }

    const getTaskById = async() => {
      try {
        const { data } = await getTaskByIdApi(taskId)
        setTask(data)
      } catch(err) {
        const errorMessage = err.response
        alert(errorMessage)
      }

    }

    useEffect(() => {
      getTaskById()
    }, [ taskId ])

    return (
      <View>
        <Text>This is DetailTaskScreen </Text>
        <Text>Tiêu đề công việc: {task?.title}</Text>
        <Text>{task?.content}</Text>
        <Text>{task?.createdAt}</Text>

        <Button onPress={setDone} title='Hoàn thành' />

        <Button onPress={updateTask} title='Sửa công việc' />

        <Button title='Xóa công việc' />
        
      </View>
    );
};

export default DetailTaskScreen;

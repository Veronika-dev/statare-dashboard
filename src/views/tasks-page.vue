<template>
  <v-container class="pa-0 relative overflow-hidden rounded-lg">
    <div class="d-flex align-center px-6 pt-4 mb-4">
      <h1 class="text-left text-h4 font-weight-black">Tasks</h1>
      <v-spacer />
      <v-btn
        color="secondary"
        outlined
        small
        @click="openCreateTask"
      >
        <v-icon small class="mr-1">$add</v-icon>
        Add task
      </v-btn>
    </div>
    <table-data v-if="tasksList" :headers="headers" :data="tasksList" :total="total"
                @update-data="getTasksList" @click:row="onTaskClick" />
    <div v-else class="pa-5 pb-10 text-center">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <task-info
      :mode="mode"
      v-click-outside="{
        handler: onTaskClose,
        include: include,
      }"
      :is-opened="isTaskOpened"
      :task-info="mode !== 'CREATE' ? openedTask : null"
      :loading="taskInfoLoading"
      @update="updateTask"
      @create="onCreateTask"
      @close="onTaskClose"
      @delete="deleteTask"
    />
  </v-container>
</template>

<script lang="ts">
import { Getter, Action } from 'vuex-class';
import Vue from 'vue';
import Component from 'vue-class-component';
import TableData from '@/components/table-data.vue';
import TaskInfo from '@/components/task-info.vue';
import { ITask, ITaskFull, TaskMode } from '@/types/Tasks';
import { TPaginate } from '@/types/Paginate';

@Component({
  components: { TaskInfo, TableData },
})
export default class TasksView extends Vue {
  @Getter('tasks/tasksList') tasksList: ITask[] | undefined;

  @Getter('tasks/getOpenedTask') openedTask: ITaskFull | undefined;

  @Getter('tasks/getIsTaskOpened') isTaskOpened!: boolean;

  @Getter('tasks/getTotal') total!: number;

  @Action('tasks/toggleIsTaskOpened') toggleIsTaskOpened!: (value: boolean) => void;

  @Action('tasks/getTasksList') getTasksList!: (pagination: TPaginate) => void;

  @Action('tasks/getTasksById') getTasksById!: (id: number) => void;

  @Action('tasks/updateTask') updateTask!: ({ id, task } : { id: number, task: ITaskFull }) => void;

  @Action('tasks/createTask') createTask!: (task: ITaskFull) => void;

  @Action('tasks/deleteTask') deleteTask!: (id: number) => void;

  headers = [
    { text: 'ID', align: 'start', value: 'id' },
    { text: 'Task name', align: 'start', value: 'title' },
    { text: 'Due date', value: 'due_date', align: 'start' },
    { text: 'Team', value: 'team', align: 'start' },
  ]

  mode: TaskMode = TaskMode.VIEW;

  offset = 0;

  limit = 10;

  taskInfoLoading = false;

  async onTaskClick({ id }: { id: number }) {
    this.mode = TaskMode.VIEW;
    this.toggleIsTaskOpened(true);
    this.taskInfoLoading = true;
    await this.getTasksById(id);
    this.taskInfoLoading = false;
  }

  onTaskClose() {
    this.toggleIsTaskOpened(false);
    this.taskInfoLoading = false;
  }

  openCreateTask() {
    this.taskInfoLoading = false;
    this.mode = TaskMode.CREATE;
    this.toggleIsTaskOpened(true);
  }

  async onCreateTask(task: ITaskFull) {
    await this.createTask(task);
  }

  include() {
    return [...document.querySelectorAll('.included')];
  }

  mounted() {
    this.getTasksList({ limit: this.limit, offset: this.offset });
  }
}
</script>

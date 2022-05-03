<template>
  <slide-transition>
    <v-card
      v-if="isOpened"
      class="task-info py-4 px-6"
      :class="{'visible': isOpened}"
      :elevation="9"
      color="#1c263e"
      tile
    >
      <div v-if="!isCreateMode" class="d-flex pb-5">
        <v-btn
          :color="isClosedTask ? 'success' : 'quaternary'"
          :outlined="!isClosedTask"
          small
          @click="toggleStatusOpenClose"
        >
          <v-icon small class="mr-1">$check</v-icon>
          Mark complete
        </v-btn>
        <v-spacer />
        <v-menu bottom left offset-y light>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small icon v-bind="attrs" v-on="on">
              <v-icon color="quaternary">$more</v-icon>
            </v-btn>
          </template>
          <v-list class="py-0">
            <v-list-item link dense @click="deleteTask">
              <v-list-item-title class="error--text">Delete task</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          color="quaternary"
          icon
          small
          @click="$emit('close')"
        >
          <v-icon>$close</v-icon>
        </v-btn>
      </div>
      <div v-else class="d-flex justify-end pb-5">
        <v-btn color="primary" text small class="mr-2" @click="$emit('close')">
          <v-icon small  class="mr-1">$close</v-icon>
          Cancel
        </v-btn>
        <v-btn color="success" outlined small @click="createTask">
          <v-icon small class="mr-1">$check</v-icon>
          Save
        </v-btn>
      </div>
      <v-divider class="mb-2" />
      <div v-if="loading" class="pa-5 pb-10 text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div v-else-if="taskData" class="text-left">
        <textarea-custom v-model="taskData.title" class="text-h5 ml-n3" placeholder="Title"
                         :error="showTitleError" error-message="Title is required"
                         @blur="updateTask('title')"
        />
        <v-row align="center" class="mt-3">
          <v-col cols="3" class="py-0 d-flex align-center">
            <v-icon color="secondary" small>$team</v-icon>
            <v-subheader class="pl-2 text-caption">Team</v-subheader>
          </v-col>
          <v-col cols="5" class="py-0 pl-0 relative" id="team">
            <select-custom
              v-model="taskData.team_id"
              :items="teamsList"
              attach="#team"
              @change="updateTask('team_id')"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="3" class="py-0 d-flex align-center">
            <v-icon color="secondary" small>$status</v-icon>
            <v-subheader class="pl-2 text-caption">Status</v-subheader>
          </v-col>
          <v-col cols="5" class="py-0 pl-0 relative" id="status">
            <select-custom
              v-model="taskData.status"
              :items="statusesList"
              attach="#status"
              @change="updateTask('status')"
            />
          </v-col>
        </v-row>
        <v-row align="center" class="mb-5">
          <v-col cols="3" class="py-0 d-flex align-center">
            <v-icon color="secondary" small>$calendar</v-icon>
            <v-subheader class="pl-2 text-caption">Due date</v-subheader>
          </v-col>
          <v-col cols="5" class="py-0 pl-0 relative" id="due_date">
            <datetimepicker-custom
              v-model="taskData.due_date"
              attach="#due_date"
              @input="updateTask('due_date')"
            />
          </v-col>
        </v-row>
        <textarea-custom v-model="taskData.description" label="Description" class="ml-n3"
                         @change="updateTask('description')" />
      </div>
    </v-card>
  </slide-transition>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {
  ITaskFull, TaskMode, TaskStatuses, TaskStatusesKeys, TTaskFull, TTaskStatus,
} from '@/types/Tasks';
import SlideTransition from '@/components/slide-transition.vue';
import TextareaCustom from '@/components/textarea-custom.vue';
import DatetimepickerCustom from '@/components/datetimepicker-custom.vue';
import SelectCustom from '@/components/select-custom.vue';
import { Teams } from '@/types/Teams';

@Component({
  components: {
    SelectCustom,
    DatetimepickerCustom,
    TextareaCustom,
    SlideTransition,
  },
})
export default class TaskInfo extends Vue {
  @Prop({ type: Boolean, default: false }) readonly isOpened?: boolean;

  @Prop({ type: Boolean, default: false }) readonly loading?: boolean;

  @Prop({ type: Object as PropType<ITaskFull>, default: () => ({}) }) taskInfo?: ITaskFull;

  @Prop({ type: String, default: TaskMode.VIEW }) mode?: TaskMode;

  @Watch('isOpened')
  isOpenedWatch(nv: boolean, ov: boolean) {
    if (!nv && ov) {
      this.taskCreate = {} as ITaskFull;
      this.showTitleError = false;
    }
  }

  taskCreate = {} as ITaskFull;

  showTitleError = false;

  get taskData() {
    return this.taskInfo || this.taskCreate;
  }

  set taskData(value: ITaskFull) {
    this.taskInfo = { ...this.taskInfo, ...value };
    this.taskCreate = { ...this.taskCreate, ...value };
  }

  get isCreateMode() {
    return this.mode === TaskMode.CREATE;
  }

  get teamsList() {
    return Object.entries(Teams).map((item) => ({ text: item[1], value: item[0] }));
  }

  get statusesList() {
    return Object.entries(TaskStatuses).map((item) => ({ text: item[1], value: item[0] }));
  }

  get isClosedTask() {
    return this.taskInfo?.status === TaskStatusesKeys.CLOSED;
  }

  toggleStatusOpenClose() {
    const statusNew = this.isClosedTask ? TaskStatusesKeys.OPENED : TaskStatusesKeys.CLOSED;
    this.changeStatus(statusNew);
  }

  createTask() {
    if (!this.isCreateMode) return;
    if (this.taskData) {
      if (!this.taskData.title) {
        this.showTitleError = true;
        return;
      }
      this.showTitleError = false;
      this.$emit('create', this.taskData);
    }
  }

  updateTask(updateValue: TTaskFull) {
    if (this.isCreateMode) return;
    if (this.taskData) {
      if (!this.taskData.title) {
        this.showTitleError = true;
        return;
      }
      this.showTitleError = false;
      this.$emit('update', {
        id: this.taskData.id,
        task: {
          [updateValue]: this.taskData[updateValue],
        },
      });
    }
  }

  changeStatus(value: TTaskStatus) {
    if (this.taskInfo) {
      this.taskInfo.status = value;
      this.updateTask('status');
    }
  }

  deleteTask() {
    if (this.taskData) {
      this.$emit('delete', this.taskData.id);
    }
  }
}
</script>
<style lang="scss" scoped>
.task-info {
  bottom: 0;
  display: flex;
  flex-direction: column;
  right: 0;
  max-width: 700px;
  position: absolute;
  top: 0;
  z-index: 600;
  overflow: hidden;
  width: 55%;
  border-left: 1px solid rgba(255, 255, 255, .1) !important;
}
</style>

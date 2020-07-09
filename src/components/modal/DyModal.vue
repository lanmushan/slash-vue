<!--自定义弹出框，方便以后全局扩展-->
<template>
  <el-dialog
    :close-on-click-modal="false"
    :before-close="handleClose"
    :title="title"
    :visible.sync="openDialog"
    class="dialog-custom-class"
    transition="fade-in-linear"
    :width="width"
  >
    <div
      class="modal-content"
      element-loading-spinner="el-icon-loading"
      element-loading-text="正在努力加载中"
      lock-scroll="true"
      v-loading="loading"
    >
      <div style="background: white">
        <slot ref="child"></slot>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="closeDialog()">关 闭</el-button>
      <el-button type="primary" :disabled="loading" v-show="!readOnly" @click="onSubmit">提 交</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "DyModal",
  beforeCreate() {},
  data() {
    return {
      loading: true,
      url: "@/components/HelloWorld.vue",
      visible: false
    };
  },

  created() {
    setTimeout(() => (this.loading = false), 200);
  },
  computed: {
    openDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val); // openDialog
      }
    },
    successSubmitFormEventListener: {
      get() {
        return this.$store.getters.onEvent(`${this.formKey}-successSubmitForm`);
      }
    },
    cancelSubmitFormEventListener: {
      get() {
        return this.$store.getters.onEvent(`${this.formKey}-cancelSubmitForm`);
      }
    }
  },
  watch: {
    cancelSubmitFormEventListener(a, b) {
      if (a == null || a == b) {
        return null;
      }
      this.onCancelSubmit();
    },
    successSubmitFormEventListener(a, b) {
      if (a == null || a == b) {
        return null;
      }
      this.onSubmitSuccess(a.data);
    }
  },
  methods: {
    onSubmit() {
      if (!this.loading) {
        this.loading = true;
        this.$store.commit("submitForm", { name: this.formKey });
      }
    },
    onCancelSubmit() {
      this.loading = false;
    },
    onSubmitSuccess(data) {
      this.$message({
        message: data.msg,
        type: "success"
      });
      this.openDialog = false;
    },
    closeDialog() {
      this.openDialog = false;
    },
    handleClose(done) {
      this.visible = false;
      this.$emit("showModal", false);
      done();
    }
  },
  props: {
    formKey: {
      type: String,
      default: "currentForm"
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "弹出框"
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "50%"
    }
  }
};
</script>
<style>
.modal-content {
  overflow-y: scroll;
  max-height: 500px;
  min-height: 200px;
  /*background:#f3f3f4;*/
  padding: 10px;
}

.modal-content::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.dialog-custom-class .el-dialog__header {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
}

.dialog-custom-class .el-dialog__body {
  padding: 0px;
}

.dialog-custom-class .el-dialog__footer {
  border-top: 1px solid #ebeef5;
  padding: 5px;
}
</style>

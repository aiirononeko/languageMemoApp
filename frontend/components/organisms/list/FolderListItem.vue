<template>
  <v-row>
    <v-col cols="11" class="pa-0">
      <v-list-item :to="getTo">
        <v-list-item-icon>
          <v-icon color="#3498db">mdi-folder</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <template v-if="!isChangingName">
            <v-list-item-title>
            {{ name }}
            </v-list-item-title>
          </template>

          <v-form v-else @submit.prevent="onSubmitChangeName">
            <v-list-item-title>
              <v-text-field v-model="newName" dense />
            </v-list-item-title>
          </v-form>
        </v-list-item-content>
      </v-list-item>
    </v-col>

    <v-col v-if="canAction" cols="1" class="pa-0 d-flex justify-center align-center">
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="onChangeName">
            <v-list-item-title>名前を変更する</v-list-item-title>
          </v-list-item>

          <v-list-item @click="onDelete">
            <v-list-item-title>削除する</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    canAction: {
      type: Boolean,
      default: false
    },

    id: {
      type: [String, Number],
      required: true
    },

    name: {
      type: String,
      required: true
    },

    to: {
      type: [String, Object],
      default: undefined
    }
  },

  data() {
    return {
      isChangingName: false,
      newName: this.name
    }
  },

  computed: {
    getTo() {
      return !this.isChangingName ? this.to : undefined
    }
  },

  methods: {
    onChangeName() {
      this.newName = this.name
      this.isChangingName = !this.isChangingName
    },

    onSubmitChangeName() {
      this.$emit('change-name', {
        id: this.id,
        name: this.newName
      })

      this.newName = null
      this.isChangingName = false
    },

    onDelete() {
      return this.$emit('delete', {
        id: this.id
      })
    }
  },
}
</script>

<style>

</style>

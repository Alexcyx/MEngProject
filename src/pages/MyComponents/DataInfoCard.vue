<template>
    <div class="md-layout-item md-size-100">
       <md-card>
            <md-card-header class="md-card-header-icon md-card-header-green">
                <div class="card-icon">
                      <md-icon>assignment</md-icon>
                </div>
                  <h4 class="title">Info</h4>
            </md-card-header>
            <md-card-content>
                <md-table v-model="tableDataStriped" class="table-striped">
                    <md-table-row
                        slot="md-table-row"
                        slot-scope="{ item }"
                        md-selectable="multiple"
                        md-auto-select>
                        <md-table-cell md-label="Participant ID">{{ item.id }}</md-table-cell>
                        <md-table-cell md-label="Badge #">{{ item.badge }}</md-table-cell>
                        <md-table-cell md-label="Team">{{ item.team }}</md-table-cell>
                        <md-table-cell md-label="Actions" :class="getAlignClasses(item)">
                            <md-button
                            class="md-just-icon"
                            :class="getClass(item.icon1, item.id)"
                            ><md-icon>{{ item.icon1 }}</md-icon></md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </md-card-content>
        </md-card>
    </div>
</template>


<script>
export default {
  name: "datainfo-card",
  data() {
    return {
        icon1: "person"
    };
  },
  props: {
        id: {
            type: Number,
            required: true
        },
        badge: {
            type: Number,
            required: true
        },
        team: {
            type: String,
            required: true
        }
    },
    methods: {
    getClass: function(item, id) {
      let classes = "";
      switch (item) {
        case "person": {
          classes = "md-info";
          break;
        }
        case "edit": {
          classes = "md-success";
          break;
        }
        case "close": {
          classes = "md-danger";
          break;
        }
      }
      switch (id) {
        case 1:
        case 5: {
          break;
        }
        case 2:
        case 4: {
          classes = `${classes} md-round`;
          break;
        }
        case 3: {
          classes = `${classes} md-simple`;
          break;
        }
      }
      return classes;
    },
    getAlignClasses: ({ id }) => ({
      "text-right": id
    })     
  }
};
</script>

<style scoped>
</style>
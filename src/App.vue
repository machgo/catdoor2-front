<template>
<div>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">Catdoor 2</b-navbar-brand>
    <div class="float-right">
      <b-button disabled :pressed="unlocked" variant="success">{{ unlocked ? "Offen" : "Geschlossen" }}</b-button>
      <b-btn-group class="ml-5">
        <b-button v-on:click="openDoor" class="my-2 my-sm-0" variant="primary">Öffnen</b-button>
        <b-button v-on:click="closeDoor" class="my-2 my-sm-0" variant="secondary">Schliessen</b-button>
      </b-btn-group>
    </div>
  </b-navbar>
  <b-alert :show="dismissCountDown"
            dismissible
            variant="warning"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
    <p>Tür-Status wurde geändert, Nachricht verschwindet in {{dismissCountDown}} Sekunden...</p>
    <b-progress variant="warning"
                :max="dismissSecs"
                :value="dismissCountDown"
                height="4px">
    </b-progress>
  </b-alert>

  <b-table striped hover :items="events" :fields="fields"></b-table>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fields: [
        {
          key: "created_at",
          label: "Date",
          formatter: (value, key, item) => {
            return new Date(item.created_at).toLocaleString("de-CH");
          }
        },
        "sender",
        {
          key: "name",
          label: "Details",
          formatter: (value, key, item) => {
            if (item.has_data) {
              return "<a href='http://kubeapp.home.balou.in:32003/api/uploads/5aad3c4af7bee4000f4ad350'>Bild</a>";
            }
            return item.name;
          }
        }
      ],
      events: [],
      dismissSecs: 5,
      dismissCountDown: 0,
      unlocked: false
    };
  },
  created() {
    axios
      .get("http://kubeapp.home.balou.in:32003/api/events")
      .then(response => {
        this.events = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  beforeMount() {
    this.updateDoor();
  },
  methods: {
    openDoor: function() {
      axios
        .post("http://kubeapp.home.balou.in:32003/api/door", {
          unlocked: true
        })
        .then(response => {
          this.dismissCountDown = this.dismissSecs;
          this.updateDoor();
        });
    },
    closeDoor: function() {
      axios
        .post("http://kubeapp.home.balou.in:32003/api/door", {
          unlocked: false
        })
        .then(response => {
          this.dismissCountDown = this.dismissSecs;
          this.updateDoor();
        });
    },
    updateDoor: function() {
      axios
        .get("http://kubeapp.home.balou.in:32003/api/door")
        .then(response => {
          this.unlocked = response.data.unlocked;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

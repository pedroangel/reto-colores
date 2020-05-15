<template>
  <div class="content">
    <div class="md-layout">
      <div
        v-for="color in Colores"
        :key="color.id"
        v-clipboard="color.color"
        v-clipboard:success="clipboardSuccessHandler"
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <div>
          <md-card
            md-with-hover
            :style="{ background: hexToRGBA(color.color, 0.1) }"
          >
            <md-ripple>
              <md-card-header
                :style="{ backgroundColor: color.color, textAlign: 'center' }"
              >
                <div class="md-title">{{ color.color }}</div>
                <div class="md-subhead">{{ color.name }}</div>
              </md-card-header>

              <md-card-content :style="{ color: hexToRGBA(color.color, 0.6) }">
                <span>{{ color.pantone_value }}</span>
              </md-card-content>

              <md-card-actions
                :style="{ borderTop: '1px solid ' + color.color }"
              >
                <span
                  :style="{
                    fontWeight: 800,
                    color: hexToRGBA(color.color, 0.4)
                  }"
                  >{{ color.year }}</span
                >
              </md-card-actions>
            </md-ripple>
          </md-card>
        </div>
      </div>

      <md-card-actions class="PanelPaginas">
        <md-button
          :disabled="btnAnterior"
          @click="
            () => {
              listadoColores('1');
              btnAnterior = !btnAnterior;
              btnSiguiente = !btnSiguiente;
            }
          "
          class="btn-anterior"
          >Anterior</md-button
        >
        <md-button
          :disabled="btnSiguiente"
          @click="
            () => {
              listadoColores('2');
              btnSiguiente = !btnSiguiente;
              btnAnterior = !btnAnterior;
            }
          "
          class="btn-siguiente"
          >Siguiente</md-button
        >
      </md-card-actions>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.PanelPaginas {
  position: relative;
  width: 97%;
  height: 65px;
  margin: 0 auto;
}
.btn-siguiente {
  position: absolute;
  right: 0;
}
.btn-anterior {
  position: absolute;
  left: 0;
}
.md-card-content {
  text-align: center;
  font-size: 16px;
  font-style: italic;
  font-weight: 800;
  text-shadow: 1px 1px rgb(32, 32, 32, 0.4);
}
.md-card {
  width: 100%;
  margin: 15px auto;
  display: inline-block;
  vertical-align: top;
}
.md-title {
  font-family: "Bookman";
  font-weight: 400;
}
.md-ripple {
  padding: 5px;
}
.md-subhead {
  text-transform: capitalize;
  color: white;
  font-family: "Bookman";
  font-weight: 800;
  font-size: 17px !important;
}
</style>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      Colores: null,
      notifications: {
        topCenter: false
      },
      btnSiguiente: false,
      btnAnterior: true
    };
  },
  mounted() {
    this.listadoColores("1");
  },
  methods: {
    listadoColores(page) {
      axios.get("https://reqres.in/api/colors?page=" + page).then(response => {
        this.Colores = response.data.data;
      });
    },
    clipboardSuccessHandler({ value, event }) {
      this.notifyVue("top", "center", value);
    },
    notifyVue(verticalAlign, horizontalAlign, colorCopiado) {
      this.$notify({
        message:
          "Código de color: <label style='color: " +
          colorCopiado +
          "; text-shadow: 1px 1px #727272'>" +
          colorCopiado +
          "</label> ha sido copiado en tu portapapeles!",
        icon: "color_lens",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success"
      });
    },
    hexToRGBA(hex, opacity) {
      return (
        "rgba(" +
        (hex = hex.replace("#", ""))
          .match(new RegExp("(.{" + hex.length / 3 + "})", "g"))
          .map(function(l) {
            return parseInt(hex.length % 2 ? l + l : l, 16);
          })
          .concat(opacity || 1)
          .join(",") +
        ")"
      );
    }
  }
};
</script>

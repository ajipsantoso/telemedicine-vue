<script>
import { Line, mixins, Scatter } from 'vue-chartjs';
import 'chartjs-plugin-streaming';
const {reactiveProp} = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {

    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(
      this.chartData,
      this.options,
    );
  },
};
</script>

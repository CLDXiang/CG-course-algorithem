<template>
  <div class="content">
    <div class="canvas-container">
      <canvas
        ref="canvasRef"
        :height="config.CANVAS_HEIGHT"
        :width="config.CANVAS_WIDTH"
      >Your browser does not support the canvas element</canvas>
    </div>
    <div class="action-bar">
      <common-actions
        v-model:xMax="xMax"
        v-model:yMax="yMax"
        @reset="handleReset"
      >
        <span>
          <span>testPointX: </span>
          <input
            v-model="testPoint[0]"
            type="number"
            min="1"
          >
        </span>
        <span>
          <span>testPointY: </span>
          <input
            v-model="testPoint[1]"
            type="number"
            min="1"
          >
        </span>
      </common-actions>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, watch,
} from 'vue';
import { useCommonData } from '@/hooks';
import { CommonActions } from '@/components';
import { drawCoordinateSystem, drawPoint } from '@/utils/canvas';

export default defineComponent({
  components: {
    CommonActions,
  },
  setup() {
    const {
      config, xMax, yMax, xScaleRatio, yScaleRatio, resetCommonData,
    } = useCommonData();

    const defaultData = {
      testPoint: [4, 2] as [number, number],
    };

    /** 测试点 */
    const testPoint = ref<[number, number]>([...defaultData.testPoint]);

    /** 重置数据 */
    const handleReset = () => {
      resetCommonData();
      testPoint.value = [...defaultData.testPoint];
    };

    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const draw = () => {
      const canvas = canvasRef.value;
      const ctx = drawCoordinateSystem(canvas, {
        xMax: parseInt(xMax.value, 10),
        yMax: parseInt(yMax.value, 10),
        xScaleRatio: xScaleRatio.value,
        yScaleRatio: yScaleRatio.value,
      });
      if (ctx) {
        drawPoint(ctx,
          [testPoint.value[0] * xScaleRatio.value, testPoint.value[1] * yScaleRatio.value]);
      }
    };

    onMounted(draw);

    watch(xMax, draw);
    watch(yMax, draw);
    watch(testPoint, draw, { deep: true });

    return {
      /** 基础设置 */
      config,
      /** x 轴最大值 */
      xMax,
      /** y 轴最大值 */
      yMax,
      /** x 轴像素缩放比例 */
      xScaleRatio,
      /** y 轴像素缩放比例 */
      yScaleRatio,
      /** 测试点 */
      testPoint,
      /** 重置数据 */
      handleReset,
      /** canvas Element */
      canvasRef,
    };
  },
});
</script>

<style lang="less">
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.canvas-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-bar {
  display: flex;
  flex-wrap: wrap;

  > span {
    margin: 10px;
  }
}
</style>

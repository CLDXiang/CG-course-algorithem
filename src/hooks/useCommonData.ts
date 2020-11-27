import { computed, ref } from 'vue';
import CONFIG from '@/utils/config';

export const useCommonData = () => {
  const defaultCommonData = {
    xMax: '7',
    yMax: '7',
  };

  /** 基础设置 */
  const config = ref(CONFIG);
  /** x 轴最大值 */
  const xMax = ref(defaultCommonData.xMax);
  /** y 轴最大值 */
  const yMax = ref(defaultCommonData.yMax);
  /** x 轴像素缩放比例 */
  const xScaleRatio = computed(
    () => Math.floor(config.value.CANVAS_WIDTH / (parseInt(xMax.value, 10) + 1)),
  );
  /** y 轴像素缩放比例 */
  const yScaleRatio = computed(
    () => Math.floor(config.value.CANVAS_HEIGHT / (parseInt(yMax.value, 10) + 1)),
  );

  /** 重置数据 */
  const resetCommonData = () => {
    xMax.value = defaultCommonData.xMax;
    yMax.value = defaultCommonData.yMax;
  };

  return {
    config,
    xMax,
    yMax,
    xScaleRatio,
    yScaleRatio,
    resetCommonData,
  };
};

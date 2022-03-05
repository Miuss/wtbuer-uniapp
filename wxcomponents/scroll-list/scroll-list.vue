<template>
<uni-shadow-root class="scroll-list-scroll-list"><scroll-view class="list-class" :scroll-y="true" :lower-threshold="lowerThreshold" @touchstart="_$self[(scroll.touchStart)||'_$noop']($event)" @touchmove="_$self[(scroll.touchMove)||'_$noop']($event)" @touchend="_$self[(scroll.touchEnd)||'_$noop']($event)" @scrolltolower="loadmore" :style="'height: '+(CustomScrollBox)+'px;'">
  <view class="list-container" :change:prop="scroll.loadingTypeChange" :prop="showRefresh">
    <view class="refresh-container" :change:prop="scroll.triggerRefresh" :prop="forceRefresh">
      <view class="refresh-dot"></view>
      <view class="refresh-dot"></view>
      <view class="refresh-dot"></view>
    </view>
    <slot></slot>
    <view class="gap-text" v-if="(!noData&&showTip)" :style="'padding-bottom: '+(tabbarHeight)+'px'">
      <view class="word">加载中...</view>
    </view>
    <view class="gap-text" v-if="noData&&showTip" :style="'padding-bottom: '+(tabbarHeight)+'px'">
      <view class="word">没有更多数据了</view>
    </view>
  </view>
</scroll-view></uni-shadow-root>
</template>
<wxs src="./scroll.wxs" module="scroll"></wxs>
<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'scroll-list/scroll-list'
// components/list/list.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //加载更多的阈值
    lowerThreshold: {
      type: Number,
      value: 100
    },
    tabbarHeight: {
        type: Number,
        value: 0
    },
    //加载更多是否加载中
    noData: {
      type: Boolean,
      value: false
    },
    //下拉刷新是否加载中
    refreshLoading: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        this.setData({
          showRefresh: newVal
        })
      }
    },
    //显示加载提示
    showTip: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //显示下拉刷新的标志位
    showRefresh: false,
    //用来做主动触发刷新的标志位
    forceRefresh: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    CustomScrollBox: app.globalData.CustomScrollBox
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 开始刷新，如果wxs设定了刷新延迟，则延迟刷新，原因见wxs里面
     */
    refreshStart(options) {
      if (options.setTimeout) {
        setTimeout(() => {
          this.refresh()
        }, options.setTimeout)
      } else {
        this.refresh()
      }
    },
    /**
     * 下拉到最大距离时震动提示
     */
    refreshMaxDown() {
      wx.vibrateShort()
    },
    /**
     * 取消了刷新
     */
    refreshCancel() {
      this.setData({
        showRefresh: false
      })
    },
    /**
     * 对外暴露出了一个刷新事件 
     */
    refresh() {
      // 刷新操作
      this.setData({
        showRefresh: true
      })
      this.triggerEvent('refresh')
    },
    /**
     * 在父页面调用，通过wxs事件监听，主动触发刷新
     */
    forceRefresh() {
      this.setData({
        forceRefresh: true
      })
      wx.nextTick(() => {
        this.setData({
          forceRefresh: false
        })
      })
    },
    /**
     * 加载更多
     */
    loadmore() {
      this.triggerEvent('loadmore')
    }
  }
})
export default global['__wxComponents']['scroll-list/scroll-list']
</script>
<style platform="mp-weixin">
.refresh-container {
  display: flex;
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
  transform-origin: top center;
  transform: translateY(100%) scale(0);
  top: 0;
  height: 60px;
}

.refresh-container .refresh-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #ccc;
  margin-right: 12rpx;
  animation: loading-2 0.6s infinite;
}

.refresh-container .refresh-dot:first-child {
  animation: loading-1 0.6s infinite;
}

.refresh-container .refresh-dot:last-child {
  animation: loading-3 0.6s infinite;
}

.list-container {
  height: 100vh;
  width: 100%;
  transition-timing-function: ease;
}
.list-container .gap-text{
    font-size: 28rpx;
    color: #9b9b9b;
    letter-spacing: 1rpx;
    display: block;
    text-align: center;
    position: relative;
}
.list-container .gap-text .word{
  padding: 18px 0;
  position:relative;
  font-size: 24rpx;
}


@keyframes loading-1 {
  0% {
    background: #ccc;
  }

  100% {
    background: #999;
  }
}

@keyframes loading-2 {
  0% {
    background: #ccc;
  }

  30% {
    background: #ccc;
  }

  100% {
    background: #999;
  }
}

@keyframes loading-3 {
  0% {
    background: #ccc;
  }

  60% {
    background: #ccc;
  }

  100% {
    background: #999;
  }
}
</style>
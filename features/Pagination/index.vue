<template>
  <div :class="classes['pagination']">
    <div
      v-if="totalCount"
      :class="classes['pagination__label']"
    >
      Показано {{ currentCounterPosts }}
<!--      из {{ totalCount }}-->
    </div>
    <b></b>
    <div :class="classes['pagination__pages']">
      <div :class="[classes['pagination-btn'], classes['pagination-btn-prev']]">
        <Button
          :disabled='activePage === 1'
          buttonStyle="default"
          size="small"
          @click="goToPrevPage"
        >
          <IconArrow/>
        </Button>
      </div>
      <div
        v-for="item in pagination"
        :key="item.page"
        :class="classes['pagination-btn']"
      >
        <div :class="item.prevStep || item.nextStep ? classes['pagination-btn__wrap'] : ''">
          <Button
            :buttonStyle="item.buttonStyle"
            size="small"
            @click="getPageNum(item.page)"
          >
            <slot>{{ item.page }}</slot>
          </Button>
          <span
            v-if="item.prevStep"
            :class="classes['pagination__arrow']"
            @click="getPageNum(activePage - jumpPage)"
            v-html="IconDots"
          ></span>
          <span
            v-if="item.nextStep"
            :class="[classes['pagination__arrow'], classes['pagination__arrow--next']]"
            @click="getPageNum(activePage + jumpPage)"
            v-html="IconDots"
          ></span>
        </div>
      </div>
      <div :class="classes['pagination-btn']">
        <Button
          :disabled='activePage === pagination[pagination.length - 1].page'
          buttonStyle="default"
          size="small"
          @click="goToNextPage"
        >
          <IconArrow/>
        </Button>

      </div>
    </div>
    <div
      v-if="options"
      :class="classes['pagination__select']"
    >
    <Selectbox
      v-model:value='perPageValue'
      :options="options"
      placeholder='Выберите кол-во'
      @selected="getSelectData"
    />
    </div>
  </div>
</template>
<script setup>
import IconArrow from "@/assets/icons/IconArrow.vue"
import IconDots from "@/assets/icons/IconDots.vue?raw"

import {computed, ref} from "vue"

const props = defineProps({
  totalCount: Number,
})

const emit = defineEmits(["goToPage", "switchPageList"])
const jumpPage = 3
const minListWithoutDots = 5
const activePage = ref(1)
const postPerPage = ref(20)
const perPageValue = ref({
  value: 20,
  label: "20 / на странице",
  active: true,
})

const options = computed(() => {
  return [
    {
      value: 20,
      label: "20 / на странице",
      active: true,
    },
    {
      value: 40,
      label: "40 / на странице",
    },
    {
      value: 100,
      label: "100 / на странице",
    },
  ]
})

const paginationList = computed(() => {
  const pageList = []

  for (let i = 1; i < (props.totalCount > 10 ? Math.ceil(props.totalCount / postPerPage.value + 1) : 2); i++) {
    if (i === activePage.value) {
      pageList.push({ page: i, active: true })
    } else {
      pageList.push({ page: i, active: false })
    }
  }

  return pageList
})

/**
 * Формирование объекта для отрисовки пагинации
 */

const pagination = computed(() => {
  const activeIndex = paginationList.value.findIndex((item) => item.active)

  const list = paginationList.value.map((item, index) => {
    if (item.active) {
      return { ...item, buttonStyle: "inverse" }
    } else if ([
      activeIndex - 1,
      activeIndex - 2,
      activeIndex + 1,
      activeIndex + 2,
      0,
      paginationList.value.length - 1,
    ].includes(index)) {
      return { ...item, buttonStyle: "default" }
    } else if (paginationList.value.length === minListWithoutDots) {
      return { ...item, buttonStyle: "default" }
    } else return item
  })

  if (activePage.value - jumpPage > 1) {
    list.splice(1, 0, { active: false, page: "•••", buttonStyle: "text", prevStep: true })
  }

  if (list[list.length - 1].page - activePage.value > jumpPage) {
    list.splice(list.length - 1, 0, { active: false, page: "•••", buttonStyle: "text", nextStep: true })
  }

  return list.filter((el => el.buttonStyle))
})

const currentCounterPosts = computed(() => {
  return `${ postPerPage.value * activePage.value - postPerPage.value + 1 } - ${ postPerPage.value * activePage.value > props.totalCount ? props.totalCount : postPerPage.value * activePage.value }`
})

function getPageNum(page) {
  activePage.value = page
  emit("goToPage", activePage.value)
}

function goToPrevPage() {
  activePage.value = activePage.value - 1
  emit("goToPage", activePage.value)
}

function goToNextPage() {
  activePage.value = activePage.value + 1
  emit("goToPage", activePage.value)
}

function getSelectData(param) {
  postPerPage.value = param.value
  activePage.value = 1
  emit("switchPageList", postPerPage.value)
}

</script>
<style
  lang="scss"
  module="classes"
>
.pagination {
  display: flex;

  @media (max-width: $mobile) {
    flex-direction: column;
    align-items: flex-end;
  }

  &__pages {
    display: flex;
    align-items: center;

    @media (max-width: $mobile) {
      margin: $offset-small 0;
    }
  }

  &__label {
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    margin-right: 16px;
  }

  &-btn {
    margin-right: 8px;

    button {
      width: 32px;
      height: 32px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-prev {
      transform: rotate(180deg);
    }

    &__wrap {

      &:hover {
        button {
          display: none;
        }

        .pagination__arrow {
          display: flex;
        }
      }
    }
  }

  &__arrow {
    display: none;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &--next {
      transform: rotate(180deg);
    }

    svg {
      fill: #4096ff;
      width: 12px;
      height: 12px;
    }
  }
}
</style>
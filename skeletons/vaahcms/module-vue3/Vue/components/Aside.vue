<script setup>
import {reactive, ref} from 'vue';

import Menu from 'primevue/menu';

const inputs = {
}
const data = reactive(inputs);
const height = ref(window.innerHeight)

const menu = ref();

const items = ref([
    {
        label: '<%= module_name %>',
        items: [
            {
                label: 'Dashboard',
                icon: 'fa-regular fa-chart-bar',
                to: "/"
            },
        ]
    },
]);

</script>
<template>

    <div v-if="height">
        <Menu :model="items"  class="w-full" />
    </div>

</template>


